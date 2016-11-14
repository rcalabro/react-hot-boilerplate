function checkStatus(response) {
  if (response.status >= 200 && response.status < 300 && response.ok) {
    return response.json();
  }
  return response.json()
    .then(json => Promise.reject({
      status: response.status,
      message: json || response.statusText
    }));
}

export function post(endpoint, payload) {
  const fullUrl = `http://localhost:3000/api${endpoint}`
  const opt = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (payload) {
    opt.body = JSON.stringify(payload)
  }

  return fetch(fullUrl, opt)
  .then(checkStatus)
  .then(data => ({ data }), error => ({ error }));
}
