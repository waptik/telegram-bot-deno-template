#!/usr/bin/env -S deno run -A --watch=static/,routes/

import '$std/dotenv/load.ts';
import './bot.ts';

import { error } from '$utils/error.ts';
import { gte, parse } from '$std/semver/mod.ts';

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
