import { DEFAULT_API_LIMIT, DEFAULT_API_PAGE } from "./constants";

/**
 *
 * @param {NextApiRequest} body
 * @returns {}
 */
export const handlePagination = (request) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || DEFAULT_API_PAGE;
  const limit = searchParams.get("limit") || DEFAULT_API_LIMIT;
  const searchKey = searchParams.get("searchKey");
  const searchValue = searchParams.get("searchValue");

  let skip = (page - 1) * limit;
  return {
    page,
    skip,
    limit,
    searchKey,
    searchValue,
    filter: {
      [searchKey]: searchValue,
    },
  };
};

export function extractTextFromLexicalEditor(node) {
  if (!node) {
    return "";
  }

  if (node.type === "text") {
    return node.text;
  } else if (node.children && node.children.length > 0) {
    return node.children
      .map((child) => extractTextFromLexicalEditor(child))
      .join(" ");
  }

  return "";
}
