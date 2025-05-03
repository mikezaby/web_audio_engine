import type { Metadata } from "next";
import { ReactNode } from "react";
import "reactflow/dist/style.css";
import "@/app.css";
import AudioModules from "@/components/layout/AudioModules";
import Header from "@/components/layout/Header";
import "@/index.css";

export const metadata: Metadata = {
  title: "Blibliki Grid",
  description: "Modular synthesizer for web",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AudioModules />
      <Header />
      <div>{children}</div>
    </>
  );
}
