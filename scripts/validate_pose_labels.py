#!/usr/bin/env python3
"""Validate one-keypoint YOLO pose labels before training."""

import argparse
from pathlib import Path


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--dataset",
        type=Path,
        default=Path("training/dataset"),
    )
    return parser.parse_args()


def validate_line(path, line_number, raw):
    fields = raw.split()
    if len(fields) != 8:
        return f"{path}:{line_number}: expected 8 fields, got {len(fields)}"
    try:
        class_id = int(fields[0])
        values = [float(value) for value in fields[1:]]
    except ValueError:
        return f"{path}:{line_number}: fields must be numeric"

    if class_id != 0:
        return f"{path}:{line_number}: class id must be 0"
    x, y, width, height, keypoint_x, keypoint_y, visibility = values
    normalized = [x, y, width, height, keypoint_x, keypoint_y]
    if any(value < 0 or value > 1 for value in normalized):
        return f"{path}:{line_number}: box and keypoint coordinates must be in [0, 1]"
    if width <= 0 or height <= 0:
        return f"{path}:{line_number}: box width and height must be positive"
    if visibility not in {0, 1, 2}:
        return f"{path}:{line_number}: visibility must be 0, 1, or 2"
    return None


def main():
    args = parse_args()
    errors = []
    image_total = 0
    annotated_total = 0
    instance_total = 0

    for split in ("train", "val"):
        image_dir = args.dataset / "images" / split
        label_dir = args.dataset / "labels" / split
        if not image_dir.is_dir() or not label_dir.is_dir():
            errors.append(f"{split}: expected directories {image_dir} and {label_dir}")
            continue
        images = sorted(path for path in image_dir.iterdir() if path.suffix.lower() in IMAGE_EXTENSIONS)
        image_total += len(images)

        for image in images:
            label = label_dir / f"{image.stem}.txt"
            if not label.exists():
                errors.append(f"{image}: missing label file (use an empty file for a negative frame)")
                continue
            lines = [line.strip() for line in label.read_text(encoding="utf-8").splitlines() if line.strip()]
            if lines:
                annotated_total += 1
            for line_number, line in enumerate(lines, start=1):
                instance_total += 1
                error = validate_line(label, line_number, line)
                if error:
                    errors.append(error)

        label_stems = {path.stem for path in label_dir.glob("*.txt")}
        image_stems = {path.stem for path in images}
        for orphan in sorted(label_stems - image_stems):
            errors.append(f"{label_dir / (orphan + '.txt')}: no matching image")

    print(f"Images: {image_total}")
    print(f"Annotated images: {annotated_total}")
    print(f"Pose instances: {instance_total}")
    if errors:
        print(f"Errors: {len(errors)}")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)
    if image_total == 0:
        raise SystemExit("Dataset contains no train/val images")
    if annotated_total == 0:
        raise SystemExit("Dataset contains no screwdriver annotations")
    print("Labels are valid")


if __name__ == "__main__":
    main()
