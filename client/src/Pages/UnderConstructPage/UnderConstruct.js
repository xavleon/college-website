import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const UnderConstruct = () => {
  return (
    <div>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1
              style={{ color: "white" }}
              class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"
            >
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Under Construction
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              The page you are looking for is actively being worked on <br />{" "}
              You'll find lots to explore on the home page.{" "}
            </p>
            <a
              style={{ background: "#2563EB" }}
              href="/"
              class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
      <div className="lottie">
        <Player
          speed={1.5}
          autoplay
          loop
          src="https://lottie.host/2781e71e-145d-4917-995a-e4715f2b09b4/cPHncAF7A3.json"
          style={{ height: "600px", width: "600px" }}
        >
          <Controls
            visible={false}
            buttons={[
              "play",
              "repeat",
              "frame",
              "snapshot",
              "debug",
              "background",
            ]}
          />
        </Player>
      </div>
    </div>
  );
};

export default UnderConstruct;
