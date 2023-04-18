var z = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
};
var r = (e, t, s) => (z(e, t, "read from private field"), s ? s.call(e) : t.get(e)), u = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, i = (e, t, s, n) => (z(e, t, "write to private field"), n ? n.call(e, s) : t.set(e, s), s), y = (e, t, s, n) => ({
  set _(l) {
    i(e, t, l, s);
  },
  get _() {
    return r(e, t, n);
  }
});
class T {
  constructor(t) {
    this.next = null, this.value = t;
  }
}
var h, a, o;
class N {
  constructor() {
    u(this, h, null);
    u(this, a, null);
    u(this, o, 0);
  }
  size() {
    return r(this, o);
  }
  clear() {
    i(this, h, null), i(this, a, null), i(this, o, 0);
  }
  shift() {
    const t = r(this, h);
    return r(this, o) && (i(this, h, t.next), y(this, o)._--), r(this, o) || (i(this, h, null), i(this, a, null)), t == null ? void 0 : t.value;
  }
  push(t) {
    const s = new T(t);
    r(this, o) ? (r(this, a).next = s, i(this, a, s)) : (i(this, h, s), i(this, a, s)), y(this, o)._++;
  }
}
h = new WeakMap(), a = new WeakMap(), o = new WeakMap();
var d, f, p, w;
const g = class {
  constructor(t) {
    u(this, d, void 0);
    u(this, f, void 0);
    u(this, p, void 0);
    u(this, w, void 0);
    i(this, f, 0), i(this, p, new N()), this.add = (n) => new Promise((l, c) => {
      r(this, p).push({
        task: n,
        resolve: l,
        reject: c
      }), r(this, w).call(this);
    }), this.busy = () => r(this, f) === r(this, d), this.clear = () => {
      r(this, p).clear();
    }, i(this, w, () => {
      for (; !this.busy() && r(this, p).size() > 0; ) {
        const { task: n, reject: l, resolve: c } = r(this, p).shift();
        y(this, f)._++, Promise.resolve().then(n).then(c).catch(l).finally(() => {
          y(this, f)._--, r(this, w).call(this);
        });
      }
    });
    const { max_concurrency: s } = t || {};
    i(this, d, s ?? 2);
  }
  static of(...t) {
    return new g(...t);
  }
};
let b = g;
d = new WeakMap(), f = new WeakMap(), p = new WeakMap(), w = new WeakMap();
const { freeze: j, create: B } = Object;
class m extends Array {
}
const L = (e) => e instanceof m, P = (e) => L(e) ? e[0] ? e : P() : j(
  m.of(
    e instanceof Error ? e : Error(typeof e == "object" ? JSON.stringify(e) : String(e)),
    null
  )
), _ = (e) => L(e) ? e : j(m.of(null, e)), x = [_, P], E = (e) => new Proxy(e, {
  async apply(...t) {
    try {
      return _(await Reflect.apply(...t));
    } catch (s) {
      return P(s);
    }
  }
}), J = () => {
  let e, t;
  const s = new Promise((c, R) => {
    [e, t] = [c, R];
  }), n = E(() => s), l = () => s;
  return n.unwrap = l, { resolve: e, reject: t, pending: n };
}, O = (...e) => (t) => {
  for (const s of e)
    t = s(t);
  return t;
}, M = (...e) => async (t) => {
  for (const s of e)
    t = s(await t);
  return t;
}, S = (e) => {
  let t = null;
  return new Proxy(e, {
    async apply(...s) {
      t == null && (t = Promise.resolve(Reflect.apply(...s)));
      const n = await t;
      return t = null, n;
    }
  });
}, U = O(S, E), k = (e) => {
  let t = !1, s;
  return (...n) => (t || (t = !0, s = e(...n)), s);
}, V = (e, t) => {
  const s = (e == null ? void 0 : e.length) ?? 0;
  return (n) => {
    const l = async (c) => c < s ? await e[c](
      n,
      k(() => l(c + 1))
    ) : await t(n);
    return l(0);
  };
};
class q extends Promise {
  pipe(t) {
    return super.then((s) => s[0] ? s : t(s[1])).then(...x);
  }
  ap(t) {
    return super.then((s) => s[0] ? s : s[1](t)).then(...x);
  }
}
const v = (e) => q.resolve(e).then(...x), D = (e) => {
  const t = /* @__PURE__ */ new Map();
  return {
    get(s) {
      const n = t.get(s);
      return t.has(s) && (t.delete(s), t.set(s, n)), n;
    },
    set(s, n) {
      t.has(s) && t.delete(s), t.set(s, n), t.size > e && t.delete(t.keys().next().value);
    }
  };
}, F = (e) => new Promise((t) => setTimeout(t, e));
export {
  b as Concurrent,
  D as LRU,
  M as async_pipe,
  J as defer,
  E as either,
  U as lock,
  V as oni,
  O as pipe,
  v as pipeline,
  F as wait
};
