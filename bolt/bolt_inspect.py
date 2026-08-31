"""
螺栓贴合 ROI 检测 —— Python 版
移植自 app.js，使用 PIL/Pillow 进行像素级检测。

用法:
    python bolt_inspect.py --image assets/sample-board.png
    python bolt_inspect.py --image assets/sample-board.png --config config/bolt-layout.json
    python bolt_inspect.py --image assets/sample-board.png --export result.json --export-csv result.csv

依赖:
    pip install Pillow
"""

from __future__ import annotations

import argparse
import csv
import json
import math
import os
import sys
from pathlib import Path
from typing import Any

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

try:
    from PIL import Image
except ImportError:
    print("缺少依赖 Pillow，请先安装: pip install Pillow", file=sys.stderr)
    sys.exit(1)

# ── 默认布局（与 app.js 中 DEFAULT_LAYOUT 一致）──────────────────────

DEFAULT_LAYOUT: list[dict[str, Any]] = [
    {"id": "A01", "x": 370, "y": 360, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "A02", "x": 490, "y": 360, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "A03", "x": 610, "y": 360, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "A04", "x": 724, "y": 370, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "A05", "x": 836, "y": 370, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "A06", "x": 950, "y": 374, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "A07", "x": 1058, "y": 374, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "A08", "x": 1168, "y": 384, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "A09", "x": 1278, "y": 386, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "A10", "x": 1392, "y": 390, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "A11", "x": 1485, "y": 390, "r": 28, "type": "bolt", "expectedColor": "blue"},

    {"id": "B01", "x": 365, "y": 445, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "B02", "x": 480, "y": 445, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "B03", "x": 600, "y": 445, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "B04", "x": 715, "y": 445, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "B05", "x": 832, "y": 452, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "B06", "x": 955, "y": 452, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "B07", "x": 1072, "y": 454, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "B08", "x": 1186, "y": 462, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "B09", "x": 1295, "y": 462, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "B10", "x": 1410, "y": 462, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "B11", "x": 1515, "y": 462, "r": 28, "type": "bolt", "expectedColor": "blue"},

    {"id": "C01", "x": 320, "y": 526, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "C02", "x": 465, "y": 528, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "C03", "x": 595, "y": 532, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "C04", "x": 720, "y": 530, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "C05", "x": 840, "y": 538, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "C06", "x": 960, "y": 540, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "C07", "x": 1080, "y": 540, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "C08", "x": 1208, "y": 540, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "C09", "x": 1316, "y": 545, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "C10", "x": 1436, "y": 540, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "C11", "x": 1545, "y": 548, "r": 28, "type": "bolt", "expectedColor": "blue"},

    {"id": "D01", "x": 310, "y": 622, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "D02", "x": 445, "y": 622, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "D03", "x": 585, "y": 622, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "D04", "x": 715, "y": 625, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "D05", "x": 842, "y": 628, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "D06", "x": 970, "y": 628, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "D07", "x": 1100, "y": 630, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "D08", "x": 1222, "y": 632, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "D09", "x": 1340, "y": 634, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "D10", "x": 1460, "y": 636, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "D11", "x": 1585, "y": 636, "r": 28, "type": "bolt", "expectedColor": "blue"},

    {"id": "E01", "x": 285, "y": 730, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "E02", "x": 420, "y": 728, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "E03", "x": 565, "y": 728, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "E04", "x": 715, "y": 728, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "E05", "x": 850, "y": 728, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "E06", "x": 985, "y": 728, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "E07", "x": 1120, "y": 730, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "E08", "x": 1250, "y": 730, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "E09", "x": 1380, "y": 730, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "E10", "x": 1508, "y": 730, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "E11", "x": 1625, "y": 730, "r": 28, "type": "bolt", "expectedColor": "blue"},

    {"id": "F01", "x": 270, "y": 836, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "F02", "x": 415, "y": 836, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "F03", "x": 565, "y": 836, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "F04", "x": 705, "y": 836, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "F05", "x": 855, "y": 838, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "F06", "x": 998, "y": 838, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "F07", "x": 1130, "y": 838, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "F08", "x": 1260, "y": 838, "r": 28, "type": "ignore", "expectedColor": "auto"},
    {"id": "F09", "x": 1400, "y": 840, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "F10", "x": 1530, "y": 840, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "F11", "x": 1660, "y": 840, "r": 28, "type": "bolt", "expectedColor": "blue"},

    {"id": "G01", "x": 235, "y": 960, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "G02", "x": 390, "y": 960, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "G03", "x": 555, "y": 960, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "G04", "x": 705, "y": 960, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "G05", "x": 855, "y": 960, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "G06", "x": 1008, "y": 962, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "G07", "x": 1155, "y": 962, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "G08", "x": 1300, "y": 962, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "G09", "x": 1440, "y": 962, "r": 28, "type": "bolt", "expectedColor": "black"},
    {"id": "G10", "x": 1572, "y": 962, "r": 28, "type": "bolt", "expectedColor": "blue"},
    {"id": "G11", "x": 1710, "y": 962, "r": 28, "type": "bolt", "expectedColor": "blue"},
]

