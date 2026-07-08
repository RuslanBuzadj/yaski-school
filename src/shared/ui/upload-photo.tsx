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

type UploadPhotoProps = {
  value: File[];
  onValueChange: (files: File[]) => void;
  accept?: string;
  className?: string;
};

export function UploadPhoto({ value, onValueChange, accept = "image/*", className }: UploadPhotoProps) {
  const file = value[0];

  return (
    <FileUpload
      value={value}
      onValueChange={onValueChange}
      accept={accept}
      maxFiles={1}
      className={cn("w-fit", className)}
    >
      {file ? (
        <FileUploadItem
          value={file}
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
