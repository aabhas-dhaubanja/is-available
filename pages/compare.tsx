import dynamic from "next/dynamic";
const Compare = dynamic(() => import("../components/NoSSR/Compare"), {
  ssr: false,
});

const ComparePage = () => <Compare />;

export default ComparePage;
