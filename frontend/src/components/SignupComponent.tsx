import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@rajesh818/medium-common";
import { SignupAPI } from "../API/user";

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

export const SIgnupComponent = () => {
  const [signupInputs, setSignupInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleOnSubmit = async () => {
    try {
      const res = await SignupAPI(signupInputs);
      if (res && res.apiStatus === "SUCCESS") {
        localStorage.setItem("token", res.jwt);
        navigate('/blog/1');
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
            <b className="font-black text-3xl">Create Account</b>
            <p>
              Already has an acoount <Link className="underline text-purple-900 font-semibold" to={"/signin"}>Login</Link>
            </p>
          </div>
          <div>
            <InputField
              label="Name"
              placeholder="Enter your Name"
              onChange={(e) => {
                setSignupInputs({ ...signupInputs, name: e.target.value });
              }}
              value={signupInputs.name ? signupInputs.name : ""}
            />
            <InputField
              label="Email"
              placeholder="Enter your Email"
              onChange={(e) => {
                setSignupInputs({ ...signupInputs, email: e.target.value });
              }}
              value={signupInputs.email}
            />
            <InputField
              label="Password"
              placeholder="Enter your Password"
              onChange={(e) => {
                setSignupInputs({ ...signupInputs, password: e.target.value });
              }}
              value={signupInputs.password}
              type="password"
            />
            <button
              onClick={handleOnSubmit}
              type="button"
              className="text-white mt-4 bg-gray-800 hover:bg-gray-900 w-full focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
