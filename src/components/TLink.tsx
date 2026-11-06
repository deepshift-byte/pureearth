"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useNav } from "./Providers";

/** A link that plays the wave curtain before changing page. */
export function TLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const { go } = useNav();
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (!href.startsWith("/") || href.split("#")[0] === pathname) return;
        e.preventDefault();
        go(href);
      }}
    />
  );
}
