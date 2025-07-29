import { useEffect, useState } from "react";
import SVGCheckBox from "../layout/SVGCheckBox";
const AUTO_LOGIN_KEY = "autoLogin";

const AutoLoginCheckBox = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(AUTO_LOGIN_KEY);
    if (saved === "true") {
      setChecked(true);
    }
  }, []);

  const handleChange = (next: boolean) => {
    setChecked(next);
    sessionStorage.setItem(AUTO_LOGIN_KEY, next.toString());
  };
  return <SVGCheckBox checked={checked} onChange={handleChange} />;
};

export default AutoLoginCheckBox;
