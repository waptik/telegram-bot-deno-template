import { Router } from 'oak';

import botfatherRouter from '$server/routes/webhooks/botfather.router.ts';

const webhooksRouter: Router = new Router();

webhooksRouter.use(botfatherRouter.routes());

export default webhooksRouter;