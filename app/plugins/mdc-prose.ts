import { ProseImg, ProsePre } from '#components';

// <MDC> resolves markdown elements at runtime, outside auto-import reach,
// so the content overrides must exist as real globals.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('ProseImg', ProseImg);
  nuxtApp.vueApp.component('ProsePre', ProsePre);
});
