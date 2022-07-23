import React from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Stack, Typography, Box } from "@mui/material";
import { BookContext } from "../Context/BookContext";

function Header() {
  const bookContext = React.useContext(BookContext);

  const { login } = bookContext;

  const { Moralis, isAuthenticated } = useMoralis();

  return (
    <AppBar color="inherit" position="fixed" sx={{ height: "70px" }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography  >
          <Link to="/"> 
            <img src="/ualogo.png" alt="logo" />
          </Link>
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Link to="upload-form">
            <button className="btn" style={{
              backgroundColor: '#D82148', color: 'white',
              fontWeight: '30px', borderRadius: '7%'
            }}>Upload form</button>
          </Link>

          <button onClick={() => login()} className="btn my-2 my-sm-0" type="submit" style={{
            backgroundColor: 'white',
            color: '#D82148',
            fontWeight: '20px',
            border: '2px solid #D82148',
            marginLeft: '10px',
            borderRadius: '7%'
          }}>{isAuthenticated ? "Connected" : "Connect"}</button>

        </div>

      </Toolbar>
    </AppBar>

  )
}

export default Header;