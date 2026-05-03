import { useEffect, useState } from "react";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useProduct } from "../hook/useProduct";

const MAX_VARIANT_IMAGES = 7;

const createEmptyVariant = () => ({
  images: [],
  stock: 0,
  attributes: {},
  price: { amount: "", currency: "INR" },
});

const SellerProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [localVariants, setLocalVariants] = useState([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attributeInputs, setAttributeInputs] = useState([{ key: "", value: "" }]);
  const [newVariant, setNewVariant] = useState(createEmptyVariant);

  const { productId } = useParams();
  const navigate = useNavigate();
  const { fetchProductDetailsById } = useProduct();

  useEffect(() => {
    async function fetchProductDetails() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchProductDetailsById(productId);

        if (result.error) {
          setError(result.error.message);
          return;
        }

        setProduct(result.product);
        setLocalVariants(result.product?.variants || []);
      } catch (err) {
        console.error("Failed to fetch product details", err);
        setError("Unable to load product details right now.");
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProductDetails();
    }
  }, [fetchProductDetailsById, productId]);

  const syncAttributes = (inputs) => {
    const attributes = {};

    inputs.forEach((attribute) => {
      const key = attribute.key.trim();
      const value = attribute.value.trim();

      if (key && value) {
        attributes[key] = value;
      }
    });

    setNewVariant((current) => ({ ...current, attributes }));
  };

  const handleStockChange = (index, newStock) => {
    setLocalVariants((current) => current.map((variant, variantIndex) => (
      variantIndex === index
        ? { ...variant, stock: Math.max(0, Number(newStock || 0)) }
        : variant
    )));
  };

  const handleAddAttribute = () => {
    setAttributeInputs((current) => [...current, { key: "", value: "" }]);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedInputs = attributeInputs.map((attribute, attributeIndex) => (
      attributeIndex === index ? { ...attribute, [field]: value } : attribute
    ));

    setAttributeInputs(updatedInputs);
    syncAttributes(updatedInputs);
  };

  const handleRemoveAttribute = (index) => {
    const updatedInputs = attributeInputs.filter((_, attributeIndex) => attributeIndex !== index);

    setAttributeInputs(updatedInputs);
    syncAttributes(updatedInputs);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    const availableSlots = MAX_VARIANT_IMAGES - newVariant.images.length;
    const filesToAdd = files.slice(0, availableSlots);
    const images = filesToAdd.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setNewVariant((current) => ({
      ...current,
      images: [...current.images, ...images],
    }));

    event.target.value = "";
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = newVariant.images[index];

    if (imageToRemove?.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }

    setNewVariant((current) => ({
      ...current,
      images: current.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const handleAddNewVariant = () => {
    const hasValidAttribute = attributeInputs.some((attribute) => (
      attribute.key.trim() && attribute.value.trim()
    ));

    if (!hasValidAttribute) {
      setError("At least one valid variant attribute is required.");
      return;
    }

    const variantToSave = {
      images: newVariant.images.map((image) => ({
        url: image.previewUrl,
        file: image.file,
      })),
      stock: Number(newVariant.stock || 0),
      attributes: { ...newVariant.attributes },
      price: {
        amount: Number(newVariant.price.amount || product?.price?.amount || 0),
        currency: newVariant.price.currency || product?.price?.currency || "INR",
      },
    };

    setLocalVariants((current) => [...current, variantToSave]);
    setIsAddingVariant(false);
    setError("");
    setAttributeInputs([{ key: "", value: "" }]);
    setNewVariant(createEmptyVariant());
  };

  const cancelVariantForm = () => {
    newVariant.images.forEach((image) => {
      if (image.previewUrl) {
        URL.revokeObjectURL(image.previewUrl);
      }
    });

    setIsAddingVariant(false);
    setAttributeInputs([{ key: "", value: "" }]);
    setNewVariant(createEmptyVariant());
    setError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center text-[#1b1c1a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        Loading gallery...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center text-[#1b1c1a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        Product Not Found
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pb-24 selection:bg-[#C9A96E]/30"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <header className="sticky top-0 z-10 bg-[#fbf9f6]/85 backdrop-blur-md px-6 py-4 border-b border-[#eee9e1]">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center border border-[#d0c5b5] text-[#7f7668] hover:text-[#1b1c1a] hover:border-[#745a27] transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            <h1
              className="text-xl tracking-wide uppercase truncate"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {product.title?.substring(0, 20)}
              {product.title?.length > 20 ? "..." : ""}
            </h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
          <section className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="w-full md:w-1/2">
              <div className="w-full aspect-[4/5] bg-[#f5f3f0] overflow-hidden">
                {product.images?.length > 0 ? (
                  <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#7f7668]">
                    No Image
                  </div>
                )}
              </div>

              {product.images?.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {product.images.slice(1).map((image, index) => (
                    <img
                      key={`${image.url}-${index}`}
                      src={image.url}
                      alt={`Thumb ${index + 1}`}
                      className="w-16 h-20 object-cover bg-[#f5f3f0] shrink-0"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2
                className="text-4xl md:text-5xl leading-tight mb-4 uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {product.title}
              </h2>
              <p className="text-[#6e6258] text-lg mb-6 leading-relaxed max-w-md">
                {product.description}
              </p>
              <div className="text-2xl tracking-wide font-light mb-8">
                {product.price?.amount?.toLocaleString()} {product.price?.currency}
              </div>
            </div>
          </section>

          <section className="bg-[#f5f3f0] p-6 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <h3
                className="text-3xl uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Variants & Inventory
              </h3>

              {!isAddingVariant && (
                <button
                  type="button"
                  onClick={() => setIsAddingVariant(true)}
                  className="bg-[#745a27] text-white px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#5a4312] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={16} strokeWidth={1.8} />
                  Add New Variant
                </button>
              )}
            </div>

            {error && (
              <div className="mb-6 border border-[#e6bbb5] bg-[#fff5f3] px-4 py-3 text-sm text-[#9f3a38]">
                {error}
              </div>
            )}

            {isAddingVariant && (
              <div className="bg-white p-6 md:p-8 mb-12 shadow-[0_20px_40px_rgba(27,28,26,0.04)]">
                <div className="flex justify-between items-center mb-6">
                  <h4
                    className="text-xl uppercase"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Create Variant
                  </h4>
                  <button
                    type="button"
                    onClick={cancelVariantForm}
                    className="text-[#7f7668] hover:text-[#1b1c1a] text-sm uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-3">
                        Attributes (e.g. Size, Color) *
                      </label>

                      <div className="space-y-3">
                        {attributeInputs.map((attribute, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input
                              type="text"
                              placeholder="Key (e.g. Size)"
                              value={attribute.key}
                              onChange={(event) => handleAttributeChange(index, "key", event.target.value)}
                              className="w-1/2 bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
                            />
                            <input
                              type="text"
                              placeholder="Value (e.g. M)"
                              value={attribute.value}
                              onChange={(event) => handleAttributeChange(index, "value", event.target.value)}
                              className="w-1/2 bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
                            />
                            {attributeInputs.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveAttribute(index)}
                                className="text-[#ba1a1a] p-2 hover:bg-[#ffdad6] transition-colors cursor-pointer"
                                aria-label="Remove attribute"
                              >
                                <Trash2 size={16} strokeWidth={1.8} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleAddAttribute}
                        className="mt-3 text-[#745a27] text-sm uppercase tracking-wider flex items-center gap-1 hover:text-[#5a4312] cursor-pointer"
                      >
                        <Plus size={15} strokeWidth={1.8} />
                        Add Attribute
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-2">
                          Initial Stock
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newVariant.stock}
                          onChange={(event) => setNewVariant((current) => ({ ...current, stock: event.target.value }))}
                          className="w-full bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27]"
                        />
                      </div>

                      <div className="w-1/2">
                        <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-2">
                          Price Amount
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newVariant.price.amount}
                          onChange={(event) => setNewVariant((current) => ({
                            ...current,
                            price: { ...current.price, amount: event.target.value },
                          }))}
                          placeholder="Default if empty"
                          className="w-full bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <label className="block text-sm uppercase tracking-wider text-[#6e6258]">
                        Image Upload (Max 7, Optional)
                      </label>
                      <span className="text-xs text-[#7f7668]">
                        {newVariant.images.length}/{MAX_VARIANT_IMAGES}
                      </span>
                    </div>

                    {newVariant.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {newVariant.images.map((image, index) => (
                          <div key={`${image.previewUrl}-${index}`} className="relative aspect-[4/5] bg-[#f5f3f0]">
                            <img src={image.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-white/80 p-1 text-[#ba1a1a] hover:bg-white transition-colors cursor-pointer"
                              aria-label="Remove variant image"
                            >
                              <Trash2 size={15} strokeWidth={1.8} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {newVariant.images.length < MAX_VARIANT_IMAGES && (
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-[#6e6258] file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#f5f3f0] file:text-[#1b1c1a] hover:file:bg-[#e4e2df] file:cursor-pointer file:uppercase file:text-xs file:tracking-wider cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddNewVariant}
                    className="bg-[#745a27] text-white px-8 py-3 uppercase tracking-wider text-sm hover:bg-[#5a4312] transition-colors cursor-pointer"
                  >
                    Save Variant
                  </button>
                </div>
              </div>
            )}

            {localVariants.length === 0 ? (
              <div className="py-12 text-center text-[#6e6258]">
                <p>No variants have been created yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {localVariants.map((variant, index) => (
                  <div key={variant._id || index} className="bg-white flex flex-col pt-4 shadow-[0_20px_40px_rgba(27,28,26,0.02)]">
                    <div className="px-6 flex gap-4 h-24 mb-4">
                      <div className="w-16 h-20 bg-[#f5f3f0] shrink-0">
                        {variant.images?.length > 0 ? (
                          <img src={variant.images[0].url} alt="Variant" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-[#7f7668]">
                            N/A
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {Object.entries(variant.attributes || {}).length > 0 ? (
                            Object.entries(variant.attributes || {}).map(([key, value]) => (
                              <span key={key} className="bg-[#f5f3f0] px-2 py-1 text-xs uppercase tracking-wider text-[#4d463a]">
                                <span className="text-[#a8a094]">{key}:</span> {value}
                              </span>
                            ))
                          ) : (
                            <span className="bg-[#f5f3f0] px-2 py-1 text-xs uppercase tracking-wider text-[#7f7668]">
                              Standard
                            </span>
                          )}
                        </div>

                        <div className="text-sm font-light">
                          {variant.price?.amount
                            ? `${variant.price.amount} ${variant.price.currency || product.price?.currency || "INR"}`
                            : `${product.price?.amount} ${product.price?.currency}`}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto border-t border-[#f5f3f0] bg-[#fbf9f6] flex items-center px-6 py-3 justify-between">
                      <label className="text-sm text-[#6e6258] uppercase tracking-wider">
                        Current Stock
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={variant.stock || 0}
                        onChange={(event) => handleStockChange(index, event.target.value)}
                        className="w-20 bg-transparent border-b border-[#d0c5b5] py-1 text-right focus:outline-none focus:border-[#745a27] text-lg"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default SellerProductDetails;
