#!/usr/bin/env python3
"""Extract evenly spaced frames for screwdriver-tip pose annotation."""

import argparse
import csv
from pathlib import Path

import cv2


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("video", type=Path)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("training/dataset/images/unlabeled"),
    )
    parser.add_argument("--sample-fps", type=float, default=2.0)
    parser.add_argument("--start", type=float, default=0.0)
    parser.add_argument("--end", type=float)
    parser.add_argument("--jpeg-quality", type=int, default=92)
    parser.add_argument("--overwrite", action="store_true")
    return parser.parse_args()


def main():
    args = parse_args()
    if args.sample_fps <= 0:
        raise SystemExit("--sample-fps must be greater than zero")
    if not args.video.is_file():
        raise SystemExit(f"Video not found: {args.video}")

    args.output.mkdir(parents=True, exist_ok=True)
    capture = cv2.VideoCapture(str(args.video))
    if not capture.isOpened():
        raise SystemExit(f"Unable to open video: {args.video}")

    source_fps = capture.get(cv2.CAP_PROP_FPS)
    frame_count = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / source_fps if source_fps > 0 else 0
    end_time = min(args.end, duration) if args.end is not None and duration else args.end
    if end_time is not None and end_time <= args.start:
        raise SystemExit("--end must be greater than --start")

    stem = args.video.stem.replace(" ", "_")
    manifest_path = args.output / f"{stem}-manifest.csv"
    records = []
    timestamp = args.start
    sample_index = 0
    interval = 1.0 / args.sample_fps

    while end_time is None or timestamp <= end_time + 1e-6:
        capture.set(cv2.CAP_PROP_POS_MSEC, timestamp * 1000)
        ok, frame = capture.read()
        if not ok:
            break

        filename = f"{stem}_{sample_index:05d}_{int(timestamp * 1000):08d}ms.jpg"
        target = args.output / filename
        if target.exists() and not args.overwrite:
            raise SystemExit(f"Refusing to overwrite {target}; pass --overwrite to replace it")
        written = cv2.imwrite(
            str(target),
            frame,
            [cv2.IMWRITE_JPEG_QUALITY, max(1, min(100, args.jpeg_quality))],
        )
        if not written:
            raise SystemExit(f"Failed to write frame: {target}")

        records.append((filename, f"{timestamp:.3f}"))
        sample_index += 1
        timestamp = args.start + sample_index * interval

    capture.release()
    with manifest_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(["file", "timestamp_seconds"])
        writer.writerows(records)

    print(f"Extracted {len(records)} frames to {args.output}")
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    main()

