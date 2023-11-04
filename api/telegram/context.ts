import { Context, SessionFlavor } from 'grammy';
import { Conversation, ConversationFlavor } from 'grammy_conversations';
import type { ParseModeFlavor } from 'grammy_parse_mode';

interface SessionUser {
	__language_code: string;
}

export interface GrammySession {
	user: SessionUser;
}

export type GrammyContext =
	& SessionFlavor<GrammySession>
	& ConversationFlavor & ParseModeFlavor<Context>;

export type GrammyConversation = Conversation<GrammyContext>;