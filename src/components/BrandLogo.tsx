import Image from "next/image";
import Link from "next/link";
import { brandName } from "@/lib/brand";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export default function BrandLogo({
  href,
  className = "",
  imageClassName = "h-10 w-auto",
  priority = false,
}: BrandLogoProps) {
  const logo = (
    <Image
      src="/cornerstone-marketing-logo.png"
      alt={`${brandName} logo`}
      width={1635}
      height={423}
      className={`object-contain ${imageClassName}`}
      priority={priority}
    />
  );

  if (href) {
    return (
      <Link href={href} className={`inline-flex items-center ${className}`} aria-label={brandName}>
        {logo}
      </Link>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`} aria-label={brandName}>
      {logo}
    </div>
  );
}
