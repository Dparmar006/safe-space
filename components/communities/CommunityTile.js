import React from "react";
import Avatar from "../user/Avatar";

const CommunityTile = ({ cummunitiy }) => {
  return (
    <li
      role="button"
      className="flex gap-2 border border-zinc-800 rounded-lg p-2 mt-2 cursor-pointer select-none hover:border-zinc-600 transition-colors"
    >
      <Avatar image={cummunitiy.image} username={cummunitiy.slug} />
      <figure className="flex flex-col">
        <h6 className="text-semibold line-clamp-1">{cummunitiy.name}</h6>
        <p className="text-zinc-600 text-sm line-clamp-3">
          {cummunitiy.shortDescription}
        </p>
      </figure>
    </li>
  );
};

export default CommunityTile;
