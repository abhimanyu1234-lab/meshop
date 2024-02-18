import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import React from 'react'

const SummaryBox = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 50vh;
`
const SummaryTitle = styled.h1`
font-weight: 200;
`
const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props => props.type === "total" && "500"};
font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
cursor: pointer;
`

const KEY = process.env.REACT_APP_STRIPE;

const Summary = ({ totalPrice, productList,user }) => {

    // console.log(totalPrice, "tot7alprofe")
    

    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    };

    const [productItems, setProductItems] = useState();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: (totalPrice * 100) / 81.73,
                    });
                if (res) {
                    for (let i = 0; i < productList?.length; i++) {
                        try {
                            await publicRequest.post("/orders", {

                                // userId: productList[i].userId,
                                userId:user,
                                products: [
                                    {
                                        productId: productList[i].productId,
                                    },
                                    {
                                        quantity: productList[i].quantity,
                                    }],
                                amount: productList[i].pricePerItem*productList[i].quantity,
                                status: "Success"
                            })
                        } catch (e) {
                            console.log("Error while ordering")
                        }

                    }

                    history("/success");
                }
            } catch (e) {
                console.log(e);
            }

        };
        stripeToken && makeRequest();
    }, [stripeToken, totalPrice, history, productList, user]);
    // [stripeToken, totalPrice, history]);

    return (
        <SummaryBox>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
                <SummaryItemText>SubTotal</SummaryItemText>
                <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>₹ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>- ₹ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
                <SummaryItemText >Total</SummaryItemText>
                <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
                name="AY"
                img="https://avatars.githubusercontent.com/u/1486366>v=4"
                billingAddress
                shippingAddress
                description={`Your total is $ ₹{ totalPrice}`}
                amount={(totalPrice * 100) / 81.73}
                token={onToken}
                stripeKey={KEY}
            >
                <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
        </SummaryBox>

    )
}

export default Summary;