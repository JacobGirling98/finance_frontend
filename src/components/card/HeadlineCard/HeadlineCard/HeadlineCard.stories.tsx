import { ComponentMeta, ComponentStory } from "@storybook/react";
import HeadlineCard from "./HeadlineCard";

export default {
  title: "Headline Card",
  component: HeadlineCard,
} as ComponentMeta<typeof HeadlineCard>;

const Template: ComponentStory<typeof HeadlineCard> = (args) => (
  <>
    <div className="w-80">
      <HeadlineCard {...args} />
    </div>
  </>
);

export const Default = Template.bind({});
Default.args = {
  title: "Income",
  value: 300.52,
};

export const FormattedNumber = Template.bind({});
FormattedNumber.args = {
  ...Default.args,
  value: 1234.52,
};
