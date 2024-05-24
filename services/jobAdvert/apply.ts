import axiosInstance from "@/helpers/axios";
import type { JobAdvert } from "@/types/jobAdvert";
import type { Rank } from "@/types/rank";

const applyForJobAdvert = async (
  jobAdvertId: JobAdvert["_id"]
): Promise<Array<Rank>> => {
  const response = await axiosInstance.post<any>(
    `jobAdvert/${jobAdvertId}/apply`
  );
  return response.data;
};

export default applyForJobAdvert;
