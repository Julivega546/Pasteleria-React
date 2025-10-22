import React from 'react';

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: "Brownie casero fácil 🍫",
      video: "https://www.youtube.com/embed/KlL5UT_Gbcw",
      description: "Aprende a preparar un brownie de chocolate intenso, con textura húmeda por dentro y crocante por fuera."
    },
    {
      id: 2,
      title: "Cheesecake sin horno con frutillas 🍓",
      video: "https://www.youtube.com/embed/7ep34nmT-zw",
      description: "Un cheesecake cremoso y suave, ideal para quienes buscan una receta sin horno y deliciosa."
    },
    {
      id: 3,
      title: "Galletas de avena y plátano saludables 🍪",
      video: "https://www.youtube.com/embed/8aulAPMCjbc",
      description: "Fáciles, nutritivas y sin azúcar refinada. Perfectas para el desayuno o la merienda."
    }
  ];

  return (
    <section id="blogs" className="blogs">
      <h2>Recetas en Video 🎥</h2>
      <div className="blogs-grid">
        {blogs.map(blog => (
          <article key={blog.id} className="blog-card">
            <iframe
              width="100%"
              height="200"
              src={blog.video}
              title={blog.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
