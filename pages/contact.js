import Layout from "../components/Layout";
import "../scss/_style.scss";

const Contact = props => (
  <Layout meta={props.meta}>
    <div className="example">
      <a href="/">Home</a>
      <a href="/contact">Contact</a>
      <div>About page</div>
    </div>
  </Layout>
);

Contact.getInitialProps = async () => {
  return {
    meta: {
      title: "Page title for SEO",
      description: "Page description for SEO",
      robots: "noindex,nofollow,noarchive"
    }
    // useReact: true
  };
};

export default Contact;
