/* istanbul ignore file */
import axios from 'axios';

const genericContext = async () => {
    const axiosInstance = axios.create({baseURL: 'http://localhost:3000'})    
    const token = (await axiosInstance.post("/auth/login", {username: "john", password: "changeme"})).data;      
    const config = {
        headers: { Authorization: `Bearer ${token.access_token}` }
    };    

    return {axiosInstance: axiosInstance, config: config};
}

export default genericContext;