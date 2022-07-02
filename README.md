# static-web-app-landing

[![codecov](https://codecov.io/gh/chill-viking/static-web-app-landing/branch/main/graph/badge.svg?token=I26FZVORCG)](https://codecov.io/gh/chill-viking/static-web-app-landing)

This is a project I've started as a means to get more familiar with Azure Static Web Apps, Azure Functions and GitHub.

The prime purpose for this app is as a landing page for my own website.

# Local development

Some basic steps to follow to be able to develop with this app, as I'm fairly sure I'll forget these steps in the near future myself.

## Pre-requisites

* [Node.js](https://nodejs.org)
* [DotNet](https://docs.microsoft.com/en-us/dotnet/core/sdk)
* [Azure Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli)

## Basic steps

1. Create local settings for the API, can copy/rename [local.settings.example.json](./api/ChillViking.Landing/local.settings.example.json) to `local.settings.json` in it's current folder.
2. Serve angular application locally
  ```console
  # in ./ng-landing
  npm i
  npm serve
  ```
3. Launch Azure Static Web Apps CLI
  ```console
  # in root folder (./)
  swa start http://localhost:4200 --api-location ./api/ChillViking.Landing
  ```
3. Navigate to emulator at `http://localhost:4280`
