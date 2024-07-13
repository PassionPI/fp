const P = (t) => typeof t != "number" ? 10 : Math.floor(Math.max(0, Math.min(20, t))), { freeze: y, create: D } = Object;
class h extends Array {
}
const M = (t) => t instanceof h, d = (t) => M(t) ? t[0] ? t : d() : y(
  h.of(
    t instanceof Error ? t : Error(typeof t == "object" ? JSON.stringify(t) : String(t)),
    null
  )
), g = (t) => M(t) ? t : y(h.of(null, t)), f = [g, d], x = (t) => new Proxy(t, {
  async apply(...e) {
    try {
      return g(await Reflect.apply(...e));
    } catch (n) {
      return d(n);
    }
  }
}), j = () => {
  let t = () => {
  }, e = () => {
  };
  const n = new Promise((u, a) => {
    [t, e] = [u, a];
  }), r = x(() => n), c = () => n;
  return r.unwrap = c, { resolve: t, reject: e, pending: r };
}, E = ({
  max_concurrency: t = 2
} = {}) => {
  const e = {
    max_concurrency: t,
    current_count: 0,
    queue: Array.from({ length: 21 }, () => /* @__PURE__ */ new Set())
  }, n = (s) => {
    if (s != null) {
      const o = P(s);
      return e.queue[o];
    }
    for (let o = 20; o >= 0; o--)
      if (e.queue[o].size > 0)
        return e.queue[o];
    return e.queue[10];
  }, r = (s, { priority: o } = {}) => {
    const l = j(), i = n(o ?? 10), p = l.resolve, q = l.pending, w = (_) => {
      l.reject(_), i.delete(m);
    }, m = { task: s, resolve: p, reject: w };
    return i.add(m), a(), { pending: q, reject: w };
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
}, A = (...t) => (e) => {
  for (const n of t)
    e = n(e);
  return e;
}, X = (...t) => async (e) => {
  for (const n of t)
    e = n(await e);
  return e;
}, I = (t) => {
  let e = null;
  return new Proxy(t, {
    async apply(...n) {
      e == null && (e = Promise.resolve(Reflect.apply(...n)));
      const r = await e;
      return e = null, r;
    }
  });
}, v = A(I, x), b = (t) => {
  let e = !1, n;
  return (...r) => (e || (e = !0, n = t(...r)), n);
}, N = (t, e) => {
  const n = (t == null ? void 0 : t.length) ?? 0;
  return (r) => {
    const c = async (u) => u < n ? await t[u](
      r,
      b(() => c(u + 1))
    ) : await e(r);
    return c(0);
  };
};
class z extends Promise {
  pipe(e) {
    return super.then((n) => n[0] ? n : e(n[1])).then(...f);
  }
  ap(e) {
    return super.then((n) => n[0] ? n : n[1](e)).then(...f);
  }
}
const R = (t) => z.resolve(t).then(...f), S = (t) => {
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
}, T = (t) => new Promise((e) => setTimeout(e, t));
export {
  S as LRU,
  X as async_pipe,
  E as concurrent,
  j as defer,
  x as either,
  v as lock,
  N as onion,
  A as pipe,
  R as pipeline,
  T as wait
};
