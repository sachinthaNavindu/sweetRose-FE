import { RegisterData, UpdateUserData } from "@/types/authTypes";
import api from "./api";

const authService = {
    register:async(userData:RegisterData)=>{
        const resp = await api.post("/auth/register",userData)
        return resp.data
    },
    login:async(email:string,password:string)=>{
        const resp = await api.post("/auth/login",{
            email,
            password
        })
        return resp.data
    },

    me:async()=>{
        const resp = await api.get("/auth/me")
        return resp.data
    },
    updateUser:async(userData:UpdateUserData)=>{
        const resp = await api.post("auth/updateUser",userData)
        return resp.data
    }
}

export default authService