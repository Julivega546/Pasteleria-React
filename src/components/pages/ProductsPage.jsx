import React from 'react';
import First from '../organisms/First';
import Product from '../organisms/Product';

export default function ProductsPage() {
  return (
    <>
      <First />
      <section className="products-page">
        <Product />
      </section>
    </>
  );
}
