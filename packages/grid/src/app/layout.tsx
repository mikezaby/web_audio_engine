import type { Metadata } from "next";
import { ReactNode } from "react";

import Providers from "@/Providers";

import "reactflow/dist/style.css";
import "@/index.css";
import "@/app.css";

export const metadata: Metadata = {
  title: "Blibliki Grid",
  description: "Modular synthesizer for web",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
