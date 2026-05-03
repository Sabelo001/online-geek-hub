import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

function logoExists() {
  return fs.existsSync(path.join(process.cwd(), "public", "logo.png"));
}

export function BrandLogo({
  href,
  dark = false,
  size = "md",
  showText = true,
  className
}: {
  href?: string;
  dark?: boolean;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}) {
  const hasLogo = logoExists();
  const frameSize = {
    sm: "h-9 w-9",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  }[size];

  const content = (
    <span className={clsx("inline-flex items-center gap-3", className)}>
      {hasLogo ? (
        <span className={clsx("relative shrink-0 overflow-hidden rounded-lg", frameSize, dark ? "bg-white p-1.5" : "bg-slate-50 p-1")}>
          <Image
            src="/logo.png"
            alt="Online Geek Hub logo"
            fill
            sizes={size === "lg" ? "64px" : size === "md" ? "48px" : "36px"}
            priority={size === "lg"}
            className="object-contain p-1"
          />
        </span>
      ) : null}
      {showText || !hasLogo ? (
        <span className={clsx("font-bold leading-tight", dark ? "text-white" : "text-slate-950", size === "sm" ? "text-sm" : "text-base")}>
          Online Geek Hub
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="focus-ring inline-flex rounded-md">
      {content}
    </Link>
  );
}
