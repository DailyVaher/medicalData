import { DataSource } from "typeorm";
import { config } from "./config";
import { Patient } from "./entities/Patient";
import "reflect-metadata"

// andmebaasiühenduse konfguratsioon
const defaultDataSource = new DataSource({
  type: "mysql",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.db,
  entities: [Patient],
  synchronize: true,
  migrations: [],
});

// kontrollime üle kas andmebaasi ühendust on võimalik luua
defaultDataSource
  .initialize()
  .then(() => {
    console.log("Database initialized...");
  })
  .catch((err) => {
    console.log("Error initializing database", err);
  });

export default defaultDataSource;
