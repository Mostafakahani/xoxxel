import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import RTL from "../src/RTL";
import "styles/global.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerURL from "Components/Common/Layout/config";
import GetToken from "GetToken";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    if (!(ServerURL.developerMode === true ? ServerURL.Bear : GetToken('user'))) {
      router.push(`${ServerURL.domain}/auth/login`);

    }
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <RTL>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />

          <title>xoxxol admin</title>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" type="image/x-icon" href="/images/logo.png" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <ToastContainer
            rtl
            style={{
              fontFamily: "'iranSansX'",
              fontWeight: 500,
              direction: "rtl",
            }}
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </RTL>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
