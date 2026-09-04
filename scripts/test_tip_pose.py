#!/usr/bin/env python3
"""Run a trained pose model on a video and save an annotated result."""

import argparse
from pathlib import Path

import torch
from ultralytics import YOLO


def default_device():
    return "mps" if torch.backends.mps.is_available() else "cpu"


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("weights", type=Path)
    parser.add_argument("source", type=Path)
    parser.add_argument("--imgsz", type=int, default=960)
    parser.add_argument("--confidence", type=float, default=0.35)
    parser.add_argument("--device", default=default_device())
    return parser.parse_args()


def main():
    args = parse_args()
    if not args.weights.is_file():
        raise SystemExit(f"Weights not found: {args.weights}")
    if not args.source.is_file():
        raise SystemExit(f"Source not found: {args.source}")
    model = YOLO(str(args.weights))
    results = model.predict(
        source=str(args.source),
        imgsz=args.imgsz,
        conf=args.confidence,
        device=args.device,
        save=True,
        project=str(Path("training/predictions").resolve()),
        name=args.source.stem,
        exist_ok=True,
        stream=True,
        verbose=False,
    )
    for _ in results:
        pass


if __name__ == "__main__":
    main()
