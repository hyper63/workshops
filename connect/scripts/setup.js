import "https://deno.land/x/dotenv/load.ts";
import { hyper } from 'https://x.nest.land/hyper-connect@0.0.9/proxy.js'

const characters = [
  {
    "id": "character-1",
    "type": "character",
    "name": "Mario"
  },
  {
    "id": "character-2",
    "type": "character",
    "name": "Luigi"
  },
  {
    "id": "character-3",
    "type": "character",
    "name": "Princess Peach"
  },
  {
    "id": "character-4",
    "type": "character",
    "name": "Bowser"
  }
]

console.log(
  await hyper.data.bulk(characters)
)