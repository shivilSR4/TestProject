import axios from "axios";

const AxiosInstance = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL
})

AxiosInstance.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    config.headers['Authorization']='Bearer' + " "+token
    return config
})

AxiosInstance.interceptors.response.use(function(response){
    return response
},function(error){
    if(error.response && error.response.status === 401){
        window.location.href = '/'
        localStorage.clear()
        console.log("unauthorized user");
    }
    return Promise.reject(error)
})

export default AxiosInstance