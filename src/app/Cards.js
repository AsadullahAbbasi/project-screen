import React, { useState, useEffect,  } from "react";
import {

  collection,

  getFirestore,
  query, onSnapshot
} from "firebase/firestore";
import app from "./firebaseConfig";
const Cards = () => {
  const db = getFirestore(app);
  const [cardData, setCardData] = useState([]);
  
  useEffect(() => {
    const Data = async () => {
      // const querySnapshot = await getDocs(collection(db, "users"));
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data(), doc.id);
      //   setCardData((prevData) => [...prevData, doc.data()]);
      // });
      const q = query(collection(db, "data"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setCardData("")
        querySnapshot.forEach((doc) => {
          console.log(doc,"d");
          setCardData((prevData) => [...prevData, doc.data()]);
        });
      });
      return () => {
        unsubscribe();
      };
    };

    Data(); 
  }, []);
  console.log(cardData);
  return (
    <section className="my-4   -z-10">
      <div
        className={
          "grid md:grid-cols-3 grid-cols-1 gap-4 place-items-center   px-6 mx-auto max-w-[1348px]"
        }
      >
        {cardData.map((item,index) => (
          <div
         key={index}
            className="border border-gray-300 p-4 rounded-md max-w-sm shadow-md"
          >
            <div className="relative">
              <img
                className="rounded-lg border-4 border-gray-200"
                src={item.browsedImg}
                alt=""
              />
              <div className="absolute top-4 right-4">
                <p className="rounded-lg border-2 px-4 py-1 bg-[#7B5AFF]">
                  Checked in
                </p>
              </div>
            </div>
            <div className="mt-4 ">
              <div className=" flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">{item.BookedDate}</p>
                </div>
              </div>
              <div>
                <p> BookedDate : {item.BookedDate}</p>
                <p> Rooms : {item.Rooms}</p>
                <p> NumberofGuests : {item.NumberofGuests}</p>
                <p> Bookingid : {item.Bookingid}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
