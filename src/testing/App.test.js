import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { productList } from "../components/organisms/Product";
import Product from "../components/organisms/Product";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Cart from "../components/pages/Cart";
import Profile from "../components/pages/Profile";
import About from "../components/pages/About";
import First from "../components/organisms/First";

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

test("muestra los campos de inicio de sesión", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
});

test("permite escribir en los campos de login", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput.value).toBe("test@example.com");
});

test("muestra el formulario de registro", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  expect(screen.getByText(/registrarme/i)).toBeInTheDocument();
});

test("muestra nombre y precio del producto", () => {
  const product = { name: "Pastel de Chocolate", description: "Rico pastel", price: 12000 };
  render(<Product {...product} />);
  expect(screen.getByText(/pastel de chocolate/i)).toBeInTheDocument();
});

test("muestra el título del carrito", () => {
  render(<Cart />);
  expect(screen.getAllByText(/carrito/i).length).toBeGreaterThan(0);
});

test("muestra el perfil del usuario", () => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", "test@example.com");
  localStorage.setItem("users", JSON.stringify([{ email: "test@example.com", password: "123456" }]));
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );
  expect(screen.getByText(/perfil del usuario/i)).toBeInTheDocument();
});

test("muestra información sobre la pastelería", () => {
  render(<About />);
  expect(screen.getByText(/about/i)).toBeInTheDocument();
});

test("muestra los enlaces de navegación", () => {
  render(
    <BrowserRouter>
      <First />
    </BrowserRouter>
  );
  expect(screen.getAllByText(/inicio/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/nosotros/i)).toBeInTheDocument();
  expect(screen.getByText(/productos/i)).toBeInTheDocument();
});
