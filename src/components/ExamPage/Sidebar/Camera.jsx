import React, { useEffect, useRef, useState } from "react";
import "./Camera.css";

const Camera = () => {
  const [cameraError, setCameraError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(streamData);

        if (videoRef.current) {
          videoRef.current.srcObject = streamData;
        }
      } catch (e) {
        setCameraError(true);
        setErrorMessage("Camera access required");
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-container">
      {cameraError ? (
        <div className="error-box">
          <div className="blinking-alert">⚠️</div>
          <div>{errorMessage}</div>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            maxWidth: "349px",
            borderRadius: "16px",
            transform: "scaleX(-1)",
          }}
        />
      )}
    </div>
  );
};

export default Camera;
