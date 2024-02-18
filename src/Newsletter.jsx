// import {Send} from '@material-ui/icons';
// import styled from 'styled-components';
// import React from 'react';
// import { mobile } from './responsive';

// const Container=styled.div`
// height: 60vh;
// background-color: #fcf5f5;
// color: black; /* Add a specific color for text */
// display: flex;
// align-items: center;
// justify-content: center;
// flex-direction: column;
// `
// const Title=styled.h1`
// font-size:70px;
// margin-bottom: 20px;

// `
// const Desc=styled.div`
// font-size: 24px;
// font-weight: 300;
// margin-bottom: 20px;
// ${mobile({textAlign:"center"})}
// `
// const InputContainer=styled.div`
// width: 50%;
// height: 40px;
// background-color: white;
// display: flex;
// justify-content: space-between;
// border: 1px solid lightgray;
// ${mobile({width:"80%"})}
// `
// const Input=styled.input`
// border: none;
// flex: 8;
// padding-left: 20px;
// `
// const Button=styled.button`
// flex: 1;
// border: none;
// background-color: teal;
// color: white;
// `

// const Newsletter = () => {
//   return (
//     <Container>
//       <Title>Newsletter</Title>
//       <Desc>Get Timely Updates From Your Favorite Products.</Desc>
//       <InputContainer>
//         <Input placeholder="Your Email"/>
//         <Button>
//             <Send/>
//         </Button>
//       </InputContainer>
//     </Container>
//   )
// }

// export default Newsletter;


import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import React, { useState } from 'react';
import { mobile } from './responsive';

const Container = styled.div`
border-radius: 10px; /* Add border-radius for rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8); /* Horizontal offset, vertical offset, blur radius, and color */
  height: 60vh;
  ${'' /* background-color: #fcf5f5; */}
  ${'' /* background: linear-gradient(45deg, #4caf50, #2196f3); */}
  background: linear-gradient(45deg, #B3E0FF, #FFFFFF);



  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: black;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    // Simulate asynchronous subscription request (you can replace this with an API call)
    if (email) {
      setSubscribed(true);
      setError("");
    } else {
      setError("Please enter a valid email address.");
    }
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get Timely Updates From Your Favorite Products.</Desc>
      <InputContainer>
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSubscribe}>
          <Send />
        </Button>
      </InputContainer>
      {subscribed && <SuccessMessage>Successfully subscribed!</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default Newsletter;
