import { SigninInput, SignupInput } from "@rajesh818/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

type API_STATUS = 'SUCCESS' | "FAILURE";

const SignupAPI = async (body : SignupInput ) : Promise<{ apiStatus: API_STATUS; jwt : string} | undefined> => {
    try {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, body , {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        if(res.statusText === "OK") {
            return {
                apiStatus : "SUCCESS",
                jwt : res.data.jwt,
            }
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

const SigninAPI = async(body : SigninInput) : Promise<{apiStatus:API_STATUS,jwt: string} | undefined> => {
    try {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, body , {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        if(res.statusText === "OK") {
            return {
                apiStatus : "SUCCESS",
                jwt : res.data.jwt,
            }
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export {
    SignupAPI,
    SigninAPI
}