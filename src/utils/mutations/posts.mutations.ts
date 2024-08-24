import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ICreatePostPayload,
  IDeletePostPayload,
  createPostRequest,
  deletePostRequest,
} from "../requests/posts.requests";

export const useCreatePostMutation = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: ["posts"],

    mutationFn: async (payload: ICreatePostPayload) =>
      await createPostRequest(payload),
    onSuccess: async () => {
      await query.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};

export const useDeletePostMutation = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: ["posts"],

    mutationFn: async (payload: IDeletePostPayload) =>
      await deletePostRequest(payload),
    onSuccess: async () => {
      await query.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
