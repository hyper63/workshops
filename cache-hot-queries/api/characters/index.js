const byType = t => doc => doc.type === t

export async function post({ hyper, body }, res) {
  const result = await hyper.data.add(body);
  return res.send(result);
}

export async function get({ hyper }, res) {
  const { docs } = await hyper.data.list();
  const characters = docs.filter(byType("character"));
  return res.send(characters);
}
