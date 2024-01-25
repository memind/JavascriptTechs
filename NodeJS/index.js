console.log("Node was here... ");
const fs = require("fs")

// fs.writeFile("message.txt", "Node was here...", (error) => {
//     console.log(error);
// });
const path = "C:/Users/rock_/OneDrive/Belgeler/PROJELER2/memind/FRONTEND/Javascript/NodeJS/message.txt";
fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});