  import { useParams } from "react-router-dom";
  import { useVariations } from "../hooks/useData";
  import { useEffect, useMemo, useState } from "react";
  import usePersisted from "../hooks/usePersisted";
  import { useDispatch } from "react-redux";
  import notify from "../utils/toastr";
  import { shareProduct } from "../utils/share";
  import TopLoader from "../components/loaders/TopLoader";
  import ImageGallery from "../components/Imagegallery";
  import { ShoppingCart } from "lucide-react";
  import { addToCart, addToFavorites } from "../store/cartSlice";

  function Product() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, isLoading } = useVariations(id);

    const variations = useMemo(() => {
      if (!data) return [];
      return (
        data?.map((item) => ({
          id: item.id,
          product_id:item.product.id,
          name: item.product.name,
          final_price: item.sell_price,
          quantity: item.quantity,
          sku: item.sku,
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
            item?.characteristics?.map((e) => ({
              id: e.id,
              attribute: e.attribute,
            })) ?? [],
        })) || []
      );
    }, [data]);

    const [currentid, setCurrentid] = usePersisted("currentid", null);

    useEffect(() => {
      if (!variations?.length) return;
      if (!currentid) {
        setCurrentid(variations[0]?.id);
      }
    }, [variations, currentid, setCurrentid]);

    const current = useMemo(() => {
      if (!variations?.length) return null;
      return variations.find((v) => v.id === currentid) || variations[0];
    }, [variations, currentid]);

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
      setSelectedAttributes({});
    }, [current]);

    const handleSelectAttribute = (attributeName, option) => {
      const updated = {
        ...selectedAttributes,
        [attributeName]: option,
      };

      setSelectedAttributes(updated);

      const matchedVariation = variations?.find((variation) => {
        return variation.attributes.every((attr) => {
          return updated[attr.attribute_name] === attr.attribute_option_name;
        });
      });

      if (matchedVariation) {
        setCurrentid(matchedVariation.id);
      }
    };

    const payload = useMemo(() => {
      if (!variations || !current) return null;

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
    }, [variations, current, selectedAttributes]);

    const onShare = async (id) => {
      const { success } = await shareProduct(id);
      if (success) {
        notify("تم نسخ الرابط", "success");
      } else {
        notify("حدث خطأ ما ");
      }
    };

    const [message, setMessage] = useState("");

    const handleAddToCart = () => {
      if (attributesGrouped.length > 0) {
        const hasMissingSelection = attributesGrouped.some(
          (group) => !selectedAttributes[group.attributeName],
        );

        if (hasMissingSelection) {
          setMessage("يرجى اختيار الصفات المطلوبة أولاً قبل الإضافة إلى السلة");
          notify(
            "يرجى اختيار الصفات المطلوبة أولاً قبل الإضافة إلى السلة",
            "error",
          );
          return;
        }
      }

      if (!payload) return;
      dispatch(addToCart(payload));
    };

    const galleryVariations = useMemo(() => {
      if (!variations) return [];
      return variations
        .map((item) => ({
          id: item.id,
          path_url: item.images?.[0]?.path_url || "",
        }))
        .filter((item) => item.path_url);
    }, [variations]);

    return (
      <div className="px-3 py-6 sm:px-8 sm:py-8 lg:px-16">
        {/* =========================================================================
            PART 1: LOADING STATE (isLoading)
            ========================================================================= */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 sm:items-start lg:grid-cols-12">
            {/* IMAGES SKELETON */}
            <div className="order-1 sm:col-span-1 lg:col-span-5 xl:px-12">
              {/* Mobile Product Name Skeleton */}
              <div className="block sm:hidden pb-6">
                <TopLoader
                  num={1}
                  cols={1}
                  height="20px"
                  className="w-40 bg-inherit"
                />
              </div>

              <div className="sm:sticky sm:top-4">
                <ImageGallery
                  images={[]}
                  variations={[]}
                  onClick={() => {}}
                  onFavorite={() => {}}
                  onShare={() => {}}
                  loading={true}
                />
              </div>
            </div>

            {/* DETAILS SKELETON */}
            <div className="order-2 lg:col-span-7 lg:w-1/2">
              <div className="name text-sm sm:text-base flex flex-col gap-0">
                {/* Desktop Product Name Skeleton */}
                <div className="hidden sm:block">
                  <TopLoader
                    num={1}
                    cols={1}
                    height="20px"
                    className="w-40 bg-inherit"
                  />
                </div>

                {/* SKU Tag Skeleton */}
                <TopLoader
                  num={1}
                  cols={1}
                  height="20px"
                  className="w-full my-4 bg-inherit"
                />

                {/* Price Tag Skeleton */}
                <TopLoader
                  num={1}
                  cols={1}
                  height="22px"
                  className="w-32 my-4 bg-inherit"
                />

                {/* Attributes Section Skeleton */}
                <div className="space-y-4 mt-6">
                  <div>
                    <TopLoader
                      num={1}
                      cols={1}
                      height="16px"
                      className="w-28 mb-4 bg-inherit"
                    />
                    <div className="flex flex-wrap gap-3">
                      <TopLoader
                        num={3}
                        cols={3}
                        height="36px"
                        className="w-16 rounded-lg bg-inherit"
                      />
                    </div>
                  </div>
                </div>

                {/* Characteristics Skeleton */}
                <div className="mt-8 space-y-4">
                  <div>
                    <TopLoader
                      num={1}
                      cols={1}
                      height="16px"
                      className="w-20 mt-4 bg-inherit"
                    />
                    <div className="space-y-3 pt-4">
                      <TopLoader
                        num={3}
                        cols={1}
                        height="14px"
                        className="w-3/4 rounded bg-inherit"
                      />
                    </div>
                  </div>
                </div>

                {/* Add To Cart Action Skeleton */}
                <TopLoader
                  num={1}
                  cols={1}
                  height="40px"
                  className="w-40 mt-6 rounded-md bg-inherit"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PART 2: ACTIVE CONTENT STATE (!isLoading)
            ========================================================================= */}
        {!isLoading && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 sm:items-start lg:grid-cols-12">
            {/* IMAGES CONTENT */}
            <div className="order-1 sm:col-span-1 lg:col-span-5 xl:px-12">
              {/* Mobile Product Name Display */}
              <div className="block sm:hidden pb-6">
                <span>{current?.name}</span>
              </div>

              <div className="sm:sticky sm:top-4">
                <ImageGallery
                  images={current?.images ?? []}
                  variations={galleryVariations}
                  onClick={(item) => setCurrentid(item.id)}
                  onFavorite={() => dispatch(addToFavorites(payload))}
                  onShare={() => onShare(current?.id)}
                  loading={false}
                />
              </div>
            </div>

            <div className="order-2 lg:col-span-7 lg:w-1/2 mt-24 md:mt-0">
              <div className="name text-sm sm:text-base flex flex-col gap-0">
                {/* Desktop Product Name Display */}
                <div className="hidden sm:block">
                  <span>{current?.name}</span>
                </div>

                <span className="price tag mt-3 text-sm -ms-2 block">
                  {current?.final_price ?? 0} ل.س
                </span>

                {current.quantity < 5 && (
                  <span className="price   mt-3 text-xs text-red-600 -ms-1 block">
                    متبقي ( {current?.quantity ?? 0} ) ققط
                  </span>
                )}

                {current.quantity < 10 && (
                  <span className="price   mt-3 text-xs text-yellow-600 -ms-1 block">
                    متبقي ( {current?.quantity ?? 0} ) ققط
                  </span>
                )}

                {/* Attributes Section */}
                <div className="space-y-4 ">
                  {attributesGrouped.map((group) => (
                    <div key={group.attributeName} className="relative">
                      {/* Inline Form Error Messaging */}
                      {/* <p className="text-xs text-red-600 absolute -top-4">
                        {message}
                      </p> */}

                      <div className="relative">
                        <h3 className="mb-4 price text-sm">
                          اختر {group.attributeName}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {group.attributeValuesSet.map((option) => {
                          const isActive =
                            selectedAttributes[group.attributeName] === option;

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                handleSelectAttribute(
                                  group.attributeName,
                                  option,
                                );
                                setMessage("");
                              }}
                              className={`rounded-lg px-4 py-2 text-sm border-[1px] transition-all duration-200 cursor-pointer ${
                                isActive
                                  ? "bg-cyan-600 border-cyan-600 text-white"
                                  : "bg-white border-cyan-600 text-cyan-600"
                              }`}
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
                              className="flex items-center gap-3 text-sm text-gray-700"
                            >
                              <span className="h-1 w-1 shrink-0 rounded-full bg-cyan-500" />
                              <span className="leading-6">{item.attribute}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* ADD TO CART ACTION */}
                <button
                  onClick={handleAddToCart}
                  className="button flex items-center justify-center gap-2 px-6 py-2 mt-6 disabled:opacity-50"
                >
                  <ShoppingCart size={22} />
                  <span>اضافة الى السلة</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default Product;
