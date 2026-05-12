import { useEffect, useRef } from "react";

const perspective = "perspective(32em)";

export function useCubeAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cubeEl = cubeRef.current;
    if (!wrapper || !cubeEl) return;

    const faces = Array.from(cubeEl.querySelectorAll<HTMLElement>(".face"));
    if (faces.length !== 6) return;

    const baseTransforms: string[] = [];
    faces.forEach((face, i) => {
      let tmp = i < 4 ? `rotateY(${i * 90}deg)` : `rotateX(${(-1) ** i * 90}deg)`;
      tmp += " translateZ(112px)";
      baseTransforms.push(tmp);
    });

    let autoRotate = true;
    let rotationX = 0;
    let rotationY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let rafId = 0;

    function applyTransforms() {
      faces.forEach((face, i) => {
        const tmp = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) ${baseTransforms[i]}`;
        face.style.transform = `${perspective} ${tmp}`;
      });
    }

    function rotateCube() {
      if (autoRotate) {
        rotationX += 0.1;
        rotationY += 0.1;
        applyTransforms();
      }
      rafId = requestAnimationFrame(rotateCube);
    }

    applyTransforms();
    rafId = requestAnimationFrame(rotateCube);

    const onEnter = () => {
      autoRotate = false;
    };
    const onLeave = () => {
      autoRotate = true;
    };
    const onDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      autoRotate = false;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      startX = e.clientX;
      startY = e.clientY;
      rotationX -= deltaY * 0.5;
      rotationY += deltaX * 0.5;
      applyTransforms();
    };
    const onUp = () => {
      isDragging = false;
      autoRotate = true;
    };

    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);
    wrapper.addEventListener("mousedown", onDown);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      wrapper.removeEventListener("mousedown", onDown);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      faces.forEach((f) => {
        f.style.transform = "";
      });
    };
  }, []);

  return { wrapperRef, cubeRef };
}
