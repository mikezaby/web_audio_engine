"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ReactFlowProvider } from "reactflow";
import EngineInitializer from "@/EngineInitializer";
import { store } from "@/store";
import FirebaseInitializer from "./FirebaseInitializer";
import { ThemeProvider } from "./components/ThemeProvider";

export default function Providers(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <Provider store={store}>
      <ClerkProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactFlowProvider>
            <FirebaseInitializer />
            <EngineInitializer />
            {children}
          </ReactFlowProvider>
        </ThemeProvider>
      </ClerkProvider>
    </Provider>
  );
}
