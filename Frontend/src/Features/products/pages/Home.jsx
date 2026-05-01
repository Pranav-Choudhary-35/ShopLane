import { useProduct } from "../hook/useProduct"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Home = () => {
  
  const products = useSelector((state) => state.product.products);
  const { fetchAllProducts } = useProduct();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError("");

      try {
        await fetchAllProducts();
      } catch (err) {
        console.error("Failed to load products", err);
        setError("Unable to load products right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [fetchAllProducts]);

  const formatPrice = (price) => {
    if (!price?.currency || price?.amount == null) return "Price unavailable";

    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: price.currency,
        maximumFractionDigits: 0,
      }).format(price.amount);
    } catch {
      return `${price.currency} ${price.amount}`;
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen selection:bg-[#C9A96E]/30"
        style={{ backgroundColor: "#fbf9f6", fontFamily: "'Inter', sans-serif" }}
      >
        <section className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-10 pb-24">
          <header className="flex flex-col gap-10 pb-14 border-b border-[#e4e2df]">
            <div className="flex items-center justify-between gap-6">
              <span
                className="text-xs font-medium tracking-[0.32em] uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C9A96E" }}
              >
                ShopLane.
              </span>
              <nav className="flex items-center gap-7 text-[10px] uppercase tracking-[0.2em]">
                <a href="/login" className="transition-colors duration-200" style={{ color: "#7A6E63" }}>
                  Sign In
                </a>
                <a href="/register" className="transition-colors duration-200" style={{ color: "#1b1c1a" }}>
                  Join
                </a>
              </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-20 items-end">
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.22em] mb-4 font-medium"
                  style={{ color: "#C9A96E" }}
                >
                  Curated marketplace
                </p>
                <h1
                  className="text-5xl lg:text-7xl font-light leading-[0.95]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1b1c1a" }}
                >
                  Discover pieces with character.
                </h1>
              </div>
              <p className="text-sm leading-7 max-w-md lg:ml-auto" style={{ color: "#7A6E63" }}>
                Browse fresh listings from independent sellers, selected for everyday style and standout detail.
              </p>
            </div>
          </header>

          <section className="pt-12">
            <div className="flex items-end justify-between gap-6 mb-9">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium" style={{ color: "#B5ADA3" }}>
                  Latest arrivals
                </p>
                <h2
                  className="text-3xl lg:text-4xl font-light mt-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1b1c1a" }}
                >
                  All Products
                </h2>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "#B5ADA3" }}>
                {products.length} items
              </span>
            </div>

            {error && (
              <div className="py-12 border-y border-[#e4e2df]">
                <p className="text-sm" style={{ color: "#9f3a38" }}>{error}</p>
              </div>
            )}

            {!error && isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[4/5] mb-5" style={{ backgroundColor: "#efede9" }} />
                    <div className="h-4 w-2/3 mb-3" style={{ backgroundColor: "#efede9" }} />
                    <div className="h-3 w-1/2" style={{ backgroundColor: "#efede9" }} />
                  </div>
                ))}
              </div>
            )}

            {!error && !isLoading && products.length === 0 && (
              <div className="py-24 text-center border-y border-[#e4e2df]">
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium mb-4" style={{ color: "#C9A96E" }}>
                  No products
                </p>
                <p
                  className="text-2xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7A6E63" }}
                >
                  New listings will appear here when sellers publish them.
                </p>
              </div>
            )}

            {!error && !isLoading && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                {products.map((product) => {
                  const imageUrl = product.images?.[0]?.url || "/shopelane_editorial_warm.png";

                  return (
                    <article
                      key={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[4/5] overflow-hidden mb-5" style={{ backgroundColor: "#f5f3f0" }}>
                        <img
                          src={imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-4">
                          <h3
                            className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#C9A96E]"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1b1c1a" }}
                          >
                            {product.title}
                          </h3>
                          <span
                            className="text-[10px] uppercase tracking-[0.16em] pt-1 whitespace-nowrap"
                            style={{ color: "#1b1c1a" }}
                          >
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        <p className="text-[12px] line-clamp-2 leading-relaxed" style={{ color: "#7A6E63" }}>
                          {product.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  )
}

export default Home
