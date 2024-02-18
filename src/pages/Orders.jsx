import React, { useEffect, useState } from 'react'
import { getAllOrder } from '../service/productApi';
import styled from 'styled-components';
import { mobile } from "../responsive";
import OrderItem from './OrderItem';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { Link } from 'react-router-dom';
import { userRequest } from '../requestMethods';

const ProductDetail = styled.div`
flex:2;
display: flex;
`
const Image = styled.img`
width: 200px;
`
const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`
const ProductName = styled.span`
font-size: 20px;
`

const ProductId = styled.span``

const ProductColor = styled.div`
width: 20px;
height: 20px;
border-radius:50%;
background-color: ${props => props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
flex:1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`
const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({ marginBottom: "20px" })}
`
const Icon = styled.div`
margin-top: 90px;
margin-right: 27px;
height: 20px;


&:hover{
    color:red;
    cursor: pointer;
}
`
const TopButton = styled.button`
padding: 10px;
font-weight: 600;
width: 10%;
margin-left: 1000px;
${mobile({margin:"10px",fontWeight: "600",width: "90%"})}

cursor: pointer;
/* margin-left: 150px;*/
margin-bottom: 10px; 
margin-top: 15px;
`
const Dm = styled.div`
/* display: flex; */
/* align-items: center; */
font-family: 'Pacifico', cursive;
margin-left: 10px;
font-size: 30px;
margin-top: 50px;
${mobile({marginTop:"25px"})}
`

const Det = styled.span`
margin-left: 50px;
`


function Orders() {

    useEffect(() => {
        getOrderList();
    }, []);

    const [list, setList] = useState();

    const getOrderList = async () => {
        const id=JSON.parse(localStorage.getItem("user"))._id;
        const user=await userRequest.get(`/users/find/${id}`)
        const data = await getAllOrder(user.data.username);
        if (data) {
            setList(data);
        }
    }

    return (
        <>
            <Navbar />
            <Announcement />
            <Dm>
                <Det>My Orders</Det>
                <Link to="/"><TopButton>Continue Shopping</TopButton></Link>
            </Dm>
            
            {
                list?.map((item) => (
                    <OrderItem product={item} />
                ))
            }
        </>
    )
}

export default Orders;
