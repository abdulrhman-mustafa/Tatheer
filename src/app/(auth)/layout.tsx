import Header from "@/_Components/common/Header/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>
          <Header />
          {children}
        </>;
};

export default layout;
