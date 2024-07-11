const { freeze: x, create: T } = Object;
class w extends Array {
}
const q = (t) => t instanceof w, m = (t) => q(t) ? t[0] ? t : m() : x(
  w.of(
    t instanceof Error ? t : Error(typeof t == "object" ? JSON.stringify(t) : String(t)),
    null
  )
), _ = (t) => q(t) ? t : x(w.of(null, t)), f = [_, m], P = (t) => new Proxy(t, {
  async apply(...e) {
    try {
      return _(await Reflect.apply(...e));
    } catch (n) {
      return m(n);
    }
  }
}), b = () => {
  let t = () => {
  }, e = () => {
  };
  const n = new Promise((u, a) => {
    [t, e] = [u, a];
  }), r = P(() => n), c = () => n;
  return r.unwrap = c, { resolve: t, reject: e, pending: r };
}, z = 0, h = 20, d = 10, E = (t) => typeof t != "number" ? d : Math.floor(Math.max(z, Math.min(h, t))), I = ({
  max_concurrency: t = 2
} = {}) => {
  const e = {
    max_concurrency: t,
    current_count: 0,
    queue: Array.from({ length: h + 1 }, () => /* @__PURE__ */ new Set())
  }, n = (s) => {
    if (s != null) {
      const o = E(s);
      return e.queue[o];
    }
    for (let o = h; o >= 0; o--)
      if (e.queue[o].size > 0)
        return e.queue[o];
    return e.queue[d];
  }, r = (s, { priority: o } = {}) => {
    const l = b(), i = n(o ?? d), p = l.resolve, j = l.pending, y = (M) => {
      l.reject(M), i.delete(g);
    }, g = { task: s, resolve: p, reject: y };
    return i.add(g), a(), { pending: j, reject: y };
  }, c = () => e.current_count === e.max_concurrency, u = (s) => {
    let o = n(s);
    for (; o.size; )
      o.forEach((l) => l.reject()), o.clear(), o = n(s);
  }, a = () => {
    let s = n();
    for (; !c() && s.size; ) {
      e.current_count++;
      const o = s.values().next().value, { task: l, reject: i, resolve: p } = o;
      s.delete(o), s = n(), Promise.resolve().then(l).then(p).catch(i).finally(() => {
        e.current_count--, a();
      });
    }
  };
  return {
    add: r,
    busy: c,
    clear: u
  };
}, v = (...t) => (e) => {
  for (const n of t)
    e = n(e);
  return e;
}, N = (...t) => async (e) => {
  for (const n of t)
    e = n(await e);
  return e;
}, A = (t) => {
  let e = null;
  return new Proxy(t, {
    async apply(...n) {
      e == null && (e = Promise.resolve(Reflect.apply(...n)));
      const r = await e;
      return e = null, r;
    }
  });
}, O = v(A, P), R = (t) => {
  let e = !1, n;
  return (...r) => (e || (e = !0, n = t(...r)), n);
}, B = (t, e) => {
  const n = (t == null ? void 0 : t.length) ?? 0;
  return (r) => {
    const c = async (u) => u < n ? await t[u](
      r,
      R(() => c(u + 1))
    ) : await e(r);
    return c(0);
  };
};
class S extends Promise {
  pipe(e) {
    return super.then((n) => n[0] ? n : e(n[1])).then(...f);
  }
  ap(e) {
    return super.then((n) => n[0] ? n : n[1](e)).then(...f);
  }
}
const D = (t) => S.resolve(t).then(...f), J = (t) => {
  const e = /* @__PURE__ */ new Map();
  return {
    get(n) {
      const r = e.get(n);
      return e.has(n) && (e.delete(n), e.set(n, r)), r;
    },
    set(n, r) {
      e.has(n) && e.delete(n), e.set(n, r), e.size > t && e.delete(e.keys().next().value);
    }
  };
}, L = (t) => new Promise((e) => setTimeout(e, t));
export {
  J as LRU,
  N as async_pipe,
  I as concurrent,
  b as defer,
  P as either,
  O as lock,
  B as oni,
  v as pipe,
  D as pipeline,
  L as wait
};
