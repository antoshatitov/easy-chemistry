"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { reachGoal, type MetricGoal } from "@/lib/metrics";

type AnchorProps = Omit<ComponentPropsWithoutRef<"a">, "children">;

type TrackedLinkProps = AnchorProps & {
  goal: MetricGoal;
  children: ReactNode;
};

export function TrackedLink({ goal, children, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        reachGoal(goal, { href: props.href || "" });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
