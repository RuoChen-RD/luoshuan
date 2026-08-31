"""
标准图片螺栓点位自动检测 v2
扫描 Standard.jpeg，自动识别所有螺栓中心坐标、半径与 ROI 像素统计。

用法:
    python detect_standard.py
"""

from __future__ import annotations

import json
import math
import sys
from collections import deque
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

from PIL import Image

STANDARD_IMAGE = Path(__file__).resolve().parent / "templates" / "Standard.jpeg"
OUTPUT_JSON = Path(__file__).resolve().parent / "standard_layout.json"
OUTPUT_CSV = Path(__file__).resolve().parent / "standard_layout.csv"


def is_bolt_pixel(red: int, green: int, blue: int) -> bool:
    luma = red * 0.299 + green * 0.587 + blue * 0.114
    black = luma < 80 and max(red, green, blue) - min(red, green, blue) < 75
    blue_like = blue > 70 and blue > red * 1.25 and blue > green * 1.05
    return black or blue_like


def is_black_bolt(red: int, green: int, blue: int) -> bool:
    luma = red * 0.299 + green * 0.587 + blue * 0.114
    return luma < 80 and max(red, green, blue) - min(red, green, blue) < 75


def is_blue_bolt(red: int, green: int, blue: int) -> bool:
    return blue > 70 and blue > red * 1.25 and blue > green * 1.05


def detect_bolts(img, min_area=80, max_area=3000, min_distance=30.0):
    width, height = img.size
    pixels = img.tobytes()

    mask = [[False] * width for _ in range(height)]
    for y in range(height):
        row_offset = y * width
        for x in range(width):
            idx = (row_offset + x) * 4
            mask[y][x] = is_bolt_pixel(pixels[idx], pixels[idx + 1], pixels[idx + 2])

    visited = [[False] * width for _ in range(height)]
    clusters = []

    for y in range(height):
        for x in range(width):
            if not mask[y][x] or visited[y][x]:
                continue

            q = deque()
            q.append((x, y))
            visited[y][x] = True
            cluster_pixels = []
            boundary_pixels = set()

            while q:
                cx, cy = q.popleft()
                cluster_pixels.append((cx, cy))
                is_boundary = False
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < width and 0 <= ny < height and not mask[ny][nx]:
                        is_boundary = True
                    if 0 <= nx < width and 0 <= ny < height and not visited[ny][nx] and mask[ny][nx]:
                        visited[ny][nx] = True
                        q.append((nx, ny))
                if is_boundary:
                    boundary_pixels.add((cx, cy))

            area = len(cluster_pixels)
            if area < min_area or area > max_area:
                continue

            xs = [p[0] for p in cluster_pixels]
            ys = [p[1] for p in cluster_pixels]
            cx = sum(xs) / area
            cy = sum(ys) / area

            max_x, min_x = max(xs), min(xs)
            max_y, min_y = max(ys), min(ys)
            w = max_x - min_x + 1
            h = max_y - min_y + 1
            aspect = min(w, h) / max(w, h) if max(w, h) > 0 else 0

            if aspect < 0.35:
                continue

            eq_diameter = math.sqrt(4.0 * area / math.pi)
            radius = eq_diameter / 2.0
            radius = max(12.0, min(radius, 45.0))

            boundary_count = len(boundary_pixels)
            circularity = 0.0
            if boundary_count > 0:
                perimeter = boundary_count
                circularity = 4.0 * math.pi * area / (perimeter * perimeter) if perimeter > 0 else 0

            clusters.append({
                "cx": cx,
                "cy": cy,
                "area": area,
                "radius": radius,
                "width": w,
                "height": h,
                "circularity": circularity,
            })

    clusters.sort(key=lambda c: (c["cy"], c["cx"]))

    merged = []
    for cluster in clusters:
        should_merge = False
        for m in merged:
            dist = math.hypot(cluster["cx"] - m["cx"], cluster["cy"] - m["cy"])
            if dist < min_distance:
                total_area = cluster["area"] + m["area"]
                m["cx"] = (cluster["cx"] * cluster["area"] + m["cx"] * m["area"]) / total_area
                m["cy"] = (cluster["cy"] * cluster["area"] + m["cy"] * m["area"]) / total_area
                m["area"] = total_area
                eq_diameter = math.sqrt(4.0 * total_area / math.pi)
                m["radius"] = max(m["radius"], eq_diameter / 2.0)
                should_merge = True
                break
        if not should_merge:
            merged.append(dict(cluster))

    return merged


