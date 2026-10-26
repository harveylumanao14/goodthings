import { useState } from "react";

export const products = [
  {
    id: "weekender",
    category: "Bags",
    title: "The Weekender",
    description:
      "A roomy, easygoing carryall made for quick getaways and everyday adventures.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Olive green backpack resting outdoors",
    price: 129,
  },
  {
    id: "ceramic-mug",
    category: "Home",
    title: "Sunday Ceramic Mug",
    description:
      "Hand-finished stoneware with a comfortable shape for slow mornings and long chats.",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Ceramic mug on a warm-toned table",
    price: 34,
  },
  {
    id: "headphones",
    category: "Tech",
    title: "Studio Headphones",
    description:
      "Rich, balanced sound and soft over-ear cushions for your favorite listening sessions.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Over-ear headphones",
    price: 199,
  },
  {
    id: "daily-watch",
    category: "Accessories",
    title: "The Daily Watch",
    description:
      "A clean, timeless dial and a versatile strap that looks right at home anywhere.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Minimal wristwatch photographed on a light background",
    price: 149,
  },
  {
    id: "film-camera",
    category: "Tech",
    title: "Pocket Film Camera",
    description:
      "Capture little moments with a compact camera made to bring the fun back to photos.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Vintage camera ready for a day out",
    price: 239,
  },
  {
    id: "running-shoes",
    category: "Lifestyle",
    title: "Everyday Runners",
    description:
      "Lightweight comfort and a cushioned step, whether you're out for a run or a stroll.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Bright red running shoe",
    price: 118,
  },
];

export default function Home({ onAddToCart }) {
  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(products.map((product) => [product.id, 0])),
  );

  const selectedCount = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  function updateQuantity(productId, change) {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(0, current[productId] + change),
    }));
  }

  function handleAddToCart(product) {
    const quantity = quantities[product.id];

    if (quantity <= 0 || !onAddToCart) {
      return;
    }

    onAddToCart(product, quantity);
    setQuantities((current) => ({ ...current, [product.id]: 0 }));
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
      <section aria-labelledby="collection-title">
        <div className="mb-9 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Thoughtfully picked
            </p>
            <h1
              id="collection-title"
              className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
            >
              Little everyday favorites
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Good-looking, useful things to make your day a little better.
              Choose the quantity you need for each item.
            </p>
          </div>
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm"
            aria-live="polite"
            aria-label={`${selectedCount} items selected`}
          >
            <span className="font-semibold text-slate-900">{selectedCount}</span>
            {selectedCount === 1 ? "item" : "items"} selected
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    {product.category}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                    {product.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                    <span className="text-sm font-medium text-slate-700">
                      ${product.price}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, -1)}
                        disabled={quantities[product.id] === 0}
                        aria-label={`Decrease ${product.title} quantity`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-lg text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-300 disabled:hover:text-slate-700"
                      >
                        <span aria-hidden="true">−</span>
                      </button>
                      <span
                        className="min-w-5 text-center text-base font-semibold tabular-nums text-slate-900"
                        aria-live="polite"
                        aria-label={`${quantities[product.id]} selected`}
                      >
                        {quantities[product.id]}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, 1)}
                        aria-label={`Increase ${product.title} quantity`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-lg text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                      >
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    disabled={quantities[product.id] === 0}
                    className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
