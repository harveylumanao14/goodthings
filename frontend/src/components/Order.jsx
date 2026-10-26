import { useState } from "react";

export default function Order({ cartItems = [], onPlaceOrder }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        voucher: "",
    });
    const [message, setMessage] = useState("");

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!cartItems.length) {
            setMessage("Add at least one item to your cart before placing an order.");
            return;
        }

        if (!formData.name || !formData.email || !formData.address) {
            setMessage("Please fill in your name, email, and address.");
            return;
        }

        const placed = onPlaceOrder({
            customer: formData,
            total,
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        });

        if (placed) {
            setFormData({ name: "", email: "", address: "", voucher: "" });
            setMessage("Order placed successfully. Thanks for shopping with us!");
        }
    }

    return (
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Place order</h2>

            <div className="mt-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                    <span>Items</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-lg font-semibold text-slate-900">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Full name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Voucher
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Voucher (1A2-XXX)"
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Delivery address
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Street, city, ZIP code"
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                    />
                </div>





                <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                    Confirm order
                </button>
            </form>

            {message && (
                <p className="mt-4 text-sm font-medium text-emerald-700">{message}</p>
            )}
        </section>
    );
}
