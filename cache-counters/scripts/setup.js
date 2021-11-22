import "dotenv";
import { connect } from "hyper-connect";

const hyper = connect(Deno.env.get("HYPER"));

const characters = [
  {
    "id": "character-1",
    "type": "character",
    "name": "Mario",
  },
  {
    "id": "character-2",
    "type": "character",
    "name": "Luigi",
  },
  {
    "id": "character-3",
    "type": "character",
    "name": "Princess Peach",
  },
  {
    "id": "character-4",
    "type": "character",
    "name": "Bowser",
  },
];

console.log(
  await hyper.data.bulk(characters),
);

const games = [
  {
    "id": "game-1",
    "type": "game",
    "name": "Donkey Kong",
  },
  {
    "id": "game-2",
    "type": "game",
    "name": "Super Mario Bros",
  },
  {
    "id": "game-3",
    "type": "game",
    "name": "Smash Bros",
  },
  {
    "id": "game-4",
    "type": "game",
    "name": "Super Mario Maker",
  },
];

console.log(
  await hyper.data.bulk(games),
);

const appearances = [
  {
    id: "appearance-1",
    type: "appearance",
    game: {
      id: "game-1",
      name: "Donkey Kong",
    },
    character: {
      id: "character-1",
      name: "Mario",
    },
  },
  {
    id: "appearance-2",
    type: "appearance",
    game: {
      id: "game-2",
      name: "Super Mario Bros",
    },
    character: {
      id: "character-1",
      name: "Mario",
    },
  },
  {
    id: "appearance-3",
    type: "appearance",
    game: {
      id: "game-2",
      name: "Super Mario Bros",
    },
    character: {
      id: "character-2",
      name: "Luigi",
    },
  },
];

console.log(
  await hyper.data.bulk(appearances),
);


console.log(
  await hyper.cache.add({ 
    characters: 4,
    games: 4
  })
)
