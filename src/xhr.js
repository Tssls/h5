const originUrl = 'http://120.25.229.237:8888/';
// const originUrl = 'http://127.0.0.1:8888/';

const get = (url) => {
  return fetch(originUrl + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
}


export const xhrApiQuery = () => {
  return get('api/query')
}


