import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Formik, Form } from "formik";
import FormikInput from "../components/Formikinput";

import axios from "axios";
import { useDispatch } from "react-redux";

import Tabs from "../components/Tabs";

import { useTab } from "../hooks/useTab";
import { setCredentials } from "../store/authSlice";
import notify from "../utils/toastr";
import { loginSchema, registerSchema } from "../utils/validator";

// const API = "https://phplaravel-1626350-6427540.cloudwaysapps.com/api";

const API = "http://127.0.0.1:8000/api";





function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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
      const response = await axios.post(`${API}/client/login`, values)


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
      const response = await axios.post(`${API}/client/register`, values)

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
                          {isSubmitting ? "جاري انشاء الحساب..." : "انشاء حساب"}
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

export default Login;
 