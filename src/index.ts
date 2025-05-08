import expressInit from './config/app-config';
import routes from './routes';

const app = expressInit();

app.get('/test', (req, res) => {
    res.json({ test: 'Works!' });
})

app.use(routes);