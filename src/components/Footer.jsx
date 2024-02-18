import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
background: linear-gradient(45deg, #009688, #ffeb3b);
border-radius: 10px; /* Add border-radius for rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8); /* Horizontal offset, vertical offset, blur radius, and color */
display: flex;
${mobile({flexDirection:"column"})}
`
const Left = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 20px;
margin-up: 10px;
`

const Logo=styled.h1`
font-family: 'Pacifico', cursive;`

const Desc=styled.p`
margin: 20px 0px;
`
const SocialContainer=styled.div`
display: flex;
`
const SocialIcon=styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
background-color: #${props=>props.color};
display: flex;
align-items: center;
justify-content: center;
margin-right: 20px;
`

const Center = styled.div`
flex: 1;
padding: 20px;
${mobile({display:"none"})}
`
const Title=styled.h3`
margin-bottom: 30px;
`
const List=styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;
`
const ListItem=styled.li`
width: 50%;
margin-bottom: 10px;
`

const Right = styled.div`
flex: 1;
padding: 20px;
${mobile({backgroundColor:"#fff8f8"})}
`
const ContactItem=styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
`
const Payment=styled.img`
width: 50%;

`


const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>SB</Logo>
                <Desc>
                Navigate effortlessly through our app with quick links to essential pages. From the latest arrivals and exclusive deals to customer support and account management, everything you need is just a click away. Our user-friendly interface ensures a smooth and enjoyable shopping journey.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color='E4405F'>
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color='55ACEE'>
                        <Twitter/>
                    </SocialIcon>
                    <SocialIcon color='E60023'>
                        <Pinterest/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Women Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>WishList</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
            <Title>Contact</Title>
            <ContactItem>
               <Room style={{marginRight:"10px"}}/> kaimur , mohania Br
            </ContactItem>
            <ContactItem>
                <Phone style={{marginRight:"10px"}}/>+91 8544169503
            </ContactItem>
            <ContactItem>
              <MailOutline style={{marginRight:"10px"}}/>  abhimanyusingh3887@gmail.com
            </ContactItem>
            <Payment src="http://i.ibb.co/Qfvn4z6/payment.png"/>
            </Right>
        </Container>
    )
}

export default Footer
