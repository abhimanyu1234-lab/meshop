
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';
import axios from "axios";
import { mobile } from "../responsive";

const Container = styled.div`
border-radius: 10px; /* Add border-radius for rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8); /* Horizontal offset, vertical offset, blur radius, and color */
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;


const ProductItem = styled.div`
  
  ${'' /* min-width:280px;
  max-width: 300px; */}
${'' /* height: 350px;

flex:1;
margin: 5px;
min-width:280px;
max-width: 300px;

display: flex;

justify-content: space-between;

background-color: #f5fbfd;
position: relative; */}


  ${'' /* display: flex;
  border: 1px solid #ccc;
  margin: 10px;
  transition: opacity 0.5s ease-in-out; */}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  &:hover {
    border: none;
  }
  ${mobile({ width: "50px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Center content horizontally */
  ${'' /* justify-content: center; */}
  border: 1px solid #3498db; /* Add border */
  border-radius: 10px; /* Add rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add shadow effect */
  padding: 10px; /* Increased padding for better spacing */
  margin:0px 0px;
  margin-right: 1100px;
`;

const TopButton = styled.button`
  padding: 10px 10px;
  font-weight: 600;
  cursor: pointer;
  height: 30px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

// const Products = ({ cat, filters, sort }) => {
//   const [products, setProducts] = useState(popularProducts);
//   const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     getProducts();
//   }, [cat]);

//   const handleChange = (e) => {
//     setSearchText(e.target.value);
//     if (e.target.value === "") {
//       getProducts();
//     }
//   };

//   const getProducts = async () => {
//     try {
//       const res = await axios.get(
//         cat
//           ? `https://shpme12.onrender.com/api/products?category=${cat}` : "https://shpme12.onrender.com/api/products"
//       );
//       console.log(res);
//       setProducts(res.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     cat &&
//       setProducts(
//         products.filter((item) =>
//           Object.entries(filters).every(([key, value]) =>
//             item[key].includes(value)
//           )
//         )
//       );
//   }, [products, cat, filters]);

//   useEffect(() => {
//     if (sort === "newest") {
//       setProducts((prev) =>
//         [...prev].sort((a, b) => a.createdAt - b.createdAt)
//       );
//     } else if (sort === "asc") {
//       setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
//     } else {
//       setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
//     }
//   }, [sort]);

// //   const handleSearch=()=>{
// //     let arr=[];
// //     console.log(products)
// //     for(let i=0;i<products?.length;i++){
// //       if(products[i].title===searchText){
// //         arr.push(products[i]);
// //       }
// //     }
// //     // console.log("funs is caleeed")
// //     setProducts(arr);
// //     console.log("arr is ",arr);
// //   }


// //   console.log(filteredProducts);

//   const handleSearch = () => {
//     const lowercaseSearchText = searchText.toLowerCase();

//     const filteredProducts = products.filter((product) =>
//       product.title.toLowerCase().includes(lowercaseSearchText)
//     );

//     setProducts(filteredProducts);
//   };

//   return (
//     <>
//       <Left>
//         <SearchContainer>
//           <Input placeholder="Search" onChange={handleChange} />
//         </SearchContainer>
//         <TopButton onClick={handleSearch}>Search</TopButton>
//       </Left>

//       <Container>
//         {products.slice(0, 20).map((item) => (
//           <Product item={item} key={item.id} cat={cat} />
//         ))}
//       </Container>
//     </>
//   );
// };

// export default Products;


//abhi

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchProducts(); // Initial fetch when component mounts
  }, [cat]);

  useEffect(() => {
    const applyFilters = () => {
      if (cat && Object.keys(filters).length > 0) {
        setProducts((prev) =>
          prev.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        );
      }
    };

    applyFilters();
  }, [cat, filters]);

  useEffect(() => {
    const applySorting = () => {
      if (sort === 'newest') {
        setProducts((prev) =>
          [...prev].sort((a, b) => a.createdAt - b.createdAt)
        );
      } else if (sort === 'asc') {
        setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
      } else {
        setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
      }
    };

    applySorting();
  }, [sort]);

  const handleChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    // Automatically reset product list when search text is empty
    if (newSearchText === '') {
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        cat
          ? `https://shpme12.onrender.com/api/products?category=${cat}`
          : 'https://shpme12.onrender.com/api/products'
      );
      setProducts(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //https://shpme12.onrender.com https://shpme12.onrender.com/api/products'

  const handleSearch = () => {
    const lowercaseSearchText = searchText.toLowerCase();

    // If search text is empty, reset the product list
    if (lowercaseSearchText === '') {
      fetchProducts();
    } else {
      // Filter products based on the search text
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(lowercaseSearchText)
      );

      setProducts(filteredProducts);
    }
  };

  return (
    <>
      <Left>
        <SearchContainer>
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Search on "Enter"
          />
        </SearchContainer>
        <TopButton onClick={handleSearch}>Search</TopButton>
      </Left>

      <Container>
      
        {products.slice(0, 20).map((item) => (
          <Product item={item} key={item.id} cat={cat} />
        ))}
        
      </Container>
    </>
  );
};

export default Products;