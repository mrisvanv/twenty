const e = (e) => `${e}_webform_data`,
  t =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof self
        ? self
        : 'undefined' != typeof window
          ? window
          : global,
  n = Object.keys,
  r = Array.isArray;
function i(e, t) {
  return (
    'object' != typeof t ||
      n(t).forEach(function (n) {
        e[n] = t[n];
      }),
    e
  );
}
'undefined' == typeof Promise || t.Promise || (t.Promise = Promise);
const s = Object.getPrototypeOf,
  o = {}.hasOwnProperty;
function a(e, t) {
  return o.call(e, t);
}
function l(e, t) {
  'function' == typeof t && (t = t(s(e))),
    ('undefined' == typeof Reflect ? n : Reflect.ownKeys)(t).forEach((n) => {
      c(e, n, t[n]);
    });
}
const u = Object.defineProperty;
function c(e, t, n, r) {
  u(
    e,
    t,
    i(
      n && a(n, 'get') && 'function' == typeof n.get
        ? { get: n.get, set: n.set, configurable: !0 }
        : { value: n, configurable: !0, writable: !0 },
      r,
    ),
  );
}
function h(e) {
  return {
    from: function (t) {
      return (
        (e.prototype = Object.create(t.prototype)),
        c(e.prototype, 'constructor', e),
        { extend: l.bind(null, e.prototype) }
      );
    },
  };
}
const d = Object.getOwnPropertyDescriptor;
function f(e, t) {
  let n;
  return d(e, t) || ((n = s(e)) && f(n, t));
}
const p = [].slice;
function y(e, t, n) {
  return p.call(e, t, n);
}
function m(e, t) {
  return t(e);
}
function g(e) {
  if (!e) throw new Error('Assertion Failed');
}
function v(e) {
  t.setImmediate ? setImmediate(e) : setTimeout(e, 0);
}
function b(e, t) {
  return e.reduce((e, n, r) => {
    var i = t(n, r);
    return i && (e[i[0]] = i[1]), e;
  }, {});
}
function _(e, t) {
  if (a(e, t)) return e[t];
  if (!t) return e;
  if ('string' != typeof t) {
    for (var n = [], r = 0, i = t.length; r < i; ++r) {
      var s = _(e, t[r]);
      n.push(s);
    }
    return n;
  }
  var o = t.indexOf('.');
  if (-1 !== o) {
    var l = e[t.substr(0, o)];
    return void 0 === l ? void 0 : _(l, t.substr(o + 1));
  }
}
function w(e, t, n) {
  if (e && void 0 !== t && (!('isFrozen' in Object) || !Object.isFrozen(e)))
    if ('string' != typeof t && 'length' in t) {
      g('string' != typeof n && 'length' in n);
      for (var i = 0, s = t.length; i < s; ++i) w(e, t[i], n[i]);
    } else {
      var o = t.indexOf('.');
      if (-1 !== o) {
        var l = t.substr(0, o),
          u = t.substr(o + 1);
        if ('' === u)
          void 0 === n
            ? r(e) && !isNaN(parseInt(l))
              ? e.splice(l, 1)
              : delete e[l]
            : (e[l] = n);
        else {
          var c = e[l];
          (c && a(e, l)) || (c = e[l] = {}), w(c, u, n);
        }
      } else
        void 0 === n
          ? r(e) && !isNaN(parseInt(t))
            ? e.splice(t, 1)
            : delete e[t]
          : (e[t] = n);
    }
}
function x(e) {
  var t = {};
  for (var n in e) a(e, n) && (t[n] = e[n]);
  return t;
}
const k = [].concat;
function E(e) {
  return k.apply([], e);
}
const P =
    'Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey'
      .split(',')
      .concat(
        E(
          [8, 16, 32, 64].map((e) =>
            ['Int', 'Uint', 'Float'].map((t) => t + e + 'Array'),
          ),
        ),
      )
      .filter((e) => t[e]),
  S = P.map((e) => t[e]);
b(P, (e) => [e, !0]);
let K = null;
function O(e) {
  K = 'undefined' != typeof WeakMap && new WeakMap();
  const t = C(e);
  return (K = null), t;
}
function C(e) {
  if (!e || 'object' != typeof e) return e;
  let t = K && K.get(e);
  if (t) return t;
  if (r(e)) {
    (t = []), K && K.set(e, t);
    for (var n = 0, i = e.length; n < i; ++n) t.push(C(e[n]));
  } else if (S.indexOf(e.constructor) >= 0) t = e;
  else {
    const n = s(e);
    for (var o in ((t = n === Object.prototype ? {} : Object.create(n)),
    K && K.set(e, t),
    e))
      a(e, o) && (t[o] = C(e[o]));
  }
  return t;
}
const { toString: A } = {};
function j(e) {
  return A.call(e).slice(8, -1);
}
const D = 'undefined' != typeof Symbol ? Symbol.iterator : '@@iterator',
  I =
    'symbol' == typeof D
      ? function (e) {
          var t;
          return null != e && (t = e[D]) && t.apply(e);
        }
      : function () {
          return null;
        },
  T = {};
function B(e) {
  var t, n, i, s;
  if (1 === arguments.length) {
    if (r(e)) return e.slice();
    if (this === T && 'string' == typeof e) return [e];
    if ((s = I(e))) {
      for (n = []; !(i = s.next()).done; ) n.push(i.value);
      return n;
    }
    if (null == e) return [e];
    if ('number' == typeof (t = e.length)) {
      for (n = new Array(t); t--; ) n[t] = e[t];
      return n;
    }
    return [e];
  }
  for (t = arguments.length, n = new Array(t); t--; ) n[t] = arguments[t];
  return n;
}
const R =
  'undefined' != typeof Symbol
    ? (e) => 'AsyncFunction' === e[Symbol.toStringTag]
    : () => !1;
var F =
  'undefined' != typeof location &&
  /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function N(e, t) {
  (F = e), (M = t);
}
var M = () => !0;
const q = !new Error('').stack;
function $() {
  if (q)
    try {
      throw ($.arguments, new Error());
    } catch (e) {
      return e;
    }
  return new Error();
}
function L(e, t) {
  var n = e.stack;
  return n
    ? ((t = t || 0),
      0 === n.indexOf(e.name) && (t += (e.name + e.message).split('\n').length),
      n
        .split('\n')
        .slice(t)
        .filter(M)
        .map((e) => '\n' + e)
        .join(''))
    : '';
}
var U = [
    'Unknown',
    'Constraint',
    'Data',
    'TransactionInactive',
    'ReadOnly',
    'Version',
    'NotFound',
    'InvalidState',
    'InvalidAccess',
    'Abort',
    'Timeout',
    'QuotaExceeded',
    'Syntax',
    'DataClone',
  ],
  V = [
    'Modify',
    'Bulk',
    'OpenFailed',
    'VersionChange',
    'Schema',
    'Upgrade',
    'InvalidTable',
    'MissingAPI',
    'NoSuchDatabase',
    'InvalidArgument',
    'SubTransaction',
    'Unsupported',
    'Internal',
    'DatabaseClosed',
    'PrematureCommit',
    'ForeignAwait',
  ].concat(U),
  W = {
    VersionChanged: 'Database version changed by other database connection',
    DatabaseClosed: 'Database has been closed',
    Abort: 'Transaction aborted',
    TransactionInactive: 'Transaction has already completed or failed',
    MissingAPI:
      'IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb',
  };
function Y(e, t) {
  (this._e = $()), (this.name = e), (this.message = t);
}
function z(e, t) {
  return (
    e +
    '. Errors: ' +
    Object.keys(t)
      .map((e) => t[e].toString())
      .filter((e, t, n) => n.indexOf(e) === t)
      .join('\n')
  );
}
function G(e, t, n, r) {
  (this._e = $()),
    (this.failures = t),
    (this.failedKeys = r),
    (this.successCount = n),
    (this.message = z(e, t));
}
function H(e, t) {
  (this._e = $()),
    (this.name = 'BulkError'),
    (this.failures = Object.keys(t).map((e) => t[e])),
    (this.failuresByPos = t),
    (this.message = z(e, t));
}
h(Y)
  .from(Error)
  .extend({
    stack: {
      get: function () {
        return (
          this._stack ||
          (this._stack = this.name + ': ' + this.message + L(this._e, 2))
        );
      },
    },
    toString: function () {
      return this.name + ': ' + this.message;
    },
  }),
  h(G).from(Y),
  h(H).from(Y);
var Q = V.reduce((e, t) => ((e[t] = t + 'Error'), e), {});
const X = Y;
var J = V.reduce((e, t) => {
  var n = t + 'Error';
  function r(e, r) {
    (this._e = $()),
      (this.name = n),
      e
        ? 'string' == typeof e
          ? ((this.message = `${e}${r ? '\n ' + r : ''}`),
            (this.inner = r || null))
          : 'object' == typeof e &&
            ((this.message = `${e.name} ${e.message}`), (this.inner = e))
        : ((this.message = W[t] || n), (this.inner = null));
  }
  return h(r).from(X), (e[t] = r), e;
}, {});
(J.Syntax = SyntaxError), (J.Type = TypeError), (J.Range = RangeError);
var Z = U.reduce((e, t) => ((e[t + 'Error'] = J[t]), e), {}),
  ee = V.reduce(
    (e, t) => (
      -1 === ['Syntax', 'Type', 'Range'].indexOf(t) && (e[t + 'Error'] = J[t]),
      e
    ),
    {},
  );
function te() {}
function ne(e) {
  return e;
}
function re(e, t) {
  return null == e || e === ne
    ? t
    : function (n) {
        return t(e(n));
      };
}
function ie(e, t) {
  return function () {
    e.apply(this, arguments), t.apply(this, arguments);
  };
}
function se(e, t) {
  return e === te
    ? t
    : function () {
        var n = e.apply(this, arguments);
        void 0 !== n && (arguments[0] = n);
        var r = this.onsuccess,
          i = this.onerror;
        (this.onsuccess = null), (this.onerror = null);
        var s = t.apply(this, arguments);
        return (
          r && (this.onsuccess = this.onsuccess ? ie(r, this.onsuccess) : r),
          i && (this.onerror = this.onerror ? ie(i, this.onerror) : i),
          void 0 !== s ? s : n
        );
      };
}
function oe(e, t) {
  return e === te
    ? t
    : function () {
        e.apply(this, arguments);
        var n = this.onsuccess,
          r = this.onerror;
        (this.onsuccess = this.onerror = null),
          t.apply(this, arguments),
          n && (this.onsuccess = this.onsuccess ? ie(n, this.onsuccess) : n),
          r && (this.onerror = this.onerror ? ie(r, this.onerror) : r);
      };
}
function ae(e, t) {
  return e === te
    ? t
    : function (n) {
        var r = e.apply(this, arguments);
        i(n, r);
        var s = this.onsuccess,
          o = this.onerror;
        (this.onsuccess = null), (this.onerror = null);
        var a = t.apply(this, arguments);
        return (
          s && (this.onsuccess = this.onsuccess ? ie(s, this.onsuccess) : s),
          o && (this.onerror = this.onerror ? ie(o, this.onerror) : o),
          void 0 === r ? (void 0 === a ? void 0 : a) : i(r, a)
        );
      };
}
function le(e, t) {
  return e === te
    ? t
    : function () {
        return !1 !== t.apply(this, arguments) && e.apply(this, arguments);
      };
}
function ue(e, t) {
  return e === te
    ? t
    : function () {
        var n = e.apply(this, arguments);
        if (n && 'function' == typeof n.then) {
          for (var r = this, i = arguments.length, s = new Array(i); i--; )
            s[i] = arguments[i];
          return n.then(function () {
            return t.apply(r, s);
          });
        }
        return t.apply(this, arguments);
      };
}
(ee.ModifyError = G), (ee.DexieError = Y), (ee.BulkError = H);
var ce = {};
const [he, de, fe] =
    'undefined' == typeof Promise
      ? []
      : (() => {
          let e = Promise.resolve();
          if ('undefined' == typeof crypto || !crypto.subtle)
            return [e, s(e), e];
          const t = crypto.subtle.digest('SHA-512', new Uint8Array([0]));
          return [t, s(t), e];
        })(),
  pe = de && de.then,
  ye = he && he.constructor,
  me = !!fe;
var ge = !1,
  ve = fe
    ? () => {
        fe.then($e);
      }
    : t.setImmediate
      ? setImmediate.bind(null, $e)
      : t.MutationObserver
        ? () => {
            var e = document.createElement('div');
            new MutationObserver(() => {
              $e(), (e = null);
            }).observe(e, { attributes: !0 }),
              e.setAttribute('i', '1');
          }
        : () => {
            setTimeout($e, 0);
          },
  be = function (e, t) {
    Oe.push([e, t]), we && (ve(), (we = !1));
  },
  _e = !0,
  we = !0,
  xe = [],
  ke = [],
  Ee = null,
  Pe = ne,
  Se = {
    id: 'global',
    global: !0,
    ref: 0,
    unhandleds: [],
    onunhandled: ht,
    pgp: !1,
    env: {},
    finalize: function () {
      this.unhandleds.forEach((e) => {
        try {
          ht(e[0], e[1]);
        } catch (e) {}
      });
    },
  },
  Ke = Se,
  Oe = [],
  Ce = 0,
  Ae = [];
