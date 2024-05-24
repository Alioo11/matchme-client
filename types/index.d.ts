import { Pagination } from "antd";

type WithPagination<T> = {
    data: T,
    page: number,
    page_size: number,
    total: number
}