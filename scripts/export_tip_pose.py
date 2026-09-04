#!/usr/bin/env python3
"""Export the trained pose model to ONNX for application integration."""

import argparse
import shutil
from pathlib import Path

from ultralytics import YOLO


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("weights", type=Path)
    parser.add_argument("--output", type=Path, default=Path("training/models/screwdriver-tip.onnx"))
    parser.add_argument("--imgsz", type=int, default=960)
    return parser.parse_args()


def main():
    args = parse_args()
    if not args.weights.is_file():
        raise SystemExit(f"Weights not found: {args.weights}")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    model = YOLO(str(args.weights))
    exported = Path(
        model.export(
            format="onnx",
            imgsz=args.imgsz,
            opset=17,
            simplify=True,
            dynamic=False,
        )
    )
    shutil.copy2(exported, args.output)
    print(f"ONNX model: {args.output}")


if __name__ == "__main__":
    main()

