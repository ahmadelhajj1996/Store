import { useNavigate } from "react-router-dom";
import Title from "./Title";

function Empty(props) {
  const navigate = useNavigate();
  const { title, className } = props;
  return (
    <>
      <div
        className={` flex flex-col   py-12 gap-y-2 text-sm text-center h-screen ${className}`}
      >
        <Title first={` لا يوجد عناصر في ${title} `} />
        <div className="flex justify-center  mt-8">
          <button
            onClick={() => navigate("/")}
            className="w-[100px] p-2 px-4 text-white   bg-cyan-600"
          >
            ابدأ التسوق
          </button>
        </div>
      </div>
    </>
  );
}

export default Empty;
