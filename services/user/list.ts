import axiosInstance from "@/helpers/axios";
import { WithPagination } from "@/types";
import User from "@/types/user";

const getUsersList = async (
  page: number,
  pageSize: number
): Promise<WithPagination<Array<User>>> => {
  const response = await axiosInstance.get<WithPagination<Array<User>>>(
    "user",
    {
      params: { page, pageSize },
    }
  );
  return response.data;
};

export default getUsersList;
