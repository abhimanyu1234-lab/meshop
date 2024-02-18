import axios from "axios";

const URL='https://shpme12.onrender.com/api/';

//product api https://shpme12.onrender.com/api

export const addProductApi= async(data)=>{
    try{
        const d=await axios.post(`${URL}carts`,data);
         return d
    }
    catch(error){
        console.log(error)
    }
}
// https://shpme12.onrender.com/api/carts/find/64553c8f0e30cdc4a4e0e6af

//get product by userId
export  const getUserProducts=async(id)=>{
    try{
        const result=await axios.get(`${URL}carts/find/${id}`);
        return result.data;
    }
    catch(error){
        console.log("Error while fetching user products ", error.message)
    }
}


export const getProduct=async(id)=>{
    try{
        const result = await axios.get(`${URL}products/find/${id}`)
        return result.data;

    }
    catch(error){
        console.log("Error while getting ", error.message);
    }
}


export const getAllOrder= async(id)=>{
    try{
        console.log("hii",id);
        const result= await axios.get(`${URL}orders/find/${id}`);
         return result.data;
    }
    catch(error){
        console.log("error while getting order ", error.message);
    }
}


