import React,{ useEffect, useState } from "react"
import styled from "styled-components"
import { getProduct } from "../service/productApi"
import { Add, DeleteForever, DeleteForeverOutlined, Remove } from "@material-ui/icons"
import { mobile } from '../responsive';
import { publicRequest } from "../requestMethods";
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
${mobile({ padding: "10px ", height:"100px" })}
`
const ProductName = styled.span`
font-size: 20px;
${mobile({ fontSize: "10px" })}
`

const ProductId = styled.span`
${mobile({ display: "none" })}
`

const ProductColor = styled.div`
width: 20px;
height: 20px;
border-radius:50%;
background-color: ${props => props.color};
${mobile({ fontSize: "10px",display: "none" })}
`
const ProductSize = styled.span`
${mobile({ fontSize: "10px" })}`
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
${mobile({ marginBottom: "20px",fontSize: "15px" })}
`



const Icon=styled.div`
margin-top: 90px;
margin-right: 27px;
height: 20px;
${mobile({ marginTop:"80px" })}


&:hover{
    color:red;
    cursor: pointer;
}
`

const ProductCart = ({ product, totalPrice, getUserProductsList }) => {
    const [pro, setPro] = useState();
    const [quantity, setQuantity] = useState(product.quantity);
    useEffect(() => {
        getProductDetails();
    }, [])



    const getProductDetails = async () => {
        const data = await getProduct(product.productId);
        setPro(data)
        //  if(data){
        // setTotalPrice(totalPrice+ data?.price*product?.quantity)
        // totalPrice=totalPrice+ product.quantity*product.pricePerItem 
        // console.log("total price is ",totalPrice);
        //  }
    }

    const deleteProduct = async () => {
        try {
            console.log("enter")
            const res = await publicRequest.delete(`carts/${product.productId}`)
            // console.log(product.productId)
            if (res) {
                alert("An item has been deleted")
                getUserProductsList();
                window.location.reload();

            }
        } catch (e) {
            console.log("no babes")
            console.log(e)
        }
    }
    
    // const [quantity, setQuantity] = useState();

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity-1);
            console.log(quantity)
        } else {
            setQuantity(quantity+1);
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <ProductDetail >
                <Image src={pro?.img} />
                <Details>
                    <ProductName><b>Product :</b> {pro?.title}</ProductName>
                    <ProductId><b>ID :</b> {product.productId}</ProductId>
                    <ProductName><b>Price Per Item :</b> ₹ {pro?.price}</ProductName>
                    <ProductColor color={pro?.color} />
                    <ProductSize><b>Size :</b> {product.size}</ProductSize>
                </Details>
            </ProductDetail>
            <PriceDetail style={{ display: "flex" }}>
                <ProductAmountContainer>
                    <Add onClick={()=> handleQuantity("inc")} style={{cursor:"pointer"}} />
            
                    <ProductName><b>Quantity :</b> {quantity}</ProductName>
                    <Remove onClick={()=> handleQuantity("dec")} style={{cursor:"pointer"}}/>
            
                </ProductAmountContainer>
                <ProductPrice>₹ {pro?.price * product.quantity}   </ProductPrice>

            </PriceDetail>
            <Icon >
                <DeleteForever onClick={deleteProduct} />
            </Icon>

        </div>
    )
}

export default ProductCart;