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
  const [searchFocused, setSearchFocused] = useState(false);

  const menuRef = useRef(null);

  // Still safe to use for clicking outside the drawer pane area
  useOutsideClick(menuRef, () => setOpen(false), open);

  const handleLogout = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setOpen(false);

    try {

      // https://phplaravel-1626350-6427540.cloudwaysapps.com

      await axios.post("https://phplaravel-1626350-6427540.cloudwaysapps.com/api/client/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(logout());
      localStorage.clear();
      notify("تم تسجيل الخروج", "success");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleUserClick = () => {
    if (user) {
      setOpen((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full bg-white py-6 relative">
      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        {!searchFocused && (
          <div className="px-2 flex justify-between items-center">
            <h1
              className="font-bold text-2xl text-cyan-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Logo
            </h1>

            <div className="flex gap-x-3 items-center">
              {/* User Dropdown/Drawer Wrapper */}
              <div>
                <button
                  type="button"
                  onClick={handleUserClick}
                  className="cursor-pointer block bg-transparent border-0 p-0"
                >
                  <CircleUser color="#0891b2" />
                </button>

                {/* Mobile Drawer Menu - Backdrop overlay option can go here */}
                {open && user && (
                  <div
                    ref={menuRef}
                    className="
                      fixed top-0 right-0 h-screen w-64
                      bg-white shadow-2xl border-l
                      z-50 flex flex-col justify-between
                      animate-in slide-in-from-right duration-200
                    "
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {/* Top Section */}
                    <div>
                      {/* Drawer Header */}
                      <div className="flex items-center justify-between p-4 border-b">
                        <span className="font-medium text-gray-700 text-base">
                          {user?.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-500"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Drawer Navigation Links */}
                      <div className="p-4 flex flex-col gap-y-4 text-sm">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                            navigate("/orders");
                          }}
                          className="text-right font-medium text-gray-600 hover:text-cyan-600 w-full block bg-transparent border-0 p-0 py-2"
                        >
                          طلباتي
                        </button>
                      </div>
                    </div>

                    {/* Bottom Action Section */}
                    <div className="p-4 border-t bg-gray-50">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-center border border-red-500 text-red-500 hover:bg-red-600 hover:text-white font-medium p-2.5 rounded transitions duration-150 block bg-transparent"
                      >
                        تسجيل الخروج
                      </button>
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
                    bg-white shadow-xl rounded-lg border
                    z-50
                  "
                  onMouseDown={(e) => e.stopPropagation()}
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                        navigate("/orders");
                      }}
                      className="text-right cursor-pointer name text-sm w-full block bg-transparent border-0 p-0"
                    >
                      طلباتي
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-center border border-red-500 text-red-500 hover:bg-red-600 hover:text-white cursor-pointer p-2 rounded block bg-transparent"
                    >
                      تسجيل الخروج
                    </button>
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
