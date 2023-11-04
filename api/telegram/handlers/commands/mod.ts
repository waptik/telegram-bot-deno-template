import { Composer } from 'grammy';

import { GrammyContext } from '$grammy/context.ts';

import drop from '$grammy/handlers/commands/drop.ts';
import privateChats from '$grammy/handlers/commands/private/mod.ts';
import groupChats from '$grammy/handlers/commands/groups/mod.ts';

const composer = new Composer<GrammyContext>();

composer.use(privateChats, groupChats, drop);

export default composer;