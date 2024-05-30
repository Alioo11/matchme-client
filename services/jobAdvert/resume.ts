import axiosInstance from "@/helpers/axios";
import { JobAdvert } from "@/types/jobAdvert";
import Resume from "@/types/resume";

const getResumePropertiesByJobadvert = async (
  jobadvertId: JobAdvert["_id"]
): Promise<Resume> => {
  const response = await axiosInstance.get<Resume>(`/jobadvert/${jobadvertId}/resume`);
  return response.data;
};

const getResumePropertiesByJobadvertPDF = async (
  jobadvertId: JobAdvert["_id"]
): Promise<{ link: string }> => {
  const response = await axiosInstance.get<{ link: string }>(
    `/jobadvert/${jobadvertId}/resume/create`
  );
  return response.data;
};

const generateResumePDF = async (resume: Resume): Promise<{ link: string }> => {
  const response = await axiosInstance.post<{ link: string }>(`/jobadvert/resume/`, resume);
  return response.data;
};

export {
  getResumePropertiesByJobadvert,
  getResumePropertiesByJobadvertPDF,
  generateResumePDF,
};
