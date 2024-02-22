import axios from "axios";
import  { API_BASE_URL } from "../../config";

export const formatQuery = (queryObject) => {
    return Object.entries(queryObject)
    .filter(([key, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
export const GetAllRates = async (query) => {
    var config = {
      method: "get",
      url: `${API_BASE_URL}/rates?${formatQuery(query)}`,
    };
    try {
      const req = await axios(config);
      //console.log(req.data)
      return {
        success: true,
        data: req?.data?.filtersApplied ? req.data.rates : req.data,
      };
    }  catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Request failed ",
      };
    }
  };
  export const GetAppRates = async (query) => {
    var config = {
      method: "get",
      url: `${API_BASE_URL}/apprates?${formatQuery(query)}`,
    };
    try {
      const req = await axios(config);
      return {
        success: true,
        data:  req?.data?.filtersApplied  ? req.data.rates : req.data,
      };
    }  catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Request failed ",
      };
    }
  };