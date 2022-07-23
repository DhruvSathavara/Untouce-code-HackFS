import React, { useState } from "react";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { useMoralis } from "react-moralis";
import { BookContext } from "../Context/BookContext";
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const axios = require('axios'); 

function UploadForm() {
const {Moralis,account,isAuthenticated} = useMoralis();

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState("Book");
    const [file, setFile] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [checkbox, setCheckbox] = useState();
    const notify = () => alert("Files are uploaded!");

    const[data, setData] = useState()

    const nameEvent = (e) => {
        setName(e.target.value)
    }
    if(isAuthenticated){
    }
    const subjectEvent = (e) => {
        setSubject(e.target.value || null)
    }
   
    const websiteEvent = (e) => {
        setWebsite(e.target.value)
    }

    const descriptionEvent = (e) => {
        setDescription(e.target.value)
    }

    async function coverEvent(e){
        const file = e.target.files[0];
      var url = await storeFile(file);
      setCoverPic(url);
    }

    async function PdfStore(e){
        const file = e.target.files[0];
       var pdf = await storePdfFile(file);
       setFile(pdf);
    }

    const checkboxEvent = (e) => {
        setCheckbox(e.target.checked)
    }
   
    let Item = {
        name: name,
        subject: subject,
        category: category,
        file: file,
        coverPicture:coverPic,
        website: website,
        description: description,
        checkbox: checkbox,
        walletAddress:localStorage.getItem("currentUserAddress")
    }

    
    function onFormSubmit(e) {
        e.preventDefault() 
        // addData();
        storeFiles(Item)
       
        setName('');
        setSubject('');
        setCategory('');
        setFile(null);
        setCoverPic(null);
        setWebsite('')
        setDescription('');
        setCheckbox(null);
       
       
    }
   

// Web3Storage

const bookContext = React.useContext(BookContext);
const {addData, storeFiles,storeFile,Image,storePdfFile,pdf} = bookContext;

const API_Token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
const client = new Web3Storage({ token: API_Token})
const untouchedA = Moralis.Object.extend("UntouchedArchieve");
const UntoucheDdata  = new untouchedA();


    return (
        <div style={{ backgroundColor: "aliceblue" , marginTop:"77px" }} className="col">
            <div className="form-style-2 offset-4 row-8">
                <div className="form-style-2-heading">Upload any files from here</div>
                <form action="" method="" onSubmit={onFormSubmit}>
                    <label for="field1"><span>Name <span className="required">*</span></span><input value={name} onChange={nameEvent} placeholder="File name" type="text" class="input-field" name="field1" /></label>

                    <label for="field4"><span>Category</span><select value={category} name="field4" onChange={(e)=>setCategory(e.target.value)} className="select-field">
                        <option defaultChecked defaultValue="Book" value="Book">Book</option>
                        <option value="Documents">Documents</option>
                        <option value="Newspaper">Newspaper</option>
                        <option value="Website">Website / Snapshot</option>
                    </select></label>

                {category == "Website" ? (
                    ""
                ) : (
                    <label  for="field2"><span>Subject <span className="required">*</span></span><input value={subject} placeholder="Subject" onChange={subjectEvent} type="text" class="input-field" name="field2" /></label>
                )}
                   
                   {category == "Website" ? (
                    ""
                ) : (
                    <label for="field6"><span>Choose file</span><input className="file-input" value={undefined} onChange={PdfStore} type="file"></input></label>
                )}

                   

                    <label for="field6"><span>Cover Pic</span><input className="file-input" value={undefined} onChange={coverEvent} type="file"></input></label>

                    {category != "Website" ? (
            ""
          ) : (
            <label for="field7"><span>Add website</span><input value={website} className="add-url" placeholder="add URL" onChange={websiteEvent} type="url"></input></label>
          )}
                   
                   {category == "Website" ? (
            ""
          ) : (
            <label for="field5"><span>Description</span><textarea value={description} onChange={descriptionEvent} name="field5" className="textarea-field"></textarea></label>
          )}

                    

                    <label><input className="terms-checkbox" value={checkbox} onChange={checkboxEvent} type="checkbox"></input>I agree to terms and conditions.</label>

                    <label><span> </span><input type="submit" value="Submit" /></label>
                </form>
            </div>
        </div>
    )
}


export default UploadForm;