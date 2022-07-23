import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import UploadForm from './components/UploadForm';
import BookList from './components/ListingPage/BookList';
import BookDetail from './components/DetailsPage/BookDetail';
import DocumentList from './components/ListingPage/DocumentList';
import NewspaperList from './components/ListingPage/NewspaperList'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WebsiteList from './components/ListingPage/WebsitesList';
import DocumentDetail from './components/DetailsPage/DocumentDetail';
import NewsDetail from './components/DetailsPage/NewsDetail';
import WebsiteDetail from './components/DetailsPage/WebsiteDetail';
function App() {
  return (
    <div className="App">
      {/* <BookDetail></BookDetail> */}
<Header />
<Routes>
<Route path="/" element= {<Home />}/>
  <Route path ="/upload-form" element = {<UploadForm />}/>
  
  <Route path="/book-detail/:id" element = { <BookDetail /> } />

  <Route path="/doc-detail/:id" element = { <DocumentDetail /> } />
  <Route path="/news-detail/:id" element = { <NewsDetail /> } />
  <Route path="/web-detail/:id" element = { <WebsiteDetail /> } />
  <Route path ="/book-list" element = { <BookList />} />
<Route path="/documents-list" element = {<DocumentList />} />
<Route path = "/newspapers-list" element = { <NewspaperList /> } />
<Route path = "/websites-list" element = { <WebsiteList /> } />
</Routes>
<Footer />
      {/* <BookList></BookList> */}
      {/* <BookDetail></BookDetail> */}
    </div>
  );
}

export default App;