# ── 默认阈值（与 HTML 界面默认值一致）──────────────────────────────

DEFAULT_THRESHOLDS: dict[str, float] = {
    "minPresence": 0.15,
    "maxPresence": 0.95,
    "maxOffsetRatio": 0.45,
    "maxShadowImbalance": 20.0,
}

# ── 颜色与状态映射 ──────────────────────────────────────────────────

STATUS_COLORS: dict[str, str] = {
    "OK": "#14804a",
    "REVIEW": "#b86b00",
    "MISSING": "#6a4ad8",
    "NG": "#c7352f",
    "IGNORE": "#737b82",
}

STATUS_TEXT: dict[str, str] = {
    "OK": "OK",
    "REVIEW": "复核",
    "MISSING": "缺失",
    "NG": "NG",
    "IGNORE": "忽略",
}

STATUS_ICONS: dict[str, str] = {
    "OK": "✅",
    "REVIEW": "⚠️",
    "MISSING": "❓",
    "NG": "❌",
    "IGNORE": "⏭️",
}


# ── 核心检测函数 ────────────────────────────────────────────────────

def is_object_pixel(red: int, green: int, blue: int, expected_color: str) -> bool:
    """判断单个像素是否符合预期颜色（移植自 JS isObjectPixel）。

    黑色: 亮度 < 76 且饱和度 < 70
    蓝色: blue > 78 且 blue > red*1.32 且 blue > green*1.08
    """
    luma = red * 0.299 + green * 0.587 + blue * 0.114
    black = luma < 76 and max(red, green, blue) - min(red, green, blue) < 70
    blue_like = blue > 78 and blue > red * 1.32 and blue > green * 1.08

    if expected_color == "black":
        return black
    if expected_color == "blue":
        return blue_like
    return black or blue_like


