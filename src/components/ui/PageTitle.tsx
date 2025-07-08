import React from 'react';

type PageTitleProps = {
  text: string;
};

const PageTitle = ({ text }: PageTitleProps) => (
  <div className="text-[37px] font-medium">{text}</div>
);

export default PageTitle; 