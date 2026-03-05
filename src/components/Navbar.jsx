import clsx from "clsx";
import { useRef, useState, useEffect } from "react";

import Button from "./Button";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about-section" },
  { name: "Timeline", id: "timeline" },
  { name: "Rules", id: "rules" },
  { name: "Sponsors", id: "sponsors" },
  { name: "Team", id: "team" },
];

// Hamburger Icon SVG
const HamburgerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// Close Icon SVG
const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Main NavBar */}
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 bg-[#0a0a0a] border-b border-gray-800 shadow-md sm:inset-x-6"
      >
        <header className="w-full h-full">
          <nav className="flex items-center justify-between h-full px-4">

            {/* Logo */}
            <div className="flex items-center gap-7">
              <img
                src="/img/logo-amc.png"
                alt="logo"
                className="w-10 filter brightness-0 invert"
              />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex h-full items-center">
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

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <HamburgerIcon />
            </button>

          </nav>
        </header>
      </div>

      {/* Mobile Backdrop Overlay */}
      <div
        onClick={closeMobileMenu}
        className={clsx(
          "fixed inset-0 z-40 bg-black transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />

      {/* Mobile Slide-in Sidebar */}
      <div
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-72 bg-[#0a0a0a] border-l border-gray-800 shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <img
            src="/img/logo-amc.png"
            alt="logo"
            className="w-9 filter brightness-0 invert"
          />
          {/* Close Button */}
          <button
            onClick={closeMobileMenu}
            className="flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex flex-col px-4 py-6 gap-1">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.id}`}
              onClick={closeMobileMenu}
              className="text-white text-base font-medium px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-gray-100 transition-colors duration-200"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 40}ms` : "0ms",
              }}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default NavBar;