put next to postgres and hasura. (intended is important)


react:
    build: ./react
    ports:
      - '3001:3001'
    volumes:
      - ./react:/app
      - /app/node_modules
    restart: always
    depends_on:
      - hasura


update rspack: 
devServer: {
  port: 3001,
  host: host: '0.0.0.0',
  
}



package.json
 — Removed "@rspack/plugin-html": "^0.5.8" from devDependencies
 - Removed incorrect storybook version:

correct:

```

{
  "name": "backend-01",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "rspack serve",
    "build": "rspack build",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "cypress:open": "npx cypress open",
    "cypress:run": "npx cypress run"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "@reduxjs/toolkit": "^2.11.2",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.13.1",
    "redux-saga": "^1.4.2"
  },
  "devDependencies": {
    "@rsbuild/core": "^1.7.3",
    "@rspack/cli": "^1.7.6",
    "@rspack/core": "^1.7.6",
    "@rspack/dev-server": "^1.2.1",
    "@rspack/plugin-react-refresh": "^1.6.1",
    "@storybook/react": "^10.2.12",
    "@tailwindcss/postcss": "^4.2.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@types/react-redux": "^7.1.34",
    "autoprefixer": "^10.4.24",
    "css-loader": "^7.1.4",
    "cypress": "^15.11.0",
    "postcss": "^8.5.6",
    "postcss-loader": "^8.2.1",
    "react-refresh": "^0.18.0",
    "storybook": "^10.2.12",
    "storybook-builder-rsbuild": "^3.3.0",
    "storybook-react-rsbuild": "^3.3.0",
    "style-loader": "^4.0.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.9.3"
  }
}

```

rspack.config.js
 — Updated the import:
From: 
// Before (broken)
const HtmlRspackPlugin = require('@rspack/plugin-html').default;
// After (correct)
const { HtmlRspackPlugin } = require('@rspack/core');

```

const path = require('path');
const { HtmlRspackPlugin } = require('@rspack/core');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3001,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
};

```
-------------------------

creat Dockerfile inside react folder: 

```

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]

```

create .dockerignore file inside react folder:

```
node_modules
dist
.git
.env
.vscode
coverage
```

-------------------------------------------

To run: 
docker-compose up -d (When Temporarily I removed react from Docker)

docker-compose up --build

To Stop containers (keep data, can restart later)
docker-compose down

To stop AND delete everything (containers + volumes/data)
docker-compose down -v
⚠️ This deletes your PostgreSQL data too.