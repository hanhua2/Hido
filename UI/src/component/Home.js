import React from "react";
import '../Home.scss';

function Home() {
  return (
    <div className="home">


      <div className={"Home"}>
        <img className={"Home__image2"} src="images/twitter_profile_image.png" alt="" />
        <img className={"Home__image1"} src="images/5d62543402daf1566725172569.png" alt=""/>
        <h1 className={"Home__text1"}>Make Life Efficient</h1>
      </div>

      <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
