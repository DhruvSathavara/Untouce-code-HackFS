import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Blob, Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { FaGift } from 'react-icons/fa';
import { useWeb3Transfer } from 'react-moralis';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function ModalContribute(props) {
  const { Moralis, isAuthenticated, isInitialized } = useMoralis();

  const params = useParams();

  React.useEffect(() => {
    getReviews(params)
  }, [isAuthenticated, isInitialized, loading, isUpdated])

  const API_Token =  process.env.REACT_APP_WEB3STORAGE_TOKEN;
  const client = new Web3Storage({ token: API_Token })

  const reviews = Moralis.Object.extend("Reviews");
  const reviewsData = new reviews();

  const [allReviews, setAllReviews] = useState([]);
  const [gift, setGift] = useState('');
  const [review, setReview] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const[loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  let reviewObj = {
    gift: gift,
    review: review,
    receiverAddress: props.walletAddress,
  }

  // STORING REVIEWS
  function addReview(reviewObj) {
    const blob = new Blob(
      [
        JSON.stringify(reviewObj)
      ],
      { type: "application/json" }
    );
    const files = [
      new File([blob], "data.json")
    ];
    return files;
  }

  async function storeReview(reviewObj) {
    let files = addReview(reviewObj);
    const cid = await client.put(files);
   await
    reviewsData.set("CID", cid);
    await reviewsData.set("ParentID", params.id)
    await reviewsData.save();
    setLoading(false);
    setIsUpdated(!isUpdated)
   handleClose();
  }
  // GETTING REVIEWS 

  async function getReviews(params) {
    if (isAuthenticated) {
      const reviews = Moralis.Object.extend("Reviews");
      const query = new Moralis.Query(reviews);
      query.equalTo("ParentID", (params.id).toString());
      const reviewsAray = await query.find({ useMasterKey: true});
      let array = [];
      if (reviewsAray.length > 0) {
       reviewsAray.map((reviewD) => {
          axios.get(`https://${reviewD.attributes.CID}.ipfs.infura-ipfs.io/data.json`)
          .then(function (response) {
            array.push(response.data)
           
          })
          .catch(function (error) {
          })
       })
       setAllReviews(array)
      }
    }
  }

  const handleGift = (e) => {
    setGift(e.target.value)
  }
  const handleReview = (e) => {
    setReview(e.target.value)
  }
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function onAddClick(e) {
    e.preventDefault();
    setLoading(true)
  let transaction =  await TransferEth();
 
  if(transaction){
    await storeReview(reviewObj);
  }
 
  }

  const TransferEth = async () => {
    await Moralis.enableWeb3();
    const options = {
      type: "native",
      amount: Moralis.Units.ETH(gift, "18"),
      receiver: props.walletAddress,
      contractAddress: "0x0000000000000000000000000000000000001010",
    }
    let result = await Moralis.transfer(options);
    let tx = result.wait();
    return tx;
  }
  return (
    <div>
      <h3 className='contribute-title'>Contribute and help the Creator</h3>
      <Button variant="contained" className='gift-btn' onClick={handleClickOpen}>
        Gift
      </Button>

      {/* After contributed----- */}
      {allReviews && allReviews.map((e)=>{
        return(
      <div>
        <div style={{marginBottom:"-50px"}} className="App">
          <Container className='p-4'>
            <Row>
              {[
                'Light',
              ].map((variant, idx) => (
                <Card
                  bg={variant.toLowerCase()}
                  key={idx}
                  text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                  style={{ width: "49%", height: "100px" }}
                  className=" offset-3"
                >
                  <Card.Body>
                    <Card.Title> User </Card.Title>
                    <span style={{ display: "flex" }}><FaGift className='gift-icon'></FaGift><span><h4> {e.gift }     MATIC</h4></span></span>
                    <div className="gift-under-line col-12"></div>

                    <Card.Text>
                     <h4 style={{ marginTop:"8px" }}>{e.review }</h4> 
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </Container>
        </div>

      
      </div>
        )
      })}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Send Gifts</DialogTitle>
          <div className='dialogUnderline'></div>
          <DialogContent>
            <h3>
             
            </h3>
            <TextField
              autoFocus
              value={gift}
              margin="dense"
              onChange={handleGift}
              className="ETH-amount"
              label="Enter Amount"
              type="number"
              fullWidth
            />
            <TextField
              fullWidth
              value={review}
              onChange={handleReview}
              className='message-review'
              label="Message / Review"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={onAddClick} disabled={loading}> { loading ? "Loading...." : "Gift Matic"} </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}