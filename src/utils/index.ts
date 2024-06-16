import { NextRequest } from "next/server";
import { DEFAULT_API_LIMIT, DEFAULT_API_PAGE } from "./constants";

export const handlePagination = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page: number = Number(searchParams.get("page")) || DEFAULT_API_PAGE;
  const limit: number = Number(searchParams.get("limit")) || DEFAULT_API_LIMIT;
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
      [searchKey as string]: searchValue,
    },
  };
};

// export function extractTextFromLexicalEditor(node) {
//   if (!node) {
//     return "";
//   }

//   if (node.type === "text") {
//     return node.text;
//   } else if (node.children && node.children.length > 0) {
//     return node.children
//       .map((child) => extractTextFromLexicalEditor(child))
//       .join(" ");
//   }

//   return "";
// }
