if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,r,c)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const n={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return i;case"module":return n;default:return e(s)}}))).then((e=>{const s=c(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-8778d57b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/N2p161_VCEsGrWvTxE9I8/_buildManifest.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/N2p161_VCEsGrWvTxE9I8/_ssgManifest.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/38abd0782dac803703fb667b7247d706c3a049d9.510d54c464e2a79c10a9.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/4f6d36547fddd28aaa46f3b3bab921d84385bcd2.b0b945f75e6e254ce92d.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/a4d650403ea580155fd485cdcb40b9919fb5d39a.3c4a8ee5110298efdbb9.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/cff30d5596864a530b7fb7bd492cf97fb92b2312.fc962a59c42363f2b1e9.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/commons.86a5043b44f829a607bb.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/e82996df.0c70db5160cc7ba24ed0.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/framework.29f9e2f3d4a33bafbaa5.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/main-a50815646bcc3b7d0b3b.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/pages/_app-b393f6924d86e95cca4d.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/pages/_error-c3639d1ce8c7c27b7056.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/pages/dashboard-b2c356500d5314643936.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/pages/devices-06bdb541ec7e8718a9df.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/pages/devices/%5Bid%5D-1e24c23c0025311c3337.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/pages/index-e580dfae4e24d8cbaff0.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/pages/processes-77ef16cf34c9594fc77a.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/pages/processes/%5Bid%5D-28e4d6ecaeb00873d8af.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/polyfills-0ca561c494dfca2f8695.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/chunks/webpack-245f049e565ebf942e09.js",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/_next/static/css/51711a9180651dfd0aa6.css",revision:"N2p161_VCEsGrWvTxE9I8"},{url:"/android-chrome-192x192.png",revision:"526d2c52ed7c656b554839f25f321909"},{url:"/android-chrome-256x256.png",revision:"5f64614b63b2540a416acf6d0b97d918"},{url:"/apple-touch-icon.png",revision:"db5a9227d92d62de2b898f4c1613440a"},{url:"/browserconfig.xml",revision:"91489e9cf4a8c2844bc3dd24cb20e66a"},{url:"/favicon-16x16.png",revision:"8fa41bdb4d85f833cc7c71a1e85d40e6"},{url:"/favicon-32x32.png",revision:"b4c8c8c8642c34ce8d920c6254e50d7f"},{url:"/favicon.ico",revision:"da8099c53bda3cf413cf61e140d8b6af"},{url:"/images/icon-128x128.png",revision:"abb125471d30d1bdaa053526ba3730e3"},{url:"/images/icon-144x144.png",revision:"496714005ed6d67ea88984214884bda7"},{url:"/images/icon-152x152.png",revision:"9cf57b7aa2c8bccf38bb46ae8d263793"},{url:"/images/icon-192x192.png",revision:"6a86791f235347f686238b1fa595b24f"},{url:"/images/icon-384x384.png",revision:"a85fed287ec037a77d70bf5116696430"},{url:"/images/icon-512x512.png",revision:"a85fed287ec037a77d70bf5116696430"},{url:"/images/icon-72x72.png",revision:"6c762d36ef7cc0df99a4b74f93aea57a"},{url:"/images/icon-96x96.png",revision:"1d1c4dc699de54e93dc5f6d3c08ee128"},{url:"/images/icon-light-512x512.png",revision:"7c5c3a6bcd96f984f23c530727aec688"},{url:"/images/icon-light-72x72.png",revision:"bf1b555139fbb81427dba8bb6417a61e"},{url:"/manifest.json",revision:"a893bcd196ab1c7599fc636786501782"},{url:"/mstile-150x150.png",revision:"76dc15c39299acf57c982da6e36645c5"},{url:"/safari-pinned-tab.svg",revision:"77ac2468839332e542d7dfd662988639"},{url:"/viewport-adjust.js",revision:"6b8bac3b6cfcff47988da4a3437b931d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
