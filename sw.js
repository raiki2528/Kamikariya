// Service Worker for background updates
const CACHE_NAME = 'lotuscard-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/icon copy.jpeg',
    '/background copy.jpeg',
    '/manifest.json'
];

// インストール時の処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// フェッチ時の処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // キャッシュがあれば返す
                if (response) {
                    return response;
                }
                // なければネットワークから取得
                return fetch(event.request);
            }
        )
    );
});

// バックグラウンド同期
self.addEventListener('sync', function(event) {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// バックグラウンド同期処理
function doBackgroundSync() {
    // データの更新処理
    return fetch('/api/update')
        .then(response => response.json())
        .then(data => {
            console.log('Background sync completed:', data);
        })
        .catch(err => {
            console.log('Background sync failed:', err);
        });
}

// プッシュ通知の処理
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : '新しい更新があります',
        icon: '/icon copy.jpeg',
        badge: '/icon copy.jpeg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('守永博貴', options)
    );
});

// 通知クリック時の処理
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
