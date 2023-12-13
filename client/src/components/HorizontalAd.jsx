import React, { useEffect } from "react";

const HorizontalAd = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className="z-50 flex-between w-full sticky bottom-0 md:hidden bg-white">
      <p>horizontal</p>
      {/* <!-- square ad --> */}
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

export default HorizontalAd;
// .bottom-bar {
//   @apply z-50 flex-between w-full sticky bottom-0 md:hidden;
// }
