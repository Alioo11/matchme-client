import React, { useTransition } from "react";
import Container from "@/components/Container";
import DateHelper from "@/helpers/date";
import useToggle from "@/hooks/useToggle";
import JobAdvertService from "@/services/jobAdvert";
import { JobAdvert } from "@/types/jobAdvert";
import {
  Badge,
  Button,
  Card,
  Col,
  Flex,
  Input,
  Row,
  Spin,
  Tag,
  Typography,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nullable } from "ts-wiz";
import EmbeddedIframe from "@/components/EmbededIframe";
import App from "@/components/IFR";

const RankDetailPage = () => {
  const router = useRouter();
  const jobAdvertId = router.query.id as string;

  const [jobAdvert, setJobAdvert] = useState<Nullable<JobAdvert>>(null);
  const [promptContent, setPromptContent] = useState<string>("");
  const [promptResult, setPromptResult] = useState<Nullable<string>>(null);
  const [loadingPromptResult, togglePromptResult] = useToggle(false);
  const [iframeLink, setIframeLink] = useState<string>("")


  const handleGetJobAdvert = async () => {
    if (!jobAdvertId) return;
    const foundJobAdvert = await JobAdvertService.retrieve(jobAdvertId);
    setJobAdvert(foundJobAdvert);
    setIframeLink(foundJobAdvert.link)
  };

  const handleApply = () => {
    if (!jobAdvertId) return;
    const res = JobAdvertService.apply(jobAdvertId);
    handleGetJobAdvert();
  };

  const handleDelete = async () => {
    if (!jobAdvertId) return;
    const res = await JobAdvertService.delete(jobAdvertId);
    handleGetJobAdvert();
    router.push("/rank");
  };

  const handleSendPromptWithContext = async () => {
    try {
      if (!promptContent) return;
      togglePromptResult();
      const result = await JobAdvertService.prompt({
        id: jobAdvertId,
        prompt: promptContent,
      });
      setPromptResult(result.message);
      togglePromptResult();
    } catch (err) {
      togglePromptResult();
    }
  };

  const handleIframeOnload = (
    event: React.ReactEventHandler<HTMLIFrameElement> | undefined
  ) => {};

  useEffect(() => {
    handleGetJobAdvert();
  }, [jobAdvertId]);

  useEffect(() => {
    // Override the window.open method
    const originalOpen = window.open;
    //@ts-ignore
    window.open = function(url, name, features, replace) {
      // Prevent opening new tabs/windows
      console.log(`Attempted to open: ${url}`);
      // Optionally, handle the URL differently here, e.g., load it in the iframe
    };
    // Cleanup function to restore the original window.open behavior
    return () => {
      window.open = originalOpen;
    };
  }, []); // Empty dependency array ensures this runs once on mount


  if (jobAdvert === null)
    return (
      <Container>
        <Spin />
      </Container>
    );

  return (
    <Container>
      <Flex vertical style={{ width: "100%" }} gap={10}>
        <Row gutter={3} style={{ width: "100%" }}>
          <Col xxl={18} xl={18} lg={18} sm={18}>
            <iframe
              id="one"
              height={500}
              width="100%"
              src={iframeLink}
            ></iframe>
          </Col>
          <Col xxl={6} xl={6} lg={6} sm={6}>
            <Flex vertical gap={10}>
              <Card title="Actions">
                <Flex gap={5}>
                  <Button onClick={handleApply}>Apply</Button>
                  <Button onClick={handleDelete} type="primary" danger>
                    Delete
                  </Button>
                  <Button>Mark As Unrelated</Button>
                </Flex>
              </Card>
              <Card title="About">
                <Flex gap={10} vertical>
                  <Flex justify="space-between">
                    <Typography>Visa</Typography>
                    <Tag
                      color={
                        jobAdvert.company?.visa === "true" ? "green" : "red"
                      }
                    >
                      {jobAdvert.company?.visa === "true" ? "has it" : "nope"}
                    </Tag>
                  </Flex>
                  <Flex justify="space-between">
                    <Typography>Last Apply</Typography>
                    <Tag color={jobAdvert.lastApply ? "blue" : "default"}>
                      {DateHelper.formatToReadableDateFromNow(
                        jobAdvert.lastApply
                      )}
                    </Tag>
                  </Flex>
                  <Flex justify="space-between">
                    <Typography>Platform</Typography>
                    <Tag color="blue"> {jobAdvert.platform}</Tag>
                  </Flex>
                </Flex>
              </Card>
              <Card title="Links">
                <Flex gap={5}>
                  <Link href="https://www.linkedin.com/in/ali-salehi-194b4b233/">
                    Linkedin
                  </Link>
                  <Link href="https://github.com/Alioo11">Github</Link>
                </Flex>
              </Card>
            </Flex>
          </Col>
        </Row>
        <Row gutter={3} style={{ width: "100%" }}>
          <Flex style={{ width: "100%" }}>
            <Card title="prompting" style={{ width: "100%" }}>
              <Row gutter={10}>
                <Col span={18}>
                  <Card title="Phind with Context(Resume & Job Description)">
                    <Flex vertical gap={4}>
                      <Card>{promptResult}</Card>
                      <Flex gap={4}>
                        <Input
                          value={promptContent}
                          onChange={(e) => setPromptContent(e.target.value)}
                        />
                        <Button
                          size="large"
                          type="primary"
                          loading={loadingPromptResult}
                          onClick={handleSendPromptWithContext}
                        >
                          Go
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card style={{width:"100%"}} title="Job Link">
                    <Input
                      value={iframeLink}
                      onChange={(e) => {
                        setIframeLink(e.target.value);
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Flex>
        </Row>
      </Flex>
    </Container>
  );
};

export default RankDetailPage;
