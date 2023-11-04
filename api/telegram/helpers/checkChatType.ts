import { GrammyContext } from '$grammy/context.ts';

export const isGroup = (context: GrammyContext) => {
	return context.hasChatType(['group', 'supergroup']);
};

export const isPrivate = (context: GrammyContext) => {
	return context.hasChatType('private');
};