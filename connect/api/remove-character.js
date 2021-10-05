export default async function (_req, res) {
  return res.setStatus(501).send({msg: 'not implemented'})
}