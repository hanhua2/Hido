import React from "react";

function Home() {
  return (
    <div className="home">
      <header className="u-clearfix u-custom-color-1 u-header u-header" id="sec-a6c5">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <img className="u-image u-image-default u-preserve-proportions u-image-1" src="images/twitter_profile_image.png" alt="" data-image-width="800" data-image-height="800" />
          <nav className="u-menu u-menu-dropdown u-offcanvas u-menu-1">
            <div className="menu-collapse u-custom-font u-font-ubuntu" style={{fontSize: '1.25rem', letterSpacing: '0px'}}>
              <a className="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
                <svg className="u-svg-link" viewBox="0 0 24 24"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#menu-hamburger"></use></svg>
                <svg className="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
                </g></svg>
              </a>
            </div>
            <div className="u-custom-menu u-nav-container">
              <ul className="u-custom-font u-font-ubuntu u-nav u-unstyled u-nav-1"><li className="u-nav-item"><a className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" style={{padding: '18px 32px'}}>Home</a>
                </li><li className="u-nav-item"><a className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="Login-In.html" style={{padding: '18px 32px'}}>Log In</a>
              </li></ul>
            </div>
            <div className="u-custom-menu u-nav-container-collapse">
              <div className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                <div className="u-inner-container-layout u-sidenav-overflow">
                  <div className="u-menu-close"></div>
                  <ul className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li className="u-nav-item"><a className="u-button-style u-nav-link" style={{padding: '18px 32px'}}>Home</a>
                    </li><li className="u-nav-item"><a className="u-button-style u-nav-link" href="Login-In.html" style={{padding: '18px 32px'}}>Log In</a>
                  </li></ul>
                </div>
              </div>
              <div className="u-black u-menu-overlay u-opacity u-opacity-70"></div>
            </div>
          </nav>
        </div>
      </header>

      <section className="u-clearfix u-custom-color-1 u-section-1" id="sec-8fe3">
        <div className="u-clearfix u-sheet u-valign-top u-sheet-1">
          <img className="u-image u-image-default u-image-1" src="images/5d62543402daf1566725172569.png" alt="" data-image-width="8334" data-image-height="8334" />
          <img className="u-image u-image-default u-preserve-proportions u-image-2" src="images/twitter_profile_image.png" alt="" data-image-width="800" data-image-height="800"/>
          <h1 className="u-custom-font u-font-ubuntu u-text u-text-default u-text-1">Make Life Efficient</h1>
        </div>
      </section>

      <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <p className="u-small-text u-text u-text-variant u-text-1">@2022 IT5100A GROUP Copyright.</p>
        </div>
      </footer>

      <section className="u-backlink u-clearfix u-grey-80">
        <a className="u-link" href="https://nicepage.com/website-templates" target="_blank">
          <span>Website Templates</span>
        </a>
        <p className="u-text">
          <span>created with</span>
        </p>
        <a className="u-link" href="" target="_blank">
          <span>Website Builder Software</span>
        </a>. 
      </section>

    </div>
  );
}

export default Home;
