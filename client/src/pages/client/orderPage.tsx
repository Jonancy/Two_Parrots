import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reduxStore";

export default function OrderPage() {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
        <ul>
          {cart.items.map((item) => (
            <li
              key={item.productId}
              className="flex items-center mb-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">Color: {item.color}</p>
                <p className="text-gray-600">Size: {item.size.size}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-800 font-semibold">
                  Price: ${item.price.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="text-right">
          <h3 className="text-xl font-semibold">
            Total: ${cart.totalPrice.toFixed(2)}
          </h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Order Form</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your Address"
            />
          </div>
          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your City"
            />
          </div>
          <div>
            <label className="block text-gray-700">Postal Code</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your Postal Code"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
