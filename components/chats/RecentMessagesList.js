import React from "react";

const RecentMessagesList = ({ handleSelectRoom }) => {
  return (
    <>
      <div>
        <h1 className="text-xl font-bold">Messages</h1>
        <input
          role="search"
          type="search"
          placeholder="Looking for someone?"
          className="input my-2 w-full max-w-full"
        />
      </div>

      <ul>
        {Array.from({ length: 20 }).map((user, index) => (
          <li
            role="button"
            className="flex gap-2 items-start bg-gray-1 hover:bg-gray-2 transition-colors p-2 rounded-md select-none cursor-pointer mb-2"
            key={index}
            onClick={() => handleSelectRoom(index)}
          >
            <div className="avatar">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                alt="avatar"
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="self-start font-semibold text-base">
                Bishakha{" "}
                <span className="text-gray-600 font-normal text-sm">
                  @thatsenoughdixit
                </span>
              </p>
              <p className="text-sm truncate text-ellipsis overflow-hidden max-w-xs">
                Lorem consectetur consectetur ad proident aliquip.Lorem
                consectetur consectetur ad proident aliquip.
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecentMessagesList;
