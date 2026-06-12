import { useEffect, useMemo, useCallback } from "react";
import Imagegallery from "../components/Imagegallery";
import { useVariations } from "../hooks/useData";
import usePersisted from "../hooks/usePersisted";
import notify from "../utils/toastr";
import { shareProduct } from "../utils/share";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorites } from "../store/cartSlice";

function Tutorial() {
  const id = 1;

  const dispatch = useDispatch();

  const { data = [] } = useVariations(id);

  const [currentGroupKey, setCurrentGroupKey] = usePersisted(
    "currentGroupKey",
    null,
  );

  const [currentVariationId, setCurrentVariationId] = usePersisted(
    "currentVariationId",
    null,
  );

  useEffect(() => {
    if (!data.length) return;

    setCurrentGroupKey((prev) => {
      const exists = data.some((g) => g.group_key === prev);
      return exists ? prev : data[0].group_key;
    });
  }, [data, setCurrentGroupKey]);

  const current = useMemo(() => {
    if (!data.length) return null;
    return data.find((g) => g.group_key === currentGroupKey) || data[0];
  }, [data, currentGroupKey]);

  const currentVariation = useMemo(() => {
    if (!current?.items?.length) return null;

    return (
      current.items.find((v) => v.id === currentVariationId) || current.items[0]
    );
  }, [current, currentVariationId]);

  const images = useMemo(() => {
    return current?.images || [];
  }, [current]);

  const variations = useMemo(() => {
    return data?.map((group) => ({
      id: group?.group_key,
      path_url: group?.images?.[0]?.path_url || null,
    }));
  }, [data]);

  const handleVariationClick = useCallback(
    (item) => {
      setCurrentGroupKey(item.id);
      setCurrentVariationId(null);
    },
    [setCurrentGroupKey, setCurrentVariationId],
  );

  /* -------------------------------------------------------------------------- */
  /* FIXED WORKER USEMEMO SCOPE                                                 */
  /* -------------------------------------------------------------------------- */
  const variationAttributes = useMemo(() => {
    if (!current?.items?.length) return [];

    const map = new Map();

    current.items.forEach((variation) => {
      variation.special_attributes?.forEach((attr) => {
        const key = String(attr.attribute_id);

        if (!map.has(key)) {
          map.set(key, {
            attribute_id: String(attr.attribute_id),
            attribute_name: attr.attribute_name,
            values: [],
          });
        }

        const group = map.get(key);

        const exists = group.values.some(
          (v) => String(v.option_id) === String(attr.option_id),
        );

        if (!exists) {
          group.values.push({
            option_id: String(attr.option_id),
            value: attr.option_value,
            variation_id: variation.id,
            quantity: variation.quantity ?? 0,
          });
        }
      });
    }); // 🟢 Fixed: Closed the loop correctly inside the useMemo block

    return Array.from(map.values());
  }, [current]);

  const handleSelectVariation = (variationId) => {
    setCurrentVariationId(variationId);
  };

  const payload = useMemo(() => {
    if (!current || !currentVariation) return null;
    return {
      product_id: currentVariation?.product?.id,
      product_name: currentVariation?.product?.name,
      variation_sku: currentVariation?.sku,
      price: currentVariation?.sell_price,
      variation_id: currentVariation?.id,
      attributes: currentVariation.special_attributes[0],
      image: current?.images?.[0]?.path_url,
      stock_quantity: currentVariation?.quantity ?? 0,
      quantity: 1,
    };
  }, [current, currentVariation]);

  const onShare = async (id) => {
    const { success } = await shareProduct(id);
    if (success) {
      notify("تم نسخ الرابط", "success");
    } else {
      notify("حدث خطأ ما ");
    }
  };

  const handleAddToCart = () => {
    if (!payload) return;
    dispatch(addToCart(payload));
  };

  return (
    <>
      {current && currentVariation && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:py-6 ">
          <Imagegallery
            data={data}
            current_group={current}
            key={current.group_key}
            images={images}
            variations={variations}
            onClick={handleVariationClick}
            onShareClick={() => onShare(currentVariation?.product?.id)}
            onHeartClick={() => dispatch(addToFavorites(payload))}
          />

          <div className="flex flex-col text-sm gap-y-8 pb-12">
            <span className="ps-2">
              {currentVariation?.product?.name ?? " "}
            </span>

            {variationAttributes.map((attribute) => (
              <div
                key={attribute.attribute_id}
                className="border-t-[1px] border-cyan-600 pt-2 mx-2"
              >
                <span className="text-xs">{attribute.attribute_name} :</span>

                <div className="mt-4">
                  <select
                    value={
                      attribute.values.find((option) =>
                        currentVariation?.special_attributes?.some(
                          (a) =>
                            String(a.attribute_id) ===
                              String(attribute.attribute_id) &&
                            String(a.option_id) === String(option.option_id),
                        ),
                      )?.option_id || ""
                    }
                    onChange={(e) => {
                      const selectedOptionId = e.target.value;
                      const selectedOption = attribute.values.find(
                        (opt) =>
                          String(opt.option_id) === String(selectedOptionId),
                      );
                      if (selectedOption?.variation_id) {
                        handleSelectVariation(selectedOption.variation_id);
                      }
                    }}
                    className={`w-full bordered rounded-lg px-4 py-2 bg-white shadow-sm transition outline-none cursor-pointer 
                        ${currentVariation?.quantity === 0 ? "text-gray-400 line-through" : ""}
                        ${currentVariation?.quantity > 0 && currentVariation?.quantity < 5 ? "text-red-600" : ""}
                        ${currentVariation?.quantity >= 5 ? "text-gray-700" : ""}
                      `}
                  >
                    <option value="">اختر {attribute.attribute_name}...</option>

                    {attribute.values.map((option) => {
                      let quantityStatus = "";
                      if (option.quantity === 0) {
                        quantityStatus = " (نفدت الكمية)";
                      } else if (option.quantity < 5) {
                        quantityStatus = ` (متبقي كمية محدودة جداً)`;
                      } else if (option.quantity < 10) {
                        quantityStatus = " (متبقي عدد قليل)";
                      }

                      return (
                        <option
                          key={option.option_id}
                          value={option.option_id}
                          disabled={option.quantity === 0}
                          // Colors the text inside the dropdown list where browsers allow it
                          className={
                            option.quantity === 0
                              ? "text-gray-400"
                              : option.quantity < 5
                                ? "text-red-600"
                                : "text-gray-700"
                          }
                        >
                          {option.value} {quantityStatus}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            ))}

            {current?.characteristics?.length > 0 && (
              <div className="border-t-[1px] border-cyan-600 pt-2 ps-2">
                <h3 className="name text-xs ">الخصائص : </h3>

                <ul className="space-y-3 rounded-lg pt-2">
                  {current?.characteristics?.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 text-xs text-gray-700 ps-2"
                    >
                      <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-cyan-500" />
                      <span className="text-xs">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className={`flex items-center rounded-lg bordered text-xs mx-2 mt-4 w-full transition-all
    ${
      currentVariation?.quantity === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-cyan-600 text-white cursor-pointer"
    }`}
              onClick={handleAddToCart}
              disabled={currentVariation?.quantity === 0} // 🟢 Disable button if stock drops to 0
            >
              <p className="border-e-[1px] border-white p-3 bg-white text-cyan-600 rounded-s-lg">
                {currentVariation.sell_price} ل.س{" "}
              </p>
              <div className="mx-auto text-xs font-medium">
                {currentVariation?.quantity === 0
                  ? "نفدت الكمية"
                  : "اضافة الى السلة"}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Tutorial;
