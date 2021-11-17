// load .env file
import "dotenv";

import { json, opine } from "opine";
import handleGetCharacter from "./api/get-character.js";
import handleCreateCharacter from "./api/create-character.js";

const app = opine();

app.use(json());

app.get("/", function (req, res) {
  res.send({ name: "Mario Wiki API" });
});

app.post("/api/characters", handleCreateCharacter);
app.get("/api/characters/:id", handleGetCharacter);

app.all("*", (_req, res) => res.setStatus(404).send({ msg: "not found" }));

app.listen(
  3000,
  () => console.log("server has started on http://localhost:3000 🚀"),
);
