import dynamic from "next/dynamic";
const Root = dynamic(() => import("../components/NoSSR/Root"), {
  ssr: false,
});

const Home = () => <Root />;

export default Home;
