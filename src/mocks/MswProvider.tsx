"use client";

import { useEffect } from "react";

export function MswProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const shouldEnable =
      process.env.NEXT_PUBLIC_API_MOCKING === "enabled" ||
      process.env.NODE_ENV === "development";

    if (!shouldEnable) return;

    (async () => {
      const { worker } = await import("@/mocks/browser");
      await worker.start({ onUnhandledRequest: "bypass" });
    })();
  }, []);

  return <>{children}</>;
}
