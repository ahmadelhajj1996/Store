<<<<<<< HEAD
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Container = forwardRef(
  ({ children, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`mx-1 flex flex-col gap-y-12 bg-white ${className}`}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

=======
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Container = forwardRef(
  ({ children, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`mx-1 flex flex-col gap-y-12 bg-white ${className}`}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
export default Container;