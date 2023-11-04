#!/usr/bin/env -S deno run -A --watch=static/,routes/

import '$std/dotenv/load.ts';
import './bot.ts';

import { gte, parse } from '$std/semver/mod.ts';

 function printError(message: string) {
	console.error(`%cerror%c: ${message}`, 'color: red; font-weight: bold', '');
}

 function error(message: string): never {
	printError(message);
	Deno.exit(1);
}

const MIN_DENO_VERSION = "1.31.0";

export function ensureMinDenoVersion() {
	// Check that the minimum supported Deno version is being used.
	if (!gte(parse(Deno.version.deno), parse(MIN_DENO_VERSION))) {
		let message =
			`Deno version ${MIN_DENO_VERSION} or higher is required. Please update Deno.\n\n`;

		if (Deno.execPath().includes('homebrew')) {
			message +=
				'You seem to have installed Deno via homebrew. To update, run: `brew upgrade deno`\n';
		} else {
			message += 'To update, run: `deno upgrade`\n';
		}

		error(message);
	}
}

async function dev(base: string, entrypoint: string) {
	ensureMinDenoVersion();

	entrypoint = new URL(entrypoint, base).href;

	await import(entrypoint);
}

await dev(import.meta.url, './edge.ts');
