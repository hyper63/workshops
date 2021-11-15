import 'dotenv'
import { connect } from 'hyper-connect'

const hyper = connect(Deno.env.get('HYPER'))

export default async function (_req, res) {
  const result = await hyper.data.add(_req.body)
  return res.send(result)
}
