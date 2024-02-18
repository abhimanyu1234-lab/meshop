import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';
import { publicRequest } from '../requestMethods';
import { getProduct } from '../service/productApi';
import { formatDistanceToNow } from 'date-fns';

const ProductDetail = styled.div`
flex:2;
display: flex;
`
const Image = styled.img`
width: 200px;
${mobile({ width: "100px",height:"100px" })}
`
const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
${mobile({ padding: "10px" })}
`
const ProductName = styled.span`
font-size: 20px;
${mobile({ fontSize:"10px"  })}
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
${mobile({ marginBottom: "20px",fontSize: "15px",fontWeight:"500" })}
`
const Hr = styled.hr`
background-color: #eee;
border: none;
height: 1px;
`



function OrderItem({ product }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const result = await getProduct(product?.products[0]?.productId);
        if (result) {
            setData(result);
        }
    }

    const TimeAgo = ({ timestamp }) => {
        const timeAgo = formatDistanceToNow(new Date(timestamp));
        return <span>{timeAgo} ago</span>;
    }

    //   const date=product.createdAt.toLocaleDateString("en-us",{ weekday: 'long' })

    //   const getData= async()=>{
    //     try{
    //         const take=await publicRequest.get(`products/find/${product?.products[0]?.productId}`);
    //         if(take){
    //             setData(take);
    //         }
    //     }catch(e){
    //         console.log(e);
    //     }
    //   }

    return (
        <>

            <div style={{ display: "flex" }}>
                <ProductDetail >
                    <Image src={data?.img} />
                    <Details>
                        <ProductName><b>Product :</b> {data?.title}</ProductName>
                        <ProductName><b>Product ID :</b> {product?.products[0]?.productId}</ProductName>
                        <ProductName><b>Price Per Item :</b> ₹ {product?.amount}</ProductName>
                        <ProductColor color={data?.color} />
                        {/* <ProductSize><b>Size :</b> {data?.size}</ProductSize> */}
                        <ProductName><b>Ordered At :</b> <TimeAgo timestamp={new Date(product.createdAt)} /></ProductName>

                    </Details>
                </ProductDetail>
                <PriceDetail style={{ display: "flex" }}>
                    <ProductAmountContainer>
                        <ProductName><b>Quantity :</b> {product?.products[1]?.quantity}</ProductName>
                    </ProductAmountContainer>
                    <ProductPrice>₹ {product?.amount * product?.products[1]?.quantity}   </ProductPrice>
                </PriceDetail>
            </div >
            <Hr />
        </>
    )
}

export default OrderItem;
