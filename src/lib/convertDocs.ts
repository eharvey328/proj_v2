import path from "path";
import { glob } from "glob";
import nodePandoc from "node-pandoc";

export async function getDocsList(): Promise<DocumentInfo[]> {
  const docsDirectory = path.resolve(process.cwd(), "docs");
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
  const list = await getDocsList();
  const docInfo = findDocInfoBySlug(slug, list);

  if (!docInfo) {
    throw new Error(`No document found for slug: ${slug}`);
  }

  const docsDirectory = path.resolve(process.cwd(), "docs");
  const filePath = path.resolve(docsDirectory, docInfo.filename);
  const content = await new Promise<string>((resolve, reject) => {
    nodePandoc(filePath, "-f docx -t html5", (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });

  return {
    data: {
      ...docInfo,
      content: content,
      createdAt: new Date(),
    },
  };
}

function findDocInfoBySlug(slug: string, list: DocumentInfo[]) {
  return list.find((doc) => doc.slug === slug);
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
  data: ConvertedDocument | null;
  error?: string;
}
