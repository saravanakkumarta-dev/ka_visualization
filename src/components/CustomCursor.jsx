import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const move = (e) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const grow = () => {
      cursorRef.current?.classList.add("cursor-hover");
    };

    const shrink = () => {
      cursorRef.current?.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", move);

    const clickable = document.querySelectorAll(
      "a, button, [role='button']"
    );

    clickable.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return <div className="gold-cursor" ref={cursorRef}></div>;
}