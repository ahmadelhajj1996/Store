import PropTypes from "prop-types"; // 👈 Imported prop-types
import { Search, X } from "lucide-react";
import useSearch from "../../hooks/useSearch";
import SearchDropdown from "./SearchDropdown";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

function SearchBar({ onFocusChange = () => {} }) {
  const { query, setQuery, results, loading } = useSearch();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // ✅ CLICK OUTSIDE SEARCHBAR
  useOutsideClick(
    wrapperRef,
    () => {
      setOpen(false);
      setQuery(""); // Clear search string
      onFocusChange(false); // Reset navbar state to show logo/icons again
      if (inputRef.current) inputRef.current.blur(); // Drop mobile keyboard
    },
    !!(query || open) 
  );

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
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
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => {
            onFocusChange(true);
            if (query.trim()) {
              setOpen(true);
            }
          }}
          onChange={(e) => {
            e.stopPropagation();
            const value = e.target.value;
            setQuery(value);

            if (value.trim()) {
              setOpen(true);
              onFocusChange(true);
            } else {
              setOpen(false);
            }
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
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
              onFocusChange(false);
              if (inputRef.current) inputRef.current.blur();
            }}
            className="p-3"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {query.trim() && open && (
        <SearchDropdown
          results={results}
          loading={loading}
          query={query}
          onClose={() => {
            setOpen(false);
            setQuery(""); // 👈 Clears the input text when an item is clicked
            onFocusChange(false); // Restores your mobile navbar icons instantly
            if (inputRef.current) inputRef.current.blur(); // Drops the mobile software keyboard
          }}
        />
      )}
    </div>
  );
}

// ✅ PROPTYPES VALIDATION
SearchBar.propTypes = {
  onFocusChange: PropTypes.func,
};

export default SearchBar;