const socket = io();

(() => {
  getData();
})();

function getData() {
  const htmlTable = document.getElementById('tableContent');

  socket.on('news', (news) => {
    news.forEach((item) => {
      htmlTable.innerHTML += `
      <tr id="${item.id}">
        <th>${item.id}</th>
        <td>${item.title}</td>
        <td>${item.content}</td>
        <td>${item.date}</td>
        <td>
          <button type="button" class="btn btn-outline-danger btn-sm mx-1 my-1" onclick="deleteNew('${item.id}')">Delete</button>
        </td>
      </tr>
    `;
    });
  });
}

function addNew(event) {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;

  socket.emit('client:addNew', { title, content, date: new Date() });
  socket.on('server:newNew', (data) => {
    document.getElementById('tableContent').innerHTML += `
    <tr id="${data.id}">
      <th>${data.id}</th>
      <td>${data.title}</td>
      <td>${data.content}</td>
      <td>${data.date}</td>
      <td>
        <button type="button" class="btn btn-outline-danger btn-sm mx-1 my-1" onclick="deleteNew('${data.id}')">Delete</button>
      </td>
    </tr>
  `;
  });
}

function deleteNew(id) {
  document.getElementById(`${id}`).remove();
  socket.emit('client:deleteNew', id);
}
