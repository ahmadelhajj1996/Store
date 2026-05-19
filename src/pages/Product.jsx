import { useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { useGet } from "../hooks/useApi";
import useAttributes from "../hooks/useAttributes";

import ImageGallery from "../components/Imagegallery";

import {
  addToCart,
  addToFavorites,
  removeFromFavorites,
} from "../store/cartSlice";

import Container from "../components/Container";

function Product() {
  const dispatch = useDispatch();

  const { favorites = [] } = useSelector((state) => state.cart);

  const { id } = useParams();

  const { data = {} } = useGet(["products", id], `products/${id}`, {
    enabled: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    select: (response) => response?.data || {},
  });

  /* -------------------- NORMALIZE PRODUCT -------------------- */

  const product = useMemo(() => {
    if (!data) return null;

    return {
      id: data?.id,

      name: data?.name,

      viewCount: data?.view_count || 0,

      badge: data?.view_count > 100 ? "#1 Most viewed" : "Popular",

      isFeatured: !!data?.is_featured,

      variations:
        data?.variations?.map((variation) => ({
          id: variation?.id,

          price: Number(variation?.price || 0),

          quantity: variation?.quantity || 0,

          images:
            variation?.images?.length > 0
              ? variation.images.map((img) => img.path_url)
              : data?.featured_image_url
                ? [data.featured_image_url]
                : ["/placeholder.png"],

          attributes:
            variation?.attributes?.map((attr) => ({
              name: attr?.option?.attribute?.name?.toLowerCase()?.trim() || "",

              value: attr?.option?.value || "",
            })) || [],

          characteristics:
            variation?.characteristics?.map((item) => ({
              id: item?.id,
              value: item?.attribute,
            })) || [],
        })) || [],
    };
  }, [data]);

  /* -------------------- ATTRIBUTES -------------------- */

  const {
    attributeKeys,
    selectedAttributes,
    availableOptions,
    activeVariation,
    setAttribute,
  } = useAttributes(product);

  /* -------------------- FAVORITES -------------------- */

  const isFavorite = useMemo(() => {
    if (!activeVariation) return false;

    return favorites.some((item) => item.variation.id === activeVariation.id);
  }, [favorites, activeVariation]);

  /* -------------------- PREPARE CART ITEM -------------------- */

  const formattedVariation = useMemo(() => {
    if (!activeVariation) return null;

    return {
      id: activeVariation.id,

      price: activeVariation.price,

      stock: activeVariation.quantity,

      image: activeVariation.images?.[0] || null,

      selectedAttributes: selectedAttributes,
    };
  }, [activeVariation, selectedAttributes]);


  const handleAddToCart = useCallback(() => {
  if (!product || !formattedVariation) return;

  dispatch(
    addToCart({
      product: {
        id: product.id,
        name: product.name,
      },

      variation: {
        id: formattedVariation.id,
      },

      quantity: 1,

      unit_price: formattedVariation.price,

      subtotal: formattedVariation.price,

      image: formattedVariation.image,

      selectedAttributes:
        formattedVariation.selectedAttributes,
    }),
  );
}, [dispatch, product, formattedVariation]);



 
  const handleFavorite = useCallback(() => {
    if (!product || !formattedVariation) return;

    if (isFavorite) {
      dispatch(
        removeFromFavorites({
          variationId: formattedVariation.id,
        }),
      );
    } else {
      dispatch(
        addToFavorites({
          product: {
            id: product.id,
            name: product.name,
          },

          variation: formattedVariation,
        }),
      );
    }
  }, [dispatch, product, formattedVariation, isFavorite]);

  const characteristics =
    activeVariation?.characteristics ||
    product?.variations?.find((v) => v.id === activeVariation?.id)
      ?.characteristics ||
    [];

  return (
    <Container
      className="
        px-3
        py-6
        sm:px-8
        sm:py-8
        lg:px-16
      "
    >
      {/* ---------------- MOBILE HEADER ---------------- */}
      <div className="-mb-8 block sm:hidden">
        <div className="name flex flex-wrap items-center gap-2">
          {attributeKeys.length > 0 && (
            <p>{Object.values(selectedAttributes).join(" - ")}</p>
          )}

          <span>{product?.name}</span>
        </div>
      </div>

      {/* ---------------- MAIN LAYOUT ---------------- */}
      <div
        className="
          grid
          grid-cols-1
          gap-8
          sm:grid-cols-2
          sm:items-start
          lg:grid-cols-12
        "
      >
        {/* ---------------- GALLERY ---------------- */}
        <div
          className="
            order-1
            sm:col-span-1
            lg:col-span-5
            xl:px-12
          "
        >
          <div className="sm:sticky sm:top-4">
            <ImageGallery
              images={activeVariation?.images || []}
              isFavorite={isFavorite}
              isFeatured={product?.isFeatured}
              onFavorite={handleFavorite}
              onShare={() => console.log("share clicked")}
            />
          </div>

          {/* ---------------- MOBILE PRICE + VIEWS ---------------- */}
          <div className=" block sm:hidden">
            <div className="tag rounded-lg px-6 py-3">
              {product?.viewCount} شخصا شاهد هذا المنتج
            </div>

            <span className="price mt-3 text-sm ps-2  block">
              السعر : {activeVariation?.price ?? 0} ل.س
            </span>
          </div>
        </div>

        <div
          className="
            order-2
            lg:col-span-7
          "
        >
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-7 xl:gap-8">
            <div className="xl:col-span-4">
              <div className="hidden sm:block">
                {/* <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
                  <span className="tag">{product?.badge}</span>
                </div> */}

                <div className="name text-sm sm:text-base flex flex-wrap items-center gap-2">
                  {attributeKeys.length > 0 && (
                    <p>{Object.values(selectedAttributes).join(" - ")}</p>
                  )}

                  <span>{product?.name}</span>
                </div>

                <div className="tag mt-2 rounded-lg px-6 py-3">
                  {product?.viewCount} شخصا شاهد هذا المنتج
                </div>

                {/* Price */}
                <span className="price mt-2 text-sm block">
                  {activeVariation?.price ?? 0} ل.س
                </span>
              </div>

              {/* ---------------- ATTRIBUTES ---------------- */}

              <div className=" bordered border-b-0 border-x-0  mt-4">
                {attributeKeys.map((attributeName) => (
                  <div key={attributeName} className="mt-1 sm:mt-2 ">
                    <span className=" text-sm name capitalize">
                      اختار {attributeName} :
                    </span>

                    <div className="   mt-2 flex flex-wrap gap-3">
                      {availableOptions[attributeName]?.map((value) => {
                        const isActive =
                          selectedAttributes[attributeName] === value;
                        return (
                          <button
                            key={value}
                            onClick={() => setAttribute(attributeName, value)}
                            className={`
                            h-8
                            min-w-[60px]
                            rounded-lg
                            border
                            px-4
                            text-sm
                            transition-all
                            duration-200
                            ${
                              isActive
                                ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                                : "border-gray-200 hover:border-cyan-400"
                            }
                          `}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className=" bordered border-b-0 border-x-0  mt-4">
                {characteristics.length > 0 && (
                  <div className="mt-4">
                    <h3 className=" name text-xs sm:text-sm">الخصائص</h3>

                    <ul className="space-y-3 rounded-lg p-2">
                      {characteristics.map((item) => (
                        <li
                          key={item.id}
                          className="
                          flex

                          items-center
                          gap-3
                          text-sm
                          text-gray-700
                        "
                        >
                          <span
                            className="
                            h-1
                            w-1
                            shrink-0
                            rounded-full
                            bg-cyan-500
                          "
                          />

                          <span className="leading-6">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!activeVariation}
                  className="
                    button
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-2
                    disabled:opacity-50
                  "
                >
                  <ShoppingCart size={22} />

                  <span>اضافة الى السلة</span>
                </button>
              </div>
            </div>

            {/* ---------------- SIDE CONTENT ---------------- */}
            <div className="xl:col-span-3">
              <div className="space-y-4 xl:sticky xl:top-4 xl:space-y-5">
                {/* extra content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
