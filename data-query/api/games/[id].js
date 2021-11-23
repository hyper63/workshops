
export async function get({hyper, params}, res) {
  const game = await hyper.data.get(params.id);
  return res.send(game);
}

export async function put({hyper, params, body}, res) {
  const result = await hyper.data.update(params.id, body);
  return res.send(result);
}

export async function del({hyper, params, body}, res) {
  const result = await hyper.data.remove(params.id);
  return res.send(result);
}
