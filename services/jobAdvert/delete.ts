import axiosInstance from "@/helpers/axios";
import type { JobAdvert } from "@/types/jobAdvert";

const deleteJobadvert = async (jobAdvertId: JobAdvert["_id"]): Promise<JobAdvert> => {
  const response = await axiosInstance.delete<JobAdvert>(`jobAdvert/${jobAdvertId}`);
  return response.data;
};

export default deleteJobadvert;
