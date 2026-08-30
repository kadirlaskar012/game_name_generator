import { e as createComponent, k as renderComponent, m as maybeRenderHead, r as renderTemplate, h as createAstro } from '../../chunks/astro/server_BsBWdKrh.mjs';
import 'piccolore';
import { c as createLucideIcon, $ as $$SeoHead } from '../../chunks/createLucideIcon_BXIrLuf3.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { A as ArrowRight } from '../../chunks/arrow-right_BXE5_Eo6.mjs';
import { v as validateAdminSession } from '../../chunks/auth_BOT6wdmU.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("Lock", __iconNode$2);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$1 = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
];
const Mail = createLucideIcon("Mail", __iconNode$1);

/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("ShieldCheck", __iconNode);

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid credentials");
      }
      window.location.href = "/admin/";
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md mx-auto bg-gaming-card border border-gaming-border rounded-2xl p-8 shadow-neon-cyan backdrop-blur-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex p-3 bg-gaming-accent/10 border border-gaming-accent/40 rounded-2xl text-gaming-accent mb-3 shadow-glow-sm", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white font-gaming", children: "Admin Login" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Authorized personnel only. Access platform control center." })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "p-3 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-mono text-gray-400 block mb-1", children: "Email / Admin Username" }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
          /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-gray-500 absolute left-3" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "admin@gamertagpro.com",
              className: "w-full pl-9 pr-3 py-2.5 bg-gaming-darker border border-gaming-border rounded-xl text-white text-xs outline-none focus:border-gaming-accent"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-mono text-gray-400 block mb-1", children: "Password" }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
          /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4 text-gray-500 absolute left-3" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "••••••••••••",
              className: "w-full pl-9 pr-3 py-2.5 bg-gaming-darker border border-gaming-border rounded-xl text-white text-xs outline-none focus:border-gaming-accent"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full py-2.5 px-4 bg-gaming-accent hover:bg-gaming-neon text-black font-bold text-xs rounded-xl shadow-neon-cyan hover:shadow-neon-green transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50",
          children: [
            loading ? "Authenticating..." : "Sign In to Admin Panel",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-gaming-border/60 text-center text-[11px] text-gray-500 font-mono", children: [
      "Default developer password: ",
      /* @__PURE__ */ jsx("span", { className: "text-gaming-accent", children: "admin123" }),
      " or Supabase User"
    ] })
  ] });
};

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const auth = await validateAdminSession(Astro2.request);
  if (auth.isAuthenticated) {
    return Astro2.redirect("/admin/");
  }
  return renderTemplate`<html lang="en" class="dark"> ${renderComponent($$result, "SeoHead", $$SeoHead, { "title": "Admin Login | GamerTag Pro", "description": "Sign in to platform control center", "robots": "noindex, nofollow" })}${maybeRenderHead()}<body class="bg-gaming-darker text-gray-100 min-h-screen flex items-center justify-center p-4 antialiased selection:bg-gaming-accent selection:text-black"> <div class="fixed inset-0 pointer-events-none z-[-1] cyber-grid opacity-50"></div> ${renderComponent($$result, "AdminAuth", AdminAuth, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/islands/AdminAuth", "client:component-export": "AdminAuth" })} </body></html>`;
}, "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/KadiR-PC/Documents/Antigravity/name generator website/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
