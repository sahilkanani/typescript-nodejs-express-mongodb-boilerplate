import 'dotenv/config';
import '@/index';
import App from '@/app';
import AuthRoutes from '@routes/auth.route';
import ResourceRoutes from '@routes/resource.route';

const app = new App([new AuthRoutes(), new ResourceRoutes()]);

app.listen();
