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
    const [pdf, setPdf] = useState('');

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
                    localStorage.setItem("currentUserAddress",address)
                })
                .catch(function (error) {
                });

        }
    }


    function addData(Item) {
        const blob = new Blob(
            [
                JSON.stringify(Item),
            ],
            { type: "application/json" }
        );
        const files = [
            new File([blob], "data.json"),
        ];
        return files;

    }
    async function storeFiles(Item) {
        var array = [];

        // TO GET CURRENT USER WALLET ADDRESS
        let currentUser = login()
        const Cuser = Moralis.User.current(currentUser)
        UntoucheDdata.set("Current_User", user)


        let files = addData(Item)
        const cid = await client.put(files);
        UntoucheDdata.set("CID", cid);
        UntoucheDdata.save();
        axios.get(`https://${cid}.ipfs.infura-ipfs.io/data.json`)
            .then(function (response) {
                array.push(response.data);
                setData(array);
            })
            .catch(function (error) {
            })

        return cid;
    }


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
                })
        }
    }


    // ------------MAHIMA'CODE

async function storeFile(file) {
       const ext = file.name.split('.').pop();

     const fileName = `${uuidv4()}.${ext}`;
     const newFile = new File([file], fileName, {type: file.type});
     const cid = await client.put([newFile], {
         name: fileName,
     });
     const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
     setImage(imageURI);
    //  const blob = new Blob([JSON.stringify({file:imageURI})], { type: "application/json" });
    //  const files = [new File([blob], "file.json")];
    //  setImage(imageURI)
     return imageURI;
}



async function storePdfFile(file){
    const ext = file.name.split('.').pop();
  
  const fileName = `${uuidv4()}.${ext}`;
  const newFile = new File([file], fileName, {type: file.type});
  const cid = await client.put([newFile], {
    name: fileName,
  });
  const pdfURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
//   const blob = new Blob([JSON.stringify({file : pdfURI})], { type: "application/json" });
//   const files = [new File([blob], "pdf.json")];
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