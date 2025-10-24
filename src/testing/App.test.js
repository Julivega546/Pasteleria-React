import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { productList } from "../components/organisms/Product";
import Product from "../components/organisms/Product";

test("renderiza correctamente la aplicación", () => {
  localStorage.setItem("isLoggedIn", "true");
  render(<App />);
  const link = screen.getByText(/inicio/i);
  expect(link).toBeInTheDocument();
});

test("renderiza correctamente la lista de productos", () => {
  render(
    <>
      {productList.map((product) => (
        <Product key={product.code} {...product} />
      ))}
    </>
  );

  productList.forEach((product) => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });
});

test("añade productos al carrito correctamente", () => {
  localStorage.clear();

  const product = productList[0];
  render(<Product {...product} />);

  const addButton = screen.getByText("Añadir al carro");
  fireEvent.click(addButton);

  const stored = JSON.parse(localStorage.getItem("products"));
  expect(stored).toHaveLength(1);
  expect(stored[0].name).toBe(product.name);
});
