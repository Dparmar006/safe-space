import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsChatRight } from "react-icons/bs";

const Header = () => {
  return (
    <div className="navbar navbar-sticky navbar-glass py-4">
      <div className="navbar-start">
        <a className="navbar-item">
          <div className="flex w-full flex-col">
            <label
              htmlFor="sidebar-mobile-fixed"
              className="sm:hidden cursor-pointer"
              role="button"
              type="button"
              title="Open sidebar"
              aria-description="Sidebar can be toggled here."
              aria-label="Sidebar toggle"
            >
              <RxHamburgerMenu />
            </label>
          </div>
        </a>
      </div>
      <div className="navbar-end">
        <label
          role="button"
          type="button"
          className="py-1 px-3"
          title="Open chat window"
          aria-description="Chat window can be toggled here."
          aria-label="Chat window toggle"
          htmlFor="drawer-right"
        >
          <BsChatRight />
        </label>
      </div>
    </div>
  );
};

export default Header;
