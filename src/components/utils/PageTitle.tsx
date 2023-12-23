import { FC } from "react"

interface PageTitleProps {
  title: string
  children?: JSX.Element
}

const PageTitle: FC<PageTitleProps> = ({ title, children }) => {
  return (
    <h1 className="text-4xl text-text-soft-light dark:text-text-soft-dark font-light">
      <span className="font-medium">{title}</span>
      {children && children}
    </h1>
  )
}

export default PageTitle
