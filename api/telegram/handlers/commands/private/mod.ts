import { Composer } from 'grammy';

import { GrammyContext } from '$grammy/context.ts';

import { isPrivate } from '$grammy/helpers/checkChatType.ts';
import help from '$grammy/handlers/commands/private/help.ts';
import start from '$grammy/handlers/commands/private/start.ts';

const composer = new Composer<GrammyContext>();

composer
    .filter(isPrivate)
    .use(
        start,
        help,
    );

export default composer;