import{c as s,j as r}from"./index-B5-umki7.js";/**
 * @license lucide-react v0.312.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=s("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);function x({icon:e,title:n,subtitle:t}){return r.jsxs("div",{className:"rounded-xl bg-gray-50 p-12 text-center",children:[r.jsx("div",{className:"mx-auto mb-4 h-12 w-12 text-gray-400",children:e}),r.jsx("p",{className:"text-lg text-gray-500",children:n}),t&&r.jsx("p",{className:"mt-2 text-gray-400",children:t})]})}const a="es-ES";function i(e,n="short"){const t=typeof e=="string"?new Date(e):e;return n==="long"?t.toLocaleDateString(a,{weekday:"long",day:"numeric",month:"long",year:"numeric"}):t.toLocaleDateString(a,{day:"numeric",month:"long",year:"numeric"})}export{o as C,x as E,i as f};
