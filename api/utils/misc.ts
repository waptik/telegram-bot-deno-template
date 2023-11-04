import { crypto, toHashString } from '$std/crypto/mod.ts';
import {
	sweetid,
	SweetIdSize,
} from 'https://deno.land/x/sweetid@0.11.1/mod.ts';

export function getEnvOrThrow(name: string) {
	const value = Deno.env.get(name);
	if (value == null) {
		throw new Error(`Missing env variable: ${name}`);
	}
	return value;
}
export const nanoid = (size: SweetIdSize = 'm') => sweetid(size); // 6-character random string

// create a sleep function to delay the sending of messages
export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const isDev = typeof Deno.env.get('DENO_DEPLOYMENT_ID') === 'undefined'
	? true
	: false;

// https://github.com/cogentapps/chat-with-gpt/blob/main/src/utils.ts
const hashCache = new Map<string, string>();

export async function md5(data: string): Promise<string> {
	if (!hashCache.has(data)) {
		const hash = await crypto.subtle.digest(
			'MD5',
			new TextEncoder().encode(data),
		);
		const hashHex = toHashString(hash);
		hashCache.set(data, hashHex);
	}
	return hashCache.get(data)!;
}

export function cloneArrayBuffer(buffer: ArrayBuffer) {
	const newBuffer = new ArrayBuffer(buffer.byteLength);
	new Uint8Array(newBuffer).set(new Uint8Array(buffer));
	return newBuffer;
}

export function stripAtMentions(text = '') {
	return text.replaceAll(/\b\@([a-zA-Z0-9_]+\b)/g, '$1').trim();
}

export function pick<T extends Record<string, unknown>>(
	obj: T,
	...keys: string[]
) {
	return Object.fromEntries(
		keys.filter((key) => key in obj).map((key) => [key, obj[key]]),
	) as T;
}

export function omit<T extends Record<string, any>>(obj: T, ...keys: string[]) {
	return Object.fromEntries<T>(
		Object.entries(obj).filter(([key]) => !keys.includes(key)),
	) as T;
}

export function exists<T extends Record<string, any>>(obj: T, key: string) {
	const value = obj[key];
	return value !== null && value !== undefined;
}

export function chunk<T>(array: T[], size: number): Array<T[]> | T[] {
	if (!array) return [];
	const firstChunk = array.slice(0, size); // create the first chunk of the given array
	if (!firstChunk.length) {
		return array; // this is the base case to terminal the recursive
	}
	return [firstChunk].concat(chunk(array.slice(size, array.length), size));
}

export function mergeUniqueArray<T>(arr: T[], comp: never) {
	const unique = arr
		.map((item) => item[comp])
		// store the keys of the unique objects
		.map((item, i, final) => final.indexOf(item) === i && i)
		// eliminate the duplicate keys & store unique objects
		.filter((item) => arr[item as number])
		.map((item) => arr[item as number]);
	console.log('total unique users: ', unique.length);

	return unique;
}