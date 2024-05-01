"use client";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  collection,
  serverTimestamp,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import app from "./firebaseConfig";
import "./globals.css";
const Checkin = ({ setOpen, open }) => {
  
  const [title, setTitle] = useState("abc");
  const [Cancel, setCancel] = useState(true);
  // const [titles,setTitles] = useState([...titles,...title])
  const [browsedImg, setBrowseImg] = useState("");
  const [added, setAdded] = useState(false);
  const [Bookingid, setBookingid] = useState(0);
  const [Rooms, setRooms] = useState(0);
  const [NumberofGuests, setNumberofGuests] = useState(0);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  const [BookedDate, setBookedDate] = useState(formattedDate);
  const getBrowsedImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBrowseImg(reader.result);
    };
  };
  // console.log(titles);
  const handleCreate = async () => {
    const data = {
      title: title,
      browsedImg: browsedImg,
      Bookingid: Bookingid,
      Rooms: Rooms,
      NumberofGuests: NumberofGuests,
      BookedDate: BookedDate,
      createdAt: serverTimestamp(),
    };

    setOpen(false);
    try {
      const docRef = await addDoc(collection(db, "data"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <section className="flex bg-gray-400 my-4">
      {added && Cancel ? (
        <div className="checkinWidth  max-w-[250px]  md:w-[300px] lg:max-w-[400px] md:max-w-[300px]] mt-4 px-4  rounded-xl  flex flex-col justify-between py-4 gap-8">
          <div className="flex justify-between  bg-[#F8F8F8] px-4  rounded-t-lg h-12 items-center">
            <p>Detail</p>

            <CloseIcon
              className="cursor-pointer"
              sx={{ zIndex: 999, cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                setCancel(false);
                setOpen(false);
              }}
            />
          </div>
          <div className="flex flex-col justify-between gap-16 w-full">
            <div className="flex flex-col gap-6 w-full">
              <label className="flex  justify-between w-full gap-2 h-6">
                <p className="text-sm">Booking id</p>
                <input
                  className="outline-none border-[1.5px] w-full "
                  type="number"
                  onChange={(e) => setBookingid(e.target.value)}
                  name=""
                  id=""
                />
              </label>
              <label className="flex  justify-between gap-4 w-full">
                <p>Rooms</p>
                <input
                  type="number"
                  className="outline-none border-[1.5px] w-full"
                  onChange={(e) => setRooms(Number(e.target.value))}
                  name=""
                  id=""
                />
              </label>
              <label className="flex  justify-between w-full h-10">
                <p className="pr-4 text-sm">Number of Guests</p>
                <input
                  type="number"
                  className="outline-none border-[1.5px] w-full"
                  onChange={(e) => setNumberofGuests(e.target.value)}
                  name=""
                  id=""
                />
              </label>
              <label className="flex  justify-between ">
                <p>Booked Date</p>
                <input
                  className="outline-none border-[1.5px]"
                  onChange={(e) => setBookedDate(e.target.value)}
                  type="date"
                  name=""
                  id=""
                />
              </label>
            </div>

            <div>
              <div className="w-full">
                <img
                  src={browsedImg}
                  alt="ADD IMG"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
          <div className=" flex gap-3 bg-[#F8F8F8] rounded-b-lg py-4 items-center justify-end px-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCancel(false);
                setOpen(false);
              }}
              className="rounded-2xl border-[1px] px-2 sm:px-5 h-9 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();

                handleCreate();
              }}
              className="rounded-2xl border-[1px] px-2 sm:px-5 h-9 py-1 bg-[#7B5AFF]"
            >
              create
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {!added && Cancel && open ? (
        <div>
          <div className="max-w-[240px] lg:max-w-[350px] md:max-w-[300px]] mt-4 px-4  rounded-xl  flex flex-col justify-between py-4 gap-8">
            <div>
              <form className="flex flex-col gap-8">
                <div className="flex justify-between  bg-[#F8F8F8] px-4  rounded-t-lg h-12 items-center">
                  <p>Add Check in</p>
                  <CloseIcon
                    sx={{ zIndex: 999, cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCancel(false);
                      setOpen(false);
                    }}
                  />
                </div>
                <div>
                  <label className="flex flex-col gap-4 justify-center px-4">
                    Title
                    <input
                      type="text"
                      placeholder="Enter title"
                      className="rounded-lg pl-4 h-9 outline-none border-[1px] "
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>
                </div>

                <div>
                  <label className="flex flex-col gap-4 px-4">
                    Image Url
                    <input
                      type="text"
                      placeholder="Enter image url"
                      className="rounded-lg pl-4 h-9 outline-none border-[1px]"
                      onChange={(e) => setBrowseImg(e.target.value)}
                    />
                  </label>
                </div>
                <div className="px-4 ]">
                  <label className="flex flex-col gap-4">
                    Upload Image
                    <input type="file" onChange={getBrowsedImage} />
                  </label>
                </div>
              </form>
            </div>
            <div className=" flex gap-3 bg-[#F8F8F8] rounded-b-lg py-4 items-center justify-end px-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCancel(false);
                  setOpen(false);
                }}
                className="rounded-2xl border-[1px] px-5 h-9 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setAdded(true);
                }}
                className="rounded-2xl border-[1px] px-5 h-9 py-1 bg-[#7B5AFF]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Checkin;
