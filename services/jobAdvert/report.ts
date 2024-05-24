import axiosInstance from "@/helpers/axios";
import type { JobAdvertReport } from "@/types/jobAdvert";

const getJobadvertReport = async (): Promise<JobAdvertReport> => {
  const response = await axiosInstance.get<JobAdvertReport>(`/jobadvert/report`);
  return response.data;
};

export default getJobadvertReport;
