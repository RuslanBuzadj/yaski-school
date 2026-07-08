import type { Editor, FileLoader, UploadAdapter } from "ckeditor5"


class MyUploadAdapter implements UploadAdapter {
  private loader: FileLoader

  constructor(loader: FileLoader) {
    this.loader = loader
  }

  async upload(): Promise<Record<string, string>> {
    const file = await this.loader.file

    if (!file) {
      throw new Error("No file provided")
    }
    // const response = await helpCenterServices.uploadImage({
    //   file: file,
    // })

    // if (response.data?.fullPath) {
    //   this.loader.uploaded = 1
    //   return {
    //     default: response.data?.fullPath + `?imageId=${response.data?.id}`,
    //   }
    // }

    throw new Error(`Couldn't upload file: ${file.name}.`)
  }
}

export default function ThisCustomUploadAdapterPlugin(editor: Editor): void {
  editor.plugins.get("FileRepository").createUploadAdapter = (
    loader: FileLoader
  ): UploadAdapter => {
    return new MyUploadAdapter(loader)
  }
}
