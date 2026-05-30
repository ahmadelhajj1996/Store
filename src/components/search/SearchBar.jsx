import { Search, X } from "lucide-react";

import useSearch from "../../hooks/useSearch";
import SearchDropdown from "./SearchDropdown";
import { useState } from "react";

function SearchBar() {
  const { query, setQuery, results, loading } = useSearch();

  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-2xl">
      <div
        className="
          flex items-center
          bg-white
           bordered
          rounded-full
          overflow-hidden
          transition
          focus-within:ring-[1px]
          focus-within:ring-cyan-600
        "
      >
        <Search className="w-5 h-5 ms-4 text-gray-400" />

        <input
          type="text"
          value={query}
          onChange={(e) => {
            e.stopPropagation()
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="عن ماذا تبحث اليوم ؟"
          className="
            flex-1
            p-2
            text-sm
            outline-none
            bg-transparent
          "
        />

        {query && (
          <button onClick={() => setQuery("")} className="p-3">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {query.trim() && open && (
        <SearchDropdown results={results} loading={loading} query={query}   onClose={() => setOpen(false)}  />
      )}
    </div>
  );
}

export default SearchBar;
