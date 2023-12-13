import React, { useEffect } from "react";

const HorizontalAd = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <>
      <p>ok</p>
      {/* <!-- square ad --> */}
      <ins
        class="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5969680534034624"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default HorizontalAd;
