import { axiosInstance } from "./axiosInstance";

const baseUrl = process.env.REACT_APP_BASE_URL;
// const baseUrl = "http://localhost:5001";
export const GetReports = async () => {
  try {
    const response = await axiosInstance.get(baseUrl + "/api/reports/get-reports");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
