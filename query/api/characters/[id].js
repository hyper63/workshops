import { connect } from 'hyper-connect'

const hyper = connect(Deno.env.get('HYPER'))

export async function get(_req, res) {
  const character = await hyper.data.get(_req.params.id)
  return res.send(character)
}

export async function put(req, res) {
  const result = await hyper.data.update(req.params.id, req.body)
  return res.send(result)
}

export async function del(req, res) {
  const result = await hyper.data.remove(req.params.id)
  return res.send(result)
}
