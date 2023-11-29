import React from "react";

export function handleOutsideClick(ref, callback) {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  window.addEventListener("click", handleClick);

  return () => {
    window.removeEventListener("click", handleClick);
  };
}
