import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { publicRequest } from '../requestMethods';
import {useNavigate} from "react-router";
// import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)
), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: white;
${mobile({ width: "75%" })}
`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`

const Form = styled.form`
display: flex;
flex-wrap: wrap;

`

const Input = styled.input`
flex:1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`
const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`
const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`


const Register = () => {

  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (username === "" || email === "" || password === "" || fname==="" || lname==="") {
      alert("Plz fill All Fields")
    }
    else if(phone.length<10){
      alert("Phone Number Should be Ten Digit")
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        username: username,
        email: email,
        password: password,
        phone:phone,
        address:address,
        fname:fname,
        lname:lname
      }
      try {
        await publicRequest.post("/auth/register", body, config).then((res) => {
          alert("Registered Successfully")
          navigate("/login");
          
        }).catch((e) => {
          alert(e);
        })
      } catch (e) {
        alert("Some error occurs");
      }
    }
  }



  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input name="fname" value={fname} placeholder="First Name" onChange={(e) => { setFname(e.target.value) }} />
          <Input name="lname" value={lname} placeholder="Last Name" onChange={(e) => { setLname(e.target.value) }}/>
          <Input name="username" value={username} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
          <Input name="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          <Input name="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
          <Input name="cpassword" placeholder="Confirm Password" />
          <Input name="Phone"   value={phone} placeholder='Phone Number' onChange={(e)=>{setPhone(e.target.value)}} />
          <Input name="address" value={address} placeholder='Address' onChange={(e)=>{setAddress(e.target.value)}} />
          <Agreement>
            By Creating an Account, I Consent to the Processing of my Personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit} type='submit'>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register;