def classify_bolt_color(img, cx, cy, radius):
    width, height = img.size
    pixels = img.tobytes()
    sample_r = radius * 1.3
    min_x = max(0, int(math.floor(cx - sample_r)))
    max_x = min(width - 1, int(math.ceil(cx + sample_r)))
    min_y = max(0, int(math.floor(cy - sample_r)))
    max_y = min(height - 1, int(math.ceil(cy + sample_r)))

    black_count = 0
    blue_count = 0
    total = 0

    for y in range(min_y, max_y + 1):
        row_offset = y * width
        for x in range(min_x, max_x + 1):
            dx = x - cx
            dy = y - cy
            if dx * dx + dy * dy > sample_r * sample_r:
                continue
            idx = (row_offset + x) * 4
            r, g, b = pixels[idx], pixels[idx + 1], pixels[idx + 2]
            total += 1
            if is_black_bolt(r, g, b):
                black_count += 1
            if is_blue_bolt(r, g, b):
                blue_count += 1

    if total == 0:
        return "black"
    return "black" if black_count >= blue_count else "blue"


def measure_roi(img, cx, cy, radius, expected_color):
    width, height = img.size
    pixels = img.tobytes()
    r2 = radius * radius

    roi_count = 0
    object_count = 0
    sum_x = 0.0
    sum_y = 0.0
    quadrants = [0, 0, 0, 0]

    min_x = max(0, int(math.floor(cx - radius)))
    max_x = min(width - 1, int(math.ceil(cx + radius)))
    min_y = max(0, int(math.floor(cy - radius)))
    max_y = min(height - 1, int(math.ceil(cy + radius)))

    for y in range(min_y, max_y + 1):
        row_offset = y * width
        for x in range(min_x, max_x + 1):
            dx = x - cx
            dy = y - cy
            if dx * dx + dy * dy > r2:
                continue
            roi_count += 1
            idx = (row_offset + x) * 4
            r, g, b = pixels[idx], pixels[idx + 1], pixels[idx + 2]

            if expected_color == "black":
                is_obj = is_black_bolt(r, g, b)
            elif expected_color == "blue":
                is_obj = is_blue_bolt(r, g, b)
            else:
                is_obj = is_black_bolt(r, g, b) or is_blue_bolt(r, g, b)

            if is_obj:
                object_count += 1
                sum_x += x
                sum_y += y
                quad = (1 if x >= cx else 0) + (2 if y >= cy else 0)
                quadrants[quad] += 1

    presence_ratio = object_count / roi_count if roi_count > 0 else 0.0

    if object_count > 0:
        obj_cx = sum_x / object_count
        obj_cy = sum_y / object_count
        center_offset = math.hypot(obj_cx - cx, obj_cy - cy)
        center_offset_ratio = center_offset / radius
        min_quad = max(1, min(quadrants))
        max_quad = max(quadrants)
        shadow_imbalance = max_quad / min_quad
    else:
        center_offset_ratio = 1.0
        shadow_imbalance = 99.0

    return {
        "roiPixels": roi_count,
        "objectPixels": object_count,
        "presenceRatio": presence_ratio,
        "centerOffsetRatio": center_offset_ratio,
        "shadowImbalance": shadow_imbalance,
    }


def assign_grid_ids(bolts, row_gap_threshold=20.0):
    if not bolts:
        return bolts

    sorted_by_y = sorted(bolts, key=lambda b: b["cy"])

    rows = []
    current_row = [sorted_by_y[0]]
    for b in sorted_by_y[1:]:
        cy = b["cy"]
        last_cy = current_row[-1]["cy"]
        if cy - last_cy > row_gap_threshold:
            rows.append(current_row)
            current_row = [b]
        else:
            current_row.append(b)
    if current_row:
        rows.append(current_row)

    for row_idx, row in enumerate(rows):
        row.sort(key=lambda b: b["cx"])
        for col_idx, bolt in enumerate(row):
            row_letter = chr(ord('A') + row_idx)
            bolt["id"] = f"{row_letter}{col_idx + 1:02d}"

    result = []
    for row in rows:
        result.extend(row)
    return result


