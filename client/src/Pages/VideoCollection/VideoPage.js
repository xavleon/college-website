import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import "./VideoPage.css";
import { Spinner } from "flowbite-react";

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=FL9g-coFOqIUQgIAJCLoyBzg&key=" +
        process.env.REACT_APP_YOUTUBE_API_KEY
    )
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.items);

        console.log(data.items);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div class="back-button">
        <div className="flex flex-wrap gap-2">
          <a href="/">
            <Button pill>Back to Home</Button>
          </a>
        </div>
      </div>
      <div class="title">
        <h1 style={{ color: "white" }}>Chemistry & Biochemistry</h1>
        <p style={{ color: "white" }}>LS 197</p>
      </div>
      {loading ? (
        <div className="loading">
          <h1 style={{ color: "white" }}>Loading...</h1>
          <Spinner />
        </div>
      ) : (
        <div className="scale-up-center">
          <div class="video-collection">
            {videos.map((video) => (
              <div key={video.id}>
                <h1>{video.snippet.title}</h1>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
