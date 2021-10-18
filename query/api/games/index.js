import { hyper } from 'hyper-connect'

export async function post(_req, res) {
  const result = await hyper.data.add(_req.body)
  return res.send(result)
}

export async function get(_req, res) {
  const docs = await hyper.data.list()
  const games = docs.filter(byType('game'))
  return res.send(games)
}