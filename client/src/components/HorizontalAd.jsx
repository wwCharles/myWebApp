import React, { useEffect } from "react";

const HorizontalAd = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error loading AdSense:", e);
    }
  }, []);

  return (
    // <div className="bottom-bar">
    <div className="z-50 sticky bottom-0 md:hidden bg-white ">
      {/* <p>horizontal</p> */}
      {/* <!-- horizontal --> */}
      <ins
        class="adsbygoogle"
        style={{ display: "block", maxWidth: "30%" }}
        data-ad-client="ca-pub-5969680534034624"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default HorizontalAd;
