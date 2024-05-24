import axiosInstance from "@/helpers/axios";
import type { JobAdvert } from "@/types/jobAdvert";

const retrieveJobadvert = async (jobAdvertId: JobAdvert["_id"]): Promise<JobAdvert> => {
  const response = await axiosInstance.get<JobAdvert>(`jobAdvert/${jobAdvertId}`);
  return response.data;
};

export default retrieveJobadvert;
