export default function signin(req) {
  const user = {
    name: req.body.username
  };
  req.session.user = user
  return Promise.resolve(user)
}
