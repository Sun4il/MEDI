import { joinClasses } from "../../utils/helpers";

const Card = ({ children, className = "", ...props }) => (
  <article className={joinClasses("card", className)} {...props}>
    {children}
  </article>
);

export default Card;