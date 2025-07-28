const getQueryString = (
  region: string,
  subregions: string[],
  keyword: string,
  category: string,
  pets: string,
) => {
  const params = new URLSearchParams();
  if (region) params.append("region", region);
  if (subregions.length > 0) params.append("subregions", subregions.join(","));
  if (keyword) params.append("keyword", keyword);
  if (category) params.append("category", category);
  if (pets) params.append("pet", pets);

  return params.toString();
};

const insertOrDeleteFromArr = (arr: string[], value: string) => {
  let newArr = [];

  if (arr.includes(value)) {
    newArr = arr.filter((element) => element !== value);
  } else {
    newArr = [...arr, value];
  }

  return newArr;
};

const getValueFromURLParams = (params: URLSearchParams) => {
  const paramRegion = params.get("region") ?? "";
  const paramKeyword = params.get("keyword") ?? "";
  const paramcategory = params.get("category") ?? "";
  const paramSubRegionStr = params.get("subregions");
  const paramSubRegion = paramSubRegionStr ? paramSubRegionStr.split(",") : [];
  const paramPet = params.get("pet") ?? "";

  return { paramRegion, paramKeyword, paramcategory, paramSubRegion, paramPet };
};

export { getQueryString, insertOrDeleteFromArr, getValueFromURLParams };
