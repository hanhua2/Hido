import React from "react";
import '../Detail.css';

function Detail() {
    return (
        <div className="detail">
            <section className="u-clearfix u-section-1" id="sec-e779">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <p className="u-text u-text-1">Create Time</p>
                    <h6 className="u-custom-font u-font-ubuntu u-text u-text-2"> February 25, 2022 3:11 PM</h6>
                    <div className="u-image u-image-circle u-preserve-proportions u-image-1" alt=""
                         data-image-width="800" data-image-height="800" />
                    <p className="u-text u-text-3">Status</p>
                    <div
                        className="u-container-style u-custom-item u-group u-palette-3-light-2 u-radius-10 u-shape-round u-group-1">
                        <div className="u-container-layout u-valign-middle u-container-layout-1">
                            <p className="u-custom-item u-text u-text-4">To Do</p>
                        </div>
                    </div>
                    <p className="u-text u-text-5">Importance</p>
                    <div
                        className="u-container-style u-custom-item u-group u-palette-2-light-2 u-radius-10 u-shape-round u-group-2">
                        <div className="u-container-layout u-valign-top u-container-layout-2">
                            <p className="u-custom-item u-text u-text-6">Ergent</p>
                        </div>
                    </div>
                    <p className="u-text u-text-7">Comments</p>
                    <h6 className="u-custom-font u-font-ubuntu u-text u-text-8">Definitely need to do today!</h6>
                    <h1 className="u-custom-font u-font-ubuntu u-text u-text-9">
                        <span style={{fontWeight: "700"}}>REVIEW IT5007</span>
                    </h1>
                    <p className="u-text u-text-10">Attachments</p>
                    <div
                        className="u-container-style u-custom-color-3 u-custom-item u-group u-radius-10 u-shape-round u-group-3">
                        <div className="u-container-layout u-valign-middle u-container-layout-3">
                            <p className="u-align-center u-custom-item u-text u-text-11">Lecture5.jpg</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
                </div>
            </footer>
        </div>
    )

}

export default Detail;
