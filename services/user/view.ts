import axiosInstance from "@/helpers/axios";
import User from "@/types/user";

const markUserAsViewed = async (id: string): Promise<User> => {
  const response = await axiosInstance.post<User>(`user/${id}/view`);
  return response.data;
};

export default markUserAsViewed;
