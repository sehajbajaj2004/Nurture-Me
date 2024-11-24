import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styles } from "../style";

import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import profile from "../assets/profile-user.png";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const location = useLocation();

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-7 fixed top-0 z-20 bg-[#222222]`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="text-white text-[25px] font-bold cursor-pointer">
            Nurture<span className="text-[#ffec95]">.Me</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title
                  ? "text-[#ffed2c]"
                  : "text-[#fff6d4]"
              } text-[20px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))}
          {/* Chat Button */}
          <li
            key="chat"
            className={`${
              active === "Chat"
                ? "text-[#ffed2c]"
                : "text-[#fff6d4]"
            } text-[20px] font-medium cursor-pointer`}
            onClick={() => setActive("Chat")}
          >
            <Link to="/Chat">Chat</Link>
          </li>

          <li key="profile" onClick={() => setActive("profile")}>
            <Link to="/profile">
              <img
                src={profile}
                className="w-8 object-contain cursor-pointer"
              />
            </Link>
          </li>
        </ul>
      </div>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? menu : close}
          alt="Menu"
          className="w-19 h-19 object-contain cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
          }}
        />
        <div
          className={`${
            toggle ? "hidden" : "flex"
          } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
        >
          <ul className="list-none flex sm:flex justify-end items-start flex-col gap-4">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title
                    ? "text-[#ffed2c]"
                    : "text-[#000000]"
                } text-[18px] font-medium cursor-pointer`}
                onClick={() => {
                  setActive(link.title);
                  setToggle(!toggle);
                }}
              >
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}
            {/* Chat Button for Mobile */}
            <li
              key="chat"
              className={`${
                active === "Chat"
                  ? "text-[#ffed2c]"
                  : "text-[#000000]"
              } text-[18px] font-medium cursor-pointer`}
              onClick={() => {
                setActive("Chat");
                setToggle(!toggle);
              }}
            >
              <Link to="/Chat">Chat</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
