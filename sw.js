const CACHE_NAME = "tochicolle-ipad-v2-cache-1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/backgrounds/monkey_climbing_trees_pair.png",
  "./assets/backgrounds/tochigi_forest_game_background_v2_1920x1080.png",
  "./assets/characters/c01_strawberry_A.png",
  "./assets/characters/c01_strawberry_B.png",
  "./assets/characters/c01_strawberry_C.png",
  "./assets/characters/c02_gyoza_A.png",
  "./assets/characters/c02_gyoza_B.png",
  "./assets/characters/c02_gyoza_C.png",
  "./assets/characters/c03_kanpyo_A.png",
  "./assets/characters/c03_kanpyo_B.png",
  "./assets/characters/c03_kanpyo_C.png",
  "./assets/characters/c04_nikko_monkey_A.png",
  "./assets/characters/c04_nikko_monkey_B.png",
  "./assets/characters/c04_nikko_monkey_C.png",
  "./assets/characters/c05_yuba_A.png",
  "./assets/characters/c05_yuba_B.png",
  "./assets/characters/c05_yuba_C.png",
  "./assets/characters/c06_oya_golem_A.png",
  "./assets/characters/c06_oya_golem_B.png",
  "./assets/characters/c06_oya_golem_C.png",
  "./assets/characters/c07_mashiko_tanuki_A.png",
  "./assets/characters/c07_mashiko_tanuki_B.png",
  "./assets/characters/c07_mashiko_tanuki_C.png",
  "./assets/characters/c08_golden_black_calf_A.png",
  "./assets/characters/c08_golden_black_calf_B.png",
  "./assets/characters/c08_golden_black_calf_C.png",
  "./assets/characters/c09_kanuma_phoenix_A.png",
  "./assets/characters/c09_kanuma_phoenix_B.png",
  "./assets/characters/c09_kanuma_phoenix_C.png",
  "./assets/characters/c10_nine_tailed_fox_A.png",
  "./assets/characters/c10_nine_tailed_fox_B.png",
  "./assets/characters/c10_nine_tailed_fox_C.png",
  "./assets/characters/c11_legendary_raijin_A.png",
  "./assets/characters/c11_legendary_raijin_B.png",
  "./assets/characters/c11_legendary_raijin_C.png",
  "./assets/foreground/grass_motion_a.png",
  "./assets/foreground/grass_motion_b.png",
  "./assets/foreground/grass_motion_c.png",
  "./assets/ui/app_icon_192.png",
  "./assets/ui/app_icon_512.png",
  "./assets/ui/reverth_credit.png",
  "./assets/ui/tochikore_hunter_title_logo.webp"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response;
  }).catch(()=>caches.match("./index.html"))));
});
