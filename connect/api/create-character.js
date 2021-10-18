import { hyper } from 'hyper-connect'

export default async function (_req, res) {
  const result = await hyper.data.add(_req.body)
  return res.send(result)
}
