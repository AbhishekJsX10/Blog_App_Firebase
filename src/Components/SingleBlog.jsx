import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { db } from "../FireBase";
import { getDoc, doc, collection } from 'firebase/firestore';

const SingleBlog = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const colRef = collection(db, "blogs_reactjs");
  const singleData = doc(db, "blogs_reactjs", id);

  useEffect(() => {
    const singleFetch = async () => {
      const docSnap = await getDoc(singleData);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    };
    singleFetch();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container mt-3 mx-auto px-8 py-2 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">{data.title}</h1>
        <div className="mb-6 sm:h-[40rem] md:h-[30rem]">
          <img src={data.imageUrl} alt={data.title} className="w-full h-full rounded-lg object-contain" />
        </div>
        <p className="text-lg mb-6">{data.fullDescription}</p>
        <div className="flex items-center mt-6">
          <img src={data.authorImg} alt={data.authorName} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="text-xl font-semibold">{data.authorName}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
