import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Composition
export function useProgress() {
    return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
    const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));

    const progressBarInstance = createApp(TheTopProgressBar).mount(container ?? addDefaultContainer());

    const progress = {
        start: progressBarInstance.start,
        finish: progressBarInstance.finish,
        fail: progressBarInstance.fail,
        install(app) {
            app.provide(PROGRESS_KEY, progress);
        }
    }

    if (router) {
        router.beforeEach(() => {
            progress.start();
        })

        router.afterEach(() => {
            progress.finish();
        })

        router.onError(() => progress.fail());
    }

    return progress;
}

