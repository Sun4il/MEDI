import { joinClasses } from "../../utils/helpers";

const Button = ({ children, className = "", variant = "primary", type = "button", ...props }) => (
  <button className={joinClasses("button", `button--${variant}`, className)} type={type} {...props}>
    {children}
  </button>
);

export default Button;