def collect_roi_stats(
    point: dict[str, Any],
    pixels: bytes,
    width: int,
    height: int,
    expected_color: str,
) -> dict[str, float]:
    """在圆形 ROI 内收集像素统计（移植自 JS collectRoiStats + 颜色组成增强）。

    返回 presenceRatio / centerOffsetRatio / shadowImbalance / blackRatio / blueRatio。
    """
    px = float(point["x"])
    py = float(point["y"])
    pr = float(point["r"])
    r2 = pr * pr

    roi_count = 0
    object_count = 0
    cx = 0.0
    cy = 0.0
    quadrants = [0, 0, 0, 0]
    black_count = 0
    blue_count = 0

    min_x = max(0, int(math.floor(px - pr)))
    max_x = min(width - 1, int(math.ceil(px + pr)))
    min_y = max(0, int(math.floor(py - pr)))
    max_y = min(height - 1, int(math.ceil(py + pr)))

    for y in range(min_y, max_y + 1):
        row_offset = y * width
        for x in range(min_x, max_x + 1):
            dx = x - px
            dy = y - py
            if dx * dx + dy * dy > r2:
                continue

            roi_count += 1
            idx = (row_offset + x) * 4
            red = pixels[idx]
            green = pixels[idx + 1]
            blue = pixels[idx + 2]

            luma = red * 0.299 + green * 0.587 + blue * 0.114
            is_black = luma < 76 and max(red, green, blue) - min(red, green, blue) < 70
            is_blue = blue > 78 and blue > red * 1.32 and blue > green * 1.08

            if is_black:
                black_count += 1
            if is_blue:
                blue_count += 1

            if is_object_pixel(red, green, blue, expected_color):
                object_count += 1
                cx += x
                cy += y
                quad = (1 if x >= px else 0) + (2 if y >= py else 0)
                quadrants[quad] += 1

    if object_count == 0 or roi_count == 0:
        return {
            "presenceRatio": 0.0,
            "centerOffsetRatio": 1.0,
            "shadowImbalance": 99.0,
            "blackRatio": 0.0,
            "blueRatio": 0.0,
        }

    cx /= object_count
    cy /= object_count
    center_offset = math.hypot(cx - px, cy - py)
    min_quad = max(1, min(quadrants))
    max_quad = max(quadrants)

    total_matched = black_count + blue_count
    black_ratio = black_count / total_matched if total_matched > 0 else 0.0
    blue_ratio = blue_count / total_matched if total_matched > 0 else 0.0

    return {
        "presenceRatio": object_count / roi_count,
        "centerOffsetRatio": center_offset / pr,
        "shadowImbalance": max_quad / min_quad,
        "blackRatio": black_ratio,
        "blueRatio": blue_ratio,
    }


