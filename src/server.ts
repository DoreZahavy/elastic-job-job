
import express, { Express } from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';

const app: Express = express();
const server = http.createServer(app);

// Express App Config
app.use(express.json());
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')));
} else {
    const corsOptions: cors.CorsOptions = {
        origin: [
            'http://127.0.0.1:3030',
            'http://localhost:3030',
        ],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// Routes
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.js';
app.all('*', setupAsyncLocalStorage);
import { jobRoutes } from './job/job.routes.js';

app.use('/job', jobRoutes);


const port: number = Number(process.env.PORT) || 3034;
server.listen(port, () => {
    console.log('Server is running on port: ' + port);
});