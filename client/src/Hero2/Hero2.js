import React from "react";
import "./Hero2.css";

const Hero2 = (props) => {
  return (
    <div>
      <div class="content">
        <section class=" bg-white dark:bg-gray-900 flex flex-col items-center text-center">
          <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 heros">
            <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Empowering Academic Success to{" "}
                <span class="font-extrabold">50,000+</span> Students Worldwide
              </h2>
              <p class="mb-4 font-light">
                T Enhance your learning experience through our comprehensive,
                collaborative platform. Connect academic resources across
                disciplines, and integrate data from educational tools to enrich
                your study sessions. Our platform helps students streamline
                research, manage projects, and collaborate with peers
                effectively.
              </p>
              <p class="mb-4 font-medium">
                Achieve academic excellence quickly and easily, without the
                complexities of traditional learning systems. Speed up your
                study processes, reduce repetitive tasks, and apply new
                knowledge with confidence.
              </p>
              <a
                href="#"
                class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
              >
                Learn more
                <svg
                  class="ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero2;
