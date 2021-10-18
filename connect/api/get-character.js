import { hyper } from 'hyper-connect'

export default async function (_req, res) {
  const character = await hyper.data.get(_req.params.id)
  return res.send(character)
}