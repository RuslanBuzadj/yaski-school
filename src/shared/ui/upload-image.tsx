"use client";

import { ImagePlus, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemPreview,
} from "@/shared/ui/file-upload";
import type { UploadPhotoValue } from "@/shared/ui/upload-photo";

type UploadImageProps = {
  value: UploadPhotoValue;
  onValueChange: (value: UploadPhotoValue) => void;
  accept?: string;
  className?: string;
};

/**
 * Rectangular (aspect-video) counterpart to `UploadPhoto` — same
 * existing/new/none contract, used for cover images (news, events) rather
 * than circular avatars.
 */
export function UploadImage({ value, onValueChange, accept = "image/*", className }: UploadImageProps) {
  if (value.kind === "existing") {
    return (
      <div className={cn("relative aspect-video w-full max-w-md overflow-hidden rounded-xl border", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary Supabase Storage URL, not a static/known-domain asset */}
        <img src={value.url} alt="" className="size-full object-cover" />
        <Button
          type="button"
          variant="secondary"
          size="icon-xs"
          className="absolute top-2 right-2 rounded-full border shadow-sm"
          onClick={() => onValueChange({ kind: "none" })}
        >
          <X />
        </Button>
      </div>
    );
  }

  const files = value.kind === "new" ? [value.file] : [];

  return (
    <FileUpload
      value={files}
      onValueChange={(next) => onValueChange(next[0] ? { kind: "new", file: next[0] } : { kind: "none" })}
      accept={accept}
      maxFiles={1}
      className={cn("w-full max-w-md", className)}
    >
      {value.kind === "new" ? (
        <FileUploadItem
          value={value.file}
          className="relative aspect-video w-full items-center justify-center overflow-hidden rounded-xl border-0 p-0"
        >
          <FileUploadItemPreview className="size-full rounded-xl [&>svg]:size-10" />
          <FileUploadItemDelete asChild>
            <Button
              type="button"
              variant="secondary"
              size="icon-xs"
              className="absolute top-2 right-2 rounded-full border shadow-sm"
            >
              <X />
            </Button>
          </FileUploadItemDelete>
        </FileUploadItem>
      ) : (
        <FileUploadDropzone className="aspect-video w-full flex-col gap-1.5 rounded-xl border-2 p-0 text-center">
          <ImagePlus className="size-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Завантажити зображення</span>
        </FileUploadDropzone>
      )}
    </FileUpload>
  );
}
