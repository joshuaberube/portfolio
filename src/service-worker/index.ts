import { self } from '$app/service-worker';
import { version } from '$app/env';
import { assets, immutable } from '$app/manifest';
import { asset, resolve } from '$app/paths';

const CACHE = `pop-pops-${version}`;
const POP_POPS_ROUTE = resolve('/games/pop-pops');
const BASE = POP_POPS_ROUTE.slice(0, -'games/pop-pops'.length);

function resolveManifestPath(path: string) {
	return `${BASE}${path.replace(/^\//, '')}`;
}

// Cache the game itself, its compiled code, and its own static artwork.
// Currently this is only for the Pop pops game
const POP_POPS_FILES = [
	POP_POPS_ROUTE,
	...immutable.map(({ path }) => resolveManifestPath(path)),
	...assets
		.filter(
			({ path }) =>
				path.startsWith('games/pop-pops/') ||
				path === 'manifest.webmanifest' ||
				path === 'favicon-pop-pops.png'
		)
		.map(({ path }) => asset(path))
];

const popPopsFiles = new Set(POP_POPS_FILES);

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(POP_POPS_FILES)));
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		Promise.all([
			caches.keys().then((keys) =>
				Promise.all(
					keys
						.filter((key) => key.startsWith('pop-pops-') && key !== CACHE)
						.map((key) => caches.delete(key))
				)
			),
			self.clients.claim()
		])
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);
	const isGameNavigation =
		url.origin === self.location.origin &&
		event.request.mode === 'navigate' &&
		url.pathname === POP_POPS_ROUTE;
	const isGameFile = url.origin === self.location.origin && popPopsFiles.has(url.pathname);

	if (!isGameNavigation && !isGameFile) return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);

			// Use a fresh game page when online, falling back to the installed copy.
			if (isGameNavigation) {
				try {
					const response = await fetch(event.request);
					if (response.ok) void cache.put(POP_POPS_ROUTE, response.clone());
					return response;
				} catch {
					const cached = await cache.match(POP_POPS_ROUTE);
					if (cached) return cached;
					throw new Error('Pop Pops has not been downloaded for offline play yet.');
				}
			}

			const cached = await cache.match(event.request);
			return cached ?? fetch(event.request);
		})()
	);
});
