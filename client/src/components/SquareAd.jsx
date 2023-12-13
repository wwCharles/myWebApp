import React, { useEffect } from "react";

const SquareAd = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className="bg-dark-2 h-[300px]">
      {/* <p>ad</p> */}
      {/* <!-- square --> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5969680534034624"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default SquareAd;
