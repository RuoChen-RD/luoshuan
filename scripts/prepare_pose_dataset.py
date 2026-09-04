#!/usr/bin/env python3
"""Build chronological train/val splits from extracted frames and YOLO labels."""

import argparse
import shutil
from pathlib import Path


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--dataset",
        type=Path,
        default=Path("training/dataset"),
    )
    parser.add_argument(
        "--source-images",
        type=Path,
        default=Path("training/dataset/images/unlabeled"),
    )
    parser.add_argument(
        "--source-labels",
        type=Path,
        default=Path("training/dataset/labels/train"),
        help="Directory containing labels exported by the annotation page.",
    )
    parser.add_argument("--train-ratio", type=float, default=0.8)
    parser.add_argument(
        "--missing-as-negative",
        action="store_true",
        help="Create empty labels for frames without an exported annotation.",
    )
    return parser.parse_args()


def clear_generated_files(directory, suffixes):
    directory.mkdir(parents=True, exist_ok=True)
    for path in directory.iterdir():
        if path.is_file() and path.suffix.lower() in suffixes:
            path.unlink()


def main():
    args = parse_args()
    if not 0 < args.train_ratio < 1:
        raise SystemExit("--train-ratio must be between 0 and 1")
    if not args.source_images.is_dir():
        raise SystemExit(f"Source image directory not found: {args.source_images}")
    if not args.source_labels.is_dir():
        raise SystemExit(f"Source label directory not found: {args.source_labels}")

    images = sorted(
        path
        for path in args.source_images.iterdir()
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )
    if len(images) < 2:
        raise SystemExit("At least two source images are required")

    # Read labels before clearing output because the annotation page may export
    # directly into dataset/labels/train.
    labels = {
        path.stem: path.read_text(encoding="utf-8")
        for path in args.source_labels.glob("*.txt")
    }
    missing = [image for image in images if image.stem not in labels]
    if missing and not args.missing_as_negative:
        preview = ", ".join(path.name for path in missing[:5])
        raise SystemExit(
            f"{len(missing)} images have no label ({preview}). "
            "Mark them in the annotator or pass --missing-as-negative."
        )

    split_index = round(len(images) * args.train_ratio)
    split_index = min(max(split_index, 1), len(images) - 1)
    output = {
        "train": images[:split_index],
        "val": images[split_index:],
    }

    for split in output:
        clear_generated_files(args.dataset / "images" / split, IMAGE_EXTENSIONS)
        clear_generated_files(args.dataset / "labels" / split, {".txt"})

    for split, split_images in output.items():
        image_dir = args.dataset / "images" / split
        label_dir = args.dataset / "labels" / split
        for image in split_images:
            shutil.copy2(image, image_dir / image.name)
            (label_dir / f"{image.stem}.txt").write_text(
                labels.get(image.stem, ""), encoding="utf-8"
            )

    positive = sum(bool(value.strip()) for value in labels.values())
    print(f"Prepared {len(images)} images: train={split_index}, val={len(images) - split_index}")
    print(f"Positive labels: {positive}; negative labels: {len(images) - positive}")
    print(f"Validation starts at: {images[split_index].name}")


if __name__ == "__main__":
    main()
