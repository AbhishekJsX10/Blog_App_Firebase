import React from 'react';
import Navbar from './Navbar';
import CardSection from "./CardSection";
import { getAuth } from "firebase/auth";

const Blogs = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="z-10">
        <CardSection currentUser={currentUser} /> {/* Pass currentUser to CardSection */}
      </div>
    </>
  );
}

export default Blogs;
