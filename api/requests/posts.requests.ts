import { IPagination } from "@/types/utils/pagination";
import api from ".";
import axios from "axios";

export const getPostsRequest = async (params?: IPagination) => {
  return await api.get("/posts", {
    params,
  });
};
