import Breadcrumbs from "../components/Breadcrumbs";
import Section from "../components/Section";
import {
  sortOptions,
  classificationsEquivalent,
  categoriesEquivalent,
} from "../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect,  useCallback } from "react";
import Sort from "../components/Sort";

function Category() {
  const location = useLocation();
  const navigate = useNavigate();

  const firstSlash = location.pathname.indexOf("/");
  const secondSlash = location.pathname.lastIndexOf("/");
  const first = location.pathname.substring(firstSlash, secondSlash);
  const second = location.pathname.substring(secondSlash + 1);



  // Improved scroll handler with requestAnimationFrame for better performance


  // Memoize the navigation handler
  const handleNavigate = useCallback(
    (to) => {
      navigate(to);
    },
    [navigate],
  );

  return (
    <>

      <Sort  />

      {/* <Breadcrumbs
        items={[
          { label: "الرئيسية", route: "/" },
          { label: classificationsEquivalent[first], route: first },
          {
            label:
              categoriesEquivalent[location.pathname.substring(secondSlash)],
          },
        ]}
      /> */}

      {/* Navigation bar that becomes sticky on scroll */}
      

      {/* welcome  */}

      <Section
        title={categoriesEquivalent[`/${second}`] + " ( 200 )"}
        className=" -mt-6"
      >
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 gap-2 gap-y-10 justify-center text-center items-center">
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-2 items-start">
            <img
              className=" w-full h-[300px]"
              src="https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H57344.jpg?im=Resize,width=450"
              alt=""
            />
            <div className=" flex flex-col gap-y-2 items-start ms-2">
              <h2 className=" font-bold ">اسم المنتج</h2>
              <h2>300 ل.س</h2>
              <div className=" flex gap-x-2">
                <div className=" w-5 h-5 rounded-full bg-red-500"></div>
                <div className=" w-5 h-5 rounded-full bg-black"></div>
                <div className=" w-5 h-5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}

export default Category;
