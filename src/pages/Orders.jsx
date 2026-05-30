<<<<<<< HEAD
import { useEffect, useMemo } from "react";
import { useGet } from "../hooks/useApi";
import { useSelector } from "react-redux";
import { Eye, LucideListOrdered } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopLoader from "../components/loaders/TopLoader";

function Orders() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const client_id = user?.id;

  const endpoint = useMemo(() => {
    return `orders?client_id=${client_id}`;
  }, [client_id]);

  const { data, isLoading, refetch } = useGet(["orders", client_id], endpoint, {
    enabled: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    select: (response) => response?.data?.data || [],
  });

  const normalized = useMemo(() => {
    if (!data) return [];
    return data.map((item) => ({
      id: item?.id,
      order_number: item?.order_number,
      count: item?.items?.length,
      subtotal: item?.subtotal,
    }));
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <TopLoader num={1} cols={1} height="32px" />
            <TopLoader num={1} cols={1} height="32px" />
          </div>
        </div>
      </div>
    );
  }

  if (normalized.length === 0) {
    return (
      <div className="mt-12 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="bordered mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <LucideListOrdered size={24} className="text-gray-400" />
          </div>

          <h2 className="name mb-2">لا توجد طلبات بعد</h2>

          <p className="text-gray-500">استمتع بالتسوق واطلب الان</p>

          <button onClick={() => navigate("/")} className="button mt-6 py-2">
            ابدأ التسوق
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // DATA STATE
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="name">طلباتي :</h1>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-sm flex flex-col gap-y-1">
          {/* HEADER */}
          <div className="grid grid-cols-4 items-center border-b p-4 text-xs bg-cyan-600 text-white">
            <p className="col-span-2">رقم الطلب</p>
            <p>المجموع</p>
            <p className="text-center">تفاصيل</p>
          </div>

          {/* ROWS */}
          {normalized.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 items-center border-b p-4 text-xs"
            >
              <p className="col-span-2">{item.order_number}</p>

              <p>{item.subtotal} ل.س</p>

              <Eye
                size={20}
                className="text-cyan-500 mx-auto cursor-pointer"
                onClick={() => navigate(`/orders/${item.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
=======
import { useEffect, useMemo } from "react";
import { useGet } from "../hooks/useApi";
import { useSelector } from "react-redux";
import { Eye, LucideListOrdered } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopLoader from "../components/loaders/TopLoader";

function Orders() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const client_id = user?.id;

  const endpoint = useMemo(() => {
    return `orders?client_id=${client_id}`;
  }, [client_id]);

  const { data, isLoading, refetch } = useGet(["orders", client_id], endpoint, {
    enabled: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    select: (response) => response?.data?.data || [],
  });

  const normalized = useMemo(() => {
    if (!data) return [];
    return data.map((item) => ({
      id: item?.id,
      order_number: item?.order_number,
      count: item?.items?.length,
      subtotal: item?.subtotal,
    }));
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <TopLoader num={1} cols={1} height="32px" />
            <TopLoader num={1} cols={1} height="32px" />
          </div>
        </div>
      </div>
    );
  }

  if (normalized.length === 0) {
    return (
      <div className="mt-12 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="bordered mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <LucideListOrdered size={24} className="text-gray-400" />
          </div>

          <h2 className="name mb-2">لا توجد طلبات بعد</h2>

          <p className="text-gray-500">استمتع بالتسوق واطلب الان</p>

          <button onClick={() => navigate("/")} className="button mt-6 py-2">
            ابدأ التسوق
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // DATA STATE
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="name">طلباتي :</h1>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-sm flex flex-col gap-y-1">
          {/* HEADER */}
          <div className="grid grid-cols-4 items-center border-b p-4 text-xs bg-cyan-600 text-white">
            <p className="col-span-2">رقم الطلب</p>
            <p>المجموع</p>
            <p className="text-center">تفاصيل</p>
          </div>

          {/* ROWS */}
          {normalized.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 items-center border-b p-4 text-xs"
            >
              <p className="col-span-2">{item.order_number}</p>

              <p>{item.subtotal} ل.س</p>

              <Eye
                size={20}
                className="text-cyan-500 mx-auto cursor-pointer"
                onClick={() => navigate(`/orders/${item.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
