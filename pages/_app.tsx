import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, Global } from "@mantine/core";
import { isThisWeek } from "date-fns";
import { NotificationsProvider } from "@mantine/notifications";

export default function App({ Component, pageProps }: AppProps) {
  const mantain = async () => {
    const boy = await fetch("/api/all?key=last-boy-update").then((response) =>
      response.json()
    );

    const girl = await fetch("/api/all?key=last-girl-update").then((response) =>
      response.json()
    );

    if (!boy.value || !girl.value) return;
    const lastBoyUpdate = boy.value;
    const lastGirlUpdate = girl.value;

    if (lastGirlUpdate && !isThisWeek(new Date(lastGirlUpdate))) {
      fetch("/api/all", {
        method: "POST",
        body: JSON.stringify({ key: "girl", value: JSON.stringify({}) }),
      });
      fetch("/api/all", {
        method: "POST",
        body: JSON.stringify({
          key: "last-girl-update",
          value: new Date().toISOString(),
        }),
      });
    }

    if (lastBoyUpdate && !isThisWeek(new Date(lastBoyUpdate))) {
      fetch("/api/all", {
        method: "POST",
        body: JSON.stringify({ key: "boy", value: JSON.stringify({}) }),
      });
      fetch("/api/all", {
        method: "POST",
        body: JSON.stringify({
          key: "last-boy-update",
          value: new Date().toISOString(),
        }),
      });
    }
  };

  React.useEffect(() => {
    mantain();
  }, []);

  return (
    <MantineProvider
      theme={{
        fontFamily: "Greycliff, sans-serif",
        headings: {
          fontFamily: "Greycliff 2, sans-serif",
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Global
        styles={(theme) => [
          {
            "@font-face": {
              fontFamily: "Greycliff",
              src: "url('/bold.woff2')",
              fontWeight: 700,
              fontStyle: "normal",
            },
          },
          {
            "@font-face": {
              fontFamily: "Greycliff 2",
              src: `url('/heavy.woff2')`,
              fontWeight: 900,
              fontStyle: "normal",
            },
          },
          {
            body: { color: theme.colors.pink[6] },
          },
        ]}
      />
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
}
