import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { addProductApi } from '../service/productApi';
import { useLocation, useNavigate } from 'react-router';
import { publicRequest } from '../requestMethods';
import { useDispatch } from 'react-redux';
//import whatsappicon from '../whatsappicon.png';
import walogo from './walogo.png'
import { mobile } from "../responsive";

const Info = styled.div`
  width: 100%;
  height:100%
  margin:1px;
  position: absolute;
  bottom: 0;
  left: 0;
  ${'' /* background-color: rgba(0,0,0,0.5); */}
  ${'' /* background: linear-gradient(to right, #3d72b4, #525252); */}
  background: linear-gradient(to bottom, #000000, #808080);


  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  ${mobile({ paddingTop: "5px" })}
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  padding-bottom: 90px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  ${mobile({ height: "120px",minWidth:"140px",paddingBottom: "70px" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
 
  margin: 5px; /* Adjust as needed */

`;

const Icon = styled.div`
  width: 40px;
  height: 35px;
  ${'' /* border-radius: 20%; */}
  ${'' /* background-color: white; */}
  ${'' /* background: linear-gradient(to right, #f6d365, #fda085); */}
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
 ${mobile({ width: "30px",height: "30px" })}
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Icons = styled.span`
  width: 50px;
  height: 30px;
  
  font-weight: 600;
  border-radius: 10%;
  ${'' /* background-color: white; */}
  text-decoration: none;
  ${'' /* background: linear-gradient(45deg, #009688, #ffeb3b); */}
  background: linear-gradient(to left,transparent, #f9ca24, #f0932b);

  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* transition: all 0.5s ease; */}
  cursor: pointer;
 ${mobile({ width: "50px",height: "30px" })}
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Button = styled.button`
  position: relative; /* Required for positioning the pseudo-element */
  width: 50px;
  font-weight: 900;
  height: 40px;
  color: white;
  font-size: 50px
  border-radius: 5%;
  background-color: rgba(0, 128, 0, 0.3);
  ${'' /* background: linear-gradient(to left, transparent, white); */}
  cursor: pointer;
  ${mobile({ width: "45px", height: "35px" })}

  &:hover::after {
    content: "Add to Cart"; /* Displayed text */
    position: absolute; /* Position relative to the button */
    top: -30px; /* Move the text above the button */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Center horizontally */
    
    padding: 5px 10px; /* Padding for spacing */
    border-radius: 5%; /* Rounded corners */
    font-size: 50px; /* Text size */
    font-weight: 900; /* Bold text */
    /*box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);  Box shadow for depth */
    z-index: 1; /* Ensure the text is above other content */
  }

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;


const Title = styled.span`
  color: white;
  font-size: 20px;
  fontWeight:15px;
  margin-left:2px;
  ${mobile({ fontSize:"15px" })}
  
`;

const Price = styled.span`
  color: white;
 
  margin-right:2px;
  font-size: 20px;
  ${mobile({ fontSize:"13px" })}
`;

const Subtotal = styled.div`
margin:5px;
display: flex;
  justify-content: space-between;
  width: 90%;

`


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
      window.location.href = '/login';
    } else {
      try {
        const response = await addProductApi({
          userId: userData._id,
          productId: item._id,
          size,
          pricePerItem: item.price,
          quantity,
        });

        if (response) {
          alert('Item added to cart!');
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  return (
    <Container>
      
        <Image src={item.img} />
      
      <Info>
        <Subtotal>
        <Title>{item.title}</Title>
        <Price>₹{item.price}</Price>
        </Subtotal>
        <ButtonContainer>
          <Icon>

          <a href={`https://wa.me/918544169503?text=Check%20out%20this%20product:%0AImage:%20${encodeURIComponent(item.img)}%0APrice:%20${encodeURIComponent(item.price)}%0ATitle:%20${encodeURIComponent(item.title)}`}>
        
          
          
          <img src={walogo} class="logo" style={{ height: '50px', width: '80px', display: 'block' }}/>
          
        
      </a>


            {/* <Button onClick={handleAddToCart}>
              <ShoppingCartOutlined />
            </Button> */}
          </Icon>
          <Icons>
            <Link to={`/product/${item._id}`} style={{ textDecoration: 'none',color:'Black' ,fontWeight: '800px'}}>
              BUY 
            </Link>
          </Icons>
        </ButtonContainer>
      </Info>
    </Container>
  );
};

export default Product;

