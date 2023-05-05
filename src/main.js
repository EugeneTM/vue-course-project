/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import { router } from './router/index.js';
import { createProgress } from './plugins/progress/index.js';
import { createToaster } from './plugins/toaster/index.js';

const pinia = createPinia();
const progress = createProgress({ container: '#progress', router });
const toaster = createToaster({ container: '#toaster' });

// TODO: установить плагины: head(title)
createApp(App)
    .use(router)
    .use(pinia)
    .use(progress)
    .use(toaster)
    .mount('#app');

// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
