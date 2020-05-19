const server= require("./server")

const port = process.env.PORT || 4000

server.listen(port, (req, res) => {
    console.log(`\n Running on port ${port} \n`)
})