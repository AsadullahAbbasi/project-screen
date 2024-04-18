import React, { useState, useEffect } from "react";

const Cards = () => {
  const [cardData, setCardData] = useState([]);
  const [state, setstate] = useState();
  useEffect(() => {
    const updateCardDataFromLocalStorage = () => {
      const tempData = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = localStorage.getItem(key);
        const items = JSON.parse(item);
        console.log(item, "e");
        if (item.includes("title") && items.title !== "") {
          tempData.push(items);
        }
      }
      setCardData(tempData);
    };

    updateCardDataFromLocalStorage();

    const handleLocalStorageChange = (event) => {
      if (event.key === "yourLocalStorageKeyForItems") {
        updateCardDataFromLocalStorage();
      }
      setstate(!state);
      console.log("asd");
    };

    window.addEventListener("storage", handleLocalStorageChange);

    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
  }, [state]);

  return (
    <section className={"my-4 relative -z-10"}>
      <div
        className={
          "grid md:grid-cols-3 grid-cols-1 gap-4 place-items-center  -z-10 px-6 mx-auto max-w-[1348px]"
        }
      >
        {cardData.map((item, keys) => (
          <div
            key={keys}
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
