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
  FileUploadList,
} from "@/shared/ui/file-upload";

type UploadGalleryProps = {
  value: File[];
  onValueChange: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  className?: string;
};

export function UploadGallery({ value, onValueChange, accept = "image/*", maxFiles, className }: UploadGalleryProps) {
  return (
    <FileUpload
      value={value}
      onValueChange={onValueChange}
      accept={accept}
      maxFiles={maxFiles}
      multiple
      className={cn("w-full", className)}
    >
      <FileUploadDropzone className="w-full flex-col gap-1.5 rounded-xl border-2 p-6 text-center">
        <ImagePlus className="size-6 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Перетягніть фото сюди або натисніть, щоб обрати</span>
      </FileUploadDropzone>
      <FileUploadList className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((file) => (
          <FileUploadItem
            key={`${file.name}-${file.lastModified}`}
            value={file}
            className="relative aspect-square w-full items-center justify-center overflow-hidden rounded-lg border-0 p-0"
          >
            <FileUploadItemPreview className="size-full rounded-lg [&>svg]:size-8" />
            <FileUploadItemDelete asChild>
              <Button
                type="button"
                variant="secondary"
                size="icon-xs"
                className="absolute top-1 right-1 rounded-full border shadow-sm"
              >
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
