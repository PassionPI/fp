const { freeze: f, create: j } = Object;
class y extends Array {
}
const h = (e) => e instanceof y, u = (e) => h(e) ? e[0] ? e : u() : f(
  y.of(
    e instanceof Error ? e : Error(typeof e == "object" ? JSON.stringify(e) : String(e)),
    null
  )
), l = (e) => h(e) ? e : f(y.of(null, e)), p = [l, u], P = (e) => new Proxy(e, {
  async apply(...t) {
    try {
      return l(await Reflect.apply(...t));
    } catch (n) {
      return u(n);
    }
  }
}), m = Symbol(), b = (e, t) => {
  const n = [];
  let r = -1, s = -1;
  for (; ++r < e.length; )
    n.push(e[r] === m ? t[++s] : e[r]);
  for (; ++s < t.length; )
    n.push(t[s]);
  return n;
}, E = (e) => (t) => {
  const n = (r) => new Proxy(t, {
    apply(s, o, i) {
      const c = b(r, i).slice(0, e);
      return c.length === e && !c.includes(m) ? Reflect.apply(s, o, c) : n(c);
    }
  });
  return n([]);
}, R = E(2), w = (e) => new Promise((t) => setTimeout(t, e)), O = R((e, t) => {
  let n = !0;
  const r = () => {
    n = !1;
  };
  return {
    loop: P(async () => {
      for (n = !0, await w(e); n; )
        await t(), await w(e);
    }),
    stop: r
  };
}), T = (...e) => (t) => {
  for (const n of e)
    t = n(t);
  return t;
}, _ = (...e) => async (t) => {
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
}, A = T(x, P), z = (e) => {
  let t = !1, n;
  return async () => (t || (t = !0, n = await e()), n);
}, B = (e, t) => (n) => {
  const r = (s) => {
    var o;
    return Promise.resolve(
      ((o = e[s]) != null ? o : t)(
        n,
        z(() => r(s + 1))
      )
    );
  };
  return r(0);
}, C = () => {
  let e, t;
  const n = new Promise((r, s) => {
    [e, t] = [r, s];
  });
  return { resolve: e, reject: t, pending: n };
};
class N extends Promise {
  pipe(t) {
    return super.then((n) => n[0] ? n : t(n[1])).then(...p);
  }
  ap(t) {
    return super.then((n) => n[0] ? n : n[1](t)).then(...p);
  }
}
const F = (e) => N.resolve(e).then(...p), g = Symbol(), S = Symbol(), d = (e) => e && e[g] == S, a = (e) => {
  if (d(e))
    return e;
  if (!h(e))
    return a(l(e));
  const [t, n] = e;
  if (d(n))
    return n;
  const r = (o, i) => {
    try {
      return a(l(o(i)));
    } catch (c) {
      return a(u(c));
    }
  }, s = j(null);
  return s[g] = S, s.join = () => e, s.map = (o) => t ? s : r(o, n), s.ap = (o) => t ? s : r(n, o), f(s);
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
  _ as asyncPipe,
  P as either,
  a as functor,
  O as interval,
  d as isFunctor,
  A as lock,
  B as oni,
  C as pended,
  T as pipe,
  F as pipeline,
  w as wait
};
