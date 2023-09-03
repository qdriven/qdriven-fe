import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/baisc/Header';
import Footer from './components/baisc/Footer';
import { Gallery, Profile } from './components/baisc/Profile';
import ToDoList from './components/baisc/ToDoList';
import { Bio } from './components/baisc/Bio';
import Avatar from './components/baisc/Avatar';

//Application Layout

function App() {
  return (
    <div className="container">
      <Header />
      <Profile />
      <Gallery />
      <ToDoList />
      <Bio />
      <Avatar/>
      <Footer></Footer>
    </div>
  )
}

export default App;
