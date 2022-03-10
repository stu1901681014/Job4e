# Job4e

Job4e is an Angular application created for the Angular SPA 2022 class in the Plovdiv University "Paisii Hilendarski".

## To start the application:

1. Clone the repository to your local machine
2. Run `npm install` to install all the required dependencies
3. Run `npm run db`. This is a custom script that will run the json-server that serves as a back-end service for the project.
   * You can find the database file along with some predefined data in `./database/db.json`.
   * The json-server should start running on `http://localhost:3000`.
   * For more information about the script, please check the `package.json` file.
4. Run `npm start` to run the project. Make sure that the `npm run db` command is executed in a separate terminal. You would need the json-server running while using the application.
5. Enjoy!
