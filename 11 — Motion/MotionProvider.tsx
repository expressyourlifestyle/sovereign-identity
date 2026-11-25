"use client";

import { LazyMotion } from "motion/react";

/**
 * Provides the animation feature set to every m.* component, loaded
 * asynchronously so it costs the initial bundle nothing. Until it lands,
 * server-rendered content simply shows at final state — below-the-fold
 * reveals begin once it does. Strict mode makes importing the full
 * <motion.*> API a build error, which is how the motion bundle stays
 * within budget.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={() => import("./features").then((m) => m.default)} strict>
      {children}
    </LazyMotion>
  );
}