function je(e) {
  if ('object' != typeof this)
    throw new TypeError('Promises must be constructed via new');
  (this._listeners = []), (this.onuncatched = te), (this._lib = !1);
  var t = (this._PSD = Ke);
  if (
    (F && ((this._stackHolder = $()), (this._prev = null), (this._numPrev = 0)),
    'function' != typeof e)
  ) {
    if (e !== ce) throw new TypeError('Not a function');
    return (
      (this._state = arguments[1]),
      (this._value = arguments[2]),
      void (!1 === this._state && Be(this, this._value))
    );
  }
  (this._state = null), (this._value = null), ++t.ref, Te(this, e);
}
const De = {
  get: function () {
    var e = Ke,
      t = Xe;
    function n(n, r) {
      var i = !e.global && (e !== Ke || t !== Xe);
      const s = i && !tt();
      var o = new je((t, o) => {
        Fe(this, new Ie(ut(n, e, i, s), ut(r, e, i, s), t, o, e));
      });
      return F && qe(o, this), o;
    }
    return (n.prototype = ce), n;
  },
  set: function (e) {
    c(
      this,
      'then',
      e && e.prototype === ce
        ? De
        : {
            get: function () {
              return e;
            },
            set: De.set,
          },
    );
  },
};
function Ie(e, t, n, r, i) {
  (this.onFulfilled = 'function' == typeof e ? e : null),
    (this.onRejected = 'function' == typeof t ? t : null),
    (this.resolve = n),
    (this.reject = r),
    (this.psd = i);
}
function Te(e, t) {
  try {
    t(
      (t) => {
        if (null === e._state) {
          if (t === e)
            throw new TypeError('A promise cannot be resolved with itself.');
          var n = e._lib && Le();
          t && 'function' == typeof t.then
            ? Te(e, (e, n) => {
                t instanceof je ? t._then(e, n) : t.then(e, n);
              })
            : ((e._state = !0), (e._value = t), Re(e)),
            n && Ue();
        }
      },
      Be.bind(null, e),
    );
  } catch (t) {
    Be(e, t);
  }
}
function Be(e, t) {
  if ((ke.push(t), null === e._state)) {
    var n = e._lib && Le();
    (t = Pe(t)),
      (e._state = !1),
      (e._value = t),
      F &&
        null !== t &&
        'object' == typeof t &&
        !t._promise &&
        (function (e, t, n) {
          try {
            e.apply(null, void 0);
          } catch (e) {}
        })(() => {
          var n = f(t, 'stack');
          (t._promise = e),
            c(t, 'stack', {
              get: () =>
                ge ? n && (n.get ? n.get.apply(t) : n.value) : e.stack,
            });
        }),
      (function (e) {
        xe.some((t) => t._value === e._value) || xe.push(e);
      })(e),
      Re(e),
      n && Ue();
  }
}
function Re(e) {
  var t = e._listeners;
  e._listeners = [];
  for (var n = 0, r = t.length; n < r; ++n) Fe(e, t[n]);
  var i = e._PSD;
  --i.ref || i.finalize(),
    0 === Ce &&
      (++Ce,
      be(() => {
        0 == --Ce && Ve();
      }, []));
}
function Fe(e, t) {
  if (null !== e._state) {
    var n = e._state ? t.onFulfilled : t.onRejected;
    if (null === n) return (e._state ? t.resolve : t.reject)(e._value);
    ++t.psd.ref, ++Ce, be(Ne, [n, e, t]);
  } else e._listeners.push(t);
}
function Ne(e, t, n) {
  try {
    Ee = t;
    var r,
      i = t._value;
    t._state
      ? (r = e(i))
      : (ke.length && (ke = []),
        (r = e(i)),
        -1 === ke.indexOf(i) &&
          (function (e) {
            for (var t = xe.length; t; )
              if (xe[--t]._value === e._value) return void xe.splice(t, 1);
          })(t)),
      n.resolve(r);
  } catch (e) {
    n.reject(e);
  } finally {
    (Ee = null), 0 == --Ce && Ve(), --n.psd.ref || n.psd.finalize();
  }
}
function Me(e, t, n) {
  if (t.length === n) return t;
  var r = '';
  if (!1 === e._state) {
    var i,
      s,
      o = e._value;
    null != o
      ? ((i = o.name || 'Error'), (s = o.message || o), (r = L(o, 0)))
      : ((i = o), (s = '')),
      t.push(i + (s ? ': ' + s : '') + r);
  }
  return (
    F &&
      ((r = L(e._stackHolder, 2)) && -1 === t.indexOf(r) && t.push(r),
      e._prev && Me(e._prev, t, n)),
    t
  );
}
function qe(e, t) {
  var n = t ? t._numPrev + 1 : 0;
  n < 100 && ((e._prev = t), (e._numPrev = n));
}
function $e() {
  Le() && Ue();
}
function Le() {
  var e = _e;
  return (_e = !1), (we = !1), e;
}
function Ue() {
  var e, t, n;
  do {
    for (; Oe.length > 0; )
      for (e = Oe, Oe = [], n = e.length, t = 0; t < n; ++t) {
        var r = e[t];
        r[0].apply(null, r[1]);
      }
  } while (Oe.length > 0);
  (_e = !0), (we = !0);
}
function Ve() {
  var e = xe;
  (xe = []),
    e.forEach((e) => {
      e._PSD.onunhandled.call(null, e._value, e);
    });
  for (var t = Ae.slice(0), n = t.length; n; ) t[--n]();
}
function We(e) {
  return new je(ce, !1, e);
}
function Ye(e, t) {
  var n = Ke;
  return function () {
    var r = Le(),
      i = Ke;
    try {
      return st(n, !0), e.apply(this, arguments);
    } catch (e) {
      t && t(e);
    } finally {
      st(i, !1), r && Ue();
    }
  };
}
l(je.prototype, {
  then: De,
  _then: function (e, t) {
    Fe(this, new Ie(null, null, e, t, Ke));
  },
  catch: function (e) {
    if (1 === arguments.length) return this.then(null, e);
    var t = arguments[0],
      n = arguments[1];
    return 'function' == typeof t
      ? this.then(null, (e) => (e instanceof t ? n(e) : We(e)))
      : this.then(null, (e) => (e && e.name === t ? n(e) : We(e)));
  },
  finally: function (e) {
    return this.then(
      (t) => (e(), t),
      (t) => (e(), We(t)),
    );
  },
  stack: {
    get: function () {
      if (this._stack) return this._stack;
      try {
        ge = !0;
        var e = Me(this, [], 20).join('\nFrom previous: ');
        return null !== this._state && (this._stack = e), e;
      } finally {
        ge = !1;
      }
    },
  },
  timeout: function (e, t) {
    return e < 1 / 0
      ? new je((n, r) => {
          var i = setTimeout(() => r(new J.Timeout(t)), e);
          this.then(n, r).finally(clearTimeout.bind(null, i));
        })
      : this;
  },
}),
  'undefined' != typeof Symbol &&
    Symbol.toStringTag &&
    c(je.prototype, Symbol.toStringTag, 'Dexie.Promise'),
  (Se.env = ot()),
  l(je, {
    all: function () {
      var e = B.apply(null, arguments).map(nt);
      return new je(function (t, n) {
        0 === e.length && t([]);
        var r = e.length;
        e.forEach((i, s) =>
          je.resolve(i).then((n) => {
            (e[s] = n), --r || t(e);
          }, n),
        );
      });
    },
    resolve: (e) => {
      if (e instanceof je) return e;
      if (e && 'function' == typeof e.then)
        return new je((t, n) => {
          e.then(t, n);
        });
      var t = new je(ce, !0, e);
      return qe(t, Ee), t;
    },
    reject: We,
    race: function () {
      var e = B.apply(null, arguments).map(nt);
      return new je((t, n) => {
        e.map((e) => je.resolve(e).then(t, n));
      });
    },
    PSD: { get: () => Ke, set: (e) => (Ke = e) },
    totalEchoes: { get: () => Xe },
    newPSD: Ze,
    usePSD: at,
    scheduler: {
      get: () => be,
      set: (e) => {
        be = e;
      },
    },
    rejectionMapper: {
      get: () => Pe,
      set: (e) => {
        Pe = e;
      },
    },
    follow: (e, t) =>
      new je((n, r) =>
        Ze(
          (t, n) => {
            var r = Ke;
            (r.unhandleds = []),
              (r.onunhandled = n),
              (r.finalize = ie(function () {
                !(function (e) {
                  Ae.push(function t() {
                    e(), Ae.splice(Ae.indexOf(t), 1);
                  }),
                    ++Ce,
                    be(() => {
                      0 == --Ce && Ve();
                    }, []);
                })(() => {
                  0 === this.unhandleds.length ? t() : n(this.unhandleds[0]);
                });
              }, r.finalize)),
              e();
          },
          t,
          n,
          r,
        ),
      ),
  }),
  ye &&
    (ye.allSettled &&
      c(je, 'allSettled', function () {
        const e = B.apply(null, arguments).map(nt);
        return new je((t) => {
          0 === e.length && t([]);
          let n = e.length;
          const r = new Array(n);
          e.forEach((e, i) =>
            je
              .resolve(e)
              .then(
                (e) => (r[i] = { status: 'fulfilled', value: e }),
                (e) => (r[i] = { status: 'rejected', reason: e }),
              )
              .then(() => --n || t(r)),
          );
        });
      }),
    ye.any &&
      'undefined' != typeof AggregateError &&
      c(je, 'any', function () {
        const e = B.apply(null, arguments).map(nt);
        return new je((t, n) => {
          0 === e.length && n(new AggregateError([]));
          let r = e.length;
          const i = new Array(r);
          e.forEach((e, s) =>
            je.resolve(e).then(
              (e) => t(e),
              (e) => {
                (i[s] = e), --r || n(new AggregateError(i));
              },
            ),
          );
        });
      }));
const ze = { awaits: 0, echoes: 0, id: 0 };
var Ge = 0,
  He = [],
  Qe = 0,
  Xe = 0,
  Je = 0;
function Ze(e, t, n, r) {
  var s = Ke,
    o = Object.create(s);
  (o.parent = s), (o.ref = 0), (o.global = !1), (o.id = ++Je);
  var a = Se.env;
  (o.env = me
    ? {
        Promise: je,
        PromiseProp: { value: je, configurable: !0, writable: !0 },
        all: je.all,
        race: je.race,
        allSettled: je.allSettled,
        any: je.any,
        resolve: je.resolve,
        reject: je.reject,
        nthen: ct(a.nthen, o),
        gthen: ct(a.gthen, o),
      }
    : {}),
    t && i(o, t),
    ++s.ref,
    (o.finalize = function () {
      --this.parent.ref || this.parent.finalize();
    });
  var l = at(o, e, n, r);
  return 0 === o.ref && o.finalize(), l;
}
function et() {
  return ze.id || (ze.id = ++Ge), ++ze.awaits, (ze.echoes += 100), ze.id;
}
function tt() {
  return (
    !!ze.awaits &&
    (0 == --ze.awaits && (ze.id = 0), (ze.echoes = 100 * ze.awaits), !0)
  );
}
function nt(e) {
  return ze.echoes && e && e.constructor === ye
    ? (et(),
      e.then(
        (e) => (tt(), e),
        (e) => (tt(), dt(e)),
      ))
    : e;
}
function rt(e) {
  ++Xe,
    (ze.echoes && 0 != --ze.echoes) || (ze.echoes = ze.id = 0),
    He.push(Ke),
    st(e, !0);
}
function it() {
  var e = He[He.length - 1];
  He.pop(), st(e, !1);
}
function st(e, n) {
  var r = Ke;
  if (
    ((n ? !ze.echoes || (Qe++ && e === Ke) : !Qe || (--Qe && e === Ke)) ||
      lt(n ? rt.bind(null, e) : it),
    e !== Ke && ((Ke = e), r === Se && (Se.env = ot()), me))
  ) {
    var i = Se.env.Promise,
      s = e.env;
    (de.then = s.nthen),
      (i.prototype.then = s.gthen),
      (r.global || e.global) &&
        (Object.defineProperty(t, 'Promise', s.PromiseProp),
        (i.all = s.all),
        (i.race = s.race),
        (i.resolve = s.resolve),
        (i.reject = s.reject),
        s.allSettled && (i.allSettled = s.allSettled),
        s.any && (i.any = s.any));
  }
}
function ot() {
  var e = t.Promise;
  return me
    ? {
        Promise: e,
        PromiseProp: Object.getOwnPropertyDescriptor(t, 'Promise'),
        all: e.all,
        race: e.race,
        allSettled: e.allSettled,
        any: e.any,
        resolve: e.resolve,
        reject: e.reject,
        nthen: de.then,
        gthen: e.prototype.then,
      }
    : {};
}
function at(e, t, n, r, i) {
  var s = Ke;
  try {
    return st(e, !0), t(n, r, i);
  } finally {
    st(s, !1);
  }
}
function lt(e) {
  pe.call(he, e);
}
function ut(e, t, n, r) {
  return 'function' != typeof e
    ? e
    : function () {
        var i = Ke;
        n && et(), st(t, !0);
        try {
          return e.apply(this, arguments);
        } finally {
          st(i, !1), r && lt(tt);
        }
      };
}
function ct(e, t) {
  return function (n, r) {
    return e.call(this, ut(n, t), ut(r, t));
  };
}
function ht(e, n) {
  var r;
  try {
    r = n.onuncatched(e);
  } catch (e) {}
  if (!1 !== r)
    try {
      var s,
        o = { promise: n, reason: e };
      if (
        (t.document && document.createEvent
          ? ((s = document.createEvent('Event')).initEvent(
              'unhandledrejection',
              !0,
              !0,
            ),
            i(s, o))
          : t.CustomEvent &&
            i((s = new CustomEvent('unhandledrejection', { detail: o })), o),
        s &&
          t.dispatchEvent &&
          (dispatchEvent(s),
          !t.PromiseRejectionEvent && t.onunhandledrejection))
      )
        try {
          t.onunhandledrejection(s);
        } catch (e) {}
      F &&
        s &&
        !s.defaultPrevented &&
        console.warn(`Unhandled rejection: ${e.stack || e}`);
    } catch (e) {}
}
-1 === ('' + pe).indexOf('[native code]') && (et = tt = te);
var dt = je.reject;
function ft(e, t, n, r) {
  if (e.idbdb && (e._state.openComplete || Ke.letThrough || e._vip)) {
    var i = e._createTransaction(t, n, e._dbSchema);
    try {
      i.create(), (e._state.PR1398_maxLoop = 3);
    } catch (i) {
      return i.name === Q.InvalidState &&
        e.isOpen() &&
        --e._state.PR1398_maxLoop > 0
        ? (console.warn('Dexie: Need to reopen db'),
          e._close(),
          e.open().then(() => ft(e, t, n, r)))
        : dt(i);
    }
    return i
      ._promise(t, (e, t) => Ze(() => ((Ke.trans = i), r(e, t, i))))
      .then((e) => i._completion.then(() => e));
  }
  if (e._state.openComplete)
    return dt(new J.DatabaseClosed(e._state.dbOpenError));
  if (!e._state.isBeingOpened) {
    if (!e._options.autoOpen) return dt(new J.DatabaseClosed());
    e.open().catch(te);
  }
  return e._state.dbReadyPromise.then(() => ft(e, t, n, r));
}
const pt = String.fromCharCode(65535),
  yt =
    'Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.',
  mt = [],
  gt =
    'undefined' != typeof navigator &&
    /(MSIE|Trident|Edge)/.test(navigator.userAgent),
  vt = gt,
  bt = gt,
  _t = (e) => !/(dexie\.js|dexie\.min\.js)/.test(e);
