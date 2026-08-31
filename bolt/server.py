"""
螺栓贴合 ROI 检测 —— Flask Web 服务
前端通过 /api/detect 接口调用 bolt_inspect.py 中的检测逻辑。

用法:
    pip install Flask Pillow
    python server.py
    打开 http://localhost:5000
"""

from __future__ import annotations

import json
import sys
import tempfile
import os
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

from flask import Flask, request, jsonify, send_from_directory, send_file

from bolt_inspect import (
    DEFAULT_LAYOUT,
    DEFAULT_THRESHOLDS,
    calibrate_by_relative_diff,
    inspect_point,
    load_layout_config,
)
from PIL import Image

app = Flask(__name__, static_folder="static", template_folder="templates")

BASE_DIR = Path(__file__).resolve().parent
STANDARD_LAYOUT_PATH = BASE_DIR / "standard_layout.json"
STANDARD_IMAGE_PATH = BASE_DIR / "templates" / "Standard.jpeg"

SAMPLE_IMAGE = (
    Path(__file__).resolve().parent.parent / "luoshuan" / "assets" / "sample-board.png"
)

_standard_pixels_cache: dict | None = None


def get_standard_pixels():
    global _standard_pixels_cache
    if _standard_pixels_cache is not None:
        return _standard_pixels_cache
    if not STANDARD_IMAGE_PATH.exists():
        return None
    img = Image.open(str(STANDARD_IMAGE_PATH)).convert("RGBA")
    _standard_pixels_cache = {
        "pixels": img.tobytes(),
        "width": img.size[0],
        "height": img.size[1],
    }
    return _standard_pixels_cache


def load_standard_layout():
    if STANDARD_LAYOUT_PATH.exists():
        try:
            with open(STANDARD_LAYOUT_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, OSError):
            pass
    from bolt_inspect import DEFAULT_LAYOUT
    return json.loads(json.dumps(DEFAULT_LAYOUT))


@app.route("/")
def index():
    return send_from_directory("templates", "index.html")


@app.route("/api/defaults")
def get_defaults():
    layout = load_standard_layout()
    image_url = None
    image_name = "Standard.jpeg"
    if STANDARD_IMAGE_PATH.exists():
        image_url = "/api/standard-image"
        image_name = STANDARD_IMAGE_PATH.name
    elif SAMPLE_IMAGE.exists():
        image_url = f"/api/sample-image?name=sample-board.png"
        image_name = "sample-board.png"
    return jsonify({
        "layout": layout,
        "thresholds": DEFAULT_THRESHOLDS,
        "imageUrl": image_url,
        "imageName": image_name,
    })


@app.route("/api/sample-image")
def serve_sample_image():
    if not SAMPLE_IMAGE.exists():
        return jsonify({"error": "sample image not found"}), 404
    return send_file(str(SAMPLE_IMAGE), mimetype="image/png")


@app.route("/api/standard-image")
def serve_standard_image():
    if not STANDARD_IMAGE_PATH.exists():
        return jsonify({"error": "standard image not found"}), 404
    return send_file(str(STANDARD_IMAGE_PATH), mimetype="image/jpeg")


@app.route("/api/layout", methods=["GET"])
def get_layout():
    layout = load_standard_layout()
    return jsonify(layout)


