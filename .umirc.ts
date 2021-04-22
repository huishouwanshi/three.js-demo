import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/page', component: '@/pages/page' },
    { path: '/ironMan', component: '@/pages/ironMan' },
  ],
  fastRefresh: {},
});
