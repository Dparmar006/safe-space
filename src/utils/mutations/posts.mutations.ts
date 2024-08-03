import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ICreatePostPayload,
  createPostRequest,
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
