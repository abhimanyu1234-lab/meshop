import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { addProductApi } from '../service/productApi'
import { useLocation, useNavigate } from 'react-router'
import { publicRequest } from '../requestMethods'
// import {addProduct} from "../redux/cartRedux";
import { useDispatch } from 'react-redux';
import { mobile } from "../responsive";
 //import { addProductApi } from '../service/productApi'

const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top:0;
left:0;
background-color: rgba(0,0,0,0.2);
z-index: 3;
display: flex;
flex-direction: column;
align-items:center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;
`
const Subtotal = styled.div`
width: 40px;
height: 20px;
margin-top  : 80px;
border-radius: 10%;
background-color: green;
${'' /* align-items: center; */}
display: flex;
text-align:center;
padding:1px 20px;


`

const Container = styled.div`
flex:1;
margin: 5px;
min-width:280px;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f5fbfd;
position: relative;
${mobile({ height: "200px" })}

&:hover ${Info}{
    opacity: 1;
}
`

const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-color: white;
position: absolute;
`
const Image = styled.img`
width: 100%;
height: 100%;
z-index: 2;
object-fit: cover;
`

const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition: all 0.5s ease;

&:hover{
    background-color: #e9f5f5;
    transform:scale(1.1);
}
`
const Button=styled.button`
${'' /* padding: 15px; */}
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
cursor: pointer;
${'' /* border: 2px solid teal;
background-color: white; */}
${'' /* cursor: pointer;
font-weight: 500;` */}`

const Product = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    setQuantity((prevQuantity) => (type === 'dec' && prevQuantity > 1 ? prevQuantity - 1 : prevQuantity + 1));
  };

  const handleAddToCart = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      // Redirect to login if user is not logged in
      // You may want to handle this more gracefully, perhaps with a modal
      window.location.href = '/login';
    } else {
      try {
        // Add product to cart API call
        const response = await addProductApi({
          userId: userData._id,
          productId: item._id,
          size,
          pricePerItem: item.price,
          quantity,
        });

        if (response) {
          // Update the cart in Redux store
          //dispatch(addToCart({ ...item, quantity, size }));
          alert('Item added to cart!');
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };
// const Product = ({ item }) => {
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
            <total>
                <Icon>
                    {/* <Link to="/cart"> */}
                    <Button onClick={handleAddToCart}>
             <ShoppingCartOutlined />
           </Button>
                        
                    {/* </Link> */}
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
            </total>    
            <Subtotal>
            ₨-{item.price}
            </Subtotal>
            </Info>
        </Container>
    )
}
export default Product;


