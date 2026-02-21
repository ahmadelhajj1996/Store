function Product() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 py-8">
        <div className="relative flex flex-col gap-y-3 ">
          <img
            // className=" w-full h-[400px] md:w-[80%]  md:mx-auto "
            src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
            alt=""
          />
          {/* <div className=" flex justify-center items-center gap-x-3 w-full  md:w-[80%]  md:mx-auto">
            <img
              className="  h-[100px]  "
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <img
              className="  h-[100px]  "
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <img
              className="  h-[100px]  "
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
          </div> */}
        </div>
        <div className="px-0 flex flex-col gap-y-3 border-b-[1px]  border-cyan-600 pb-6 ">
          <div className="flex flex-col gap-y-3 ">
            <div className=" flex flex-col  gap-y-3 md:flex-row justify-between    ">
              <span className=" tracking-wider capitalize ">اسم المنتج</span>
              <span className=" tracking-wider capitalize "> 300 ل.س</span>
            </div>

            <span className=" tracking-wider capitalize ">وصف المنتج</span>
            <span className=" tracking-wider capitalize ">لون المنتج</span>
           
            <div className=" flex flex-col gap-y-3 md:flex-row  justify-center gap-x-6  mt-12    ">
                <button  className=" p-2 px-4 text-white w-3/4 mx-auto bg-cyan-600">اضافة الى سلة المشتريات</button>
                <button  className=" p-2 px-4 text-white w-3/4 mx-auto bg-cyan-600">اضافة الى المفضلة</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
