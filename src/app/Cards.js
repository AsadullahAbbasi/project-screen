// "use client"
import React, { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  collection,
  getFirestore,
  query,
  onSnapshot,
  orderBy,
  limit,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import app from "./firebaseConfig";

const Cards = () => {
  const [Bookingid, setBookingid] = useState(0);
  const [Rooms, setRooms] = useState(0);
  const [NumberofGuests, setNumberofGuests] = useState(0);
  const [title, setTitle] = useState("");
  const [BookedDate, setBookedDate] = useState("");

 
  const db = getFirestore(app);
  const [cardData, setCardData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editState, setEditState] = useState({}); // State to manage edit mode for each input
  const inputRefs = useRef({});

  useEffect( () => {
    const fetchData =  async() => {
      const q = query(
        collection(db, "data"),
        orderBy("createdAt", "desc"),
        // limit(3)
      );
      const unsubscribe =  onSnapshot(q, (querySnapshot) => {
        let data = [];
      querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
          console.log(data,"inloop");
        });
       
      
        setCardData(data);

    
        console.log(cardData);
        setIsLoaded(true);
      });
      return () => {
        unsubscribe();
      };
    };

    fetchData();
  },[]);

console.log("asad",cardData);


  const handleDelete = (id) => {
    deleteDoc(doc(db, "data", id));
  };


  const handleEdit = (fieldName, id) => {


    inputRefs.current[id + fieldName].focus();
    setEditState((prev) => ({ ...prev, [id + fieldName]: true }));
 
  };
  const handleSave = (fieldName, id) => {
    setEditState((prev) => ({ ...prev, [id + fieldName]: false }));
    const cityRef = doc(db, "data", id);

    updateDoc(cityRef, {
      title: title,
      Bookingid: Bookingid,
      BookedDate: BookedDate,
      NumberofGuests: NumberofGuests,
      Rooms: Rooms,
    });
    // setTitle("")
  };
  // console.log(inputRefs);
  return (
    <section className="my-4 -z-10">
      {/* {isLoaded ? null : (
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
      )} */}

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 place-items-center px-6 mx-auto max-w-[1348px]">
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
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex justify-between text-sm">
                <div className="flex gap-3 ">
                  <p> title : </p>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    className="outline-none border-1 px-4"
                    ref={(ref) => (inputRefs.current[item.id + "title"] = ref)}
                    readOnly={!editState[item.id + "title"]}
                    defaultValue={item.title}
                    type="text"
                  />
                </div>
                <div className="">
                  {editState[item.id + "title"] ? (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleSave("title", item.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <EditIcon
                      className="cursor-pointer"
                      onClick={() => handleEdit("title", item.id)}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex ">
                  <p> BookedDate : </p>
                  <input
                    onChange={(e) => setBookedDate(e.target.value)}
                    name="BookedDate"
                    className="outline-none border-1 px-4"
                    ref={(ref) =>
                      (inputRefs.current[item.id + "BookedDate"] = ref)
                    }
                    readOnly={!editState[item.id + "BookedDate"]}
                    defaultValue={item.BookedDate}
                    type="text"
                  />
                </div>
                <div className="">
                  {editState[item.id + "BookedDate"] ? (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleSave("BookedDate", item.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <EditIcon
                      className="cursor-pointer"
                      onClick={() => handleEdit("BookedDate", item.id)}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* Input fields with edit functionality */}
                <div className="flex justify-between text-sm">
                  <div className="flex gap-3 ">
                    <p> Rooms : </p>
                    <input
                      name="Rooms"
                      onChange={(e) => setRooms(e.target.value)}
                      className="outline-none border-1 px-4"
                      ref={(ref) =>
                        (inputRefs.current[item.id + "rooms"] = ref)
                      }
                      readOnly={!editState[item.id + "rooms"]}
                      defaultValue={item.Rooms}
                      type="text"
                    />
                  </div>
                  <div className="">
                    {editState[item.id + "rooms"] ? (
                      <button
                        className="cursor-pointer"
                        onClick={() => handleSave("rooms", item.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <EditIcon
                        className="cursor-pointer"
                        onClick={() => handleEdit("rooms", item.id)}
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="flex ">
                    <p> Guests : </p>
                    <input
                      onChange={(e) => setNumberofGuests(e.target.value)}
                      name="NumberofGuests"
                      className="outline-none border-1 px-7"
                      ref={(ref) =>
                        (inputRefs.current[item.id + "guests"] = ref)
                      }
                      readOnly={!editState[item.id + "guests"]}
                      defaultValue={item.NumberofGuests}
                      type="text"
                    />
                  </div>

                  <div>
                    {editState[item.id + "guests"] ? (
                      <button
                        className="cursor-pointer"
                        onClick={() => handleSave("guests", item.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <EditIcon
                        className="cursor-pointer"
                        onClick={() => handleEdit("guests", item.id)}
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex gap-3 ">
                    Booking ID
                    <input
                      name="Bookingid"
                      onChange={(e) => setBookingid(e.target.value)}
                      className="outline-none border-1"
                      ref={(ref) =>
                        (inputRefs.current[item.id + "Bookingid"] = ref)
                      }
                      readOnly={!editState[item.id + "Bookingid"]} // Set readOnly based on edit state
                      defaultValue={item.Bookingid}
                      type="text"
                    />
                  </div>
                  <div>
                    {editState[item.id + "Bookingid"] ? (
                      <button
                        className="cursor-pointer"
                        onClick={() => handleSave("Bookingid", item.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <EditIcon
                        className="cursor-pointer"
                        onClick={() => handleEdit("Bookingid", item.id)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="rounded-lg border-2 px-4 py-1 bg-[#7B5AFF]"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <p ref={(Ref)=>console.log(Ref)} ></p> */}
    </section>
  );
};

export default Cards;
