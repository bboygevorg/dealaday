import React from "react";
import classes from "./quantity.module.scss";

interface Quantity {
  elementId: string;
  elementSubtotal: number;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
}

const Quantity: React.FC<Quantity> = ({
  elementId,
  elementSubtotal,
  increment,
  decrement,
}) => {
  return (
    <>
      <div className={classes.number} onClick={() => decrement(elementId)}>
        <svg
          width="15"
          height="10"
          viewBox="0 0 15 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 0.5H13.1667"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={classes.number}>{elementSubtotal}</div>
      <div className={classes.number} onClick={() => increment(elementId)}>
        <svg
          fill="#6B7280"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="15px"
          viewBox="0 0 45.402 45.402"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

export default Quantity;
