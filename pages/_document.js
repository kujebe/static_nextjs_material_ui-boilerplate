import React from "react";
import Document, { Main, NextScript } from "next/document";
import NextHeadWithInlineCss from "../lib/NextHeadWithInlineCss";
import { ServerStyleSheets } from "@material-ui/styles";

export default class CustomDocument extends Document {
  render() {
    const props = this.props.__NEXT_DATA__.props.pageProps;
    const useReact = !!props.useReact;
    if (useReact) {
      console.warn("===> this pages will use React on client side");
    }
    const lang = (props.meta && props.meta.lang) || "en";

    return (
      <html lang={lang}>
        <NextHeadWithInlineCss />
        <body>
          <Main />
          {/* <NextScript /> */}
          {useReact && <NextScript />}
        </body>
      </html>
    );
  }
}

CustomDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    )
  };
};
