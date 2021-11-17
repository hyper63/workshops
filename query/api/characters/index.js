import { connect } from "hyper-connect";

const hyper = connect(Deno.env.get("HYPER"));

export async function post(_req, res) {
  const result = await hyper.data.add(_req.body);
  return res.send(result);
}

export async function get(_req, res) {
  const docs = await hyper.data.list();
  const characters = docs.filter(byType("character"));
  return res.send(characters);
}
