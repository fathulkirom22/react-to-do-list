export function fetchTodo() {
  return new Promise((resolve, reject) =>
    fetch('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
      .then( res => resolve(res.json()))
      .catch( err => reject(err))
  );
}
