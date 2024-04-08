import React, { useEffect, useRef, useState } from "react";
import classes from "./search.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";

import product_dont_found from "../../../assets/img/product_dont_found.jpg";

interface SearchStyleProp {
  inputbackgroundColor: string;
  stroke: string;
  logoBackgroundColor: string;
  borderInputColor: string;
  logoBorderColor: string;
  color: string;
}

interface ProductSearch {
  _id: string;
  name: string;
  img: string;
  category: string;
  brand: string;
}

const Search: React.FC<SearchStyleProp> = ({
  inputbackgroundColor,
  stroke,
  logoBackgroundColor,
  borderInputColor,
  logoBorderColor,
  color,
}) => {
  const [data, setData] = useState<ProductSearch[]>([]);
  const [filteredData, setFilteredData] = useState<ProductSearch[]>([]);
  const [serachTerm, setSearchTerm] = useState("");
  const [isHovered, setHovered] = useState<boolean>(false);
  const [isSearchBlockOpen, setIsSearchBlockOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://192.168.1.68:5000/product/products"
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const newFiltereData = data.filter(
      (item) =>
        (item.name &&
          item.name.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (item.category &&
          item.category
            .toLowerCase()
            .includes(event.target.value.toLowerCase())) ||
        (item.brand &&
          item.brand.toLowerCase().includes(event.target.value.toLowerCase()))
    );

    setFilteredData(newFiltereData);
  };

  const toggleSearchBlock = () => {
    setIsSearchBlockOpen(!isSearchBlockOpen);

    if (!isSearchBlockOpen && searchRef.current) {
      const inputElement = searchRef.current.querySelector("input");
      if (inputElement) {
        inputElement.focus();
      }
    }
  };

  const clearSearchText = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchBlockOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchBlockOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isSearchBlockOpen]);

  const headerDefault = {
    BackgroundColor: "#111827",
    transition: "0.2s",
  };

  const headerHover = {
    backgroundColor: "#1e75a3",
    transition: "0.2s",
  };

  const logoHeader = isHovered ? headerHover : headerDefault;

  return (
    <>
      <div ref={searchRef}>
        <form className={classes.wrapper_search}>
          <input
            type="text"
            value={serachTerm}
            onChange={handleSearch}
            className={classes.input_search}
            style={{
              backgroundColor: inputbackgroundColor,
              borderColor: borderInputColor,
              color: color,
            }}
            placeholder="Search for products and brands"
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={toggleSearchBlock}
          />

          <div
            className={classes.logo_search}
            style={{
              backgroundColor: logoBackgroundColor,
              borderColor: logoBorderColor,
              ...logoHeader,
            }}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={toggleSearchBlock}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 16.5L11.5 11.5L16.5 16.5ZM13.1667 7.33333C13.1667 8.09938 13.0158 8.85792 12.7226 9.56565C12.4295 10.2734 11.9998 10.9164 11.4581 11.4581C10.9164 11.9998 10.2734 12.4295 9.56565 12.7226C8.85792 13.0158 8.09938 13.1667 7.33333 13.1667C6.56729 13.1667 5.80875 13.0158 5.10101 12.7226C4.39328 12.4295 3.75022 11.9998 3.20854 11.4581C2.66687 10.9164 2.23719 10.2734 1.94404 9.56565C1.65088 8.85792 1.5 8.09938 1.5 7.33333C1.5 5.78624 2.11458 4.30251 3.20854 3.20854C4.30251 2.11458 5.78624 1.5 7.33333 1.5C8.88043 1.5 10.3642 2.11458 11.4581 3.20854C12.5521 4.30251 13.1667 5.78624 13.1667 7.33333Z"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </form>
        {isSearchBlockOpen && serachTerm && (
          <div className={classes.search_block}>
            {filteredData.length === 0 ? (
              <div className={classes.product_dont}>
                <h2>Product Not Found</h2>
                <img src={product_dont_found} alt="" />
              </div>
            ) : (
              filteredData.map((product) => (
                <Link
                  to={`/products/${product._id}`}
                  key={product._id}
                  onClick={() => {
                    setIsSearchBlockOpen(false), clearSearchText();
                  }}
                >
                  <div className={classes.search}>
                    <p>{product.name.slice(0, 35)}</p>
                    <img
                      src={product.img}
                      alt={product.name}
                      style={{ width: 55, height: 65 }}
                    />
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
