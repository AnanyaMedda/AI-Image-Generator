import React from "react";

const Preloader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", backgroundColor: "#fafafc" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      {/* Animated rectangles */}
      <rect fill="#e15b64" x="15" y="15" width="30" height="30" rx="3" ry="3">
        <animate
          attributeName="x"
          dur="1.3888888888888888s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="15;55;55;55;55;15;15;15;15"
          begin="-1.2731481481481481s"
        ></animate>
        <animate
          attributeName="y"
          dur="1.3888888888888888s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="15;55;55;55;55;15;15;15;15"
          begin="-0.9259259259259259s"
        ></animate>
      </rect>
      <rect fill="#f8b26a" x="15" y="15" width="30" height="30" rx="3" ry="3">
        <animate
          attributeName="x"
          dur="1.3888888888888888s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="15;55;55;55;55;15;15;15;15"
          begin="-0.8101851851851852s"
        ></animate>
        <animate
          attributeName="y"
          dur="1.3888888888888888s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="15;55;55;55;55;15;15;15;15"
          begin="-0.46296296296296297s"
        ></animate>
      </rect>
      <rect fill="#abbd81" x="15" y="15" width="30" height="30" rx="3" ry="3">
        <animate
          attributeName="x"
          dur="1.3888888888888888s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="15;55;55;55;55;15;15;15;15"
          begin="-0.3472222222222222s"
        ></animate>
        <animate
          attributeName="y"
          dur="1.3888888888888888s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="15;55;55;55;55;15;15;15;15"
          begin="0s"
        ></animate>
      </rect>
    </svg>
  </div>
);

export default Preloader;
