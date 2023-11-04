import { getErrorFromUnknown } from '$utils/errors.ts';

export function handleErrorMessage(e: Error) {
	const error = getErrorFromUnknown(e);

	const hasReply = error.message.startsWith('reply:');
	const reason =
		`<b>${error.name}</b> - <b>${error.message}</b>. \nPlease try again later.`;
	const message = hasReply
		? error.message.replace('reply:', '').trim()
		: `⛔ An error occurred⛔.\nReason: ${reason}
		`;
	return message;
}