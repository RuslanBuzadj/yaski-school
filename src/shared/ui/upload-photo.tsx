"use client";

import { Camera, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemPreview,
} from "@/shared/ui/file-upload";

/**
 * `{ kind: "existing" }` previews an already-saved photo URL (edit mode) —
 * `FileUpload`/`FileUploadItemPreview` only know how to preview `File`
 * objects, so that case is rendered as a plain `<img>` instead of routing
 * through `FileUpload`.
 */
export type UploadPhotoValue = { kind: "existing"; url: string } | { kind: "new"; file: File } | { kind: "none" };

type UploadPhotoProps = {
  value: UploadPhotoValue;
  onValueChange: (value: UploadPhotoValue) => void;
  accept?: string;
  className?: string;
};

export function UploadPhoto({ value, onValueChange, accept = "image/*", className }: UploadPhotoProps) {
  if (value.kind === "existing") {
    return (
      <div className={cn("relative size-28 shrink-0 overflow-hidden rounded-full border", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary Supabase Storage URL, not a static/known-domain asset */}
        <img src={value.url} alt="" className="size-full object-cover" />
        <Button
          type="button"
          variant="secondary"
          size="icon-xs"
          className="absolute right-0 bottom-0 rounded-full border shadow-sm"
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
      className={cn("w-fit", className)}
    >
      {value.kind === "new" ? (
        <FileUploadItem
          value={value.file}
          className="relative size-28 shrink-0 items-center justify-center rounded-full border-0 p-0"
        >
          <FileUploadItemPreview className="size-full rounded-full [&>svg]:size-10" />
          <FileUploadItemDelete asChild>
            <Button
              type="button"
              variant="secondary"
              size="icon-xs"
              className="absolute right-0 bottom-0 rounded-full border shadow-sm"
            >
              <X />
            </Button>
          </FileUploadItemDelete>
        </FileUploadItem>
      ) : (
        <FileUploadDropzone className="size-28 flex-col gap-1 rounded-full border-2 p-0 text-center">
          <Camera className="size-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Завантажити</span>
        </FileUploadDropzone>
      )}
    </FileUpload>
  );
}
