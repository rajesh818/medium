import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@rajesh818/medium-common";
import { SigninAPI } from "../API/user";

interface InputFieldProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const InputField = ({
  label,
  placeholder,
  onChange,
  value,
  type,
}: InputFieldProps) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-mediumtext-white">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
};

export const SIgninComponent = () => {
  const [signinInputs, setSigninInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleOnSubmit = async () => {
    try {
      const res = await SigninAPI(signinInputs);
      if (res && res.apiStatus === "SUCCESS") {
        localStorage.setItem("token", res.jwt);
        navigate("/blog/1");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="">
          <div className="p-10 pb-1">
            <b className="font-black text-3xl">Log in</b>
            <p>
              Don't have an account?{" "}
              <Link
                className="underline text-purple-900 font-semibold"
                to={"/signup"}
              >
                Signup
              </Link>
            </p>
          </div>
          <div>
            <InputField
              label="Email"
              placeholder="Enter your Email"
              onChange={(e) => {
                setSigninInputs({ ...signinInputs, email: e.target.value });
              }}
              value={signinInputs.email}
            />
            <InputField
              label="Password"
              placeholder="Enter your Password"
              onChange={(e) => {
                setSigninInputs({ ...signinInputs, password: e.target.value });
              }}
              value={signinInputs.password}
              type="password"
            />
            <button
              onClick={handleOnSubmit}
              type="button"
              className="text-white mt-4 bg-gray-800 hover:bg-gray-900 w-full focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
