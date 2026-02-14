import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  CircleUser,
  ShoppingCart,
  CircleDollarSign,
  Globe,
  Heart,
} from "lucide-react";

 
function Navbar() {
  const location = useLocation();
  const [message, setMessage] = useState("");

  const bool = location.pathname == '/'

  const changeInput = (e) => {
        const value = e.target.value;
        // !searchOpen ? setSearchOpen(true) : '';
        setMessage(value);
        // handleFocus
        // const matchedItems = items.filter(category =>
        //     category.toLowerCase().includes(value.toLowerCase())
        // );
        // setFilteredItems(matchedItems);
    }


  return (
    <>
      <div className="w-full bg-white  py-6  ">
        <div className="sm:hidden">
          <div className= {`px-2 min-[300px]:px-4 flex justify-between`}>
            <h1 className=" font-bold text-2xl -mt-1 text-cyan-600">Logo</h1>

            <div className=" flex justify-between gap-x-3 min-[300px]:gap-x-4">
              <CircleUser color="#0891b2" />
              <ShoppingCart size={24} color="#0891b2" />
              <Heart color="#0891b2" />
            </div>
          </div>
          {/* {
            bool && 
                      <div className="flex justify-between px-6  py-1 placeholder:text-cyan-600 text-xs min-[300px]:text-sm  mx-4   mt-6   rounded-full bordered ">
            <input
              type="text"
              placeholder="ابحث عن منتجك المفضل"
              className="px-0 py-0 text-sm  font-lighter   w-full border-0 p-2 focus:outline-none focus:ring-0  focus:border-blue-600 placeholder:text-cyan-600 "
            />
            <div className="cursor-pointer   text-xl text-cyan-600" onClick={() => { setMessage(''); }}>x</div>
          </div>
          } */}

        </div>

        <div className=" hidden sm:flex ">
          <div className=" px-8 flex justify-between items-center w-full  ">
            <h1 className=" font-bold text-2xl -mt-1 text-cyan-600">Logo</h1>

            <div className="flex justify-between px-6  py-1 placeholder:text-cyan-600 text-xs min-[300px]:text-sm   w-[60%] md:w-[40%]      rounded-full bordered ">
              <input
                value={message}
                onChange={changeInput}
                type="text"
                placeholder="ابحث عن منتجك المفضل"
                className="px-0 py-0 text-sm  font-lighter   w-full border-0 p-2 focus:outline-none focus:ring-0  focus:border-blue-600 placeholder:text-cyan-600 "
              />
              <div className="cursor-pointer text-xl text-cyan-600" onClick={() => { setMessage(''); }}>x</div>
            </div>
            <div className=" flex justify-between gap-x-3 min-[300px]:gap-x-4">
              <CircleUser color="#0891b2" />
              <ShoppingCart size={24} color="#0891b2" />
              <Heart color="#0891b2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
