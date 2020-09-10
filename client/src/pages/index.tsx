import { withApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";

const Index = () => (
  <Layout>
    <h1>Hello world</h1>
  </Layout>
);

export default withApollo({ ssr: true })(Index);
