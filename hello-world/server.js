// load .env file
import "https://deno.land/x/dotenv/load.ts";

import { opine, json } from "https://deno.land/x/opine@1.8.0/mod.ts";
import handleGetCharacter from './api/get-character.js'
import handleCreateCharacter from './api/create-character.js'

const app = opine()

app.use(json())

app.get("/", function (req, res) {
  res.send({ name: 'Mario Wiki API' });
});

app.post('/api/characters', handleCreateCharacter)
app.get('/api/characters/:id', handleGetCharacter)

app.all('*', (_req, res) => res.setStatus(404).send({ msg: 'not found' }))

app.listen(
  3000,
  () => console.log("server has started on http://localhost:3000 🚀"),
);