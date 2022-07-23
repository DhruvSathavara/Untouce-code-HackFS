import React, { useState, createContext } from "react";
import axios from 'axios'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min";
//--------- MAHIMA
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



export const BookContext = createContext();
export const BookContextProvider = (props) => {
    const [Image, setImage] = useState();
    console.log(Image,'imag in context');
    const [pdf, setPdf] = useState('');
console.log(pdf,'pdf in context');

    const { Moralis, user, account } = useMoralis();
    const { data, fetch } = useMoralisQuery("UntouchedArchieve");
    const [NewData, setData] = useState([]);
    const [bookDetails, setBookDetails] = useState({})
    const API_Token =  process.env.REACT_APP_WEB3STORAGE_TOKEN;
    const client = new Web3Storage({ token: API_Token })
    const untouchedA = Moralis.Object.extend("UntouchedArchieve");
    const UntoucheDdata = new untouchedA();
    const { authenticate, isAuthenticated, isInitialized } = useMoralis()




    const login = async () => {
        if (!isAuthenticated) {
            await authenticate({
                provider: "web3Auth",
                clientId: "BHQlt53J8Q_CprFI9tgx5aRB7pE9Ei0ccchzXQBNIYAI4RwdZ84Y2sVGoezEZ3S_kwwt3MuZ2eZIGoTYET--4I0",
            })
                .then(function (user) {
                    let address = user.get("ethAddress")
                    console.log(address, "get address");
                    localStorage.setItem("currentUserAddress",address)
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }


    function addData(Item) {
        console.log(Item, "Item")
        const blob = new Blob(
            [
                JSON.stringify(Item),
            ],
            { type: "application/json" }
        );
        const files = [
            new File([blob], "data.json"),
        ];
        console.log(files);
        return files;

    }
    async function storeFiles(Item) {
        var array = [];

        // TO GET CURRENT USER WALLET ADDRESS
        let currentUser = login()
        console.log(currentUser, 'current user login')
        const Cuser = Moralis.User.current(currentUser)
        UntoucheDdata.set("Current_User", user)
        console.log(Cuser, 'cuser...');


        let files = addData(Item)
        const cid = await client.put(files);
        UntoucheDdata.set("CID", cid);
        UntoucheDdata.save();
        console.log("stored files with cid", cid);
        axios.get(`https://${cid}.ipfs.infura-ipfs.io/data.json`)
            .then(function (response) {
                array.push(response.data);
                setData(array);
            })
            .catch(function (error) {
                console.log(error);
            })

        return cid;
    }
    console.log(NewData);


    async function getBookDetails(params) {

        if (isAuthenticated) {
            const archives = Moralis.Object.extend("UntouchedArchieve");
            const query = new Moralis.Query(archives);
            query.equalTo("objectId", (params.id).toString());
            const object = await query.first();
            axios.get(`https://${object.attributes.CID}.ipfs.infura-ipfs.io/data.json`)
                .then(function (response) {
                    setBookDetails(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }


    // ------------MAHIMA'CODE

async function storeFile(file) {
    console.log(file.name, "StoreFiles");
       const ext = file.name.split('.').pop();

     const fileName = `${uuidv4()}.${ext}`;
     const newFile = new File([file], fileName, {type: file.type});
     const cid = await client.put([newFile], {
         name: fileName,
     });
     console.log(cid,"cid from storeFile")
     const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
     console.log(imageURI, "imageURI from storeFiles");
     setImage(imageURI);
    //  const blob = new Blob([JSON.stringify({file:imageURI})], { type: "application/json" });
    //  const files = [new File([blob], "file.json")];
    //  setImage(imageURI)
    //  console.log(files);
     return imageURI;
}
console.log(Image);



async function storePdfFile(file){
    console.log(file.name, "storePdfFile");
    const ext = file.name.split('.').pop();
  
  const fileName = `${uuidv4()}.${ext}`;
  const newFile = new File([file], fileName, {type: file.type});
  const cid = await client.put([newFile], {
    name: fileName,
  });
  console.log(cid,"cid from storePdfFile")
  const pdfURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
  console.log(pdfURI, "pdfURI from storePdfFile");
//   const blob = new Blob([JSON.stringify({file : pdfURI})], { type: "application/json" });
//   const files = [new File([blob], "pdf.json")];
//   console.log(files);
  setPdf(pdfURI)
  
  
  
  return pdfURI;
  
   }

    return (
        <BookContext.Provider
            value={{
                addData,
                storeFiles,
                getBookDetails,
                data,
                bookDetails,
                login,
                storeFile,
                Image,
                storePdfFile,
                pdf
                // currentUser
                // fetch
            }}
        >
            {props.children}
        </BookContext.Provider>
    );
}