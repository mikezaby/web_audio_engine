"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { store } from "@/store";
import EngineInitializer from "@/EngineInitializer";
import { ThemeProvider } from "./components/ThemeProvider";
import FirebaseInitializer from "./FirebaseInitializer";
import { ReactFlowProvider } from "reactflow";

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
