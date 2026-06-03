import { Formik, Form } from "formik";
import FormikInput from "../components/Formikinput";
import notify from "../utils/toastr";
import { subscribeSchema } from "../utils/validator";
import SmartImage from "../components/SmartImage";
function Home() {
  const submit = async (values, { resetForm, setSubmitting }) => {
    try {
      notify("تم الاشتراك", "success");
      resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden w-full bg-gray-50 ">
        <div className="   p-4 md:p-8   grid   md:grid-cols-2  items-center gap-y-12  ">
          <div className="space-y-8 ">
            <span className="tag inline-flex rounded-full bg-cyan-100  py-2 text-xs  md:text-sm font-medium text-cyan-700">
              تشكيلة حديثة 2026
            </span>

            <div className="space-y-5">
              <h1 className="text-2xl font-black leading-tight text-gray-900 md:text-3xl">
                اكتشف الأناقة التي تعبّر عنك
              </h1>

              <p className="max-w-lg   text-sm md:text-base leading-8 text-gray-600">
                استكشف الأزياء الراقية، العطور، المكياج، والمستلزمات العصرية
                المصممة للأناقة والراحة.
              </p>
            </div>

            <div className="flex  gap-12">
              <div>
                <h3 className="text-xl sm:text-xl font-semibold">15K+</h3>
                <p className="text-cyan-600">زبون </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-xl font-semibold">500+</h3>
                <p className="text-cyan-600">منتجات مميزة</p>
              </div>

              <div>
                <h3 className="text-xl sm:text-xl font-semibold">4.9</h3>
                <p className="text-cyan-600">تقييم الزبائن</p>
              </div>
            </div>
          </div>
          <SmartImage
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
            alt="Fashion"
            className="h-[400px] md:h-[600px] w-full object-cover"
          />
        </div>
      </section>

      <section className="relative overflow-hidden w-full bg-gray-50 ">
        <div className="   p-4 md:p-8   grid   md:grid-cols-2  items-center gap-y-12  ">
          <div className="space-y-8 ">
            <span className="tag inline-flex rounded-full bg-cyan-100  py-2 text-xs  md:text-sm font-medium text-cyan-700">
              مجموعة العطور الفاخرة
            </span>

            <div className="space-y-5">
              <h1 className="text-2xl font-black leading-tight text-gray-900 md:text-3xl">
                اكتشف عطورًا حصرية مصممة للأناقة العصرية .
              </h1>
            </div>
          </div>
          <SmartImage
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f"
            alt="Fashion"
            className="h-[300px] md:h-[500px] w-full object-cover"
          />
        </div>
      </section>

 
      <section className=" w-[90%]   max-w-3xl mx-auto m-12  ">
        <div className=" mx-auto max-w-3xl rounded-lg bg-white py-8  md:p-12 shadow-lg ">
          <div className="space-y-3 text-center">
            <span className="tag inline-flex rounded-full bg-cyan-100  py-2 text-xs  md:text-sm font-medium text-cyan-700">كل ما هو عصري</span>

            <h2 className="text-xl font-black leading-tight text-gray-900 md:text-2xl">
              اشترك للحصول على أحدث المنتجات
            </h2>
            {/* 
            <p className=" text-base mt-2 leading-8 text-gray-600">
              احصل على تحديثات حول أحدث المنتجات{" "}
            </p> */}
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
                  <button type="submit" className="">
                    اشترك
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
