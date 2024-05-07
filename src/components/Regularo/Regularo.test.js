import { render, screen } from "@testing-library/react";
import React from "react";
import Regularo from "./Regularo";

test("render learn react link", () => {
  render(<Regularo />);
  const linkElement = screen.getByText(/Hello world/i);
  expect(linkElement).toBeInTheDocument();
});

// describe("App tests", () => {
//   it("should contains the heading 1", () => {
//     render(<Regularo />);
//     const heading = screen.getByText(/Hello world! I am using React/i);
//     expect(heading).toBeInTheDocument();
//   });
// });
