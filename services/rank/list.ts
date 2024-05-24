import axiosInstance from "@/helpers/axios";
import { Rank } from "@/types/rank";

const getRankList = async (
  page: number,
  pageSize: number
): Promise<Array<Rank>> => {
  const response = await axiosInstance.get<Array<Rank>>("rank", {
    params: { page, pageSize },
  });
  return response.data;
};

export default getRankList;
