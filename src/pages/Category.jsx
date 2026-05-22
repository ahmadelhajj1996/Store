import { useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGet } from "../hooks/useApi";
import useQueryState from "../hooks/useQueryState";
import { useDropdown } from "../hooks/useDropdown";

import Container from "../components/Container";
import Grid from "../components/Grid";
import Dropdown from "../components/Dropdown";
import Productcomponent from "../components/Productcomponent";

import { addToFavorites, removeFromFavorites } from "../store/cartSlice";

// 👇 GRID CONFIG
import Loader from "../components/loaders/Loader";
import TopLoader from "../components/loaders/TopLoader";

import { shareProduct } from "../utils/share";
import notify from "../utils/toastr";

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { favorites = [] } = useSelector((state) => state.cart);

  const { filters, setFilters } = useQueryState({
    category_id: "",
  });

  const { category_id } = filters;

  const { open, position, items, dropdownRef } = useDropdown({
    onItemSelect: (item) => {
      setFilters({
        category_id: item.id,
      });
    },
  });

  const { data: categories = [], isLoading: categoriesLoading } = useGet(
    ["categories", id],
    "categories",
    {
      staleTime: Infinity,
      select: (res) =>
        res?.data?.filter((item) => String(item.parent_id) === String(id)) ||
        [],
    },
  );

  const { data: products = [], isLoading: productsLoading } = useGet(
    ["products"],
    "products",
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      select: (res) => res?.data?.data || [],
    },
  );

  const filteredProducts = useMemo(() => {
    if (!products?.length) return [];

    if (category_id) {
      return products.filter(
        (p) => String(p.category_id) === String(category_id),
      );
    }

    return products.filter((p) => String(p.category?.parent_id) === String(id));
  }, [products, category_id, id]);
  const normalizedProducts = useMemo(() => {
    if (!filteredProducts?.length) return [];

    return filteredProducts.map((product) => {
      const firstVariation = product?.variations?.[0] || null;

      const images =
        firstVariation?.images?.length > 0
          ? firstVariation.images.map((img) => img.path_url)
          : product?.featured_image_url
            ? [product.featured_image_url]
            : ["/placeholder.png"];

      return {
        id: product.id,
        title: product.name,
        price: Number(firstVariation?.price || 0),
        quantity: firstVariation?.quantity || 0,
        images,
        variationId: firstVariation?.id || null,
        variationSku: firstVariation?.sku || null,
        attributes:
          firstVariation?.attributes?.map((attr) => ({
            id: attr?.id,
            name: attr?.option?.attribute?.name,
            value: attr?.option?.value,
          })) || [],
        badge: product?.view_count > 100 ? "#1 Most viewed" : "Popular",
      };
    });
  }, [filteredProducts]);

  const handleFavorite = useCallback(
    (item) => {
      const attributes = Array.from(
        new Map(
          (item.attributes || []).map((attr) => [
            attr.name,
            {
              attribute_name: attr.name,
              attribute_option_name: attr.value,
            },
          ]),
        ).values(),
      );

      const payload = {
        product_id: item.id,
        variation_id: item.variationId,

        product_name: item.title,

        variation_sku: item.variationSku || null,

        image: item.images?.[0] || null,

        price: item.price,

        attributes,
      };

      const exists = favorites.find((f) => f.variation.id === item.variationId);

      if (exists) {
        dispatch(
          removeFromFavorites({
            variationId: item.variationId,
          }),
        );
      } else {
        dispatch(addToFavorites(payload));
      }
    },
    [dispatch, favorites],
  );

  const onShare = async (id) => {
    const { success } = await shareProduct(id);
    if (success) {
      notify("تم نسخ الرابط", "info");
    } else {
      notify("حدث خطأ ما ");
    }
  };

  return (
    <Container className="relative min-h-screen" ref={dropdownRef}>
      {categoriesLoading ? (
        <TopLoader
          className=" bg-inherit grid
                grid-cols-3
                sm:grid-cols-4
                md:grid-cols-6
                lg:grid-cols-8 mt-4"
          cols={8}
          num={1}
        />
      ) : (
        <Grid
          items={categories}
          onItemClick={(item) =>
            setFilters({
              category_id: item.id,
            })
          }
          containerClassName="mt-4"
          itemClassName="bordered"
          activeItemClassName="bg-cyan-600 text-white"
          inactiveItemClassName="bg-white text-cyan-600 hover:bg-cyan-50"
        />
      )}

      <Dropdown open={open} items={items} position={position} />

      {productsLoading ? (
        <Loader fullScreen={true} />
      ) : (
        <div
          className="
            mx-2 sm:mx-8
            grid gap-4
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
          "
        >
          {normalizedProducts.map((item) => {
            const isFavorite = favorites.some(
              (f) => f.variation.id === item.variationId,
            );

            return (
              <Productcomponent
                key={`${item.id}-${item.variationId}`}
                images={item.images}
                title={item.title}
                price={item.price}
                badge={item.badge}
                onClick={() => navigate(`/items/${item.id}`)}
                isFavorite={isFavorite}
                onFavorite={() => handleFavorite(item)}
                onShare={() => onShare(item.id)}
              />
            );
          })}
        </div>
      )}
    </Container>
  );
}

export default Category;
