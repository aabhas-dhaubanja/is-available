import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, Global } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </MantineProvider>
  );
}
