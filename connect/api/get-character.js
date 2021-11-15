import 'dotenv'
import { connect } from 'hyper-connect'

const hyper = connect(Deno.env.get('HYPER'))

export default async function (_req, res) {
  const character = await hyper.data.get(_req.params.id)
  return res.send(character)
}