const { freeze: f, create: j } = Object;
class h extends Array {
}
const y = (e) => e instanceof h, u = (e) => y(e) ? e[0] ? e : u() : f(
  h.of(
    e instanceof Error ? e : Error(typeof e == "object" ? JSON.stringify(e) : String(e)),
    null
  )
), c = (e) => y(e) ? e : f(h.of(null, e)), p = [c, u], P = (e) => new Proxy(e, {
  async apply(...t) {
    try {
      return c(await Reflect.apply(...t));
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
      const l = b(r, i).slice(0, e);
      return l.length === e && !l.includes(m) ? Reflect.apply(s, o, l) : n(l);
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
  return () => (t || (t = !0, n = e()), n);
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
  if (!y(e))
    return a(c(e));
  const [t, n] = e;
  if (d(n))
    return n;
  const r = (o, i) => {
    try {
      return a(c(o(i)));
    } catch (l) {
      return a(u(l));
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
