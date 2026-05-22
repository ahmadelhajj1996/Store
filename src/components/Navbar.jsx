import { useNavigate, Link } from "react-router-dom";
import { CircleUser, ShoppingCart, Heart, X } from "lucide-react";
import axios from "axios";
import notify from "../utils/toastr";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout  } from "../store/authSlice";
function Navbar() {
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    user ? setOpen(!open) : navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/client/logout", 
        null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(logout());

      localStorage.clear();

      navigate("/login");
      notify("تم تسجيل الخروج ", "success");
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      close();
    }
  };

  return (
    <>
      <div className="w-full bg-white  py-6  ">
        <div className="sm:hidden">
          <div className={`px-2 sm:px-4 flex justify-between`}>
            <h1
              className=" font-bold text-2xl -mt-1 text-cyan-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Logo
            </h1>

            <div className=" flex justify-between gap-x-3 sm:gap-x-4">
              {/* <Link to={"search"}>
                <Search color="#0891b2" />
              </Link> */}

              <div className=" cursor-pointer" onClick={handleNavigate}>
                <CircleUser color="#0891b2" />
              </div>

              <Link to={"cart"}>
                <ShoppingCart size={24} color="#0891b2" />
              </Link>
              <Link to={"favorites"}>
                <Heart color="#0891b2" />
              </Link>
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
            <h1
              className=" font-bold text-2xl -mt-1 text-cyan-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              {" "}
              Logo
            </h1>

            {/* <div className="flex justify-between px-6  py-1 placeholder:text-cyan-600 text-xs sm:text-sm   w-[60%] md:w-[40%]      rounded-full bordered ">
              <input
                value={message}
                onChange={changeInput}
                type="text"
                placeholder="ابحث عن منتجك المفضل"
                className="px-0 py-0 text-sm  font-lighter   w-full border-0 p-2 focus:outline-none focus:ring-0  focus:border-blue-600 placeholder:text-cyan-600 "
              />
              <div
                className="cursor-pointer text-xl text-cyan-600"
                onClick={() => {
                  setMessage("");
                }}
              >
                x
              </div>
            </div> */}
            <div className=" flex justify-between gap-x-3 sm:gap-x-4">
              <div className=" cursor-pointer" onClick={handleNavigate}>
                <CircleUser color="#0891b2" />
              </div>

              <Link to={"cart"}>
                <ShoppingCart size={24} color="#0891b2" />
              </Link>
              <Link to={"favorites"}>
                <Heart color="#0891b2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <>
          {open && <div className="fixed inset-0  z-40 bg-black/40" />}

          {/* DRAWER */}
          <div
            className={`
          fixed z-50 top-30 sm:top-32 h-full w-[240px]
          bg-white shadow-xl transition-transform duration-300

          ${open ? "translate-x-0" : "translate-x-full"}

          right-0 sm:left-0 sm:right-auto
          sm:${open ? "translate-x-0" : "-translate-x-full"}
        `}
          >
            <div className="flex items-center justify-between p-3 bordered border-t-0 border-x-0">
              <span className=" name text-base">{user?.name} </span>

              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3  overflow-y-auto  flex flex-col gap-y-6 py-6 text-sm ">
              <div
                onClick={() => {
                  navigate("/orders");
                  setOpen(false);
                }}
                className=" cursor-pointer"
              >
                طلباتي
              </div>
              <div
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className=" button text-center border-red-500 hover:bg-red-600 hover:text-white text-red-500 hover: cursor-pointer"
              >
                تسجيل الخروج
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
