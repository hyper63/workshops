import { hyper } from 'https://x.nest.land/hyper-connect@0.0.7/proxy.js'

export default async function (_req, res) {
  const result = await hyper.data.add(_req.body)
  return res.send(result)
}
