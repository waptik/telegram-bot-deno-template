import { GrammyContext } from '$grammy/context.ts';
import { Composer } from 'grammy';
import { isPrivate } from '$grammy/helpers/checkChatType.ts';
import { magicMenu } from '$grammy/handlers/menus/magic.menu.ts';

const composer = new Composer<GrammyContext>();

composer.filter(isPrivate).use(
	magicMenu,
);

export default composer;