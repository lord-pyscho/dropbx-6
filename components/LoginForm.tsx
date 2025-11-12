"use client";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import microsoftLogo from "../assets/microsoft.svg";
import { FaApple } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { loginUser } from "@/services/login";
import { Oval } from "react-loader-spinner";

const LoginForm = ({
  setModalIsVisible,
}: {
  setModalIsVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();

  const searchParamsObject = useMemo(
    () => ({
      e: searchParams.get("e") || undefined,
    }),
    [searchParams]
  );

  const [email, setEmail] = useState<string>(searchParamsObject.e ?? "");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errText, setErrText] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEmailChangeHandler = (e: any) => {
    setEmail(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPasswordChangeHandler = (e: any) => {
    setPassword(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const onRememberMeCheckedHandler = (e: any) => {
    setIsChecked((prevState) => !prevState);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitForm = async (e: any) => {
    setIsLoading(true);
    setErrText("");
    e.preventDefault();

    try {
      await loginUser({ email, password });

      setIsLoading(false);
      setErrText("Please enter the correct details to login!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 bottom-0 left-0 right-0 h-screen w-screen flex items-center justify-center bg-[#000000b8] z-40 "
    >
      <div className="w-[30%] max-xl:w-[38%] max-lg:w-[55%] max-smd:w-[90%]  bg-white rounded-[0.4rem]">
        <div className="p-[1.5rem] flex items-center relative">
          <div className="w-[4rem] h-[4rem] mx-auto">
            <Image
              src={logo}
              alt="logo image"
              priority
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
          <button
            type="button"
            className="absolute top-[1.5rem] right-[1.5rem] cursor-pointer"
            onClick={() => {
              setModalIsVisible(false);
            }}
          >
            <IoClose className="w-[2.4rem] h-[2.4rem]" />
          </button>
        </div>
        <form className="px-[3.2rem] pb-[3.2rem]" onSubmit={onSubmitForm}>
          <p className="font-semibold text-[2rem] text-[#1e1919]">Dropbox</p>
          <p className="text-[#637282] text-[1.5rem] mb-[1.4rem]">
            Sign in to continue
          </p>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              readOnly
              required
              onChange={onEmailChangeHandler}
              className="cursor-auto bg-[#f5f5f5] w-full py-[1.2rem] px-[1.6rem] text-[1.4rem] rounded-[0.6rem] border border-[#cbcbcb] focus:border-[#0061ff] mb-[2rem]"
            />
            <input
              required
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onPasswordChangeHandler}
              className="cursor-auto bg-[#fff] w-full py-[1.2rem] px-[1.6rem] text-[1.4rem] rounded-[0.6rem] border border-[#cbcbcb] focus:border-[#0061ff] mb-[1.5rem]"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={isChecked}
                onChange={onRememberMeCheckedHandler}
              />
              <label
                htmlFor="remember"
                className="text-[#637282] text-[1.4rem] ml-[0.5rem] cursor-pointer"
              >
                Remember me
              </label>
            </div>
            {errText && <p className="text-red-600">{errText}</p>}
            <button
              type="submit"
              className="bg-[#0061ff] flex items-center justify-center  font-semibold mb-[1.6rem] p-[1.4rem] text-center text-white rounded-[0.6rem] mt-[1.6rem]"
            >
              {isLoading ? (
                <Oval
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
          <div className="flex flex-col">
            <button
              type="button"
              className="flex items-center justify-center bg-[#f8f9fa] border border-[#e0e0e0] p-[1.2rem] text-[1.4rem] rounded-[0.6rem] mb-[1.2rem] gap-x-[0.8rem] cursor-pointer hover:bg-[#e9ecef] ease-in duration-200 transition-all"
            >
              <div className="w-[1.7rem] h-[1.7rem]">
                <Image
                  src={microsoftLogo}
                  alt="microsoft logo"
                  priority
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
              <p>Sign in with Microsoft</p>
            </button>
            <button
              type="button"
              className="flex items-center justify-center bg-[#f8f9fa] border border-[#e0e0e0] p-[1.2rem] text-[1.4rem] rounded-[0.6rem] gap-x-[0.8rem] cursor-pointer hover:bg-[#e9ecef] ease-in duration-200 transition-all"
            >
              <FaApple className="w-[2rem] h-[2rem]" />
              <p>Sign in with Apple</p>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginForm;