def inspect_point(
    point: dict[str, Any],
    pixels: bytes,
    width: int,
    height: int,
    thresholds: dict[str, float],
    offset_x: float = 0,
    offset_y: float = 0,
    default_radius: float = 28,
    baseline_pixels: bytes | None = None,
    baseline_w: int | None = None,
    baseline_h: int | None = None,
) -> dict[str, Any]:
    """检测单个点位（多信号佐证模型）。

    状态判定逻辑:
      - MISSING (唯一判定): presenceRatio < 0.03 或 低于基准值 5%
      - REVIEW (多信号组合但占比未归零): 颜色剧变 / 像素差分高 / 占比偏低 / maxPresence / 阴影不均
      - NG: centerOffsetRatio 偏大
      - OK: 一切正常

    设计原则: 只有螺栓"真的不见了"（占比接近零）才判 MISSING。
    光照变化、局部遮挡、涂层差异导致的颜色/像素变化只触发 REVIEW。
    """
    original_type = point.get("type", "bolt")
    expected_color = point.get("expectedColor", "auto")
    baseline = point.get("baseline")

    if original_type == "ignore":
        return {
            "id": point["id"],
            "type": "ignore",
            "status": "IGNORE",
            "presenceRatio": 0.0,
            "centerOffsetRatio": 0.0,
            "shadowImbalance": 0.0,
            "note": "非螺栓点位，跳过检测",
        }

    sampled_point = {
        "x": point["x"] + offset_x,
        "y": point["y"] + offset_y,
        "r": point.get("r", default_radius),
    }

    stats = collect_roi_stats(sampled_point, pixels, width, height, expected_color)
    notes: list[str] = []
    status = "OK"

    effective_min_presence = thresholds["minPresence"]
    if baseline and baseline.get("presenceRatio", 0) > 0:
        diff_threshold = baseline["presenceRatio"] * 0.30
        effective_min_presence = max(effective_min_presence, diff_threshold)

    color_changed = False
    color_shifted = False
    delta_black = 0.0
    delta_blue = 0.0
    if baseline and baseline.get("presenceRatio", 0) > 0:
        delta_black = abs(stats["blackRatio"] - baseline.get("blackRatio", 0.5))
        delta_blue = abs(stats["blueRatio"] - baseline.get("blueRatio", 0.5))
        if delta_black > 0.30 or delta_blue > 0.30 or (delta_black + delta_blue) >= 0.30:
            color_changed = True
        if delta_black + delta_blue >= 0.15:
            color_shifted = True

    pixel_diff = 0.0
    pixel_diff_high = False
    if baseline_pixels is not None and baseline_w is not None and baseline_h is not None:
        px = float(sampled_point["x"])
        py = float(sampled_point["y"])
        pr = float(sampled_point["r"])
        r2 = pr * pr
        min_x = max(0, int(math.floor(px - pr)))
        max_x = min(width - 1, int(math.ceil(px + pr)))
        min_y = max(0, int(math.floor(py - pr)))
        max_y = min(height - 1, int(math.ceil(py + pr)))
        diff_sum = 0.0
        roi_count = 0
        for y in range(min_y, max_y + 1):
            new_row = y * width
            base_row = y * baseline_w
            for x in range(min_x, max_x + 1):
                dx = x - px
                dy = y - py
                if dx * dx + dy * dy > r2:
                    continue
                roi_count += 1
                new_idx = (new_row + x) * 4
                base_idx = (base_row + x) * 4
                nr = pixels[new_idx]
                ng = pixels[new_idx + 1]
                nb = pixels[new_idx + 2]
                br = baseline_pixels[base_idx]
                bg = baseline_pixels[base_idx + 1]
                bb = baseline_pixels[base_idx + 2]
                diff_sum += abs(int(nr) - int(br)) + abs(int(ng) - int(bg)) + abs(int(nb) - int(bb))
        pixel_diff = diff_sum / roi_count if roi_count > 0 else 0
        if pixel_diff > 70.0:
            pixel_diff_high = True

    pr_ratio = (
        stats["presenceRatio"] / baseline["presenceRatio"]
        if baseline and baseline.get("presenceRatio", 0) > 0
        else 1.0
    )
    truly_low_presence = (
        stats["presenceRatio"] < 0.03
        or (baseline and baseline.get("presenceRatio", 0) > 0 and pr_ratio < 0.05)
    )
    moderately_low = stats["presenceRatio"] < effective_min_presence

    if truly_low_presence:
        status = "MISSING"
        if baseline and baseline.get("presenceRatio", 0) > 0:
            notes.append(f"占比仅为基准值的 {pr_ratio*100:.0f}%，螺栓完全缺失")
        else:
            notes.append("目标颜色占比极低，疑似缺失")
    elif color_changed and pixel_diff_high and moderately_low:
        status = "REVIEW"
        delta_black = abs(stats["blackRatio"] - baseline.get("blackRatio", 0.5))
        delta_blue = abs(stats["blueRatio"] - baseline.get("blueRatio", 0.5))
        notes.append(
            f"颜色剧变（Δ黑={delta_black:.2f}, Δ蓝={delta_blue:.2f}）+ 像素差异（{pixel_diff:.1f}）+ 占比偏低，但螺栓仍可见，建议复核"
        )
    elif color_changed and pixel_diff_high:
        status = "REVIEW"
        delta_black = abs(stats["blackRatio"] - baseline.get("blackRatio", 0.5))
        delta_blue = abs(stats["blueRatio"] - baseline.get("blueRatio", 0.5))
        notes.append(
            f"颜色剧变 + 像素差异较大，但占比正常，螺栓外观可能因角度/涂层变化"
        )
    elif color_changed and moderately_low:
        status = "REVIEW"
        delta_black = abs(stats["blackRatio"] - baseline.get("blackRatio", 0.5))
        delta_blue = abs(stats["blueRatio"] - baseline.get("blueRatio", 0.5))
        notes.append(f"颜色剧变（Δ黑={delta_black:.2f}, Δ蓝={delta_blue:.2f}）+ 占比偏低，建议复核")
    elif pixel_diff_high and moderately_low:
        status = "REVIEW"
        notes.append(f"像素差异（{pixel_diff:.1f}）+ 占比偏低，可能局部遮挡，建议复核")
    elif color_changed:
        status = "REVIEW"
        delta_black = abs(stats["blackRatio"] - baseline.get("blackRatio", 0.5))
        delta_blue = abs(stats["blueRatio"] - baseline.get("blueRatio", 0.5))
        notes.append(f"颜色组成剧变（Δ黑={delta_black:.2f}, Δ蓝={delta_blue:.2f}），建议复核")
    elif moderately_low:
        status = "REVIEW"
        notes.append("目标颜色占比偏低，建议复核")
    else:
        if stats["presenceRatio"] > thresholds["maxPresence"]:
            status = "REVIEW"
            notes.append("目标颜色占比过高，可能遮挡、污染或 ROI 半径过大")

        if stats["centerOffsetRatio"] > thresholds["maxOffsetRatio"]:
            status = "NG"
            notes.append("中心偏移偏大，疑似未贴合")

        if stats["shadowImbalance"] > thresholds["maxShadowImbalance"]:
            if status != "NG":
                status = "REVIEW"
            notes.append("ROI 阴影不均，疑似翘起或反光干扰")

    result = {
        "id": point["id"],
        "type": original_type,
        "status": status,
        "presenceRatio": stats["presenceRatio"],
        "centerOffsetRatio": stats["centerOffsetRatio"],
        "shadowImbalance": stats["shadowImbalance"],
        "blackRatio": stats["blackRatio"],
        "blueRatio": stats["blueRatio"],
        "avgPixelDiff": pixel_diff,
        "note": "；".join(notes) if notes else "疑似贴合",
    }
    if baseline:
        result["baselineRatio"] = round(stats["presenceRatio"] / baseline["presenceRatio"], 4) if baseline["presenceRatio"] > 0 else 1.0
        if baseline.get("blackRatio") is not None:
            result["deltaBlackRatio"] = round(stats["blackRatio"] - baseline["blackRatio"], 4)
        if baseline.get("blueRatio") is not None:
            result["deltaBlueRatio"] = round(stats["blueRatio"] - baseline["blueRatio"], 4)
    return result


