import express from 'express';
import connectDb from './config/db';
import skins from "./routes/skins";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', 
        info: {
            title: 'CS2 Skin REST API',
            version: '1.0.0',
            description: "A REST API built with Express and MongoDB. This API provides skins of CS2."
        },
    },
    apis: ["./src/routes/skins.ts"] // Note: Update this if your files are .ts or .mjs
};

app.use('/skins', skins);
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
