import React from "react";
import { Container } from "./Hero3Style.js";

const Hero3 = () => {
  return (
    <Container>
      <div className="hero3-body">
        <div className="hero3-nav nav-4 hero3">
          <div className="hero3-right">
            <div className="hero3-language">
              <select
                className="hero3-language-select top"
                onchange="hero3-location=this.value;"
              >
                <option value="" selected>
                  EN
                </option>
                <option value="hero3-hero-id.html">ID</option>
              </select>
              <div className="hero3-language-icon top-icon">
                <i className="hero3-fas fa-chevron-down chevron chevron-top"></i>
              </div>
            </div>
            <a href="" className={`hero3-btn btn-signin`}>
              Sign In
            </a>
          </div>
        </div>

        <header className="hero3-header">
          <div className="hero3-header-container margin-inline margin-top-1">
            <p className="hero3-text-xl margin-bottom-1 text-center">
              Learn{" "}
              <span className="hero3-text-xl down">
                ask questions, advanced in your courses.
              </span>
            </p>
            <p className="hero3-text-md text-center">
              Learn anywhere. anytime.
            </p>
            <p className="hero3-text-sm margin-top text-center">
              Ready to excel? Enter your email below.
            </p>
            <div className="hero3-form"></div>
          </div>
        </header>
      </div>
    </Container>
  );
};

export default Hero3;
