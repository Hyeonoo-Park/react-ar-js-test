import React from "react";
import "@ar-js-org/ar.js/aframe/build/aframe-ar";
import "../components/a-character";

function TestAFrame() {
  return (
    <a-scene vr-mode-ui="enabled: false;" renderer="antialias: true; alpha: true" arjs='sourceType: webcam; videoTexture: false; debugUIEnabled: false'>
      <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
      <a-entity id='character' character scale="1, 1, 1"></a-entity>
    </a-scene>
  );
}

export default TestAFrame;