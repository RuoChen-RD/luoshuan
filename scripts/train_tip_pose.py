#!/usr/bin/env python3
"""Train a YOLOv8 nano pose model with one screwdriver-tip keypoint."""

import argparse
from pathlib import Path

import torch
from ultralytics import YOLO


def default_device():
    return "mps" if torch.backends.mps.is_available() else "cpu"


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", type=Path, default=Path("training/dataset.yaml"))
    parser.add_argument("--model", default="yolov8n-pose.pt")
    parser.add_argument("--epochs", type=int, default=120)
    parser.add_argument("--imgsz", type=int, default=960)
    parser.add_argument("--batch", type=int, default=8)
    parser.add_argument("--device", default=default_device())
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--name", default="screwdriver-tip-yolov8n")
    return parser.parse_args()


def main():
    args = parse_args()
    if not args.data.is_file():
        raise SystemExit(f"Dataset config not found: {args.data}")
    model = YOLO(args.model)
    model.train(
        data=str(args.data.resolve()),
        epochs=args.epochs,
        imgsz=args.imgsz,
        batch=args.batch,
        device=args.device,
        workers=args.workers,
        project=str(Path("training/runs").resolve()),
        name=args.name,
        patience=30,
        pretrained=True,
        close_mosaic=10,
        degrees=6,
        translate=0.08,
        scale=0.25,
        fliplr=0.0,
    )


if __name__ == "__main__":
    main()
