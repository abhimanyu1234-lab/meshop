import styled from 'styled-components';
import React from 'react';
import { mobile } from "../responsive"
import {Link} from "react-router-dom";

const Container = styled.div`
flex: 1;
margin: 3px;
height: 70vh;
position: relative;
${mobile({ height: "30vh" })}
`
const Image = styled.img`
width:100%;
height: 100%;
object-fit: cover;
${mobile({ height: "30vh" })}
`
const Info = styled.div`
position: absolute;
top:0;
left:0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

${mobile({ position: "absolute"
,top:"0",
left:"0",
width: "100%",
height: "15vh",
display: "flex",
flexDirection: "column"
,alignItems: "center",
justifyContent: "center" })}
`
const Title = styled.h1`
color: white;
margin-bottom: 20px;
${mobile({ fontWeight:"100",color: "White" })}
`
const Button = styled.button`
border: none;
padding: 10px;
background-color: white;
color: gray;
cursor: pointer;
font-weight: 600;
`

const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
                <Image src={item.img} />
                <Info>
                    <Title>{item.title}</Title>
                    <Button>Shop Now</Button>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem;
