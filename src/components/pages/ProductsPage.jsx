import React from 'react';
import First from '../organisms/First';
import Product, { productList } from '../organisms/Product';

export default function ProductsPage() {
  return (
    <>
      <First />
      <section className="products-page">
        <div className="products-grid">
          {productList.map((p) => (
            <Product
              key={p.code}
              code={p.code}
              image={p.image}
              name={p.name}
              description={p.description}
              price={p.price}
            />
          ))}
        </div>
      </section>
    </>
  );
}
