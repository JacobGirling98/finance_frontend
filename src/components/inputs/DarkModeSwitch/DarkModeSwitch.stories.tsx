import { ComponentMeta, ComponentStory } from "@storybook/react";
import DarkModeSwitch from "./DarkModeSwitch";

export default {
  title: "Dark Mode Switch",
  component: DarkModeSwitch,
} as ComponentMeta<typeof DarkModeSwitch>;

const Template: ComponentStory<typeof DarkModeSwitch> = () => (
  <DarkModeSwitch />
);

export const DarkMode = Template.bind({});
