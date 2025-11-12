"use client";
import { motion } from "framer-motion";
import React from "react";

const Loading = () => {
  return (
    <div className=" bg-linear-to-r from-[#4a90e2] to-[#357abd] w-screen h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 90 }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeIn" }}
        className="bg-white w-[4rem] h-[4rem] rounded-[0.6rem]"
      >
        {" "}
      </motion.div>
    </div>
  );
};

export default Loading;
