import type { Editor, FileLoader, UploadAdapter } from "ckeditor5"
import { uploadEditorImage } from "@/shared/api/storage/actions"

class MyUploadAdapter implements UploadAdapter {
  private loader: FileLoader
  private onUploaded?: (url: string) => void

  constructor(loader: FileLoader, onUploaded?: (url: string) => void) {
    this.loader = loader
    this.onUploaded = onUploaded
  }

  async upload(): Promise<Record<string, string>> {
    const file = await this.loader.file

    if (!file) {
      throw new Error("No file provided")
    }

    const result = await uploadEditorImage(file as File)

    if ("error" in result) {
      throw new Error(result.error)
    }

    this.onUploaded?.(result.url)
    return { default: result.url }
  }

  abort(): void {
    // No in-flight cancellation support on the server action; the upload
    // either completes or throws, so there's nothing to abort client-side.
  }
}

/**
 * `onUploaded` fires for every file that finishes uploading during the
 * editor's lifetime, regardless of whether the image is later removed
 * from the document before the surrounding form is saved. Callers use it
 * to track "uploaded this session" images so an image inserted and then
 * deleted again before ever being saved doesn't orphan a storage file
 * (a plain before/after diff of saved content can't see it, since it
 * never existed in any saved version).
 */
export function createUploadAdapterPlugin(onUploaded?: (url: string) => void) {
  return function ThisCustomUploadAdapterPlugin(editor: Editor): void {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: FileLoader
    ): UploadAdapter => {
      return new MyUploadAdapter(loader, onUploaded)
    }
  }
}
