import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Formik, Form } from "formik";
import FormikInput from "../components/Formikinput";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Tabs from "../components/Tabs";
import { Eye } from "lucide-react";

import { useTab } from "../hooks/useTab";
import { setCredentials } from "../store/authSlice";
import notify from "../utils/toastr";
import { loginSchema, registerSchema } from "../utils/validator";
import { LucideListOrdered } from "lucide-react";
import { useGet } from "../hooks/useApi";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  const { currentTab, setTab } = useTab("login");

  useEffect(() => {
    localStorage.setItem("footer", "no");

    return () => {
      localStorage.removeItem("footer");
    };
  }, []);

  const tabs = [
    { key: "login", label: "تسجيل الدخول" },
    { key: "register", label: "انشاء حساب" },
  ];

  const loginInitialValues = {
    phone: "",
    password: "",
  };

  const registerInitialValues = {
    name: "",
    phone: "",
    password: "",
    password_confirmation: "",
  };

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(
        // "https://phplaravel-1626350-6427540.cloudwaysapps.com/api/client/login",
        "http://127.0.0.1:8000/api/client/login",

        values,
      );

      dispatch(
        setCredentials({
          token: response.data.access_token,
          user: response.data.user,
        }),
      );

      notify("تم تسجيل الدخول", "success");

      resetForm();

      // redirect back to previous page
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);

      notify("رقم الهاتف او كلمة المرور غير صحيحة", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(
        // "https://phplaravel-1626350-6427540.cloudwaysapps.com/api/client/register",
        "http://127.0.0.1:8000/api/client/register",
        values,
      );

      dispatch(
        setCredentials({
          token: response.data.access_token,
          user: response.data.user,
        }),
      );

      notify("تم انشاء الحساب بنجاح", "success");

      resetForm();

      // redirect back to previous page
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);

      notify("حدث خطأ اثناء انشاء الحساب", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const client_id = user?.id;
  const endpoint = useMemo(() => {
    return `orders?client_id=${client_id}`;
  }, [client_id]);

  const { data, isFetched } = useGet(["orders", client_id], endpoint, {
    enabled: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    select: (response) => response?.data?.data || [],
  });

  const normalized = useMemo(() => {
    if (!data) return null;

    return data.map((item) => {
      return {
        id: item?.id,
        order_number: item?.order_number,
        count: item?.items?.length,
        subtotal: item?.subtotal,
      };
    });
  }, [data, isFetched]);

  console.log(normalized);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/client/logout",
        
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      localStorage.clear();
      navigate("/");
      notify("تم تسجيل الخروج ", "success");
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      close();
    }
  };

  
  if (!token) {
    return (
      <>
        <div className="flex flex-col mt-12 px-4 sm:px-6">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
            {/* Background */}
            <div className="absolute inset-0 bg-cyan-600 shadow-xl rounded-2xl"></div>

            {/* Content */}
            <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden">
              {/* Tabs */}
              <Tabs tabs={tabs} currentTab={currentTab} onChange={setTab} />

              <div className="p-6 sm:p-10">
                {/* LOGIN */}
                {currentTab === "login" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h1 className="name">تسجيل الدخول</h1>

                      <p className="text-sm text-gray-500 mt-2">
                        قم بتسجيل الدخول للوصول إلى حسابك
                      </p>
                    </div>

                    <Formik
                      initialValues={loginInitialValues}
                      validationSchema={loginSchema}
                      onSubmit={handleLogin}
                    >
                      {({ isSubmitting }) => (
                        <Form className="space-y-5">
                          <FormikInput
                            name="phone"
                            label="رقم الهاتف"
                            type="number"
                          />

                          <FormikInput
                            name="password"
                            type="password"
                            label="كلمة المرور"
                          />

                          <button
                            type="submit"
                            className="button disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? "جاري تسجيل الدخول..."
                              : "تسجيل الدخول"}
                          </button>
                        </Form>
                      )}
                    </Formik>

                    <div className="text-sm text-center">
                      ليس لديك حساب ؟
                      <button
                        type="button"
                        onClick={() => setTab("register")}
                        className="text-cyan-600 underline underline-offset-4 mr-1"
                      >
                        انشاء حساب
                      </button>
                    </div>
                  </div>
                )}

                {/* REGISTER */}
                {currentTab === "register" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h1 className="name">انشاء حساب</h1>

                      <p className="text-sm text-gray-500 mt-2">
                        قم بإنشاء حساب جديد للمتابعة
                      </p>
                    </div>

                    <Formik
                      initialValues={registerInitialValues}
                      validationSchema={registerSchema}
                      onSubmit={handleRegister}
                    >
                      {({ isSubmitting }) => (
                        <Form className="space-y-5">
                          <FormikInput name="name" label="الاسم الكامل" />

                          <FormikInput
                            name="phone"
                            label="رقم الهاتف"
                            type="number"
                          />

                          <FormikInput
                            name="password"
                            type="password"
                            label="كلمة المرور"
                          />

                          <FormikInput
                            name="password_confirmation"
                            type="password"
                            label="تأكيد كلمة المرور"
                          />

                          <button
                            type="submit"
                            className="button disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? "جاري انشاء الحساب..."
                              : "انشاء حساب"}
                          </button>
                        </Form>
                      )}
                    </Formik>

                    <div className="text-sm text-center">
                      لديك حساب بالفعل ؟
                      <button
                        type="button"
                        onClick={() => setTab("login")}
                        className="text-cyan-600 underline underline-offset-4 mr-1"
                      >
                        تسجيل الدخول
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (token) {

    if (normalized?.length === 0) {
      return (
        <div className="mt-12 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="bordered mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <LucideListOrdered size={24} className="text-gray-400" />
            </div>

            <h2 className="name mb-2">لا توجد طلبات بعد</h2>

            <p className="text-gray-500">استمتع بالتسوق واطلب الان</p>

            <button
              onClick={() => navigate("/")}
              className="button mt-6 py-2 disabled:opacity-50"
            >
              ابدأ التسوق
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex justify-between w-full items-center">
              <h1 className="name flex items-center gap-2">طلباتي :</h1>
            </div>
          </div>

          <div className="flex flex-col gap-y-6">
            <div className="overflow-hidden rounded-lg bg-white shadow-sm flex flex-col gap-y-1 ">
              <div className="grid grid-cols-4     items-center border-b p-4 text-xs bg-cyan-600 text-white ">
                <p className=" col-span-2">رقم الطلب</p>
                {/* <p>عدد العناصر</p> */}
                <p>المجموع</p>
                <p className=" text-center">تفاصيل</p>
              </div>

              {normalized?.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4      items-center border-b p-4 text-xs"
                >
                  <p className=" col-span-2">{item?.order_number}</p>
                  {/* <p>{item?.count}</p> */}
                  {item?.subtotal} ل.س
                  <Eye
                    size={20}
                    className=" text-cyan-500 mx-auto"
                    onClick={() => navigate(`/orders/${item.id}`)}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="button mt-12    flex   items-center justify-center gap-2 py-3  text-lg  disabled:cursor-not-allowed disabled:opacity-50"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
