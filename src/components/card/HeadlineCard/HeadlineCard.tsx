import React, {FC} from "react";

interface HeadlineCardProps {
  title: string;
  value: number;
}

const HeadlineCard: FC<HeadlineCardProps> = (
  {
    title, value
  }
) => {
  const format = (value: number): string => value.toLocaleString()

  return (
    <div className="border rounded-xl flex w-full shadow-md">
      <div className="flex flex-col w-full">
        <div className="pl-6 pt-3 pb-2 text-xl text-text-light dark:text-text-dark">
          <h3>{title}</h3>
        </div>
        <div className="flex mx-auto pb-6 text-5xl text-special-light dark:text-special-dark">
          <h4>£{format(value)}</h4>
        </div>
      </div>
    </div>
  )
}

export default HeadlineCard;