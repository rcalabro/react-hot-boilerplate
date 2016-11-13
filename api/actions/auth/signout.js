export default function signout(req) {
  return new Promise((resolve) => {
    req.session.destroy(() => {
      req.session = null;
      return resolve(null);
    });
  });
}