# ── 全局相对校准 ──────────────────────────────────────────────────────

def _parse_point_id(pid: str) -> tuple[str, int] | None:
    """解析点位 ID（如 'A07' -> ('A', 7)，'B11' -> ('B', 11)），解析失败返回 None。"""
    if len(pid) < 2:
        return None
    row = pid[0]
    try:
        col = int(pid[1:])
    except ValueError:
        return None
    if not ('A' <= row <= 'Z') or col <= 0:
        return None
    return (row, col)


def _connected_component(root: str, nodes: set[str]) -> set[str]:
    """在给定的节点集合中，返回包含 root 的 4-邻接连通分量（广度优先）。"""
    seen: set[str] = set()
    queue: list[str] = [root]
    while queue:
        cur = queue.pop(0)
        if cur in seen or cur not in nodes:
            continue
        seen.add(cur)
        parsed = _parse_point_id(cur)
        if parsed is None:
            continue
        row, col = parsed
        for nid in (
            f"{row}{col - 1:02d}",
            f"{row}{col + 1:02d}",
            f"{chr(ord(row) - 1)}{col:02d}",
            f"{chr(ord(row) + 1)}{col:02d}",
        ):
            if nid in nodes and nid not in seen:
                queue.append(nid)
    return seen


def calibrate_by_relative_diff(
    results: list[dict[str, Any]],
    outlier_multiplier: float = 2.0,
    missing_multiplier: float = 2.3,
    cluster_size_threshold: int = 2,
    color_shift_sum: float = 0.15,
) -> None:
    """
    基于同图 avgPixelDiff 中位数对 OK 点进行相对校准（带空间连通分量保护）。

    包含两个阶段：
    A) 垫片式 MISSING 检测（高阈值 + 颜色偏移 + 孤立分量 → MISSING）：
       场景：螺栓不见但垫片/蓝色环留在孔里 → presenceRatio 不低（因为垫片也是目标颜色），
       但 pixel_diff 特别高 + 颜色组成有偏移 → 需要相对中位数的强信号 + 空间孤立
       才能判 MISSING，避免电批阴影等局部成片干扰。

    B) 一般 REVIEW 校准（中阈值 + 孤立分量 → REVIEW）：
       螺栓本身正常，但平均像素差异显著高于同图中位数的孤立异常点。

    空间连通分量保护：实际拍摄中常出现局部系统性干扰（如电批阴影、局部反光），
    导致相邻多个螺栓的 avgDiff 同时偏高。这种成片的"离群"是系统噪声，
    不是螺栓本身异常。因此：
    1. 找出所有候选离群点
    2. 按 4-邻接（上下左右）计算连通分量
    3. 若某分量大小 >= cluster_size_threshold，视为系统性干扰，该分量全部跳过
    4. 仅真正孤立的点（分量大小 < cluster_size_threshold，默认即单个孤立点）才升级

    仅统计非 MISSING / IGNORE 的点位作为有效样本。
    有效样本不足 10 个时跳过（避免中位数失真）。
    """
    valid_diffs = sorted(
        r["avgPixelDiff"] for r in results
        if r["status"] not in ("MISSING", "IGNORE") and r.get("avgPixelDiff", 0) > 0
    )
    if len(valid_diffs) < 10:
        return

    median = valid_diffs[len(valid_diffs) // 2]
    missing_threshold = median * missing_multiplier
    review_threshold = median * outlier_multiplier

    result_by_id = {r["id"]: r for r in results}

    def _delta_sum(r: dict) -> float:
        db = abs(r.get("deltaBlackRatio") or 0)
        dbl = abs(r.get("deltaBlueRatio") or 0)
        return db + dbl

    # ── Stage A: 垫片式 MISSING 检测 ──────────────────────────────────
    # 两路子判定，满足任意一路即成为 missing 候选：
    #   a) 垫片方向强信号：Δblack<0 且 Δblue>0（蓝变多、黑变少=垫片暴露）+ ≥2×中位数 + 颜色偏移≥阈值
    #   b) 通用强异常：颜色偏移足够明显 + ≥missing_multiplier×中位数（默认2.3）
    #
    # 空间保护：missing 候选的连通分量 ≥ missing_cluster_threshold（默认 4）视为
    #          电批阴影/反光等成片系统干扰，跳过。4 个以下的小分量（典型是 1-2 个螺栓缺失）
    #          才升级 MISSING——系统性干扰通常影响 6+ 个相邻点位。
    missing_candidates_a = {
        r["id"]
        for r in results
        if r["status"] == "OK"
        and r.get("avgPixelDiff", 0) > review_threshold  # a 路：垫片方向只需 2×中位数
        and (r.get("deltaBlackRatio") or 0) < 0
        and (r.get("deltaBlueRatio") or 0) > 0
        and _delta_sum(r) >= color_shift_sum
    }
    # b 路：没有方向约束，但要排除「纯阴影方向（黑↑蓝↓）」的弱信号——
    #       这种点几乎都是电批/灯光阴影。另外排除 presenceRatio 极高（>0.90）的点，
    #       这些几乎全是目标颜色，通常是严重阴影覆盖，螺栓本身仍 OK。
    #       分档：
    #         - 非阴影方向（Δblack<=0 or Δblue>=0 中性/垫片）：Δsum≥0.19
    #         - 阴影方向（Δblack>0 AND Δblue<0）：Δsum≥0.20，并且 pr≤0.90
    def _is_shadow_direction(r: dict) -> bool:
        return (r.get("deltaBlackRatio") or 0) > 0 and (r.get("deltaBlueRatio") or 0) < 0

    missing_candidates_b = set()
    for r in results:
        if r["status"] != "OK":
            continue
        if r.get("avgPixelDiff", 0) <= missing_threshold:
            continue
        ds = _delta_sum(r)
        if _is_shadow_direction(r):
            if ds >= 0.195 and r.get("presenceRatio", 1.0) <= 0.90:
                missing_candidates_b.add(r["id"])
        else:
            if ds >= max(color_shift_sum, 0.19):
                missing_candidates_b.add(r["id"])

    missing_candidates = missing_candidates_a | missing_candidates_b

    visited_m: set[str] = set()
    upgrade_missing: set[str] = set()
    for pid in sorted(missing_candidates):
        if pid in visited_m:
            continue
        comp = _connected_component(pid, missing_candidates)
        visited_m |= comp
        # 分量 < 4 才升级（2 个相邻螺栓都 missing 很常见，4+ 才算成片干扰）
        if len(comp) < 4:
            upgrade_missing |= comp

    for pid in sorted(upgrade_missing):
        r = result_by_id[pid]
        r["status"] = "MISSING"
        extra = (
            f"像素差异极大（{r['avgPixelDiff']:.1f}，高于同图中位数 {median:.1f} 的 {missing_multiplier} 倍）"
            f" + 颜色偏移（Δ黑+Δ蓝={_delta_sum(r):.2f}），疑似螺栓缺失但垫片仍可见"
        )
        r["note"] = (r["note"] + "；" + extra) if r["note"] else extra

    # ── Stage B: 一般 REVIEW 校准（对已是 REVIEW 的不再降级/修改）───
    review_candidates = {
        r["id"]
        for r in results
        if r["status"] == "OK"
        and r.get("avgPixelDiff", 0) > review_threshold
    }
    visited_r: set[str] = set()
    upgrade_review: set[str] = set()
    for pid in sorted(review_candidates):
        if pid in visited_r:
            continue
        comp = _connected_component(pid, review_candidates)
        visited_r |= comp
        if len(comp) < cluster_size_threshold:
            upgrade_review |= comp

    for pid in sorted(upgrade_review):
        r = result_by_id[pid]
        r["status"] = "REVIEW"
        extra = (
            f"像素差异偏高（{r['avgPixelDiff']:.1f}），高于同图中位数 {median:.1f} 的 {outlier_multiplier} 倍"
        )
        r["note"] = (r["note"] + "；" + extra) if r["note"] else extra


# ── 配置加载 ────────────────────────────────────────────────────────

def load_layout_config(config_path: str | None) -> list[dict[str, Any]]:
    """从 JSON 文件加载点位布局，失败时回退到 DEFAULT_LAYOUT。"""
    if not config_path:
        return json.loads(json.dumps(DEFAULT_LAYOUT))

    path = Path(config_path)
    if not path.exists():
        print(f"[警告] 配置文件不存在: {config_path}，使用默认布局", file=sys.stderr)
        return json.loads(json.dumps(DEFAULT_LAYOUT))

    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if not isinstance(data, list) or len(data) == 0:
            raise ValueError("配置文件必须是非空数组")
        return data
    except (json.JSONDecodeError, ValueError) as e:
        print(f"[警告] 配置文件解析失败: {e}，使用默认布局", file=sys.stderr)
        return json.loads(json.dumps(DEFAULT_LAYOUT))


# ── 结果输出 ────────────────────────────────────────────────────────

def print_results(results: list[dict[str, Any]], image_name: str, thresholds: dict[str, float]) -> None:
    """在终端打印检测结果表格。"""
    counts: dict[str, int] = {"OK": 0, "REVIEW": 0, "MISSING": 0, "NG": 0, "IGNORE": 0}
    for r in results:
        counts[r["status"]] = counts.get(r["status"], 0) + 1

    print(f"\n{'='*100}")
    print(f"  螺栓贴合 ROI 检测结果  |  图像: {image_name}")
    print(f"  阈值: minPresence={thresholds['minPresence']}  maxPresence={thresholds['maxPresence']}  "
          f"maxOffsetRatio={thresholds['maxOffsetRatio']}  maxShadowImbalance={thresholds['maxShadowImbalance']}")
    print(f"  汇总: OK={counts['OK']}  复核={counts['REVIEW']}  缺失={counts['MISSING']}  "
          f"NG={counts['NG']}  忽略={counts['IGNORE']}")
    print(f"{'='*100}")

    header = f"  {'点位':<6} {'类型':<6} {'状态':<14} {'占比':>8} {'偏心':>8} {'阴影差':>8}  说明"
    print(header)
    print(f"  {'-'*94}")

    for r in results:
        icon = STATUS_ICONS.get(r["status"], "  ")
        status_text = STATUS_TEXT.get(r["status"], r["status"])
        type_text = "螺栓" if r["type"] == "bolt" else "忽略"
        presence = f"{r['presenceRatio']*100:.1f}%"
        offset = f"{r['centerOffsetRatio']:.2f} R"
        shadow = f"{r['shadowImbalance']:.2f}"
        print(f"  {r['id']:<6} {type_text:<6} {icon} {status_text:<10} {presence:>8} {offset:>8} {shadow:>8}  {r['note']}")

    print(f"{'='*100}\n")


def export_json(results: list[dict[str, Any]], image_name: str, thresholds: dict[str, float], path: str) -> None:
    """导出 JSON 结果文件。"""
    payload = {
        "imageName": image_name,
        "thresholds": thresholds,
        "results": results,
    }
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"[导出] JSON 结果已保存至: {path}")


