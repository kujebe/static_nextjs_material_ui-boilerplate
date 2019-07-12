import React from "react";
import PropTypes from "prop-types";
import NextMetaPage from "../lib/NextPageMeta";
import NextGoogleAnalytics from "../lib/NextGoogleAnalytics";

const Layout = props => {
  //console.log('Layout', props);
  if (!props.meta) {
    console.error("no meta");
  }
  return (
    <React.Fragment>
      <NextMetaPage
        meta={{
          ...props.meta
          //				favicon: '/static/favicon.png',
          //				manifest: '/static/manifest.json'
        }}
      />
      {props.children}
      <NextGoogleAnalytics id="100100" />
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired
};

export default Layout;
