import { NextRequest } from "next/server";
import { DEFAULT_API_LIMIT, DEFAULT_API_PAGE } from "./constants";

export const handlePagination = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page: number = Number(searchParams.get("page")) || DEFAULT_API_PAGE;
  const limit: number = Number(searchParams.get("limit")) || DEFAULT_API_LIMIT;
  const searchKey = searchParams.get("searchKey");
  const searchValue = searchParams.get("searchValue");

  const skip = (page - 1) * limit;

  const filter: { [key: string]: string | undefined } = {};
  if (searchKey && searchValue) {
    filter[searchKey] = searchValue;
  }

  return {
    page,
    skip,
    limit,
    searchKey,
    searchValue,
    filter,
    searchParams,
  };
};
