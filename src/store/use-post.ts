import { atom, useAtom } from "jotai";

import { IFeedPost } from "@/types/post.types";

type Config = {
  selected: IFeedPost["_id"] | null;
};

const configAtom = atom<Config>({
  selected: null,
});

export function useSelectedPost() {
  return useAtom(configAtom);
}
