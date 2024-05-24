import axiosInstance from "@/helpers/axios";
import type { JobAdvert } from "@/types/jobAdvert";

interface promptWithJobadvertType {
  id: JobAdvert["_id"];
  prompt: string;
}


type promptResult = {
  message:string
}

const promptWithJobadvert = async (params: promptWithJobadvertType): Promise<promptResult> => {
  const { id, prompt } = params;

  const response = await axiosInstance.post<promptResult>(`jobAdvert/${id}/prompt/with-context`, { prompt });
  return response.data;
};

export default promptWithJobadvert;
