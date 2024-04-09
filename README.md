# Project description

In this project, you can view mobile food facility permits in San Francisco. You're able to view facilities permits by status, address, and applicant name. You can view them in map view and list view. If you move the map, you'll get a list for the 5 facilities closest to the center of the map.

## Retrospective

### Reasoning behind technical architecture and design

#### Front End Design

The front end design is customer focused. I chose to query the server on input change in order to give the user fast results. I founds this to be more intuitive than using a submit button. I added a google map to provide the user with a visual of the locations. This also gives them the ability to move the map and view additional locations. I decided to list the locations out next to the map to make it easier to connect the marker with the locations they're viewing.

#### Express.js for Server Design

In the back end, I created a simple server design using express and sqlite for the db.

- Ease of Use: Express.js is a minimalist web framework for Node.js, providing a robust set of features for building web and mobile applications. It offers simplicity and flexibility, making it easy to get started with.
Middleware: Express.js has a rich ecosystem of middleware that simplifies tasks like parsing incoming requests, handling sessions, authentication, and much more.
- Routing: Express.js provides a simple and intuitive routing system that allows developers to define routes for handling different HTTP requests and URLs.
- Scalability: While being lightweight, Express.js is highly scalable and can be used to build both small-scale and large-scale applications. It allows developers to structure their code in a modular way, making it easier to maintain and scale as the application grows.
- Community Support: Express.js has a large and active community, which means there are plenty of resources, tutorials, and third-party modules available to help with development.

#### SQLite for Database

- Embedded Database: SQLite is a self-contained, serverless, zero-configuration, transactional SQL database engine. It's well-suited for applications that require a lightweight and embedded database solution without the need for a separate database server process.
Ease of Setup: Since SQLite doesn't require a separate server process, it's very easy to set up and use. It's a simple matter of including the SQLite library in your project and connecting to the database file.
- Portability: SQLite databases are stored as a single file, making them highly portable. This makes it easy to move the database file between different environments or share it with others.
Transaction Support: SQLite supports ACID (Atomicity, Consistency, Isolation, Durability) transactions, ensuring data integrity even in the face of concurrent access.
- Performance: While not suitable for extremely high-concurrency scenarios, SQLite can provide good performance for many use cases, especially those with relatively low to moderate levels of traffic.

### What would I have done differently given more time

- More tests: it requires a lot of time to fully test all the components and server. Given more times I would have written additional tests and created some integration tests for the server.

## Available Scripts

In the project directory, you can run:

### `npm setup`

Creates a sqlite database, makes a request to https://data.sfgov.org/resource/rqzj-sfat.json, and fills the new table with the resulting information.

### `npm start`

Starts the server on :8000

### `react-scripts start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
