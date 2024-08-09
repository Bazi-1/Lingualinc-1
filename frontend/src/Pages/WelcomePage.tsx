import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../Components/style/welcomeApp.css'; 


/**
 * WelcomeView displays the landing page of the application.
 * @returns {React.Component} The WelcomeView component.
 */
const WelcomeView = () => {
  return (
    <div className="hero_area">
      {/* Header Section */}
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="/">
              <span>LINGUALINC</span>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
        </div>
      </header>

      {/* Slider Section */}
      <div className="slider_section position-relative">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="col-lg-10 col-md-11 mx-auto">
                  <div className="detail-box">
                    <div>
                      <h1>WELCOME TO</h1>
                      <h2>Language Learning Center</h2>
                      <div>
                        <a href="/sign-up">Get Started</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeView;
