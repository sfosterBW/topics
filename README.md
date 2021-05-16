#TODOs 
* Add linter
* Push to repo
* useTopics tests
* Add github actions
* Add cypress tests
* Check other todos
* Sort out styles
* Move weighting to hook
* Update icons


# My Topics Challenge
This is a technical test based on [these requirements](https://gist.github.com/grahamscott/65b43572ad18c5fbdd87).

The app is built using [create-react-app](https://www.npmjs.com/package/create-react-app) as a basis for the react app, [axios](https://www.npmjs.com/package/axios) to fetch the data and [jest](https://jestjs.io/) / [testing library](https://testing-library.com/docs/react-testing-library/intro/) for the tests.

## Run locally
Run `npm start` and that will start the react app and a test server to deliver the data (assuming that this would in future be a third party or internal service). This using [concurrently](https://www.npmjs.com/package/concurrently)  to run both service.

## Test app
Change directory using `cd client` and then run `npm test` to run the jest based unit and integration tests.

## Lint
Run the linter by changing directory `cd client` and running `npm run lint`. This uses the github style of linting.

## Further improvements
* Swap from the vanilla word cloud to use highcharts or d3 to have a more premium feel of chart
* Add a node server to handle the incoming data and normalise it for the frontend
