<<<<<<< HEAD
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Categorycomponent({ category }) {
  const navigate = useNavigate();

  return (
    <article
      className="
    group flex shrink-0 flex-col items-center
    transition-all duration-300
  "
    >
      <div
        onClick={() => navigate(`/${category?.id}`)}
        className="
      relative overflow-hidden rounded-full
      cursor-pointer
      shadow-sm transition-all duration-500
      hover:shadow-xl

      w-[45px] sm:w-[60px] md:w-[90px]
      h-[45px] sm:h-[60px] md:h-[90px]
    "
      >
        <img
          src={category?.image}
          alt={category?.name}
          loading="lazy"
          className="
        h-full w-full
        object-cover
        transition-transform duration-500
        group-hover:scale-110
      "
        />
      </div>

      <span
        onClick={() => navigate(`/${category?.id}`)}
        className="
        mt-4 text-center
        text-xs text-gray-800
        sm:text-sm
        cursor-pointer
        transition-colors duration-300
        group-hover:text-black
        "
      >
        {category?.name}
      </span>
    </article>
  );
}

Categorycomponent.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Categorycomponent;
=======
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Categorycomponent({ category }) {
  const navigate = useNavigate();

  return (
    <article
      className="
    group flex shrink-0 flex-col items-center
    transition-all duration-300
  "
    >
      <div
        onClick={() => navigate(`/${category?.id}`)}
        className="
      relative overflow-hidden rounded-full
      cursor-pointer
      shadow-sm transition-all duration-500
      hover:shadow-xl

      w-[45px] sm:w-[60px] md:w-[90px]
      h-[45px] sm:h-[60px] md:h-[90px]
    "
      >
        <img
          src={category?.image}
          alt={category?.name}
          loading="lazy"
          className="
        h-full w-full
        object-cover
        transition-transform duration-500
        group-hover:scale-110
      "
        />
      </div>

      <span
        onClick={() => navigate(`/${category?.id}`)}
        className="
        mt-4 text-center
        text-xs text-gray-800
        sm:text-sm
        cursor-pointer
        transition-colors duration-300
        group-hover:text-black
        "
      >
        {category?.name}
      </span>
    </article>
  );
}

Categorycomponent.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Categorycomponent;
>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
