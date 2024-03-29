"use client";

import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import { DEFAULT_API_LIMIT } from "@/utils/constants";
import { usePostCreateStatus } from "@/hooks/ui";

const InfiniteScrolling = ({
  initialPosts,
  initialTotalCount = 0,
  filter = null,
}) => {
  const { isCreated, toggle } = usePostCreateStatus((state) => state);
  const [posts, setPosts] = useState(initialPosts);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  // NOTE: This features was implemented using server actions
  // when I tried to use mongodb aggregation, it kept returning empty array

  // async function loadMoreMovies () {
  //   const next = page + 1
  //   const response = JSON.parse(
  //     JSON.stringify(await fetchPosts({ page: next }))
  //   )
  //   const { posts, totalCount } = response
  //   if (posts?.length) {
  //     setTotalCount(totalCount)
  //     setPage(next)
  //     setPosts(prev => [...(prev?.length ? prev : []), ...posts])
  //   }
  // }

  async function getPosts(paginationPayload) {
    try {
      const searchParams = new URLSearchParams(
        Object.entries({ ...paginationPayload, ...filter }),
        Object.entries(filter ?? {}),
      );
      console.log("PROFILE ==== ?", searchParams);
      console.log("filter ==== ?", filter);

      if (filter) {
        searchParams.append(Object.keys(filter)[0], Object.values(filter)[0]);
      }
      const res = await fetch(`/api/posts?${searchParams.toString()}`, {
        method: "GET",
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      toast.error(error.response?.message || error.message);
      return error;
    }
  }
  async function loadMoreMovies(isReset = false) {
    const next = (isReset ? 0 : page) + 1;
    const { data, ...rest } = await getPosts({
      page: next,
      limit: DEFAULT_API_LIMIT,
    });
    console.log(data, rest);
    const { posts, totalCount } = data;
    setTotalCount(totalCount);
    if (posts?.length) {
      setPage(next);
      if (isReset) {
        setPosts(() => [...posts]);
      } else {
        setPosts((prev) => [...(prev?.length ? prev : []), ...posts]);
      }
    }
  }

  // TODO: wrap loadMoreMovies in useCcallback
  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
    if (isCreated) {
      loadMoreMovies(true);
      toggle();
    }
  }, [inView, isCreated]);

  return (
    <section>
      {posts.map((post) => (
        <Post post={post} key={post._id.toString()} />
      ))}
      <div className="w-full flex justify-center py-24">
        {posts.length < totalCount ? (
          <div ref={ref} className="spinner-dot-intermittent"></div>
        ) : (
          <h2 className="text-2xl text-center font-semibold">
            Here, take this tropy for your thumb, It runs too much on social
            media. <br /> <br /> 🏆
          </h2>
        )}
      </div>
    </section>
  );
};

export default InfiniteScrolling;
