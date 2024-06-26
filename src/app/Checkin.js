"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Checkin = ({ setOpen, open }) => {
  const [title, setTitle] = useState("");
  const [Cancel, setCancel] = useState(true);
  const [keys, setKeys] = useState([]);
  const [browsedImg, setBrowseImg] = useState("");
  const [added, setAdded] = useState(false);
  const [Bookingid, setBookingid] = useState(0);
  const [Rooms, setRooms] = useState(0);
  const [NumberofGuests, setNumberofGuests] = useState(0);
  const [BookedDate, setBookedDate] = useState("2-24-2024");

  const getBrowsedImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBrowseImg(reader.result);
    };
  };

  const handleCreate = () => {
    const data = {
      title: title,
      browsedImg: browsedImg,
      Bookingid: Bookingid,
      Rooms: Rooms,
      NumberofGuests: NumberofGuests,
      BookedDate: BookedDate,
    };

    localStorage.setItem(title, JSON.stringify(data));

    setKeys([...keys, title]);
    setOpen(false);
    window.location.reload();
  };

  return (
    <section className="flex ">
      {added && Cancel ? (
        <div className="max-w-[672px] mt-4 px-4  rounded-xl bg-white  flex  flex-col gap-16 justify-between py-4 ">
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
          <div className="flex justify-between gap-16">
            <div className="flex flex-col gap-6">
              <label className="flex  justify-between ">
                <p>Booking id</p>
                <input
                  className="outline-none border-[1.5px]"
                  type="number"
                  onChange={(e) => setBookingid(e.target.value)}
                  name=""
                  id=""
                />
              </label>
              <label className="flex  justify-between gap-4">
                <p>Rooms</p>
                <input
                  type="number"
                  className="outline-none border-[1.5px]"
                  onChange={(e) => setRooms(e.target.value)}
                  name=""
                  id=""
                />
              </label>
              <label className="flex  justify-between ">
                <p className="pr-4">Number of Guests</p>
                <input
                  type="number"
                  className="outline-none border-[1.5px]"
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
              <div className="max-w-[200px]">
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
              className="rounded-2xl border-[1px] px-5 h-9 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();

                handleCreate();
              }}
              className="rounded-2xl border-[1px] px-5 h-9 py-1 bg-[#7B5AFF]"
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
          <div className="max-w-[572px] mt-4 px-4  rounded-xl  bg-white  flex flex-col justify-between py-4 gap-8">
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
