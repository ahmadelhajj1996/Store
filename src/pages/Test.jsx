 import { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import usePersisted from "../hooks/usePersisted";
import ImageGallery from "../components/Imagegallery";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorites } from "../store/cartSlice";
import TopLoader from "../components/loaders/TopLoader";
import { shareProduct } from "../utils/share";
import notify from "../utils/toastr";
import { useVariations } from "../hooks/useData";
function Product() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { data = [], isLoading } = useVariations(id);

  const normalized = useMemo(() => {
    if (!data) return [];
    return (
      data?.map((item) => ({
        id: item.id,
        name: item.product.name,
        product_id: item.product.id,
        sku: item.sku,
        sell_price: item.sell_price,
        base_price: item.base_price,
        sell_rate: item.sell_rate,
        buy_price: item.buy_price,
        base_buy_price: item.base_buy_price,
        buy_rate: item.buy_rate,
        final_price: item.final_price,
        quantity: item.quantity,
        images:
          item.images?.map((img) => ({
            id: img.id,
            path_url: img.path_url,
            existing: true,
          })) || [],
        attributes:
          item.attributes?.map((attr) => ({
            id: attr.id,
            attribute_id: attr.option?.attribute?.id
              ? String(attr.option.attribute.id)
              : "",
            attribute_name: attr.option?.attribute?.name || "",
            attribute_option_id: attr.option?.id ? String(attr.option.id) : "",
            attribute_option_name: attr.option?.value || "",
            price_override: attr.price_override,
          })) || [],
        characteristics:
          item.characteristics?.map((c) => ({
            id: c.id,
            attribute: c.attribute,
          })) || [],
      })) || []
    );
  }, [data]);

  const [currentid, setCurrentid] = usePersisted("currentid", null);

  useEffect(() => {
    if (!normalized?.length) return;
    if (!currentid) {
      setCurrentid(normalized[0].id);
    }
  }, [normalized, currentid, setCurrentid]);

  const current = useMemo(() => {
    if (!normalized?.length) return null;

    return normalized.find((v) => v.id === currentid) || normalized[0];
  }, [normalized, currentid]);

  // const variations = useMemo(() => {
  //   return (
  //     normalized?.map((item) => ({
  //       id: item.id,
  //       path_url: item?.images?.[0]?.path_url || "",
  //     })) || []
  //   );
  // }, [normalized]);

  const attributesGrouped = useMemo(() => {
    if (!current?.attributes?.length) return [];

    const grouped = {};

    current.attributes.forEach((attr) => {
      const name = attr.attribute_name;
      const value = attr.attribute_option_name;

      if (!grouped[name]) {
        grouped[name] = [];
      }

      if (!grouped[name].includes(value)) {
        grouped[name].push(value);
      }
    });

    return Object.entries(grouped).map(([attributeName, values]) => ({
      attributeName,
      attributeValuesSet: values,
    }));
  }, [current]);

  const [selectedAttributes, setSelectedAttributes] = useState({});

  useEffect(() => {
    if (!current?.attributes?.length) return;

    const defaults = {};

    current.attributes.forEach((attr) => {
      defaults[attr.attribute_name] = attr.attribute_option_name;
    });

    setSelectedAttributes({});
  }, [current]);

  const handleSelectAttribute = (attributeName, option) => {
    const updated = {
      ...selectedAttributes,
      [attributeName]: option,
    };

    setSelectedAttributes(updated);

    const matchedVariation = normalized?.find((variation) => {
      return variation.attributes.every((attr) => {
        return updated[attr.attribute_name] === attr.attribute_option_name;
      });
    });

    if (matchedVariation) {
      setCurrentid(matchedVariation.id);
    }
  };

  const payload = useMemo(() => {
    if (!normalized || !current) return null;

    const attributes = Object.entries(selectedAttributes || {}).map(
      ([attribute_name, attribute_option_name]) => {
        const found = current?.attributes?.find(
          (attr) =>
            attr.attribute_name === attribute_name &&
            attr.attribute_option_name === attribute_option_name,
        );

        return {
          id: found?.id || null,

          attribute_name,

          attribute_option_name,
        };
      },
    );

    return {
      product_id: current?.product_id,
      variation_id: current?.id,
      attributes,
      image: current?.images?.[0]?.path_url,
      quantity: 1,
      product_name: current?.name,
      variation_sku: current?.sku,
      price: current?.final_price,
    };
  }, [current, selectedAttributes]);

  const variations = useMemo(() => {
    return (
      normalized?.map((item) => ({
        id: item.id,
        path_url: item.images?.[0]?.path_url || "/placeholder.png",
      })) || []
    );
  }, [normalized]);

  const onShare = async (id) => {
    const { success } = await shareProduct(id);
    if (success) {
      notify("تم نسخ الرابط", "info");
    } else {
      notify("حدث خطأ ما ");
    }
  };

  console.log("", payload);

  const handleAddToCart = () => {
    if (!payload) return;

    dispatch(addToCart(payload));
  };

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
      <div
        className="
          grid
          grid-cols-1
          gap-8
          md:grid-cols-2
          sm:items-start
          lg:grid-cols-12
        "
      >
        {/* IMAGES */}
        <div
          className="
            order-1
            sm:col-span-1
            lg:col-span-5
            xl:px-12
          "
        >
          <div className="block sm:hidden pb-6">
            {isLoading ? (
              <TopLoader num={1} cols={1} height="20px" className="w-40" />
            ) : (
              <span>{normalized?.name}</span>
            )}
          </div>

          <div className="sm:sticky sm:top-4">
            <ImageGallery
              images={current?.images ?? []}
              variations={variations}
              onClick={(item) => setCurrentid(item.id)}
              onFavorite={() => dispatch(addToFavorites(payload))}
              onShare={() => onShare(current?.id)}
              loading={isLoading}
            />
          </div>
        </div>

        <div
          className="
            order-2
            lg:col-span-7
            lg:w-1/2
          "
        >
          <div className="name text-sm sm:text-base flex flex-col gap-0">
            <div className="hidden sm:block">
              {isLoading ? (
                <TopLoader num={1} cols={1} height="20px" className="w-40" />
              ) : (
                <span>{normalized?.name}</span>
              )}
            </div>

            {isLoading ? (
              <TopLoader
                num={1}
                cols={1}
                height="20px"
                className="w-full my-4"
              />
            ) : (
              <span className="price tag mt-3 text-sm -ms-1 block ">
                الرمز : {current?.sku ?? 0}
              </span>
            )}

            {isLoading ? (
              <TopLoader num={1} cols={1} height="22px" className="w-32 my-4" />
            ) : (
              <span className="price mt-2 text-sm block">
                {current?.final_price ?? 0} ل.س
              </span>
            )}

            <div className="space-y-4 mt-6">
              {attributesGrouped.map((group) => (
                <div key={group.attributeName}>
                  <h3 className="mb-4 price text-sm">
                    اختر {group.attributeName}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {group.attributeValuesSet.map((option) => {
                      const isActive =
                        selectedAttributes[group.attributeName] === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            handleSelectAttribute(group.attributeName, option)
                          }
                          className={`
                            rounded-lg
                            px-4
                            py-2
                            text-sm
                            border-[1px]
                            transition-all
                            duration-200
                            cursor-pointer

                            ${
                              isActive
                                ? "bg-cyan-600 border-cyan-600 text-white"
                                : "bg-white border-cyan-600 text-cyan-600"
                            }
                          `}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* CHARACTERISTICS */}
            <div className="mt-8 space-y-4">
              {current?.characteristics?.length > 0 && (
                <div>
                  <div className="mt-4">
                    <h3 className="name text-xs sm:text-sm">الخصائص</h3>

                    <ul className="space-y-3 rounded-lg pt-4">
                      {current?.characteristics?.map((item) => (
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

                          <span className="leading-6">{item.attribute}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* ADD TO CART */}
            {!isLoading && (
              <button
                onClick={handleAddToCart}
                className="
                button
                flex
                items-center
                justify-center
                gap-2
                px-6
                py-2
                mt-6
                disabled:opacity-50
              "
              >
                <ShoppingCart size={22} />

                <span>اضافة الى السلة</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
