import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reduxStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { orderProduct } from "@/api/order/order.api";

export default function OrderPage() {
  const cart = useSelector((state: RootState) => state.cart);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      location: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      location: Yup.string().required("Location is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      const orderDTO = {
        ...values,
        totalPrice: cart.totalPrice,
        orderItems: cart.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          sizeId: item.size.sizeId,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      try {
        const res = await orderProduct(orderDTO);
        console.log(res.data);
        esewaCall(res.data.data);
        // window.open(`${res.data.data.payment_url}`);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const esewaCall = (formData: any) => {
    console.log(formData);
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in formData) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

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
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="userName"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className="text-red-600">{formik.errors.userName}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your Location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-600">{formik.errors.location}</div>
            ) : null}
          </div>
          {/* <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your City"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-600">{formik.errors.city}</div>
            ) : null}
          </div> */}
          {/* <div>
            <label className="block text-gray-700">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your Postal Code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postalCode}
            />
            {formik.touched.postalCode && formik.errors.postalCode ? (
              <div className="text-red-600">{formik.errors.postalCode}</div>
            ) : null}
          </div> */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="Your Phone Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-600">{formik.errors.phoneNumber}</div>
            ) : null}
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
