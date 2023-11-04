import { Composer } from 'grammy';

import { GrammyContext } from '$grammy/context.ts';

import drop from '$grammy//commands/drop.ts';
import privateChats from '$grammy/handlers/commands/private/mod.ts';

const composer = new Composer<GrammyContext>();

composer.use(privateChats);

export default composer;