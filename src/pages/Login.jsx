import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate()
  return (
    <>

      <div className="min-h-screen    flex flex-col mt-8 ">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-8 bg-white shadow-lg  sm:p-20 ">
            <div className="max-w-lg mx-auto">
              <div>
                <h1 className="text-2xl   text-center">تسجيل الدخول</h1>
              </div>
              <div className="divide-y divide-gray-200" >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autocomplete="off"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="الاسم الكامل"
                    />
                    <label
                      for="email"
                      className="absolute start-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      رقم الهاتف
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="كلمة المرور"
                    />
                    <label
                      for="password"
                      className="absolute start-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      كلمة المرور
                    </label>
                  </div>
                  <div className=" flex justify-center w-1/2 mx-auto ">
                    <button className="bg-cyan-500 text-white rounded-md px-2 py-1   ">
                      ارسال
                    </button>
                  </div>
                </div>
              </div>
            </div>
              <div className=" text-sm text-center">
                ليس لديك حساب ؟
                <span className=" text-cyan-600 underline underline-offset-4 cursor-pointer " onClick={()=>navigate('/register')}> انشاء حساب</span>

              </div>

            </div>
        </div>
      </div>
    </>
  );
}

export default Login;
