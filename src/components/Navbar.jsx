import { useNavigate, Link } from "react-router-dom";
import { CircleUser, ShoppingCart, Heart, X } from "lucide-react";
import axios from "axios";
import notify from "../utils/toastr";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../store/authSlice";

/* ---------------- CONFIG ---------------- */
const API_BASE =  "https://phplaravel-1626350-6427540.cloudwaysapps.com/api";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await axios.post(
        `${API_BASE}/client/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(logout());
      localStorage.clear();

      setOpen(false);

      notify("تم تسجيل الخروج", "success");

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error?.response?.data || error.message);

      // still force logout locally for safety
      dispatch(logout());
      localStorage.clear();
      setOpen(false);
      navigate("/login", { replace: true });

      notify("حدث خطأ أثناء تسجيل الخروج", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-white py-6">
        {/* ---------------- MOBILE ---------------- */}
        <div className="sm:hidden">
          <div className="px-2 sm:px-4 flex justify-between">
            <h1
              className="font-bold text-2xl -mt-1 text-cyan-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Logo
            </h1>

            <div className="flex gap-x-3">
              <div className="cursor-pointer" onClick={handleNavigate}>
                <CircleUser color="#0891b2" />
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

        {/* ---------------- DESKTOP ---------------- */}
        <div className="hidden sm:flex">
          <div className="px-8 flex justify-between items-center w-full">
            <h1
              className="font-bold text-2xl text-cyan-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Logo
            </h1>

            <div className="flex gap-x-4">
              <div className="cursor-pointer" onClick={handleNavigate}>
                <CircleUser color="#0891b2" />
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

      {/* ---------------- DRAWER ---------------- */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div
            className={`
              fixed z-50 top-30 sm:top-32 h-full w-[240px]
              bg-white shadow-xl transition-transform duration-300
              end-0
              ${open ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <div className="flex items-center justify-between p-3 border-b">
              <span className="text-base">{user?.name}</span>

              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 flex flex-col gap-y-6 py-6 text-sm">
              <div
                onClick={() => {
                  navigate("/orders");
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                طلباتي
              </div>

              <button
                disabled={loading}
                onClick={handleLogout}
                className="border border-red-500 text-red-500 hover:bg-red-600 hover:text-white py-2 rounded transition disabled:opacity-50"
              >
                {loading ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
