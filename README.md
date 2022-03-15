# AngularTests

## Deploying to Firebase

```
npm install -g firebase-tools
firebase login
firebase deploy -P b-cal --only hosting --config firebase.b-cal.json
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

- The extension is expecting the Jest CLI to be available globally

```
npm install jest --global
```

This project was generated using [Nx](https://nx.dev).
