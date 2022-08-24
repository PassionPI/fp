const { freeze: i, create: b } = Object;
class a extends Array {
}
const p = (e) => e instanceof a, f = (e) => p(e) ? e[0] ? e : f() : i(
  a.of(
    e instanceof Error ? e : Error(typeof e == "object" ? JSON.stringify(e) : String(e)),
    null
  )
), u = (e) => p(e) ? e : i(a.of(null, e)), l = [u, f], y = (e) => new Proxy(e, {
  apply(...t) {
    return Promise.resolve().then(() => Reflect.apply(...t)).then(...l);
  }
}), h = (e) => new Promise((t) => setTimeout(t, e)), R = (e) => {
  let t = !0;
  const n = () => {
    t = !1;
  };
  return {
    loop: y(async (s) => {
      for (t = !0, await h(e); t; )
        await s(), await h(e);
    }),
    stop: n
  };
}, S = (...e) => (t) => {
  for (const n of e)
    t = n(t);
  return t;
}, x = (...e) => async (t) => {
  for (const n of e)
    t = n(await t);
  return t;
}, j = (e) => {
  let t = null;
  return new Proxy(e, {
    async apply(...n) {
      t == null && (t = Reflect.apply(...n));
      const r = await t;
      return t = null, r;
    }
  });
}, z = S(j, y), E = (e) => {
  let t = !1, n;
  return async () => (t || (t = !0, n = await e()), n);
}, N = (e, t) => (n) => {
  const r = (s) => {
    var o;
    return ((o = e[s]) != null ? o : t)(
      n,
      E(() => r(s + 1))
    );
  };
  return r(0);
}, O = () => {
  let e, t;
  const n = new Promise((r, s) => {
    [e, t] = [r, s];
  });
  return { resolve: e, reject: t, pending: n };
};
class T extends Promise {
  pipe(t) {
    return super.then((n) => n[0] ? n : t(n[1])).then(...l);
  }
  ap(t) {
    return super.then((n) => n[0] ? n : n[1](t)).then(...l);
  }
}
const A = (e) => T.resolve(e).then(...l), d = Symbol(), P = Symbol(), w = (e) => e && e[d] == P, c = (e) => {
  if (w(e))
    return e;
  if (!p(e))
    return c(u(e));
  const [t, n] = e;
  if (w(n))
    return n;
  const r = (o, m) => {
    try {
      return c(u(o(m)));
    } catch (g) {
      return c(f(g));
    }
  }, s = b(null);
  return s[d] = P, s.join = () => e, s.map = (o) => t ? s : r(o, n), s.ap = (o) => t ? s : r(n, o), i(s);
}, B = (e) => {
  const t = /* @__PURE__ */ new Map();
  return {
    get(n) {
      const r = t.get(n);
      return t.has(n) && (t.delete(n), t.set(n, r)), r;
    },
    set(n, r) {
      t.has(n) && t.delete(n), t.set(n, r), t.size > e && t.delete(t.keys().next().value);
    }
  };
};
export {
  B as LRU,
  x as asyncPipe,
  y as either,
  c as functor,
  R as interval,
  w as isFunctor,
  z as lock,
  N as oni,
  O as pended,
  S as pipe,
  A as pipeline,
  h as wait
};
