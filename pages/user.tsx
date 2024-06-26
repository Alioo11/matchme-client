import { use, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Container from "@/components/Container";
import { Button, Card, Flex, Pagination, Table, TableProps, Tag } from "antd";
import { useRouter } from "next/router";
import User from "@/types/user";
import UserService from "@/services/user";
import { Nullable } from "ts-wiz";
import Link from "next/link";

const PAGE_SIZE = 150;

const UserPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<Array<User>>([]);
  const [totalCount, setTotalCount] = useState(0);

  const page = router.query.page as string;
  const pageNumber = page ? Number(page) : 0;

  const handleGetUserData = async () => {
    const query: any =
      router.asPath
        .split("?")[1]
        ?.split("&")
        .reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          return { ...acc, [key]: value };
        }, {}) || {};
    const page = isNaN(Number(query.page)) ? 0 : Number(query.page) - 1;
    const pageSize = PAGE_SIZE;
    const userData = await UserService.list(page, pageSize);
    setUsers(userData.data);
    setTotalCount(userData.total);
  };

  const handleMarkAsViewed = async (userId: User["_id"]) => {
    await UserService.view(userId);
  };


  const handleClickItem = async (itemId:User["_id"]) =>{
    const user = users.find(i => i._id === itemId);
    if(!user) return;
    await handleMarkAsViewed(user._id);
  }

  const columns: TableProps<User>["columns"] = [
    {
      title: "job title",
      render: (data) => {
        return <Link href={data.linkedinProfile} onClick={() => handleClickItem(data._id)}>{data.linkedinProfile}</Link>;
      },
    },
  ];

  useEffect(() => {
    handleGetUserData();
  }, [pageNumber]);

  const handlePageChange = (newPage: number) => {
    const oldQuery = router.query;
    router.push({ query: { ...oldQuery, page: newPage } });
  };

  return (
    <>
      <Head>
        <title>Matchme client</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Flex vertical style={{width:"100%"}}>
        <Flex vertical gap={20}>
          <Pagination
            total={totalCount}
            pageSize={100}
            onChange={handlePageChange}
          />
          <Table
            style={{ width: "100%" }}
            columns={columns}
            dataSource={users}
            pagination={false}
          />
        </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default UserPage;
