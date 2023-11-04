import { Context, isHttpError, Middleware, Status } from 'oak';
import { isDev } from '$utils/misc.ts';

const errorMiddleware = (): Middleware => async (ctx: Context, next) => {
	try {
		await next();
	} catch (err) {
		if (isHttpError(err)) {
			const status = err.status || err.status ||
				Status.InternalServerError;

			ctx.response.status = status;

			const { message, stack } = err;
			if (ctx.request.accepts('json')) {
				ctx.response.body = { message, status, stack };
				ctx.response.type = 'json';
			} else {
				ctx.response.body = `${status} ${message}\n\n${stack ?? ''}`;
				ctx.response.type = 'text/plain';
			}
		} else {
			if (isDev) console.log(err);
			throw err;
		}
	}

	// try {
	//   await next();
	// } catch (err) {
	//   let message = err.message;

	//   /**
	//    * considering all unhandled errors as internal server error,
	//    * do not want to share internal server errors to
	//    * end user in non "development" mode
	//    */
	//   if (!isHttpError(err)) {
	//     message = isDev ? message : "Internal Server Error";
	//   }

	//   if (isDev) {
	//     console.log(err);
	//   }

	//   ctx.response.status = status;
	//   ctx.response.body = { status, message };
	// }
};

export { errorMiddleware };