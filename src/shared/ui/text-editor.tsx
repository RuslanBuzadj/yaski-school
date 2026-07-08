/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoRgLANARATAdCECrQMxgJwFYSpuGGAdhlSNQA4siiQAGOjIgNmdVQzJA26K35AwUUAKYA7FHQigIUqSAgK6AXWgBjLGHwYMUZUA
 */

import { CKEditor } from "@ckeditor/ckeditor5-react"
import {
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Bold,
  ClassicEditor,
  CloudServices,
  Emoji,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  ImageBlock,
  ImageEditing,
  ImageInline,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  Mention,
  Paragraph,
  PlainTableOutput,
  SourceEditing,
  Strikethrough,
  Table,
  ImageInsert,
  TableCaption,
  TableToolbar,
  TextTransformation,
  Underline,
  type EditorConfig,
} from "ckeditor5"
import { useEffect, useMemo, useState } from "react"

import "ckeditor5/ckeditor5.css"
import "./text-editor.css"
// import ThisCustomUploadAdapterPlugin from "../lib/plugins/fileUploader"


/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = "GPL" // or <YOUR_LICENSE_KEY>.

interface Props {
  value: string
  onChange: (value: string) => void
}

/**
 * id must start with the marker "{{".
 * CKEditor inserts item.id as the text node verbatim — so we include
 * the closing "}}" directly in the id to get "{{fullname}}" in the editor.
 */

export default function TextEditor({ value, onChange }: Props) {
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  useEffect(() => {
    setIsLayoutReady(true)

    return () => setIsLayoutReady(false)
  }, [])

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {}
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "sourceEditing",
            'insertImage',
            "|",
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "link",
            "insertTable",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          Bold,
          CloudServices,
          Emoji,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          ImageBlock,
          ImageEditing,
          ImageInline,
          ImageInsert,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUtils,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          Mention,
          Paragraph,
          PlainTableOutput,
          SourceEditing,
          Strikethrough,
          Table,
          TableCaption,
          TableToolbar,
          TextTransformation,
          Underline,
        ],
        // extraPlugins: [ThisCustomUploadAdapterPlugin],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
          ],
        },
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        // menuBar: {
        // 	isVisible: true,
        // },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
      } as EditorConfig,
    }
  }, [isLayoutReady])

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor">
        <div className="editor-container__editor @container/field-group">
          <div>
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(_, editor) => {
                  onChange(editor.getData())
                }}
                config={editorConfig}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
