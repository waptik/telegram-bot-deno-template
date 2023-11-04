import { getErrorFromUnknown } from '$utils/errors.ts';

export function handleErrorMessage(e: Error) {
	const error = getErrorFromUnknown(e);

	const hasReply = error.message.startsWith('reply:');
	const reason =
		`<b>${error.name}</b> - <b>${error.message}</b>. \nPlease try again later.`;
	let message = hasReply
		? error.message.replace('reply:', '').trim()
		: `⛔ An error occurred⛔.\nReason: ${reason}
		`;

	message +=
		'\n\nIf this issue persisting, please report it by using /feedback command and include hashtags in your message.';

	return message;
}