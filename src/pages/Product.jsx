import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../Newsletter'
import { mobile } from '../responsive'
import { useLocation, useNavigate } from 'react-router'
import { publicRequest } from '../requestMethods'
import {addProduct} from "../redux/cartRedux";
import { useDispatch } from 'react-redux'
import { addProductApi } from '../service/productApi'

// import { Navigate } from 'react-router'

const Container = styled.div`

`
const Wrapper = styled.div`
padding: 50px;

display: flex;
${mobile({padding:"10px",flexDirection:"column"})}
`
const ImgContainer = styled.div`
flex: 1;
`

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
${mobile({height:"40vh"})}
`

const InfoContainer = styled.div`
flex: 1;
padding: 0px 50px;
${'' /* margin-top:1px; */}
${mobile({padding:"0px 25px"})}
`

const Title = styled.h1`
font-weight: 200;
`

const Desc = styled.p`
margin: 20px 0px;
${'' /* background: linear-gradient(to right, #56ab2f, #a8e063); */}
color: linear-gradient(to right, #06beb6, #48b1bf);

${mobile({margin:"10px 0px"})}
font-size: 20px;
`

const Price = styled.span`
font-weight: 200;
font-size: 25px;
`
const FilterContainer=styled.div`
width:50%;
margin: 30px 0px;
display: flex;
justify-content: space-between;
${mobile({width:"100%",margin: "10px 0px" })}
`

const Filter=styled.div`
display: flex;
align-items: center;
`
const FilterTitle=styled.span`
font-size: 20px;
font-weight: 200;
`
const FilterColor=styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props=>props.color};
margin: 0px 5px;
cursor: pointer;
`
const FilterSize=styled.select`
margin-left: 10px;
padding: 5px;
`

const FilterSizeOption=styled.option``

const AddContainer=styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;
${mobile({width:"100%"})}
`
const AmountContainer=styled.div`
display: flex;
align-items: center;
font-weight: 700;
`
const Amount=styled.span`
width: 30px;
height: 30px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
`
const Button=styled.button`
padding: 15px;
border: 2px solid ;
background: linear-gradient(to right, #f6d365, #fda085);


cursor: pointer;
font-weight: 500;

&:hover{
    background-color: #f8f4f4;
}
`

const Product = () => {
    const location=useLocation();
    const id=location.pathname.split("/")[2];
    const [product,setProduct]=useState({});
    const [quantity,setQuantity]=useState(1);
    const [color,setColor]=useState("");
    const [size,setSize]=useState("");
    const dispatch=useDispatch();
      const navigate= useNavigate()

    useEffect(()=>{
        const getProduct=async()=>{
            try{
                const res=await publicRequest.get("/products/find/"+id);
                console.log(res);
                setProduct(res.data);
            }catch(e){
                
            }
        }
        getProduct();
    },[id]);
    

    const handleQuantity=(type)=>{
          if(type==="dec"){
            quantity>1 && setQuantity(quantity-1);
          }else{
            setQuantity(quantity+1);
          }
    }


    const handleClick= async()=>{
        // update cart
        const data=localStorage.getItem("user");
        console.log("data ,iss ", data)
        if(!data){
            navigate("/login")
        }
        else{

            const data=await addProductApi({
                userId:JSON.parse(localStorage.getItem("user"))._id,
                productId:id,
                size:size,
                pricePerItem:product.price,
                quantity:quantity
            })
            if(data){
                navigate('/cart');
                
            }
            alert("An item has been added to Cart");
            
            // dispatch(addProduct({...product,quantity,color,size}));
        }
    }
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>₹ {product.price}</Price>
                    <FilterContainer>

                        {/* <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c)=>(
                                <FilterColor color={c} key={c} onclick={()=>setColor(c)}/>
                            ))}    
                        </Filter> */}
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e)=>setSize(e.target.value)}>
                            {product.size?.map((s)=>(
                                <FilterSizeOption key={s}>{s}</FilterSizeOption>
                            ))}    
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=> handleQuantity("dec")} style={{cursor:"pointer"}} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=> handleQuantity("inc")} style={{cursor:"pointer"}}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>Add To Cart</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product;

