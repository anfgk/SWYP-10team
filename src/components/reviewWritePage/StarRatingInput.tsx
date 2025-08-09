import { useEffect, useRef, useState } from "react";
import fullStar from "/assets/icons/star_full.png";
import halfStar from "/assets/icons/star_half.png";
import emptyStar from "/assets/icons/star_empty.png";

type Props = {
  value: number;
  onChange: (v: number) => void;
  max?: number;
  size?: number;
  readOnly?: boolean;
  className?: string;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function StarRatingInput({
  value,
  onChange,
  max = 5,
  size = 24,
  readOnly = false,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  // value → 각 별의 이미지 결정
  const renderStar = (i: number) => {
    const idx = i + 1;
    const img =
      value >= idx ? fullStar : value >= idx - 0.5 ? halfStar : emptyStar;

    return (
      <img
        key={i}
        src={img}
        alt=""
        aria-hidden
        className="select-none"
        style={{ width: size, height: size }}
        draggable={false}
      />
    );
  };

  const calcValueFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return value;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    if (x <= 0) return 0;
    if (x >= rect.width) return max;

    const starW = rect.width / max;
    const starIndex = Math.min(max - 1, Math.floor(x / starW));
    const within = x - starIndex * starW;
    const half = within < starW / 2 ? 0.5 : 1.0;
    const next = starIndex + half;
    return clamp(next, 0, max);
  };

  const handlePointer = (clientX: number) => {
    if (readOnly) return;
    const next = calcValueFromClientX(clientX);
    if (next !== value) onChange(next);
  };

  // Mouse
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (readOnly) return;
    setDragging(true);
    handlePointer(e.clientX);
  };
  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!dragging || readOnly) return;
    handlePointer(e.clientX);
  };
  // Touch
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (readOnly) return;
    setDragging(true);
    handlePointer(e.touches[0].clientX);
  };
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!dragging || readOnly) return;
    handlePointer(e.touches[0].clientX);
  };

  useEffect(() => {
    const end = () => setDragging(false);
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);
    window.addEventListener("touchcancel", end);
    return () => {
      window.removeEventListener("mouseup", end);
      window.removeEventListener("touchend", end);
      window.removeEventListener("touchcancel", end);
    };
  }, []);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (readOnly) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      onChange(clamp(Number((value - 0.5).toFixed(1)), 0, max));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onChange(clamp(Number((value + 0.5).toFixed(1)), 0, max));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex items-center gap-0 outline-none ${readOnly ? "cursor-default" : "cursor-pointer"} ${className}`}
      role="slider"
      aria-label="별점"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={readOnly ? -1 : 0}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onKeyDown={onKeyDown}
      style={{ width: size * max }}
    >
      {Array.from({ length: max }, (_, i) => renderStar(i))}
    </div>
  );
}
