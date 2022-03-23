# AngularTests

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

```shell
$ nx run-many --target=test --all
$ npx serve coverage
```

This project was generated using [Nx](https://nx.dev).
