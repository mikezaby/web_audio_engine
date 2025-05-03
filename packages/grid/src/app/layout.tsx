import type { Metadata } from "next";
import { ReactNode } from "react";
import "reactflow/dist/style.css";
import Providers from "@/Providers";
import "@/app.css";
import "@/index.css";

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
