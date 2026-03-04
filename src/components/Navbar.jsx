import clsx from "clsx";
import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about-section" },
  { name: "Timeline", id: "timeline" },
  { name: "Rules", id: "rules" },
  { name: "Sponsors", id: "sponsors" },
  { name: "Team", id: "team" },
];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 bg-[#0a0a0a] border-b border-gray-800 shadow-md sm:inset-x-6"
    >
      <header className="w-full">
        <nav className="flex items-center justify-between p-4">
          
          {/* Logo */}
          <div className="flex items-center gap-7">
            <img
              src="/img/logo-amc.png"
              alt="logo"
              className="w-10 filter brightness-0 invert"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  className="nav-hover-btn text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

        </nav>
      </header>
    </div>
  );
};

export default NavBar;