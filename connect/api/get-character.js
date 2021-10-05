import { hyper } from 'https://x.nest.land/hyper-connect@0.0.7/proxy.js'

export default async function (_req, res) {
  const character = await hyper.data.get(_req.params.id)
  return res.send(character)
}