def export_csv(results: list[dict[str, Any]], path: str) -> None:
    """导出 CSV 结果文件。"""
    with open(path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["点位", "类型", "状态", "占比", "偏心", "阴影差", "说明"])
        for r in results:
            writer.writerow([
                r["id"],
                "螺栓" if r["type"] == "bolt" else "忽略",
                STATUS_TEXT.get(r["status"], r["status"]),
                f"{r['presenceRatio']*100:.1f}%",
                f"{r['centerOffsetRatio']:.2f} R",
                f"{r['shadowImbalance']:.2f}",
                r["note"],
            ])
    print(f"[导出] CSV 结果已保存至: {path}")


# ── 主入口 ──────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="螺栓贴合 ROI 检测 (Python 版)")
    parser.add_argument("--image", "-i", required=True, help="输入图片路径")
    parser.add_argument("--config", "-c", default=None, help="点位布局 JSON 配置文件路径")
    parser.add_argument("--export", "-e", default=None, help="导出 JSON 结果文件路径")
    parser.add_argument("--export-csv", default=None, help="导出 CSV 结果文件路径")
    parser.add_argument("--offset-x", type=float, default=0, help="全局 X 偏移")
    parser.add_argument("--offset-y", type=float, default=0, help="全局 Y 偏移")
    parser.add_argument("--min-presence", type=float, default=None, help="最小占比阈值")
    parser.add_argument("--max-presence", type=float, default=None, help="最大占比阈值")
    parser.add_argument("--max-offset", type=float, default=None, help="最大偏心阈值")
    parser.add_argument("--max-shadow", type=float, default=None, help="最大阴影差阈值")
    args = parser.parse_args()

    image_path = Path(args.image)
    if not image_path.exists():
        print(f"[错误] 图片文件不存在: {image_path}", file=sys.stderr)
        sys.exit(1)

    thresholds = dict(DEFAULT_THRESHOLDS)
    if args.min_presence is not None:
        thresholds["minPresence"] = args.min_presence
    if args.max_presence is not None:
        thresholds["maxPresence"] = args.max_presence
    if args.max_offset is not None:
        thresholds["maxOffsetRatio"] = args.max_offset
    if args.max_shadow is not None:
        thresholds["maxShadowImbalance"] = args.max_shadow

    layout = load_layout_config(args.config)

    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    pixels = img.tobytes()

    print(f"[信息] 图片: {image_path}  |  尺寸: {width} x {height}  |  点位: {len(layout)} 个")

    results = []
    for point in layout:
        result = inspect_point(
            point, pixels, width, height, thresholds,
            offset_x=args.offset_x, offset_y=args.offset_y,
        )
        results.append(result)

    print_results(results, str(image_path.name), thresholds)

    if args.export:
        export_json(results, str(image_path.name), thresholds, args.export)

    if args.export_csv:
        export_csv(results, args.export_csv)


if __name__ == "__main__":
    main()