const express = require("express")

PORT = 3000
const app = express();

app.get('/', (req, res) => {
    res.send("Hello from docker ");
})


app.listen(PORT , () => {
    console.log(`server running on http://localhost:${PORT}`);
})