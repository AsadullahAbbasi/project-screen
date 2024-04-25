import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Checkin from "./Checkin";

function HeroSection() {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="px-8 ">
      <div className="absolute lg:right-[20%] lg:top-[25%] md:right-[12%] right-0 top-[25%] xl:right-[32%]">
        {isOpen ? <Checkin setOpen={setOpen} open={isOpen} /> : ""}
      </div>

      <div className="h-[180px] relative max-w-[1255px] mx-auto -z-10">
        <img
          src="https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1652341068/EducationHub/photos/ocean-waves.jpg"
          alt="ss"
          className="w-full absolute top-0 left-0 h-full object-cover -z-10 rounded-lg"
        />
        <div className="lg:ml-6 ml-2 p-4 ">
          <h1 className=" text-3xl text-white font-bold  ">Hi 👋 James Doe</h1>
          <p className="text-white font-bold ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
            quod?
          </p>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            className="rounded-full py-1 h-10 mt-1 lg:mt-6"
          >
            Add check in
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
