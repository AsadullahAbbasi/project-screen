import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Checkin from "./Checkin";

function HeroSection() {
  const [isOpen, setOpen] = useState(false);
  // isOpen ? document.body.style.backgroundColor="#BDBDBD" : document.body.style.backgroundColor="white"
  return (
    <section className="px-8 relative h-full w-full ">
      <div className=" rightMob z-10 absolute lg:right-[30%] lg:top-[15%] md:right-[30%]  md:top-[10%] right-[18%] top-[-12%] xl:right-[38%] xl:top-[12%]">
        {isOpen ? <Checkin setOpen={setOpen} open={isOpen} /> : ""}
      </div>

      <div className="h-[180px] relative max-w-[1255px] mx-auto">
        <img
          src="https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1652341068/EducationHub/photos/ocean-waves.jpg"
          alt="ss"
          className="w-full absolute top-0 left-0 h-full object-cover  rounded-lg"
        />
        <div className="lg:ml-6 ml-2 sm:p-4">
          <h1 className=" text-3xl text-white font-bold  ">Hi 👋 James Doe</h1>
          <p className="text-white font-bold object-fill">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
            quod?
          </p>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            className="rounded-full py-1 h-10 mt-1 lg:mt-6 "
          >
            Add check in
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
