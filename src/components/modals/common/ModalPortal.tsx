import { createPortal } from "react-dom";
import { useMemo } from "react";
import type { PropsWithChildren } from "react";

const ModalPortal = ({ children }: PropsWithChildren) => {
  const container = useMemo(() => {
    let el = document.getElementById("modal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  return createPortal(children, container);
};

export default ModalPortal;
