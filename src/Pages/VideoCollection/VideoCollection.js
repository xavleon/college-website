import React from "react";
import "./VideoCollection.css";
import { Card, Button } from "flowbite-react";
import image from "./image-1.jpg";

const VideoCollection = (props) => {
  return (
    <div>
      <div class="back-button">
        <div className="flex flex-wrap gap-2">
          <a href="/">
            <Button pill>Back to Home</Button>
          </a>
        </div>
      </div>

      <div className="video-container">
        {props.video.map((video) => {
          return (
            <Card
              className="max-w-sm"
              imgAlt={"Image alt text"}
              imgSrc={video.image}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {video.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {video.description}
                {/* You can add a description property to your video objects if you want */}
              </p>

              <Button href={video.url} target="_blank">
                Watch now
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VideoCollection;
