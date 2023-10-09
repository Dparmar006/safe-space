import React from "react";
import CommunityList from "../communities/CommunityList";

const ExploreSection = () => {
  return (
    <aside className="w-1/2 max-h-[100dvh] mt-12 px-4 py-10 hidden lg:block overflow-y-auto">
      <h1 className="text-3xl font-semibold">Welcome to Untold, Safe-Space</h1>
      <h3 className="text-md mt-4 text-zinc-600">
        Experience a social media platform like no other, where your preferences
        and interests take center stage. With Untold, you're in control. you.
      </h3>
      <div className="divider"></div>
      <CommunityList
        cummunities={[
          {
            name: "DHH",
            shortDescription: `Desi hip hop is a term for music and culture which combines the influences of hip hop and the Indian subcontinent; the term desi referring to the South Asian diaspora.`,
          },
          {
            name: "Marvel",
            shortDescription:
              "Explore Marvel movies & the Marvel Cinematic Universe (MCU) on the official site of Marvel Entertainment!",
          },
          {
            name: "BTS <3",
            shortDescription: `'ARMY was established as BTS' fandom name in 2013. This happened almost instantly after the release of the band's first single “2 Cool 4 Skool.” The word ARMY is an acronym for “Adorable Representative MC For Youth”, but there are other meanings to it too.`,
          },
        ]}
      />
      <div className="divider"></div>
    </aside>
  );
};

export default ExploreSection;
