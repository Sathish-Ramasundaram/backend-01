import type { StorybookConfig } from 'storybook-react-rsbuild';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: 'storybook-react-rsbuild',
    options: {},
  },
  rsbuildFinal: (config) => {
    config.tools = config.tools ?? {};
    config.tools.swc = {
      jsc: {
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    };
    return config;
  },
};

export default config;
