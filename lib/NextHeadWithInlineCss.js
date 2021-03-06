import { Head } from "next/document";
import { readFileSync } from "fs";
import { join } from "path";
import React from "react";

const exportDir = "dist"; // I don't use "out"

export default class NextHeadWithInlineCss extends Head {
  getCssLinks() {
    const { assetPrefix, files } = this.context._documentProps;
    if (!files || files.length === 0) return null;

    // Return parent version if DEV/HMR mode
    // if (this.context._documentProps.dev) {
    if (process.env.NODE_ENV !== "production") {
      // @ts-ignore
      return super.getCssLinks();
    }

    // Inline CSS
    return files
      .filter(file => /\.css$/.test(file))
      .map(file => (
        <style
          key={file}
          nonce={this.props.nonce}
          data-href={`${assetPrefix}/_next/${file}`}
          dangerouslySetInnerHTML={{
            __html: readFileSync(
              join(process.cwd(), exportDir, "_next", file),
              "utf-8"
            )
          }}
        />
      ));
  }

  // Disable preload stuffs
  getPreloadDynamicChunks() {
    return null;
  }

  getPreloadMainLinks() {
    return null;
  }

  /*
   * This example has been borrowed from the Next.Js Issue - you have to keep it in sync with the Next.js's Document Head component original source code
   */
  render() {
    const { head, styles } = this.context._documentProps;
    // console.log(process.cwd());
    let children = this.props.children;

    // show a warning if Head contains <title> (only in development)
    if (process.env.NODE_ENV !== "production") {
      children = React.Children.map(children, child => {
        if (child && child.type === "title") {
          console.warn(
            "Warning: <title> should not be used in _document.js's <Head>. https://err.sh/next.js/no-document-title"
          );
        }
        return child;
      });
    }

    return (
      <head {...this.props}>
        {head}
        {this.getCssLinks()}
        {styles || null}
        {children}
      </head>
    );
  }
}
