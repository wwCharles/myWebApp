import React from "react";

const WelcomeModal = ({ onClose }) => {
  const email = "info@juiced23.com";
  return (
    <div className="modal-overlay ">
      <div className="modal-content border">
        <h1 className="h3-bold md:h2-bold">juiced23</h1>
        <p>
          {/* Juiced23
          <br /> */}
          A hub for everything automotive, showcase builds & share stories.
          <br />
          Community-driven – flag any inappropriate post.
          <br />
          Reach out for functionality requests, bugs, or to join our team at
          <br />
          <a href={`mailto:${email}`}>{email}</a>
          {/* <br />
          Your data? We don't care. 
          Ads keep us rolling – be cool. */}
          {/* <br />
           *Don't make this site ig/tiktok, keep it real* */}
        </p>
        <button
          className="h3-bold md:h2-bold py-4 px-8 mt-8 border"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
