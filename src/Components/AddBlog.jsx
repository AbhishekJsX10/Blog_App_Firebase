import React, { useState } from 'react';
import Navbar from "./Navbar";
import { db } from '../FireBase';
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlog = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
    authorName: currentUser.displayName,
    authorImg: currentUser.photoURL,
    authorUid: currentUser.uid  // Add authorUid here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const formRef = collection(db, "blogs_reactjs");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(formRef, formData);
    console.log("data submitted");
    setFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      imageUrl: '',
      authorName: currentUser.displayName,
      authorImg: currentUser.photoURL,
      authorUid: currentUser.uid  // Reset authorUid here
    });
    toast.success('Blog is Submitted', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setTimeout(() => {
      navigate("/blogs");
    }, 2500);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Add Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2" htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 text-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2" htmlFor="shortDescription">Short Description</label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 text-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2" htmlFor="fullDescription">Full Description</label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg resize-none bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 text-white focus:outline-none h-32"
                required
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2" htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 text-white focus:outline-none"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-4">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
