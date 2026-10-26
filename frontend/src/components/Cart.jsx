export default function Cart({ cartItems = [], onUpdateQuantity, onRemoveItem }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-stone-300 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Your cart</h2>
        <p className="mt-2 text-sm text-slate-600">
          Your cart is empty. Add a few favorites to begin your order.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Your cart</h2>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
          {cartItems.reduce((total, item) => total + item.quantity, 0)} items
        </span>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-xl border border-stone-200 p-4 sm:flex-row sm:items-center"
          >
            <img
              src={item.image}
              alt={item.imageAlt}
              className="h-20 w-20 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">${item.price} each</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-lg text-slate-700 hover:border-emerald-700 hover:text-emerald-800"
              >
                −
              </button>
              <span className="min-w-6 text-center text-base font-semibold text-slate-900">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-lg text-white hover:bg-emerald-700"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-base font-semibold text-slate-900">
                ${item.price * item.quantity}
              </p>
              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-stone-200 pt-4">
        <div className="flex items-center justify-between text-slate-700">
          <span>Subtotal</span>
          <span className="text-xl font-semibold text-slate-900">${subtotal}</span>
        </div>
      </div>
    </section>
  );
}
