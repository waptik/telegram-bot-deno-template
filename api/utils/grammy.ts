import { type User } from 'grammy_types';

export function getFullName(from: User) {
	let name = from.last_name
		? `${from.first_name} ${from.last_name}`
		: from.first_name;

	if (from.username) {
		name += ` (@${from.username})`;
	}

	return name;
}

export function getProfileLink(from: User, html = true) {
	let link = `tg://user?id=${from.id}`;

	if (from.username) {
		link = `https://t.me/${from.username}`;
	}

	return html ? `<a href="${link}">${getFullName(from)}</a>` : link;
}

export const listOfCommands: Array<{
	command: string;
	description: string;
	show: boolean;
	// chats?: Array<number>;
	for?: 'all' | 'admins' | 'private';
}> = [
	{
		command: 'start',
		description: '👤 Account information',
		show: true,
		for: 'private',
	},
	{
		command: 'send_welcome_message',
		description: '🥳 Send welcome message to all users',
		show: false,
		for: 'admins',
	},
];