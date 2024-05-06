import React, { useState } from "react";
import { Navbar } from "flowbite-react";
import bottleImage from "./bottle.png";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            src={bottleImage}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            SynergyWorks ProClean
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Navbar.Toggle onClick={toggleMenu} />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            active={window.location.pathname === "/"}
            className="sm:bg-500 sm:text-white"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            active={window.location.pathname === "/about"}
            href="/about"
          >
            About
          </Navbar.Link>
          <Navbar.Link
            active={window.location.pathname === "/services"}
            href="/services"
          >
            Services
          </Navbar.Link>
          <Navbar.Link
            active={window.location.pathname === "/pricing"}
            href="/pricing"
          >
            Pricing
          </Navbar.Link>
          <Navbar.Link
            active={window.location.pathname === "/contact"}
            href="contact"
          >
            Contact
          </Navbar.Link>

          <Navbar.Link
            active={window.location.pathname === "/login"}
            href="login"
            onClick={() => {
              localStorage.removeItem("username");
              window.location.href = "/login";
            }}
          >
            Logout
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 w-64 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu content */}
        <div className="p-5">
          <a href="#" className="block mt-4">
            Home
          </a>
          <a href="#" className="block mt-4">
            About
          </a>
          <a href="#" className="block mt-4">
            Services
          </a>
          <a href="#" className="block mt-4">
            Pricing
          </a>
          <a href="#" className="block mt-4">
            Contact
          </a>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black opacity-50 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleMenu}
      ></div>
    </div>
  );
};

export default Nav;
