"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

type MarketplaceItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image_url: string | null;
  download_url: string | null;
  is_featured: boolean;
  created_at: string;
};

const categories = ["All", "Courses", "Labs", "Books", "Tools", "Templates"];

export default function MarketplacePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<MarketplaceItem[]>([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    initializeMarketplace();
  }, []);

  async function initializeMarketplace() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    await loadProducts();
  }

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("marketplace")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Unable to load marketplace.");
      setLoading(false);
      return;
    }

    setProducts((data as MarketplaceItem[]) ?? []);

    setLoading(false);
  }

  const featuredProduct = useMemo(() => {
    return products.find((item) => item.is_featured);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      const keyword = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  function buyProduct(product: MarketplaceItem) {
    try {
      localStorage.setItem("selectedCourse", JSON.stringify(product));

      router.push("/dashboard/payments");
    } catch (error) {
      console.error(error);
      alert("Unable to continue.");
    }
  }

  function openProduct(product: MarketplaceItem) {
    localStorage.setItem("selectedCourse", JSON.stringify(product));

    router.push("/dashboard/payments");
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading marketplace...
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white pt-16 md:pt-24">
      {/* JSX UI COMES IN PART 2 */}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Marketplace</h1>

          <p className="text-gray-400 mt-3 text-lg">
            Courses, Labs, Books, Tools and Cybersecurity Resources.
          </p>
        </div>

        {/* Search */}

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search marketplace..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[450px] bg-gray-900 border border-gray-700 rounded-xl px-5 py-3 outline-none focus:border-green-500 transition"
          />
        </div>

        {/* Categories */}

        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full transition font-medium border
        ${
          selectedCategory === category
            ? "bg-green-500 text-black border-green-500"
            : "bg-gray-900 text-white border-gray-700 hover:border-green-500"
        }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Product */}

        {featuredProduct && (
          <div className="mb-12 rounded-2xl border border-green-500 bg-gradient-to-r from-gray-900 to-black p-8">
            <p className="text-green-400 font-semibold uppercase tracking-wider">
              Featured
            </p>

            <h2 className="text-3xl font-bold mt-3">{featuredProduct.title}</h2>

            <p className="text-gray-400 mt-4 max-w-3xl">
              {featuredProduct.description}
            </p>

            <div className="flex flex-wrap items-center justify-between mt-8 gap-6">
              <p className="text-3xl text-green-400 font-bold">
                {formatPrice(featuredProduct.price)}
              </p>

              <button
                onClick={() => buyProduct(featuredProduct)}
                className="bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-lg font-bold transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}

        {/* Products */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
              <h2 className="text-2xl font-bold">No Products Found</h2>

              <p className="text-gray-400 mt-3">
                Try another search or category.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-green-500 transition duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-green-500/20 to-gray-800 flex items-center justify-center">
                  <span className="text-6xl">🛡️</span>
                </div>

                <div className="p-6">
                  <span className="inline-block text-xs uppercase tracking-wider bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                  <h3 className="text-xl font-bold mt-4">{product.title}</h3>

                  <p className="text-gray-400 mt-3 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-8">
                    <p className="text-green-400 font-bold text-2xl">
                      {formatPrice(product.price)}
                    </p>

                    <button
                      onClick={() => buyProduct(product)}
                      className="bg-blue-500 hover:bg-blue-400 text-black px-5 py-2 rounded-lg font-semibold transition"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
