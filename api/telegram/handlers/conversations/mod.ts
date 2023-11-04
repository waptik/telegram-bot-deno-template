import { GrammyContext } from '$grammy/context.ts';
import { Composer } from 'grammy';
import { isPrivate } from '$grammy/helpers/mod.ts';

import feedbackConversation from '$grammy/handlers/conversations/feedback.convo.ts';

const conversationComposer = new Composer<GrammyContext>();

// Only in private chats
conversationComposer
	.filter(isPrivate)
	.use(feedbackConversation);

export default conversationComposer;