import { RegisterData } from "@/types/authTypes";
import api from "./api";

const authService = {
    register:async(userData:RegisterData)=>{
        const resp = await api.post("/auth/register",userData)
        return resp.data
    }
}

export default authService