import Similar from "../components/Similar";
import Empty from "../components/Empty";
import Section from "../components/Section";
function Cart() {
  const count = 1;

  const products = Array(5)
    .fill(null)
    .map((_, index) => ({
      id: index,
      name: `منتج ${index + 1}`,
      description: `وصف  المنتج  ${index + 1} ........... `,
      price: "300",
      stock: 10,
    }));
  return (
    <>
      <Section title="سلة المنتجات المفضلة">
        {count > 0 ? (
          <>
            <div className=" mx-1 md:mx-auto my-8 md:max-w-4xl flex flex-col gap-y-4 ">
              <div className="   flex flex-col  bordered divide-y-[1px] divide-cyan-600">
                <div className=" grid grid-cols-7 gap-x-0 relative ">
                  <img
                    className="h-full w-[125px] col-span-2 md:col-span-1"
                    src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
                  />
                  <div className="flex flex-col gap-y-4 col-span-3 md:col-span-4  p-2  ">
                    <div className=" text-xs flex flex-col gap-y-2   justify-start   md:flex-row  md:justify-between md:gap-y-2 ">
                      <p className=" font-semibold">اسم المنتج</p>
                      <div className="flex flex-col gap-y-4">
                        <span className="tracking-wider capitalize">
                          السعر : 300 ل.س
                        </span>
                      </div>
                    </div>
                    <div className="text-xs flex flex-col gap-y-2   justify-start   md:flex-row  md:justify-between md:gap-y-2">
                      <button
                        onClick={() => navigate("/")}
                        className="w-[200px] mt-4 p-2 px-4 text-white   bg-cyan-600"
                      >
                        اضافة الى سلة الشراء
                      </button>
                    </div>
                    <div className=" absolute top-1 end-1 text-sm cursor-pointer  text-rose-500 hover:text-red-600 underline underline-offset-8">
                      حذف
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Similar products={products} title={"قد يعجبك أيضا"} />
            <Similar products={products} title={"الناس أيضا تطلب"} />
          </>
        ) : (
          <Empty title=" سلة المنتجات المفضلة" />
        )}
      </Section>
    </>
  );
}

export default Cart;
