import "dotenv";
import { hyper } from 'hyper-connect'

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