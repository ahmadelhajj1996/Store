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

export default Container;