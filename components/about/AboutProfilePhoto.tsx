"use client";

import Image from "next/image";
import { useState } from "react";

const profilePhotoSrc = "/about/perfil.jpeg";

export function AboutProfilePhoto() {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-[3/4] w-full max-w-sm shrink-0 overflow-hidden bg-black/[0.04] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      {hasError ? (
        <div className="flex h-full items-center justify-center px-6 text-center text-sm font-light tracking-[-0.02em] text-black/35">
          Adicione sua foto em{" "}
          <span className="ml-1 whitespace-nowrap">public/about/perfil.jpeg</span>
        </div>
      ) : (
        <Image
          src={profilePhotoSrc}
          alt="Fredson Santana"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 672px"
          priority
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
