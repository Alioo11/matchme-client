// src/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Flex, Typography } from "antd";
import Container from "@/components/Container";
import { Nullable } from "ts-wiz";
import { JobAdvertReport } from "@/types/jobAdvert";
import JobAdvertService from "@/services/jobAdvert";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
} from "recharts";
import moment from "moment";

function fillGaps(
  data: JobAdvertReport["apply"]["daily_number"]
): JobAdvertReport["apply"]["daily_number"] {
  const [firstRecord, lastRecord] = [data.at(0), data.at(-1)];
  const diffInDays = moment(lastRecord?._id).diff(firstRecord?._id, "days");

  const dateRecordsAsMap = new Map();
  data.forEach((item) => dateRecordsAsMap.set(item._id, item.count));

  const result: JobAdvertReport["apply"]["daily_number"] = [];

  for (let i = 1; i <= diffInDays; i++) {
    const currentDay = moment(firstRecord?._id)
      .add(i, "days")
      .format("YYYY-MM-DD");
    const isCurrentDayAvailableInDataSet = dateRecordsAsMap.has(currentDay);
    if (isCurrentDayAvailableInDataSet) {
      result.push({ _id: currentDay, count: dateRecordsAsMap.get(currentDay) });
    } else {
      result.push({ _id: currentDay, count: 0 });
    }
  }

  return result;
}

const { Meta } = Card;

const Dashboard: React.FC = () => {
  const [reportData, setReportData] = useState<Nullable<JobAdvertReport>>(null);

  const handleGetJobAvertReportData = async () => {
    let reportData = await JobAdvertService.report();
    const fieldGapsData = fillGaps(reportData.apply.daily_number || []);
    reportData.apply.daily_number = fieldGapsData;
    setReportData(reportData);
  };

  useEffect(() => {
    handleGetJobAvertReportData();
  }, []);

  return (
    <Container>
      <Flex vertical style={{ width: "100%" }} gap={10}>
        <Row gutter={3} style={{ width: "100%" }}>
          <Col xxl={18} xl={18} lg={18} sm={18}>
            <Card title="Applications" loading={reportData === null}>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart
                  width={500}
                  height={300}
                  data={reportData?.apply.daily_number}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" name="Date" unit="days" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xxl={6} xl={6} lg={6} sm={6}>
            <Card title="Aggregation" loading={reportData === null}>
              <Flex justify="space-between">
                <Typography>Total Applications</Typography>
                <Typography>{reportData?.apply.total_number}</Typography>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Flex>
    </Container>
  );
};

export default Dashboard;
