const O = () => {
  let e, t;
  const n = new Promise((r, o) => {
    [e, t] = [r, o];
  });
  return { resolve: e, reject: t, pending: n };
}, { freeze: f, create: j } = Object;
class h extends Array {
}
const y = (e) => e instanceof h, u = (e) => y(e) ? e[0] ? e : u() : f(
  h.of(
    e instanceof Error ? e : Error(typeof e == "object" ? JSON.stringify(e) : String(e)),
    null
  )
), c = (e) => y(e) ? e : f(h.of(null, e)), p = [c, u], g = (e) => new Proxy(e, {
  async apply(...t) {
    try {
      return c(await Reflect.apply(...t));
    } catch (n) {
      return u(n);
    }
  }
}), P = Symbol(), b = (e, t) => {
  const n = [];
  let r = -1, o = -1;
  for (; ++r < e.length; )
    n.push(e[r] === P ? t[++o] : e[r]);
  for (; ++o < t.length; )
    n.push(t[o]);
  return n;
}, E = (e) => (t) => {
  const n = (r) => new Proxy(t, {
    apply(o, s, i) {
      const l = b(r, i).slice(0, e);
      return l.length === e && !l.includes(P) ? Reflect.apply(o, s, l) : n(l);
    }
  });
  return n([]);
}, R = E(2), w = (e) => new Promise((t) => setTimeout(t, e)), _ = R((e, t) => {
  let n = !0;
  const r = () => {
    n = !1;
  };
  return {
    loop: g(async () => {
      for (n = !0, await w(e); n; )
        await t(), await w(e);
    }),
    stop: r
  };
}), T = (...e) => (t) => {
  for (const n of e)
    t = n(t);
  return t;
}, A = (...e) => async (t) => {
  for (const n of e)
    t = n(await t);
  return t;
}, x = (e) => {
  let t = null;
  return new Proxy(e, {
    async apply(...n) {
      t == null && (t = Promise.resolve(Reflect.apply(...n)));
      const r = await t;
      return t = null, r;
    }
  });
}, B = T(x, g), z = (e) => {
  let t = !1, n;
  return (...r) => (t || (t = !0, n = e(...r)), n);
}, C = (e, t) => {
  const n = (e == null ? void 0 : e.length) ?? 0;
  return (r) => {
    const o = async (s) => s < n ? await e[s](
      r,
      z(() => o(s + 1))
    ) : await t(r);
    return o(0);
  };
};
class N extends Promise {
  pipe(t) {
    return super.then((n) => n[0] ? n : t(n[1])).then(...p);
  }
  ap(t) {
    return super.then((n) => n[0] ? n : n[1](t)).then(...p);
  }
}
const F = (e) => N.resolve(e).then(...p), m = Symbol(), S = Symbol(), d = (e) => e && e[m] == S, a = (e) => {
  if (d(e))
    return e;
  if (!y(e))
    return a(c(e));
  const [t, n] = e;
  if (d(n))
    return n;
  const r = (s, i) => {
    try {
      return a(c(s(i)));
    } catch (l) {
      return a(u(l));
    }
  }, o = j(null);
  return o[m] = S, o.join = () => e, o.map = (s) => t ? o : r(s, n), o.ap = (s) => t ? o : r(n, s), f(o);
}, G = (e) => {
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
  G as LRU,
  A as asyncPipe,
  O as defer,
  g as either,
  a as functor,
  _ as interval,
  d as isFunctor,
  B as lock,
  C as oni,
  T as pipe,
  F as pipeline,
  w as wait
};
