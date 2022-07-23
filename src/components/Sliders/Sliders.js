import React from "react";
import NewspaperSlider from "./NewspaperSlider";
import WebsiteSlider from "./WebsitwSlider";
import DocumentSlider from "./DocumentsSlider";
import BooksSliders from "./BooksSliders";

function Sliders(){
    return(
        <>
        <BooksSliders></BooksSliders>
        <DocumentSlider></DocumentSlider>
        <NewspaperSlider></NewspaperSlider>
        <WebsiteSlider></WebsiteSlider>
        </>
    )
}
export default Sliders;