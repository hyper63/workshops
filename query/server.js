// load .env file
import "https://deno.land/x/dotenv/load.ts";

import { opine, json } from "https://deno.land/x/opine@1.8.0/mod.ts";

import {
  get as handleGetCharacter,
  put as handleUpdateCharacter,
  del as handleRemoveCharacter,
} from './api/characters/[id].js'

import {
  post as handleCreateCharacter,
  get as handleListCharacters
} from './api/characters/index.js'

import {
  get as handleGetGame,
  put as handleUpdateGame,
  del as handleRemoveGame,
} from './api/games/[id].js'

import {
  post as handleCreateGame,
  get as handleListGames
} from './api/games/index.js'


const app = opine()

app.use(json())

app.get("/", function (req, res) {
  res.send({ name: 'Mario Wiki API' });
});

app.post('/api/characters', handleCreateCharacter)
app.get('/api/characters/:id', handleGetCharacter)
app.put('/api/characters/:id', handleUpdateCharacter)
app.del('/api/characters/:id', handleRemoveCharacter)
app.get('/api/characters', handleListCharacters)

app.post('/api/games', handleCreateGame)
app.get('/api/games/:id', handleGetGame)
app.put('/api/games/:id', handleUpdateGame)
app.del('/api/games/:id', handleRemoveGame)
app.get('/api/games', handleListGames)


app.all('*', (_req, res) => res.setStatus(404).send({ msg: 'not found' }))

app.listen(
  3000,
  () => console.log("server has started on http://localhost:3000 🚀"),
);