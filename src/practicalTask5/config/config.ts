import convict = require("convict");


export const config = convict({
    port: {
        doc: "Port for requests listening from client",
        format: Number,
        default: 3000,
        env: "PORT",
    },
}).getProperties();