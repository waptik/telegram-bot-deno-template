import { GrammyContext, GrammySession } from '$grammy/context.ts';
import {
	Composer,
	enhanceStorage,
	session as grammySession,
} from 'grammy';

import { DenoKVAdapter } from 'https://deno.land/x/grammy_storages@v2.3.2/denokv/src/mod.ts';

const session = new Composer<GrammyContext>();
const kv = await Deno.openKv()

function createInitialSession(): GrammySession {
	return {
		__language_code: 'en',
	};
}

function startOfSession(old: GrammySession): GrammySession {
	const newData: GrammySession = {
		...old
	};

	return newData;
}

const storage = new DenoKVAdapter<any>(kv);

session.use(
	grammySession({
		initial: createInitialSession,
		getSessionKey: (ctx) =>
			`${ctx.chat?.id.toString()}_${ctx.from?.id?.toString()}`,
		storage: enhanceStorage({
			storage,
			migrations: {
				1: startOfSession,
			},
		}),
	}),
);
export default session;