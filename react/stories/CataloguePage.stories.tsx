import type { Meta, StoryObj } from "@storybook/react";
import CataloguePage from "../src/pages/CataloguePage";

const meta: Meta<typeof CataloguePage> = {
  title: "Pages/CataloguePage",
  component: CataloguePage,
};

export default meta;

type Story = StoryObj<typeof CataloguePage>;

export const Default: Story = {};