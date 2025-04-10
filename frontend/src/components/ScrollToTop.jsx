import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // POP = back/forward, REPLACE = programmatic replace
  }, [pathname, navigationType]);

  return null;
}

export default ScrollToTop;
