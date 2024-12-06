import React from "react";
import "src/assets/styles/footer.modules.scss";

const footer = () => {
  return (
    <>
      <div className="container footer">
        <div className="social">
          <a
            className="socialIcon"
            href="https://github.com/egonella"
            target="_blank"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            className="socialIcon"
            href="https://www.linkedin.com/"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a className="socialIcon" href="https://twitter.com/" target="_blank">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
        <div>
          <span>
            💻by
            <a
              className="link"
              href="https://github.com/egonella"
              target="_blank"
            >
              {" "}
              egonella{" "}
            </a>
          </span>
          <span> &copy; 2024</span>
        </div>
      </div>
    </>
  );
};

export default footer;
