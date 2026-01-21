module.exports = [
"[project]/src/mocks/browser.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_985a9e58._.js",
  "server/chunks/ssr/src_mocks_1dcc83ea._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/mocks/browser.ts [app-ssr] (ecmascript)");
    });
});
}),
];