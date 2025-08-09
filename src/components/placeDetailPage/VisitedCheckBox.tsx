import { useState } from "react";
import SVGCheckBox from "../common/SVGCheckBox";

interface Props {
  placeId: string;
  isVisited: boolean;
}

const VisitedCheckBox = ({ placeId, isVisited }: Props) => {
  const [checked, setChecked] = useState(isVisited);

  const handleChange = (next: boolean) => {
    setChecked(next);
    //api 요청 부분
    const endPoint = `/api/user/XXX/${placeId}`;
    const method = next ? "POST" : "DELETE";
    alert(endPoint + " / " + method);
  };
  return <SVGCheckBox checked={checked} onChange={handleChange} />;
};

export default VisitedCheckBox;
