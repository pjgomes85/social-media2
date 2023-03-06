import { Server } from "socket.io";

const io = new Server({
  cors:{
    origin:"http://localhost:3000"
  }
 });

io.on("connection", (socket) => {
  console.log("Someone has connected")

  console.log("Disconected", () =>{
    console.log("Someone has disconected!");
  } )
});

io.listen(3000);


// import { Server } from "socket.io";

// const io = new Server({
//   cors:{
//     origin:"http://localhost:3000"
//   }
//  });

// io.on("connection", (socket) => {
//   console.log("testSocket")

//   socket.on("Disconect", () => {
//     console.log("Someone left the session")
//   })
// });

// io.listen(5000);
