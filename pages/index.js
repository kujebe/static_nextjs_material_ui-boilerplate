import { Fragment } from "react";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import "../scss/_style.scss";

const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    height: "auto",
    background: "#fffde1",
    color: theme.palette.secondary.light,
    textDecoration: "none"
  }
}));

const Index = props => {
  console.log(props);
  const classes = useStyles();
  return (
    <Layout meta={props.meta}>
      <div className="example">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <div className={classes.root}>Hello World!</div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  return {
    meta: {
      lang: "en",
      title: "Page title for SEO",
      description: "Page description for SEO"
    }
  };
};

export default Index;
