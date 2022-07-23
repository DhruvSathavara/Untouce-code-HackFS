import React from 'react'
// import './Feature.css'
import { icons } from 'react-icons'
import { BsBookHalf } from "react-icons/bs"
import { FcDocument } from "react-icons/all"
import { GiNewspaper } from "react-icons/all"
import { CgWebsite } from "react-icons/all"
import { Link } from "react-router-dom";



export default function Categories() {
    return (
        <><div style={{marginTop:"160px"}}>
            <h1 style={{ color: "rgb(54 54 58)", fontSize: "40px", fontWeight: "bold", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", textAlign: "center", marginTop: "-40px" }}>
                Explore
            </h1>

            <div className="grid-container container-fluid">
                <div style={{ justifyContent: "space-evenly" }} className='row'>
                    <div className="grid-item  col-4" >

                        <div className='cardsfeture' >
                        <Link to='/book-list'>
                            <div className="buttons" >
                                <a className="" href=""><BsBookHalf />

                                </a>
                                <p className='icon-name'>  {"    "} Books</p>

                            </div>
                        </Link>

                        </div>
                    </div>

                    <div className="grid-item col-4" >

                        <div className='cardsfeture' >
                            <Link to='/documents-list'>
                            <div className="buttons" >
                                <a className="" href=""><FcDocument />

                                </a>
                                <p className='icon-name'>Documents</p>

                            </div>
                            </Link>
                        </div>
                    </div>
                </div>

             
                <div style={{ justifyContent: "space-evenly" }} className='row'>


                <div className="grid-item col-4" >

                    <div className='cardsfeture' >
                    <Link to='/newspapers-list'>
                        <div className="buttons" >
                            <a className="" href=""><GiNewspaper />

                            </a>
                            <p className='icon-name'>Newspapers</p>

                        </div>
                    </Link>
                    </div>
                </div>

                <div className="grid-item col-4" >

                    <div className='cardsfeture' >
                    <Link to='/websites-list'>
                        <div className="buttons" >
                            <a className="" href=""><CgWebsite/>
                            </a>
                            <p className='icon-name'>Websites</p>
                        </div>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}