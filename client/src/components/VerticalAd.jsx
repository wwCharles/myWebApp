import React, { useEffect } from "react";

const VerticalAd = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error loading AdSense:", e);
    }
  }, []);

  return (
    <div className="bg-black">
      {/* <!-- vertical --> */}

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5969680534034624"
        data-ad-slot={dataAdSlot}
        //  data-ad-slot="4018192515"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default VerticalAd;
// .bottom-bar {
//   @apply z-50 flex-between w-full sticky bottom-0 md:hidden;
// }
