import {ComponentMeta, ComponentStory} from "@storybook/react";
import ViewMoneyPage from "./ViewMoneyPage";

export default {
  title: "View Money Page",
  component: ViewMoneyPage
} as ComponentMeta<typeof ViewMoneyPage>

const Template: ComponentStory<typeof ViewMoneyPage> = (args) => <>
  <ViewMoneyPage/>
</>

export const Default = Template.bind({})