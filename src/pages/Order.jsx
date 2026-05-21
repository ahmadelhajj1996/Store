import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();

  const endpoint = useMemo(() => {
    if (!id) return null;

    return `orders/${id}`;
  }, [id]);
  const { data = {}, isFetched } = useGet(["orders", id], endpoint, {
    enabled: !!id,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    select: (response) => response?.data || {},
  });

  const normalized = useMemo(() => {
    if (!data) return null;

    return {
      id: data?.id,
      order_number: data?.order_number,
      count: data?.items?.length,
      items:
        data?.items?.map((item) => ({
          id: item.id,
          variation_id: item.variation_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          subtotal: item.subtotal,
          image: item?.variation?.images[0]?.path_url,
          name: item?.product?.name,
          product_id: item?.product?.id,
          selected_attributes: item?.selected_attributes,
        })) || [],
    };
  }, [data, isFetched]);

  console.log(normalized);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6 sm:px-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="name flex items-center gap-2">
            عناصر الطلب
            {/* <span className="tag">{normalized?.id} </span> */}
          </h1>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          {normalized?.items?.map((item, index) => {
            return (
              <div key={index} className="border-b p-3 last:border-b-0">
                <div className="flex gap-4">

                  <div
                    className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-28 sm:w-28 cursor-pointer"
                    onClick={() => navigate(`/items/${item.product_id}`)}
                  >
                    <img
                      src={item?.image}
                      //   alt={item?.product?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">

                    <div className="flex items-center justify-between gap-3 price -mt-1  text-xs sm:text-sm">
                      <span>{item?.name}  </span>
                      <span className="">{item?.subtotal} ل.س</span>
                    </div>

                    {item?.selected_attributes?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.selected_attributes.map((attr, index) => (
                          <span
                            key={index}
                            className="
                                rounded-lg
                                tag
                                p-1
                                text-xs
                                font-normal
                                text-gray-600
                              "
                          >
                            {attr.name} : {attr.value}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 price  text-xs sm:text-sm">
                         <span> الكمية :  {item?.quantity}</span>
                    </div>

 
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Order;
