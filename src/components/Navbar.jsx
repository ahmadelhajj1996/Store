import { useNavigate, Link } from "react-router-dom";
import { CircleUser, ShoppingCart, Heart, X } from "lucide-react";
import axios from "axios";
import SearchBar from "./search/SearchBar";
import notify from "../utils/toastr";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { logout } from "../store/authSlice";
import useOutsideClick from "../hooks/useOutsideClick";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  // ✅ NEW
  const [searchFocused, setSearchFocused] = useState(false);

  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setOpen(false), open);

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/client/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(logout());
      localStorage.clear();

      notify("تم تسجيل الخروج", "success");
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setOpen(false);
    }
  };

  const handleUserClick = () => {
    if (user) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full bg-white py-6 relative">
      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        {/* ✅ HIDE WHEN SEARCHING */}
        {!searchFocused && (
          <div className="px-2 flex justify-between">
            <h1
              className="font-bold text-2xl text-cyan-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Logo
            </h1>

            <div className="flex gap-x-3 items-center">
              {/* USER ICON */}
              <div ref={menuRef} className="relative">
                <div
                  onClick={handleUserClick}
                  className="cursor-pointer"
                >
                  <CircleUser color="#0891b2" />
                </div>

                {open && user && (
                  <div
                    className="
                      absolute -end-20 mt-4 w-56
                      bg-white shadow-xl rounded-lg border
                      z-50
                    "
                  >
                    <div className="p-3 flex flex-col gap-y-4 text-sm">
                      <div
                        onClick={() => {
                          navigate("/orders");
                          setOpen(false);
                        }}
                        className="cursor-pointer hover:text-cyan-600 w-full"
                      >
                        طلباتي
                      </div>

                      <div
                        onClick={handleLogout}
                        className="text-center border border-red-500 text-red-500 hover:bg-red-600 hover:text-white cursor-pointer p-2 rounded"
                      >
                        تسجيل الخروج
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/cart">
                <ShoppingCart size={24} color="#0891b2" />
              </Link>

              <Link to="/favorites">
                <Heart color="#0891b2" />
              </Link>
            </div>
          </div>
        )}

        {/* ✅ SEARCHBAR */}
        <div className={`px-3 ${searchFocused ? "pt-0" : "pt-4"}`}>
          <SearchBar onFocusChange={setSearchFocused} />
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex">
        <div className="px-8 grid grid-cols-6 items-center w-full">
          <h1
            className="font-bold text-2xl text-cyan-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Logo
          </h1>

          <div className="col-span-4 w-3/4 mx-auto">
            <SearchBar />
          </div>

          <div className="flex justify-end gap-x-3 items-center">
            {/* USER ICON */}
            <div ref={menuRef} className="relative">
              <div
                onClick={handleUserClick}
                className="cursor-pointer"
              >
                <CircleUser color="#0891b2" />
              </div>

              {open && user && (
                <div
                  className="
                    absolute end-0 mt-6 w-64
                    bg-white shadow-xl rounded-lg bordered
                    z-50
                  "
                >
                  <div className="flex items-center justify-between p-3 border-b">
                    <span className="name text-base">
                      {user?.name}
                    </span>

                    <button
                      onClick={() => setOpen(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="p-3 flex flex-col gap-y-6 text-sm">
                    <div
                      onClick={() => {
                        navigate("/orders");
                        setOpen(false);
                      }}
                      className="cursor-pointer name text-sm"
                    >
                      طلباتي
                    </div>

                    <div
                      onClick={handleLogout}
                      className="text-center border border-red-500 text-red-500 hover:bg-red-600 hover:text-white cursor-pointer p-2 rounded"
                    >
                      تسجيل الخروج
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/cart">
              <ShoppingCart size={24} color="#0891b2" />
            </Link>

            <Link to="/favorites">
              <Heart color="#0891b2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;