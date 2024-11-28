import Head from "next/head";

const layout = ({ children }) => {
  return (
    <>
      <body>
        <div>{children}</div>
      </body>
    </>
  );
};

export default layout;
