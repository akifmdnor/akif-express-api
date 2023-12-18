const express = require('express');
const connectDb = require("./config/db");
const { skins } = require("./routes/index");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'CS2 Skin REST API',
            description: "A REST API built with Express and MongoDB. This API provides skins of CS2."
        },
    },
    apis: ["./routes/skins.js"]
}

app.use('/skins', skins)
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT || 5000, () => console.log('Up and running 🚀'));