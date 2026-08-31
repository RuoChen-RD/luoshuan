import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from bolt_inspect import *
from PIL import Image

BASE = Path(__file__).resolve().parent
layout = load_layout_config(str(BASE / 'standard_layout.json'))
std_img = Image.open(str(BASE / 'templates' / 'Standard.jpeg')).convert('RGBA')
tp = dict(DEFAULT_THRESHOLDS)

def run_test(img_name, label, key_points=None):
    img = Image.open(str(BASE / 'templates' / img_name)).convert('RGBA')
    results = []
    for p in layout:
        r = inspect_point(p, img.tobytes(), img.size[0], img.size[1], tp,
                          baseline_pixels=std_img.tobytes(), baseline_w=std_img.size[0], baseline_h=std_img.size[1])
        results.append(r)

    before_counts = {}
    for r in results:
        before_counts[r['status']] = before_counts.get(r['status'], 0) + 1

    calibrate_by_relative_diff(results, outlier_multiplier=2.0)

    after_counts = {}
    for r in results:
        after_counts[r['status']] = after_counts.get(r['status'], 0) + 1

    valid_diffs = sorted(r['avgPixelDiff'] for r in results if r['status'] not in ('MISSING','IGNORE') and r.get('avgPixelDiff',0) > 0)
    median = valid_diffs[len(valid_diffs)//2] if valid_diffs else 0
    threshold = median * 2.0

    print(f'\n=== {label} ({img_name}) ===')
    print(f'  校准前: {before_counts}')
    print(f'  校准后: {after_counts}')
    print(f'  有效样本中位数={median:.1f}  离群阈值(2x)={threshold:.1f}')

    if key_points:
        print(f'  关键点位:')
        for r in results:
            if r['id'] in key_points:
                exp = key_points[r['id']]
                marker = ' <<<' if exp and r['status'] != exp else ''
                print(f'    {r["id"]:4s} -> {r["status"]:7s} pr={r["presenceRatio"]:.3f} avgDiff={r["avgPixelDiff"]:.1f} note={r["note"][:80]}{(" (expect " + exp + ")") if exp else ""}{marker}')

    upgraded = [r for r in results if '像素差异偏高' in r['note']]
    if upgraded:
        print(f'  被相对校准升级的点 ({len(upgraded)}):', [(r['id'], f"{r['avgPixelDiff']:.1f}") for r in upgraded])

run_test('frame_000305.jpg', '新图 (光照一致)', key_points={
    'C08': None, 'B10': None, 'B11': None, 'B09': None, 'C07': None,
    'A10': None, 'A11': None,
})

run_test('frame_000135.jpg', '旧图 (光照差异大)', key_points={
    'A08': 'REVIEW', 'A09': 'REVIEW', 'A10': 'REVIEW',
    'B06': 'REVIEW', 'B07': 'REVIEW', 'B08': 'REVIEW',
})
