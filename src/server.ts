import express, { Express } from 'express';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
dotenv.config();

const app: Express = express();
const server = http.createServer(app);

const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const io = new WebSocketServer().listen(server);

const news = [
  { id: '1', title: 'The cure of the Sadness is to play Videogames', content: 'lorem lorem lorem lorem lorem lorem lorem ', date: '04.10.2016' },
  { id: '2', title: 'Batman saves Racoon City, the Joker is infected once again', content: 'lorem lorem lorem lorem lorem lorem lorem ', date: '05.10.2016' },
  { id: '3', title: "Deadpool doesn't want to do a third part of the franchise", content: 'lorem lorem lorem lorem lorem lorem lorem ', date: '05.10.2016' },
  { id: '4', title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales', content: 'lorem lorem lorem lorem lorem lorem lorem ', date: '04.10.2016' }
];

io.on('connection', (socket) => {
  console.log('Connected succesfully to the socket ...', socket.id);

  socket.emit('news', news);

  socket.on('client:addNew', (data) => {
    const newNew = { id: uuid(), ...data };
    news.push(newNew);

    socket.emit('server:newNew', newNew);
  });

  socket.on('client:deleteNew', (id) => {
    const indexNew = news.findIndex((item) => item.id === id);
    news.splice(indexNew, 1);
  });
});
