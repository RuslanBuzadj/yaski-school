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

type UploadImageProps = {
  value: File[];
  onValueChange: (files: File[]) => void;
  accept?: string;
  className?: string;
};

export function UploadImage({ value, onValueChange, accept = "image/*", className }: UploadImageProps) {
  const file = value[0];

  return (
    <FileUpload
      value={value}
      onValueChange={onValueChange}
      accept={accept}
      maxFiles={1}
      className={cn("w-full max-w-md", className)}
    >
      {file ? (
        <FileUploadItem
          value={file}
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
