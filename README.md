# Introduction

Frontend of mock e-commerce paltform.

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

This project requires implementation of TypeScript and SASS.

## Table of content

- [Technologies](#technologies)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Deployment link](#deployment-link)

## Technologies

- Typescript
- React
- Redux (Toolkit)
- React Router
- styled-components
- Material UI

## Architecture

Features:

![Feature_diagram](https://drive.google.com/uc?export=view&id=15TaZvyZgdZbWuRAlfqyAZ85hvgDEknbL)

Data flow diagram:

![Feature_diagram](https://drive.google.com/uc?export=view&id=1oJ1mSLyMMDgrnLXo5JCUijWcBM0qYa2m)

## Project structure

```
├── public
└── src
    ├── components
    ├── config
    ├── hooks
    ├── img
    ├── pages
    ├── redux
    │   └── slices 
    ├── selectors   
    ├── styles
    │   └── styled
    ├── test
    │   ├── data
    │   ├── shared
    │   └── slices
    ├── types
    └── utils
```

## Deployment link
Visit [this link](https://main--marvelous-torte-2b4ae0.netlify.app/).

## Getting started

1. Clone this repo with `git clone https://github.com/svet-ko/fs16_6-frontend-project-` command.
2. Install project dependencies using `yarn install` command.
3. Create .env.production and .env.development files and add there local and production links to your backend repo.
    Use variable name from the .env.example
3. Run the app with `yarn start`.

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

4. You can also run tests with `npm test`
