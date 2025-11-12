import React, { Dispatch, SetStateAction } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
import Link from "next/link";

const fileBox: { file: string; title: string; size: string }[] = [
  {
    file: "pdf",
    title: "Drawings.pdf",
    size: "20 MB",
  },
  {
    file: "xls",
    title: "Specifications.xlsx",
    size: "5.1 MB",
  },
  {
    file: "pdf",
    title: "Company Portfolio.pdf",
    size: "17 MB",
  },
  {
    file: "xls",
    title: "October 2025 - Order list.xlsx",
    size: "4.6 MB",
  },
  {
    file: "pdf",
    title: "Acknowledgment.pdf",
    size: "3.1 MB",
  },
];

const Box = ({
  setModalIsVisible,
}: {
  setModalIsVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <section className="!overflow-clip">
      <div className="w-screen h-screen absolute top-0  left-0 right-0 blur-[1rem] overflow-clip z-10">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full scale-150. max-2xl:scale-200 max-xlg:scale-300 max-xmd:scale-400"
        >
          <source src={"bgwork.mp4"} type="video/mp4"></source>
        </video>
      </div>
      <div className="w-screen h-screen flex flex-col z-30 relative p-[2rem]">
        <div className="flex justify-between items-center absolute top-0 w-full right-0 p-[2rem]">
          <div className="flex items-center bg-white py-[0.8rem] px-[1.6rem] rounded-[0.8rem]">
            <div className="flex justify-center items-center bg-[#0061ff] rounded-[0.2rem] w-[1.6rem] h-[1.6rem] mr-[1rem]">
              <div className="bg-white w-[0.8rem] h-[0.8rem] rounded-[0.2rem]"></div>
            </div>
            <p className="font-medium text-[#333]">File Transfer</p>
          </div>
          <div className="w-[4rem] h-[4rem] rounded-full bg-white items-center justify-center flex">
            <p>?</p>
          </div>
        </div>
        <div className=" flex-1 flex items-center justify-center">
          <div className="bg-white w-[30%] max-xl:w-[38%] max-lg:w-[55%] max-smd:w-full  rounded-[1.6rem] py-[1.5rem] border border-[rgba(255,255,255,0.2)] shadow-[0_25px_50px_rgba(0,0,0,0.25)] flex flex-col">
            <div className="w-[3.2rem] h-[3.2rem] self-center">
              <Image
                src={logo}
                alt="logo image"
                priority
                width={100}
                height={100}
                className="w-full h-full"
              />
            </div>
            <div className="text-center mt-[2rem]">
              <p className="font-semibold text-[#1e1919] text-[1.8rem] mb-[0.8rem] ">
                5 items ready for download
              </p>
              <p className="text-[#637282] text-[1.4rem]">
                49.9 MB • Expires in 7 days
              </p>
            </div>
            <div className="px-[2rem] border-b border-t border-[#e3e3e3] mt-[2rem]">
              {fileBox.map((box, i) => (
                <div
                  key={box.title}
                  className={`flex items-center py-[1.2rem] ${
                    i === fileBox.length - 1
                      ? ""
                      : "border-b border-b-[#f0f2f5]"
                  }`}
                >
                  <div
                    className={`${
                      box.file === "pdf" ? "bg-[#e90909]" : "bg-[#1d7a3b]"
                    } text-white w-[2.4rem] h-[2.4rem] flex items-center justify-center uppercase  text-[1rem] mr-[1.2rem] rounded-[0.2rem]`}
                  >
                    <p className="font-bold">{box.file}</p>
                  </div>
                  <div>
                    <p className="text-[1.4rem] text-[#1e1919] font-semibold mb-[0.2rem]">
                      {box.title}
                    </p>
                    <p className="text-[#637282] text-[1.2rem]">{box.size}</p>
                  </div>
                  <button
                    type="button"
                    className="ml-auto cursor-pointer"
                    onClick={() => {
                      setModalIsVisible(true);
                    }}
                  >
                    <HiOutlineArrowNarrowDown className=" w-[2.4rem] h-[2.4rem] text-[#0061ff]" />
                  </button>
                </div>
              ))}
            </div>
            <div className="px-[1.6rem] flex items-center justify-between pt-[1.6rem] pb-[1.2rem]">
              <Link
                href={""}
                className="text-[#0061ff] font-medium text-[1.5rem]"
              >
                Save to cloud
              </Link>
              <button
                type="button"
                className="bg-[#0061ff] text-white px-[2.4rem] py-[1.2rem] cursor-pointer font-medium text-[1.4rem] rounded-[0.8rem]"
                onClick={() => {
                  setModalIsVisible(true);
                }}
              >
                Download All
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Box;
