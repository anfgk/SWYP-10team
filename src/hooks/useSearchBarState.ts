import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getValueFromURLParams, getQueryString } from "@/lib/searchUtils";

const useSearchBarState = () => {
  const location = useLocation();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubRegion, setSelectedSubRegion] = useState<string[]>([]);
  const [inputkeyword, setInputKeyword] = useState("");
  const [selectedPet, setSelectedPet] = useState("");

  const [initializedFromQuery, setInitializedFromQuery] = useState(false);
  const [prevRegion, setPrevRegion] = useState("");

  useEffect(() => {
    const {
      paramRegion,
      paramKeyword,
      paramcategory,
      paramSubRegion,
      paramPet,
    } = getValueFromURLParams(params);

    setSelectedRegion(paramRegion);
    setInputKeyword(paramKeyword);
    setSelectedCategory(paramcategory);
    setSelectedSubRegion(paramSubRegion);
    setSelectedPet(paramPet);

    setPrevRegion(paramRegion);
    setInitializedFromQuery(true);
  }, [location, params]);

  useEffect(() => {
    if (!initializedFromQuery) return;

    if (prevRegion !== selectedRegion) {
      setSelectedSubRegion([]);
    }

    setPrevRegion(selectedRegion);
  }, [selectedRegion]);

  const onSearch = () => {
    const query = getQueryString(
      selectedRegion,
      selectedSubRegion,
      inputkeyword,
      selectedCategory,
      selectedPet
    );
    navigate("/search?" + query);
  };

  return {
    selectedRegion,
    selectedCategory,
    selectedSubRegion,
    inputkeyword,
    selectedPet,
    setSelectedRegion,
    setSelectedCategory,
    setSelectedSubRegion,
    setInputKeyword,
    setSelectedPet,
    onSearch,
  };
};

export default useSearchBarState;