@app.route("/api/layout", methods=["POST"])
def save_layout():
    try:
        layout = request.get_json()
        if not isinstance(layout, list) or len(layout) == 0:
            return jsonify({"error": "布局必须是非空数组"}), 400
        with open(STANDARD_LAYOUT_PATH, "w", encoding="utf-8") as f:
            json.dump(layout, f, ensure_ascii=False, indent=2)
        return jsonify({"ok": True, "count": len(layout)})
    except (json.JSONDecodeError, OSError, TypeError) as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return jsonify({"error": "缺少图片文件"}), 400

    image_file = request.files["image"]
    if not image_file.filename:
        return jsonify({"error": "图片文件名为空"}), 400

    try:
        layout = json.loads(request.form.get("layout", "null"))
        if not layout:
            return jsonify({"error": "缺少 layout 参数"}), 400
    except (json.JSONDecodeError, TypeError):
        return jsonify({"error": "layout 参数格式错误"}), 400

    thresholds = dict(DEFAULT_THRESHOLDS)
    try:
        incoming = json.loads(request.form.get("thresholds", "{}"))
        for k in thresholds:
            if k in incoming:
                thresholds[k] = float(incoming[k])
    except (json.JSONDecodeError, TypeError, ValueError):
        pass

    offset_x = float(request.form.get("offsetX", 0))
    offset_y = float(request.form.get("offsetY", 0))

    ext = Path(image_file.filename).suffix or ".png"
    with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
        image_file.save(tmp)
        tmp_path = tmp.name

    try:
        img = Image.open(tmp_path).convert("RGBA")
        width, height = img.size
        pixels = img.tobytes()

        std_data = get_standard_pixels()
        baseline_pixels = std_data["pixels"] if std_data else None
        baseline_w = std_data["width"] if std_data else None
        baseline_h = std_data["height"] if std_data else None

        results = []
        for point in layout:
            result = inspect_point(
                point, pixels, width, height, thresholds,
                offset_x=offset_x, offset_y=offset_y,
                baseline_pixels=baseline_pixels,
                baseline_w=baseline_w,
                baseline_h=baseline_h,
            )
            results.append(result)

        calibrate_by_relative_diff(results)

        return jsonify({
            "imageName": image_file.filename,
            "width": width,
            "height": height,
            "thresholds": thresholds,
            "results": results,
        })
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass


@app.route("/api/detect-sample", methods=["POST"])
def detect_sample():
    if STANDARD_IMAGE_PATH.exists():
        image_source_path = STANDARD_IMAGE_PATH
        image_name = STANDARD_IMAGE_PATH.name
    elif SAMPLE_IMAGE.exists():
        image_source_path = SAMPLE_IMAGE
        image_name = "sample-board.png"
    else:
        return jsonify({"error": "standard image not found"}), 404

    try:
        layout = json.loads(request.form.get("layout", "null"))
        if not layout:
            layout = load_standard_layout()
    except (json.JSONDecodeError, TypeError):
        layout = load_standard_layout()

    thresholds = dict(DEFAULT_THRESHOLDS)
    try:
        incoming = json.loads(request.form.get("thresholds", "{}"))
        for k in thresholds:
            if k in incoming:
                thresholds[k] = float(incoming[k])
    except (json.JSONDecodeError, TypeError, ValueError):
        pass

    offset_x = float(request.form.get("offsetX", 0))
    offset_y = float(request.form.get("offsetY", 0))

    img = Image.open(str(image_source_path)).convert("RGBA")
    width, height = img.size
    pixels = img.tobytes()

    std_data = get_standard_pixels()
    baseline_pixels = std_data["pixels"] if std_data else None
    baseline_w = std_data["width"] if std_data else None
    baseline_h = std_data["height"] if std_data else None

    results = []
    for point in layout:
        result = inspect_point(
            point, pixels, width, height, thresholds,
            offset_x=offset_x, offset_y=offset_y,
            baseline_pixels=baseline_pixels,
            baseline_w=baseline_w,
            baseline_h=baseline_h,
        )
        results.append(result)

    calibrate_by_relative_diff(results)

    return jsonify({
        "imageName": image_name,
        "width": width,
        "height": height,
        "thresholds": thresholds,
        "results": results,
    })


if __name__ == "__main__":
    print("=" * 60)
    print("  螺栓贴合 ROI 检测 —— Web 服务")
    print(f"  样例图片: {SAMPLE_IMAGE}")
    print("  访问地址: http://localhost:5000")
    print("  按 Ctrl+C 退出")
    print("=" * 60)
    app.run(host="0.0.0.0", port=5000, debug=True)