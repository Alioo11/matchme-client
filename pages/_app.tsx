import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import "@/styles/globals.css";
import DashboardLayout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  );
}
