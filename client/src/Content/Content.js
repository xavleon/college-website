import React from "react";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import Couch from "./couch.jpg";
import studyImage from "./study-image.jpg";

export default function Content() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">
                A Message from Professor Javier Leon, Department of Science and
                Technology
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create Your Ideal Study Environment
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                As your professor, I want you to succeed not just in my class,
                but in all your academic pursuits. One of the best ways to boost
                your focus and productivity is by creating a study space that
                works for you. Here are my top tips for making your study area a
                place where you can excel:
              </p>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-x-3">
                  <span role="img" aria-label="books" className="text-2xl">
                    📚
                  </span>
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Keep it Organized:
                    </strong>{" "}
                    A tidy desk helps clear your mind and reduces distractions.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span role="img" aria-label="lightbulb" className="text-2xl">
                    💡
                  </span>
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Good Lighting:
                    </strong>{" "}
                    Make sure your space is well-lit to reduce eye strain and
                    keep you alert.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span role="img" aria-label="clock" className="text-2xl">
                    🕒
                  </span>
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Set a Routine:
                    </strong>{" "}
                    Try to study at the same time each day to build strong
                    habits.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span role="img" aria-label="headphones" className="text-2xl">
                    🎧
                  </span>
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Minimize Distractions:
                    </strong>{" "}
                    Use headphones or background music if it helps you
                    concentrate.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span role="img" aria-label="meditation" className="text-2xl">
                    🧘
                  </span>
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Take Breaks:
                    </strong>{" "}
                    Short breaks can help you recharge and retain information
                    better.
                  </span>
                </li>
              </ul>
              <div className="mt-8">
                <p className="text-lg font-medium text-indigo-700">
                  What does your study space look like? <br />
                  <span className="text-gray-700">
                    Share a photo or your best tip in our student forum!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="couch"
            src={studyImage}
            alt="Student studying at a clean, organized desk"
            width={"800px"}
            style={{ borderRadius: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
