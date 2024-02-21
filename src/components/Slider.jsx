import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { sliderItems } from '../data';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ width: "100%",height: "20vh" ,position: "relative",overflow: "hidden",marginTop: "10px"})}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  ${mobile({height: "100%", display: "flex" })}
`;

const Slide = styled.div`
  width: 100vw;
  height: 50vh;
  ${'' /* height: 100vh; */}
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  ${mobile({ width: "100vw",height: "20vh" ,alignItems: "center", display:"flex"})}
  
`;

const ImgContainer = styled.div`
  height: 100%;
  ${mobile({ marginLeft: "5px",marginTop:"8px" })}
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ flex:"1", padding: "10px",marginRight:"5px",})}
`;

const Title = styled.h1`
  font-size: 35px;
  ${mobile({ fontSize:"15px",paddingTop:"15px"})}
`;

const Desc = styled.p`
  margin: 50px 0px;
  ${'' /* font-size: 20px; */}
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ fontSize:"8px"})}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000); // Change the interval as needed (3000 milliseconds = 3 seconds)

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : sliderItems.length - 1
      );
    } else {
      setSlideIndex((prevIndex) =>
        prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;

