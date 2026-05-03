import { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useProduct } from "../hook/useProduct";

const ProductDetail = () => {
  const { fetchProductDetailsById } = useProduct();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  useEffect(() => {
    async function loadProductDetails() {
      if (!productId) {
        setError("Product id is missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const result = await fetchProductDetailsById(productId);

        if (result.error) {
          setError(result.error.message);
          return;
        }

        setProduct(result.product);
        setSelectedImage(0);

        // Initialize with first variant's attributes if variants exist
        if (result.product?.variants?.length > 0) {
          setSelectedAttributes(result.product.variants[0].attributes || {});
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Unable to load product details right now.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProductDetails();
  }, [fetchProductDetailsById, productId]);

  const activeVariant = useMemo(() => {
    if (!product?.variants || product.variants.length === 0) return null;
    return product.variants.find((v) => {
      if (!v.attributes) return false;
      const vKeys = Object.keys(v.attributes);
      const sKeys = Object.keys(selectedAttributes);
      const isMatch = vKeys.every((k) => v.attributes[k] === selectedAttributes[k]);
      return vKeys.length === sKeys.length && isMatch;
    });
  }, [product, selectedAttributes]);

  const availableAttributes = useMemo(() => {
    if (!product?.variants) return {};
    const attrs = {};
    product.variants.forEach((variant) => {
      if (variant.attributes) {
        Object.entries(variant.attributes).forEach(([key, value]) => {
          if (!attrs[key]) attrs[key] = new Set();
          attrs[key].add(value);
        });
      }
    });
    Object.keys(attrs).forEach((key) => {
      attrs[key] = Array.from(attrs[key]);
    });
    return attrs;
  }, [product]);

  useEffect(() => {
    setSelectedImage(0);
  }, [activeVariant]);

  const handleAttributeChange = (attrName, value) => {
    const newAttrs = { ...selectedAttributes, [attrName]: value };
    const exactMatch = product.variants.find((v) => {
      const vAttrs = v.attributes || {};
      return (
        Object.keys(newAttrs).every((k) => newAttrs[k] === vAttrs[k]) &&
        Object.keys(vAttrs).every((k) => newAttrs[k] === vAttrs[k])
      );
    });

    if (exactMatch) {
      setSelectedAttributes(exactMatch.attributes);
    } else {
      const fallbackVariant = product.variants.find(
        (v) => v.attributes && v.attributes[attrName] === value
      );
      if (fallbackVariant) {
        setSelectedAttributes(fallbackVariant.attributes);
      } else {
        setSelectedAttributes(newAttrs);
      }
    }
  };

  const displayImages =
    activeVariant?.images && activeVariant.images.length > 0
      ? activeVariant.images
      : product?.images?.length
      ? product.images.slice(0, 7)
      : [{ url: "/shopelane_editorial_warm.png" }];

  const hasMultipleImages = displayImages.length > 1;

  const displayPrice =
    activeVariant?.price && activeVariant.price.amount != null
      ? `${activeVariant.price.currency || product?.price?.currency} ${activeVariant.price.amount.toLocaleString()}`
      : product?.price?.currency && product?.price?.amount != null
      ? `${product.price.currency} ${product.price.amount.toLocaleString()}`
      : "Price unavailable";

  const showPreviousImage = () => {
    setSelectedImage((currentIndex) =>
      currentIndex === 0 ? displayImages.length - 1 : currentIndex - 1
    );
  };

  const showNextImage = () => {
    setSelectedImage((currentIndex) =>
      currentIndex === displayImages.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30 pb-24"
        style={{ backgroundColor: "#fbf9f6", fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-10 lg:pt-16">
          <div className="flex items-center justify-between gap-6 mb-10 lg:mb-14">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center border border-[#e4e2df] transition-colors duration-200"
              style={{ color: "#6f6256", backgroundColor: "#fbf9f6" }}
              aria-label="Go back"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1b1c1a";
                e.currentTarget.style.borderColor = "#d19a2e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6f6256";
                e.currentTarget.style.borderColor = "#e4e2df";
              }}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            <span
              className="text-xs font-medium tracking-[0.32em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#d19a2e" }}
            >
              ShopLane.
            </span>
          </div>

          {isLoading && (
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start animate-pulse">
              <div className="w-full lg:w-[70%] flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
                <div className="flex flex-row md:flex-col gap-4 w-full md:w-20 lg:w-24 flex-shrink-0">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-20 md:w-full aspect-[4/5]" style={{ backgroundColor: "#efede9" }} />
                  ))}
                </div>
                <div className="w-full aspect-[4/5]" style={{ backgroundColor: "#efede9" }} />
              </div>

              <div className="w-full lg:w-[30%] pt-4">
                <div className="h-12 w-4/5 mb-6" style={{ backgroundColor: "#efede9" }} />
                <div className="h-4 w-1/2 mb-8" style={{ backgroundColor: "#efede9" }} />
                <div className="h-px w-full mb-8" style={{ backgroundColor: "#e4e2df" }} />
                <div className="h-4 w-full mb-3" style={{ backgroundColor: "#efede9" }} />
                <div className="h-4 w-5/6 mb-10" style={{ backgroundColor: "#efede9" }} />
                <div className="h-12 w-full" style={{ backgroundColor: "#efede9" }} />
              </div>
            </div>
          )}

          {!isLoading && error && (
            <div className="min-h-[50vh] flex items-center justify-center border-y border-[#e4e2df]">
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: "#9f3a38" }}>
                {error}
              </p>
            </div>
          )}

          {!isLoading && !error && product && (
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
              <div className="w-full lg:w-[70%] flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
                {hasMultipleImages && (
                  <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 w-full md:w-20 lg:w-24 flex-shrink-0 md:max-h-[calc(100vh-200px)]">
                    {displayImages.map((image, index) => (
                      <button
                        key={`${image.url}-${index}`}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 md:w-full aspect-[4/5] overflow-hidden transition-all duration-300 ${
                          selectedImage === index
                            ? "opacity-100 ring-1 ring-[#d19a2e] ring-offset-2"
                            : "opacity-50 hover:opacity-100"
                        }`}
                        style={{
                          backgroundColor: "#f5f3f0",
                          "--tw-ring-offset-color": "#fbf9f6",
                        }}
                        aria-label={`View product image ${index + 1}`}
                      >
                        <img
                          src={image.url}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative w-full aspect-[4/5] overflow-hidden group" style={{ backgroundColor: "#f5f3f0" }}>
                  <img
                    src={displayImages[selectedImage]?.url || displayImages[0].url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />

                  {hasMultipleImages && (
                    <>
                      <button
                        type="button"
                        onClick={showPreviousImage}
                        className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border"
                        style={{ backgroundColor: "rgba(251,249,246,0.86)", borderColor: "#e4e2df", color: "#1b1c1a" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fbf9f6")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(251,249,246,0.86)")}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} strokeWidth={1.2} />
                      </button>

                      <button
                        type="button"
                        onClick={showNextImage}
                        className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border"
                        style={{ backgroundColor: "rgba(251,249,246,0.86)", borderColor: "#e4e2df", color: "#1b1c1a" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fbf9f6")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(251,249,246,0.86)")}
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} strokeWidth={1.2} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-[30%] lg:sticky lg:top-24 flex flex-col pt-4">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1b1c1a" }}
                >
                  {product.title}
                </h1>

                <div className="mb-8">
                  <span className="text-sm uppercase tracking-[0.2em] font-medium" style={{ color: "#1b1c1a" }}>
                    {displayPrice}
                  </span>
                </div>

                <div className="h-px w-full mb-8" style={{ backgroundColor: "#d6d1ca" }} />

                {/* Variant Options */}
                {Object.entries(availableAttributes).length > 0 && (
                  <>
                    {Object.entries(availableAttributes).map(([attrName, values]) => (
                      <div key={attrName} className="mb-6">
                        <h3 className="text-[10px] uppercase tracking-[0.24em] font-medium mb-3" style={{ color: "#d19a2e" }}>
                          {attrName}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {values.map((val) => {
                            const isSelected = selectedAttributes[attrName] === val;
                            return (
                              <button
                                key={val}
                                onClick={() => handleAttributeChange(attrName, val)}
                                className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${
                                  isSelected
                                    ? "border-[#1b1c1a] bg-[#1b1c1a] text-[#fbf9f6]"
                                    : "border-[#d0c5b5] text-[#1b1c1a] hover:border-[#1b1c1a]"
                                }`}
                                style={isSelected ? {} : { backgroundColor: "transparent" }}
                              >
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Stock Information */}
                {activeVariant && activeVariant.stock !== undefined && (
                  <div className="mb-6">
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] font-medium ${
                        activeVariant.stock > 0 ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {activeVariant.stock > 0 ? `${activeVariant.stock} in stock` : "Out of stock"}
                    </span>
                  </div>
                )}

                <div className="mb-12">
                  <h3 className="text-[10px] uppercase tracking-[0.24em] font-medium mb-4" style={{ color: "#d19a2e" }}>
                    The Details
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4f473f" }}>
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  <button
                    type="button"
                    className="w-full py-4 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
                    style={{
                      backgroundColor: "#171612",
                      color: "#fbf9f6",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#d19a2e";
                      e.currentTarget.style.color = "#1b1c1a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#171612";
                      e.currentTarget.style.color = "#fbf9f6";
                    }}
                  >
                    <ShoppingBag size={16} strokeWidth={1.5} />
                    Add to cart
                  </button>

                  <button
                    type="button"
                    className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 border"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#bda98f",
                      color: "#1b1c1a",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#d19a2e";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#bda98f";
                    }}
                  >
                    Buy Now
                  </button>
                </div>

                <div className="mt-14 space-y-4 text-[10px] uppercase tracking-[0.1em]" style={{ color: "#5f554b" }}>
                  <div className="flex justify-between gap-6 border-b pb-3" style={{ borderColor: "#d6d1ca" }}>
                    <span>Shipping</span>
                    <span className="text-right">Complimentary over INR 15,000</span>
                  </div>
                  <div className="flex justify-between gap-6 border-b pb-3" style={{ borderColor: "#d6d1ca" }}>
                    <span>Returns</span>
                    <span className="text-right">Within 14 days of delivery</span>
                  </div>
                  <div className="flex justify-between gap-6 border-b pb-3" style={{ borderColor: "#d6d1ca" }}>
                    <span>Images</span>
                    <span className="text-right">{displayImages.length} available</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
