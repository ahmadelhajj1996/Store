import * as yup from "yup";

export const categorySchema = yup.object({
  name: yup.string().required("الاسم مطلوب").min(2, "الاسم قصير جداً"),
});

export const attributeSchema = yup.object({
  name: yup.string().required("الاسم مطلوب").min(2, "الاسم قصير جداً"),
  type: yup.string().required("النوع مطلوب") 
});

export const optionSchema = yup.object({
  value: yup.string().required( "القيمة مطلوبة" ).min(2, "الاسم قصير جداً"),
});


export const loginSchema = yup.object({
  phone: yup
    .string()
    .required("رقم الهاتف مطلوب")
    .min(9, "رقم الهاتف يجب أن يكون 9 أرقام على الأقل"),

  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("الاسم مطلوب")
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),

  phone: yup
    .string()
    .required("رقم الهاتف مطلوب")
    .min(9, "رقم الهاتف يجب أن يكون 9 أرقام على الأقل"),

  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),

  password_confirmation: yup
    .string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([yup.ref("password")], "كلمتا المرور غير متطابقتين"),
});
 

export const subscribeSchema = yup.object({
  phone: yup.string().required(" رقم الهاتف مطلوب").min(9 , " يحب أن يكون عشرة أرقام " ),
});


export const variationAttributeSchema = yup.object({

  variation_id: yup.number()
    .typeError("يجب اختيار المتغير")
    .integer("يجب أن يكون رقمًا صحيحًا")
    .required("المتغير مطلوب"),

  attribute_id: yup.number()
    .typeError("يجب اختيار الصفة")
    .integer("يجب أن يكون رقمًا صحيحًا")
    .required("الصفة مطلوبة"),

  attribute_option_id: yup.number()
    .typeError("يجب اختيار قيمة الصفة")
    .integer("يجب أن يكون رقمًا صحيحًا")
    .required("قيمة الصفة مطلوبة"),

});


export const productSchema = yup.object({

  name: yup.string()
    .trim()
    .required("اسم المنتج مطلوب"),

  status: yup.string()
    .oneOf(["published", "draft"], "حالة المنتج غير صحيحة")
    .required("حالة المنتج مطلوبة"),

  is_active: yup.number()
    .oneOf([0, 1], "قيمة التفعيل غير صحيحة")
    .required("حالة التفعيل مطلوبة"),

  is_featured: yup.number()
    .oneOf([0, 1], "قيمة التمييز غير صحيحة")
    .required("حالة التمييز مطلوبة"),

  featured_image: yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "حجم الصورة كبير جدًا",
      (value) => {
        if (!value) return true; // allow null
        return value.size <= 2 * 1024 * 1024; // 2MB
      }
    )
    .test(
      "fileType",
      "صيغة الصورة غير مدعومة",
      (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
      }
    ),

});



export const variationSchema = yup.object({

  price: yup.number()
    .typeError("السعر يجب أن يكون رقمًا")
    .required("السعر مطلوب")
    .min(0, "السعر يجب أن يكون أكبر من أو يساوي 0"),

  quantity: yup.number()
    .typeError("الكمية يجب أن تكون رقمًا")
    .required("الكمية مطلوبة")
    .integer("الكمية يجب أن تكون رقمًا صحيحًا")
    .min(0, "الكمية يجب أن تكون أكبر من أو تساوي 0"),

  // image: yup.mixed()
  //   // .required("الصورة مطلوبة")
  //   .test("fileSize", "حجم الصورة كبير جدًا", (value) => {
  //     if (!value) return false;
  //     return value.size <= 2 * 1024 * 1024; // 2MB
  //   })
  //   .test("fileType", "صيغة الصورة غير مدعومة", (value) => {
  //     if (!value) return false;
  //     return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
  //   }),

});



export const variationImageSchema = yup.object({
  variation_id: yup.number()
    .required("المتغير مطلوب")
    .integer("يجب أن يكون رقمًا صحيحًا"),

  path: yup.mixed()
    .required("الصور مطلوبة")
    .test("fileCount", "يجب رفع صورة واحدة على الأقل", (value) => {
      if (!value) return false;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    }),
});