function wt(e, t) {
  return e
    ? t
      ? function () {
          return e.apply(this, arguments) && t.apply(this, arguments);
        }
      : e
    : t;
}
const xt = {
  type: 3,
  lower: -1 / 0,
  lowerOpen: !1,
  upper: [[]],
  upperOpen: !1,
};
function kt(e) {
  return 'string' != typeof e || /\./.test(e)
    ? (e) => e
    : (t) => (void 0 === t[e] && e in t && delete (t = O(t))[e], t);
}
class Et {
  _trans(e, t, n) {
    const r = this._tx || Ke.trans,
      i = this.name;
    function s(e, n, r) {
      if (!r.schema[i])
        throw new J.NotFound('Table ' + i + ' not part of transaction');
      return t(r.idbtrans, r);
    }
    const o = Le();
    try {
      return r && r.db === this.db
        ? r === Ke.trans
          ? r._promise(e, s, n)
          : Ze(() => r._promise(e, s, n), {
              trans: r,
              transless: Ke.transless || Ke,
            })
        : ft(this.db, e, [this.name], s);
    } finally {
      o && Ue();
    }
  }
  get(e, t) {
    return e && e.constructor === Object
      ? this.where(e).first(t)
      : this._trans('readonly', (t) =>
          this.core
            .get({ trans: t, key: e })
            .then((e) => this.hook.reading.fire(e)),
        ).then(t);
  }
  where(e) {
    if ('string' == typeof e) return new this.db.WhereClause(this, e);
    if (r(e)) return new this.db.WhereClause(this, `[${e.join('+')}]`);
    const t = n(e);
    if (1 === t.length) return this.where(t[0]).equals(e[t[0]]);
    const i = this.schema.indexes
      .concat(this.schema.primKey)
      .filter(
        (e) =>
          e.compound &&
          t.every((t) => e.keyPath.indexOf(t) >= 0) &&
          e.keyPath.every((e) => t.indexOf(e) >= 0),
      )[0];
    if (i && this.db._maxKey !== pt)
      return this.where(i.name).equals(i.keyPath.map((t) => e[t]));
    !i &&
      F &&
      console.warn(
        `The query ${JSON.stringify(e)} on ${this.name} would benefit of a compound index [${t.join('+')}]`,
      );
    const { idxByName: s } = this.schema,
      o = this.db._deps.indexedDB;
    function a(e, t) {
      try {
        return 0 === o.cmp(e, t);
      } catch (e) {
        return !1;
      }
    }
    const [l, u] = t.reduce(
      ([t, n], i) => {
        const o = s[i],
          l = e[i];
        return [
          t || o,
          t || !o
            ? wt(
                n,
                o && o.multi
                  ? (e) => {
                      const t = _(e, i);
                      return r(t) && t.some((e) => a(l, e));
                    }
                  : (e) => a(l, _(e, i)),
              )
            : n,
        ];
      },
      [null, null],
    );
    return l
      ? this.where(l.name).equals(e[l.keyPath]).filter(u)
      : i
        ? this.filter(u)
        : this.where(t).equals('');
  }
  filter(e) {
    return this.toCollection().and(e);
  }
  count(e) {
    return this.toCollection().count(e);
  }
  offset(e) {
    return this.toCollection().offset(e);
  }
  limit(e) {
    return this.toCollection().limit(e);
  }
  each(e) {
    return this.toCollection().each(e);
  }
  toArray(e) {
    return this.toCollection().toArray(e);
  }
  toCollection() {
    return new this.db.Collection(new this.db.WhereClause(this));
  }
  orderBy(e) {
    return new this.db.Collection(
      new this.db.WhereClause(this, r(e) ? `[${e.join('+')}]` : e),
    );
  }
  reverse() {
    return this.toCollection().reverse();
  }
  mapToClass(e) {
    this.schema.mappedClass = e;
    const t = (t) => {
      if (!t) return t;
      const n = Object.create(e.prototype);
      for (var r in t)
        if (a(t, r))
          try {
            n[r] = t[r];
          } catch (e) {}
      return n;
    };
    return (
      this.schema.readHook &&
        this.hook.reading.unsubscribe(this.schema.readHook),
      (this.schema.readHook = t),
      this.hook('reading', t),
      e
    );
  }
  defineClass() {
    return this.mapToClass(function (e) {
      i(this, e);
    });
  }
  add(e, t) {
    const { auto: n, keyPath: r } = this.schema.primKey;
    let i = e;
    return (
      r && n && (i = kt(r)(e)),
      this._trans('readwrite', (e) =>
        this.core.mutate({
          trans: e,
          type: 'add',
          keys: null != t ? [t] : null,
          values: [i],
        }),
      )
        .then((e) => (e.numFailures ? je.reject(e.failures[0]) : e.lastResult))
        .then((t) => {
          if (r)
            try {
              w(e, r, t);
            } catch (e) {}
          return t;
        })
    );
  }
  update(e, t) {
    if ('object' != typeof e || r(e))
      return this.where(':id').equals(e).modify(t);
    {
      const r = _(e, this.schema.primKey.keyPath);
      if (void 0 === r)
        return dt(
          new J.InvalidArgument(
            'Given object does not contain its primary key',
          ),
        );
      try {
        'function' != typeof t
          ? n(t).forEach((n) => {
              w(e, n, t[n]);
            })
          : t(e, { value: e, primKey: r });
      } catch (e) {}
      return this.where(':id').equals(r).modify(t);
    }
  }
  put(e, t) {
    const { auto: n, keyPath: r } = this.schema.primKey;
    let i = e;
    return (
      r && n && (i = kt(r)(e)),
      this._trans('readwrite', (e) =>
        this.core.mutate({
          trans: e,
          type: 'put',
          values: [i],
          keys: null != t ? [t] : null,
        }),
      )
        .then((e) => (e.numFailures ? je.reject(e.failures[0]) : e.lastResult))
        .then((t) => {
          if (r)
            try {
              w(e, r, t);
            } catch (e) {}
          return t;
        })
    );
  }
  delete(e) {
    return this._trans('readwrite', (t) =>
      this.core.mutate({ trans: t, type: 'delete', keys: [e] }),
    ).then((e) => (e.numFailures ? je.reject(e.failures[0]) : void 0));
  }
  clear() {
    return this._trans('readwrite', (e) =>
      this.core.mutate({ trans: e, type: 'deleteRange', range: xt }),
    ).then((e) => (e.numFailures ? je.reject(e.failures[0]) : void 0));
  }
  bulkGet(e) {
    return this._trans('readonly', (t) =>
      this.core
        .getMany({ keys: e, trans: t })
        .then((e) => e.map((e) => this.hook.reading.fire(e))),
    );
  }
  bulkAdd(e, t, n) {
    const r = Array.isArray(t) ? t : void 0,
      i = (n = n || (r ? void 0 : t)) ? n.allKeys : void 0;
    return this._trans('readwrite', (t) => {
      const { auto: n, keyPath: s } = this.schema.primKey;
      if (s && r)
        throw new J.InvalidArgument(
          'bulkAdd(): keys argument invalid on tables with inbound keys',
        );
      if (r && r.length !== e.length)
        throw new J.InvalidArgument(
          'Arguments objects and keys must have the same length',
        );
      const o = e.length;
      let a = s && n ? e.map(kt(s)) : e;
      return this.core
        .mutate({ trans: t, type: 'add', keys: r, values: a, wantResults: i })
        .then(({ numFailures: e, results: t, lastResult: n, failures: r }) => {
          if (0 === e) return i ? t : n;
          throw new H(
            `${this.name}.bulkAdd(): ${e} of ${o} operations failed`,
            r,
          );
        });
    });
  }
  bulkPut(e, t, n) {
    const r = Array.isArray(t) ? t : void 0,
      i = (n = n || (r ? void 0 : t)) ? n.allKeys : void 0;
    return this._trans('readwrite', (t) => {
      const { auto: n, keyPath: s } = this.schema.primKey;
      if (s && r)
        throw new J.InvalidArgument(
          'bulkPut(): keys argument invalid on tables with inbound keys',
        );
      if (r && r.length !== e.length)
        throw new J.InvalidArgument(
          'Arguments objects and keys must have the same length',
        );
      const o = e.length;
      let a = s && n ? e.map(kt(s)) : e;
      return this.core
        .mutate({ trans: t, type: 'put', keys: r, values: a, wantResults: i })
        .then(({ numFailures: e, results: t, lastResult: n, failures: r }) => {
          if (0 === e) return i ? t : n;
          throw new H(
            `${this.name}.bulkPut(): ${e} of ${o} operations failed`,
            r,
          );
        });
    });
  }
  bulkDelete(e) {
    const t = e.length;
    return this._trans('readwrite', (t) =>
      this.core.mutate({ trans: t, type: 'delete', keys: e }),
    ).then(({ numFailures: e, lastResult: n, failures: r }) => {
      if (0 === e) return n;
      throw new H(
        `${this.name}.bulkDelete(): ${e} of ${t} operations failed`,
        r,
      );
    });
  }
}
function Pt(e) {
  var t = {},
    i = function (n, r) {
      if (r) {
        for (var i = arguments.length, s = new Array(i - 1); --i; )
          s[i - 1] = arguments[i];
        return t[n].subscribe.apply(null, s), e;
      }
      if ('string' == typeof n) return t[n];
    };
  i.addEventType = a;
  for (var s = 1, o = arguments.length; s < o; ++s) a(arguments[s]);
  return i;
  function a(e, n, r) {
    if ('object' == typeof e) return l(e);
    n || (n = le), r || (r = te);
    var s = {
      subscribers: [],
      fire: r,
      subscribe: function (e) {
        -1 === s.subscribers.indexOf(e) &&
          (s.subscribers.push(e), (s.fire = n(s.fire, e)));
      },
      unsubscribe: function (e) {
        (s.subscribers = s.subscribers.filter(function (t) {
          return t !== e;
        })),
          (s.fire = s.subscribers.reduce(n, r));
      },
    };
    return (t[e] = i[e] = s), s;
  }
  function l(e) {
    n(e).forEach(function (t) {
      var n = e[t];
      if (r(n)) a(t, e[t][0], e[t][1]);
      else {
        if ('asap' !== n) throw new J.InvalidArgument('Invalid event config');
        var i = a(t, ne, function () {
          for (var e = arguments.length, t = new Array(e); e--; )
            t[e] = arguments[e];
          i.subscribers.forEach(function (e) {
            v(function () {
              e.apply(null, t);
            });
          });
        });
      }
    });
  }
}
function St(e, t) {
  return h(t).from({ prototype: e }), t;
}
function Kt(e, t) {
  return (
    !(e.filter || e.algorithm || e.or) && (t ? e.justLimit : !e.replayFilter)
  );
}
function Ot(e, t) {
  e.filter = wt(e.filter, t);
}
function Ct(e, t, n) {
  var r = e.replayFilter;
  (e.replayFilter = r ? () => wt(r(), t()) : t), (e.justLimit = n && !r);
}
function At(e, t) {
  if (e.isPrimKey) return t.primaryKey;
  const n = t.getIndexByKeyPath(e.index);
  if (!n)
    throw new J.Schema(
      'KeyPath ' + e.index + ' on object store ' + t.name + ' is not indexed',
    );
  return n;
}
function jt(e, t, n) {
  const r = At(e, t.schema);
  return t.openCursor({
    trans: n,
    values: !e.keysOnly,
    reverse: 'prev' === e.dir,
    unique: !!e.unique,
    query: { index: r, range: e.range },
  });
}
function Dt(e, t, n, r) {
  const i = e.replayFilter ? wt(e.filter, e.replayFilter()) : e.filter;
  if (e.or) {
    const s = {},
      o = (e, n, r) => {
        if (
          !i ||
          i(
            n,
            r,
            (e) => n.stop(e),
            (e) => n.fail(e),
          )
        ) {
          var o = n.primaryKey,
            l = '' + o;
          '[object ArrayBuffer]' === l && (l = '' + new Uint8Array(o)),
            a(s, l) || ((s[l] = !0), t(e, n, r));
        }
      };
    return Promise.all([
      e.or._iterate(o, n),
      It(jt(e, r, n), e.algorithm, o, !e.keysOnly && e.valueMapper),
    ]);
  }
  return It(jt(e, r, n), wt(e.algorithm, i), t, !e.keysOnly && e.valueMapper);
}
function It(e, t, n, r) {
  var i = Ye(r ? (e, t, i) => n(r(e), t, i) : n);
  return e.then((e) => {
    if (e)
      return e.start(() => {
        var n = () => e.continue();
        (t &&
          !t(
            e,
            (e) => (n = e),
            (t) => {
              e.stop(t), (n = te);
            },
            (t) => {
              e.fail(t), (n = te);
            },
          )) ||
          i(e.value, e, (e) => (n = e)),
          n();
      });
  });
}
function Tt(e, t) {
  try {
    const n = Bt(e),
      r = Bt(t);
    if (n !== r)
      return 'Array' === n
        ? 1
        : 'Array' === r
          ? -1
          : 'binary' === n
            ? 1
            : 'binary' === r
              ? -1
              : 'string' === n
                ? 1
                : 'string' === r
                  ? -1
                  : 'Date' === n
                    ? 1
                    : 'Date' !== r
                      ? NaN
                      : -1;
    switch (n) {
      case 'number':
      case 'Date':
      case 'string':
        return e > t ? 1 : e < t ? -1 : 0;
      case 'binary':
        return (function (e, t) {
          const n = e.length,
            r = t.length,
            i = n < r ? n : r;
          for (let n = 0; n < i; ++n)
            if (e[n] !== t[n]) return e[n] < t[n] ? -1 : 1;
          return n === r ? 0 : n < r ? -1 : 1;
        })(Rt(e), Rt(t));
      case 'Array':
        return (function (e, t) {
          const n = e.length,
            r = t.length,
            i = n < r ? n : r;
          for (let n = 0; n < i; ++n) {
            const r = Tt(e[n], t[n]);
            if (0 !== r) return r;
          }
          return n === r ? 0 : n < r ? -1 : 1;
        })(e, t);
    }
  } catch (e) {}
  return NaN;
}
function Bt(e) {
  const t = typeof e;
  if ('object' !== t) return t;
  if (ArrayBuffer.isView(e)) return 'binary';
  const n = j(e);
  return 'ArrayBuffer' === n ? 'binary' : n;
}
function Rt(e) {
  return e instanceof Uint8Array
    ? e
    : ArrayBuffer.isView(e)
      ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
      : new Uint8Array(e);
}
class Ft {
  _read(e, t) {
    var n = this._ctx;
    return n.error
      ? n.table._trans(null, dt.bind(null, n.error))
      : n.table._trans('readonly', e).then(t);
  }
  _write(e) {
    var t = this._ctx;
    return t.error
      ? t.table._trans(null, dt.bind(null, t.error))
      : t.table._trans('readwrite', e, 'locked');
  }
  _addAlgorithm(e) {
    var t = this._ctx;
    t.algorithm = wt(t.algorithm, e);
  }
  _iterate(e, t) {
    return Dt(this._ctx, e, t, this._ctx.table.core);
  }
  clone(e) {
    var t = Object.create(this.constructor.prototype),
      n = Object.create(this._ctx);
    return e && i(n, e), (t._ctx = n), t;
  }
  raw() {
    return (this._ctx.valueMapper = null), this;
  }
  each(e) {
    var t = this._ctx;
    return this._read((n) => Dt(t, e, n, t.table.core));
  }
  count(e) {
    return this._read((e) => {
      const t = this._ctx,
        n = t.table.core;
      if (Kt(t, !0))
        return n
          .count({
            trans: e,
            query: { index: At(t, n.schema), range: t.range },
          })
          .then((e) => Math.min(e, t.limit));
      var r = 0;
      return Dt(t, () => (++r, !1), e, n).then(() => r);
    }).then(e);
  }
  sortBy(e, t) {
    const n = e.split('.').reverse(),
      r = n[0],
      i = n.length - 1;
    function s(e, t) {
      return t ? s(e[n[t]], t - 1) : e[r];
    }
    var o = 'next' === this._ctx.dir ? 1 : -1;
    function a(e, t) {
      var n = s(e, i),
        r = s(t, i);
      return n < r ? -o : n > r ? o : 0;
    }
    return this.toArray(function (e) {
      return e.sort(a);
    }).then(t);
  }
  toArray(e) {
    return this._read((e) => {
      var t = this._ctx;
      if ('next' === t.dir && Kt(t, !0) && t.limit > 0) {
        const { valueMapper: n } = t,
          r = At(t, t.table.core.schema);
        return t.table.core
          .query({
            trans: e,
            limit: t.limit,
            values: !0,
            query: { index: r, range: t.range },
          })
          .then(({ result: e }) => (n ? e.map(n) : e));
      }
      {
        const n = [];
        return Dt(t, (e) => n.push(e), e, t.table.core).then(() => n);
      }
    }, e);
  }
  offset(e) {
    var t = this._ctx;
    return (
      e <= 0 ||
        ((t.offset += e),
        Kt(t)
          ? Ct(t, () => {
              var t = e;
              return (e, n) =>
                0 === t ||
                (1 === t
                  ? (--t, !1)
                  : (n(() => {
                      e.advance(t), (t = 0);
                    }),
                    !1));
            })
          : Ct(t, () => {
              var t = e;
              return () => --t < 0;
            })),
      this
    );
  }
  limit(e) {
    return (
      (this._ctx.limit = Math.min(this._ctx.limit, e)),
      Ct(
        this._ctx,
        () => {
          var t = e;
          return function (e, n, r) {
            return --t <= 0 && n(r), t >= 0;
          };
        },
        !0,
      ),
      this
    );
  }
  until(e, t) {
    return (
      Ot(this._ctx, function (n, r, i) {
        return !e(n.value) || (r(i), t);
      }),
      this
    );
  }
  first(e) {
    return this.limit(1)
      .toArray(function (e) {
        return e[0];
      })
      .then(e);
  }
  last(e) {
    return this.reverse().first(e);
  }
  filter(e) {
    var t, n;
    return (
      Ot(this._ctx, function (t) {
        return e(t.value);
      }),
      (t = this._ctx),
      (n = e),
      (t.isMatch = wt(t.isMatch, n)),
      this
    );
  }
  and(e) {
    return this.filter(e);
  }
  or(e) {
    return new this.db.WhereClause(this._ctx.table, e, this);
  }
  reverse() {
    return (
      (this._ctx.dir = 'prev' === this._ctx.dir ? 'next' : 'prev'),
      this._ondirectionchange && this._ondirectionchange(this._ctx.dir),
      this
    );
  }
  desc() {
    return this.reverse();
  }
  eachKey(e) {
    var t = this._ctx;
    return (
      (t.keysOnly = !t.isMatch),
      this.each(function (t, n) {
        e(n.key, n);
      })
    );
  }
  eachUniqueKey(e) {
    return (this._ctx.unique = 'unique'), this.eachKey(e);
  }
  eachPrimaryKey(e) {
    var t = this._ctx;
    return (
      (t.keysOnly = !t.isMatch),
      this.each(function (t, n) {
        e(n.primaryKey, n);
      })
    );
  }
  keys(e) {
    var t = this._ctx;
    t.keysOnly = !t.isMatch;
    var n = [];
    return this.each(function (e, t) {
      n.push(t.key);
    })
      .then(function () {
        return n;
      })
      .then(e);
  }
  primaryKeys(e) {
    var t = this._ctx;
    if ('next' === t.dir && Kt(t, !0) && t.limit > 0)
      return this._read((e) => {
        var n = At(t, t.table.core.schema);
        return t.table.core.query({
          trans: e,
          values: !1,
          limit: t.limit,
          query: { index: n, range: t.range },
        });
      })
        .then(({ result: e }) => e)
        .then(e);
    t.keysOnly = !t.isMatch;
    var n = [];
    return this.each(function (e, t) {
      n.push(t.primaryKey);
    })
      .then(function () {
        return n;
      })
      .then(e);
  }
  uniqueKeys(e) {
    return (this._ctx.unique = 'unique'), this.keys(e);
  }
  firstKey(e) {
    return this.limit(1)
      .keys(function (e) {
        return e[0];
      })
      .then(e);
  }
  lastKey(e) {
    return this.reverse().firstKey(e);
  }
  distinct() {
    var e = this._ctx,
      t = e.index && e.table.schema.idxByName[e.index];
    if (!t || !t.multi) return this;
    var n = {};
    return (
      Ot(this._ctx, function (e) {
        var t = e.primaryKey.toString(),
          r = a(n, t);
        return (n[t] = !0), !r;
      }),
      this
    );
  }
  modify(e) {
    var t = this._ctx;
    return this._write((r) => {
      var i;
      if ('function' == typeof e) i = e;
      else {
        var s = n(e),
          o = s.length;
        i = function (t) {
          for (var n = !1, r = 0; r < o; ++r) {
            var i = s[r],
              a = e[i];
            _(t, i) !== a && (w(t, i, a), (n = !0));
          }
          return n;
        };
      }
      const a = t.table.core,
        { outbound: l, extractKey: u } = a.schema.primaryKey,
        c = this.db._options.modifyChunkSize || 200,
        h = [];
      let d = 0;
      const f = [],
        p = (e, t) => {
          const { failures: r, numFailures: i } = t;
          d += e - i;
          for (let e of n(r)) h.push(r[e]);
        };
      return this.clone()
        .primaryKeys()
        .then((n) => {
          const s = (o) => {
            const h = Math.min(c, n.length - o);
            return a
              .getMany({
                trans: r,
                keys: n.slice(o, o + h),
                cache: 'immutable',
              })
              .then((d) => {
                const f = [],
                  y = [],
                  m = l ? [] : null,
                  g = [];
                for (let e = 0; e < h; ++e) {
                  const t = d[e],
                    r = { value: O(t), primKey: n[o + e] };
                  !1 !== i.call(r, r.value, r) &&
                    (null == r.value
                      ? g.push(n[o + e])
                      : l || 0 === Tt(u(t), u(r.value))
                        ? (y.push(r.value), l && m.push(n[o + e]))
                        : (g.push(n[o + e]), f.push(r.value)));
                }
                const v = Kt(t) &&
                  t.limit === 1 / 0 &&
                  ('function' != typeof e || e === Nt) && {
                    index: t.index,
                    range: t.range,
                  };
                return Promise.resolve(
                  f.length > 0 &&
                    a.mutate({ trans: r, type: 'add', values: f }).then((e) => {
                      for (let t in e.failures) g.splice(parseInt(t), 1);
                      p(f.length, e);
                    }),
                )
                  .then(
                    () =>
                      (y.length > 0 || (v && 'object' == typeof e)) &&
                      a
                        .mutate({
                          trans: r,
                          type: 'put',
                          keys: m,
                          values: y,
                          criteria: v,
                          changeSpec: 'function' != typeof e && e,
                        })
                        .then((e) => p(y.length, e)),
                  )
                  .then(
                    () =>
                      (g.length > 0 || (v && e === Nt)) &&
                      a
                        .mutate({
                          trans: r,
                          type: 'delete',
                          keys: g,
                          criteria: v,
                        })
                        .then((e) => p(g.length, e)),
                  )
                  .then(() => n.length > o + h && s(o + c));
              });
          };
          return s(0).then(() => {
            if (h.length > 0)
              throw new G('Error modifying one or more objects', h, d, f);
            return n.length;
          });
        });
    });
  }
  delete() {
    var e = this._ctx,
      t = e.range;
    return Kt(e) && ((e.isPrimKey && !bt) || 3 === t.type)
      ? this._write((n) => {
          const { primaryKey: r } = e.table.core.schema,
            i = t;
          return e.table.core
            .count({ trans: n, query: { index: r, range: i } })
            .then((t) =>
              e.table.core
                .mutate({ trans: n, type: 'deleteRange', range: i })
                .then(
                  ({
                    failures: e,
                    lastResult: n,
                    results: r,
                    numFailures: i,
                  }) => {
                    if (i)
                      throw new G(
                        'Could not delete some values',
                        Object.keys(e).map((t) => e[t]),
                        t - i,
                      );
                    return t - i;
                  },
                ),
            );
        })
      : this.modify(Nt);
  }
}
const Nt = (e, t) => (t.value = null);
function Mt(e, t) {
  return e < t ? -1 : e === t ? 0 : 1;
}
function qt(e, t) {
  return e > t ? -1 : e === t ? 0 : 1;
}
function $t(e, t, n) {
  var r = e instanceof zt ? new e.Collection(e) : e;
  return (r._ctx.error = n ? new n(t) : new TypeError(t)), r;
}
function Lt(e) {
  return new e.Collection(e, () => Yt('')).limit(0);
}
function Ut(e, t, n, r, i, s) {
  for (var o = Math.min(e.length, r.length), a = -1, l = 0; l < o; ++l) {
    var u = t[l];
    if (u !== r[l])
      return i(e[l], n[l]) < 0
        ? e.substr(0, l) + n[l] + n.substr(l + 1)
        : i(e[l], r[l]) < 0
          ? e.substr(0, l) + r[l] + n.substr(l + 1)
          : a >= 0
            ? e.substr(0, a) + t[a] + n.substr(a + 1)
            : null;
    i(e[l], u) < 0 && (a = l);
  }
  return o < r.length && 'next' === s
    ? e + n.substr(e.length)
    : o < e.length && 'prev' === s
      ? e.substr(0, n.length)
      : a < 0
        ? null
        : e.substr(0, a) + r[a] + n.substr(a + 1);
}
function Vt(e, t, n, r) {
  var i,
    s,
    o,
    a,
    l,
    u,
    c,
    h = n.length;
  if (!n.every((e) => 'string' == typeof e)) return $t(e, 'String expected.');
  function d(e) {
    (i = (function (e) {
      return 'next' === e ? (e) => e.toUpperCase() : (e) => e.toLowerCase();
    })(e)),
      (s = (function (e) {
        return 'next' === e ? (e) => e.toLowerCase() : (e) => e.toUpperCase();
      })(e)),
      (o = 'next' === e ? Mt : qt);
    var t = n
      .map(function (e) {
        return { lower: s(e), upper: i(e) };
      })
      .sort(function (e, t) {
        return o(e.lower, t.lower);
      });
    (a = t.map(function (e) {
      return e.upper;
    })),
      (l = t.map(function (e) {
        return e.lower;
      })),
      (u = e),
      (c = 'next' === e ? '' : r);
  }
  d('next');
  var f = new e.Collection(e, () => Wt(a[0], l[h - 1] + r));
  f._ondirectionchange = function (e) {
    d(e);
  };
  var p = 0;
  return (
    f._addAlgorithm(function (e, n, r) {
      var i = e.key;
      if ('string' != typeof i) return !1;
      var d = s(i);
      if (t(d, l, p)) return !0;
      for (var f = null, y = p; y < h; ++y) {
        var m = Ut(i, d, a[y], l[y], o, u);
        null === m && null === f
          ? (p = y + 1)
          : (null === f || o(f, m) > 0) && (f = m);
      }
      return (
        n(
          null !== f
            ? function () {
                e.continue(f + c);
              }
            : r,
        ),
        !1
      );
    }),
    f
  );
}
function Wt(e, t, n, r) {
  return { type: 2, lower: e, upper: t, lowerOpen: n, upperOpen: r };
}
function Yt(e) {
  return { type: 1, lower: e, upper: e };
}
class zt {
  get Collection() {
    return this._ctx.table.db.Collection;
  }
  between(e, t, n, r) {
    (n = !1 !== n), (r = !0 === r);
    try {
      return this._cmp(e, t) > 0 ||
        (0 === this._cmp(e, t) && (n || r) && (!n || !r))
        ? Lt(this)
        : new this.Collection(this, () => Wt(e, t, !n, !r));
    } catch (e) {
      return $t(this, yt);
    }
  }
  equals(e) {
    return null == e ? $t(this, yt) : new this.Collection(this, () => Yt(e));
  }
  above(e) {
    return null == e
      ? $t(this, yt)
      : new this.Collection(this, () => Wt(e, void 0, !0));
  }
  aboveOrEqual(e) {
    return null == e
      ? $t(this, yt)
      : new this.Collection(this, () => Wt(e, void 0, !1));
  }
  below(e) {
    return null == e
      ? $t(this, yt)
      : new this.Collection(this, () => Wt(void 0, e, !1, !0));
  }
  belowOrEqual(e) {
    return null == e
      ? $t(this, yt)
      : new this.Collection(this, () => Wt(void 0, e));
  }
  startsWith(e) {
    return 'string' != typeof e
      ? $t(this, 'String expected.')
      : this.between(e, e + pt, !0, !0);
  }
  startsWithIgnoreCase(e) {
    return '' === e
      ? this.startsWith(e)
      : Vt(this, (e, t) => 0 === e.indexOf(t[0]), [e], pt);
  }
  equalsIgnoreCase(e) {
    return Vt(this, (e, t) => e === t[0], [e], '');
  }
  anyOfIgnoreCase() {
    var e = B.apply(T, arguments);
    return 0 === e.length
      ? Lt(this)
      : Vt(this, (e, t) => -1 !== t.indexOf(e), e, '');
  }
  startsWithAnyOfIgnoreCase() {
    var e = B.apply(T, arguments);
    return 0 === e.length
      ? Lt(this)
      : Vt(this, (e, t) => t.some((t) => 0 === e.indexOf(t)), e, pt);
  }
  anyOf() {
    const e = B.apply(T, arguments);
    let t = this._cmp;
    try {
      e.sort(t);
    } catch (e) {
      return $t(this, yt);
    }
    if (0 === e.length) return Lt(this);
    const n = new this.Collection(this, () => Wt(e[0], e[e.length - 1]));
    n._ondirectionchange = (n) => {
      (t = 'next' === n ? this._ascending : this._descending), e.sort(t);
    };
    let r = 0;
    return (
      n._addAlgorithm((n, i, s) => {
        const o = n.key;
        for (; t(o, e[r]) > 0; ) if ((++r, r === e.length)) return i(s), !1;
        return (
          0 === t(o, e[r]) ||
          (i(() => {
            n.continue(e[r]);
          }),
          !1)
        );
      }),
      n
    );
  }
  notEqual(e) {
    return this.inAnyRange(
      [
        [-1 / 0, e],
        [e, this.db._maxKey],
      ],
      { includeLowers: !1, includeUppers: !1 },
    );
  }
  noneOf() {
    const e = B.apply(T, arguments);
    if (0 === e.length) return new this.Collection(this);
    try {
      e.sort(this._ascending);
    } catch (e) {
      return $t(this, yt);
    }
    const t = e.reduce(
      (e, t) => (e ? e.concat([[e[e.length - 1][1], t]]) : [[-1 / 0, t]]),
      null,
    );
    return (
      t.push([e[e.length - 1], this.db._maxKey]),
      this.inAnyRange(t, { includeLowers: !1, includeUppers: !1 })
    );
  }
  inAnyRange(e, t) {
    const n = this._cmp,
      r = this._ascending,
      i = this._descending,
      s = this._min,
      o = this._max;
    if (0 === e.length) return Lt(this);
    if (
      !e.every((e) => void 0 !== e[0] && void 0 !== e[1] && r(e[0], e[1]) <= 0)
    )
      return $t(
        this,
        'First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower',
        J.InvalidArgument,
      );
    const a = !t || !1 !== t.includeLowers,
      l = t && !0 === t.includeUppers;
    let u,
      c = r;
    function h(e, t) {
      return c(e[0], t[0]);
    }
    try {
      (u = e.reduce(function (e, t) {
        let r = 0,
          i = e.length;
        for (; r < i; ++r) {
          const i = e[r];
          if (n(t[0], i[1]) < 0 && n(t[1], i[0]) > 0) {
            (i[0] = s(i[0], t[0])), (i[1] = o(i[1], t[1]));
            break;
          }
        }
        return r === i && e.push(t), e;
      }, [])),
        u.sort(h);
    } catch (e) {
      return $t(this, yt);
    }
    let d = 0;
    const f = l ? (e) => r(e, u[d][1]) > 0 : (e) => r(e, u[d][1]) >= 0,
      p = a ? (e) => i(e, u[d][0]) > 0 : (e) => i(e, u[d][0]) >= 0;
    let y = f;
    const m = new this.Collection(this, () =>
      Wt(u[0][0], u[u.length - 1][1], !a, !l),
    );
    return (
      (m._ondirectionchange = (e) => {
        'next' === e ? ((y = f), (c = r)) : ((y = p), (c = i)), u.sort(h);
      }),
      m._addAlgorithm((e, t, n) => {
        for (var i = e.key; y(i); ) if ((++d, d === u.length)) return t(n), !1;
        return (
          !!(function (e) {
            return !f(e) && !p(e);
          })(i) ||
          (0 === this._cmp(i, u[d][1]) ||
            0 === this._cmp(i, u[d][0]) ||
            t(() => {
              c === r ? e.continue(u[d][0]) : e.continue(u[d][1]);
            }),
          !1)
        );
      }),
      m
    );
  }
  startsWithAnyOf() {
    const e = B.apply(T, arguments);
    return e.every((e) => 'string' == typeof e)
      ? 0 === e.length
        ? Lt(this)
        : this.inAnyRange(e.map((e) => [e, e + pt]))
      : $t(this, 'startsWithAnyOf() only works with strings');
  }
}
function Gt(e) {
  return Ye(function (t) {
    return Ht(t), e(t.target.error), !1;
  });
}
function Ht(e) {
  e.stopPropagation && e.stopPropagation(),
    e.preventDefault && e.preventDefault();
}
const Qt = Pt(null, 'storagemutated');
class Xt {
  _lock() {
    return (
      g(!Ke.global),
      ++this._reculock,
      1 !== this._reculock || Ke.global || (Ke.lockOwnerFor = this),
      this
    );
  }
  _unlock() {
    if ((g(!Ke.global), 0 == --this._reculock))
      for (
        Ke.global || (Ke.lockOwnerFor = null);
        this._blockedFuncs.length > 0 && !this._locked();

      ) {
        var e = this._blockedFuncs.shift();
        try {
          at(e[1], e[0]);
        } catch (e) {}
      }
    return this;
  }
  _locked() {
    return this._reculock && Ke.lockOwnerFor !== this;
  }
  create(e) {
    if (!this.mode) return this;
    const t = this.db.idbdb,
      n = this.db._state.dbOpenError;
    if ((g(!this.idbtrans), !e && !t))
      switch (n && n.name) {
        case 'DatabaseClosedError':
          throw new J.DatabaseClosed(n);
        case 'MissingAPIError':
          throw new J.MissingAPI(n.message, n);
        default:
          throw new J.OpenFailed(n);
      }
    if (!this.active) throw new J.TransactionInactive();
    return (
      g(null === this._completion._state),
      ((e = this.idbtrans =
        e ||
        (this.db.core
          ? this.db.core.transaction(this.storeNames, this.mode, {
              durability: this.chromeTransactionDurability,
            })
          : t.transaction(this.storeNames, this.mode, {
              durability: this.chromeTransactionDurability,
            }))).onerror = Ye((t) => {
        Ht(t), this._reject(e.error);
      })),
      (e.onabort = Ye((t) => {
        Ht(t),
          this.active && this._reject(new J.Abort(e.error)),
          (this.active = !1),
          this.on('abort').fire(t);
      })),
      (e.oncomplete = Ye(() => {
        (this.active = !1),
          this._resolve(),
          'mutatedParts' in e && Qt.storagemutated.fire(e.mutatedParts);
      })),
      this
    );
  }
  _promise(e, t, n) {
    if ('readwrite' === e && 'readwrite' !== this.mode)
      return dt(new J.ReadOnly('Transaction is readonly'));
    if (!this.active) return dt(new J.TransactionInactive());
    if (this._locked())
      return new je((r, i) => {
        this._blockedFuncs.push([
          () => {
            this._promise(e, t, n).then(r, i);
          },
          Ke,
        ]);
      });
    if (n)
      return Ze(() => {
        var e = new je((e, n) => {
          this._lock();
          const r = t(e, n, this);
          r && r.then && r.then(e, n);
        });
        return e.finally(() => this._unlock()), (e._lib = !0), e;
      });
    var r = new je((e, n) => {
      var r = t(e, n, this);
      r && r.then && r.then(e, n);
    });
    return (r._lib = !0), r;
  }
  _root() {
    return this.parent ? this.parent._root() : this;
  }
  waitFor(e) {
    var t = this._root();
    const n = je.resolve(e);
    if (t._waitingFor) t._waitingFor = t._waitingFor.then(() => n);
    else {
      (t._waitingFor = n), (t._waitingQueue = []);
      var r = t.idbtrans.objectStore(t.storeNames[0]);
      !(function e() {
        for (++t._spinCount; t._waitingQueue.length; )
          t._waitingQueue.shift()();
        t._waitingFor && (r.get(-1 / 0).onsuccess = e);
      })();
    }
    var i = t._waitingFor;
    return new je((e, r) => {
      n.then(
        (n) => t._waitingQueue.push(Ye(e.bind(null, n))),
        (e) => t._waitingQueue.push(Ye(r.bind(null, e))),
      ).finally(() => {
        t._waitingFor === i && (t._waitingFor = null);
      });
    });
  }
  abort() {
    this.active &&
      ((this.active = !1),
      this.idbtrans && this.idbtrans.abort(),
      this._reject(new J.Abort()));
  }
  table(e) {
    const t = this._memoizedTables || (this._memoizedTables = {});
    if (a(t, e)) return t[e];
    const n = this.schema[e];
    if (!n) throw new J.NotFound('Table ' + e + ' not part of transaction');
    const r = new this.db.Table(e, n, this);
    return (r.core = this.db.core.table(e)), (t[e] = r), r;
  }
}
function Jt(e, t, n, r, i, s, o) {
  return {
    name: e,
    keyPath: t,
    unique: n,
    multi: r,
    auto: i,
    compound: s,
    src: (n && !o ? '&' : '') + (r ? '*' : '') + (i ? '++' : '') + Zt(t),
  };
}
function Zt(e) {
  return 'string' == typeof e ? e : e ? '[' + [].join.call(e, '+') + ']' : '';
}
function en(e, t, n) {
  return {
    name: e,
    primKey: t,
    indexes: n,
    mappedClass: null,
    idxByName: b(n, (e) => [e.name, e]),
  };
}
let tn = (e) => {
  try {
    return e.only([[]]), (tn = () => [[]]), [[]];
  } catch (e) {
    return (tn = () => pt), pt;
  }
};
function nn(e) {
  return null == e
    ? () => {}
    : 'string' == typeof e
      ? (function (e) {
          return 1 === e.split('.').length ? (t) => t[e] : (t) => _(t, e);
        })(e)
      : (t) => _(t, e);
}
function rn(e) {
  return [].slice.call(e);
}
let sn = 0;
function on(e) {
  return null == e ? ':id' : 'string' == typeof e ? e : `[${e.join('+')}]`;
}
function an(e, t, n) {
  function i(e) {
    if (3 === e.type) return null;
    if (4 === e.type)
      throw new Error('Cannot convert never type to IDBKeyRange');
    const { lower: n, upper: r, lowerOpen: i, upperOpen: s } = e;
    return void 0 === n
      ? void 0 === r
        ? null
        : t.upperBound(r, !!s)
      : void 0 === r
        ? t.lowerBound(n, !!i)
        : t.bound(n, r, !!i, !!s);
  }
  const { schema: s, hasGetAll: o } = (function (e, t) {
      const n = rn(e.objectStoreNames);
      return {
        schema: {
          name: e.name,
          tables: n
            .map((e) => t.objectStore(e))
            .map((e) => {
              const { keyPath: t, autoIncrement: n } = e,
                i = r(t),
                s = null == t,
                o = {},
                a = {
                  name: e.name,
                  primaryKey: {
                    name: null,
                    isPrimaryKey: !0,
                    outbound: s,
                    compound: i,
                    keyPath: t,
                    autoIncrement: n,
                    unique: !0,
                    extractKey: nn(t),
                  },
                  indexes: rn(e.indexNames)
                    .map((t) => e.index(t))
                    .map((e) => {
                      const {
                          name: t,
                          unique: n,
                          multiEntry: i,
                          keyPath: s,
                        } = e,
                        a = {
                          name: t,
                          compound: r(s),
                          keyPath: s,
                          unique: n,
                          multiEntry: i,
                          extractKey: nn(s),
                        };
                      return (o[on(s)] = a), a;
                    }),
                  getIndexByKeyPath: (e) => o[on(e)],
                };
              return (
                (o[':id'] = a.primaryKey),
                null != t && (o[on(t)] = a.primaryKey),
                a
              );
            }),
        },
        hasGetAll:
          n.length > 0 &&
          'getAll' in t.objectStore(n[0]) &&
          !(
            'undefined' != typeof navigator &&
            /Safari/.test(navigator.userAgent) &&
            !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
            [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604
          ),
      };
    })(e, n),
    a = s.tables.map((e) =>
      (function (e) {
        const t = e.name;
        return {
          name: t,
          schema: e,
          mutate: function ({
            trans: e,
            type: n,
            keys: r,
            values: s,
            range: o,
          }) {
            return new Promise((a, l) => {
              a = Ye(a);
              const u = e.objectStore(t),
                c = null == u.keyPath,
                h = 'put' === n || 'add' === n;
              if (!h && 'delete' !== n && 'deleteRange' !== n)
                throw new Error('Invalid operation type: ' + n);
              const { length: d } = r || s || { length: 1 };
              if (r && s && r.length !== s.length)
                throw new Error(
                  'Given keys array must have same length as given values array.',
                );
              if (0 === d)
                return a({
                  numFailures: 0,
                  failures: {},
                  results: [],
                  lastResult: void 0,
                });
              let f;
              const p = [],
                y = [];
              let m = 0;
              const g = (e) => {
                ++m, Ht(e);
              };
              if ('deleteRange' === n) {
                if (4 === o.type)
                  return a({
                    numFailures: m,
                    failures: y,
                    results: [],
                    lastResult: void 0,
                  });
                3 === o.type
                  ? p.push((f = u.clear()))
                  : p.push((f = u.delete(i(o))));
              } else {
                const [e, t] = h ? (c ? [s, r] : [s, null]) : [r, null];
                if (h)
                  for (let r = 0; r < d; ++r)
                    p.push(
                      (f =
                        t && void 0 !== t[r] ? u[n](e[r], t[r]) : u[n](e[r])),
                    ),
                      (f.onerror = g);
                else
                  for (let t = 0; t < d; ++t)
                    p.push((f = u[n](e[t]))), (f.onerror = g);
              }
              const v = (e) => {
                const t = e.target.result;
                p.forEach((e, t) => null != e.error && (y[t] = e.error)),
                  a({
                    numFailures: m,
                    failures: y,
                    results: 'delete' === n ? r : p.map((e) => e.result),
                    lastResult: t,
                  });
              };
              (f.onerror = (e) => {
                g(e), v(e);
              }),
                (f.onsuccess = v);
            });
          },
          getMany: ({ trans: e, keys: n }) =>
            new Promise((r, i) => {
              r = Ye(r);
              const s = e.objectStore(t),
                o = n.length,
                a = new Array(o);
              let l,
                u = 0,
                c = 0;
              const h = (e) => {
                  const t = e.target;
                  (a[t._pos] = t.result), ++c === u && r(a);
                },
                d = Gt(i);
              for (let e = 0; e < o; ++e)
                null != n[e] &&
                  ((l = s.get(n[e])),
                  (l._pos = e),
                  (l.onsuccess = h),
                  (l.onerror = d),
                  ++u);
              0 === u && r(a);
            }),
          get: ({ trans: e, key: n }) =>
            new Promise((r, i) => {
              r = Ye(r);
              const s = e.objectStore(t).get(n);
              (s.onsuccess = (e) => r(e.target.result)), (s.onerror = Gt(i));
            }),
          query: (function (e) {
            return (n) =>
              new Promise((r, s) => {
                r = Ye(r);
                const { trans: o, values: a, limit: l, query: u } = n,
                  c = l === 1 / 0 ? void 0 : l,
                  { index: h, range: d } = u,
                  f = o.objectStore(t),
                  p = h.isPrimaryKey ? f : f.index(h.name),
                  y = i(d);
                if (0 === l) return r({ result: [] });
                if (e) {
                  const e = a ? p.getAll(y, c) : p.getAllKeys(y, c);
                  (e.onsuccess = (e) => r({ result: e.target.result })),
                    (e.onerror = Gt(s));
                } else {
                  let e = 0;
                  const t =
                      a || !('openKeyCursor' in p)
                        ? p.openCursor(y)
                        : p.openKeyCursor(y),
                    n = [];
                  (t.onsuccess = (i) => {
                    const s = t.result;
                    return s
                      ? (n.push(a ? s.value : s.primaryKey),
                        ++e === l ? r({ result: n }) : void s.continue())
                      : r({ result: n });
                  }),
                    (t.onerror = Gt(s));
                }
              });
          })(o),
          openCursor: function ({
            trans: e,
            values: n,
            query: r,
            reverse: s,
            unique: o,
          }) {
            return new Promise((a, l) => {
              a = Ye(a);
              const { index: u, range: c } = r,
                h = e.objectStore(t),
                d = u.isPrimaryKey ? h : h.index(u.name),
                f = s ? (o ? 'prevunique' : 'prev') : o ? 'nextunique' : 'next',
                p =
                  n || !('openKeyCursor' in d)
                    ? d.openCursor(i(c), f)
                    : d.openKeyCursor(i(c), f);
              (p.onerror = Gt(l)),
                (p.onsuccess = Ye((t) => {
                  const n = p.result;
                  if (!n) return void a(null);
                  (n.___id = ++sn), (n.done = !1);
                  const r = n.continue.bind(n);
                  let i = n.continuePrimaryKey;
                  i && (i = i.bind(n));
                  const s = n.advance.bind(n),
                    o = () => {
                      throw new Error('Cursor not stopped');
                    };
                  (n.trans = e),
                    (n.stop =
                      n.continue =
                      n.continuePrimaryKey =
                      n.advance =
                        () => {
                          throw new Error('Cursor not started');
                        }),
                    (n.fail = Ye(l)),
                    (n.next = function () {
                      let e = 1;
                      return this.start(() =>
                        e-- ? this.continue() : this.stop(),
                      ).then(() => this);
                    }),
                    (n.start = (e) => {
                      const t = new Promise((e, t) => {
                          (e = Ye(e)),
                            (p.onerror = Gt(t)),
                            (n.fail = t),
                            (n.stop = (t) => {
                              (n.stop =
                                n.continue =
                                n.continuePrimaryKey =
                                n.advance =
                                  o),
                                e(t);
                            });
                        }),
                        a = () => {
                          if (p.result)
                            try {
                              e();
                            } catch (e) {
                              n.fail(e);
                            }
                          else
                            (n.done = !0),
                              (n.start = () => {
                                throw new Error('Cursor behind last entry');
                              }),
                              n.stop();
                        };
                      return (
                        (p.onsuccess = Ye((e) => {
                          (p.onsuccess = a), a();
                        })),
                        (n.continue = r),
                        (n.continuePrimaryKey = i),
                        (n.advance = s),
                        a(),
                        t
                      );
                    }),
                    a(n);
                }, l));
            });
          },
          count({ query: e, trans: n }) {
            const { index: r, range: s } = e;
            return new Promise((e, o) => {
              const a = n.objectStore(t),
                l = r.isPrimaryKey ? a : a.index(r.name),
                u = i(s),
                c = u ? l.count(u) : l.count();
              (c.onsuccess = Ye((t) => e(t.target.result))),
                (c.onerror = Gt(o));
            });
          },
        };
      })(e),
    ),
    l = {};
  return (
    a.forEach((e) => (l[e.name] = e)),
    {
      stack: 'dbcore',
      transaction: e.transaction.bind(e),
      table(e) {
        if (!l[e]) throw new Error(`Table '${e}' not found`);
        return l[e];
      },
      MIN_KEY: -1 / 0,
      MAX_KEY: tn(t),
      schema: s,
    }
  );
}
function ln({ _novip: e }, t) {
  const n = t.db,
    r = (function (e, t, { IDBKeyRange: n, indexedDB: r }, i) {
      const s = (function (e, t) {
        return t.reduce((e, { create: t }) => ({ ...e, ...t(e) }), e);
      })(an(t, n, i), e.dbcore);
      return { dbcore: s };
    })(e._middlewares, n, e._deps, t);
  (e.core = r.dbcore),
    e.tables.forEach((t) => {
      const n = t.name;
      e.core.schema.tables.some((e) => e.name === n) &&
        ((t.core = e.core.table(n)),
        e[n] instanceof e.Table && (e[n].core = t.core));
    });
}
function un({ _novip: e }, t, n, r) {
  n.forEach((n) => {
    const i = r[n];
    t.forEach((t) => {
      const r = f(t, n);
      (!r || ('value' in r && void 0 === r.value)) &&
        (t === e.Transaction.prototype || t instanceof e.Transaction
          ? c(t, n, {
              get() {
                return this.table(n);
              },
              set(e) {
                u(this, n, {
                  value: e,
                  writable: !0,
                  configurable: !0,
                  enumerable: !0,
                });
              },
            })
          : (t[n] = new e.Table(n, i)));
    });
  });
}
function cn({ _novip: e }, t) {
  t.forEach((t) => {
    for (let n in t) t[n] instanceof e.Table && delete t[n];
  });
}
function hn(e, t) {
  return e._cfg.version - t._cfg.version;
}
function dn(e, t, r, i) {
  const s = e._dbSchema,
    o = e._createTransaction('readwrite', e._storeNames, s);
  o.create(r), o._completion.catch(i);
  const a = o._reject.bind(o),
    l = Ke.transless || Ke;
  Ze(() => {
    (Ke.trans = o),
      (Ke.transless = l),
      0 === t
        ? (n(s).forEach((e) => {
            pn(r, e, s[e].primKey, s[e].indexes);
          }),
          ln(e, r),
          je.follow(() => e.on.populate.fire(o)).catch(a))
        : (function ({ _novip: e }, t, r, i) {
            const s = [],
              o = e._versions;
            let a = (e._dbSchema = mn(0, e.idbdb, i)),
              l = !1;
            return (
              o
                .filter((e) => e._cfg.version >= t)
                .forEach((o) => {
                  s.push(() => {
                    const s = a,
                      u = o._cfg.dbschema;
                    gn(e, s, i), gn(e, u, i), (a = e._dbSchema = u);
                    const c = fn(s, u);
                    c.add.forEach((e) => {
                      pn(i, e[0], e[1].primKey, e[1].indexes);
                    }),
                      c.change.forEach((e) => {
                        if (e.recreate)
                          throw new J.Upgrade(
                            'Not yet support for changing primary key',
                          );
                        {
                          const t = i.objectStore(e.name);
                          e.add.forEach((e) => yn(t, e)),
                            e.change.forEach((e) => {
                              t.deleteIndex(e.name), yn(t, e);
                            }),
                            e.del.forEach((e) => t.deleteIndex(e));
                        }
                      });
                    const h = o._cfg.contentUpgrade;
                    if (h && o._cfg.version > t) {
                      ln(e, i), (r._memoizedTables = {}), (l = !0);
                      let t = x(u);
                      c.del.forEach((e) => {
                        t[e] = s[e];
                      }),
                        cn(e, [e.Transaction.prototype]),
                        un(e, [e.Transaction.prototype], n(t), t),
                        (r.schema = t);
                      const o = R(h);
                      let a;
                      o && et();
                      const d = je.follow(() => {
                        if (((a = h(r)), a && o)) {
                          var e = tt.bind(null, null);
                          a.then(e, e);
                        }
                      });
                      return a && 'function' == typeof a.then
                        ? je.resolve(a)
                        : d.then(() => a);
                    }
                  }),
                    s.push((t) => {
                      (l && vt) ||
                        (function (e, t) {
                          [].slice
                            .call(t.db.objectStoreNames)
                            .forEach(
                              (n) => null == e[n] && t.db.deleteObjectStore(n),
                            );
                        })(o._cfg.dbschema, t),
                        cn(e, [e.Transaction.prototype]),
                        un(
                          e,
                          [e.Transaction.prototype],
                          e._storeNames,
                          e._dbSchema,
                        ),
                        (r.schema = e._dbSchema);
                    });
                }),
              (function e() {
                return s.length
                  ? je.resolve(s.shift()(r.idbtrans)).then(e)
                  : je.resolve();
              })().then(() => {
                var e, t;
                (t = i),
                  n((e = a)).forEach((n) => {
                    t.db.objectStoreNames.contains(n) ||
                      pn(t, n, e[n].primKey, e[n].indexes);
                  });
              })
            );
          })(e, t, o, r).catch(a);
  });
}
function fn(e, t) {
  const n = { del: [], add: [], change: [] };
  let r;
  for (r in e) t[r] || n.del.push(r);
  for (r in t) {
    const i = e[r],
      s = t[r];
    if (i) {
      const e = { name: r, def: s, recreate: !1, del: [], add: [], change: [] };
      if (
        '' + (i.primKey.keyPath || '') != '' + (s.primKey.keyPath || '') ||
        (i.primKey.auto !== s.primKey.auto && !gt)
      )
        (e.recreate = !0), n.change.push(e);
      else {
        const t = i.idxByName,
          r = s.idxByName;
        let o;
        for (o in t) r[o] || e.del.push(o);
        for (o in r) {
          const n = t[o],
            i = r[o];
          n ? n.src !== i.src && e.change.push(i) : e.add.push(i);
        }
        (e.del.length > 0 || e.add.length > 0 || e.change.length > 0) &&
          n.change.push(e);
      }
    } else n.add.push([r, s]);
  }
  return n;
}
function pn(e, t, n, r) {
  const i = e.db.createObjectStore(
    t,
    n.keyPath
      ? { keyPath: n.keyPath, autoIncrement: n.auto }
      : { autoIncrement: n.auto },
  );
  return r.forEach((e) => yn(i, e)), i;
}
function yn(e, t) {
  e.createIndex(t.name, t.keyPath, { unique: t.unique, multiEntry: t.multi });
}
function mn(e, t, n) {
  const r = {};
  return (
    y(t.objectStoreNames, 0).forEach((e) => {
      const t = n.objectStore(e);
      let i = t.keyPath;
      const s = Jt(
          Zt(i),
          i || '',
          !1,
          !1,
          !!t.autoIncrement,
          i && 'string' != typeof i,
          !0,
        ),
        o = [];
      for (let e = 0; e < t.indexNames.length; ++e) {
        const n = t.index(t.indexNames[e]);
        i = n.keyPath;
        var a = Jt(
          n.name,
          i,
          !!n.unique,
          !!n.multiEntry,
          !1,
          i && 'string' != typeof i,
          !1,
        );
        o.push(a);
      }
      r[e] = en(e, s, o);
    }),
    r
  );
}
function gn({ _novip: e }, n, r) {
  const i = r.db.objectStoreNames;
  for (let t = 0; t < i.length; ++t) {
    const s = i[t],
      o = r.objectStore(s);
    e._hasGetAll = 'getAll' in o;
    for (let e = 0; e < o.indexNames.length; ++e) {
      const t = o.indexNames[e],
        r = o.index(t).keyPath,
        i = 'string' == typeof r ? r : '[' + y(r).join('+') + ']';
      if (n[s]) {
        const e = n[s].idxByName[i];
        e && ((e.name = t), delete n[s].idxByName[i], (n[s].idxByName[t] = e));
      }
    }
  }
  'undefined' != typeof navigator &&
    /Safari/.test(navigator.userAgent) &&
    !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
    t.WorkerGlobalScope &&
    t instanceof t.WorkerGlobalScope &&
    [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 &&
    (e._hasGetAll = !1);
}
class vn {
  _parseStoresSpec(e, t) {
    n(e).forEach((n) => {
      if (null !== e[n]) {
        var i = e[n].split(',').map((e, t) => {
            const n = (e = e.trim()).replace(/([&*]|\+\+)/g, ''),
              i = /^\[/.test(n) ? n.match(/^\[(.*)\]$/)[1].split('+') : n;
            return Jt(
              n,
              i || null,
              /\&/.test(e),
              /\*/.test(e),
              /\+\+/.test(e),
              r(i),
              0 === t,
            );
          }),
          s = i.shift();
        if (s.multi) throw new J.Schema('Primary key cannot be multi-valued');
        i.forEach((e) => {
          if (e.auto)
            throw new J.Schema(
              'Only primary key can be marked as autoIncrement (++)',
            );
          if (!e.keyPath)
            throw new J.Schema(
              'Index must have a name and cannot be an empty string',
            );
        }),
          (t[n] = en(n, s, i));
      }
    });
  }
  stores(e) {
    const t = this.db;
    this._cfg.storesSource = this._cfg.storesSource
      ? i(this._cfg.storesSource, e)
      : e;
    const r = t._versions,
      s = {};
    let o = {};
    return (
      r.forEach((e) => {
        i(s, e._cfg.storesSource),
          (o = e._cfg.dbschema = {}),
          e._parseStoresSpec(s, o);
      }),
      (t._dbSchema = o),
      cn(t, [t._allTables, t, t.Transaction.prototype]),
      un(
        t,
        [t._allTables, t, t.Transaction.prototype, this._cfg.tables],
        n(o),
        o,
      ),
      (t._storeNames = n(o)),
      this
    );
  }
  upgrade(e) {
    return (
      (this._cfg.contentUpgrade = ue(this._cfg.contentUpgrade || te, e)), this
    );
  }
}
function bn(e, t) {
  let n = e._dbNamesDB;
  return (
    n ||
      ((n = e._dbNamesDB =
        new qn('__dbnames', { addons: [], indexedDB: e, IDBKeyRange: t })),
      n.version(1).stores({ dbnames: 'name' })),
    n.table('dbnames')
  );
}
function _n(e) {
  return e && 'function' == typeof e.databases;
}
function wn(e) {
  return Ze(function () {
    return (Ke.letThrough = !0), e();
  });
}
function xn() {
  var e;
  return !navigator.userAgentData &&
    /Safari\//.test(navigator.userAgent) &&
    !/Chrom(e|ium)\//.test(navigator.userAgent) &&
    indexedDB.databases
    ? new Promise(function (t) {
        var n = function () {
          return indexedDB.databases().finally(t);
        };
        (e = setInterval(n, 100)), n();
      }).finally(function () {
        return clearInterval(e);
      })
    : Promise.resolve();
}
function kn(e) {
  var t = (t) => e.next(t),
    n = s(t),
    i = s((t) => e.throw(t));
  function s(e) {
    return (t) => {
      var s = e(t),
        o = s.value;
      return s.done
        ? o
        : o && 'function' == typeof o.then
          ? o.then(n, i)
          : r(o)
            ? Promise.all(o).then(n, i)
            : n(o);
    };
  }
  return s(t)();
}
function En(e, t, n) {
  var r = arguments.length;
  if (r < 2) throw new J.InvalidArgument('Too few arguments');
  for (var i = new Array(r - 1); --r; ) i[r - 1] = arguments[r];
  n = i.pop();
  var s = E(i);
  return [e, s, n];
}
function Pn(e, t, n, r, i) {
  return je.resolve().then(() => {
    const s = Ke.transless || Ke,
      o = e._createTransaction(t, n, e._dbSchema, r),
      a = { trans: o, transless: s };
    if (r) o.idbtrans = r.idbtrans;
    else
      try {
        o.create(), (e._state.PR1398_maxLoop = 3);
      } catch (r) {
        return r.name === Q.InvalidState &&
          e.isOpen() &&
          --e._state.PR1398_maxLoop > 0
          ? (console.warn('Dexie: Need to reopen db'),
            e._close(),
            e.open().then(() => Pn(e, t, n, null, i)))
          : dt(r);
      }
    const l = R(i);
    let u;
    l && et();
    const c = je.follow(() => {
      if (((u = i.call(o, o)), u))
        if (l) {
          var e = tt.bind(null, null);
          u.then(e, e);
        } else
          'function' == typeof u.next &&
            'function' == typeof u.throw &&
            (u = kn(u));
    }, a);
    return (
      u && 'function' == typeof u.then
        ? je
            .resolve(u)
            .then((e) =>
              o.active
                ? e
                : dt(
                    new J.PrematureCommit(
                      'Transaction committed too early. See http://bit.ly/2kdckMn',
                    ),
                  ),
            )
        : c.then(() => u)
    )
      .then((e) => (r && o._resolve(), o._completion.then(() => e)))
      .catch((e) => (o._reject(e), dt(e)));
  });
}
function Sn(e, t, n) {
  const i = r(e) ? e.slice() : [e];
  for (let e = 0; e < n; ++e) i.push(t);
  return i;
}
const Kn = {
  stack: 'dbcore',
  name: 'VirtualIndexMiddleware',
  level: 1,
  create: function (e) {
    return {
      ...e,
      table(t) {
        const n = e.table(t),
          { schema: r } = n,
          i = {},
          s = [];
        function o(e, t, n) {
          const r = on(e),
            a = (i[r] = i[r] || []),
            l = null == e ? 0 : 'string' == typeof e ? 1 : e.length,
            u = t > 0,
            c = {
              ...n,
              isVirtual: u,
              keyTail: t,
              keyLength: l,
              extractKey: nn(e),
              unique: !u && n.unique,
            };
          return (
            a.push(c),
            c.isPrimaryKey || s.push(c),
            l > 1 && o(2 === l ? e[0] : e.slice(0, l - 1), t + 1, n),
            a.sort((e, t) => e.keyTail - t.keyTail),
            c
          );
        }
        const a = o(r.primaryKey.keyPath, 0, r.primaryKey);
        i[':id'] = [a];
        for (const e of r.indexes) o(e.keyPath, 0, e);
        function l(t) {
          const n = t.query.index;
          return n.isVirtual
            ? {
                ...t,
                query: {
                  index: n,
                  range:
                    ((r = t.query.range),
                    (i = n.keyTail),
                    {
                      type: 1 === r.type ? 2 : r.type,
                      lower: Sn(
                        r.lower,
                        r.lowerOpen ? e.MAX_KEY : e.MIN_KEY,
                        i,
                      ),
                      lowerOpen: !0,
                      upper: Sn(
                        r.upper,
                        r.upperOpen ? e.MIN_KEY : e.MAX_KEY,
                        i,
                      ),
                      upperOpen: !0,
                    }),
                },
              }
            : t;
          var r, i;
        }
        const u = {
          ...n,
          schema: {
            ...r,
            primaryKey: a,
            indexes: s,
            getIndexByKeyPath: function (e) {
              const t = i[on(e)];
              return t && t[0];
            },
          },
          count: (e) => n.count(l(e)),
          query: (e) => n.query(l(e)),
          openCursor(t) {
            const { keyTail: r, isVirtual: i, keyLength: s } = t.query.index;
            return i
              ? n.openCursor(l(t)).then(
                  (n) =>
                    n &&
                    (function (n) {
                      const i = Object.create(n, {
                        continue: {
                          value: function (i) {
                            null != i
                              ? n.continue(
                                  Sn(i, t.reverse ? e.MAX_KEY : e.MIN_KEY, r),
                                )
                              : t.unique
                                ? n.continue(
                                    n.key
                                      .slice(0, s)
                                      .concat(
                                        t.reverse ? e.MIN_KEY : e.MAX_KEY,
                                        r,
                                      ),
                                  )
                                : n.continue();
                          },
                        },
                        continuePrimaryKey: {
                          value(t, i) {
                            n.continuePrimaryKey(Sn(t, e.MAX_KEY, r), i);
                          },
                        },
                        primaryKey: { get: () => n.primaryKey },
                        key: {
                          get() {
                            const e = n.key;
                            return 1 === s ? e[0] : e.slice(0, s);
                          },
                        },
                        value: { get: () => n.value },
                      });
                      return i;
                    })(n),
                )
              : n.openCursor(t);
          },
        };
        return u;
      },
    };
  },
};
function On(e, t, r, i) {
  return (
    (r = r || {}),
    (i = i || ''),
    n(e).forEach((n) => {
      if (a(t, n)) {
        var s = e[n],
          o = t[n];
        if ('object' == typeof s && 'object' == typeof o && s && o) {
          const e = j(s);
          e !== j(o)
            ? (r[i + n] = t[n])
            : 'Object' === e
              ? On(s, o, r, i + n + '.')
              : s !== o && (r[i + n] = t[n]);
        } else s !== o && (r[i + n] = t[n]);
      } else r[i + n] = void 0;
    }),
    n(t).forEach((n) => {
      a(e, n) || (r[i + n] = t[n]);
    }),
    r
  );
}
const Cn = {
  stack: 'dbcore',
  name: 'HooksMiddleware',
  level: 2,
  create: (e) => ({
    ...e,
    table(t) {
      const n = e.table(t),
        { primaryKey: r } = n.schema,
        i = {
          ...n,
          mutate(e) {
            const i = Ke.trans,
              { deleting: s, creating: o, updating: l } = i.table(t).hook;
            switch (e.type) {
              case 'add':
                if (o.fire === te) break;
                return i._promise('readwrite', () => u(e), !0);
              case 'put':
                if (o.fire === te && l.fire === te) break;
                return i._promise('readwrite', () => u(e), !0);
              case 'delete':
                if (s.fire === te) break;
                return i._promise('readwrite', () => u(e), !0);
              case 'deleteRange':
                if (s.fire === te) break;
                return i._promise(
                  'readwrite',
                  () =>
                    (function (e) {
                      return c(e.trans, e.range, 1e4);
                    })(e),
                  !0,
                );
            }
            return n.mutate(e);
            function u(e) {
              const t = Ke.trans,
                i =
                  e.keys ||
                  (function (e, t) {
                    return 'delete' === t.type
                      ? t.keys
                      : t.keys || t.values.map(e.extractKey);
                  })(r, e);
              if (!i) throw new Error('Keys missing');
              return (
                'delete' !==
                  (e =
                    'add' === e.type || 'put' === e.type
                      ? { ...e, keys: i }
                      : { ...e }).type && (e.values = [...e.values]),
                e.keys && (e.keys = [...e.keys]),
                (function (e, t, n) {
                  return 'add' === t.type
                    ? Promise.resolve([])
                    : e.getMany({
                        trans: t.trans,
                        keys: n,
                        cache: 'immutable',
                      });
                })(n, e, i).then((u) => {
                  const c = i.map((n, i) => {
                    const c = u[i],
                      h = { onerror: null, onsuccess: null };
                    if ('delete' === e.type) s.fire.call(h, n, c, t);
                    else if ('add' === e.type || void 0 === c) {
                      const s = o.fire.call(h, n, e.values[i], t);
                      null == n &&
                        null != s &&
                        ((n = s),
                        (e.keys[i] = n),
                        r.outbound || w(e.values[i], r.keyPath, n));
                    } else {
                      const r = On(c, e.values[i]),
                        s = l.fire.call(h, r, n, c, t);
                      if (s) {
                        const t = e.values[i];
                        Object.keys(s).forEach((e) => {
                          a(t, e) ? (t[e] = s[e]) : w(t, e, s[e]);
                        });
                      }
                    }
                    return h;
                  });
                  return n
                    .mutate(e)
                    .then(
                      ({
                        failures: t,
                        results: n,
                        numFailures: r,
                        lastResult: s,
                      }) => {
                        for (let r = 0; r < i.length; ++r) {
                          const s = n ? n[r] : i[r],
                            o = c[r];
                          null == s
                            ? o.onerror && o.onerror(t[r])
                            : o.onsuccess &&
                              o.onsuccess(
                                'put' === e.type && u[r] ? e.values[r] : s,
                              );
                        }
                        return {
                          failures: t,
                          results: n,
                          numFailures: r,
                          lastResult: s,
                        };
                      },
                    )
                    .catch(
                      (e) => (
                        c.forEach((t) => t.onerror && t.onerror(e)),
                        Promise.reject(e)
                      ),
                    );
                })
              );
            }
            function c(e, t, i) {
              return n
                .query({
                  trans: e,
                  values: !1,
                  query: { index: r, range: t },
                  limit: i,
                })
                .then(({ result: n }) =>
                  u({ type: 'delete', keys: n, trans: e }).then((r) =>
                    r.numFailures > 0
                      ? Promise.reject(r.failures[0])
                      : n.length < i
                        ? { failures: [], numFailures: 0, lastResult: void 0 }
                        : c(
                            e,
                            { ...t, lower: n[n.length - 1], lowerOpen: !0 },
                            i,
                          ),
                  ),
                );
            }
          },
        };
      return i;
    },
  }),
};
function An(e, t, n) {
  try {
    if (!t) return null;
    if (t.keys.length < e.length) return null;
    const r = [];
    for (let i = 0, s = 0; i < t.keys.length && s < e.length; ++i)
      0 === Tt(t.keys[i], e[s]) &&
        (r.push(n ? O(t.values[i]) : t.values[i]), ++s);
    return r.length === e.length ? r : null;
  } catch (e) {
    return null;
  }
}
const jn = {
  stack: 'dbcore',
  level: -1,
  create: (e) => ({
    table: (t) => {
      const n = e.table(t);
      return {
        ...n,
        getMany: (e) => {
          if (!e.cache) return n.getMany(e);
          const t = An(e.keys, e.trans._cache, 'clone' === e.cache);
          return t
            ? je.resolve(t)
            : n.getMany(e).then(
                (t) => (
                  (e.trans._cache = {
                    keys: e.keys,
                    values: 'clone' === e.cache ? O(t) : t,
                  }),
                  t
                ),
              );
        },
        mutate: (e) => (
          'add' !== e.type && (e.trans._cache = null), n.mutate(e)
        ),
      };
    },
  }),
};
function Dn(e) {
  return !('from' in e);
}
const In = function (e, t) {
  if (!this) {
    const t = new In();
    return e && 'd' in e && i(t, e), t;
  }
  i(
    this,
    arguments.length
      ? { d: 1, from: e, to: arguments.length > 1 ? t : e }
      : { d: 0 },
  );
};
function Tn(e, t, n) {
  const r = Tt(t, n);
  if (isNaN(r)) return;
  if (r > 0) throw RangeError();
  if (Dn(e)) return i(e, { from: t, to: n, d: 1 });
  const s = e.l,
    o = e.r;
  if (Tt(n, e.from) < 0)
    return (
      s ? Tn(s, t, n) : (e.l = { from: t, to: n, d: 1, l: null, r: null }),
      Fn(e)
    );
  if (Tt(t, e.to) > 0)
    return (
      o ? Tn(o, t, n) : (e.r = { from: t, to: n, d: 1, l: null, r: null }),
      Fn(e)
    );
  Tt(t, e.from) < 0 && ((e.from = t), (e.l = null), (e.d = o ? o.d + 1 : 1)),
    Tt(n, e.to) > 0 && ((e.to = n), (e.r = null), (e.d = e.l ? e.l.d + 1 : 1));
  const a = !e.r;
  s && !e.l && Bn(e, s), o && a && Bn(e, o);
}
function Bn(e, t) {
  Dn(t) ||
    (function e(t, { from: n, to: r, l: i, r: s }) {
      Tn(t, n, r), i && e(t, i), s && e(t, s);
    })(e, t);
}
function Rn(e) {
  let t = Dn(e) ? null : { s: 0, n: e };
  return {
    next(e) {
      const n = arguments.length > 0;
      for (; t; )
        switch (t.s) {
          case 0:
            if (((t.s = 1), n))
              for (; t.n.l && Tt(e, t.n.from) < 0; )
                t = { up: t, n: t.n.l, s: 1 };
            else for (; t.n.l; ) t = { up: t, n: t.n.l, s: 1 };
          case 1:
            if (((t.s = 2), !n || Tt(e, t.n.to) <= 0))
              return { value: t.n, done: !1 };
          case 2:
            if (t.n.r) {
              (t.s = 3), (t = { up: t, n: t.n.r, s: 0 });
              continue;
            }
          case 3:
            t = t.up;
        }
      return { done: !0 };
    },
  };
}
function Fn(e) {
  var t, n;
  const r =
      ((null === (t = e.r) || void 0 === t ? void 0 : t.d) || 0) -
      ((null === (n = e.l) || void 0 === n ? void 0 : n.d) || 0),
    i = r > 1 ? 'r' : r < -1 ? 'l' : '';
  if (i) {
    const t = 'r' === i ? 'l' : 'r',
      n = { ...e },
      r = e[i];
    (e.from = r.from),
      (e.to = r.to),
      (e[i] = r[i]),
      (n[i] = r[t]),
      (e[t] = n),
      (n.d = Nn(n));
  }
  e.d = Nn(e);
}
function Nn({ r: e, l: t }) {
  return (e ? (t ? Math.max(e.d, t.d) : e.d) : t ? t.d : 0) + 1;
}
l(In.prototype, {
  add(e) {
    return Bn(this, e), this;
  },
  addKey(e) {
    return Tn(this, e, e), this;
  },
  addKeys(e) {
    return e.forEach((e) => Tn(this, e, e)), this;
  },
  [D]() {
    return Rn(this);
  },
});
const Mn = {
  stack: 'dbcore',
  level: 0,
  create: (e) => {
    const t = e.schema.name,
      i = new In(e.MIN_KEY, e.MAX_KEY);
    return {
      ...e,
      table: (s) => {
        const o = e.table(s),
          { schema: a } = o,
          { primaryKey: l } = a,
          { extractKey: u, outbound: c } = l,
          h = {
            ...o,
            mutate: (e) => {
              const n = e.trans,
                l = n.mutatedParts || (n.mutatedParts = {}),
                u = (e) => {
                  const n = `idb://${t}/${s}/${e}`;
                  return l[n] || (l[n] = new In());
                },
                c = u(''),
                h = u(':dels'),
                { type: d } = e;
              let [f, p] =
                'deleteRange' === e.type
                  ? [e.range]
                  : 'delete' === e.type
                    ? [e.keys]
                    : e.values.length < 50
                      ? [[], e.values]
                      : [];
              const y = e.trans._cache;
              return o.mutate(e).then((e) => {
                if (r(f)) {
                  'delete' !== d && (f = e.results), c.addKeys(f);
                  const t = An(f, y);
                  t || 'add' === d || h.addKeys(f),
                    (t || p) &&
                      (function (e, t, n, i) {
                        t.indexes.forEach(function (t) {
                          const s = e(t.name || '');
                          function o(e) {
                            return null != e ? t.extractKey(e) : null;
                          }
                          const a = (e) =>
                            t.multiEntry && r(e)
                              ? e.forEach((e) => s.addKey(e))
                              : s.addKey(e);
                          (n || i).forEach((e, t) => {
                            const r = n && o(n[t]),
                              s = i && o(i[t]);
                            0 !== Tt(r, s) &&
                              (null != r && a(r), null != s && a(s));
                          });
                        });
                      })(u, a, t, p);
                } else if (f) {
                  const e = { from: f.lower, to: f.upper };
                  h.add(e), c.add(e);
                } else
                  c.add(i),
                    h.add(i),
                    a.indexes.forEach((e) => u(e.name).add(i));
                return e;
              });
            },
          },
          d = ({ query: { index: t, range: n } }) => {
            var r, i;
            return [
              t,
              new In(
                null !== (r = n.lower) && void 0 !== r ? r : e.MIN_KEY,
                null !== (i = n.upper) && void 0 !== i ? i : e.MAX_KEY,
              ),
            ];
          },
          f = {
            get: (e) => [l, new In(e.key)],
            getMany: (e) => [l, new In().addKeys(e.keys)],
            count: d,
            query: d,
            openCursor: d,
          };
        return (
          n(f).forEach((e) => {
            h[e] = function (n) {
              const { subscr: r } = Ke;
              if (r) {
                const a = (e) => {
                    const n = `idb://${t}/${s}/${e}`;
                    return r[n] || (r[n] = new In());
                  },
                  l = a(''),
                  h = a(':dels'),
                  [d, p] = f[e](n);
                if ((a(d.name || '').add(p), !d.isPrimaryKey)) {
                  if ('count' !== e) {
                    const t =
                      'query' === e &&
                      c &&
                      n.values &&
                      o.query({ ...n, values: !1 });
                    return o[e].apply(this, arguments).then((r) => {
                      if ('query' === e) {
                        if (c && n.values)
                          return t.then(({ result: e }) => (l.addKeys(e), r));
                        const e = n.values ? r.result.map(u) : r.result;
                        n.values ? l.addKeys(e) : h.addKeys(e);
                      } else if ('openCursor' === e) {
                        const e = r,
                          t = n.values;
                        return (
                          e &&
                          Object.create(e, {
                            key: { get: () => (h.addKey(e.primaryKey), e.key) },
                            primaryKey: {
                              get() {
                                const t = e.primaryKey;
                                return h.addKey(t), t;
                              },
                            },
                            value: {
                              get: () => (t && l.addKey(e.primaryKey), e.value),
                            },
                          })
                        );
                      }
                      return r;
                    });
                  }
                  h.add(i);
                }
              }
              return o[e].apply(this, arguments);
            };
          }),
          h
        );
      },
    };
  },
};
class qn {
  constructor(e, t) {
    (this._middlewares = {}), (this.verno = 0);
    const n = qn.dependencies;
    (this._options = t =
      {
        addons: qn.addons,
        autoOpen: !0,
        indexedDB: n.indexedDB,
        IDBKeyRange: n.IDBKeyRange,
        ...t,
      }),
      (this._deps = { indexedDB: t.indexedDB, IDBKeyRange: t.IDBKeyRange });
    const { addons: r } = t;
    (this._dbSchema = {}),
      (this._versions = []),
      (this._storeNames = []),
      (this._allTables = {}),
      (this.idbdb = null),
      (this._novip = this);
    const i = {
      dbOpenError: null,
      isBeingOpened: !1,
      onReadyBeingFired: null,
      openComplete: !1,
      dbReadyResolve: te,
      dbReadyPromise: null,
      cancelOpen: te,
      openCanceller: null,
      autoSchema: !0,
      PR1398_maxLoop: 3,
    };
    var s;
    (i.dbReadyPromise = new je((e) => {
      i.dbReadyResolve = e;
    })),
      (i.openCanceller = new je((e, t) => {
        i.cancelOpen = t;
      })),
      (this._state = i),
      (this.name = e),
      (this.on = Pt(this, 'populate', 'blocked', 'versionchange', 'close', {
        ready: [ue, te],
      })),
      (this.on.ready.subscribe = m(this.on.ready.subscribe, (e) => (t, n) => {
        qn.vip(() => {
          const r = this._state;
          if (r.openComplete) r.dbOpenError || je.resolve().then(t), n && e(t);
          else if (r.onReadyBeingFired) r.onReadyBeingFired.push(t), n && e(t);
          else {
            e(t);
            const r = this;
            n ||
              e(function e() {
                r.on.ready.unsubscribe(t), r.on.ready.unsubscribe(e);
              });
          }
        });
      })),
      (this.Collection =
        ((s = this),
        St(Ft.prototype, function (e, t) {
          this.db = s;
          let n = xt,
            r = null;
          if (t)
            try {
              n = t();
            } catch (e) {
              r = e;
            }
          const i = e._ctx,
            o = i.table,
            a = o.hook.reading.fire;
          this._ctx = {
            table: o,
            index: i.index,
            isPrimKey:
              !i.index ||
              (o.schema.primKey.keyPath && i.index === o.schema.primKey.name),
            range: n,
            keysOnly: !1,
            dir: 'next',
            unique: '',
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: !0,
            isMatch: null,
            offset: 0,
            limit: 1 / 0,
            error: r,
            or: i.or,
            valueMapper: a !== ne ? a : null,
          };
        }))),
      (this.Table = (function (e) {
        return St(Et.prototype, function (t, n, r) {
          (this.db = e),
            (this._tx = r),
            (this.name = t),
            (this.schema = n),
            (this.hook = e._allTables[t]
              ? e._allTables[t].hook
              : Pt(null, {
                  creating: [se, te],
                  reading: [re, ne],
                  updating: [ae, te],
                  deleting: [oe, te],
                }));
        });
      })(this)),
      (this.Transaction = (function (e) {
        return St(Xt.prototype, function (t, n, r, i, s) {
          (this.db = e),
            (this.mode = t),
            (this.storeNames = n),
            (this.schema = r),
            (this.chromeTransactionDurability = i),
            (this.idbtrans = null),
            (this.on = Pt(this, 'complete', 'error', 'abort')),
            (this.parent = s || null),
            (this.active = !0),
            (this._reculock = 0),
            (this._blockedFuncs = []),
            (this._resolve = null),
            (this._reject = null),
            (this._waitingFor = null),
            (this._waitingQueue = null),
            (this._spinCount = 0),
            (this._completion = new je((e, t) => {
              (this._resolve = e), (this._reject = t);
            })),
            this._completion.then(
              () => {
                (this.active = !1), this.on.complete.fire();
              },
              (e) => {
                var t = this.active;
                return (
                  (this.active = !1),
                  this.on.error.fire(e),
                  this.parent
                    ? this.parent._reject(e)
                    : t && this.idbtrans && this.idbtrans.abort(),
                  dt(e)
                );
              },
            );
        });
      })(this)),
      (this.Version = (function (e) {
        return St(vn.prototype, function (t) {
          (this.db = e),
            (this._cfg = {
              version: t,
              storesSource: null,
              dbschema: {},
              tables: {},
              contentUpgrade: null,
            });
        });
      })(this)),
      (this.WhereClause = (function (e) {
        return St(zt.prototype, function (t, n, r) {
          (this.db = e),
            (this._ctx = { table: t, index: ':id' === n ? null : n, or: r });
          const i = e._deps.indexedDB;
          if (!i) throw new J.MissingAPI();
          (this._cmp = this._ascending = i.cmp.bind(i)),
            (this._descending = (e, t) => i.cmp(t, e)),
            (this._max = (e, t) => (i.cmp(e, t) > 0 ? e : t)),
            (this._min = (e, t) => (i.cmp(e, t) < 0 ? e : t)),
            (this._IDBKeyRange = e._deps.IDBKeyRange);
        });
      })(this)),
      this.on('versionchange', (e) => {
        e.newVersion > 0
          ? console.warn(
              `Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`,
            )
          : console.warn(
              `Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`,
            ),
          this.close();
      }),
      this.on('blocked', (e) => {
        !e.newVersion || e.newVersion < e.oldVersion
          ? console.warn(`Dexie.delete('${this.name}') was blocked`)
          : console.warn(
              `Upgrade '${this.name}' blocked by other connection holding version ${e.oldVersion / 10}`,
            );
      }),
      (this._maxKey = tn(t.IDBKeyRange)),
      (this._createTransaction = (e, t, n, r) =>
        new this.Transaction(
          e,
          t,
          n,
          this._options.chromeTransactionDurability,
          r,
        )),
      (this._fireOnBlocked = (e) => {
        this.on('blocked').fire(e),
          mt
            .filter(
              (e) => e.name === this.name && e !== this && !e._state.vcFired,
            )
            .map((t) => t.on('versionchange').fire(e));
      }),
      this.use(Kn),
      this.use(Cn),
      this.use(Mn),
      this.use(jn),
      (this.vip = Object.create(this, { _vip: { value: !0 } })),
      r.forEach((e) => e(this));
  }
  version(e) {
    if (isNaN(e) || e < 0.1)
      throw new J.Type('Given version is not a positive number');
    if (
      ((e = Math.round(10 * e) / 10), this.idbdb || this._state.isBeingOpened)
    )
      throw new J.Schema('Cannot add version when database is open');
    this.verno = Math.max(this.verno, e);
    const t = this._versions;
    var n = t.filter((t) => t._cfg.version === e)[0];
    return (
      n ||
      ((n = new this.Version(e)),
      t.push(n),
      t.sort(hn),
      n.stores({}),
      (this._state.autoSchema = !1),
      n)
    );
  }
  _whenReady(e) {
    return this.idbdb &&
      (this._state.openComplete || Ke.letThrough || this._vip)
      ? e()
      : new je((e, t) => {
          if (this._state.openComplete)
            return t(new J.DatabaseClosed(this._state.dbOpenError));
          if (!this._state.isBeingOpened) {
            if (!this._options.autoOpen) return void t(new J.DatabaseClosed());
            this.open().catch(te);
          }
          this._state.dbReadyPromise.then(e, t);
        }).then(e);
  }
  use({ stack: e, create: t, level: n, name: r }) {
    r && this.unuse({ stack: e, name: r });
    const i = this._middlewares[e] || (this._middlewares[e] = []);
    return (
      i.push({ stack: e, create: t, level: null == n ? 10 : n, name: r }),
      i.sort((e, t) => e.level - t.level),
      this
    );
  }
  unuse({ stack: e, name: t, create: n }) {
    return (
      e &&
        this._middlewares[e] &&
        (this._middlewares[e] = this._middlewares[e].filter((e) =>
          n ? e.create !== n : !!t && e.name !== t,
        )),
      this
    );
  }
  open() {
    return (function (e) {
      const t = e._state,
        { indexedDB: r } = e._deps;
      if (t.isBeingOpened || e.idbdb)
        return t.dbReadyPromise.then(() =>
          t.dbOpenError ? dt(t.dbOpenError) : e,
        );
      F && (t.openCanceller._stackHolder = $()),
        (t.isBeingOpened = !0),
        (t.dbOpenError = null),
        (t.openComplete = !1);
      const i = t.openCanceller;
      function s() {
        if (t.openCanceller !== i)
          throw new J.DatabaseClosed('db.open() was cancelled');
      }
      let o = t.dbReadyResolve,
        a = null,
        l = !1;
      return je
        .race([
          i,
          ('undefined' == typeof navigator ? je.resolve() : xn()).then(
            () =>
              new je((i, o) => {
                if ((s(), !r)) throw new J.MissingAPI();
                const u = e.name,
                  c = t.autoSchema
                    ? r.open(u)
                    : r.open(u, Math.round(10 * e.verno));
                if (!c) throw new J.MissingAPI();
                (c.onerror = Gt(o)),
                  (c.onblocked = Ye(e._fireOnBlocked)),
                  (c.onupgradeneeded = Ye((n) => {
                    if (
                      ((a = c.transaction),
                      t.autoSchema && !e._options.allowEmptyDB)
                    ) {
                      (c.onerror = Ht), a.abort(), c.result.close();
                      const e = r.deleteDatabase(u);
                      e.onsuccess = e.onerror = Ye(() => {
                        o(new J.NoSuchDatabase(`Database ${u} doesnt exist`));
                      });
                    } else {
                      a.onerror = Gt(o);
                      var i = n.oldVersion > Math.pow(2, 62) ? 0 : n.oldVersion;
                      (l = i < 1),
                        (e._novip.idbdb = c.result),
                        dn(e, i / 10, a, o);
                    }
                  }, o)),
                  (c.onsuccess = Ye(() => {
                    a = null;
                    const r = (e._novip.idbdb = c.result),
                      s = y(r.objectStoreNames);
                    if (s.length > 0)
                      try {
                        const i = r.transaction(
                          1 === (o = s).length ? o[0] : o,
                          'readonly',
                        );
                        t.autoSchema
                          ? (function ({ _novip: e }, t, r) {
                              e.verno = t.version / 10;
                              const i = (e._dbSchema = mn(0, t, r));
                              (e._storeNames = y(t.objectStoreNames, 0)),
                                un(e, [e._allTables], n(i), i);
                            })(e, r, i)
                          : (gn(e, e._dbSchema, i),
                            (function (e, t) {
                              const n = fn(mn(0, e.idbdb, t), e._dbSchema);
                              return !(
                                n.add.length ||
                                n.change.some(
                                  (e) => e.add.length || e.change.length,
                                )
                              );
                            })(e, i) ||
                              console.warn(
                                'Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.',
                              )),
                          ln(e, i);
                      } catch (e) {}
                    var o;
                    mt.push(e),
                      (r.onversionchange = Ye((n) => {
                        (t.vcFired = !0), e.on('versionchange').fire(n);
                      })),
                      (r.onclose = Ye((t) => {
                        e.on('close').fire(t);
                      })),
                      l &&
                        (function ({ indexedDB: e, IDBKeyRange: t }, n) {
                          !_n(e) &&
                            '__dbnames' !== n &&
                            bn(e, t).put({ name: n }).catch(te);
                        })(e._deps, u),
                      i();
                  }, o));
              }),
          ),
        ])
        .then(
          () => (
            s(),
            (t.onReadyBeingFired = []),
            je.resolve(wn(() => e.on.ready.fire(e.vip))).then(function n() {
              if (t.onReadyBeingFired.length > 0) {
                let r = t.onReadyBeingFired.reduce(ue, te);
                return (
                  (t.onReadyBeingFired = []),
                  je.resolve(wn(() => r(e.vip))).then(n)
                );
              }
            })
          ),
        )
        .finally(() => {
          (t.onReadyBeingFired = null), (t.isBeingOpened = !1);
        })
        .then(() => e)
        .catch((n) => {
          t.dbOpenError = n;
          try {
            a && a.abort();
          } catch (e) {}
          return i === t.openCanceller && e._close(), dt(n);
        })
        .finally(() => {
          (t.openComplete = !0), o();
        });
    })(this);
  }
  _close() {
    const e = this._state,
      t = mt.indexOf(this);
    if ((t >= 0 && mt.splice(t, 1), this.idbdb)) {
      try {
        this.idbdb.close();
      } catch (e) {}
      this._novip.idbdb = null;
    }
    (e.dbReadyPromise = new je((t) => {
      e.dbReadyResolve = t;
    })),
      (e.openCanceller = new je((t, n) => {
        e.cancelOpen = n;
      }));
  }
  close() {
    this._close();
    const e = this._state;
    (this._options.autoOpen = !1),
      (e.dbOpenError = new J.DatabaseClosed()),
      e.isBeingOpened && e.cancelOpen(e.dbOpenError);
  }
  delete() {
    const e = arguments.length > 0,
      t = this._state;
    return new je((n, r) => {
      const i = () => {
        this.close();
        var e = this._deps.indexedDB.deleteDatabase(this.name);
        (e.onsuccess = Ye(() => {
          !(function ({ indexedDB: e, IDBKeyRange: t }, n) {
            !_n(e) && '__dbnames' !== n && bn(e, t).delete(n).catch(te);
          })(this._deps, this.name),
            n();
        })),
          (e.onerror = Gt(r)),
          (e.onblocked = this._fireOnBlocked);
      };
      if (e)
        throw new J.InvalidArgument('Arguments not allowed in db.delete()');
      t.isBeingOpened ? t.dbReadyPromise.then(i) : i();
    });
  }
  backendDB() {
    return this.idbdb;
  }
  isOpen() {
    return null !== this.idbdb;
  }
  hasBeenClosed() {
    const e = this._state.dbOpenError;
    return e && 'DatabaseClosed' === e.name;
  }
  hasFailed() {
    return null !== this._state.dbOpenError;
  }
  dynamicallyOpened() {
    return this._state.autoSchema;
  }
  get tables() {
    return n(this._allTables).map((e) => this._allTables[e]);
  }
  transaction() {
    const e = En.apply(this, arguments);
    return this._transaction.apply(this, e);
  }
  _transaction(e, t, n) {
    let r = Ke.trans;
    (r && r.db === this && -1 === e.indexOf('!')) || (r = null);
    const i = -1 !== e.indexOf('?');
    let s, o;
    e = e.replace('!', '').replace('?', '');
    try {
      if (
        ((o = t.map((e) => {
          var t = e instanceof this.Table ? e.name : e;
          if ('string' != typeof t)
            throw new TypeError(
              'Invalid table argument to Dexie.transaction(). Only Table or String are allowed',
            );
          return t;
        })),
        'r' == e || 'readonly' === e)
      )
        s = 'readonly';
      else {
        if ('rw' != e && 'readwrite' != e)
          throw new J.InvalidArgument('Invalid transaction mode: ' + e);
        s = 'readwrite';
      }
      if (r) {
        if ('readonly' === r.mode && 'readwrite' === s) {
          if (!i)
            throw new J.SubTransaction(
              'Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY',
            );
          r = null;
        }
        r &&
          o.forEach((e) => {
            if (r && -1 === r.storeNames.indexOf(e)) {
              if (!i)
                throw new J.SubTransaction(
                  'Table ' + e + ' not included in parent transaction.',
                );
              r = null;
            }
          }),
          i && r && !r.active && (r = null);
      }
    } catch (e) {
      return r
        ? r._promise(null, (t, n) => {
            n(e);
          })
        : dt(e);
    }
    const a = Pn.bind(null, this, s, o, r, n);
    return r
      ? r._promise(s, a, 'lock')
      : Ke.trans
        ? at(Ke.transless, () => this._whenReady(a))
        : this._whenReady(a);
  }
  table(e) {
    if (!a(this._allTables, e))
      throw new J.InvalidTable(`Table ${e} does not exist`);
    return this._allTables[e];
  }
}
const $n =
  'undefined' != typeof Symbol && 'observable' in Symbol
    ? Symbol.observable
    : '@@observable';
class Ln {
  constructor(e) {
    this._subscribe = e;
  }
  subscribe(e, t, n) {
    return this._subscribe(
      e && 'function' != typeof e ? e : { next: e, error: t, complete: n },
    );
  }
  [$n]() {
    return this;
  }
}
function Un(e, t) {
  return (
    n(t).forEach((n) => {
      Bn(e[n] || (e[n] = new In()), t[n]);
    }),
    e
  );
}
let Vn;
try {
  Vn = {
    indexedDB:
      t.indexedDB || t.mozIndexedDB || t.webkitIndexedDB || t.msIndexedDB,
    IDBKeyRange: t.IDBKeyRange || t.webkitIDBKeyRange,
  };
} catch (t) {
  Vn = { indexedDB: null, IDBKeyRange: null };
}
const Wn = qn;
function Yn(e) {
  let t = zn;
  try {
    (zn = !0), Qt.storagemutated.fire(e);
  } finally {
    zn = t;
  }
}
l(Wn, {
  ...ee,
  delete: (e) => new Wn(e, { addons: [] }).delete(),
  exists: (e) =>
    new Wn(e, { addons: [] })
      .open()
      .then((e) => (e.close(), !0))
      .catch('NoSuchDatabaseError', () => !1),
  getDatabaseNames(e) {
    try {
      return (function ({ indexedDB: e, IDBKeyRange: t }) {
        return _n(e)
          ? Promise.resolve(e.databases()).then((e) =>
              e.map((e) => e.name).filter((e) => '__dbnames' !== e),
            )
          : bn(e, t).toCollection().primaryKeys();
      })(Wn.dependencies).then(e);
    } catch (e) {
      return dt(new J.MissingAPI());
    }
  },
  defineClass: () =>
    function (e) {
      i(this, e);
    },
  ignoreTransaction: (e) => (Ke.trans ? at(Ke.transless, e) : e()),
  vip: wn,
  async: function (e) {
    return function () {
      try {
        var t = kn(e.apply(this, arguments));
        return t && 'function' == typeof t.then ? t : je.resolve(t);
      } catch (e) {
        return dt(e);
      }
    };
  },
  spawn: function (e, t, n) {
    try {
      var r = kn(e.apply(n, t || []));
      return r && 'function' == typeof r.then ? r : je.resolve(r);
    } catch (e) {
      return dt(e);
    }
  },
  currentTransaction: { get: () => Ke.trans || null },
  waitFor: function (e, t) {
    const n = je
      .resolve('function' == typeof e ? Wn.ignoreTransaction(e) : e)
      .timeout(t || 6e4);
    return Ke.trans ? Ke.trans.waitFor(n) : n;
  },
  Promise: je,
  debug: {
    get: () => F,
    set: (e) => {
      N(e, 'dexie' === e ? () => !0 : _t);
    },
  },
  derive: h,
  extend: i,
  props: l,
  override: m,
  Events: Pt,
  on: Qt,
  liveQuery: function (e) {
    return new Ln((t) => {
      const r = R(e);
      let i = !1,
        s = {},
        o = {};
      const a = {
        get closed() {
          return i;
        },
        unsubscribe: () => {
          (i = !0), Qt.storagemutated.unsubscribe(h);
        },
      };
      t.start && t.start(a);
      let l = !1,
        u = !1;
      function c() {
        return n(o).some(
          (e) =>
            s[e] &&
            (function (e, t) {
              const n = Rn(t);
              let r = n.next();
              if (r.done) return !1;
              let i = r.value;
              const s = Rn(e);
              let o = s.next(i.from),
                a = o.value;
              for (; !r.done && !o.done; ) {
                if (Tt(a.from, i.to) <= 0 && Tt(a.to, i.from) >= 0) return !0;
                Tt(i.from, a.from) < 0
                  ? (i = (r = n.next(a.from)).value)
                  : (a = (o = s.next(i.from)).value);
              }
              return !1;
            })(s[e], o[e]),
        );
      }
      const h = (e) => {
          Un(s, e), c() && d();
        },
        d = () => {
          if (l || i) return;
          s = {};
          const n = {},
            f = (function (t) {
              r && et();
              const n = () => Ze(e, { subscr: t, trans: null }),
                i = Ke.trans ? at(Ke.transless, n) : n();
              return r && i.then(tt, tt), i;
            })(n);
          u || (Qt('storagemutated', h), (u = !0)),
            (l = !0),
            Promise.resolve(f).then(
              (e) => {
                (l = !1),
                  i || (c() ? d() : ((s = {}), (o = n), t.next && t.next(e)));
              },
              (e) => {
                (l = !1), t.error && t.error(e), a.unsubscribe();
              },
            );
        };
      return d(), a;
    });
  },
  extendObservabilitySet: Un,
  getByKeyPath: _,
  setByKeyPath: w,
  delByKeyPath: function (e, t) {
    'string' == typeof t
      ? w(e, t, void 0)
      : 'length' in t &&
        [].map.call(t, function (t) {
          w(e, t, void 0);
        });
  },
  shallowClone: x,
  deepClone: O,
  getObjectDiff: On,
  cmp: Tt,
  asap: v,
  minKey: -1 / 0,
  addons: [],
  connections: mt,
  errnames: Q,
  dependencies: Vn,
  semVer: '3.2.3',
  version: '3.2.3'
    .split('.')
    .map((e) => parseInt(e))
    .reduce((e, t, n) => e + t / Math.pow(10, 2 * n)),
}),
  (Wn.maxKey = tn(Wn.dependencies.IDBKeyRange)),
  'undefined' != typeof dispatchEvent &&
    'undefined' != typeof addEventListener &&
    (Qt('storagemutated', (e) => {
      if (!zn) {
        let t;
        gt
          ? ((t = document.createEvent('CustomEvent')),
            t.initCustomEvent('x-storagemutated-1', !0, !0, e))
          : (t = new CustomEvent('x-storagemutated-1', { detail: e })),
          (zn = !0),
          dispatchEvent(t),
          (zn = !1);
      }
    }),
    addEventListener('x-storagemutated-1', ({ detail: e }) => {
      zn || Yn(e);
    }));
let zn = !1;
if ('undefined' != typeof BroadcastChannel) {
  const e = new BroadcastChannel('x-storagemutated-1');
  'function' == typeof e.unref && e.unref(),
    Qt('storagemutated', (t) => {
      zn || e.postMessage(t);
    }),
    (e.onmessage = (e) => {
      e.data && Yn(e.data);
    });
} else if ('undefined' != typeof self && 'undefined' != typeof navigator) {
  Qt('storagemutated', (e) => {
    try {
      zn ||
        ('undefined' != typeof localStorage &&
          localStorage.setItem(
            'x-storagemutated-1',
            JSON.stringify({ trig: Math.random(), changedParts: e }),
          ),
        'object' == typeof self.clients &&
          [...self.clients.matchAll({ includeUncontrolled: !0 })].forEach((t) =>
            t.postMessage({ type: 'x-storagemutated-1', changedParts: e }),
          ));
    } catch (e) {}
  }),
    'undefined' != typeof addEventListener &&
      addEventListener('storage', (e) => {
        if ('x-storagemutated-1' === e.key) {
          const t = JSON.parse(e.newValue);
          t && Yn(t.changedParts);
        }
      });
  const e = self.document && navigator.serviceWorker;
  e &&
    e.addEventListener('message', function ({ data: e }) {
      e && 'x-storagemutated-1' === e.type && Yn(e.changedParts);
    });
}
(je.rejectionMapper = function (e, t) {
  if (
    !e ||
    e instanceof Y ||
    e instanceof TypeError ||
    e instanceof SyntaxError ||
    !e.name ||
    !Z[e.name]
  )
    return e;
  var n = new Z[e.name](t || e.message, e);
  return (
    'stack' in e &&
      c(n, 'stack', {
        get: function () {
          return this.inner.stack;
        },
      }),
    n
  );
}),
  N(F, _t);
const Gn = (e, t) => {
  const n = new qn(e);
  return n.version(1).stores(t), n.open(), n;
};
let Hn = Gn('myDb', { list: '++id, container' });
const Qn = () => {
    Hn.delete(),
      (Hn = Gn('myDb', { list: '++id, container' })),
      Hn.open(),
      console.log('DB deleted');
  },
  Xn = ['submit', 'reset', 'hidden', 'password'],
  Jn = ['privacy policy'],
  Zn = ['captcha'];
async function er(t, n, r, i) {
  if (!t || !t.elements || !n) return;
  let s = '';
  'object' == typeof t.name
    ? t.id && (s = t.id)
    : 'string' == typeof t.name && (s = t.name);
  const o = new FormData(),
    a = {
      entryPoint: document.location.href,
      title: document.title,
      formName: s,
    },
    l = [...t.elements];
  let u = !0;
  if (
    (l.forEach((e, t) => {
      if (Xn.includes(e.type)) return;
      let n = (function (e, t) {
          const { id: n, name: r, type: i } = e;
          if ('email' === i) return 'email';
          if ('tel' === i) return 'phone';
          if (n && n.includes('wpforms')) {
            const e = document.querySelectorAll("label[for='" + n + "']");
            if (e && e.length >= 1) {
              const [t] = e;
              return t.innerText || n;
            }
          }
          if (n) {
            const e = document.querySelectorAll("label[for='" + n + "']");
            if (e && e.length >= 1) {
              const [t] = e,
                n = t.innerText;
              if (n) return n.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            }
          }
          if (r) return r;
          if (!n) return `label-${t}`;
          if (n) return n;
          const s = document.querySelectorAll("label[for='" + n + "']");
          if (s && s.length >= 1) {
            const [e] = s;
            return e.innerText || r;
          }
          return `label-${t}`;
        })(e, t),
        r = !1;
      if (
        (Zn.forEach((e) => {
          n.toLowerCase().includes(e) && (r = !0);
        }),
        r)
      )
        return;
      if (Zn.includes(n)) return;
      const i = Jn.find((e) => n.includes(e));
      var s;
      if (!i)
        if (
          e &&
          (e.required || e.ariaRequired) &&
          e.validity &&
          !e.validity.valid
        )
          u = !1;
        else if (
          n &&
          ['radio', 'checkbox'].includes(e.type) &&
          e.checked &&
          e.value
        )
          a[n] = e.value;
        else if (
          n &&
          !['radio', 'checkbox', 'file'].includes(e.type) &&
          e.value
        )
          n in a
            ? ((e, t, n, r, i) => {
                'email' == r.type && n[e]
                  ? r.name
                    ? (n[r.name] = t)
                    : (n[`email ${i}`] = t)
                  : 'tel' == r.type && n[e]
                    ? r.name
                      ? (n[r.name] = t)
                      : (n[`phone ${i}`] = t)
                    : (n[e] = `${n[e]}/${t.replace(/[\\'\"]/gi, '')}`);
              })(n, e.value, a, e, t)
            : (a[n] = e.value.replace(/[\\'\"]/gi, ''));
        else if (n && ['file'].includes(e.type))
          for (var l = 0; l < e.files.length; l++)
            o.append('files', e.files[l]),
              (s = { container: e.files[l] }),
              ((e, t) => {
                e.bulkAdd([t]);
              })(Hn.list, s),
              console.log('data added succesfully');
    }),
    !u)
  )
    return;
  o.append('eb_form_id', r),
    o.append('localhost', !1),
    o.append('connected_channel_id', n),
    o.append('data', JSON.stringify(a));
  let c = { connected_channel_id: n, eb_form_id: r, data: a };
  const h = JSON.stringify(c);
  window.localStorage.setItem(e(n), h),
    setTimeout(async () => {
      try {
        await fetch('https://api.boxly.ai/api/webforms/webform_webhook', {
          method: 'POST',
          body: o,
        })
          .then(() => {
            window.localStorage.removeItem(e(n)), Qn();
          })
          .catch(() => {
            window.localStorage.setItem(e(n), h);
          });
      } catch (t) {
        window.localStorage.setItem(e(n), h), console.log(t);
      }
    }, 3e3);
}
const tr = async (t) => {
  if (!t) return void console.log('page reload channel id not found');
  const n = new FormData();
  let r = window.localStorage.getItem(e(t));
  const i = (t = [], i) => {
    const s = JSON.parse(r);
    n.append('localhost', !0),
      n.append('connected_channel_id', s.connected_channel_id),
      n.append('eb_form_id', s.eb_form_id),
      n.append('data', JSON.stringify(s.data)),
      t.length > 0 &&
        t.forEach((e) => {
          n.append('files', e);
        });
    try {
      fetch('https://api.boxly.ai/api/webforms/webform_webhook', {
        method: 'POST',
        body: n,
      })
        .then(() => {
          window.localStorage.removeItem(e(s.connected_channel_id)), Qn();
        })
        .catch((e) => (console.log(e), e));
    } catch (e) {
      return console.log(err), e;
    }
  };
  try {
    if (Hn) {
      console.log(Hn);
      var s = 0,
        o = !1;
      Hn.list.count((e) => {
        console.log(e),
          ((e) => {
            if (e) {
              s = 1;
              let e = [];
              Hn.list.each((t) => {
                console.log(t), e.push(t.container);
              }),
                setTimeout(() => {
                  r && ((o = !0), i(e));
                }, 50);
            }
          })(e);
      }),
        setTimeout(() => {
          0 == s && (o || (r && i([])));
        }, 100);
    }
  } catch (e) {
    console.log(e);
  }
};
((e) => {
  function t() {
    setTimeout(function () {
      n(),
        setTimeout(() => {
          tr(
            e.dataset.connectedChannelId ||
              'fbb7a62e-bcb0-473c-b503-5c57ac4534af',
          );
        }, 1e3);
    }, 200);
  }
  'complete' == document.readyState
    ? t()
    : document.addEventListener('DOMContentLoaded', function () {
        console.log('dom loaded'), t();
      });
  const n = () => {
    let t = document.getElementsByTagName('form');
    t = [...t];
    const n =
      e.dataset.connectedChannelId || 'fbb7a62e-bcb0-473c-b503-5c57ac4534af';
    if (n)
      for (var r = 0; r < t.length; r++) {
        const e = t[r];
        if (e.className?.includes('whatsapp-chaty-form')) return;
        const i = [...e.elements],
          s = n + '-' + r;
        i.forEach((t) => {
          if (
            'submit' === t.type ||
            ('button' === t.type &&
              ['submit', 'contact us'].includes(
                t.value.toLowerCase() || t.innerHTML.toLowerCase(),
              ))
          ) {
            if ('submit' === t.type && t.name.includes('update_privacy'))
              return;
            t.addEventListener(
              'click',
              (t) => {
                t.target && er(e, n, s);
              },
              { capture: !0 },
            );
          }
        });
      }
    else console.log('connectedChannelId not found');
  };
})(document.currentScript);
