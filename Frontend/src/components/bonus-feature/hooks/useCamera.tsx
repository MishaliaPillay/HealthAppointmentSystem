import { useState, useRef, useEffect } from "react";

export const useCamera = (setError: (error: string | null) => void) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 400,
          height: 300,
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Log the tracks to verify we have a valid video track
        // const videoTracks = stream.getVideoTracks();

        // Set camera as active
        setCameraActive(true);
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.error("Error starting video playback:", playError);
        }
      } else {
        console.error("Video ref is null, can't find source ");
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setError("Could not access camera. Please check permissions.");
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    // Reset states
    setCameraActive(false);
    setVideoReady(false);
  };

  const toggleCamera = () => {
    if (cameraActive) {
      stopVideo();
    } else {
      startVideo();
    }
  };

  const handleVideoPlay = () => {
    setVideoReady(true);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    cameraActive,
    videoReady,
    toggleCamera,
    handleVideoPlay,
  };
};
