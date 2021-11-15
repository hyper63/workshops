import "dotenv";
import { connect } from 'hyper-connect'

const hyper = connect(Deno.env.get('HYPER'))

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