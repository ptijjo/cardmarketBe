import { App } from '@/app';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { AddressRoute } from './routes/address.route';

ValidateEnv();

const app = new App([new UserRoute(), new AddressRoute()]);

app.listen();
