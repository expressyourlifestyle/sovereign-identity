"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The Founder portrait.
 *
 * A transparent cut-out, so it stands on the page ground rather than inside
 * a frame — a border around a cut-out reads as a mistake. Desaturated at
 * source per block 1.2 ("Portrait renders monochrome. No gold on the
 * image"), so the rule holds even if styles fail.
 *
 * The one parallax on the site: a slow settle from 1.05 to 1.00 across its
 * scroll range. Nothing else moves. Reduced motion renders it still.
 */
export function Figure({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <figure ref={ref} className="my-4 flex justify-center sm:my-8">
      <m.div style={reduced ? undefined : { scale }} className="will-change-transform">
        <Image
          src={src}
          alt={alt}
          width={1343}
          height={1800}
          priority={priority}
          sizes="(max-width: 640px) 80vw, 420px"
          className="h-auto w-64 sm:w-96"
        />
      </m.div>
    </figure>
  );
}
