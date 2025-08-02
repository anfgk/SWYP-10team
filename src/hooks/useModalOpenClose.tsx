import { useState } from "react";

const useModalOpenClose = () => {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, setIsOpen };
};

export { useModalOpenClose };
