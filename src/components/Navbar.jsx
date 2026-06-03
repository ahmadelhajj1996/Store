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

  // ✅ Pass the active target explicitly to stop accidental global tracking
  useOutsideClick(menuRef, () => setOpen(false), open);

  // ✅ Fixed: Safe Mobile/Desktop Navigation Handler for Menu Links
  const handleNavigation = (path, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // 1. Close the menu immediately so the UI doesn't look stuck
    setOpen(false);
    // 2. Safely route to the destination page
    navigate(path);
  };

  // ✅ Best Practice: Defensively process the action synchronously to avoid mobile component drops
  const handleLogout = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Cache the active token securely before modifying UI layouts
    const activeToken = token;

    try {
      // 1. Immediately clean up local storage and global app state
      dispatch(logout());
      localStorage.clear();
      setOpen(false);
      notify("تم تسجيل الخروج", "success");
      navigate("/"); // Redirect safely to complete the route updates
    } catch (localError) {
      console.error("Local UI cleanup failed:", localError);
    }

    // 2. Fire the network cleaning task independently.
    // Detached execution preserves backend session state regardless of device unmount cycles.
    if (activeToken) {
      try {
        await axios.post("http://127.0.0.1:8000/api/client/logout", null, {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        });
      } catch (apiError) {
        console.error("Backend session clearance failed:", apiError.message);
      }
    }
  };

  const handleUserClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (user) {
      setOpen((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full bg-white py-6 relative">
      {/* ================= MOBILE ================= */}
      <div
        className="md:hidden"
        onClick={() => {
          if (searchFocused) setSearchFocused(false);
        }}
      >
        {!searchFocused && (
          <div className="px-2 flex justify-between items-center">
            <h1
              className="font-bold text-2xl text-cyan-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              LB
            </h1>

            <div className="flex gap-x-3 items-center">
              <div className="relative">
                {/* Fixed semantic action button container for proper tap surfaces */}
                <button
                  type="button"
                  onClick={handleUserClick}
                  className="cursor-pointer block bg-transparent border-0 p-1 rounded-full active:bg-gray-100"
                >
                  <CircleUser color="#0891b2" />
                </button>
                {open && user && (
                  <div
                    ref={menuRef}
                    className="
      fixed top-0 right-0 h-screen w-64
      bg-white shadow-2xl border-l
      z-50 flex flex-col justify-between  {/* This controls the top/bottom split */}
      animate-in slide-in-from-right duration-200
    "
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* --- TOP CONTAINER --- */}
                    <div>
                      <div className="flex items-center justify-between p-4 border-b">
                        <span className="font-medium text-gray-700 text-base truncate max-w-[180px]">
                          {user?.name}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                          }}
                          className="p-1 hover:bg-gray-100 rounded text-gray-500 active:bg-gray-200"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="p-4 flex flex-col gap-y-4 text-sm">
                        <button
                          type="button"
                          onClick={(e) => handleNavigation("/orders", e)}
                          onTouchEnd={(e) => handleNavigation("/orders", e)}
                          className="text-right font-medium text-gray-600 hover:text-cyan-600 w-full block bg-transparent border-0 p-0 py-2 active:text-cyan-700 cursor-pointer"
                        >
                          طلباتي
                        </button>
                      </div>
                    </div>{" "}
                    {/* ✅ Correctly closed top container right here */}
                    {/* --- BOTTOM CONTAINER --- */}
                    <div className="p-4 border-t bg-gray-50">
                      {" "}
                      {/* 💡 Also fixed "-p-4" typo to "p-4" */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        onTouchEnd={handleLogout}
                        className="w-full text-center border border-red-500 text-red-500 hover:bg-red-600 hover:text-white font-medium p-2.5 rounded transition-colors duration-150 block bg-white active:bg-red-50 cursor-pointer"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/cart" className="p-1">
                <ShoppingCart size={24} color="#0891b2" />
              </Link>

              <Link to="/favorites" className="p-1">
                <Heart color="#0891b2" />
              </Link>
            </div>
          </div>
        )}

        {/* SEARCHBAR CONTAINER */}
        <div
          className={`px-3 ${searchFocused ? "pt-0" : "pt-4"}`}
          onClick={(e) => e.stopPropagation()}
        >
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
            LB
          </h1>

          <div className="col-span-4 w-3/4 mx-auto">
            <SearchBar onFocusChange={setSearchFocused} />
          </div>

          <div className="flex justify-end gap-x-3 items-center">
            <div className="relative">
              <button
                type="button"
                onClick={handleUserClick}
                className="cursor-pointer block bg-transparent border-0 p-1 rounded-full hover:bg-gray-50"
              >
                <CircleUser color="#0891b2" />
              </button>

              {open && user && (
                <div
                  ref={menuRef}
                  className="
                    absolute left-0 mt-2 w-56
                    bg-white shadow-xl border rounded-lg
                    z-50 flex flex-col justify-between
                    animate-in fade-in zoom-in-95 duration-100
                  "
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <div className="flex items-center justify-between p-3 border-b">
                      <span className="font-medium text-gray-700 text-sm truncate max-w-[140px]">
                        {user?.name}
                      </span>
                    </div>

                    <div className="p-3 flex flex-col gap-y-2 text-sm">
                      {/* ✅ Fixed: Unified with navigation controller strategy */}
                      <button
                        type="button"
                        onClick={(e) => handleNavigation("/orders", e)}
                        className="text-right font-medium text-gray-600 hover:text-cyan-600 w-full block bg-transparent border-0 p-0 py-1.5 cursor-pointer"
                      >
                        طلباتي
                      </button>
                    </div>
                  </div>

                  <div className="p-3 border-t bg-gray-50 rounded-b-lg">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-center border border-red-500 text-red-500 hover:bg-red-600 hover:text-white font-medium p-2 rounded transition-colors duration-150 block bg-white cursor-pointer"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link to="/cart" className="p-1">
              <ShoppingCart size={24} color="#0891b2" />
            </Link>

            <Link to="/favorites" className="p-1">
              <Heart color="#0891b2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
