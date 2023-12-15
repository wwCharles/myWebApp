import React, { useEffect } from "react";

const SquareAd = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error loading AdSense:", e);
    }
  }, []);

  return (
    <ins
      class="adsbygoogle"
      style={{
        // position: "realtive",
        display: "block",
        border: "1px solid gray",
        height: "400px",
        width: "400px",
        color: "black",
        textAlign: "center",
        backgroundColor: "gray",
      }}
      data-ad-client="ca-pub-5969680534034624"
      data-ad-slot={dataAdSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    >
      {/* <p>
          <strong>Advertisement</strong>
        </p> */}
    </ins>
  );
};

export default SquareAd;
