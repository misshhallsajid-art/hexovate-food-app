import { useEffect, useRef, useState } from 'react';

// Gentle, limited horizontal rotation. The plate only turns while it is dragged
// (or while arrow keys are used) and then eases back with damping.
// The <img> is also the static fallback, so it always works (no WebGL needed).
const MAX_ANGLE = 25;

export default function ImageRotateViewer({ image, name }) {
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [failed, setFailed] = useState(false);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const angleRef = useRef(0);
  const frame = useRef(null);

  const clamp = (v) => Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, v));
  const update = (v) => {
    angleRef.current = v;
    setAngle(v);
  };
  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ease back to 0 with damping (instant if reduced motion is on)
  const settle = () => {
    cancelAnimationFrame(frame.current);
    if (prefersReducedMotion()) {
      update(0);
      return;
    }
    const step = () => {
      const next = angleRef.current * 0.9;
      if (Math.abs(next) < 0.2) {
        update(0);
        return;
      }
      update(next);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerDown = (e) => {
    cancelAnimationFrame(frame.current);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    startX.current = e.clientX;
    startAngle.current = angleRef.current;
    setDragging(true);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    update(clamp(startAngle.current + (e.clientX - startX.current) * 0.15));
  };
  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    settle();
  };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') update(clamp(angleRef.current - 8));
    if (e.key === 'ArrowRight') update(clamp(angleRef.current + 8));
  };

  if (failed) {
    return (
      <div className="w-full h-80 md:h-full min-h-[18rem] bg-soft flex items-center justify-center text-muted text-sm">
        Image unavailable
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-80 md:h-full min-h-[18rem] overflow-hidden select-none"
      style={{ touchAction: 'pan-y', cursor: dragging ? 'grabbing' : 'grab' }}
      tabIndex={0}
      role="group"
      aria-label={`${name}. Drag, or use the left and right arrow keys, to rotate the plate.`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      onKeyUp={settle}
    >
      <img
        src={image}
        alt={name}
        draggable={false}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
        style={{ transform: `perspective(900px) rotateY(${angle}deg)` }}
      />
    </div>
  );
}