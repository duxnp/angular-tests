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

## Nx Dependency Graph

Nx analyzes how all the libraries within the monorepo are used. When a change is made to a library, Nx is able to use this information to determine which libraries are affected by this change. With the nx affected command you can run certain tasks only for libraries that have been affected by a recent change.

## Updating Nx

https://nx.dev/using-nx/updating-nx

## CI/CD

The ci.yml workflow is saving time by using the nx affected command to run the build and test targets only on the libraries affected by the PR.

The cd.ylm workflow is building b-cal web, then deploying to Firebase hosting.

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
$ nx e2e b-cal-e2e
```

Interactive Test Run

```shell
$ nx e2e b-cal-e2e --watch
```

## Code Coverage

Use these commands to generate code coverage data, collect all the files, then generate an html report. Requires coverageReporters to be json.

```shell
$ nx run-many --target=test --all --parallel --coverage --coverageReporters=json
$ node ./tools/coverage/jsonMerger.js
$ npx nyc report --temp-dir ./coverage/json --reporter lcov --report-dir ./coverage/report
$ npx serve -c ./tools/coverage/serve.json
```

This may also work but I haven't tried it yet.

```shell
$ nyc merge multiple-sources-dir merged-output/merged-coverage.json
$ nyc report -t merged-output --report-dir merged-report --reporter=html --reporter=cobertura
```

This would work on macOS and Linux, but would not easily work on Windows. Requires coverageReporters to be lcov and the lcov package to be installed (brew install lcov).

```shell
$ nx run-many --target=test --all --parallel --coverage --coverageReporters=json
$ node ./tools/coverage/lcovMerger.js
$ genhtml coverage/lcov.info -o coverage/html
```

## Dependencies

jquery is only used for the custom jest matchers. If I end up not using those I can uninstall jquery.

This project was generated using [Nx](https://nx.dev).
