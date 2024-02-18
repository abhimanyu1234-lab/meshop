import React from 'react';
import styled from 'styled-components';

const Container=styled.div`
height: 30px;
${'' /* background-color: teal; */}
background: linear-gradient(45deg, #4caf50, #2196f3);
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 500;
`

function Announcement() {
  return (
    <Container>
        {/* Super Deal! Free Shipping on Orders over ₹ 150 */}
        Super Deal! Till 31 Dec..
    </Container>
  )
}

export default Announcement;
