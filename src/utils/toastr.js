import { toast } from "react-toastify";

const notify = (msg, type = "success") => {
  const toastId = toast.loading(msg, {
    position: "bottom-right",
    autoClose: 2000,
    rtl: true,
    closeButton: false,
  });

  setTimeout(() => {
    const styles = {
      success: "bg-green-100 border border-green-200 text-green-800",
      error: "bg-red-100 border border-red-200 text-red-800",
      info: "bg-blue-100 border border-blue-200 text-blue-800",
      warning: "bg-yellow-100 border border-yellow-200 text-yellow-800",
    };

    toast.update(toastId, {
      render: msg,
      type,
      isLoading: false,

      // ✅ SMALL SIZE STYLING
      className: `
        !min-h-0
        !w-[250px]
        !p-3
        !text-sm
        !rounded-lg
        mx-auto
        ${styles[type] || styles.success}
      `,

      bodyClassName: `
        !text-xs
        !leading-tight
        !p-0
        !m-0
      `,

      autoClose: 2000,
    });
  }, 100);
};

export default notify;