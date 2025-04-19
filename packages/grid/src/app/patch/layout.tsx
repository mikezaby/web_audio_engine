import type { Metadata } from "next";
import { ReactNode } from "react";

import Header from "@/components/layout/Header";
import AudioModules from "@/components/layout/AudioModules";

import "reactflow/dist/style.css";
import "@/index.css";
import "@/app.css";

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
