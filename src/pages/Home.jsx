// import { useMemo } from "react";
// import { useGet } from "../hooks/useApi";

import { Formik, Form } from "formik";
import FormikInput from "../components/Formikinput";
// import Categorycomponent from "../components/Categorycomponent";
// import Productcomponent from "../components/Productcomponent";
import notify from "../utils/toastr";
import { subscribeSchema } from "../utils/validator";
import Container from "../components/Container";
import SmartImage from "../components/SmartImage";
function Home() {
  // const { data: categories = [] } = useGet(["categories"], "categories", {
  //   staleTime: Infinity, // never refetch automatically
  //   gcTime: Infinity, // never remove from cache

  //   select: (response) =>
  //     response?.data?.filter((item) => item.parent_id == null) || [],
  // });

  // const data = useMemo(() => {
  //   if (!categories) return [];
  //   return categories.map((item) => ({
  //     id: item?.id,
  //     name: item?.name,
  //     image: item?.image_url,
  //   }));
  // }, [categories]);

  // const { data: products = [] } = useGet(
  //   ["featured_products"],
  //   "featured_products",
  //   {
  //     keepPreviousData: true,
  //     staleTime: 1000 * 60 * 5,
  //     // .slice(0, 5)
  //     select: (res) => res?.data?.data || [],
  //   },
  // );

  // const normalizedProducts = useMemo(() => {
  //   if (!products?.length) return [];

  //   return products.map((product) => {
  //     const firstVariation = product?.variations?.[0] || null;

  //     const images =
  //       firstVariation?.images?.length > 0
  //         ? firstVariation.images.map((img) => img.path_url)
  //         : product?.featured_image_url
  //           ? [product.featured_image_url]
  //           : ["/placeholder.png"];

  //     return {
  //       id: product.id,
  //       title: product.name,
  //       price: Number(firstVariation?.price || 0),
  //       oldPrice: firstVariation?.price ? Number(firstVariation.price) + 20 : 0,
  //       quantity: firstVariation?.quantity || 0,
  //       images,
  //       variationId: firstVariation?.id || null,
  //       attributes:
  //         firstVariation?.attributes?.map((attr) => ({
  //           name: attr?.option?.attribute?.name,
  //           value: attr?.option?.value,
  //         })) || [],
  //       badge: product?.view_count > 100 ? "#1 Most viewed" : "Popular",
  //       isFeatured: !!product?.is_featured,
  //     };
  //   });
  // }, [products]);

  const submit = async (values, { resetForm, setSubmitting }) => {
    try {
      notify("تم الاشتراك", "success");

      resetForm();
    } catch (error) {
      console.log(error);

      // notify("رقم الهاتف او كلمة المرور غير صحيحات", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gray-50 w-full">
        <div className="container mx-auto grid min-h-[650px] items-center gap-10   sm:grid-cols-2">

          <div className="space-y-8">
            <span className="tag inline-flex rounded-full bg-cyan-100  py-2 text-sm font-medium text-cyan-700">
              تشكيلة حديثة 2026
            </span>

            <div className="space-y-5">
              <h1 className="text-3xl font-black leading-tight text-gray-900 md:text-4xl">
                اكتشف الأناقة التي تعبّر عنك
              </h1>

              <p className="max-w-lg text-lg leading-8 text-gray-600">
                استكشف الأزياء الراقية، العطور، المكياج، والمستلزمات العصرية
                المصممة للأناقة والراحة.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="button w-full sm:w-1/2">
                تسوق الآن استكشف المجموعة
              </button>
            </div>

            <div className="flex  gap-10 pt-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">15K+</h3>
                <p className="text-gray-500">زبون </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">500+</h3>
                <p className="text-gray-500">منتجات مميزة</p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">4.9</h3>
                <p className="text-gray-500">تقييم الزبائن</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <SmartImage
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
              alt="Fashion"
              className="h-[650px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* <section className="">
        <div className="container mx-auto space-y-10 ">
          <div className="flex items-center justify-between">
            <span className="name">المنتجات المميزة</span>
            <button
              className="hidden md:block text-cyan-600 font-medium"
              onClick={() => navigate("/featured")}
            >
              عرض الكل
            </button>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {normalizedProducts.map((item) => {
              return (
                <Productcomponent
                  key={item.id}
                  images={item.images}
                  title={item.title}
                  price={item.price}
                  badge={item.badge}
                  onClick={() => navigate(`/items/${item.id}`)}
                  //  isFavorite={isFavorite}
                  //  onFavorite={() => handleFavorite(item)}
                  //  onAddToCart={() => navigate(`/items/${item.id}`)}
                  withinf0={false}
                  onShare={() => console.log("share", item.id)}
                />
              );
            })}
          </div>
        </div>
      </section> */}

      {/* <section className="">
        <div className="container mx-auto ">
          <div className="mb-10 flex items-center justify-between">
            <span className="name">تسوق حسب الفئة</span>
          </div>

          <div className="flex items-start justify-between gap-4 overflow-x-auto">
            {data.map((category) => (
              <Categorycomponent key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section> */}

      <section className="">
        <div className="container mx-auto ">
          <div className="grid items-center gap-10 overflow-hidden rounded-lg bg-gray-50 text-white lg:grid-cols-2">
            <div className="space-y-6 p-10 lg:p-16">
              <span className="tag inline-flex rounded-full bg-cyan-100  py-2 text-sm font-medium text-cyan-700">
                مجموعة العطور الفاخرة
              </span>

              <div className="space-y-5">
                <h1 className="text-3xl font-black leading-tight text-gray-900 md:text-4xl">
                  اكتشف عطورًا حصرية مصممة للأناقة العصرية والفخامة الخالدة.
                </h1>
              </div>

              <button className="button w-full sm:w-1/2">تسوق العطور</button>
            </div>

            <div className="overflow-hidden rounded-lg">
              <SmartImage
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f"
                alt="Fashion"
                className="h-[650px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 ">
        <div className="container mx-auto ">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-xl md:p-14">
            <div className="space-y-5 text-center">
              <span className=" tag ">كل ما هو عصري</span>

              <h2 className="text-3xl font-black leading-tight text-gray-900 md:text-4xl">
                اشترك للحصول على أحدث المنتجات
              </h2>

              <p className=" text-lg leading-8 text-gray-600">
                احصل على تحديثات حول أحدث المنتجات{" "}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Formik
                initialValues={{ phone: "" }}
                validationSchema={subscribeSchema}
                onSubmit={submit}
              >
                <Form className=" flex flex-1 gap-x-3 ">
                  <FormikInput
                    name="phone"
                    type="number"
                    label="رقم الهاتف"
                    placeholder=""
                  />

                  <div className=" rounded-lg text-cyan-600 bg-white  bordered pt-1.5 sm:pt-[3px] mt-8  transition  active:scale-[0.98] text-sm     md:text-lg  w-1/4 py-0 text-center">
                    <button type="submit" className=" ">
                      اشترك
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
