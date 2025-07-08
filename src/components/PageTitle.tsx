import * as React from "react";

type PageTitleProps = {
  text: string;
};

const PageTitle = ({ text }: PageTitleProps) => (
  <h2 className="text-2xl font-bold">{text}</h2>
);

export default PageTitle;
