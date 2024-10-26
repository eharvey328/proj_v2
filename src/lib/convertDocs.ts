import { readFile } from "fs/promises";
import { resolve } from "path";
import mammoth from "mammoth";
import { glob } from "glob";

export async function getDocsList(): Promise<DocumentInfo[]> {
  const docsDirectory = resolve(process.cwd(), "docs");
  const files = await glob("*.docx", { cwd: docsDirectory });
  return files
    .map((filename) => ({
      filename,
      title: formatTitle(filename),
      slug: formatSlug(filename),
    }))
    .sort(sortDocsList);
}

function formatTitle(filename: string) {
  return filename.replace(".docx", "").replace(/_/g, " ").trim();
}

function formatSlug(filename: string) {
  return filename
    .replace(/\.docx$/i, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLocaleLowerCase("ru");
}

function sortDocsList(a: DocumentInfo, b: DocumentInfo) {
  return a.title.localeCompare(b.title, "ru", { sensitivity: "base" });
}

export async function getDocBySlug(slug: string): Promise<ConversionResult> {
  try {
    const list = await getDocsList();
    const docInfo = findDocInfoBySlug(slug, list);

    if (!docInfo) {
      throw new Error(`No document found for slug: ${slug}`);
    }

    const docsDirectory = resolve(process.cwd(), "docs");
    const filePath = resolve(docsDirectory, docInfo.filename);
    const buffer = await readFile(filePath);
    const result = await mammoth.convertToHtml(
      { buffer },
      {
        styleMap: [
          "p[style-name='Body Text'] => p",
          "p[style-name='Table Contents'] => p.doc-table-content",
          "p[style-name='name'] => p.doc-name",
          "p[style-name='cont'] => p.doc-cont",
          "p[style-name='author'] => p.doc-author",
          "p[style-name='Normal (Web)'] => p.doc-sources",
          "r[style-name='Emphasis'] => i",
        ],
      }
    );

    if (result.messages.length > 0) {
      console.log(
        "Conversion messages for",
        docInfo.filename,
        ":",
        result.messages
      );
    }

    return {
      document: {
        ...docInfo,
        content: result.value,
        createdAt: new Date(),
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Error processing document ${slug}:`, error);
    return {
      document: null,
      error: errorMessage,
    };
  }
}

function findDocInfoBySlug(slug: string, list: DocumentInfo[]) {
  return list.find((doc) =>
    doc.slug.localeCompare(slug, "ru", { sensitivity: "base" })
  );
}

export interface DocumentInfo {
  filename: string;
  slug: string;
  title: string;
}

export interface ConvertedDocument extends DocumentInfo {
  content: string;
  createdAt: Date;
}

export interface ConversionResult {
  document: ConvertedDocument | null;
  error?: string;
}
