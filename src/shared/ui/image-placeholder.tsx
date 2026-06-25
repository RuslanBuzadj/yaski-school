import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { ImageOff } from "lucide-react";

type Props = {
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: "cover" | "contain";
};

export function ImagePlaceholder({ src, alt, fill, width, height, className, objectFit = "cover" }: Props) {
  if (src) {
    return fill ? (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(objectFit === "cover" ? "object-cover" : "object-contain", "w-full h-full", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground",
        fill ? "absolute inset-0" : "",
        className
      )}
      style={!fill && width && height ? { width, height } : undefined}
      aria-label={alt}
      role="img"
    >
      <ImageOff className="w-8 h-8 opacity-40" />
    </div>
  );
}
