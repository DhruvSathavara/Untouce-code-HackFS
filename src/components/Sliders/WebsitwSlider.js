import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BookContext } from '../../Context/BookContext';
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Box, Stack, Typography, Grid } from '@mui/material'
function WebsiteSlider() {

  const bookContext = React.useContext(BookContext);
  const { data } = bookContext;
  console.log(data, 'data');

  useEffect(() => {
    const bList = JSON.parse(JSON.stringify(data));
    console.log(bList, 'bList data');
    if (bList) {
      ListBookData(bList)
    }
  }, [data])

  const [bookData, setBookData] = useState([]);
  let count = 0;

  async function ListBookData(bList) {
    var array = [];
    if (bList) {
      for (let index = 0; index < bList.length; index++) {
        const element = bList[index];
        console.log(element, "book element");
        if (element.CID) {
          await axios.get(`https://${element.CID}.ipfs.infura-ipfs.io/data.json`).then((response) => {
            console.log(response, "response");
            var newData = { ...response.data };
            array.push(newData);
          });
        }
      }
    }
    setBookData(array);
  }
  console.log(bookData)

  return (
    <div style={{ height: '16rem',marginTop:"350px" }} className="container ">
      <div className='title-box'>
        <h3>Websites</h3>
        <div style={{ marginLeft: "42%" }} className='under-line col-2'></div>
      </div>
      <Grid container justifyContent="center">

        <Stack direction="row" flexWrap="wrap" spacing={9} mt={4}>

<div className='row'>
{

bookData && bookData.map((e,i) => {
  console.log(e, 'bookData in slider');
  if (e.category == "Website" && count < 12) {
    count++;
    console.log(count, 'current count')
    return (<div key={i} className='col-md-3 col-sm-4 col-lg-2 col-12'>
      <Box
        sx={{
          height: "210px",
          width: "170px",
          border: "2px solid #C4C4C4",
          background: "ghostwhite",
          padding: "20px",
          mb: 2,
        }}
      >
        <Box
          sx={{
            height: "110px",
            width: "110px",
            border: "2px solid #ffffff",
            borderRadius: "50%",
            backgroundImage: `url(${e.coverPicture})`,
            p: 1,
            ml: 1,
          }}
        >
        </Box>
        <Typography variant="subtitle1" ml={1} mb={1} mt={1}>
          {e.name}
        </Typography>
      </Box>
    </div>
    )
  }
})
}
</div>        
</Stack>
      </Grid>
    </div>

  );
}


export default WebsiteSlider;