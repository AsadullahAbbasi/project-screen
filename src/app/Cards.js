import React, { useState, useEffect } from "react";
import {
  collection,
  getFirestore,
  query,
  onSnapshot,
  orderBy,
  limit,
  doc,
  deleteDoc
} from "firebase/firestore";
import app from "./firebaseConfig";
const Cards = () => {
  const db = getFirestore(app);
  const [cardData, setCardData] = useState([]);
  const [isLoaded, settLoaded] = useState(false);
// console.log("asad");
  useEffect(() => {
    const Data = async () => {
      // const querySnapshot = await getDocs(collection(db, "users"));
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data(), doc.id);
      //   setCardData((prevData) => [...prevData, doc.data()]);
      // });
      const q = query(collection(db, "data"), orderBy("createdAt","desc"),limit(3 ));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setCardData([]);
       
        querySnapshot.forEach((doc,index) => {
       
          setCardData((prevData) => [...prevData, {...doc.data(),id : doc.id}]);
        });
        settLoaded(true);
      });
      return () => {
        unsubscribe();
      };
    };

    Data();
  }, []);
  const handleDelete = (id)=>{
    deleteDoc(doc(db, "data", id));
  }
  // console.log(cardData);
  return (
    <section className="my-4   -z-10">
      {isLoaded ? (
        ""
      ) : (
        <div role="status" className="translate-x-[50%] translate-y-[150%]">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <div
        className={
          "grid md:grid-cols-3 grid-cols-1 gap-4 place-items-center   px-6 mx-auto max-w-[1348px]"
        }
      >
        {cardData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-md max-w-sm shadow-md w-[90%]"
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
            <div className="mt-4 flex flex-col gap-4">
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
                 {/* <p>Created at {item?.createdAt}</p> */}
                 {/* {console.log(item?.createdAt)} */}
              
              </div>
              <div>
                <button className="rounded-lg border-2 px-4 py-1 bg-[#7B5AFF]" onClick={()=>handleDelete(item.id)} > Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
