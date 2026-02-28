import { useState } from "react";

function Product() {
  const [full, setFull] = useState(false);
  return (
    <>
      {full && <>
                <div className="">
                    <p>X</p>
                </div>
              </>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 py-4">
        <div className="relative flex flex-col gap-y-3 ">
          <img
            className=" cursor-pointer   h-[300px] w-full  sm:h-[400px] object-fill md:w-[75%] mx-auto "
            src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
            alt=""
            onClick={() => {setFull(true) }  }
          />
        </div>
        <div className="flex flex-col gap-y-3 border-b-[1px]  border-cyan-600 pb-6 p-2  ">
          <div className="flex flex-col gap-y-4 ">
            <div className=" flex gap-x-2 items-center ">
              <span className=" tracking-wider capitalize text-xs sm:text-sm font-semibold ">
                {" "}
                رمز المنتج :
              </span>
              <span className=" tracking-wider capitalize text-xs sm:text-sm  ">
                sku_000001
              </span>
            </div>
            <div className=" flex gap-x-2 items-center">
              <span className=" tracking-wider capitalize text-xs sm:text-sm font-semibold ">
                {" "}
                اسم المنتج :
              </span>
              <span className=" tracking-wider capitalize text-xs sm:text-sm  ">
                اسم المنتج
              </span>
            </div>
            <div className=" flex gap-x-2 items-center">
              <span className=" tracking-wider capitalize text-xs sm:text-sm font-semibold ">
                {" "}
                وصف المنتج :
              </span>
              <span className=" tracking-wider capitalize text-xs sm:text-sm  ">
                وصف المنتج
              </span>
            </div>
            <div className=" flex gap-x-2 items-center">
              <span className=" tracking-wider capitalize text-xs sm:text-sm font-semibold ">
                {" "}
                الموديل :
              </span>
              <span className=" tracking-wider capitalize text-xs sm:text-sm  ">
                موديل المنتج
              </span>
            </div>
            <div className=" flex gap-x-2 items-center">
              <span className=" tracking-wider capitalize text-xs sm:text-sm font-semibold ">
                {" "}
                سعر المنتج :
              </span>
              <span className=" tracking-wider capitalize text-xs sm:text-sm  ">
                300 ل.س
              </span>
            </div>
            <div className=" flex gap-x-2 items-center">
              <span className=" tracking-wider capitalize text-xs sm:text-sm font-semibold ">
                {" "}
                ملاحظات :
              </span>
              <span className=" tracking-wider capitalize text-xs sm:text-sm font-semibold ">
                {/* ---------- */} ___________
              </span>
            </div>
          </div>
          <div className="   grid min-[500px]:grid-cols-2 gap-3 gap-x-4   justify-center    mt-16   ">
            <button
              className=" p-2 px-4 text-white   bg-cyan-600 
                "
            >
              اضافة الى سلة المشتريات
            </button>
            <button
              className=" p-2 px-4 text-white   bg-cyan-600 
                "
            >
              اضافة الى المفضلة 🤍
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
