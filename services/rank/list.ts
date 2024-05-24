import axiosInstance from "@/helpers/axios";
import { WithPagination } from "@/types";
import { Rank } from "@/types/rank";

const getRankList = async (
  page: number,
  pageSize: number
): Promise<WithPagination<Array<Rank>>> => {
  const response = await axiosInstance.get<WithPagination<Array<Rank>>>("rank", {
    params: { page, pageSize },
  });
  return response.data;
};

export default getRankList;
