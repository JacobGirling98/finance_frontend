import { FC } from "react";

interface PageTitleProps {
  title: string;
  children?: JSX.Element;
}

const PageTitle: FC<PageTitleProps> = ({ title, children }) => {
  return (
    <h1 className="mx-5 my-2 text-4xl text-text-soft-light text- dark:text-text-soft-dark font-light">
      <span className="italic">{title}</span>
      {children && children}
    </h1>
  );
};

export default PageTitle;
