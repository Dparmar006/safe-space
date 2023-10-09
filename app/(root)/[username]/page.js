import {
  fetchPosts,
  fetchUserProfileGalleryImages,
} from "@/actions/posts.actions";
import ProfileFeed from "@/components/posts/ProfileFeed";
import BasicInformation from "@/components/user/BasicInformation";
import { DEFAULT_API_LIMIT } from "@/utils/constants";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  const { posts, totalCount } = JSON.parse(
    JSON.stringify(await fetchPosts({ limit: DEFAULT_API_LIMIT })),
  );
  const response = await fetchUserProfileGalleryImages();
  return (
    <>
      <div className="breadcrumbs text-lg mt-4 px-0 flex-wrap">
        <ul className="flex flex-wrap">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className="break-all">{params.username}</li>
        </ul>
      </div>

      <BasicInformation user={params} />

      <ProfileFeed
        posts={posts}
        totalCount={totalCount}
        galleryImages={response}
      />
    </>
  );
};

export default page;