def main():
    if not STANDARD_IMAGE.exists():
        print(f"[错误] 标准图片不存在: {STANDARD_IMAGE}", file=sys.stderr)
        sys.exit(1)

    print(f"[信息] 加载标准图片: {STANDARD_IMAGE}")
    img = Image.open(str(STANDARD_IMAGE)).convert("RGBA")
    width, height = img.size
    print(f"[信息] 图片尺寸: {width} x {height}")

    print("[信息] 步骤 1: 扫描检测所有螺栓候选区域...")
    raw_bolts = detect_bolts(img, min_area=100, max_area=2500, min_distance=35.0)
    print(f"[信息] 初步检测到 {len(raw_bolts)} 个候选区域")

    print("[信息] 步骤 2: 过滤边缘与异常区域...")
    margin = 25
    bolts = []
    for b in raw_bolts:
        if b["cx"] < margin or b["cx"] >= width - margin:
            continue
        if b["cy"] < margin or b["cy"] >= height - margin:
            continue
        if b["circularity"] > 0 and b["circularity"] < 0.15:
            continue
        if b["width"] > 200 or b["height"] > 200:
            continue
        bolts.append(b)
    print(f"[信息] 过滤后剩余 {len(bolts)} 个螺栓")

    print("[信息] 步骤 3: 为每个螺栓分类颜色...")
    for b in bolts:
        b["expectedColor"] = classify_bolt_color(img, b["cx"], b["cy"], b["radius"])

    color_counts = {}
    for b in bolts:
        c = b["expectedColor"]
        color_counts[c] = color_counts.get(c, 0) + 1
    print(f"[信息] 颜色分布: {color_counts}")

    print("[信息] 步骤 4: 按网格排布分配编号...")
    bolts = assign_grid_ids(bolts, row_gap_threshold=20.0)
    row_counts = {}
    for b in bolts:
        row_letter = b["id"][0]
        row_counts[row_letter] = row_counts.get(row_letter, 0) + 1
    print(f"[信息] 共 {len(bolts)} 个点位, 行分布: {row_counts}")

    print("[信息] 步骤 5: 测量每个点位的 ROI 统计...")
    for b in bolts:
        x = int(round(b["cx"]))
        y = int(round(b["cy"]))
        r = int(round(b["radius"]))
        roi = measure_roi(img, b["cx"], b["cy"], b["radius"], b["expectedColor"])
        b["x"] = x
        b["y"] = y
        b["r"] = r
        b["type"] = "bolt"
        b["roi"] = roi

    print("[信息] 步骤 6: 生成布局文件...")
    layout = []
    for b in bolts:
        roi = b["roi"]
        layout.append({
            "id": b["id"],
            "x": b["x"],
            "y": b["y"],
            "r": b["r"],
            "type": "bolt",
            "expectedColor": b["expectedColor"],
            "roiPixels": roi["roiPixels"],
            "objectPixels": roi["objectPixels"],
            "presenceRatio": round(roi["presenceRatio"], 4),
            "centerOffsetRatio": round(roi["centerOffsetRatio"], 4),
            "shadowImbalance": round(roi["shadowImbalance"], 4),
        })

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(layout, f, ensure_ascii=False, indent=2)
    print(f"[导出] 布局 JSON 已保存: {OUTPUT_JSON}")

    import csv as csv_mod
    with open(OUTPUT_CSV, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv_mod.writer(f)
        writer.writerow([
            "点位", "X", "Y", "半径", "类型", "颜色",
            "ROI像素", "物体像素", "占比", "偏心比", "阴影差"
        ])
        for b in bolts:
            roi = b["roi"]
            writer.writerow([
                b["id"],
                b["x"],
                b["y"],
                b["r"],
                "bolt",
                b["expectedColor"],
                roi["roiPixels"],
                roi["objectPixels"],
                f"{roi['presenceRatio']*100:.1f}%",
                f"{roi['centerOffsetRatio']:.3f}",
                f"{roi['shadowImbalance']:.3f}",
            ])
    print(f"[导出] ROI 统计 CSV 已保存: {OUTPUT_CSV}")

    print("[信息] 步骤 7: 生成检测结果可视化...")
    vis_img = Image.open(str(STANDARD_IMAGE)).convert("RGB")
    from PIL import ImageDraw, ImageFont
    draw = ImageDraw.Draw(vis_img)
    try:
        font = ImageFont.truetype("arial.ttf", 12)
    except (IOError, OSError):
        font = ImageFont.load_default()

    for b in bolts:
        roi = b["roi"]
        ok = (roi["presenceRatio"] >= 0.08
              and roi["centerOffsetRatio"] <= 0.33
              and roi["shadowImbalance"] <= 2.60)
        color = (0, 200, 0) if ok else (255, 50, 50)
        x, y, r = b["x"], b["y"], b["r"]
        draw.ellipse([x - r, y - r, x + r, y + r], outline=color, width=2)
        draw.ellipse([x - 2, y - 2, x + 2, y + 2], fill=color)
        draw.text((x + r + 2, y - 8), b["id"], fill=color, font=font)

    vis_path = Path(__file__).resolve().parent / "standard_overlay.png"
    vis_img.save(str(vis_path))
    print(f"[导出] 检测可视化图像已保存: {vis_path}")

    print(f"\n{'='*130}")
    print(f"  标准图片螺栓点位检测结果  |  {len(bolts)} 个点位")
    print(f"{'='*130}")
    header = f"  {'点位':<8} {'X':>6} {'Y':>6} {'R':>5} {'颜色':<6} {'ROI像素':>8} {'物体像素':>8} {'占比':>8} {'偏心比':>8} {'阴影差':>8}"
    print(header)
    print(f"  {'-'*116}")

    for b in bolts:
        roi = b["roi"]
        print(f"  {b['id']:<8} {b['x']:>6} {b['y']:>6} {b['r']:>5} "
              f"{b['expectedColor']:<6} {roi['roiPixels']:>8} {roi['objectPixels']:>8} "
              f"{roi['presenceRatio']*100:>7.1f}% {roi['centerOffsetRatio']:>8.3f} {roi['shadowImbalance']:>8.3f}")

    ok_like = sum(1 for b in bolts
                  if b["roi"]["presenceRatio"] >= 0.08
                  and b["roi"]["centerOffsetRatio"] <= 0.33
                  and b["roi"]["shadowImbalance"] <= 2.60)
    print(f"\n  符合标准阈值 (minPresence>=0.08, maxOffset<=0.33, maxShadow<=2.6): {ok_like}/{len(bolts)}")

    print(f"\n  按行统计:")
    for row_letter in sorted(set(b["id"][0] for b in bolts)):
        row_bolts = [b for b in bolts if b["id"][0] == row_letter]
        row_ok = sum(1 for b in row_bolts
                     if b["roi"]["presenceRatio"] >= 0.08
                     and b["roi"]["centerOffsetRatio"] <= 0.33
                     and b["roi"]["shadowImbalance"] <= 2.60)
        avg_presence = sum(b["roi"]["presenceRatio"] for b in row_bolts) / len(row_bolts) * 100
        avg_offset = sum(b["roi"]["centerOffsetRatio"] for b in row_bolts) / len(row_bolts)
        avg_shadow = sum(b["roi"]["shadowImbalance"] for b in row_bolts) / len(row_bolts)
        print(f"    Row {row_letter}: {len(row_bolts):>2} bolts, {row_ok:>2} OK, "
              f"avg_presence={avg_presence:.1f}%, avg_offset={avg_offset:.3f}, avg_shadow={avg_shadow:.3f}")

    anomalies = [b for b in bolts
                 if b["roi"]["presenceRatio"] < 0.08
                 or b["roi"]["centerOffsetRatio"] > 0.33
                 or b["roi"]["shadowImbalance"] > 2.60]
    if anomalies:
        print(f"\n  异常点位 ({len(anomalies)} 个):")
        for b in anomalies:
            roi = b["roi"]
            reasons = []
            if roi["presenceRatio"] < 0.08:
                reasons.append(f"占比过低({roi['presenceRatio']*100:.1f}%)")
            if roi["centerOffsetRatio"] > 0.33:
                reasons.append(f"偏心过大({roi['centerOffsetRatio']:.3f})")
            if roi["shadowImbalance"] > 2.60:
                reasons.append(f"阴影差过大({roi['shadowImbalance']:.3f})")
            print(f"    {b['id']} ({b['x']},{b['y']}) r={b['r']} color={b['expectedColor']}: {', '.join(reasons)}")

    print(f"{'='*130}\n")


if __name__ == "__main__":
    main()