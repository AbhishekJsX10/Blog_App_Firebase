import React, { useEffect, useState } from 'react';
import Card from './Card';
import { db } from "../FireBase";
import { onSnapshot, collection } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardSection = ({ currentUser }) => { // Receive currentUser prop
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "blogs_reactjs");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const fetchedData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(fetchedData);
      // console.log('Fetched Data:', fetchedData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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
      <div className="flex z-10 flex-wrap justify-center md:justify-start gap-6 p-6">
        {data.map((card, index) => (
          <Card
            key={index}
            id={card.id}
            user={card.authorName}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            authorImg={card.authorImg}
            authorUid={card.authorUid} // Pass authorUid to Card
            currentUser={currentUser} // Pass currentUser to Card
          />
        ))}
      </div>
    </>
  );
};

export default CardSection;
