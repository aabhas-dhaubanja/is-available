import dynamic from "next/dynamic";
const Lucky = dynamic(() => import("../components/NoSSR/Lucky"), {
  ssr: false,
});

const LuckyPage = () => <Lucky />;

export default LuckyPage;
