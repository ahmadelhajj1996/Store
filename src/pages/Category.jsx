import { useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGet } from "../hooks/useApi";
import useQueryState from "../hooks/useQueryState";
import { useDropdown } from "../hooks/useDropdown";
import { useDispatch, useSelector } from "react-redux";

import Container from "../components/Container";
import Grid from "../components/Grid";
import Dropdown from "../components/Dropdown";
import Productcomponent from "../components/Productcomponent";

import { addToFavorites, removeFromFavorites } from "../store/cartSlice";

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

  // ===============================
  // PRODUCTS
  // ===============================
  const { data: products = [] } = useGet(["products"], "products", {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    select: (res) => res?.data?.data || [],
  });

  const { data: categories = [] } = useGet(["categories", id], "categories", {
    staleTime: Infinity,
    select: (res) =>
      res?.data?.filter((item) => String(item.parent_id) === String(id)) || [],
  });

  const filteredProducts = useMemo(() => {
    if (!products?.length) return [];

    if (category_id) {
      return products.filter(
        (p) => String(p.category_id) === String(category_id),
      );
    }

    return products.filter((p) => String(p.category?.parent_id) === String(id));
  }, [products, category_id, id]);

  // ===============================
  // NORMALIZE PRODUCTS
  // ===============================
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
        oldPrice: firstVariation?.price ? Number(firstVariation.price) + 20 : 0,
        quantity: firstVariation?.quantity || 0,
        images,
        variationId: firstVariation?.id || null,
        attributes:
          firstVariation?.attributes?.map((attr) => ({
            name: attr?.option?.attribute?.name,
            value: attr?.option?.value,
          })) || [],
        badge: product?.view_count > 100 ? "#1 Most viewed" : "Popular",
        isFeatured: !!product?.is_featured,
      };
    });
  }, [filteredProducts]);

  // ===============================
  // FAVORITE HANDLERS (EXTRACTED)
  // ===============================
  const handleFavorite = useCallback(
    (item) => {
      const variation = {
        id: item.variationId,
        price: item.price,
        quantity: item.quantity,
        images: item.images,
        attributes: item.attributes,
      };

      const product = {
        id: item.id,
        name: item.title,
      };

      const exists = favorites.some((f) => f.variation.id === item.variationId);

      if (exists) {
        dispatch(removeFromFavorites({ variationId: item.variationId }));
      } else {
        dispatch(addToFavorites({ product, variation }));
      }
    },
    [dispatch, favorites],
  );

  return (
    <Container className="  relative" ref={dropdownRef}>

      <Grid
        items={categories}
        onItemClick={(item) => {
          setFilters({
            category_id: item.id,
          });
        }}
        containerClassName="mt-4"
        itemClassName="bordered"
        activeItemClassName="bg-cyan-600 text-white"
        inactiveItemClassName="bg-white text-cyan-600 hover:bg-cyan-50"
      />

      <Dropdown open={open} items={items} position={position} />

      <div className=" mx-2 sm:mx-8 grid sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {normalizedProducts.map((item) => {
          const isFavorite = favorites.some(
            (f) => f.variation.id === item.variationId,
          );

          return (
            <Productcomponent
              key={item.id}
              images={item.images}
              title={item.title}
              price={item.price}
              badge={item.badge}
              onClick={() => navigate(`/items/${item.id}`)}
              isFavorite={isFavorite}
              onFavorite={() => handleFavorite(item)}
              onAddToCart={() => navigate(`/items/${item.id}`)}
              onShare={() => console.log("share", item.id)}
            />
          );
        })}
      </div>
    </Container>
  );
}

export default Category;
