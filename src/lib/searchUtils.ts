import {
  CONTENT_TYPE_ID,
  SIDO_CODE,
  SIGUNGU_CODE,
} from "@/configs/searchConstants";

const getQueryString = (
  region: string,
  subregions: string[],
  keyword: string,
  category: string,
  pets: string
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

  return {
    paramRegion,
    paramKeyword,
    paramcategory,
    paramSubRegion,
    paramPet,
    paramSubRegionStr,
  };
};

const getSidoCodeByName = (sidoName: string): string => {
  return SIDO_CODE[sidoName].toString();
};

const getContentTypeCodeByName = (category: string): string => {
  return CONTENT_TYPE_ID[category].toString();
};

const getSigunguCodesByNames = (
  sidoName: string,
  sigunguNames: string
): string => {
  const subRegionArr = sigunguNames.split(",");
  const codesArr = subRegionArr.map(
    (subRegion) => SIGUNGU_CODE[sidoName][subRegion]
  );
  const codes = codesArr.join(",");

  return codes;
};

const createSearchApiParam = (param: URLSearchParams): URLSearchParams => {
  const { paramRegion, paramKeyword, paramcategory, paramSubRegionStr } =
    getValueFromURLParams(param);
  const apiParam = new URLSearchParams();
  if (paramKeyword && paramKeyword !== "전체")
    apiParam.append("title", paramKeyword);
  if (paramRegion && paramRegion !== "전체")
    apiParam.append("sido", getSidoCodeByName(paramRegion));
  if (paramSubRegionStr)
    apiParam.append(
      "sigungu",
      getSigunguCodesByNames(paramRegion, paramSubRegionStr)
    );
  if (paramcategory)
    apiParam.append("contentTypeId", getContentTypeCodeByName(paramcategory));

  return apiParam;
};

export {
  getQueryString,
  insertOrDeleteFromArr,
  getValueFromURLParams,
  getSidoCodeByName,
  getContentTypeCodeByName,
  getSigunguCodesByNames,
  createSearchApiParam,
};
