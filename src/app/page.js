"use client";
import React, { useState } from "react";

import Hero from "./Hero";
import Cards from "./Cards";
import Navbar from "./Navbar";
const Page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Cards />
    </div>
  );
};

export default Page;
