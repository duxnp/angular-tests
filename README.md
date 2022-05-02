# Angular Tests Nx Workspace

## About

I use this workspace to help learn new concepts.

When I first started using Angular, I was using the Angular CLI to generate single app projects. Each app had its own folder and package.json. After you've got more than a few Angular apps it becomes fairly time consuming to keep them all up to date.

Initially, I created this Nx workspace to simply deal with that problem. There is only one package.json for the whole workspace. `nx migrate latest` (or `nx migrate @nrwl/workspace@version`) also helps. It's a bit smarter than `ng update`. It will iterate through library releases until all dependencies are resolved.

## Apps

- [b-cal-mobile](apps/b-cal-mobile/README.md)
- [b-cal-web](apps/b-cal-web/README.md)
- [forms-ward-bell](apps/forms-ward-bell/README.md)
- [fts](apps/fts/README.md)
- [intl](apps/intl/README.md)
- [material](apps/material/README.md)
- [ngrx-ultimate](apps/ngrx-ultimate/README.md)
- [ngx-bootstrap](apps/ngx-bootstrap/README.md)
- [tailwind](apps/tailwind/README.md)

## Updating Nx

https://nx.dev/using-nx/updating-nx

## Deploying to Firebase

```shell
$ npm install -g firebase-tools
$ firebase login
$ firebase deploy -P b-cal --only hosting --config firebase.b-cal.json
```

## Unit Tests

### Prerequisites

- Jest package
- Jest extension (orta.vscode-jest)

### Instructions

- Configure the Jest extension in settings.json

```json
  "jest.autoRun": {
    "watch": false,
    "onSave": "test-src-file",
    "onStartup": [
      "all-tests"
    ]
  },
  "jest.jestCommandLine": "jest",
  "jest.testExplorer": {
    "enabled": true,
    "showInlineError": false
  },
```

- Configure the root jest.config.js for code coverage reporting

```ts
const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: getJestProjects(),
  collectCoverage: true,
};
```

- Generate a full coverage report
  TODO: This still isn't generating a coverage report as expected

```shell
$ nx run-many --target=test --all
$ npx serve coverage
```

## End To End Tests

Non-interactive Test Run (Headless)

```shell
nx e2e b-cal-e2e
```

Interactive Test Run

```shell
nx e2e b-cal-e2e --watch
```

## Dependencies

jquery is only used for the custom jest matchers. If I end up not using those I can uninstall jquery.

This project was generated using [Nx](https://nx.dev).
