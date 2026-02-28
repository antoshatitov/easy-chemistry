"use client";

import { useEffect, useState } from "react";

export function HeroBackgroundVideo() {
  const [videoSrc, setVideoSrc] = useState<string>("");

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 767px)");

    const updateSource = () => {
      setVideoSrc(
        mobileMedia.matches
          ? "/hero-background-mobile.mp4"
          : "/hero-background-desktop.mp4",
      );
    };

    updateSource();
    mobileMedia.addEventListener("change", updateSource);

    return () => {
      mobileMedia.removeEventListener("change", updateSource);
    };
  }, []);

  if (!videoSrc) {
    return null;
  }

  return (
    <video
      key={videoSrc}
      className="absolute inset-0 -z-20 h-full w-full object-cover"
      src={videoSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
