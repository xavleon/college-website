import React, { useState } from "react";
import { Navbar } from "flowbite-react";
import bottleImage from "./bottle.png";
import braintech from "./brain2-tech.png";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            src={braintech}
            className="mr-3 h-6 sm:h-9"
            alt="Student Resources Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Student Success Center
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
            active={window.location.pathname === "/resources"}
            href="/resources"
          >
            Learning Resources
          </Navbar.Link>
          <Navbar.Link
            active={window.location.pathname === "/assignments"}
            href="/assignments"
          >
            Assignments
          </Navbar.Link>
          <Navbar.Link
            active={window.location.pathname === "/study-materials"}
            href="/study-materials"
          >
            Study Materials
          </Navbar.Link>
          <Navbar.Link
            active={window.location.pathname === "/calendar"}
            href="/calendar"
          >
            Academic Calendar
          </Navbar.Link>
          <Navbar.Link
            active={window.location.pathname === "/contact"}
            href="contact"
          >
            Contact Professor
          </Navbar.Link>

          {user && (
            <Navbar.Link
              active={window.location.pathname === "/login"}
              href="login"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </Navbar.Link>
          )}

          {!user && (
            <Navbar.Link
              active={
                window.location.pathname === "/login" ||
                window.location.pathname === "/signup"
              }
              href="login"
            >
              Student Login
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 w-64 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu content */}
        <div className="p-5">
          <a href="/" className="block mt-4">
            Home
          </a>
          <a href="/resources" className="block mt-4">
            Learning Resources
          </a>
          <a href="/assignments" className="block mt-4">
            Assignments
          </a>
          <a href="/study-materials" className="block mt-4">
            Study Materials
          </a>
          <a href="/calendar" className="block mt-4">
            Academic Calendar
          </a>
          <a href="/contact" className="block mt-4">
            Contact Professor
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
