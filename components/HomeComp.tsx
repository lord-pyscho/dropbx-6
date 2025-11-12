"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Box from "./Box";
import LoginForm from "./LoginForm";
import { AnimatePresence } from "framer-motion";

const HomeComp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="overflow-clip">
      <AnimatePresence>
        {isModalVisible && <LoginForm setModalIsVisible={setIsModalVisible} />}
      </AnimatePresence>
      {isLoading ? <Loading /> : <Box setModalIsVisible={setIsModalVisible} />}
    </div>
  );
};

export default HomeComp;
