import React from "react";
import type { Preview } from "storybook-react-rsbuild";
import { MemoryRouter } from "react-router-dom";
import "../src/index.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;