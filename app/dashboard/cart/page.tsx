"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNav from "@/app/components/DashboardNav";

export default function CartPage() {
  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  function loadCart() {
    const saved = localStorage.getItem("cart");

    if (!saved) {
      setCart([]);
      return;
    }

    setCart(JSON.parse(saved));
  }

  function removeCourse(id: string) {
    const updated = cart.filter((course) => course.id !== id);

    localStorage.setItem("cart", JSON.stringify(updated));

    setCart(updated);
  }

  function clearCart() {
    localStorage.removeItem("cart");
    setCart([]);
  }

  function checkout() {
    if (cart.length === 0) return;

    localStorage.setItem("checkoutCourses", JSON.stringify(cart));

    router.push("/dashboard/payments");
  }

  const total = cart.reduce((sum, course) => sum + Number(course.price), 0);

  return (
    <section className="min-h-screen bg-black text-white">
      <DashboardNav />

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        <p className="text-gray-400 mt-2">Review your selected courses.</p>

        {cart.length === 0 && (
          <div className="mt-10 bg-gray-900 rounded-xl p-8">
            <h2 className="text-xl font-bold">Your cart is empty</h2>

            <button
              onClick={() => router.push("/dashboard/courses")}
              className="mt-6 bg-green-500 text-black px-6 py-3 rounded-lg font-semibold"
            >
              Browse Courses
            </button>
          </div>
        )}

        {cart.length > 0 && (
          <>
            <div className="space-y-6 mt-8">
              {cart.map((course) => (
                <div
                  key={course.id}
                  className="bg-gray-900 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6"
                >
                  <div>
                    <h2 className="text-xl font-bold">{course.title}</h2>

                    <p className="text-gray-400 mt-2">{course.description}</p>

                    <p className="text-green-400 mt-4 text-lg font-bold">
                      ₦{course.price}
                    </p>
                  </div>

                  <button
                    onClick={() => removeCourse(course.id)}
                    className="bg-red-500 px-5 py-3 rounded-lg text-white h-fit"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-xl p-8 mt-10">
              <h2 className="text-2xl font-bold">Total</h2>

              <p className="text-3xl text-green-400 mt-3">
                ₦{total.toLocaleString()}
              </p>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={clearCart}
                  className="bg-red-500 px-6 py-3 rounded-lg"
                >
                  Clear Cart
                </button>

                <button
                  onClick={checkout}
                  className="bg-green-500 text-black px-8 py-3 rounded-lg font-bold"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
