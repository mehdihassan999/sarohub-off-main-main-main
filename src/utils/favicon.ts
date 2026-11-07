/**
 * SaroHub Dynamic Favicon Utility
 * Manages live, persistent, and seamless favicon synchronization in the browser tab.
 */

export const DEFAULT_FAVICON_SVG = '/assets/favicon.svg';
export const DEFAULT_FAVICON_PNG = '/assets/favicon-32x32.png';
export const DEFAULT_FAVICON_ICO = '/favicon.ico';
export const DEFAULT_FAVICON_APPLE = '/assets/apple-touch-icon.png';

export function getEffectiveFavicon(settings?: { [key: string]: any }): string {
  if (settings && typeof settings.favicon_url === 'string' && settings.favicon_url.trim()) {
    return settings.favicon_url.trim();
  }
  if (typeof window !== 'undefined') {
    const globalFav = (window as any).__SAROHUB_FAVICON__;
    if (globalFav && typeof globalFav === 'string' && globalFav.trim()) {
      return globalFav.trim();
    }
    const serverFavicon = document.getElementById('sarohub-favicon-svg')?.getAttribute('href');
    if (serverFavicon && serverFavicon.includes('?')) {
      return serverFavicon.trim();
    }
    try {
      const stored = localStorage.getItem('sarohub_favicon');
      if (stored && typeof stored === 'string' && stored.trim()) {
        return stored.trim();
      }
    } catch {
      // LocalStorage access restricted
    }
  }
  return DEFAULT_FAVICON_SVG;
}

export function updateDocumentFavicon(rawUrl?: string): void {
  if (typeof document === 'undefined') return;

  const url = (rawUrl !== undefined && rawUrl !== null && rawUrl.trim() !== ''
    ? rawUrl
    : getEffectiveFavicon()
  ).trim() || DEFAULT_FAVICON_SVG;

  // Save to in-memory global and LocalStorage for immediate zero‑flash reload
  if (typeof window !== 'undefined') {
    (window as any).__SAROHUB_FAVICON__ = url;
    try {
      localStorage.setItem('sarohub_favicon', url);
    } catch {
      // ignore
    }
  }

  const cleanUrl = url.split('?')[0].toLowerCase();
  let mimeType = 'image/png';
  if (cleanUrl.endsWith('.svg')) {
    mimeType = 'image/svg+xml';
  } else if (cleanUrl.endsWith('.ico')) {
    mimeType = 'image/x-icon';
  } else if (cleanUrl.endsWith('.webp')) {
    mimeType = 'image/webp';
  } else if (cleanUrl.endsWith('.jpg') || cleanUrl.endsWith('.jpeg')) {
    mimeType = 'image/jpeg';
  }

  // Force DOM element replacement to notify Chromium, Safari, and Firefox tab renderers
  const updateLink = (id: string, rel: string, type?: string, sizes?: string) => {
    let existing = (document.getElementById(id) || document.querySelector(`link[rel="${rel}"]`)) as HTMLLinkElement | null;
    const fresh = document.createElement('link');
    fresh.id = id;
    fresh.rel = rel;
    // Append cache‑busting timestamp
    const bustUrl = url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now();
    fresh.href = bustUrl;
    if (type) fresh.type = type;
    if (sizes) fresh.setAttribute('sizes', sizes);

    if (existing && existing.parentNode) {
      existing.parentNode.replaceChild(fresh, existing);
    } else {
      document.head.appendChild(fresh);
    }
  };

  updateLink('sarohub-favicon-32', 'icon', mimeType, '32x32');
  updateLink('sarohub-favicon-16', 'icon', mimeType, '16x16');
  updateLink('sarohub-favicon-svg', 'icon', mimeType);
  updateLink('sarohub-favicon-ico', 'shortcut icon');
  updateLink('sarohub-favicon-apple', 'apple-touch-icon', undefined, '180x180');

  // Windows Tile Image
  let tileMeta = (document.getElementById('sarohub-favicon-tile') || document.querySelector('meta[name="msapplication-TileImage"]')) as HTMLMetaElement | null;
  if (!tileMeta) {
    tileMeta = document.createElement('meta');
    tileMeta.id = 'sarohub-favicon-tile';
    tileMeta.name = 'msapplication-TileImage';
    document.head.appendChild(tileMeta);
  }
  tileMeta.content = url;
}
