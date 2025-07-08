import { useEffect } from "react";

export default function useExample(param: string) {
  useEffect(() => {
    /* 커스텀 훅 */
  }, [param]);
}
