"""Find optimal thresholds for standard image - all points must pass."""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from bolt_inspect import inspect_point, DEFAULT_THRESHOLDS
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent
layout_path = BASE_DIR / "standard_layout.json"
img_path = BASE_DIR / "templates" / "Standard.jpeg"

with open(layout_path, "r", encoding="utf-8") as f:
    layout = json.load(f)

img = Image.open(str(img_path)).convert("RGBA")
width, height = img.size
pixels = img.tobytes()

# First, collect all raw metrics
bolt_metrics = []
for point in layout:
    if point.get("type") == "ignore":
        continue
    r = inspect_point(point, pixels, width, height, DEFAULT_THRESHOLDS)
    bolt_metrics.append(r)

print(f"Total bolt points: {len(bolt_metrics)}")
print()

# Sort by each metric
sorted_by_presence = sorted(bolt_metrics, key=lambda x: x["presenceRatio"])
sorted_by_offset = sorted(bolt_metrics, key=lambda x: x["centerOffsetRatio"])
sorted_by_shadow = sorted(bolt_metrics, key=lambda x: x["shadowImbalance"])

print("=== METRIC RANGES ===")
print(f"  presenceRatio:        min={sorted_by_presence[0]['presenceRatio']:.4f}  max={sorted_by_presence[-1]['presenceRatio']:.4f}")
print(f"  centerOffsetRatio:    min={sorted_by_offset[0]['centerOffsetRatio']:.4f}  max={sorted_by_offset[-1]['centerOffsetRatio']:.4f}")
print(f"  shadowImbalance:      min={sorted_by_shadow[0]['shadowImbalance']:.4f}  max={sorted_by_shadow[-1]['shadowImbalance']:.4f}")
print()

# Show the top 5 max for each metric
print("=== TOP 5 BY PRESENCE ===")
for r in sorted_by_presence[-5:]:
    print(f"  {r['id']:6s} presence={r['presenceRatio']:.4f}")

print()
print("=== TOP 5 BY OFFSET ===")
for r in sorted_by_offset[-5:]:
    print(f"  {r['id']:6s} offset={r['centerOffsetRatio']:.4f}")

print()
print("=== TOP 5 BY SHADOW ===")
for r in sorted_by_shadow[-5:]:
    print(f"  {r['id']:6s} shadow={r['shadowImbalance']:.4f}")

# Now try different thresholds to find what works
print()
print("=== SEARCHING FOR OPTIMAL THRESHOLDS ===")

# Test a range of thresholds
test_thresholds = [
    {"minPresence": 0.05, "maxPresence": 0.95, "maxOffsetRatio": 0.40, "maxShadowImbalance": 3.0},
    {"minPresence": 0.04, "maxPresence": 0.95, "maxOffsetRatio": 0.40, "maxShadowImbalance": 5.0},
    {"minPresence": 0.03, "maxPresence": 0.95, "maxOffsetRatio": 0.45, "maxShadowImbalance": 10.0},
    {"minPresence": 0.02, "maxPresence": 0.98, "maxOffsetRatio": 0.45, "maxShadowImbalance": 15.0},
    {"minPresence": 0.02, "maxPresence": 1.00, "maxOffsetRatio": 0.50, "maxShadowImbalance": 20.0},
]

for th in test_thresholds:
    results = []
    for point in layout:
        r = inspect_point(point, pixels, width, height, th)
        results.append(r)
    ok_count = sum(1 for r in results if r["status"] == "OK")
    non_ok = [r for r in results if r["status"] != "OK"]
    print(f"  Thresholds: {th}")
    print(f"    OK={ok_count}/{len(results)}  Non-OK={len(non_ok)}")
    if non_ok:
        for r in non_ok:
            print(f"      {r['id']:6s} status={r['status']} presence={r['presenceRatio']:.4f} offset={r['centerOffsetRatio']:.4f} shadow={r['shadowImbalance']:.4f} note={r['note']}")
    print()