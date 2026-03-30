import { RegisterData } from "@/types/authTypes";
import api from "./api";

const authService = {
    register:async(userData:RegisterData)=>{
        console.log(userData)
        const resp = await api.post("/auth/register",userData)
        return resp.data
    },
    login:async(email:string,password:string)=>{
        const resp = await api.post("/auth/login",{
            email,
            password
        })
        console.log("login return data",resp)
        return resp.data
    },

    me:async()=>{
        const resp = await api.get("/auth/me")
        return resp.data
    }
}

export default authService