
function Breadcrumbs() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <span className="hover:text-orange-500 cursor-pointer">Trendyol</span>
        <span>›</span>
        <span className="hover:text-orange-500 cursor-pointer">Beauty</span>
        <span>›</span>
        <span className="hover:text-orange-500 cursor-pointer">
          Perfume & Deodorant
        </span>
        <span>›</span>
        <span className="hover:text-orange-500 cursor-pointer">Body Mists</span>
        <span>›</span>

        <span className="font-medium text-gray-900">
          Inspired by Cherry Blossom Body Mist - 250 ml
        </span>
      </div>
    </div>
  );
}

export default Breadcrumbs;
