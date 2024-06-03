import React from 'react';
import { db } from "../FireBase";
import { doc, deleteDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ user, title, description, imageUrl, authorImg, id, authorUid, currentUser }) => {
  const navigate = useNavigate();

  const deletedata = async (id) => {
    const data = doc(db, "blogs_reactjs", id);
    alert("The blog will be deleted forever");
    await deleteDoc(data);
    toast.success('Deleted Successfully', {
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
      <div className="bg-white z-10  bg-opacity-15 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-200 w-60 shadow-lg">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={`${authorImg}`}
              alt="User"
              className="w-10 h-10 border rounded-full mr-2"
            />
            <span className="text-white">{user}</span>
          </div>
        </div>
        <img className="w-full px-3 rounded-lg h-32 object-cover" src={imageUrl} alt="Card image" />
        <div className="pt-3 pb-0 px-4">
          <h3 className="text-white text-lg mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4 truncate">{description}</p>
        </div>
        <div className="px-4 pt-0 pb-4 flex justify-between">
          <Link to={`/blogs/${id}`} className="bg-[#1b1b1b] bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 text-blue-500 px-3 py-2 rounded hover:bg-opacity-20 transition">View More</Link>
          {currentUser?.uid === authorUid && (
            <button onClick={() => deletedata(id)}
              className="bg-[#1b1b1b] bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 text-red-500 px-3 py-2 rounded hover:bg-opacity-20 transition">Delete</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
