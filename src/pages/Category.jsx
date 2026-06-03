import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useData";
import { useMemo, useState, useEffect } from "react";
import Productcard from "../components/Productcard";
import TopLoader from "../components/loaders/TopLoader";
import { shareProduct } from "../utils/share";
import notify from "../utils/toastr";

function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
  
  // Fetch data hook
  const { data, isLoading } = useProducts(id, categoryId);

  /* * BEST PRACTICE: Local memory state to hold child categories.
   * This ensures child buttons remain locked on screen when changing subcategories,
   * avoiding layout shifts or flickering when only product lists are fetching.
   */
  const [persistentChilds, setPersistentChilds] = useState([]);

  useEffect(() => {
    if (data?.child_categories) {
      setPersistentChilds(data.child_categories);
    }
  }, [data?.child_categories]);

  // Reset the list completely if the main category param ID changes
  useEffect(() => {
    setPersistentChilds([]);
  }, [id]);

  const products = useMemo(() => {
    return (
      data?.products?.data?.map((item) => ({
        id: item.id,
        name: item.name,
        category_id: item.category_id,
        sell_price: item?.first_variation?.sell_price,
        images:
          item?.first_variation?.images?.map((e) => ({
            url: e.path_url,
          })) ?? [],
      })) || []
    );
  }, [data]);

  const onShare = async (id) => {
    const { success } = await shareProduct(id);
    if (success) {
      notify("تم نسخ الرابط", "success");
    } else {
      notify("حدث خطأ ما ", "error");
    }
  };

  const isInitialParentLoading = isLoading && persistentChilds.length === 0;
  const isSubCategoryFiltering = isLoading && persistentChilds.length > 0;

  return (
    <>
      <div className="py-4 md:py-8 px-2 md:px-4 grid gap-2 grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {isInitialParentLoading ? (
          <TopLoader
            num={8}
            cols={8}
            height="32px"
            className="w-full rounded-lg bg-inherit"
          />
        ) : (
          <>
            {/* Optional "All Products" Button reset toggle */}
            <button
              className={`rounded-lg py-2 text-xs border transition-all duration-200 ${
                !categoryId
                  ? "bg-cyan-600 border-cyan-600 text-white"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("category_id");
                setSearchParams(params);
              }}
            >
              الكل
            </button>

            {persistentChilds.map((item) => {
              const isActive = categoryId === String(item.id);
              return (
                <button
                  key={item.id}
                  className={`rounded-lg py-2 text-xs border transition-all duration-200 ${
                    isActive
                      ? "bg-cyan-600 border-cyan-600 text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:border-cyan-500"
                  }`}
                  onClick={() => {
                    setSearchParams({ category_id: String(item.id) });
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </>
        )}
      </div>

      {/* =========================================================================
          PART 2: PRODUCTS MATRIX VIEWPORT (Skeleton Loading / Render Data)
          ========================================================================= */}
      {isInitialParentLoading || isSubCategoryFiltering ? (
        <div className="px-2 md:px-4 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="w-full flex flex-col gap-3">
              <TopLoader num={1} cols={1} height="200px" className="w-full rounded-lg bg-inherit" />
              <TopLoader num={1} cols={1} height="16px" className="w-3/4 rounded bg-inherit" />
              <TopLoader num={1} cols={1} height="14px" className="w-1/2 rounded bg-inherit" />
            </div>
          ))}
        </div>
      ) : (
        <div className="px-2 md:px-4 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={item.id || index} className="w-full">
                <Productcard
                  item={item}
                  isLoading={false}
                  onShare={() => onShare(item?.id)}
                  onClick={() => navigate(`/items/${item.id}`)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-400 text-sm">
              لا توجد منتجات متوفرة في هذا القسم حالياً.
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Category;
