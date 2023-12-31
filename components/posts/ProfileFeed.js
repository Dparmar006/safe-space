"use client";

import { PROFILE_TABS } from "@/utils/constants";
import React, { useState } from "react";
import GalleryFeed from "./GalleryFeed";
import InfiniteScrolling from "./InfiniteScrolling";
import { useSession } from "next-auth/react";

const ProfileFeed = ({ totalCount, posts, galleryImages }) => {
  const [selectedTab, setSelectedTab] = useState(PROFILE_TABS.POSTS);
  const toggleSelectedTab = (event) => {
    setSelectedTab(event.target.value || PROFILE_TABS.POSTS);
  };
  const session = useSession();
  const TABS_CONTENT = {
    [PROFILE_TABS.POSTS]: (
      <InfiniteScrolling
        initialTotalCount={totalCount}
        initialPosts={posts}
        filter={{ authorId: session?.data?.user?.id }}
      />
    ),
    [PROFILE_TABS.GALLERY]: <GalleryFeed images={galleryImages} />,
  };
  return (
    <>
      <div className="tabs w-full flex justify-between mb-4">
        <input
          type="radio"
          id={PROFILE_TABS.POSTS}
          value={PROFILE_TABS.POSTS}
          name="profile-tabs"
          className="tab-toggle"
          defaultChecked
          onChange={toggleSelectedTab}
        />
        <label
          htmlFor={PROFILE_TABS.POSTS}
          className="tab tab-bordered px-6 w-1/2 justify-center"
        >
          Posts
        </label>

        <input
          type="radio"
          id={PROFILE_TABS.GALLERY}
          value={PROFILE_TABS.GALLERY}
          name="profile-tabs"
          className="tab-toggle"
          onChange={toggleSelectedTab}
        />
        <label
          htmlFor={PROFILE_TABS.GALLERY}
          className="tab tab-bordered px-6 w-1/2 justify-center"
        >
          Gallery
        </label>
      </div>

      {TABS_CONTENT[selectedTab]}
    </>
  );
};

export default ProfileFeed;
