import { Router } from 'oak';

import mainRouter from '$server/routes/main.router.ts';
import webhooksRouter from '$server/routes/webhooks/mod.ts';

const router: Router = new Router();

router.use(mainRouter.routes());
router.use('/webhooks', webhooksRouter.routes());

export { router };