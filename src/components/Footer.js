import React from "react";
import { BsDiscord, BsTwitter,AiFillFacebook } from "react-icons/all";

export default function Footer() {
    return (
        <footer id="footer">
            <div
                className=""
                style={{ marginLeft: "29vw", alignItems: "center", display: "flex",fontSize:"20px",wordSpacing:"15px",fontWeight:"500" }}
            >
                Made with ❤️ for the community
            </div>

            <div className="connect-footer"  >
                <div className="" style={{ paddingRight: "8vw",marginTop:"11px" }}>
                    <a href="/" target="_blank" style={{ fontSize: "30px", color: "blueviolet",marginInline:"20px" }}>
                        { <BsTwitter /> }
                    </a>
                    <a href="/" target="_blank" style={{ fontSize: "30px", color: "blueviolet",marginInline:"20px" }}>
                        {<AiFillFacebook/> }
                    </a>
                    <a href="/" target="_blank" style={{ fontSize: "30px", color: "blueviolet",marginInline:"20px" }}>
                        {<BsDiscord/> }
                    </a>
                </div>
            </div>
        </footer>
    );
}