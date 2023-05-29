import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Обробка помилок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(`${err.stack}`);
    res.status(500).send(`[Error occurred]: ${err.stack}`);
});

app.listen(port, () => {
    console.log('Server is running');
});

module.exports = app;