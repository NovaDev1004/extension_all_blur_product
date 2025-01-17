(window.webpackJsonp = window.webpackJsonp || []).push([
    [1], {
        0: function(t, e, n) {
            t.exports = n("zUnb")
        },
        zUnb: function(t, e, n) {
            "use strict";

            function i(t) {
                return "function" == typeof t
            }
            n.r(e);
            let s = !1;
            const r = {
                Promise: void 0,
                set useDeprecatedSynchronousErrorHandling(t) {
                    if (t) {
                        const t = new Error;
                        console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + t.stack)
                    } else s && console.log("RxJS: Back to a better error behavior. Thank you. <3");
                    s = t
                },
                get useDeprecatedSynchronousErrorHandling() {
                    return s
                }
            };

            function o(t) {
                setTimeout(() => {
                    throw t
                }, 0)
            }
            const a = {
                    closed: !0,
                    next(t) {},
                    error(t) {
                        if (r.useDeprecatedSynchronousErrorHandling) throw t;
                        o(t)
                    },
                    complete() {}
                },
                l = (() => Array.isArray || (t => t && "number" == typeof t.length))();

            function c(t) {
                return null !== t && "object" == typeof t
            }
            const h = (() => {
                function t(t) {
                    return Error.call(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((t,e)=>`${e+1}) ${t.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t, this
                }
                return t.prototype = Object.create(Error.prototype), t
            })();
            let u = (() => {
                class t {
                    constructor(t) {
                        this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._ctorUnsubscribe = !0, this._unsubscribe = t)
                    }
                    unsubscribe() {
                        let e;
                        if (this.closed) return;
                        let {
                            _parentOrParents: n,
                            _ctorUnsubscribe: s,
                            _unsubscribe: r,
                            _subscriptions: o
                        } = this;
                        if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, n instanceof t) n.remove(this);
                        else if (null !== n)
                            for (let t = 0; t < n.length; ++t) n[t].remove(this);
                        if (i(r)) {
                            s && (this._unsubscribe = void 0);
                            try {
                                r.call(this)
                            } catch (a) {
                                e = a instanceof h ? d(a.errors) : [a]
                            }
                        }
                        if (l(o)) {
                            let t = -1,
                                n = o.length;
                            for (; ++t < n;) {
                                const n = o[t];
                                if (c(n)) try {
                                    n.unsubscribe()
                                } catch (a) {
                                    e = e || [], a instanceof h ? e = e.concat(d(a.errors)) : e.push(a)
                                }
                            }
                        }
                        if (e) throw new h(e)
                    }
                    add(e) {
                        let n = e;
                        if (!e) return t.EMPTY;
                        switch (typeof e) {
                            case "function":
                                n = new t(e);
                            case "object":
                                if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
                                if (this.closed) return n.unsubscribe(), n;
                                if (!(n instanceof t)) {
                                    const e = n;
                                    n = new t, n._subscriptions = [e]
                                }
                                break;
                            default:
                                throw new Error("unrecognized teardown " + e + " added to Subscription.")
                        }
                        let {
                            _parentOrParents: i
                        } = n;
                        if (null === i) n._parentOrParents = this;
                        else if (i instanceof t) {
                            if (i === this) return n;
                            n._parentOrParents = [i, this]
                        } else {
                            if (-1 !== i.indexOf(this)) return n;
                            i.push(this)
                        }
                        const s = this._subscriptions;
                        return null === s ? this._subscriptions = [n] : s.push(n), n
                    }
                    remove(t) {
                        const e = this._subscriptions;
                        if (e) {
                            const n = e.indexOf(t); - 1 !== n && e.splice(n, 1)
                        }
                    }
                }
                return t.EMPTY = function(t) {
                    return t.closed = !0, t
                }(new t), t
            })();

            function d(t) {
                return t.reduce((t, e) => t.concat(e instanceof h ? e.errors : e), [])
            }
            const p = (() => "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random())();
            class f extends u {
                constructor(t, e, n) {
                    switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
                        case 0:
                            this.destination = a;
                            break;
                        case 1:
                            if (!t) {
                                this.destination = a;
                                break
                            }
                            if ("object" == typeof t) {
                                t instanceof f ? (this.syncErrorThrowable = t.syncErrorThrowable, this.destination = t, t.add(this)) : (this.syncErrorThrowable = !0, this.destination = new m(this, t));
                                break
                            }
                        default:
                            this.syncErrorThrowable = !0, this.destination = new m(this, t, e, n)
                    }
                } [p]() {
                    return this
                }
                static create(t, e, n) {
                    const i = new f(t, e, n);
                    return i.syncErrorThrowable = !1, i
                }
                next(t) {
                    this.isStopped || this._next(t)
                }
                error(t) {
                    this.isStopped || (this.isStopped = !0, this._error(t))
                }
                complete() {
                    this.isStopped || (this.isStopped = !0, this._complete())
                }
                unsubscribe() {
                    this.closed || (this.isStopped = !0, super.unsubscribe())
                }
                _next(t) {
                    this.destination.next(t)
                }
                _error(t) {
                    this.destination.error(t), this.unsubscribe()
                }
                _complete() {
                    this.destination.complete(), this.unsubscribe()
                }
                _unsubscribeAndRecycle() {
                    const {
                        _parentOrParents: t
                    } = this;
                    return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this
                }
            }
            class m extends f {
                constructor(t, e, n, s) {
                    let r;
                    super(), this._parentSubscriber = t;
                    let o = this;
                    i(e) ? r = e : e && (r = e.next, n = e.error, s = e.complete, e !== a && (o = Object.create(e), i(o.unsubscribe) && this.add(o.unsubscribe.bind(o)), o.unsubscribe = this.unsubscribe.bind(this))), this._context = o, this._next = r, this._error = n, this._complete = s
                }
                next(t) {
                    if (!this.isStopped && this._next) {
                        const {
                            _parentSubscriber: e
                        } = this;
                        r.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
                    }
                }
                error(t) {
                    if (!this.isStopped) {
                        const {
                            _parentSubscriber: e
                        } = this, {
                            useDeprecatedSynchronousErrorHandling: n
                        } = r;
                        if (this._error) n && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                        else if (e.syncErrorThrowable) n ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : o(t), this.unsubscribe();
                        else {
                            if (this.unsubscribe(), n) throw t;
                            o(t)
                        }
                    }
                }
                complete() {
                    if (!this.isStopped) {
                        const {
                            _parentSubscriber: t
                        } = this;
                        if (this._complete) {
                            const e = () => this._complete.call(this._context);
                            r.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, e), this.unsubscribe()) : (this.__tryOrUnsub(e), this.unsubscribe())
                        } else this.unsubscribe()
                    }
                }
                __tryOrUnsub(t, e) {
                    try {
                        t.call(this._context, e)
                    } catch (n) {
                        if (this.unsubscribe(), r.useDeprecatedSynchronousErrorHandling) throw n;
                        o(n)
                    }
                }
                __tryOrSetError(t, e, n) {
                    if (!r.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                    try {
                        e.call(this._context, n)
                    } catch (i) {
                        return r.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = i, t.syncErrorThrown = !0, !0) : (o(i), !0)
                    }
                    return !1
                }
                _unsubscribe() {
                    const {
                        _parentSubscriber: t
                    } = this;
                    this._context = null, this._parentSubscriber = null, t.unsubscribe()
                }
            }
            const g = (() => "function" == typeof Symbol && Symbol.observable || "@@observable")();

            function _(t) {
                return t
            }
            let y = (() => {
                class t {
                    constructor(t) {
                        this._isScalar = !1, t && (this._subscribe = t)
                    }
                    lift(e) {
                        const n = new t;
                        return n.source = this, n.operator = e, n
                    }
                    subscribe(t, e, n) {
                        const {
                            operator: i
                        } = this, s = function(t, e, n) {
                            if (t) {
                                if (t instanceof f) return t;
                                if (t[p]) return t[p]()
                            }
                            return t || e || n ? new f(t, e, n) : new f(a)
                        }(t, e, n);
                        if (s.add(i ? i.call(s, this.source) : this.source || r.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable ? this._subscribe(s) : this._trySubscribe(s)), r.useDeprecatedSynchronousErrorHandling && s.syncErrorThrowable && (s.syncErrorThrowable = !1, s.syncErrorThrown)) throw s.syncErrorValue;
                        return s
                    }
                    _trySubscribe(t) {
                        try {
                            return this._subscribe(t)
                        } catch (e) {
                            r.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e),
                                function(t) {
                                    for (; t;) {
                                        const {
                                            closed: e,
                                            destination: n,
                                            isStopped: i
                                        } = t;
                                        if (e || i) return !1;
                                        t = n && n instanceof f ? n : null
                                    }
                                    return !0
                                }(t) ? t.error(e) : console.warn(e)
                        }
                    }
                    forEach(t, e) {
                        return new(e = b(e))((e, n) => {
                            let i;
                            i = this.subscribe(e => {
                                try {
                                    t(e)
                                } catch (s) {
                                    n(s), i && i.unsubscribe()
                                }
                            }, n, e)
                        })
                    }
                    _subscribe(t) {
                        const {
                            source: e
                        } = this;
                        return e && e.subscribe(t)
                    } [g]() {
                        return this
                    }
                    pipe(...t) {
                        return 0 === t.length ? this : (0 === (e = t).length ? _ : 1 === e.length ? e[0] : function(t) {
                            return e.reduce((t, e) => e(t), t)
                        })(this);
                        var e
                    }
                    toPromise(t) {
                        return new(t = b(t))((t, e) => {
                            let n;
                            this.subscribe(t => n = t, t => e(t), () => t(n))
                        })
                    }
                }
                return t.create = e => new t(e), t
            })();

            function b(t) {
                if (t || (t = r.Promise || Promise), !t) throw new Error("no Promise impl found");
                return t
            }
            const v = (() => {
                function t() {
                    return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
                }
                return t.prototype = Object.create(Error.prototype), t
            })();
            class w extends u {
                constructor(t, e) {
                    super(), this.subject = t, this.subscriber = e, this.closed = !1
                }
                unsubscribe() {
                    if (this.closed) return;
                    this.closed = !0;
                    const t = this.subject,
                        e = t.observers;
                    if (this.subject = null, !e || 0 === e.length || t.isStopped || t.closed) return;
                    const n = e.indexOf(this.subscriber); - 1 !== n && e.splice(n, 1)
                }
            }
            class C extends f {
                constructor(t) {
                    super(t), this.destination = t
                }
            }
            let x = (() => {
                class t extends y {
                    constructor() {
                        super(), this.observers = [], this.closed = !1, this.isStopped = !1, this.hasError = !1, this.thrownError = null
                    } [p]() {
                        return new C(this)
                    }
                    lift(t) {
                        const e = new E(this, this);
                        return e.operator = t, e
                    }
                    next(t) {
                        if (this.closed) throw new v;
                        if (!this.isStopped) {
                            const {
                                observers: e
                            } = this, n = e.length, i = e.slice();
                            for (let s = 0; s < n; s++) i[s].next(t)
                        }
                    }
                    error(t) {
                        if (this.closed) throw new v;
                        this.hasError = !0, this.thrownError = t, this.isStopped = !0;
                        const {
                            observers: e
                        } = this, n = e.length, i = e.slice();
                        for (let s = 0; s < n; s++) i[s].error(t);
                        this.observers.length = 0
                    }
                    complete() {
                        if (this.closed) throw new v;
                        this.isStopped = !0;
                        const {
                            observers: t
                        } = this, e = t.length, n = t.slice();
                        for (let i = 0; i < e; i++) n[i].complete();
                        this.observers.length = 0
                    }
                    unsubscribe() {
                        this.isStopped = !0, this.closed = !0, this.observers = null
                    }
                    _trySubscribe(t) {
                        if (this.closed) throw new v;
                        return super._trySubscribe(t)
                    }
                    _subscribe(t) {
                        if (this.closed) throw new v;
                        return this.hasError ? (t.error(this.thrownError), u.EMPTY) : this.isStopped ? (t.complete(), u.EMPTY) : (this.observers.push(t), new w(this, t))
                    }
                    asObservable() {
                        const t = new y;
                        return t.source = this, t
                    }
                }
                return t.create = (t, e) => new E(t, e), t
            })();
            class E extends x {
                constructor(t, e) {
                    super(), this.destination = t, this.source = e
                }
                next(t) {
                    const {
                        destination: e
                    } = this;
                    e && e.next && e.next(t)
                }
                error(t) {
                    const {
                        destination: e
                    } = this;
                    e && e.error && this.destination.error(t)
                }
                complete() {
                    const {
                        destination: t
                    } = this;
                    t && t.complete && this.destination.complete()
                }
                _subscribe(t) {
                    const {
                        source: e
                    } = this;
                    return e ? this.source.subscribe(t) : u.EMPTY
                }
            }

            function S(t) {
                return t && "function" == typeof t.schedule
            }

            function k(t, e) {
                return function(n) {
                    if ("function" != typeof t) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                    return n.lift(new T(t, e))
                }
            }
            class T {
                constructor(t, e) {
                    this.project = t, this.thisArg = e
                }
                call(t, e) {
                    return e.subscribe(new A(t, this.project, this.thisArg))
                }
            }
            class A extends f {
                constructor(t, e, n) {
                    super(t), this.project = e, this.count = 0, this.thisArg = n || this
                }
                _next(t) {
                    let e;
                    try {
                        e = this.project.call(this.thisArg, t, this.count++)
                    } catch (n) {
                        return void this.destination.error(n)
                    }
                    this.destination.next(e)
                }
            }
            const D = t => e => {
                for (let n = 0, i = t.length; n < i && !e.closed; n++) e.next(t[n]);
                e.complete()
            };

            function R() {
                return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
            }
            const I = R(),
                O = t => t && "number" == typeof t.length && "function" != typeof t;

            function P(t) {
                return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
            }
            const F = t => {
                if (t && "function" == typeof t[g]) return i = t, t => {
                    const e = i[g]();
                    if ("function" != typeof e.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                    return e.subscribe(t)
                };
                if (O(t)) return D(t);
                if (P(t)) return n = t, t => (n.then(e => {
                    t.closed || (t.next(e), t.complete())
                }, e => t.error(e)).then(null, o), t);
                if (t && "function" == typeof t[I]) return e = t, t => {
                    const n = e[I]();
                    for (;;) {
                        let e;
                        try {
                            e = n.next()
                        } catch (i) {
                            return t.error(i), t
                        }
                        if (e.done) {
                            t.complete();
                            break
                        }
                        if (t.next(e.value), t.closed) break
                    }
                    return "function" == typeof n.return && t.add(() => {
                        n.return && n.return()
                    }), t
                };
                {
                    const e = c(t) ? "an invalid object" : `'${t}'`;
                    throw new TypeError(`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)
                }
                var e, n, i
            };

            function L(t, e) {
                return new y(n => {
                    const i = new u;
                    let s = 0;
                    return i.add(e.schedule(function() {
                        s !== t.length ? (n.next(t[s++]), n.closed || i.add(this.schedule())) : n.complete()
                    })), i
                })
            }

            function N(t, e) {
                return e ? function(t, e) {
                    if (null != t) {
                        if (function(t) {
                                return t && "function" == typeof t[g]
                            }(t)) return function(t, e) {
                            return new y(n => {
                                const i = new u;
                                return i.add(e.schedule(() => {
                                    const s = t[g]();
                                    i.add(s.subscribe({
                                        next(t) {
                                            i.add(e.schedule(() => n.next(t)))
                                        },
                                        error(t) {
                                            i.add(e.schedule(() => n.error(t)))
                                        },
                                        complete() {
                                            i.add(e.schedule(() => n.complete()))
                                        }
                                    }))
                                })), i
                            })
                        }(t, e);
                        if (P(t)) return function(t, e) {
                            return new y(n => {
                                const i = new u;
                                return i.add(e.schedule(() => t.then(t => {
                                    i.add(e.schedule(() => {
                                        n.next(t), i.add(e.schedule(() => n.complete()))
                                    }))
                                }, t => {
                                    i.add(e.schedule(() => n.error(t)))
                                }))), i
                            })
                        }(t, e);
                        if (O(t)) return L(t, e);
                        if (function(t) {
                                return t && "function" == typeof t[I]
                            }(t) || "string" == typeof t) return function(t, e) {
                            if (!t) throw new Error("Iterable cannot be null");
                            return new y(n => {
                                const i = new u;
                                let s;
                                return i.add(() => {
                                    s && "function" == typeof s.return && s.return()
                                }), i.add(e.schedule(() => {
                                    s = t[I](), i.add(e.schedule(function() {
                                        if (n.closed) return;
                                        let t, e;
                                        try {
                                            const n = s.next();
                                            t = n.value, e = n.done
                                        } catch (i) {
                                            return void n.error(i)
                                        }
                                        e ? n.complete() : (n.next(t), this.schedule())
                                    }))
                                })), i
                            })
                        }(t, e)
                    }
                    throw new TypeError((null !== t && typeof t || t) + " is not observable")
                }(t, e) : t instanceof y ? t : new y(F(t))
            }
            class M extends f {
                constructor(t) {
                    super(), this.parent = t
                }
                _next(t) {
                    this.parent.notifyNext(t)
                }
                _error(t) {
                    this.parent.notifyError(t), this.unsubscribe()
                }
                _complete() {
                    this.parent.notifyComplete(), this.unsubscribe()
                }
            }
            class V extends f {
                notifyNext(t) {
                    this.destination.next(t)
                }
                notifyError(t) {
                    this.destination.error(t)
                }
                notifyComplete() {
                    this.destination.complete()
                }
            }

            function j(t, e) {
                if (e.closed) return;
                if (t instanceof y) return t.subscribe(e);
                let n;
                try {
                    n = F(t)(e)
                } catch (i) {
                    e.error(i)
                }
                return n
            }

            function B(t, e, n = Number.POSITIVE_INFINITY) {
                return "function" == typeof e ? i => i.pipe(B((n, i) => N(t(n, i)).pipe(k((t, s) => e(n, t, i, s))), n)) : ("number" == typeof e && (n = e), e => e.lift(new H(t, n)))
            }
            class H {
                constructor(t, e = Number.POSITIVE_INFINITY) {
                    this.project = t, this.concurrent = e
                }
                call(t, e) {
                    return e.subscribe(new z(t, this.project, this.concurrent))
                }
            }
            class z extends V {
                constructor(t, e, n = Number.POSITIVE_INFINITY) {
                    super(t), this.project = e, this.concurrent = n, this.hasCompleted = !1, this.buffer = [], this.active = 0, this.index = 0
                }
                _next(t) {
                    this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
                }
                _tryNext(t) {
                    let e;
                    const n = this.index++;
                    try {
                        e = this.project(t, n)
                    } catch (i) {
                        return void this.destination.error(i)
                    }
                    this.active++, this._innerSub(e)
                }
                _innerSub(t) {
                    const e = new M(this),
                        n = this.destination;
                    n.add(e);
                    const i = j(t, e);
                    i !== e && n.add(i)
                }
                _complete() {
                    this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
                }
                notifyNext(t) {
                    this.destination.next(t)
                }
                notifyComplete() {
                    const t = this.buffer;
                    this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
                }
            }

            function q(t = Number.POSITIVE_INFINITY) {
                return B(_, t)
            }

            function U(t, e) {
                return e ? L(t, e) : new y(D(t))
            }

            function $(...t) {
                let e = Number.POSITIVE_INFINITY,
                    n = null,
                    i = t[t.length - 1];
                return S(i) ? (n = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (e = t.pop())) : "number" == typeof i && (e = t.pop()), null === n && 1 === t.length && t[0] instanceof y ? t[0] : q(e)(U(t, n))
            }

            function W() {
                return function(t) {
                    return t.lift(new Z(t))
                }
            }
            class Z {
                constructor(t) {
                    this.connectable = t
                }
                call(t, e) {
                    const {
                        connectable: n
                    } = this;
                    n._refCount++;
                    const i = new Q(t, n),
                        s = e.subscribe(i);
                    return i.closed || (i.connection = n.connect()), s
                }
            }
            class Q extends f {
                constructor(t, e) {
                    super(t), this.connectable = e
                }
                _unsubscribe() {
                    const {
                        connectable: t
                    } = this;
                    if (!t) return void(this.connection = null);
                    this.connectable = null;
                    const e = t._refCount;
                    if (e <= 0) return void(this.connection = null);
                    if (t._refCount = e - 1, e > 1) return void(this.connection = null);
                    const {
                        connection: n
                    } = this, i = t._connection;
                    this.connection = null, !i || n && i !== n || i.unsubscribe()
                }
            }
            class K extends y {
                constructor(t, e) {
                    super(), this.source = t, this.subjectFactory = e, this._refCount = 0, this._isComplete = !1
                }
                _subscribe(t) {
                    return this.getSubject().subscribe(t)
                }
                getSubject() {
                    const t = this._subject;
                    return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject
                }
                connect() {
                    let t = this._connection;
                    return t || (this._isComplete = !1, t = this._connection = new u, t.add(this.source.subscribe(new Y(this.getSubject(), this))), t.closed && (this._connection = null, t = u.EMPTY)), t
                }
                refCount() {
                    return W()(this)
                }
            }
            const G = (() => {
                const t = K.prototype;
                return {
                    operator: {
                        value: null
                    },
                    _refCount: {
                        value: 0,
                        writable: !0
                    },
                    _subject: {
                        value: null,
                        writable: !0
                    },
                    _connection: {
                        value: null,
                        writable: !0
                    },
                    _subscribe: {
                        value: t._subscribe
                    },
                    _isComplete: {
                        value: t._isComplete,
                        writable: !0
                    },
                    getSubject: {
                        value: t.getSubject
                    },
                    connect: {
                        value: t.connect
                    },
                    refCount: {
                        value: t.refCount
                    }
                }
            })();
            class Y extends C {
                constructor(t, e) {
                    super(t), this.connectable = e
                }
                _error(t) {
                    this._unsubscribe(), super._error(t)
                }
                _complete() {
                    this.connectable._isComplete = !0, this._unsubscribe(), super._complete()
                }
                _unsubscribe() {
                    const t = this.connectable;
                    if (t) {
                        this.connectable = null;
                        const e = t._connection;
                        t._refCount = 0, t._subject = null, t._connection = null, e && e.unsubscribe()
                    }
                }
            }

            function X() {
                return new x
            }

            function J() {
                return t => {
                    return W()((e = X, function(t) {
                        let n;
                        n = "function" == typeof e ? e : function() {
                            return e
                        };
                        const i = Object.create(t, G);
                        return i.source = t, i.subjectFactory = n, i
                    })(t));
                    var e
                }
            }

            function tt(t) {
                for (let e in t)
                    if (t[e] === tt) return e;
                throw Error("Could not find renamed property on target object.")
            }

            function et(t, e) {
                for (const n in e) e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n])
            }

            function nt(t) {
                if ("string" == typeof t) return t;
                if (Array.isArray(t)) return "[" + t.map(nt).join(", ") + "]";
                if (null == t) return "" + t;
                if (t.overriddenName) return "" + t.overriddenName;
                if (t.name) return "" + t.name;
                const e = t.toString();
                if (null == e) return "" + e;
                const n = e.indexOf("\n");
                return -1 === n ? e : e.substring(0, n)
            }

            function it(t, e) {
                return null == t || "" === t ? null === e ? "" : e : null == e || "" === e ? t : t + " " + e
            }
            const st = tt({
                __forward_ref__: tt
            });

            function rt(t) {
                return t.__forward_ref__ = rt, t.toString = function() {
                    return nt(this())
                }, t
            }

            function ot(t) {
                return at(t) ? t() : t
            }

            function at(t) {
                return "function" == typeof t && t.hasOwnProperty(st) && t.__forward_ref__ === rt
            }

            function lt(t) {
                return {
                    token: t.token,
                    providedIn: t.providedIn || null,
                    factory: t.factory,
                    value: void 0
                }
            }

            function ct(t) {
                return {
                    factory: t.factory,
                    providers: t.providers || [],
                    imports: t.imports || []
                }
            }

            function ht(t) {
                return ut(t, pt) || ut(t, mt)
            }

            function ut(t, e) {
                return t.hasOwnProperty(e) ? t[e] : null
            }

            function dt(t) {
                return t && (t.hasOwnProperty(ft) || t.hasOwnProperty(gt)) ? t[ft] : null
            }
            const pt = tt({
                    "\u0275prov": tt
                }),
                ft = tt({
                    "\u0275inj": tt
                }),
                mt = tt({
                    ngInjectableDef: tt
                }),
                gt = tt({
                    ngInjectorDef: tt
                });
            var _t = function(t) {
                return t[t.Default = 0] = "Default", t[t.Host = 1] = "Host", t[t.Self = 2] = "Self", t[t.SkipSelf = 4] = "SkipSelf", t[t.Optional = 8] = "Optional", t
            }({});
            let yt;

            function bt(t) {
                const e = yt;
                return yt = t, e
            }

            function vt(t, e, n) {
                const i = ht(t);
                if (i && "root" == i.providedIn) return void 0 === i.value ? i.value = i.factory() : i.value;
                if (n & _t.Optional) return null;
                if (void 0 !== e) return e;
                throw new Error(`Injector: NOT_FOUND [${nt(t)}]`)
            }

            function wt(t) {
                return {
                    toString: t
                }.toString()
            }
            var Ct = function(t) {
                    return t[t.OnPush = 0] = "OnPush", t[t.Default = 1] = "Default", t
                }({}),
                xt = function(t) {
                    return t[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom", t
                }({});
            const Et = "undefined" != typeof globalThis && globalThis,
                St = "undefined" != typeof window && window,
                kt = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
                Tt = "undefined" != typeof global && global,
                At = Et || Tt || St || kt,
                Dt = {},
                Rt = [],
                It = tt({
                    "\u0275cmp": tt
                }),
                Ot = tt({
                    "\u0275dir": tt
                }),
                Pt = tt({
                    "\u0275pipe": tt
                }),
                Ft = tt({
                    "\u0275mod": tt
                }),
                Lt = tt({
                    "\u0275loc": tt
                }),
                Nt = tt({
                    "\u0275fac": tt
                }),
                Mt = tt({
                    __NG_ELEMENT_ID__: tt
                });
            let Vt = 0;

            function jt(t) {
                return wt(() => {
                    const e = {},
                        n = {
                            type: t.type,
                            providersResolver: null,
                            decls: t.decls,
                            vars: t.vars,
                            factory: null,
                            template: t.template || null,
                            consts: t.consts || null,
                            ngContentSelectors: t.ngContentSelectors,
                            hostBindings: t.hostBindings || null,
                            hostVars: t.hostVars || 0,
                            hostAttrs: t.hostAttrs || null,
                            contentQueries: t.contentQueries || null,
                            declaredInputs: e,
                            inputs: null,
                            outputs: null,
                            exportAs: t.exportAs || null,
                            onPush: t.changeDetection === Ct.OnPush,
                            directiveDefs: null,
                            pipeDefs: null,
                            selectors: t.selectors || Rt,
                            viewQuery: t.viewQuery || null,
                            features: t.features || null,
                            data: t.data || {},
                            encapsulation: t.encapsulation || xt.Emulated,
                            id: "c",
                            styles: t.styles || Rt,
                            _: null,
                            setInput: null,
                            schemas: t.schemas || null,
                            tView: null
                        },
                        i = t.directives,
                        s = t.features,
                        r = t.pipes;
                    return n.id += Vt++, n.inputs = Ut(t.inputs, e), n.outputs = Ut(t.outputs), s && s.forEach(t => t(n)), n.directiveDefs = i ? () => ("function" == typeof i ? i() : i).map(Bt) : null, n.pipeDefs = r ? () => ("function" == typeof r ? r() : r).map(Ht) : null, n
                })
            }

            function Bt(t) {
                return Wt(t) || function(t) {
                    return t[Ot] || null
                }(t)
            }

            function Ht(t) {
                return function(t) {
                    return t[Pt] || null
                }(t)
            }
            const zt = {};

            function qt(t) {
                const e = {
                    type: t.type,
                    bootstrap: t.bootstrap || Rt,
                    declarations: t.declarations || Rt,
                    imports: t.imports || Rt,
                    exports: t.exports || Rt,
                    transitiveCompileScopes: null,
                    schemas: t.schemas || null,
                    id: t.id || null
                };
                return null != t.id && wt(() => {
                    zt[t.id] = t.type
                }), e
            }

            function Ut(t, e) {
                if (null == t) return Dt;
                const n = {};
                for (const i in t)
                    if (t.hasOwnProperty(i)) {
                        let s = t[i],
                            r = s;
                        Array.isArray(s) && (r = s[1], s = s[0]), n[s] = i, e && (e[s] = r)
                    } return n
            }
            const $t = jt;

            function Wt(t) {
                return t[It] || null
            }

            function Zt(t, e) {
                const n = t[Ft] || null;
                if (!n && !0 === e) throw new Error(`Type ${nt(t)} does not have '\u0275mod' property.`);
                return n
            }
            const Qt = 20,
                Kt = 10;

            function Gt(t) {
                return Array.isArray(t) && "object" == typeof t[1]
            }

            function Yt(t) {
                return Array.isArray(t) && !0 === t[1]
            }

            function Xt(t) {
                return 0 != (8 & t.flags)
            }

            function Jt(t) {
                return 2 == (2 & t.flags)
            }

            function te(t) {
                return 1 == (1 & t.flags)
            }

            function ee(t) {
                return null !== t.template
            }

            function ne(t, e) {
                return t.hasOwnProperty(Nt) ? t[Nt] : null
            }
            class ie extends Error {
                constructor(t, e) {
                    super(function(t, e) {
                        return `${t?`NG0${t}: `:""}${e}`
                    }(t, e)), this.code = t
                }
            }

            function se(t) {
                return "string" == typeof t ? t : null == t ? "" : String(t)
            }

            function re(t) {
                return "function" == typeof t ? t.name || t.toString() : "object" == typeof t && null != t && "function" == typeof t.type ? t.type.name || t.type.toString() : se(t)
            }

            function oe(t, e) {
                const n = e ? " in " + e : "";
                throw new ie("201", `No provider for ${re(t)} found${n}`)
            }
            class ae {
                constructor(t, e, n) {
                    this.previousValue = t, this.currentValue = e, this.firstChange = n
                }
                isFirstChange() {
                    return this.firstChange
                }
            }

            function le() {
                return ce
            }

            function ce(t) {
                return t.type.prototype.ngOnChanges && (t.setInput = ue), he
            }

            function he() {
                const t = de(this),
                    e = null == t ? void 0 : t.current;
                if (e) {
                    const n = t.previous;
                    if (n === Dt) t.previous = e;
                    else
                        for (let t in e) n[t] = e[t];
                    t.current = null, this.ngOnChanges(e)
                }
            }

            function ue(t, e, n, i) {
                const s = de(t) || function(t, e) {
                        return t.__ngSimpleChanges__ = e
                    }(t, {
                        previous: Dt,
                        current: null
                    }),
                    r = s.current || (s.current = {}),
                    o = s.previous,
                    a = this.declaredInputs[n],
                    l = o[a];
                r[a] = new ae(l && l.currentValue, e, o === Dt), t[i] = e
            }

            function de(t) {
                return t.__ngSimpleChanges__ || null
            }
            le.ngInherit = !0;
            const pe = "http://www.w3.org/2000/svg";
            let fe = void 0;

            function me(t) {
                return !!t.listen
            }
            const ge = {
                createRenderer: (t, e) => void 0 !== fe ? fe : "undefined" != typeof document ? document : void 0
            };

            function _e(t) {
                for (; Array.isArray(t);) t = t[0];
                return t
            }

            function ye(t, e) {
                return _e(e[t])
            }

            function be(t, e) {
                return _e(e[t.index])
            }

            function ve(t, e) {
                return t.data[e]
            }

            function we(t, e) {
                const n = e[t];
                return Gt(n) ? n : n[0]
            }

            function Ce(t) {
                const e = function(t) {
                    return t.__ngContext__ || null
                }(t);
                return e ? Array.isArray(e) ? e : e.lView : null
            }

            function xe(t) {
                return 4 == (4 & t[2])
            }

            function Ee(t) {
                return 128 == (128 & t[2])
            }

            function Se(t, e) {
                return null == e ? null : t[e]
            }

            function ke(t) {
                t[18] = 0
            }

            function Te(t, e) {
                t[5] += e;
                let n = t,
                    i = t[3];
                for (; null !== i && (1 === e && 1 === n[5] || -1 === e && 0 === n[5]);) i[5] += e, n = i, i = i[3]
            }
            const Ae = {
                lFrame: Ge(null),
                bindingsEnabled: !0,
                isInCheckNoChangesMode: !1
            };

            function De() {
                return Ae.bindingsEnabled
            }

            function Re() {
                return Ae.lFrame.lView
            }

            function Ie() {
                return Ae.lFrame.tView
            }

            function Oe(t) {
                Ae.lFrame.contextLView = t
            }

            function Pe() {
                let t = Fe();
                for (; null !== t && 64 === t.type;) t = t.parent;
                return t
            }

            function Fe() {
                return Ae.lFrame.currentTNode
            }

            function Le(t, e) {
                const n = Ae.lFrame;
                n.currentTNode = t, n.isParent = e
            }

            function Ne() {
                return Ae.lFrame.isParent
            }

            function Me() {
                Ae.lFrame.isParent = !1
            }

            function Ve() {
                return Ae.isInCheckNoChangesMode
            }

            function je(t) {
                Ae.isInCheckNoChangesMode = t
            }

            function Be() {
                return Ae.lFrame.bindingIndex++
            }

            function He(t, e) {
                const n = Ae.lFrame;
                n.bindingIndex = n.bindingRootIndex = t, ze(e)
            }

            function ze(t) {
                Ae.lFrame.currentDirectiveIndex = t
            }

            function qe(t) {
                const e = Ae.lFrame.currentDirectiveIndex;
                return -1 === e ? null : t[e]
            }

            function Ue() {
                return Ae.lFrame.currentQueryIndex
            }

            function $e(t) {
                Ae.lFrame.currentQueryIndex = t
            }

            function We(t) {
                const e = t[1];
                return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null
            }

            function Ze(t, e, n) {
                if (n & _t.SkipSelf) {
                    let i = e,
                        s = t;
                    for (; i = i.parent, !(null !== i || n & _t.Host || (i = We(s), null === i) || (s = s[15], 10 & i.type)););
                    if (null === i) return !1;
                    e = i, t = s
                }
                const i = Ae.lFrame = Ke();
                return i.currentTNode = e, i.lView = t, !0
            }

            function Qe(t) {
                const e = Ke(),
                    n = t[1];
                Ae.lFrame = e, e.currentTNode = n.firstChild, e.lView = t, e.tView = n, e.contextLView = t, e.bindingIndex = n.bindingStartIndex, e.inI18n = !1
            }

            function Ke() {
                const t = Ae.lFrame,
                    e = null === t ? null : t.child;
                return null === e ? Ge(t) : e
            }

            function Ge(t) {
                const e = {
                    currentTNode: null,
                    isParent: !0,
                    lView: null,
                    tView: null,
                    selectedIndex: -1,
                    contextLView: null,
                    elementDepthCount: 0,
                    currentNamespace: null,
                    currentDirectiveIndex: -1,
                    bindingRootIndex: -1,
                    bindingIndex: -1,
                    currentQueryIndex: 0,
                    parent: t,
                    child: null,
                    inI18n: !1
                };
                return null !== t && (t.child = e), e
            }

            function Ye() {
                const t = Ae.lFrame;
                return Ae.lFrame = t.parent, t.currentTNode = null, t.lView = null, t
            }
            const Xe = Ye;

            function Je() {
                const t = Ye();
                t.isParent = !0, t.tView = null, t.selectedIndex = -1, t.contextLView = null, t.elementDepthCount = 0, t.currentDirectiveIndex = -1, t.currentNamespace = null, t.bindingRootIndex = -1, t.bindingIndex = -1, t.currentQueryIndex = 0
            }

            function tn() {
                return Ae.lFrame.selectedIndex
            }

            function en(t) {
                Ae.lFrame.selectedIndex = t
            }

            function nn() {
                const t = Ae.lFrame;
                return ve(t.tView, t.selectedIndex)
            }

            function sn(t, e) {
                for (let n = e.directiveStart, i = e.directiveEnd; n < i; n++) {
                    const e = t.data[n].type.prototype,
                        {
                            ngAfterContentInit: i,
                            ngAfterContentChecked: s,
                            ngAfterViewInit: r,
                            ngAfterViewChecked: o,
                            ngOnDestroy: a
                        } = e;
                    i && (t.contentHooks || (t.contentHooks = [])).push(-n, i), s && ((t.contentHooks || (t.contentHooks = [])).push(n, s), (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)), r && (t.viewHooks || (t.viewHooks = [])).push(-n, r), o && ((t.viewHooks || (t.viewHooks = [])).push(n, o), (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)), null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a)
                }
            }

            function rn(t, e, n) {
                ln(t, e, 3, n)
            }

            function on(t, e, n, i) {
                (3 & t[2]) === n && ln(t, e, n, i)
            }

            function an(t, e) {
                let n = t[2];
                (3 & n) === e && (n &= 2047, n += 1, t[2] = n)
            }

            function ln(t, e, n, i) {
                const s = null != i ? i : -1,
                    r = e.length - 1;
                let o = 0;
                for (let a = void 0 !== i ? 65535 & t[18] : 0; a < r; a++)
                    if ("number" == typeof e[a + 1]) {
                        if (o = e[a], null != i && o >= i) break
                    } else e[a] < 0 && (t[18] += 65536), (o < s || -1 == s) && (cn(t, n, e, a), t[18] = (4294901760 & t[18]) + a + 2), a++
            }

            function cn(t, e, n, i) {
                const s = n[i] < 0,
                    r = n[i + 1],
                    o = t[s ? -n[i] : n[i]];
                s ? t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e && (t[2] += 2048, r.call(o)) : r.call(o)
            }
            const hn = -1;
            class un {
                constructor(t, e, n) {
                    this.factory = t, this.resolving = !1, this.canSeeViewProviders = e, this.injectImpl = n
                }
            }

            function dn(t, e, n) {
                const i = me(t);
                let s = 0;
                for (; s < n.length;) {
                    const r = n[s];
                    if ("number" == typeof r) {
                        if (0 !== r) break;
                        s++;
                        const o = n[s++],
                            a = n[s++],
                            l = n[s++];
                        i ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l)
                    } else {
                        const o = r,
                            a = n[++s];
                        fn(o) ? i && t.setProperty(e, o, a) : i ? t.setAttribute(e, o, a) : e.setAttribute(o, a), s++
                    }
                }
                return s
            }

            function pn(t) {
                return 3 === t || 4 === t || 6 === t
            }

            function fn(t) {
                return 64 === t.charCodeAt(0)
            }

            function mn(t, e) {
                if (null === e || 0 === e.length);
                else if (null === t || 0 === t.length) t = e.slice();
                else {
                    let n = -1;
                    for (let i = 0; i < e.length; i++) {
                        const s = e[i];
                        "number" == typeof s ? n = s : 0 === n || gn(t, n, s, null, -1 === n || 2 === n ? e[++i] : null)
                    }
                }
                return t
            }

            function gn(t, e, n, i, s) {
                let r = 0,
                    o = t.length;
                if (-1 === e) o = -1;
                else
                    for (; r < t.length;) {
                        const n = t[r++];
                        if ("number" == typeof n) {
                            if (n === e) {
                                o = -1;
                                break
                            }
                            if (n > e) {
                                o = r - 1;
                                break
                            }
                        }
                    }
                for (; r < t.length;) {
                    const e = t[r];
                    if ("number" == typeof e) break;
                    if (e === n) {
                        if (null === i) return void(null !== s && (t[r + 1] = s));
                        if (i === t[r + 1]) return void(t[r + 2] = s)
                    }
                    r++, null !== i && r++, null !== s && r++
                } - 1 !== o && (t.splice(o, 0, e), r = o + 1), t.splice(r++, 0, n), null !== i && t.splice(r++, 0, i), null !== s && t.splice(r++, 0, s)
            }

            function _n(t) {
                return t !== hn
            }

            function yn(t) {
                return 32767 & t
            }

            function bn(t, e) {
                let n = t >> 16,
                    i = e;
                for (; n > 0;) i = i[15], n--;
                return i
            }
            let vn = !0;

            function wn(t) {
                const e = vn;
                return vn = t, e
            }
            let Cn = 0;

            function xn(t, e) {
                const n = Sn(t, e);
                if (-1 !== n) return n;
                const i = e[1];
                i.firstCreatePass && (t.injectorIndex = e.length, En(i.data, t), En(e, null), En(i.blueprint, null));
                const s = kn(t, e),
                    r = t.injectorIndex;
                if (_n(s)) {
                    const t = yn(s),
                        n = bn(s, e),
                        i = n[1].data;
                    for (let s = 0; s < 8; s++) e[r + s] = n[t + s] | i[t + s]
                }
                return e[r + 8] = s, r
            }

            function En(t, e) {
                t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
            }

            function Sn(t, e) {
                return -1 === t.injectorIndex || t.parent && t.parent.injectorIndex === t.injectorIndex || null === e[t.injectorIndex + 8] ? -1 : t.injectorIndex
            }

            function kn(t, e) {
                if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
                let n = 0,
                    i = null,
                    s = e;
                for (; null !== s;) {
                    const t = s[1],
                        e = t.type;
                    if (i = 2 === e ? t.declTNode : 1 === e ? s[6] : null, null === i) return hn;
                    if (n++, s = s[15], -1 !== i.injectorIndex) return i.injectorIndex | n << 16
                }
                return hn
            }

            function Tn(t, e, n) {
                ! function(t, e, n) {
                    let i;
                    "string" == typeof n ? i = n.charCodeAt(0) || 0 : n.hasOwnProperty(Mt) && (i = n[Mt]), null == i && (i = n[Mt] = Cn++);
                    const s = 255 & i,
                        r = 1 << s,
                        o = 64 & s,
                        a = 32 & s,
                        l = e.data;
                    128 & s ? o ? a ? l[t + 7] |= r : l[t + 6] |= r : a ? l[t + 5] |= r : l[t + 4] |= r : o ? a ? l[t + 3] |= r : l[t + 2] |= r : a ? l[t + 1] |= r : l[t] |= r
                }(t, e, n)
            }

            function An(t, e, n) {
                if (n & _t.Optional) return t;
                oe(e, "NodeInjector")
            }

            function Dn(t, e, n, i) {
                if (n & _t.Optional && void 0 === i && (i = null), 0 == (n & (_t.Self | _t.Host))) {
                    const s = t[9],
                        r = bt(void 0);
                    try {
                        return s ? s.get(e, i, n & _t.Optional) : vt(e, i, n & _t.Optional)
                    } finally {
                        bt(r)
                    }
                }
                return An(i, e, n)
            }

            function Rn(t, e, n, i = _t.Default, s) {
                if (null !== t) {
                    const r = function(t) {
                        if ("string" == typeof t) return t.charCodeAt(0) || 0;
                        const e = t.hasOwnProperty(Mt) ? t[Mt] : void 0;
                        return "number" == typeof e ? e >= 0 ? 255 & e : On : e
                    }(n);
                    if ("function" == typeof r) {
                        if (!Ze(e, t, i)) return i & _t.Host ? An(s, n, i) : Dn(e, n, i, s);
                        try {
                            const t = r();
                            if (null != t || i & _t.Optional) return t;
                            oe(n)
                        } finally {
                            Xe()
                        }
                    } else if ("number" == typeof r) {
                        let s = null,
                            o = Sn(t, e),
                            a = hn,
                            l = i & _t.Host ? e[16][6] : null;
                        for ((-1 === o || i & _t.SkipSelf) && (a = -1 === o ? kn(t, e) : e[o + 8], a !== hn && Mn(i, !1) ? (s = e[1], o = yn(a), e = bn(a, e)) : o = -1); - 1 !== o;) {
                            const t = e[1];
                            if (Nn(r, o, t.data)) {
                                const t = Pn(o, e, n, s, i, l);
                                if (t !== In) return t
                            }
                            a = e[o + 8], a !== hn && Mn(i, e[1].data[o + 8] === l) && Nn(r, o, e) ? (s = t, o = yn(a), e = bn(a, e)) : o = -1
                        }
                    }
                }
                return Dn(e, n, i, s)
            }
            const In = {};

            function On() {
                return new Vn(Pe(), Re())
            }

            function Pn(t, e, n, i, s, r) {
                const o = e[1],
                    a = o.data[t + 8],
                    l = Fn(a, o, n, null == i ? Jt(a) && vn : i != o && 0 != (3 & a.type), s & _t.Host && r === a);
                return null !== l ? Ln(e, o, l, a) : In
            }

            function Fn(t, e, n, i, s) {
                const r = t.providerIndexes,
                    o = e.data,
                    a = 1048575 & r,
                    l = t.directiveStart,
                    c = r >> 20,
                    h = s ? a + c : t.directiveEnd;
                for (let u = i ? a : a + c; u < h; u++) {
                    const t = o[u];
                    if (u < l && n === t || u >= l && t.type === n) return u
                }
                if (s) {
                    const t = o[l];
                    if (t && ee(t) && t.type === n) return l
                }
                return null
            }

            function Ln(t, e, n, i) {
                let s = t[n];
                const r = e.data;
                if (s instanceof un) {
                    const o = s;
                    o.resolving && function(t, e) {
                        throw new ie("200", "Circular dependency in DI detected for " + t)
                    }(re(r[n]));
                    const a = wn(o.canSeeViewProviders);
                    o.resolving = !0;
                    const l = o.injectImpl ? bt(o.injectImpl) : null;
                    Ze(t, i, _t.Default);
                    try {
                        s = t[n] = o.factory(void 0, r, t, i), e.firstCreatePass && n >= i.directiveStart && function(t, e, n) {
                            const {
                                ngOnChanges: i,
                                ngOnInit: s,
                                ngDoCheck: r
                            } = e.type.prototype;
                            if (i) {
                                const i = ce(e);
                                (n.preOrderHooks || (n.preOrderHooks = [])).push(t, i), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, i)
                            }
                            s && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s), r && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, r), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r))
                        }(n, r[n], e)
                    } finally {
                        null !== l && bt(l), wn(a), o.resolving = !1, Xe()
                    }
                }
                return s
            }

            function Nn(t, e, n) {
                const i = 64 & t,
                    s = 32 & t;
                let r;
                return r = 128 & t ? i ? s ? n[e + 7] : n[e + 6] : s ? n[e + 5] : n[e + 4] : i ? s ? n[e + 3] : n[e + 2] : s ? n[e + 1] : n[e], !!(r & 1 << t)
            }

            function Mn(t, e) {
                return !(t & _t.Self || t & _t.Host && e)
            }
            class Vn {
                constructor(t, e) {
                    this._tNode = t, this._lView = e
                }
                get(t, e) {
                    return Rn(this._tNode, this._lView, t, void 0, e)
                }
            }

            function jn(t) {
                const e = t;
                if (at(t)) return () => {
                    const t = jn(ot(e));
                    return t ? t() : null
                };
                let n = ne(e);
                if (null === n) {
                    const t = dt(e);
                    n = t && t.factory
                }
                return n || null
            }

            function Bn(t) {
                return wt(() => {
                    const e = t.prototype.constructor,
                        n = e[Nt] || jn(e),
                        i = Object.prototype;
                    let s = Object.getPrototypeOf(t.prototype).constructor;
                    for (; s && s !== i;) {
                        const t = s[Nt] || jn(s);
                        if (t && t !== n) return t;
                        s = Object.getPrototypeOf(s)
                    }
                    return t => new t
                })
            }

            function Hn(t) {
                return function(t, e) {
                    if ("class" === e) return t.classes;
                    if ("style" === e) return t.styles;
                    const n = t.attrs;
                    if (n) {
                        const t = n.length;
                        let i = 0;
                        for (; i < t;) {
                            const s = n[i];
                            if (pn(s)) break;
                            if (0 === s) i += 2;
                            else if ("number" == typeof s)
                                for (i++; i < t && "string" == typeof n[i];) i++;
                            else {
                                if (s === e) return n[i + 1];
                                i += 2
                            }
                        }
                    }
                    return null
                }(Pe(), t)
            }
            const zn = "__parameters__";

            function qn(t, e, n) {
                return wt(() => {
                    const i = function(t) {
                        return function(...e) {
                            if (t) {
                                const n = t(...e);
                                for (const t in n) this[t] = n[t]
                            }
                        }
                    }(e);

                    function s(...t) {
                        if (this instanceof s) return i.apply(this, t), this;
                        const e = new s(...t);
                        return n.annotation = e, n;

                        function n(t, n, i) {
                            const s = t.hasOwnProperty(zn) ? t[zn] : Object.defineProperty(t, zn, {
                                value: []
                            })[zn];
                            for (; s.length <= i;) s.push(null);
                            return (s[i] = s[i] || []).push(e), t
                        }
                    }
                    return n && (s.prototype = Object.create(n.prototype)), s.prototype.ngMetadataName = t, s.annotationCls = s, s
                })
            }
            class Un {
                constructor(t, e) {
                    this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof e ? this.__NG_ELEMENT_ID__ = e : void 0 !== e && (this.\u0275prov = lt({
                        token: this,
                        providedIn: e.providedIn || "root",
                        factory: e.factory
                    }))
                }
                toString() {
                    return "InjectionToken " + this._desc
                }
            }
            const $n = Function;

            function Wn(t, e) {
                void 0 === e && (e = t);
                for (let n = 0; n < t.length; n++) {
                    let i = t[n];
                    Array.isArray(i) ? (e === t && (e = t.slice(0, n)), Wn(i, e)) : e !== t && e.push(i)
                }
                return e
            }

            function Zn(t, e) {
                t.forEach(t => Array.isArray(t) ? Zn(t, e) : e(t))
            }

            function Qn(t, e, n) {
                e >= t.length ? t.push(n) : t.splice(e, 0, n)
            }

            function Kn(t, e) {
                return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
            }

            function Gn(t, e) {
                const n = [];
                for (let i = 0; i < t; i++) n.push(e);
                return n
            }

            function Yn(t, e, n) {
                let i = Jn(t, e);
                return i >= 0 ? t[1 | i] = n : (i = ~i, function(t, e, n, i) {
                    let s = t.length;
                    if (s == e) t.push(n, i);
                    else if (1 === s) t.push(i, t[0]), t[0] = n;
                    else {
                        for (s--, t.push(t[s - 1], t[s]); s > e;) t[s] = t[s - 2], s--;
                        t[e] = n, t[e + 1] = i
                    }
                }(t, i, e, n)), i
            }

            function Xn(t, e) {
                const n = Jn(t, e);
                if (n >= 0) return t[1 | n]
            }

            function Jn(t, e) {
                return function(t, e, n) {
                    let i = 0,
                        s = t.length >> 1;
                    for (; s !== i;) {
                        const n = i + (s - i >> 1),
                            r = t[n << 1];
                        if (e === r) return n << 1;
                        r > e ? s = n : i = n + 1
                    }
                    return ~(s << 1)
                }(t, e)
            }
            const ti = qn("Inject", t => ({
                    token: t
                })),
                ei = qn("Optional"),
                ni = qn("Self"),
                ii = qn("SkipSelf"),
                si = qn("Host"),
                ri = {},
                oi = /\n/gm,
                ai = "__source",
                li = tt({
                    provide: String,
                    useValue: tt
                });
            let ci = void 0;

            function hi(t) {
                const e = ci;
                return ci = t, e
            }

            function ui(t, e = _t.Default) {
                if (void 0 === ci) throw new Error("inject() must be called from an injection context");
                return null === ci ? vt(t, void 0, e) : ci.get(t, e & _t.Optional ? null : void 0, e)
            }

            function di(t, e = _t.Default) {
                return (yt || ui)(ot(t), e)
            }
            const pi = di;

            function fi(t) {
                const e = [];
                for (let n = 0; n < t.length; n++) {
                    const i = ot(t[n]);
                    if (Array.isArray(i)) {
                        if (0 === i.length) throw new Error("Arguments array must have arguments.");
                        let t = void 0,
                            n = _t.Default;
                        for (let e = 0; e < i.length; e++) {
                            const s = i[e];
                            s instanceof ei || "Optional" === s.ngMetadataName || s === ei ? n |= _t.Optional : s instanceof ii || "SkipSelf" === s.ngMetadataName || s === ii ? n |= _t.SkipSelf : s instanceof ni || "Self" === s.ngMetadataName || s === ni ? n |= _t.Self : s instanceof si || "Host" === s.ngMetadataName || s === si ? n |= _t.Host : t = s instanceof ti || s === ti ? s.token : s
                        }
                        e.push(di(t, n))
                    } else e.push(di(i))
                }
                return e
            }
            let mi;

            function gi(t) {
                var e;
                return (null === (e = function() {
                    if (void 0 === mi && (mi = null, At.trustedTypes)) try {
                        mi = At.trustedTypes.createPolicy("angular", {
                            createHTML: t => t,
                            createScript: t => t,
                            createScriptURL: t => t
                        })
                    } catch (e) {}
                    return mi
                }()) || void 0 === e ? void 0 : e.createHTML(t)) || t
            }
            class _i {
                constructor(t) {
                    this.changingThisBreaksApplicationSecurity = t
                }
                toString() {
                    return "SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity + " (see https://g.co/ng/security#xss)"
                }
            }
            class yi extends _i {
                getTypeName() {
                    return "HTML"
                }
            }
            class bi extends _i {
                getTypeName() {
                    return "Style"
                }
            }
            class vi extends _i {
                getTypeName() {
                    return "Script"
                }
            }
            class wi extends _i {
                getTypeName() {
                    return "URL"
                }
            }
            class Ci extends _i {
                getTypeName() {
                    return "ResourceURL"
                }
            }

            function xi(t) {
                return t instanceof _i ? t.changingThisBreaksApplicationSecurity : t
            }

            function Ei(t, e) {
                const n = Si(t);
                if (null != n && n !== e) {
                    if ("ResourceURL" === n && "URL" === e) return !0;
                    throw new Error(`Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`)
                }
                return n === e
            }

            function Si(t) {
                return t instanceof _i && t.getTypeName() || null
            }
            class ki {
                constructor(t) {
                    this.inertDocumentHelper = t
                }
                getInertBodyElement(t) {
                    t = "<body><remove></remove>" + t;
                    try {
                        const e = (new window.DOMParser).parseFromString(gi(t), "text/html").body;
                        return null === e ? this.inertDocumentHelper.getInertBodyElement(t) : (e.removeChild(e.firstChild), e)
                    } catch (e) {
                        return null
                    }
                }
            }
            class Ti {
                constructor(t) {
                    if (this.defaultDoc = t, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"), null == this.inertDocument.body) {
                        const t = this.inertDocument.createElement("html");
                        this.inertDocument.appendChild(t);
                        const e = this.inertDocument.createElement("body");
                        t.appendChild(e)
                    }
                }
                getInertBodyElement(t) {
                    const e = this.inertDocument.createElement("template");
                    if ("content" in e) return e.innerHTML = gi(t), e;
                    const n = this.inertDocument.createElement("body");
                    return n.innerHTML = gi(t), this.defaultDoc.documentMode && this.stripCustomNsAttrs(n), n
                }
                stripCustomNsAttrs(t) {
                    const e = t.attributes;
                    for (let i = e.length - 1; 0 < i; i--) {
                        const n = e.item(i).name;
                        "xmlns:ns1" !== n && 0 !== n.indexOf("ns1:") || t.removeAttribute(n)
                    }
                    let n = t.firstChild;
                    for (; n;) n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n), n = n.nextSibling
                }
            }
            const Ai = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
                Di = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

            function Ri(t) {
                return (t = String(t)).match(Ai) || t.match(Di) ? t : "unsafe:" + t
            }

            function Ii(t) {
                const e = {};
                for (const n of t.split(",")) e[n] = !0;
                return e
            }

            function Oi(...t) {
                const e = {};
                for (const n of t)
                    for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
                return e
            }
            const Pi = Ii("area,br,col,hr,img,wbr"),
                Fi = Ii("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
                Li = Ii("rp,rt"),
                Ni = Oi(Li, Fi),
                Mi = Oi(Pi, Oi(Fi, Ii("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), Oi(Li, Ii("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), Ni),
                Vi = Ii("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
                ji = Ii("srcset"),
                Bi = Oi(Vi, ji, Ii("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), Ii("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
                Hi = Ii("script,style,template");
            class zi {
                constructor() {
                    this.sanitizedSomething = !1, this.buf = []
                }
                sanitizeChildren(t) {
                    let e = t.firstChild,
                        n = !0;
                    for (; e;)
                        if (e.nodeType === Node.ELEMENT_NODE ? n = this.startElement(e) : e.nodeType === Node.TEXT_NODE ? this.chars(e.nodeValue) : this.sanitizedSomething = !0, n && e.firstChild) e = e.firstChild;
                        else
                            for (; e;) {
                                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                                let t = this.checkClobberedElement(e, e.nextSibling);
                                if (t) {
                                    e = t;
                                    break
                                }
                                e = this.checkClobberedElement(e, e.parentNode)
                            }
                    return this.buf.join("")
                }
                startElement(t) {
                    const e = t.nodeName.toLowerCase();
                    if (!Mi.hasOwnProperty(e)) return this.sanitizedSomething = !0, !Hi.hasOwnProperty(e);
                    this.buf.push("<"), this.buf.push(e);
                    const n = t.attributes;
                    for (let s = 0; s < n.length; s++) {
                        const t = n.item(s),
                            e = t.name,
                            r = e.toLowerCase();
                        if (!Bi.hasOwnProperty(r)) {
                            this.sanitizedSomething = !0;
                            continue
                        }
                        let o = t.value;
                        Vi[r] && (o = Ri(o)), ji[r] && (i = o, o = (i = String(i)).split(",").map(t => Ri(t.trim())).join(", ")), this.buf.push(" ", e, '="', $i(o), '"')
                    }
                    var i;
                    return this.buf.push(">"), !0
                }
                endElement(t) {
                    const e = t.nodeName.toLowerCase();
                    Mi.hasOwnProperty(e) && !Pi.hasOwnProperty(e) && (this.buf.push("</"), this.buf.push(e), this.buf.push(">"))
                }
                chars(t) {
                    this.buf.push($i(t))
                }
                checkClobberedElement(t, e) {
                    if (e && (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error("Failed to sanitize html because the element is clobbered: " + t.outerHTML);
                    return e
                }
            }
            const qi = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                Ui = /([^\#-~ |!])/g;

            function $i(t) {
                return t.replace(/&/g, "&amp;").replace(qi, function(t) {
                    return "&#" + (1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536) + ";"
                }).replace(Ui, function(t) {
                    return "&#" + t.charCodeAt(0) + ";"
                }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
            let Wi;

            function Zi(t) {
                return "content" in t && function(t) {
                    return t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
                }(t) ? t.content : null
            }
            var Qi = function(t) {
                return t[t.NONE = 0] = "NONE", t[t.HTML = 1] = "HTML", t[t.STYLE = 2] = "STYLE", t[t.SCRIPT = 3] = "SCRIPT", t[t.URL = 4] = "URL", t[t.RESOURCE_URL = 5] = "RESOURCE_URL", t
            }({});

            function Ki(t) {
                return t.ngDebugContext
            }

            function Gi(t) {
                return t.ngOriginalError
            }

            function Yi(t, ...e) {
                t.error(...e)
            }
            class Xi {
                constructor() {
                    this._console = console
                }
                handleError(t) {
                    const e = this._findOriginalError(t),
                        n = this._findContext(t),
                        i = function(t) {
                            return t.ngErrorLogger || Yi
                        }(t);
                    i(this._console, "ERROR", t), e && i(this._console, "ORIGINAL ERROR", e), n && i(this._console, "ERROR CONTEXT", n)
                }
                _findContext(t) {
                    return t ? Ki(t) ? Ki(t) : this._findContext(Gi(t)) : null
                }
                _findOriginalError(t) {
                    let e = Gi(t);
                    for (; e && Gi(e);) e = Gi(e);
                    return e
                }
            }

            function Ji(t, e) {
                t.__ngContext__ = e
            }
            const ts = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(At))();

            function es(t) {
                return {
                    name: "window",
                    target: t.ownerDocument.defaultView
                }
            }

            function ns(t) {
                return t instanceof Function ? t() : t
            }
            var is = function(t) {
                return t[t.Important = 1] = "Important", t[t.DashCase = 2] = "DashCase", t
            }({});

            function ss(t, e) {
                return (void 0)(t, e)
            }

            function rs(t) {
                const e = t[3];
                return Yt(e) ? e[3] : e
            }

            function os(t) {
                return ls(t[13])
            }

            function as(t) {
                return ls(t[4])
            }

            function ls(t) {
                for (; null !== t && !Yt(t);) t = t[4];
                return t
            }

            function cs(t, e, n, i, s) {
                if (null != i) {
                    let r, o = !1;
                    Yt(i) ? r = i : Gt(i) && (o = !0, i = i[0]);
                    const a = _e(i);
                    0 === t && null !== n ? null == s ? _s(e, n, a) : gs(e, n, a, s || null, !0) : 1 === t && null !== n ? gs(e, n, a, s || null, !0) : 2 === t ? function(t, e, n) {
                        const i = bs(t, e);
                        i && function(t, e, n, i) {
                            me(t) ? t.removeChild(e, n, i) : e.removeChild(n)
                        }(t, i, e, n)
                    }(e, a, o) : 3 === t && e.destroyNode(a), null != r && function(t, e, n, i, s) {
                        const r = n[7];
                        r !== _e(n) && cs(e, t, i, r, s);
                        for (let o = Kt; o < n.length; o++) {
                            const s = n[o];
                            ks(s[1], s, t, e, i, r)
                        }
                    }(e, t, r, n, s)
                }
            }

            function hs(t, e, n) {
                return me(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e)
            }

            function us(t, e) {
                const n = t[9],
                    i = n.indexOf(e),
                    s = e[3];
                1024 & e[2] && (e[2] &= -1025, Te(s, -1)), n.splice(i, 1)
            }

            function ds(t, e) {
                if (t.length <= Kt) return;
                const n = Kt + e,
                    i = t[n];
                if (i) {
                    const r = i[17];
                    null !== r && r !== t && us(r, i), e > 0 && (t[n - 1][4] = i[4]);
                    const o = Kn(t, Kt + e);
                    ks(i[1], s = i, s[11], 2, null, null), s[0] = null, s[6] = null;
                    const a = o[19];
                    null !== a && a.detachView(o[1]), i[3] = null, i[4] = null, i[2] &= -129
                }
                var s;
                return i
            }

            function ps(t, e) {
                if (!(256 & e[2])) {
                    const n = e[11];
                    me(n) && n.destroyNode && ks(t, e, n, 3, null, null),
                        function(t) {
                            let e = t[13];
                            if (!e) return fs(t[1], t);
                            for (; e;) {
                                let n = null;
                                if (Gt(e)) n = e[13];
                                else {
                                    const t = e[10];
                                    t && (n = t)
                                }
                                if (!n) {
                                    for (; e && !e[4] && e !== t;) Gt(e) && fs(e[1], e), e = e[3];
                                    null === e && (e = t), Gt(e) && fs(e[1], e), n = e && e[4]
                                }
                                e = n
                            }
                        }(e)
                }
            }

            function fs(t, e) {
                if (!(256 & e[2])) {
                    e[2] &= -129, e[2] |= 256,
                        function(t, e) {
                            let n;
                            if (null != t && null != (n = t.destroyHooks))
                                for (let i = 0; i < n.length; i += 2) {
                                    const t = e[n[i]];
                                    if (!(t instanceof un)) {
                                        const e = n[i + 1];
                                        if (Array.isArray(e))
                                            for (let n = 0; n < e.length; n += 2) e[n + 1].call(t[e[n]]);
                                        else e.call(t)
                                    }
                                }
                        }(t, e),
                        function(t, e) {
                            const n = t.cleanup,
                                i = e[7];
                            let s = -1;
                            if (null !== n)
                                for (let r = 0; r < n.length - 1; r += 2)
                                    if ("string" == typeof n[r]) {
                                        const t = n[r + 1],
                                            o = "function" == typeof t ? t(e) : _e(e[t]),
                                            a = i[s = n[r + 2]],
                                            l = n[r + 3];
                                        "boolean" == typeof l ? o.removeEventListener(n[r], a, l) : l >= 0 ? i[s = l]() : i[s = -l].unsubscribe(), r += 2
                                    } else {
                                        const t = i[s = n[r + 1]];
                                        n[r].call(t)
                                    } if (null !== i) {
                                for (let t = s + 1; t < i.length; t++)(0, i[t])();
                                e[7] = null
                            }
                        }(t, e), 1 === e[1].type && me(e[11]) && e[11].destroy();
                    const n = e[17];
                    if (null !== n && Yt(e[3])) {
                        n !== e[3] && us(n, e);
                        const i = e[19];
                        null !== i && i.detachView(t)
                    }
                }
            }

            function ms(t, e, n) {
                return function(t, e, n) {
                    let i = e;
                    for (; null !== i && 40 & i.type;) i = (e = i).parent;
                    if (null === i) return n[0];
                    if (2 & i.flags) {
                        const e = t.data[i.directiveStart].encapsulation;
                        if (e === xt.None || e === xt.Emulated) return null
                    }
                    return be(i, n)
                }(t, e.parent, n)
            }

            function gs(t, e, n, i, s) {
                me(t) ? t.insertBefore(e, n, i, s) : e.insertBefore(n, i, s)
            }

            function _s(t, e, n) {
                me(t) ? t.appendChild(e, n) : e.appendChild(n)
            }

            function ys(t, e, n, i, s) {
                null !== i ? gs(t, e, n, i, s) : _s(t, e, n)
            }

            function bs(t, e) {
                return me(t) ? t.parentNode(e) : e.parentNode
            }

            function vs(t, e, n) {
                return ws(t, e, n)
            }
            let ws = function(t, e, n) {
                return 40 & t.type ? be(t, n) : null
            };

            function Cs(t, e, n, i) {
                const s = ms(t, i, e),
                    r = e[11],
                    o = vs(i.parent || e[6], i, e);
                if (null != s)
                    if (Array.isArray(n))
                        for (let a = 0; a < n.length; a++) ys(r, s, n[a], o, !1);
                    else ys(r, s, n, o, !1)
            }

            function xs(t, e) {
                if (null !== e) {
                    const n = e.type;
                    if (3 & n) return be(e, t);
                    if (4 & n) return Es(-1, t[e.index]);
                    if (8 & n) {
                        const n = e.child;
                        if (null !== n) return xs(t, n);
                        {
                            const n = t[e.index];
                            return Yt(n) ? Es(-1, n) : _e(n)
                        }
                    }
                    if (32 & n) return ss(e, t)() || _e(t[e.index]);
                    {
                        const n = t[16],
                            i = n[6],
                            s = rs(n),
                            r = i.projection[e.projection];
                        return null != r ? xs(s, r) : xs(t, e.next)
                    }
                }
                return null
            }

            function Es(t, e) {
                const n = Kt + t + 1;
                if (n < e.length) {
                    const t = e[n],
                        i = t[1].firstChild;
                    if (null !== i) return xs(t, i)
                }
                return e[7]
            }

            function Ss(t, e, n, i, s, r, o) {
                for (; null != n;) {
                    const a = i[n.index],
                        l = n.type;
                    if (o && 0 === e && (a && Ji(_e(a), i), n.flags |= 4), 64 != (64 & n.flags))
                        if (8 & l) Ss(t, e, n.child, i, s, r, !1), cs(e, t, s, a, r);
                        else if (32 & l) {
                        const o = ss(n, i);
                        let l;
                        for (; l = o();) cs(e, t, s, l, r);
                        cs(e, t, s, a, r)
                    } else 16 & l ? Ts(t, e, i, n, s, r) : cs(e, t, s, a, r);
                    n = o ? n.projectionNext : n.next
                }
            }

            function ks(t, e, n, i, s, r) {
                Ss(n, i, t.firstChild, e, s, r, !1)
            }

            function Ts(t, e, n, i, s, r) {
                const o = n[16],
                    a = o[6].projection[i.projection];
                if (Array.isArray(a))
                    for (let l = 0; l < a.length; l++) cs(e, t, s, a[l], r);
                else Ss(t, e, a, o[3], s, r, !0)
            }

            function As(t, e, n) {
                me(t) ? t.setAttribute(e, "style", n) : e.style.cssText = n
            }

            function Ds(t, e, n) {
                me(t) ? "" === n ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n) : e.className = n
            }

            function Rs(t, e, n) {
                let i = t.length;
                for (;;) {
                    const s = t.indexOf(e, n);
                    if (-1 === s) return s;
                    if (0 === s || t.charCodeAt(s - 1) <= 32) {
                        const n = e.length;
                        if (s + n === i || t.charCodeAt(s + n) <= 32) return s
                    }
                    n = s + 1
                }
            }
            const Is = "ng-template";

            function Os(t, e, n) {
                let i = 0;
                for (; i < t.length;) {
                    let s = t[i++];
                    if (n && "class" === s) {
                        if (s = t[i], -1 !== Rs(s.toLowerCase(), e, 0)) return !0
                    } else if (1 === s) {
                        for (; i < t.length && "string" == typeof(s = t[i++]);)
                            if (s.toLowerCase() === e) return !0;
                        return !1
                    }
                }
                return !1
            }

            function Ps(t) {
                return 4 === t.type && t.value !== Is
            }

            function Fs(t, e, n) {
                return e === (4 !== t.type || n ? t.value : Is)
            }

            function Ls(t, e, n) {
                let i = 4;
                const s = t.attrs || [],
                    r = function(t) {
                        for (let e = 0; e < t.length; e++)
                            if (pn(t[e])) return e;
                        return t.length
                    }(s);
                let o = !1;
                for (let a = 0; a < e.length; a++) {
                    const l = e[a];
                    if ("number" != typeof l) {
                        if (!o)
                            if (4 & i) {
                                if (i = 2 | 1 & i, "" !== l && !Fs(t, l, n) || "" === l && 1 === e.length) {
                                    if (Ns(i)) return !1;
                                    o = !0
                                }
                            } else {
                                const c = 8 & i ? l : e[++a];
                                if (8 & i && null !== t.attrs) {
                                    if (!Os(t.attrs, c, n)) {
                                        if (Ns(i)) return !1;
                                        o = !0
                                    }
                                    continue
                                }
                                const h = Ms(8 & i ? "class" : l, s, Ps(t), n);
                                if (-1 === h) {
                                    if (Ns(i)) return !1;
                                    o = !0;
                                    continue
                                }
                                if ("" !== c) {
                                    let t;
                                    t = h > r ? "" : s[h + 1].toLowerCase();
                                    const e = 8 & i ? t : null;
                                    if (e && -1 !== Rs(e, c, 0) || 2 & i && c !== t) {
                                        if (Ns(i)) return !1;
                                        o = !0
                                    }
                                }
                            }
                    } else {
                        if (!o && !Ns(i) && !Ns(l)) return !1;
                        if (o && Ns(l)) continue;
                        o = !1, i = l | 1 & i
                    }
                }
                return Ns(i) || o
            }

            function Ns(t) {
                return 0 == (1 & t)
            }

            function Ms(t, e, n, i) {
                if (null === e) return -1;
                let s = 0;
                if (i || !n) {
                    let n = !1;
                    for (; s < e.length;) {
                        const i = e[s];
                        if (i === t) return s;
                        if (3 === i || 6 === i) n = !0;
                        else {
                            if (1 === i || 2 === i) {
                                let t = e[++s];
                                for (;
                                    "string" == typeof t;) t = e[++s];
                                continue
                            }
                            if (4 === i) break;
                            if (0 === i) {
                                s += 4;
                                continue
                            }
                        }
                        s += n ? 1 : 2
                    }
                    return -1
                }
                return function(t, e) {
                    let n = t.indexOf(4);
                    if (n > -1)
                        for (n++; n < t.length;) {
                            const i = t[n];
                            if ("number" == typeof i) return -1;
                            if (i === e) return n;
                            n++
                        }
                    return -1
                }(e, t)
            }

            function Vs(t, e, n = !1) {
                for (let i = 0; i < e.length; i++)
                    if (Ls(t, e[i], n)) return !0;
                return !1
            }

            function js(t, e) {
                t: for (let n = 0; n < e.length; n++) {
                    const i = e[n];
                    if (t.length === i.length) {
                        for (let e = 0; e < t.length; e++)
                            if (t[e] !== i[e]) continue t;
                        return !0
                    }
                }
                return !1
            }

            function Bs(t, e) {
                return t ? ":not(" + e.trim() + ")" : e
            }

            function Hs(t) {
                let e = t[0],
                    n = 1,
                    i = 2,
                    s = "",
                    r = !1;
                for (; n < t.length;) {
                    let o = t[n];
                    if ("string" == typeof o)
                        if (2 & i) {
                            const e = t[++n];
                            s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]"
                        } else 8 & i ? s += "." + o : 4 & i && (s += " " + o);
                    else "" === s || Ns(o) || (e += Bs(r, s), s = ""), i = o, r = r || !Ns(i);
                    n++
                }
                return "" !== s && (e += Bs(r, s)), e
            }
            const zs = {};

            function qs(t) {
                Us(Ie(), Re(), tn() + t, Ve())
            }

            function Us(t, e, n, i) {
                if (!i)
                    if (3 == (3 & e[2])) {
                        const i = t.preOrderCheckHooks;
                        null !== i && rn(e, i, n)
                    } else {
                        const i = t.preOrderHooks;
                        null !== i && on(e, i, 0, n)
                    } en(n)
            }

            function $s(t, e) {
                return t << 17 | e << 2
            }

            function Ws(t) {
                return t >> 17 & 32767
            }

            function Zs(t) {
                return 2 | t
            }

            function Qs(t) {
                return (131068 & t) >> 2
            }

            function Ks(t, e) {
                return -131069 & t | e << 2
            }

            function Gs(t) {
                return 1 | t
            }

            function Ys(t, e) {
                const n = t.contentQueries;
                if (null !== n)
                    for (let i = 0; i < n.length; i += 2) {
                        const s = n[i],
                            r = n[i + 1];
                        if (-1 !== r) {
                            const n = t.data[r];
                            $e(s), n.contentQueries(2, e[r], r)
                        }
                    }
            }

            function Xs(t, e, n, i, s, r, o, a, l, c) {
                const h = e.blueprint.slice();
                return h[0] = s, h[2] = 140 | i, ke(h), h[3] = h[15] = t, h[8] = n, h[10] = o || t && t[10], h[11] = a || t && t[11], h[12] = l || t && t[12] || null, h[9] = c || t && t[9] || null, h[6] = r, h[16] = 2 == e.type ? t[16] : h, h
            }

            function Js(t, e, n, i, s) {
                let r = t.data[e];
                if (null === r) r = function(t, e, n, i, s) {
                    const r = Fe(),
                        o = Ne(),
                        a = t.data[e] = function(t, e, n, i, s, r) {
                            return {
                                type: n,
                                index: i,
                                insertBeforeIndex: null,
                                injectorIndex: e ? e.injectorIndex : -1,
                                directiveStart: -1,
                                directiveEnd: -1,
                                directiveStylingLast: -1,
                                propertyBindings: null,
                                flags: 0,
                                providerIndexes: 0,
                                value: s,
                                attrs: r,
                                mergedAttrs: null,
                                localNames: null,
                                initialInputs: void 0,
                                inputs: null,
                                outputs: null,
                                tViews: null,
                                next: null,
                                projectionNext: null,
                                child: null,
                                parent: e,
                                projection: null,
                                styles: null,
                                stylesWithoutHost: null,
                                residualStyles: void 0,
                                classes: null,
                                classesWithoutHost: null,
                                residualClasses: void 0,
                                classBindings: 0,
                                styleBindings: 0
                            }
                        }(0, o ? r : r && r.parent, n, e, i, s);
                    return null === t.firstChild && (t.firstChild = a), null !== r && (o ? null == r.child && null !== a.parent && (r.child = a) : null === r.next && (r.next = a)), a
                }(t, e, n, i, s), Ae.lFrame.inI18n && (r.flags |= 64);
                else if (64 & r.type) {
                    r.type = n, r.value = i, r.attrs = s;
                    const t = function() {
                        const t = Ae.lFrame,
                            e = t.currentTNode;
                        return t.isParent ? e : e.parent
                    }();
                    r.injectorIndex = null === t ? -1 : t.injectorIndex
                }
                return Le(r, !0), r
            }

            function tr(t, e, n, i) {
                if (0 === n) return -1;
                const s = e.length;
                for (let r = 0; r < n; r++) e.push(i), t.blueprint.push(i), t.data.push(null);
                return s
            }

            function er(t, e, n) {
                Qe(e);
                try {
                    const i = t.viewQuery;
                    null !== i && Ir(1, i, n);
                    const s = t.template;
                    null !== s && sr(t, e, s, 1, n), t.firstCreatePass && (t.firstCreatePass = !1), t.staticContentQueries && Ys(t, e), t.staticViewQueries && Ir(2, t.viewQuery, n);
                    const r = t.components;
                    null !== r && function(t, e) {
                        for (let n = 0; n < e.length; n++) kr(t, e[n])
                    }(e, r)
                } catch (i) {
                    throw t.firstCreatePass && (t.incompleteFirstPass = !0), i
                } finally {
                    e[2] &= -5, Je()
                }
            }

            function nr(t, e, n, i) {
                const s = e[2];
                if (256 == (256 & s)) return;
                Qe(e);
                const r = Ve();
                try {
                    ke(e), Ae.lFrame.bindingIndex = t.bindingStartIndex, null !== n && sr(t, e, n, 2, i);
                    const o = 3 == (3 & s);
                    if (!r)
                        if (o) {
                            const n = t.preOrderCheckHooks;
                            null !== n && rn(e, n, null)
                        } else {
                            const n = t.preOrderHooks;
                            null !== n && on(e, n, 0, null), an(e, 0)
                        } if (function(t) {
                            for (let e = os(t); null !== e; e = as(e)) {
                                if (!e[2]) continue;
                                const t = e[9];
                                for (let e = 0; e < t.length; e++) {
                                    const n = t[e],
                                        i = n[3];
                                    0 == (1024 & n[2]) && Te(i, 1), n[2] |= 1024
                                }
                            }
                        }(e), function(t) {
                            for (let e = os(t); null !== e; e = as(e))
                                for (let t = Kt; t < e.length; t++) {
                                    const n = e[t],
                                        i = n[1];
                                    Ee(n) && nr(i, n, i.template, n[8])
                                }
                        }(e), null !== t.contentQueries && Ys(t, e), !r)
                        if (o) {
                            const n = t.contentCheckHooks;
                            null !== n && rn(e, n)
                        } else {
                            const n = t.contentHooks;
                            null !== n && on(e, n, 1), an(e, 1)
                        }!
                    function(t, e) {
                        const n = t.hostBindingOpCodes;
                        if (null !== n) try {
                            for (let t = 0; t < n.length; t++) {
                                const i = n[t];
                                if (i < 0) en(~i);
                                else {
                                    const s = i,
                                        r = n[++t],
                                        o = n[++t];
                                    He(r, s), o(2, e[s])
                                }
                            }
                        } finally {
                            en(-1)
                        }
                    }(t, e);
                    const a = t.components;
                    null !== a && function(t, e) {
                        for (let n = 0; n < e.length; n++) Er(t, e[n])
                    }(e, a);
                    const l = t.viewQuery;
                    if (null !== l && Ir(2, l, i), !r)
                        if (o) {
                            const n = t.viewCheckHooks;
                            null !== n && rn(e, n)
                        } else {
                            const n = t.viewHooks;
                            null !== n && on(e, n, 2), an(e, 2)
                        }! 0 === t.firstUpdatePass && (t.firstUpdatePass = !1), r || (e[2] &= -73), 1024 & e[2] && (e[2] &= -1025, Te(e[3], -1))
                } finally {
                    Je()
                }
            }

            function ir(t, e, n, i) {
                const s = e[10],
                    r = !Ve(),
                    o = xe(e);
                try {
                    r && !o && s.begin && s.begin(), o && er(t, e, i), nr(t, e, n, i)
                } finally {
                    r && !o && s.end && s.end()
                }
            }

            function sr(t, e, n, i, s) {
                const r = tn();
                try {
                    en(-1), 2 & i && e.length > Qt && Us(t, e, Qt, Ve()), n(i, s)
                } finally {
                    en(r)
                }
            }

            function rr(t, e, n) {
                if (Xt(e)) {
                    const i = e.directiveEnd;
                    for (let s = e.directiveStart; s < i; s++) {
                        const e = t.data[s];
                        e.contentQueries && e.contentQueries(1, n[s], s)
                    }
                }
            }

            function or(t, e, n) {
                De() && (function(t, e, n, i) {
                    const s = n.directiveStart,
                        r = n.directiveEnd;
                    t.firstCreatePass || xn(n, e), Ji(i, e);
                    const o = n.initialInputs;
                    for (let a = s; a < r; a++) {
                        const i = t.data[a],
                            r = ee(i);
                        r && vr(e, n, i);
                        const l = Ln(e, t, a, n);
                        Ji(l, e), null !== o && wr(0, a - s, l, i, 0, o), r && (we(n.index, e)[8] = l)
                    }
                }(t, e, n, be(n, e)), 128 == (128 & n.flags) && function(t, e, n) {
                    const i = n.directiveStart,
                        s = n.directiveEnd,
                        r = n.index,
                        o = Ae.lFrame.currentDirectiveIndex;
                    try {
                        en(r);
                        for (let n = i; n < s; n++) {
                            const i = t.data[n],
                                s = e[n];
                            ze(n), null === i.hostBindings && 0 === i.hostVars && null === i.hostAttrs || mr(i, s)
                        }
                    } finally {
                        en(-1), ze(o)
                    }
                }(t, e, n))
            }

            function ar(t, e, n = be) {
                const i = e.localNames;
                if (null !== i) {
                    let s = e.index + 1;
                    for (let r = 0; r < i.length; r += 2) {
                        const o = i[r + 1],
                            a = -1 === o ? n(e, t) : t[o];
                        t[s++] = a
                    }
                }
            }

            function lr(t) {
                const e = t.tView;
                return null === e || e.incompleteFirstPass ? t.tView = cr(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts) : e
            }

            function cr(t, e, n, i, s, r, o, a, l, c) {
                const h = Qt + i,
                    u = h + s,
                    d = function(t, e) {
                        const n = [];
                        for (let i = 0; i < e; i++) n.push(i < t ? null : zs);
                        return n
                    }(h, u),
                    p = "function" == typeof c ? c() : c;
                return d[1] = {
                    type: t,
                    blueprint: d,
                    template: n,
                    queries: null,
                    viewQuery: a,
                    declTNode: e,
                    data: d.slice().fill(null, h),
                    bindingStartIndex: h,
                    expandoStartIndex: u,
                    hostBindingOpCodes: null,
                    firstCreatePass: !0,
                    firstUpdatePass: !0,
                    staticViewQueries: !1,
                    staticContentQueries: !1,
                    preOrderHooks: null,
                    preOrderCheckHooks: null,
                    contentHooks: null,
                    contentCheckHooks: null,
                    viewHooks: null,
                    viewCheckHooks: null,
                    destroyHooks: null,
                    cleanup: null,
                    contentQueries: null,
                    components: null,
                    directiveRegistry: "function" == typeof r ? r() : r,
                    pipeRegistry: "function" == typeof o ? o() : o,
                    firstChild: null,
                    schemas: l,
                    consts: p,
                    incompleteFirstPass: !1
                }
            }

            function hr(t, e, n, i) {
                const s = Pr(e);
                null === n ? s.push(i) : (s.push(n), t.firstCreatePass && Fr(t).push(i, s.length - 1))
            }

            function ur(t, e, n) {
                for (let i in t)
                    if (t.hasOwnProperty(i)) {
                        const s = t[i];
                        (n = null === n ? {} : n).hasOwnProperty(i) ? n[i].push(e, s) : n[i] = [e, s]
                    } return n
            }

            function dr(t, e, n, i, s, r, o, a) {
                const l = be(e, n);
                let c, h = e.inputs;
                var u;
                !a && null != h && (c = h[i]) ? (Mr(t, n, c, i, s), Jt(e) && function(t, e) {
                    const n = we(e, t);
                    16 & n[2] || (n[2] |= 64)
                }(n, e.index)) : 3 & e.type && (i = "class" === (u = i) ? "className" : "for" === u ? "htmlFor" : "formaction" === u ? "formAction" : "innerHtml" === u ? "innerHTML" : "readonly" === u ? "readOnly" : "tabindex" === u ? "tabIndex" : u, s = null != o ? o(s, e.value || "", i) : s, me(r) ? r.setProperty(l, i, s) : fn(i) || (l.setProperty ? l.setProperty(i, s) : l[i] = s))
            }

            function pr(t, e, n, i) {
                let s = !1;
                if (De()) {
                    const r = function(t, e, n) {
                            const i = t.directiveRegistry;
                            let s = null;
                            if (i)
                                for (let r = 0; r < i.length; r++) {
                                    const o = i[r];
                                    Vs(n, o.selectors, !1) && (s || (s = []), Tn(xn(n, e), t, o.type), ee(o) ? (gr(t, n), s.unshift(o)) : s.push(o))
                                }
                            return s
                        }(t, e, n),
                        o = null === i ? null : {
                            "": -1
                        };
                    if (null !== r) {
                        s = !0, yr(n, t.data.length, r.length);
                        for (let t = 0; t < r.length; t++) {
                            const e = r[t];
                            e.providersResolver && e.providersResolver(e)
                        }
                        let i = !1,
                            a = !1,
                            l = tr(t, e, r.length, null);
                        for (let s = 0; s < r.length; s++) {
                            const c = r[s];
                            n.mergedAttrs = mn(n.mergedAttrs, c.hostAttrs), br(t, n, e, l, c), _r(l, c, o), null !== c.contentQueries && (n.flags |= 8), null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars || (n.flags |= 128);
                            const h = c.type.prototype;
                            !i && (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) && ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), i = !0), a || !h.ngOnChanges && !h.ngDoCheck || ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index), a = !0), l++
                        }! function(t, e) {
                            const n = e.directiveEnd,
                                i = t.data,
                                s = e.attrs,
                                r = [];
                            let o = null,
                                a = null;
                            for (let l = e.directiveStart; l < n; l++) {
                                const t = i[l],
                                    n = t.inputs,
                                    c = null === s || Ps(e) ? null : Cr(n, s);
                                r.push(c), o = ur(n, l, o), a = ur(t.outputs, l, a)
                            }
                            null !== o && (o.hasOwnProperty("class") && (e.flags |= 16), o.hasOwnProperty("style") && (e.flags |= 32)), e.initialInputs = r, e.inputs = o, e.outputs = a
                        }(t, n)
                    }
                    o && function(t, e, n) {
                        if (e) {
                            const i = t.localNames = [];
                            for (let t = 0; t < e.length; t += 2) {
                                const s = n[e[t + 1]];
                                if (null == s) throw new ie("301", `Export of name '${e[t+1]}' not found!`);
                                i.push(e[t], s)
                            }
                        }
                    }(n, i, o)
                }
                return n.mergedAttrs = mn(n.mergedAttrs, n.attrs), s
            }

            function fr(t, e, n, i, s, r) {
                const o = r.hostBindings;
                if (o) {
                    let n = t.hostBindingOpCodes;
                    null === n && (n = t.hostBindingOpCodes = []);
                    const r = ~e.index;
                    (function(t) {
                        let e = t.length;
                        for (; e > 0;) {
                            const n = t[--e];
                            if ("number" == typeof n && n < 0) return n
                        }
                        return 0
                    })(n) != r && n.push(r), n.push(i, s, o)
                }
            }

            function mr(t, e) {
                null !== t.hostBindings && t.hostBindings(1, e)
            }

            function gr(t, e) {
                e.flags |= 2, (t.components || (t.components = [])).push(e.index)
            }

            function _r(t, e, n) {
                if (n) {
                    if (e.exportAs)
                        for (let i = 0; i < e.exportAs.length; i++) n[e.exportAs[i]] = t;
                    ee(e) && (n[""] = t)
                }
            }

            function yr(t, e, n) {
                t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n, t.providerIndexes = e
            }

            function br(t, e, n, i, s) {
                t.data[i] = s;
                const r = s.factory || (s.factory = ne(s.type)),
                    o = new un(r, ee(s), null);
                t.blueprint[i] = o, n[i] = o, fr(t, e, 0, i, tr(t, n, s.hostVars, zs), s)
            }

            function vr(t, e, n) {
                const i = be(e, t),
                    s = lr(n),
                    r = t[10],
                    o = Tr(t, Xs(t, s, null, n.onPush ? 64 : 16, i, e, r, r.createRenderer(i, n), null, null));
                t[e.index] = o
            }

            function wr(t, e, n, i, s, r) {
                const o = r[e];
                if (null !== o) {
                    const t = i.setInput;
                    for (let e = 0; e < o.length;) {
                        const s = o[e++],
                            r = o[e++],
                            a = o[e++];
                        null !== t ? i.setInput(n, a, s, r) : n[r] = a
                    }
                }
            }

            function Cr(t, e) {
                let n = null,
                    i = 0;
                for (; i < e.length;) {
                    const s = e[i];
                    if (0 !== s)
                        if (5 !== s) {
                            if ("number" == typeof s) break;
                            t.hasOwnProperty(s) && (null === n && (n = []), n.push(s, t[s], e[i + 1])), i += 2
                        } else i += 2;
                    else i += 4
                }
                return n
            }

            function xr(t, e, n, i) {
                return new Array(t, !0, !1, e, null, 0, i, n, null, null)
            }

            function Er(t, e) {
                const n = we(e, t);
                if (Ee(n)) {
                    const t = n[1];
                    80 & n[2] ? nr(t, n, t.template, n[8]) : n[5] > 0 && Sr(n)
                }
            }

            function Sr(t) {
                for (let n = os(t); null !== n; n = as(n))
                    for (let t = Kt; t < n.length; t++) {
                        const e = n[t];
                        if (1024 & e[2]) {
                            const t = e[1];
                            nr(t, e, t.template, e[8])
                        } else e[5] > 0 && Sr(e)
                    }
                const e = t[1].components;
                if (null !== e)
                    for (let n = 0; n < e.length; n++) {
                        const i = we(e[n], t);
                        Ee(i) && i[5] > 0 && Sr(i)
                    }
            }

            function kr(t, e) {
                const n = we(e, t),
                    i = n[1];
                ! function(t, e) {
                    for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n])
                }(i, n), er(i, n, n[8])
            }

            function Tr(t, e) {
                return t[13] ? t[14][4] = e : t[13] = e, t[14] = e, e
            }

            function Ar(t) {
                for (; t;) {
                    t[2] |= 64;
                    const e = rs(t);
                    if (0 != (512 & t[2]) && !e) return t;
                    t = e
                }
                return null
            }

            function Dr(t, e, n) {
                const i = e[10];
                i.begin && i.begin();
                try {
                    nr(t, e, t.template, n)
                } catch (s) {
                    throw Nr(e, s), s
                } finally {
                    i.end && i.end()
                }
            }

            function Rr(t) {
                ! function(t) {
                    for (let e = 0; e < t.components.length; e++) {
                        const n = t.components[e],
                            i = Ce(n),
                            s = i[1];
                        ir(s, i, s.template, n)
                    }
                }(t[8])
            }

            function Ir(t, e, n) {
                $e(0), e(t, n)
            }
            const Or = (() => Promise.resolve(null))();

            function Pr(t) {
                return t[7] || (t[7] = [])
            }

            function Fr(t) {
                return t.cleanup || (t.cleanup = [])
            }

            function Lr(t, e, n) {
                return (null === t || ee(t)) && (n = function(t) {
                    for (; Array.isArray(t);) {
                        if ("object" == typeof t[1]) return t;
                        t = t[0]
                    }
                    return null
                }(n[e.index])), n[11]
            }

            function Nr(t, e) {
                const n = t[9],
                    i = n ? n.get(Xi, null) : null;
                i && i.handleError(e)
            }

            function Mr(t, e, n, i, s) {
                for (let r = 0; r < n.length;) {
                    const o = n[r++],
                        a = n[r++],
                        l = e[o],
                        c = t.data[o];
                    null !== c.setInput ? c.setInput(l, s, i, a) : l[a] = s
                }
            }

            function Vr(t, e, n) {
                let i = n ? t.styles : null,
                    s = n ? t.classes : null,
                    r = 0;
                if (null !== e)
                    for (let o = 0; o < e.length; o++) {
                        const t = e[o];
                        "number" == typeof t ? r = t : 1 == r ? s = it(s, t) : 2 == r && (i = it(i, t + ": " + e[++o] + ";"))
                    }
                n ? t.styles = i : t.stylesWithoutHost = i, n ? t.classes = s : t.classesWithoutHost = s
            }
            const jr = new Un("INJECTOR", -1);
            class Br {
                get(t, e = ri) {
                    if (e === ri) {
                        const e = new Error(`NullInjectorError: No provider for ${nt(t)}!`);
                        throw e.name = "NullInjectorError", e
                    }
                    return e
                }
            }
            const Hr = new Un("Set Injector scope."),
                zr = {},
                qr = {},
                Ur = [];
            let $r = void 0;

            function Wr() {
                return void 0 === $r && ($r = new Br), $r
            }

            function Zr(t, e = null, n = null, i) {
                return new Qr(t, n, e || Wr(), i)
            }
            class Qr {
                constructor(t, e, n, i = null) {
                    this.parent = n, this.records = new Map, this.injectorDefTypes = new Set, this.onDestroy = new Set, this._destroyed = !1;
                    const s = [];
                    e && Zn(e, n => this.processProvider(n, t, e)), Zn([t], t => this.processInjectorType(t, [], s)), this.records.set(jr, Yr(void 0, this));
                    const r = this.records.get(Hr);
                    this.scope = null != r ? r.value : null, this.source = i || ("object" == typeof t ? null : nt(t))
                }
                get destroyed() {
                    return this._destroyed
                }
                destroy() {
                    this.assertNotDestroyed(), this._destroyed = !0;
                    try {
                        this.onDestroy.forEach(t => t.ngOnDestroy())
                    } finally {
                        this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear()
                    }
                }
                get(t, e = ri, n = _t.Default) {
                    this.assertNotDestroyed();
                    const i = hi(this);
                    try {
                        if (!(n & _t.SkipSelf)) {
                            let e = this.records.get(t);
                            if (void 0 === e) {
                                const n = ("function" == typeof(s = t) || "object" == typeof s && s instanceof Un) && ht(t);
                                e = n && this.injectableDefInScope(n) ? Yr(Kr(t), zr) : null, this.records.set(t, e)
                            }
                            if (null != e) return this.hydrate(t, e)
                        }
                        return (n & _t.Self ? Wr() : this.parent).get(t, e = n & _t.Optional && e === ri ? null : e)
                    } catch (r) {
                        if ("NullInjectorError" === r.name) {
                            if ((r.ngTempTokenPath = r.ngTempTokenPath || []).unshift(nt(t)), i) throw r;
                            return function(t, e, n, i) {
                                const s = t.ngTempTokenPath;
                                throw e[ai] && s.unshift(e[ai]), t.message = function(t, e, n, i = null) {
                                    t = t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1) ? t.substr(2) : t;
                                    let s = nt(e);
                                    if (Array.isArray(e)) s = e.map(nt).join(" -> ");
                                    else if ("object" == typeof e) {
                                        let t = [];
                                        for (let n in e)
                                            if (e.hasOwnProperty(n)) {
                                                let i = e[n];
                                                t.push(n + ":" + ("string" == typeof i ? JSON.stringify(i) : nt(i)))
                                            } s = `{${t.join(", ")}}`
                                    }
                                    return `${n}${i?"("+i+")":""}[${s}]: ${t.replace(oi,"\n  ")}`
                                }("\n" + t.message, s, n, i), t.ngTokenPath = s, t.ngTempTokenPath = null, t
                            }(r, t, "R3InjectorError", this.source)
                        }
                        throw r
                    } finally {
                        hi(i)
                    }
                    var s
                }
                _resolveInjectorDefTypes() {
                    this.injectorDefTypes.forEach(t => this.get(t))
                }
                toString() {
                    const t = [];
                    return this.records.forEach((e, n) => t.push(nt(n))), `R3Injector[${t.join(", ")}]`
                }
                assertNotDestroyed() {
                    if (this._destroyed) throw new Error("Injector has already been destroyed.")
                }
                processInjectorType(t, e, n) {
                    if (!(t = ot(t))) return !1;
                    let i = dt(t);
                    const s = null == i && t.ngModule || void 0,
                        r = void 0 === s ? t : s,
                        o = -1 !== n.indexOf(r);
                    if (void 0 !== s && (i = dt(s)), null == i) return !1;
                    if (null != i.imports && !o) {
                        let t;
                        n.push(r);
                        try {
                            Zn(i.imports, i => {
                                this.processInjectorType(i, e, n) && (void 0 === t && (t = []), t.push(i))
                            })
                        } finally {}
                        if (void 0 !== t)
                            for (let e = 0; e < t.length; e++) {
                                const {
                                    ngModule: n,
                                    providers: i
                                } = t[e];
                                Zn(i, t => this.processProvider(t, n, i || Ur))
                            }
                    }
                    this.injectorDefTypes.add(r), this.records.set(r, Yr(i.factory, zr));
                    const a = i.providers;
                    if (null != a && !o) {
                        const e = t;
                        Zn(a, t => this.processProvider(t, e, a))
                    }
                    return void 0 !== s && void 0 !== t.providers
                }
                processProvider(t, e, n) {
                    let i = Jr(t = ot(t)) ? t : ot(t && t.provide);
                    const s = function(t, e, n) {
                        return Xr(t) ? Yr(void 0, t.useValue) : Yr(Gr(t), zr)
                    }(t);
                    if (Jr(t) || !0 !== t.multi) this.records.get(i);
                    else {
                        let e = this.records.get(i);
                        e || (e = Yr(void 0, zr, !0), e.factory = () => fi(e.multi), this.records.set(i, e)), i = t, e.multi.push(t)
                    }
                    this.records.set(i, s)
                }
                hydrate(t, e) {
                    var n;
                    return e.value === zr && (e.value = qr, e.value = e.factory()), "object" == typeof e.value && e.value && null !== (n = e.value) && "object" == typeof n && "function" == typeof n.ngOnDestroy && this.onDestroy.add(e.value), e.value
                }
                injectableDefInScope(t) {
                    return !!t.providedIn && ("string" == typeof t.providedIn ? "any" === t.providedIn || t.providedIn === this.scope : this.injectorDefTypes.has(t.providedIn))
                }
            }

            function Kr(t) {
                const e = ht(t),
                    n = null !== e ? e.factory : ne(t);
                if (null !== n) return n;
                const i = dt(t);
                if (null !== i) return i.factory;
                if (t instanceof Un) throw new Error(`Token ${nt(t)} is missing a \u0275prov definition.`);
                if (t instanceof Function) return function(t) {
                    const e = t.length;
                    if (e > 0) {
                        const n = Gn(e, "?");
                        throw new Error(`Can't resolve all parameters for ${nt(t)}: (${n.join(", ")}).`)
                    }
                    const n = function(t) {
                        const e = t && (t[pt] || t[mt]);
                        if (e) {
                            const n = function(t) {
                                if (t.hasOwnProperty("name")) return t.name;
                                const e = ("" + t).match(/^function\s*([^\s(]+)/);
                                return null === e ? "" : e[1]
                            }(t);
                            return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`), e
                        }
                        return null
                    }(t);
                    return null !== n ? () => n.factory(t) : () => new t
                }(t);
                throw new Error("unreachable")
            }

            function Gr(t, e, n) {
                let i = void 0;
                if (Jr(t)) {
                    const e = ot(t);
                    return ne(e) || Kr(e)
                }
                if (Xr(t)) i = () => ot(t.useValue);
                else if ((s = t) && s.useFactory) i = () => t.useFactory(...fi(t.deps || []));
                else if (function(t) {
                        return !(!t || !t.useExisting)
                    }(t)) i = () => di(ot(t.useExisting));
                else {
                    const e = ot(t && (t.useClass || t.provide));
                    if (! function(t) {
                            return !!t.deps
                        }(t)) return ne(e) || Kr(e);
                    i = () => new e(...fi(t.deps))
                }
                var s;
                return i
            }

            function Yr(t, e, n = !1) {
                return {
                    factory: t,
                    value: e,
                    multi: n ? [] : void 0
                }
            }

            function Xr(t) {
                return null !== t && "object" == typeof t && li in t
            }

            function Jr(t) {
                return "function" == typeof t
            }
            const to = function(t, e, n) {
                return function(t, e = null, n = null, i) {
                    const s = Zr(t, e, n, i);
                    return s._resolveInjectorDefTypes(), s
                }({
                    name: n
                }, e, t, n)
            };
            let eo = (() => {
                class t {
                    static create(t, e) {
                        return Array.isArray(t) ? to(t, e, "") : to(t.providers, t.parent, t.name || "")
                    }
                }
                return t.THROW_IF_NOT_FOUND = ri, t.NULL = new Br, t.\u0275prov = lt({
                    token: t,
                    providedIn: "any",
                    factory: () => di(jr)
                }), t.__NG_ELEMENT_ID__ = -1, t
            })();

            function no(t, e) {
                sn(Ce(t)[1], Pe())
            }

            function io(t) {
                let e = Object.getPrototypeOf(t.type.prototype).constructor,
                    n = !0;
                const i = [t];
                for (; e;) {
                    let s = void 0;
                    if (ee(t)) s = e.\u0275cmp || e.\u0275dir;
                    else {
                        if (e.\u0275cmp) throw new Error("Directives cannot inherit Components");
                        s = e.\u0275dir
                    }
                    if (s) {
                        if (n) {
                            i.push(s);
                            const e = t;
                            e.inputs = so(t.inputs), e.declaredInputs = so(t.declaredInputs), e.outputs = so(t.outputs);
                            const n = s.hostBindings;
                            n && ao(t, n);
                            const r = s.viewQuery,
                                o = s.contentQueries;
                            if (r && ro(t, r), o && oo(t, o), et(t.inputs, s.inputs), et(t.declaredInputs, s.declaredInputs), et(t.outputs, s.outputs), ee(s) && s.data.animation) {
                                const e = t.data;
                                e.animation = (e.animation || []).concat(s.data.animation)
                            }
                        }
                        const e = s.features;
                        if (e)
                            for (let i = 0; i < e.length; i++) {
                                const s = e[i];
                                s && s.ngInherit && s(t), s === io && (n = !1)
                            }
                    }
                    e = Object.getPrototypeOf(e)
                }! function(t) {
                    let e = 0,
                        n = null;
                    for (let i = t.length - 1; i >= 0; i--) {
                        const s = t[i];
                        s.hostVars = e += s.hostVars, s.hostAttrs = mn(s.hostAttrs, n = mn(n, s.hostAttrs))
                    }
                }(i)
            }

            function so(t) {
                return t === Dt ? {} : t === Rt ? [] : t
            }

            function ro(t, e) {
                const n = t.viewQuery;
                t.viewQuery = n ? (t, i) => {
                    e(t, i), n(t, i)
                } : e
            }

            function oo(t, e) {
                const n = t.contentQueries;
                t.contentQueries = n ? (t, i, s) => {
                    e(t, i, s), n(t, i, s)
                } : e
            }

            function ao(t, e) {
                const n = t.hostBindings;
                t.hostBindings = n ? (t, i) => {
                    e(t, i), n(t, i)
                } : e
            }
            let lo = null;

            function co() {
                if (!lo) {
                    const t = At.Symbol;
                    if (t && t.iterator) lo = t.iterator;
                    else {
                        const t = Object.getOwnPropertyNames(Map.prototype);
                        for (let e = 0; e < t.length; ++e) {
                            const n = t[e];
                            "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (lo = n)
                        }
                    }
                }
                return lo
            }

            function ho(t) {
                return !!uo(t) && (Array.isArray(t) || !(t instanceof Map) && co() in t)
            }

            function uo(t) {
                return null !== t && ("function" == typeof t || "object" == typeof t)
            }

            function po(t, e, n) {
                return !Object.is(t[e], n) && (t[e] = n, !0)
            }

            function fo(t, e, n, i) {
                const s = Re();
                return po(s, Be(), e) && (Ie(), function(t, e, n, i, s, r) {
                    const o = be(t, e);
                    ! function(t, e, n, i, s, r, o) {
                        if (null == r) me(t) ? t.removeAttribute(e, s, n) : e.removeAttribute(s);
                        else {
                            const a = null == o ? se(r) : o(r, i || "", s);
                            me(t) ? t.setAttribute(e, s, a, n) : n ? e.setAttributeNS(n, s, a) : e.setAttribute(s, a)
                        }
                    }(e[11], o, r, t.value, n, i, s)
                }(nn(), s, t, e, n, i)), fo
            }

            function mo(t, e, n, i, s, r, o, a) {
                const l = Re(),
                    c = Ie(),
                    h = t + Qt,
                    u = c.firstCreatePass ? function(t, e, n, i, s, r, o, a, l) {
                        const c = e.consts,
                            h = Js(e, t, 4, o || null, Se(c, a));
                        pr(e, n, h, Se(c, l)), sn(e, h);
                        const u = h.tViews = cr(2, h, i, s, r, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c);
                        return null !== e.queries && (e.queries.template(e, h), u.queries = e.queries.embeddedTView(h)), h
                    }(h, c, l, e, n, i, s, r, o) : c.data[h];
                Le(u, !1);
                const d = l[11].createComment("");
                Cs(c, l, d, u), Ji(d, l), Tr(l, l[h] = xr(d, l, d, u)), te(u) && or(c, l, u), null != o && ar(l, u, a)
            }

            function go(t) {
                return function(t, e) {
                    return t[e]
                }(Ae.lFrame.contextLView, Qt + t)
            }

            function _o(t, e = _t.Default) {
                const n = Re();
                return null === n ? di(t, e) : Rn(Pe(), n, ot(t), e)
            }

            function yo(t, e, n) {
                const i = Re();
                return po(i, Be(), e) && dr(Ie(), nn(), i, t, e, i[11], n, !1), yo
            }

            function bo(t, e, n, i, s) {
                const r = s ? "class" : "style";
                Mr(t, n, e.inputs[r], r, i)
            }

            function vo(t, e, n, i) {
                const s = Re(),
                    r = Ie(),
                    o = Qt + t,
                    a = s[11],
                    l = s[o] = hs(a, e, Ae.lFrame.currentNamespace),
                    c = r.firstCreatePass ? function(t, e, n, i, s, r, o) {
                        const a = e.consts,
                            l = Js(e, t, 2, s, Se(a, r));
                        return pr(e, n, l, Se(a, o)), null !== l.attrs && Vr(l, l.attrs, !1), null !== l.mergedAttrs && Vr(l, l.mergedAttrs, !0), null !== e.queries && e.queries.elementStart(e, l), l
                    }(o, r, s, 0, e, n, i) : r.data[o];
                Le(c, !0);
                const h = c.mergedAttrs;
                null !== h && dn(a, l, h);
                const u = c.classes;
                null !== u && Ds(a, l, u);
                const d = c.styles;
                null !== d && As(a, l, d), 64 != (64 & c.flags) && Cs(r, s, l, c), 0 === Ae.lFrame.elementDepthCount && Ji(l, s), Ae.lFrame.elementDepthCount++, te(c) && (or(r, s, c), rr(r, c, s)), null !== i && ar(s, c)
            }

            function wo() {
                let t = Pe();
                Ne() ? Me() : (t = t.parent, Le(t, !1));
                const e = t;
                Ae.lFrame.elementDepthCount--;
                const n = Ie();
                n.firstCreatePass && (sn(n, t), Xt(t) && n.queries.elementEnd(t)), null != e.classesWithoutHost && function(t) {
                    return 0 != (16 & t.flags)
                }(e) && bo(n, e, Re(), e.classesWithoutHost, !0), null != e.stylesWithoutHost && function(t) {
                    return 0 != (32 & t.flags)
                }(e) && bo(n, e, Re(), e.stylesWithoutHost, !1)
            }

            function Co(t, e, n, i) {
                vo(t, e, n, i), wo()
            }

            function xo(t, e, n) {
                const i = Re(),
                    s = Ie(),
                    r = t + Qt,
                    o = s.firstCreatePass ? function(t, e, n, i, s) {
                        const r = e.consts,
                            o = Se(r, i),
                            a = Js(e, t, 8, "ng-container", o);
                        return null !== o && Vr(a, o, !0), pr(e, n, a, Se(r, s)), null !== e.queries && e.queries.elementStart(e, a), a
                    }(r, s, i, e, n) : s.data[r];
                Le(o, !0);
                const a = i[r] = i[11].createComment("");
                Cs(s, i, a, o), Ji(a, i), te(o) && (or(s, i, o), rr(s, o, i)), null != n && ar(i, o)
            }

            function Eo() {
                let t = Pe();
                const e = Ie();
                Ne() ? Me() : (t = t.parent, Le(t, !1)), e.firstCreatePass && (sn(e, t), Xt(t) && e.queries.elementEnd(t))
            }

            function So() {
                return Re()
            }

            function ko(t) {
                return !!t && "function" == typeof t.then
            }

            function To(t, e, n = !1, i) {
                const s = Re(),
                    r = Ie(),
                    o = Pe();
                return Do(r, s, s[11], o, t, e, n, i), To
            }

            function Ao(t, e, n = !1, i) {
                const s = Pe(),
                    r = Re(),
                    o = Ie();
                return Do(o, r, Lr(qe(o.data), s, r), s, t, e, n, i), Ao
            }

            function Do(t, e, n, i, s, r, o = !1, a) {
                const l = te(i),
                    c = t.firstCreatePass && Fr(t),
                    h = Pr(e);
                let u = !0;
                if (3 & i.type) {
                    const d = be(i, e),
                        p = a ? a(d) : Dt,
                        f = p.target || d,
                        m = h.length,
                        g = a ? t => a(_e(t[i.index])).target : i.index;
                    if (me(n)) {
                        let o = null;
                        if (!a && l && (o = function(t, e, n, i) {
                                const s = t.cleanup;
                                if (null != s)
                                    for (let r = 0; r < s.length - 1; r += 2) {
                                        const t = s[r];
                                        if (t === n && s[r + 1] === i) {
                                            const t = e[7],
                                                n = s[r + 2];
                                            return t.length > n ? t[n] : null
                                        }
                                        "string" == typeof t && (r += 2)
                                    }
                                return null
                            }(t, e, s, i.index)), null !== o)(o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = r, o.__ngLastListenerFn__ = r, u = !1;
                        else {
                            r = Io(i, e, r, !1);
                            const t = n.listen(p.name || f, s, r);
                            h.push(r, t), c && c.push(s, g, m, m + 1)
                        }
                    } else r = Io(i, e, r, !0), f.addEventListener(s, r, o), h.push(r), c && c.push(s, g, m, o)
                } else r = Io(i, e, r, !1);
                const d = i.outputs;
                let p;
                if (u && null !== d && (p = d[s])) {
                    const t = p.length;
                    if (t)
                        for (let n = 0; n < t; n += 2) {
                            const t = e[p[n]][p[n + 1]].subscribe(r),
                                o = h.length;
                            h.push(r, t), c && c.push(s, i.index, o, -(o + 1))
                        }
                }
            }

            function Ro(t, e, n) {
                try {
                    return !1 !== e(n)
                } catch (i) {
                    return Nr(t, i), !1
                }
            }

            function Io(t, e, n, i) {
                return function s(r) {
                    if (r === Function) return n;
                    const o = 2 & t.flags ? we(t.index, e) : e;
                    0 == (32 & e[2]) && Ar(o);
                    let a = Ro(e, n, r),
                        l = s.__ngNextListenerFn__;
                    for (; l;) a = Ro(e, l, r) && a, l = l.__ngNextListenerFn__;
                    return i && !1 === a && (r.preventDefault(), r.returnValue = !1), a
                }
            }

            function Oo(t = 1) {
                return function(t) {
                    return (Ae.lFrame.contextLView = function(t, e) {
                        for (; t > 0;) e = e[15], t--;
                        return e
                    }(t, Ae.lFrame.contextLView))[8]
                }(t)
            }

            function Po(t, e) {
                let n = null;
                const i = function(t) {
                    const e = t.attrs;
                    if (null != e) {
                        const t = e.indexOf(5);
                        if (0 == (1 & t)) return e[t + 1]
                    }
                    return null
                }(t);
                for (let s = 0; s < e.length; s++) {
                    const r = e[s];
                    if ("*" !== r) {
                        if (null === i ? Vs(t, r, !0) : js(i, r)) return s
                    } else n = s
                }
                return n
            }

            function Fo(t) {
                const e = Re()[16][6];
                if (!e.projection) {
                    const n = e.projection = Gn(t ? t.length : 1, null),
                        i = n.slice();
                    let s = e.child;
                    for (; null !== s;) {
                        const e = t ? Po(s, t) : 0;
                        null !== e && (i[e] ? i[e].projectionNext = s : n[e] = s, i[e] = s), s = s.next
                    }
                }
            }

            function Lo(t, e = 0, n) {
                const i = Re(),
                    s = Ie(),
                    r = Js(s, Qt + t, 16, null, n || null);
                null === r.projection && (r.projection = e), Me(), 64 != (64 & r.flags) && function(t, e, n) {
                    Ts(e[11], 0, e, n, ms(t, n, e), vs(n.parent || e[6], n, e))
                }(s, i, r)
            }
            const No = [];

            function Mo(t, e, n, i, s) {
                const r = t[n + 1],
                    o = null === e;
                let a = i ? Ws(r) : Qs(r),
                    l = !1;
                for (; 0 !== a && (!1 === l || o);) {
                    const n = t[a + 1];
                    Vo(t[a], e) && (l = !0, t[a + 1] = i ? Gs(n) : Zs(n)), a = i ? Ws(n) : Qs(n)
                }
                l && (t[n + 1] = i ? Zs(r) : Gs(r))
            }

            function Vo(t, e) {
                return null === t || null == e || (Array.isArray(t) ? t[1] : t) === e || !(!Array.isArray(t) || "string" != typeof e) && Jn(t, e) >= 0
            }

            function jo(t, e, n) {
                return Ho(t, e, n, !1), jo
            }

            function Bo(t, e) {
                return Ho(t, e, null, !0), Bo
            }

            function Ho(t, e, n, i) {
                const s = Re(),
                    r = Ie(),
                    o = function(t) {
                        const e = Ae.lFrame,
                            n = e.bindingIndex;
                        return e.bindingIndex = e.bindingIndex + 2, n
                    }();
                r.firstUpdatePass && function(t, e, n, i) {
                    const s = t.data;
                    if (null === s[n + 1]) {
                        const r = s[tn()],
                            o = function(t, e) {
                                return e >= t.expandoStartIndex
                            }(t, n);
                        (function(t, e) {
                            return 0 != (t.flags & (e ? 16 : 32))
                        })(r, i) && null === e && !o && (e = !1), e = function(t, e, n, i) {
                                const s = qe(t);
                                let r = i ? e.residualClasses : e.residualStyles;
                                if (null === s) 0 === (i ? e.classBindings : e.styleBindings) && (n = qo(n = zo(null, t, e, n, i), e.attrs, i), r = null);
                                else {
                                    const o = e.directiveStylingLast;
                                    if (-1 === o || t[o] !== s)
                                        if (n = zo(s, t, e, n, i), null === r) {
                                            let n = function(t, e, n) {
                                                const i = n ? e.classBindings : e.styleBindings;
                                                if (0 !== Qs(i)) return t[Ws(i)]
                                            }(t, e, i);
                                            void 0 !== n && Array.isArray(n) && (n = zo(null, t, e, n[1], i), n = qo(n, e.attrs, i), function(t, e, n, i) {
                                                t[Ws(n ? e.classBindings : e.styleBindings)] = i
                                            }(t, e, i, n))
                                        } else r = function(t, e, n) {
                                            let i = void 0;
                                            const s = e.directiveEnd;
                                            for (let r = 1 + e.directiveStylingLast; r < s; r++) i = qo(i, t[r].hostAttrs, n);
                                            return qo(i, e.attrs, n)
                                        }(t, e, i)
                                }
                                return void 0 !== r && (i ? e.residualClasses = r : e.residualStyles = r), n
                            }(s, r, e, i),
                            function(t, e, n, i, s, r) {
                                let o = r ? e.classBindings : e.styleBindings,
                                    a = Ws(o),
                                    l = Qs(o);
                                t[i] = n;
                                let c, h = !1;
                                if (Array.isArray(n)) {
                                    const t = n;
                                    c = t[1], (null === c || Jn(t, c) > 0) && (h = !0)
                                } else c = n;
                                if (s)
                                    if (0 !== l) {
                                        const e = Ws(t[a + 1]);
                                        t[i + 1] = $s(e, a), 0 !== e && (t[e + 1] = Ks(t[e + 1], i)), t[a + 1] = 131071 & t[a + 1] | i << 17
                                    } else t[i + 1] = $s(a, 0), 0 !== a && (t[a + 1] = Ks(t[a + 1], i)), a = i;
                                else t[i + 1] = $s(l, 0), 0 === a ? a = i : t[l + 1] = Ks(t[l + 1], i), l = i;
                                h && (t[i + 1] = Zs(t[i + 1])), Mo(t, c, i, !0), Mo(t, c, i, !1),
                                    function(t, e, n, i, s) {
                                        const r = s ? t.residualClasses : t.residualStyles;
                                        null != r && "string" == typeof e && Jn(r, e) >= 0 && (n[i + 1] = Gs(n[i + 1]))
                                    }(e, c, t, i, r), o = $s(a, l), r ? e.classBindings = o : e.styleBindings = o
                            }(s, r, e, n, o, i)
                    }
                }(r, t, o, i), e !== zs && po(s, o, e) && function(t, e, n, i, s, r, o, a) {
                    if (!(3 & e.type)) return;
                    const l = t.data,
                        c = l[a + 1];
                    $o(1 == (1 & c) ? Uo(l, e, n, s, Qs(c), o) : void 0) || ($o(r) || function(t) {
                        return 2 == (2 & t)
                    }(c) && (r = Uo(l, null, n, s, a, o)), function(t, e, n, i, s) {
                        const r = me(t);
                        if (e) s ? r ? t.addClass(n, i) : n.classList.add(i) : r ? t.removeClass(n, i) : n.classList.remove(i);
                        else {
                            let e = -1 === i.indexOf("-") ? void 0 : is.DashCase;
                            if (null == s) r ? t.removeStyle(n, i, e) : n.style.removeProperty(i);
                            else {
                                const o = "string" == typeof s && s.endsWith("!important");
                                o && (s = s.slice(0, -10), e |= is.Important), r ? t.setStyle(n, i, s, e) : n.style.setProperty(i, s, o ? "important" : "")
                            }
                        }
                    }(i, o, ye(tn(), n), s, r))
                }(r, r.data[tn()], s, s[11], t, s[o + 1] = function(t, e) {
                    return null == t || ("string" == typeof e ? t += e : "object" == typeof t && (t = nt(xi(t)))), t
                }(e, n), i, o)
            }

            function zo(t, e, n, i, s) {
                let r = null;
                const o = n.directiveEnd;
                let a = n.directiveStylingLast;
                for (-1 === a ? a = n.directiveStart : a++; a < o && (r = e[a], i = qo(i, r.hostAttrs, s), r !== t);) a++;
                return null !== t && (n.directiveStylingLast = a), i
            }

            function qo(t, e, n) {
                const i = n ? 1 : 2;
                let s = -1;
                if (null !== e)
                    for (let r = 0; r < e.length; r++) {
                        const o = e[r];
                        "number" == typeof o ? s = o : s === i && (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]), Yn(t, o, !!n || e[++r]))
                    }
                return void 0 === t ? null : t
            }

            function Uo(t, e, n, i, s, r) {
                const o = null === e;
                let a = void 0;
                for (; s > 0;) {
                    const e = t[s],
                        r = Array.isArray(e),
                        l = r ? e[1] : e,
                        c = null === l;
                    let h = n[s + 1];
                    h === zs && (h = c ? No : void 0);
                    let u = c ? Xn(h, i) : l === i ? h : void 0;
                    if (r && !$o(u) && (u = Xn(e, i)), $o(u) && (a = u, o)) return a;
                    const d = t[s + 1];
                    s = o ? Ws(d) : Qs(d)
                }
                if (null !== e) {
                    let t = r ? e.residualClasses : e.residualStyles;
                    null != t && (a = Xn(t, i))
                }
                return a
            }

            function $o(t) {
                return void 0 !== t
            }

            function Wo(t, e = "") {
                const n = Re(),
                    i = Ie(),
                    s = t + Qt,
                    r = i.firstCreatePass ? Js(i, s, 1, e, null) : i.data[s],
                    o = n[s] = function(t, e) {
                        return me(t) ? t.createText(e) : t.createTextNode(e)
                    }(n[11], e);
                Cs(i, n, o, r), Le(r, !1)
            }

            function Zo(t) {
                return Qo("", t, ""), Zo
            }

            function Qo(t, e, n) {
                const i = Re(),
                    s = function(t, e, n, i) {
                        return po(t, Be(), n) ? e + se(n) + i : zs
                    }(i, t, e, n);
                return s !== zs && function(t, e, n) {
                    const i = ye(e, t);
                    ! function(t, e, n) {
                        me(t) ? t.setValue(e, n) : e.textContent = n
                    }(t[11], i, n)
                }(i, tn(), s), Qo
            }

            function Ko(t, e, n) {
                const i = Re();
                return po(i, Be(), e) && dr(Ie(), nn(), i, t, e, i[11], n, !0), Ko
            }

            function Go(t, e, n) {
                const i = Re();
                if (po(i, Be(), e)) {
                    const s = Ie(),
                        r = nn();
                    dr(s, r, i, t, e, Lr(qe(s.data), r, i), n, !0)
                }
                return Go
            }
            const Yo = void 0;
            var Xo = ["en", [
                    ["a", "p"],
                    ["AM", "PM"], Yo
                ],
                [
                    ["AM", "PM"], Yo, Yo
                ],
                [
                    ["S", "M", "T", "W", "T", "F", "S"],
                    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                ], Yo, [
                    ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                ], Yo, [
                    ["B", "A"],
                    ["BC", "AD"],
                    ["Before Christ", "Anno Domini"]
                ], 0, [6, 0],
                ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
                ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
                ["{1}, {0}", Yo, "{1} 'at' {0}", Yo],
                [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"],
                ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr",
                function(t) {
                    let e = Math.floor(Math.abs(t)),
                        n = t.toString().replace(/^[^.]*\.?/, "").length;
                    return 1 === e && 0 === n ? 1 : 5
                }
            ];
            let Jo = {};

            function ta(t) {
                return t in Jo || (Jo[t] = At.ng && At.ng.common && At.ng.common.locales && At.ng.common.locales[t]), Jo[t]
            }
            var ea = function(t) {
                return t[t.LocaleId = 0] = "LocaleId", t[t.DayPeriodsFormat = 1] = "DayPeriodsFormat", t[t.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", t[t.DaysFormat = 3] = "DaysFormat", t[t.DaysStandalone = 4] = "DaysStandalone", t[t.MonthsFormat = 5] = "MonthsFormat", t[t.MonthsStandalone = 6] = "MonthsStandalone", t[t.Eras = 7] = "Eras", t[t.FirstDayOfWeek = 8] = "FirstDayOfWeek", t[t.WeekendRange = 9] = "WeekendRange", t[t.DateFormat = 10] = "DateFormat", t[t.TimeFormat = 11] = "TimeFormat", t[t.DateTimeFormat = 12] = "DateTimeFormat", t[t.NumberSymbols = 13] = "NumberSymbols", t[t.NumberFormats = 14] = "NumberFormats", t[t.CurrencyCode = 15] = "CurrencyCode", t[t.CurrencySymbol = 16] = "CurrencySymbol", t[t.CurrencyName = 17] = "CurrencyName", t[t.Currencies = 18] = "Currencies", t[t.Directionality = 19] = "Directionality", t[t.PluralCase = 20] = "PluralCase", t[t.ExtraData = 21] = "ExtraData", t
            }({});
            const na = "en-US";
            let ia = na;

            function sa(t) {
                var e, n;
                n = "Expected localeId to be defined", null == (e = t) && function(t, e, n, i) {
                    throw new Error("ASSERTION ERROR: " + t + ` [Expected=> null != ${e} <=Actual]`)
                }(n, e), "string" == typeof t && (ia = t.toLowerCase().replace(/_/g, "-"))
            }

            function ra(t, e, n, i, s) {
                if (t = ot(t), Array.isArray(t))
                    for (let r = 0; r < t.length; r++) ra(t[r], e, n, i, s);
                else {
                    const r = Ie(),
                        o = Re();
                    let a = Jr(t) ? t : ot(t.provide),
                        l = Gr(t);
                    const c = Pe(),
                        h = 1048575 & c.providerIndexes,
                        u = c.directiveStart,
                        d = c.providerIndexes >> 20;
                    if (Jr(t) || !t.multi) {
                        const i = new un(l, s, _o),
                            p = la(a, e, s ? h : h + d, u); - 1 === p ? (Tn(xn(c, o), r, a), oa(r, t, e.length), e.push(a), c.directiveStart++, c.directiveEnd++, s && (c.providerIndexes += 1048576), n.push(i), o.push(i)) : (n[p] = i, o[p] = i)
                    } else {
                        const p = la(a, e, h + d, u),
                            f = la(a, e, h, h + d),
                            m = p >= 0 && n[p],
                            g = f >= 0 && n[f];
                        if (s && !g || !s && !m) {
                            Tn(xn(c, o), r, a);
                            const h = function(t, e, n, i, s) {
                                const r = new un(t, n, _o);
                                return r.multi = [], r.index = e, r.componentProviders = 0, aa(r, s, i && !n), r
                            }(s ? ha : ca, n.length, s, i, l);
                            !s && g && (n[f].providerFactory = h), oa(r, t, e.length, 0), e.push(a), c.directiveStart++, c.directiveEnd++, s && (c.providerIndexes += 1048576), n.push(h), o.push(h)
                        } else oa(r, t, p > -1 ? p : f, aa(n[s ? f : p], l, !s && i));
                        !s && i && g && n[f].componentProviders++
                    }
                }
            }

            function oa(t, e, n, i) {
                const s = Jr(e);
                if (s || e.useClass) {
                    const r = (e.useClass || e).prototype.ngOnDestroy;
                    if (r) {
                        const o = t.destroyHooks || (t.destroyHooks = []);
                        if (!s && e.multi) {
                            const t = o.indexOf(n); - 1 === t ? o.push(n, [i, r]) : o[t + 1].push(i, r)
                        } else o.push(n, r)
                    }
                }
            }

            function aa(t, e, n) {
                return n && t.componentProviders++, t.multi.push(e) - 1
            }

            function la(t, e, n, i) {
                for (let s = n; s < i; s++)
                    if (e[s] === t) return s;
                return -1
            }

            function ca(t, e, n, i) {
                return ua(this.multi, [])
            }

            function ha(t, e, n, i) {
                const s = this.multi;
                let r;
                if (this.providerFactory) {
                    const t = this.providerFactory.componentProviders,
                        e = Ln(n, n[1], this.providerFactory.index, i);
                    r = e.slice(0, t), ua(s, r);
                    for (let n = t; n < e.length; n++) r.push(e[n])
                } else r = [], ua(s, r);
                return r
            }

            function ua(t, e) {
                for (let n = 0; n < t.length; n++) e.push((0, t[n])());
                return e
            }

            function da(t, e = []) {
                return n => {
                    n.providersResolver = (n, i) => function(t, e, n) {
                        const i = Ie();
                        if (i.firstCreatePass) {
                            const s = ee(t);
                            ra(n, i.data, i.blueprint, s, !0), ra(e, i.data, i.blueprint, s, !1)
                        }
                    }(n, i ? i(t) : t, e)
                }
            }
            class pa {}
            class fa {
                resolveComponentFactory(t) {
                    throw function(t) {
                        const e = Error(`No component factory found for ${nt(t)}. Did you add it to @NgModule.entryComponents?`);
                        return e.ngComponent = t, e
                    }(t)
                }
            }
            let ma = (() => {
                class t {}
                return t.NULL = new fa, t
            })();

            function ga(...t) {}

            function _a(t, e) {
                return new ba(be(t, e))
            }
            const ya = function() {
                return _a(Pe(), Re())
            };
            let ba = (() => {
                class t {
                    constructor(t) {
                        this.nativeElement = t
                    }
                }
                return t.__NG_ELEMENT_ID__ = ya, t
            })();
            class va {}
            let wa = (() => {
                class t {}
                return t.__NG_ELEMENT_ID__ = () => Ca(), t
            })();
            const Ca = function() {
                const t = Re(),
                    e = we(Pe().index, t);
                return function(t) {
                    return t[11]
                }(Gt(e) ? e : t)
            };
            let xa = (() => {
                class t {}
                return t.\u0275prov = lt({
                    token: t,
                    providedIn: "root",
                    factory: () => null
                }), t
            })();
            class Ea {
                constructor(t) {
                    this.full = t, this.major = t.split(".")[0], this.minor = t.split(".")[1], this.patch = t.split(".").slice(2).join(".")
                }
            }
            const Sa = new Ea("11.0.9");
            class ka {
                constructor() {}
                supports(t) {
                    return ho(t)
                }
                create(t) {
                    return new Aa(t)
                }
            }
            const Ta = (t, e) => e;
            class Aa {
                constructor(t) {
                    this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || Ta
                }
                forEachItem(t) {
                    let e;
                    for (e = this._itHead; null !== e; e = e._next) t(e)
                }
                forEachOperation(t) {
                    let e = this._itHead,
                        n = this._removalsHead,
                        i = 0,
                        s = null;
                    for (; e || n;) {
                        const r = !n || e && e.currentIndex < Oa(n, i, s) ? e : n,
                            o = Oa(r, i, s),
                            a = r.currentIndex;
                        if (r === n) i--, n = n._nextRemoved;
                        else if (e = e._next, null == r.previousIndex) i++;
                        else {
                            s || (s = []);
                            const t = o - i,
                                e = a - i;
                            if (t != e) {
                                for (let n = 0; n < t; n++) {
                                    const i = n < s.length ? s[n] : s[n] = 0,
                                        r = i + n;
                                    e <= r && r < t && (s[n] = i + 1)
                                }
                                s[r.previousIndex] = e - t
                            }
                        }
                        o !== a && t(r, o, a)
                    }
                }
                forEachPreviousItem(t) {
                    let e;
                    for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e)
                }
                forEachAddedItem(t) {
                    let e;
                    for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
                }
                forEachMovedItem(t) {
                    let e;
                    for (e = this._movesHead; null !== e; e = e._nextMoved) t(e)
                }
                forEachRemovedItem(t) {
                    let e;
                    for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
                }
                forEachIdentityChange(t) {
                    let e;
                    for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e)
                }
                diff(t) {
                    if (null == t && (t = []), !ho(t)) throw new Error(`Error trying to diff '${nt(t)}'. Only arrays and iterables are allowed`);
                    return this.check(t) ? this : null
                }
                onDestroy() {}
                check(t) {
                    this._reset();
                    let e, n, i, s = this._itHead,
                        r = !1;
                    if (Array.isArray(t)) {
                        this.length = t.length;
                        for (let e = 0; e < this.length; e++) n = t[e], i = this._trackByFn(e, n), null !== s && Object.is(s.trackById, i) ? (r && (s = this._verifyReinsertion(s, n, i, e)), Object.is(s.item, n) || this._addIdentityChange(s, n)) : (s = this._mismatch(s, n, i, e), r = !0), s = s._next
                    } else e = 0,
                        function(t, e) {
                            if (Array.isArray(t))
                                for (let n = 0; n < t.length; n++) e(t[n]);
                            else {
                                const n = t[co()]();
                                let i;
                                for (; !(i = n.next()).done;) e(i.value)
                            }
                        }(t, t => {
                            i = this._trackByFn(e, t), null !== s && Object.is(s.trackById, i) ? (r && (s = this._verifyReinsertion(s, t, i, e)), Object.is(s.item, t) || this._addIdentityChange(s, t)) : (s = this._mismatch(s, t, i, e), r = !0), s = s._next, e++
                        }), this.length = e;
                    return this._truncate(s), this.collection = t, this.isDirty
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
                }
                _reset() {
                    if (this.isDirty) {
                        let t;
                        for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
                        for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
                        for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved) t.previousIndex = t.currentIndex;
                        this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                    }
                }
                _mismatch(t, e, n, i) {
                    let s;
                    return null === t ? s = this._itTail : (s = t._prev, this._remove(t)), null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, i)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, s, i)) : null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, s, i)) : t = this._addAfter(new Da(e, n), s, i), t
                }
                _verifyReinsertion(t, e, n, i) {
                    let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
                    return null !== s ? t = this._reinsertAfter(s, t._prev, i) : t.currentIndex != i && (t.currentIndex = i, this._addToMoves(t, i)), t
                }
                _truncate(t) {
                    for (; null !== t;) {
                        const e = t._next;
                        this._addToRemovals(this._unlink(t)), t = e
                    }
                    null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
                }
                _reinsertAfter(t, e, n) {
                    null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
                    const i = t._prevRemoved,
                        s = t._nextRemoved;
                    return null === i ? this._removalsHead = s : i._nextRemoved = s, null === s ? this._removalsTail = i : s._prevRemoved = i, this._insertAfter(t, e, n), this._addToMoves(t, n), t
                }
                _moveAfter(t, e, n) {
                    return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t
                }
                _addAfter(t, e, n) {
                    return this._insertAfter(t, e, n), this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t, t
                }
                _insertAfter(t, e, n) {
                    const i = null === e ? this._itHead : e._next;
                    return t._next = i, t._prev = e, null === i ? this._itTail = t : i._prev = t, null === e ? this._itHead = t : e._next = t, null === this._linkedRecords && (this._linkedRecords = new Ia), this._linkedRecords.put(t), t.currentIndex = n, t
                }
                _remove(t) {
                    return this._addToRemovals(this._unlink(t))
                }
                _unlink(t) {
                    null !== this._linkedRecords && this._linkedRecords.remove(t);
                    const e = t._prev,
                        n = t._next;
                    return null === e ? this._itHead = n : e._next = n, null === n ? this._itTail = e : n._prev = e, t
                }
                _addToMoves(t, e) {
                    return t.previousIndex === e || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t), t
                }
                _addToRemovals(t) {
                    return null === this._unlinkedRecords && (this._unlinkedRecords = new Ia), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
                }
                _addIdentityChange(t, e) {
                    return t.item = e, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t, t
                }
            }
            class Da {
                constructor(t, e) {
                    this.item = t, this.trackById = e, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
                }
            }
            class Ra {
                constructor() {
                    this._head = null, this._tail = null
                }
                add(t) {
                    null === this._head ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
                }
                get(t, e) {
                    let n;
                    for (n = this._head; null !== n; n = n._nextDup)
                        if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n;
                    return null
                }
                remove(t) {
                    const e = t._prevDup,
                        n = t._nextDup;
                    return null === e ? this._head = n : e._nextDup = n, null === n ? this._tail = e : n._prevDup = e, null === this._head
                }
            }
            class Ia {
                constructor() {
                    this.map = new Map
                }
                put(t) {
                    const e = t.trackById;
                    let n = this.map.get(e);
                    n || (n = new Ra, this.map.set(e, n)), n.add(t)
                }
                get(t, e) {
                    const n = this.map.get(t);
                    return n ? n.get(t, e) : null
                }
                remove(t) {
                    const e = t.trackById;
                    return this.map.get(e).remove(t) && this.map.delete(e), t
                }
                get isEmpty() {
                    return 0 === this.map.size
                }
                clear() {
                    this.map.clear()
                }
            }

            function Oa(t, e, n) {
                const i = t.previousIndex;
                if (null === i) return i;
                let s = 0;
                return n && i < n.length && (s = n[i]), i + e + s
            }
            class Pa {
                constructor() {}
                supports(t) {
                    return t instanceof Map || uo(t)
                }
                create() {
                    return new Fa
                }
            }
            class Fa {
                constructor() {
                    this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
                }
                forEachItem(t) {
                    let e;
                    for (e = this._mapHead; null !== e; e = e._next) t(e)
                }
                forEachPreviousItem(t) {
                    let e;
                    for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e)
                }
                forEachChangedItem(t) {
                    let e;
                    for (e = this._changesHead; null !== e; e = e._nextChanged) t(e)
                }
                forEachAddedItem(t) {
                    let e;
                    for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
                }
                forEachRemovedItem(t) {
                    let e;
                    for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
                }
                diff(t) {
                    if (t) {
                        if (!(t instanceof Map || uo(t))) throw new Error(`Error trying to diff '${nt(t)}'. Only maps and objects are allowed`)
                    } else t = new Map;
                    return this.check(t) ? this : null
                }
                onDestroy() {}
                check(t) {
                    this._reset();
                    let e = this._mapHead;
                    if (this._appendAfter = null, this._forEach(t, (t, n) => {
                            if (e && e.key === n) this._maybeAddToChanges(e, t), this._appendAfter = e, e = e._next;
                            else {
                                const i = this._getOrCreateRecordForKey(n, t);
                                e = this._insertBeforeOrAppend(e, i)
                            }
                        }), e) {
                        e._prev && (e._prev._next = null), this._removalsHead = e;
                        for (let t = e; null !== t; t = t._nextRemoved) t === this._mapHead && (this._mapHead = null), this._records.delete(t.key), t._nextRemoved = t._next, t.previousValue = t.currentValue, t.currentValue = null, t._prev = null, t._next = null
                    }
                    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
                }
                _insertBeforeOrAppend(t, e) {
                    if (t) {
                        const n = t._prev;
                        return e._next = t, e._prev = n, t._prev = e, n && (n._next = e), t === this._mapHead && (this._mapHead = e), this._appendAfter = t, t
                    }
                    return this._appendAfter ? (this._appendAfter._next = e, e._prev = this._appendAfter) : this._mapHead = e, this._appendAfter = e, null
                }
                _getOrCreateRecordForKey(t, e) {
                    if (this._records.has(t)) {
                        const n = this._records.get(t);
                        this._maybeAddToChanges(n, e);
                        const i = n._prev,
                            s = n._next;
                        return i && (i._next = s), s && (s._prev = i), n._next = null, n._prev = null, n
                    }
                    const n = new La(t);
                    return this._records.set(t, n), n.currentValue = e, this._addToAdditions(n), n
                }
                _reset() {
                    if (this.isDirty) {
                        let t;
                        for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next) t._nextPrevious = t._next;
                        for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
                        for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
                        this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                    }
                }
                _maybeAddToChanges(t, e) {
                    Object.is(e, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = e, this._addToChanges(t))
                }
                _addToAdditions(t) {
                    null === this._additionsHead ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t)
                }
                _addToChanges(t) {
                    null === this._changesHead ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t)
                }
                _forEach(t, e) {
                    t instanceof Map ? t.forEach(e) : Object.keys(t).forEach(n => e(t[n], n))
                }
            }
            class La {
                constructor(t) {
                    this.key = t, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
                }
            }
            let Na = (() => {
                    class t {
                        constructor(t) {
                            this.factories = t
                        }
                        static create(e, n) {
                            if (null != n) {
                                const t = n.factories.slice();
                                e = e.concat(t)
                            }
                            return new t(e)
                        }
                        static extend(e) {
                            return {
                                provide: t,
                                useFactory: n => {
                                    if (!n) throw new Error("Cannot extend IterableDiffers without a parent injector");
                                    return t.create(e, n)
                                },
                                deps: [
                                    [t, new ii, new ei]
                                ]
                            }
                        }
                        find(t) {
                            const e = this.factories.find(e => e.supports(t));
                            if (null != e) return e;
                            throw new Error(`Cannot find a differ supporting object '${t}' of type '${n=t,n.name||typeof n}'`);
                            var n
                        }
                    }
                    return t.\u0275prov = lt({
                        token: t,
                        providedIn: "root",
                        factory: () => new t([new ka])
                    }), t
                })(),
                Ma = (() => {
                    class t {
                        constructor(t) {
                            this.factories = t
                        }
                        static create(e, n) {
                            if (n) {
                                const t = n.factories.slice();
                                e = e.concat(t)
                            }
                            return new t(e)
                        }
                        static extend(e) {
                            return {
                                provide: t,
                                useFactory: n => {
                                    if (!n) throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                                    return t.create(e, n)
                                },
                                deps: [
                                    [t, new ii, new ei]
                                ]
                            }
                        }
                        find(t) {
                            const e = this.factories.find(e => e.supports(t));
                            if (e) return e;
                            throw new Error(`Cannot find a differ supporting object '${t}'`)
                        }
                    }
                    return t.\u0275prov = lt({
                        token: t,
                        providedIn: "root",
                        factory: () => new t([new Pa])
                    }), t
                })();

            function Va(t, e, n, i, s = !1) {
                for (; null !== n;) {
                    const r = e[n.index];
                    if (null !== r && i.push(_e(r)), Yt(r))
                        for (let t = Kt; t < r.length; t++) {
                            const e = r[t],
                                n = e[1].firstChild;
                            null !== n && Va(e[1], e, n, i)
                        }
                    const o = n.type;
                    if (8 & o) Va(t, e, n.child, i);
                    else if (32 & o) {
                        const t = ss(n, e);
                        let s;
                        for (; s = t();) i.push(s)
                    } else if (16 & o) {
                        const t = e[16],
                            s = t[6].projection[n.projection];
                        if (Array.isArray(s)) i.push(...s);
                        else {
                            const e = rs(t);
                            Va(e[1], e, s, i, !0)
                        }
                    }
                    n = s ? n.projectionNext : n.next
                }
                return i
            }
            class ja {
                constructor(t, e) {
                    this._lView = t, this._cdRefInjectingView = e, this._appRef = null, this._attachedToViewContainer = !1
                }
                get rootNodes() {
                    const t = this._lView,
                        e = t[1];
                    return Va(e, t, e.firstChild, [])
                }
                get context() {
                    return this._lView[8]
                }
                get destroyed() {
                    return 256 == (256 & this._lView[2])
                }
                destroy() {
                    if (this._appRef) this._appRef.detachView(this);
                    else if (this._attachedToViewContainer) {
                        const t = this._lView[3];
                        if (Yt(t)) {
                            const e = t[8],
                                n = e ? e.indexOf(this) : -1;
                            n > -1 && (ds(t, n), Kn(e, n))
                        }
                        this._attachedToViewContainer = !1
                    }
                    ps(this._lView[1], this._lView)
                }
                onDestroy(t) {
                    hr(this._lView[1], this._lView, null, t)
                }
                markForCheck() {
                    Ar(this._cdRefInjectingView || this._lView)
                }
                detach() {
                    this._lView[2] &= -129
                }
                reattach() {
                    this._lView[2] |= 128
                }
                detectChanges() {
                    Dr(this._lView[1], this._lView, this.context)
                }
                checkNoChanges() {
                    ! function(t, e, n) {
                        je(!0);
                        try {
                            Dr(t, e, n)
                        } finally {
                            je(!1)
                        }
                    }(this._lView[1], this._lView, this.context)
                }
                attachToViewContainerRef() {
                    if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
                    this._attachedToViewContainer = !0
                }
                detachFromAppRef() {
                    var t;
                    this._appRef = null, ks(this._lView[1], t = this._lView, t[11], 2, null, null)
                }
                attachToAppRef(t) {
                    if (this._attachedToViewContainer) throw new Error("This view is already attached to a ViewContainer!");
                    this._appRef = t
                }
            }
            class Ba extends ja {
                constructor(t) {
                    super(t), this._view = t
                }
                detectChanges() {
                    Rr(this._view)
                }
                checkNoChanges() {
                    ! function(t) {
                        je(!0);
                        try {
                            Rr(t)
                        } finally {
                            je(!1)
                        }
                    }(this._view)
                }
                get context() {
                    return null
                }
            }
            const Ha = function(t = !1) {
                return function(t, e, n) {
                    if (!n && Jt(t)) {
                        const n = we(t.index, e);
                        return new ja(n, n)
                    }
                    return 47 & t.type ? new ja(e[16], e) : null
                }(Pe(), Re(), t)
            };
            let za = (() => {
                class t {}
                return t.__NG_ELEMENT_ID__ = Ha, t.__ChangeDetectorRef__ = !0, t
            })();
            const qa = [new Pa],
                Ua = new Na([new ka]),
                $a = new Ma(qa),
                Wa = function() {
                    return Ga(Pe(), Re())
                };
            let Za = (() => {
                class t {}
                return t.__NG_ELEMENT_ID__ = Wa, t
            })();
            const Qa = Za,
                Ka = class extends Qa {
                    constructor(t, e, n) {
                        super(), this._declarationLView = t, this._declarationTContainer = e, this.elementRef = n
                    }
                    createEmbeddedView(t) {
                        const e = this._declarationTContainer.tViews,
                            n = Xs(this._declarationLView, e, t, 16, null, e.declTNode, null, null, null, null);
                        n[17] = this._declarationLView[this._declarationTContainer.index];
                        const i = this._declarationLView[19];
                        return null !== i && (n[19] = i.createEmbeddedView(e)), er(e, n, t), new ja(n)
                    }
                };

            function Ga(t, e) {
                return 4 & t.type ? new Ka(e, t, _a(t, e)) : null
            }
            class Ya {}
            const Xa = function() {
                return sl(Pe(), Re())
            };
            let Ja = (() => {
                class t {}
                return t.__NG_ELEMENT_ID__ = Xa, t
            })();
            const tl = Ja,
                el = class extends tl {
                    constructor(t, e, n) {
                        super(), this._lContainer = t, this._hostTNode = e, this._hostLView = n
                    }
                    get element() {
                        return _a(this._hostTNode, this._hostLView)
                    }
                    get injector() {
                        return new Vn(this._hostTNode, this._hostLView)
                    }
                    get parentInjector() {
                        const t = kn(this._hostTNode, this._hostLView);
                        if (_n(t)) {
                            const e = bn(t, this._hostLView),
                                n = yn(t);
                            return new Vn(e[1].data[n + 8], e)
                        }
                        return new Vn(null, this._hostLView)
                    }
                    clear() {
                        for (; this.length > 0;) this.remove(this.length - 1)
                    }
                    get(t) {
                        const e = nl(this._lContainer);
                        return null !== e && e[t] || null
                    }
                    get length() {
                        return this._lContainer.length - Kt
                    }
                    createEmbeddedView(t, e, n) {
                        const i = t.createEmbeddedView(e || {});
                        return this.insert(i, n), i
                    }
                    createComponent(t, e, n, i, s) {
                        const r = n || this.parentInjector;
                        if (!s && null == t.ngModule && r) {
                            const t = r.get(Ya, null);
                            t && (s = t)
                        }
                        const o = t.create(r, i, void 0, s);
                        return this.insert(o.hostView, e), o
                    }
                    insert(t, e) {
                        const n = t._lView,
                            i = n[1];
                        if (Yt(n[3])) {
                            const e = this.indexOf(t);
                            if (-1 !== e) this.detach(e);
                            else {
                                const e = n[3],
                                    i = new el(e, e[6], e[3]);
                                i.detach(i.indexOf(t))
                            }
                        }
                        const s = this._adjustIndex(e),
                            r = this._lContainer;
                        ! function(t, e, n, i) {
                            const s = Kt + i,
                                r = n.length;
                            i > 0 && (n[s - 1][4] = e), i < r - Kt ? (e[4] = n[s], Qn(n, Kt + i, e)) : (n.push(e), e[4] = null), e[3] = n;
                            const o = e[17];
                            null !== o && n !== o && function(t, e) {
                                const n = t[9];
                                e[16] !== e[3][3][16] && (t[2] = !0), null === n ? t[9] = [e] : n.push(e)
                            }(o, e);
                            const a = e[19];
                            null !== a && a.insertView(t), e[2] |= 128
                        }(i, n, r, s);
                        const o = Es(s, r),
                            a = n[11],
                            l = bs(a, r[7]);
                        return null !== l && function(t, e, n, i, s, r) {
                            i[0] = s, i[6] = e, ks(t, i, n, 1, s, r)
                        }(i, r[6], a, n, l, o), t.attachToViewContainerRef(), Qn(il(r), s, t), t
                    }
                    move(t, e) {
                        return this.insert(t, e)
                    }
                    indexOf(t) {
                        const e = nl(this._lContainer);
                        return null !== e ? e.indexOf(t) : -1
                    }
                    remove(t) {
                        const e = this._adjustIndex(t, -1),
                            n = ds(this._lContainer, e);
                        n && (Kn(il(this._lContainer), e), ps(n[1], n))
                    }
                    detach(t) {
                        const e = this._adjustIndex(t, -1),
                            n = ds(this._lContainer, e);
                        return n && null != Kn(il(this._lContainer), e) ? new ja(n) : null
                    }
                    _adjustIndex(t, e = 0) {
                        return null == t ? this.length + e : t
                    }
                };

            function nl(t) {
                return t[8]
            }

            function il(t) {
                return t[8] || (t[8] = [])
            }

            function sl(t, e) {
                let n;
                const i = e[t.index];
                if (Yt(i)) n = i;
                else {
                    let s;
                    if (8 & t.type) s = _e(i);
                    else {
                        const n = e[11];
                        s = n.createComment("");
                        const i = be(t, e);
                        gs(n, bs(n, i), s, function(t, e) {
                            return me(t) ? t.nextSibling(e) : e.nextSibling
                        }(n, i), !1)
                    }
                    e[t.index] = n = xr(i, e, s, t), Tr(e, n)
                }
                return new el(n, t, e)
            }
            const rl = {};
            class ol extends ma {
                constructor(t) {
                    super(), this.ngModule = t
                }
                resolveComponentFactory(t) {
                    const e = Wt(t);
                    return new cl(e, this.ngModule)
                }
            }

            function al(t) {
                const e = [];
                for (let n in t) t.hasOwnProperty(n) && e.push({
                    propName: t[n],
                    templateName: n
                });
                return e
            }
            const ll = new Un("SCHEDULER_TOKEN", {
                providedIn: "root",
                factory: () => ts
            });
            class cl extends pa {
                constructor(t, e) {
                    super(), this.componentDef = t, this.ngModule = e, this.componentType = t.type, this.selector = t.selectors.map(Hs).join(","), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!e
                }
                get inputs() {
                    return al(this.componentDef.inputs)
                }
                get outputs() {
                    return al(this.componentDef.outputs)
                }
                create(t, e, n, i) {
                    const s = (i = i || this.ngModule) ? function(t, e) {
                            return {
                                get: (n, i, s) => {
                                    const r = t.get(n, rl, s);
                                    return r !== rl || i === rl ? r : e.get(n, i, s)
                                }
                            }
                        }(t, i.injector) : t,
                        r = s.get(va, ge),
                        o = s.get(xa, null),
                        a = r.createRenderer(null, this.componentDef),
                        l = this.componentDef.selectors[0][0] || "div",
                        c = n ? function(t, e, n) {
                            if (me(t)) return t.selectRootElement(e, n === xt.ShadowDom);
                            let i = "string" == typeof e ? t.querySelector(e) : e;
                            return i.textContent = "", i
                        }(a, n, this.componentDef.encapsulation) : hs(r.createRenderer(null, this.componentDef), l, function(t) {
                            const e = t.toLowerCase();
                            return "svg" === e ? pe : "math" === e ? "http://www.w3.org/1998/MathML/" : null
                        }(l)),
                        h = this.componentDef.onPush ? 576 : 528,
                        u = {
                            components: [],
                            scheduler: ts,
                            clean: Or,
                            playerHandler: null,
                            flags: 0
                        },
                        d = cr(0, null, null, 1, 0, null, null, null, null, null),
                        p = Xs(null, d, u, h, null, null, r, a, o, s);
                    let f, m;
                    Qe(p);
                    try {
                        const t = function(t, e, n, i, s, r) {
                            const o = n[1];
                            n[20] = t;
                            const a = Js(o, 20, 2, "#host", null),
                                l = a.mergedAttrs = e.hostAttrs;
                            null !== l && (Vr(a, l, !0), null !== t && (dn(s, t, l), null !== a.classes && Ds(s, t, a.classes), null !== a.styles && As(s, t, a.styles)));
                            const c = i.createRenderer(t, e),
                                h = Xs(n, lr(e), null, e.onPush ? 64 : 16, n[20], a, i, c, null, null);
                            return o.firstCreatePass && (Tn(xn(a, n), o, e.type), gr(o, a), yr(a, n.length, 1)), Tr(n, h), n[20] = h
                        }(c, this.componentDef, p, r, a);
                        if (c)
                            if (n) dn(a, c, ["ng-version", Sa.full]);
                            else {
                                const {
                                    attrs: t,
                                    classes: e
                                } = function(t) {
                                    const e = [],
                                        n = [];
                                    let i = 1,
                                        s = 2;
                                    for (; i < t.length;) {
                                        let r = t[i];
                                        if ("string" == typeof r) 2 === s ? "" !== r && e.push(r, t[++i]) : 8 === s && n.push(r);
                                        else {
                                            if (!Ns(s)) break;
                                            s = r
                                        }
                                        i++
                                    }
                                    return {
                                        attrs: e,
                                        classes: n
                                    }
                                }(this.componentDef.selectors[0]);
                                t && dn(a, c, t), e && e.length > 0 && Ds(a, c, e.join(" "))
                            } if (m = ve(d, Qt), void 0 !== e) {
                            const t = m.projection = [];
                            for (let n = 0; n < this.ngContentSelectors.length; n++) {
                                const i = e[n];
                                t.push(null != i ? Array.from(i) : null)
                            }
                        }
                        f = function(t, e, n, i, s) {
                            const r = n[1],
                                o = function(t, e, n) {
                                    const i = Pe();
                                    t.firstCreatePass && (n.providersResolver && n.providersResolver(n), br(t, i, e, tr(t, e, 1, null), n));
                                    const s = Ln(e, t, i.directiveStart, i);
                                    Ji(s, e);
                                    const r = be(i, e);
                                    return r && Ji(r, e), s
                                }(r, n, e);
                            if (i.components.push(o), t[8] = o, s && s.forEach(t => t(o, e)), e.contentQueries) {
                                const t = Pe();
                                e.contentQueries(1, o, t.directiveStart)
                            }
                            const a = Pe();
                            return !r.firstCreatePass || null === e.hostBindings && null === e.hostAttrs || (en(a.index), fr(n[1], a, 0, a.directiveStart, a.directiveEnd, e), mr(e, o)), o
                        }(t, this.componentDef, p, u, [no]), er(d, p, null)
                    } finally {
                        Je()
                    }
                    return new hl(this.componentType, f, _a(m, p), p, m)
                }
            }
            class hl extends class {} {
                constructor(t, e, n, i, s) {
                    super(), this.location = n, this._rootLView = i, this._tNode = s, this.instance = e, this.hostView = this.changeDetectorRef = new Ba(i), this.componentType = t
                }
                get injector() {
                    return new Vn(this._tNode, this._rootLView)
                }
                destroy() {
                    this.hostView.destroy()
                }
                onDestroy(t) {
                    this.hostView.onDestroy(t)
                }
            }
            const ul = new Map;
            class dl extends Ya {
                constructor(t, e) {
                    super(), this._parent = e, this._bootstrapComponents = [], this.injector = this, this.destroyCbs = [], this.componentFactoryResolver = new ol(this);
                    const n = Zt(t),
                        i = t[Lt] || null;
                    i && sa(i), this._bootstrapComponents = ns(n.bootstrap), this._r3Injector = Zr(t, e, [{
                        provide: Ya,
                        useValue: this
                    }, {
                        provide: ma,
                        useValue: this.componentFactoryResolver
                    }], nt(t)), this._r3Injector._resolveInjectorDefTypes(), this.instance = this.get(t)
                }
                get(t, e = eo.THROW_IF_NOT_FOUND, n = _t.Default) {
                    return t === eo || t === Ya || t === jr ? this : this._r3Injector.get(t, e, n)
                }
                destroy() {
                    const t = this._r3Injector;
                    !t.destroyed && t.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
                }
                onDestroy(t) {
                    this.destroyCbs.push(t)
                }
            }
            class pl extends class {} {
                constructor(t) {
                    super(), this.moduleType = t, null !== Zt(t) && function(t) {
                        const e = new Set;
                        ! function t(n) {
                            const i = Zt(n, !0),
                                s = i.id;
                            null !== s && (function(t, e, n) {
                                if (e && e !== n) throw new Error(`Duplicate module registered for ${t} - ${nt(e)} vs ${nt(e.name)}`)
                            }(s, ul.get(s), n), ul.set(s, n));
                            const r = ns(i.imports);
                            for (const o of r) e.has(o) || (e.add(o), t(o))
                        }(t)
                    }(t)
                }
                create(t) {
                    return new dl(this.moduleType, t)
                }
            }

            function fl(t, e, n) {
                const i = function() {
                        const t = Ae.lFrame;
                        let e = t.bindingRootIndex;
                        return -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
                    }() + t,
                    s = Re();
                return s[i] === zs ? function(t, e, n) {
                    return t[e] = n
                }(s, i, n ? e.call(n) : e()) : function(t, e) {
                    return t[e]
                }(s, i)
            }
            const ml = class extends x {
                constructor(t = !1) {
                    super(), this.__isAsync = t
                }
                emit(t) {
                    super.next(t)
                }
                subscribe(t, e, n) {
                    let i, s = t => null,
                        r = () => null;
                    t && "object" == typeof t ? (i = this.__isAsync ? e => {
                        setTimeout(() => t.next(e))
                    } : e => {
                        t.next(e)
                    }, t.error && (s = this.__isAsync ? e => {
                        setTimeout(() => t.error(e))
                    } : e => {
                        t.error(e)
                    }), t.complete && (r = this.__isAsync ? () => {
                        setTimeout(() => t.complete())
                    } : () => {
                        t.complete()
                    })) : (i = this.__isAsync ? e => {
                        setTimeout(() => t(e))
                    } : e => {
                        t(e)
                    }, e && (s = this.__isAsync ? t => {
                        setTimeout(() => e(t))
                    } : t => {
                        e(t)
                    }), n && (r = this.__isAsync ? () => {
                        setTimeout(() => n())
                    } : () => {
                        n()
                    }));
                    const o = super.subscribe(i, s, r);
                    return t instanceof u && t.add(o), o
                }
            };

            function gl() {
                return this._results[co()]()
            }
            class _l {
                constructor() {
                    this.dirty = !0, this._results = [], this.changes = new ml, this.length = 0;
                    const t = co(),
                        e = _l.prototype;
                    e[t] || (e[t] = gl)
                }
                map(t) {
                    return this._results.map(t)
                }
                filter(t) {
                    return this._results.filter(t)
                }
                find(t) {
                    return this._results.find(t)
                }
                reduce(t, e) {
                    return this._results.reduce(t, e)
                }
                forEach(t) {
                    this._results.forEach(t)
                }
                some(t) {
                    return this._results.some(t)
                }
                toArray() {
                    return this._results.slice()
                }
                toString() {
                    return this._results.toString()
                }
                reset(t) {
                    this._results = Wn(t), this.dirty = !1, this.length = this._results.length, this.last = this._results[this.length - 1], this.first = this._results[0]
                }
                notifyOnChanges() {
                    this.changes.emit(this)
                }
                setDirty() {
                    this.dirty = !0
                }
                destroy() {
                    this.changes.complete(), this.changes.unsubscribe()
                }
            }
            class yl {
                constructor(t) {
                    this.queryList = t, this.matches = null
                }
                clone() {
                    return new yl(this.queryList)
                }
                setDirty() {
                    this.queryList.setDirty()
                }
            }
            class bl {
                constructor(t = []) {
                    this.queries = t
                }
                createEmbeddedView(t) {
                    const e = t.queries;
                    if (null !== e) {
                        const n = null !== t.contentQueries ? t.contentQueries[0] : e.length,
                            i = [];
                        for (let t = 0; t < n; t++) {
                            const n = e.getByIndex(t);
                            i.push(this.queries[n.indexInDeclarationView].clone())
                        }
                        return new bl(i)
                    }
                    return null
                }
                insertView(t) {
                    this.dirtyQueriesWithMatches(t)
                }
                detachView(t) {
                    this.dirtyQueriesWithMatches(t)
                }
                dirtyQueriesWithMatches(t) {
                    for (let e = 0; e < this.queries.length; e++) null !== Ml(t, e).matches && this.queries[e].setDirty()
                }
            }
            class vl {
                constructor(t, e, n, i = null) {
                    this.predicate = t, this.descendants = e, this.isStatic = n, this.read = i
                }
            }
            class wl {
                constructor(t = []) {
                    this.queries = t
                }
                elementStart(t, e) {
                    for (let n = 0; n < this.queries.length; n++) this.queries[n].elementStart(t, e)
                }
                elementEnd(t) {
                    for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(t)
                }
                embeddedTView(t) {
                    let e = null;
                    for (let n = 0; n < this.length; n++) {
                        const i = null !== e ? e.length : 0,
                            s = this.getByIndex(n).embeddedTView(t, i);
                        s && (s.indexInDeclarationView = n, null !== e ? e.push(s) : e = [s])
                    }
                    return null !== e ? new wl(e) : null
                }
                template(t, e) {
                    for (let n = 0; n < this.queries.length; n++) this.queries[n].template(t, e)
                }
                getByIndex(t) {
                    return this.queries[t]
                }
                get length() {
                    return this.queries.length
                }
                track(t) {
                    this.queries.push(t)
                }
            }
            class Cl {
                constructor(t, e = -1) {
                    this.metadata = t, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = e
                }
                elementStart(t, e) {
                    this.isApplyingToNode(e) && this.matchTNode(t, e)
                }
                elementEnd(t) {
                    this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
                }
                template(t, e) {
                    this.elementStart(t, e)
                }
                embeddedTView(t, e) {
                    return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, e), new Cl(this.metadata)) : null
                }
                isApplyingToNode(t) {
                    if (this._appliesToNextNode && !1 === this.metadata.descendants) {
                        const e = this._declarationNodeIndex;
                        let n = t.parent;
                        for (; null !== n && 8 & n.type && n.index !== e;) n = n.parent;
                        return e === (null !== n ? n.index : -1)
                    }
                    return this._appliesToNextNode
                }
                matchTNode(t, e) {
                    const n = this.metadata.predicate;
                    if (Array.isArray(n))
                        for (let i = 0; i < n.length; i++) {
                            const s = n[i];
                            this.matchTNodeWithReadOption(t, e, xl(e, s)), this.matchTNodeWithReadOption(t, e, Fn(e, t, s, !1, !1))
                        } else n === Za ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1) : this.matchTNodeWithReadOption(t, e, Fn(e, t, n, !1, !1))
                }
                matchTNodeWithReadOption(t, e, n) {
                    if (null !== n) {
                        const i = this.metadata.read;
                        if (null !== i)
                            if (i === ba || i === Ja || i === Za && 4 & e.type) this.addMatch(e.index, -2);
                            else {
                                const n = Fn(e, t, i, !1, !1);
                                null !== n && this.addMatch(e.index, n)
                            }
                        else this.addMatch(e.index, n)
                    }
                }
                addMatch(t, e) {
                    null === this.matches ? this.matches = [t, e] : this.matches.push(t, e)
                }
            }

            function xl(t, e) {
                const n = t.localNames;
                if (null !== n)
                    for (let i = 0; i < n.length; i += 2)
                        if (n[i] === e) return n[i + 1];
                return null
            }

            function El(t, e, n, i) {
                return -1 === n ? function(t, e) {
                    return 11 & t.type ? _a(t, e) : 4 & t.type ? Ga(t, e) : null
                }(e, t) : -2 === n ? function(t, e, n) {
                    return n === ba ? _a(e, t) : n === Za ? Ga(e, t) : n === Ja ? sl(e, t) : void 0
                }(t, e, i) : Ln(t, t[1], n, e)
            }

            function Sl(t, e, n, i) {
                const s = e[19].queries[i];
                if (null === s.matches) {
                    const i = t.data,
                        r = n.matches,
                        o = [];
                    for (let t = 0; t < r.length; t += 2) {
                        const s = r[t];
                        o.push(s < 0 ? null : El(e, i[s], r[t + 1], n.metadata.read))
                    }
                    s.matches = o
                }
                return s.matches
            }

            function kl(t, e, n, i) {
                const s = t.queries.getByIndex(n),
                    r = s.matches;
                if (null !== r) {
                    const o = Sl(t, e, s, n);
                    for (let t = 0; t < r.length; t += 2) {
                        const n = r[t];
                        if (n > 0) i.push(o[t / 2]);
                        else {
                            const s = r[t + 1],
                                o = e[-n];
                            for (let t = Kt; t < o.length; t++) {
                                const e = o[t];
                                e[17] === e[3] && kl(e[1], e, s, i)
                            }
                            if (null !== o[9]) {
                                const t = o[9];
                                for (let e = 0; e < t.length; e++) {
                                    const n = t[e];
                                    kl(n[1], n, s, i)
                                }
                            }
                        }
                    }
                }
                return i
            }

            function Tl(t) {
                const e = Re(),
                    n = Ie(),
                    i = Ue();
                $e(i + 1);
                const s = Ml(n, i);
                if (t.dirty && xe(e) === s.metadata.isStatic) {
                    if (null === s.matches) t.reset([]);
                    else {
                        const r = s.crossesNgTemplate ? kl(n, e, i, []) : Sl(n, e, s, i);
                        t.reset(r), t.notifyOnChanges()
                    }
                    return !0
                }
                return !1
            }

            function Al(t, e, n) {
                Rl(Ie(), Re(), t, e, n, !0)
            }

            function Dl(t, e, n) {
                Rl(Ie(), Re(), t, e, n, !1)
            }

            function Rl(t, e, n, i, s, r) {
                t.firstCreatePass && (Nl(t, new vl(n, i, r, s), -1), r && (t.staticViewQueries = !0)), Ll(t, e)
            }

            function Il(t, e, n, i) {
                Pl(Ie(), Re(), e, n, i, !1, Pe(), t)
            }

            function Ol(t, e, n, i) {
                Pl(Ie(), Re(), e, n, i, !0, Pe(), t)
            }

            function Pl(t, e, n, i, s, r, o, a) {
                t.firstCreatePass && (Nl(t, new vl(n, i, r, s), o.index), function(t, e) {
                    const n = t.contentQueries || (t.contentQueries = []);
                    e !== (n.length ? n[n.length - 1] : -1) && n.push(t.queries.length - 1, e)
                }(t, a), r && (t.staticContentQueries = !0)), Ll(t, e)
            }

            function Fl() {
                return t = Re(), e = Ue(), t[19].queries[e].queryList;
                var t, e
            }

            function Ll(t, e) {
                const n = new _l;
                hr(t, e, n, n.destroy), null === e[19] && (e[19] = new bl), e[19].queries.push(new yl(n))
            }

            function Nl(t, e, n) {
                null === t.queries && (t.queries = new wl), t.queries.track(new Cl(e, n))
            }

            function Ml(t, e) {
                return t.queries.getByIndex(e)
            }
            const Vl = new Un("Application Initializer");
            let jl = (() => {
                class t {
                    constructor(t) {
                        this.appInits = t, this.resolve = ga, this.reject = ga, this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, e) => {
                            this.resolve = t, this.reject = e
                        })
                    }
                    runInitializers() {
                        if (this.initialized) return;
                        const t = [],
                            e = () => {
                                this.done = !0, this.resolve()
                            };
                        if (this.appInits)
                            for (let n = 0; n < this.appInits.length; n++) {
                                const e = this.appInits[n]();
                                ko(e) && t.push(e)
                            }
                        Promise.all(t).then(() => {
                            e()
                        }).catch(t => {
                            this.reject(t)
                        }), 0 === t.length && e(), this.initialized = !0
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(Vl, 8))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            const Bl = new Un("AppId"),
                Hl = {
                    provide: Bl,
                    useFactory: function() {
                        return `${zl()}${zl()}${zl()}`
                    },
                    deps: []
                };

            function zl() {
                return String.fromCharCode(97 + Math.floor(25 * Math.random()))
            }
            const ql = new Un("Platform Initializer"),
                Ul = new Un("Platform ID"),
                $l = new Un("appBootstrapListener");
            let Wl = (() => {
                class t {
                    log(t) {
                        console.log(t)
                    }
                    warn(t) {
                        console.warn(t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            const Zl = new Un("LocaleId"),
                Ql = new Un("DefaultCurrencyCode");
            class Kl {
                constructor(t, e) {
                    this.ngModuleFactory = t, this.componentFactories = e
                }
            }
            const Gl = function(t) {
                    return new pl(t)
                },
                Yl = Gl,
                Xl = function(t) {
                    return Promise.resolve(Gl(t))
                },
                Jl = function(t) {
                    const e = Gl(t),
                        n = ns(Zt(t).declarations).reduce((t, e) => {
                            const n = Wt(e);
                            return n && t.push(new cl(n)), t
                        }, []);
                    return new Kl(e, n)
                },
                tc = Jl,
                ec = function(t) {
                    return Promise.resolve(Jl(t))
                };
            let nc = (() => {
                class t {
                    constructor() {
                        this.compileModuleSync = Yl, this.compileModuleAsync = Xl, this.compileModuleAndAllComponentsSync = tc, this.compileModuleAndAllComponentsAsync = ec
                    }
                    clearCache() {}
                    clearCacheFor(t) {}
                    getModuleId(t) {}
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            const ic = (() => Promise.resolve(0))();

            function sc(t) {
                "undefined" == typeof Zone ? ic.then(() => {
                    t && t.apply(null, null)
                }) : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
            }
            class rc {
                constructor({
                    enableLongStackTrace: t = !1,
                    shouldCoalesceEventChangeDetection: e = !1
                }) {
                    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new ml(!1), this.onMicrotaskEmpty = new ml(!1), this.onStable = new ml(!1), this.onError = new ml(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
                    Zone.assertZonePatched();
                    const n = this;
                    n._nesting = 0, n._outer = n._inner = Zone.current, Zone.TaskTrackingZoneSpec && (n._inner = n._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (n._inner = n._inner.fork(Zone.longStackTraceZoneSpec)), n.shouldCoalesceEventChangeDetection = e, n.lastRequestAnimationFrameId = -1, n.nativeRequestAnimationFrame = function() {
                            let t = At.requestAnimationFrame,
                                e = At.cancelAnimationFrame;
                            if ("undefined" != typeof Zone && t && e) {
                                const n = t[Zone.__symbol__("OriginalDelegate")];
                                n && (t = n);
                                const i = e[Zone.__symbol__("OriginalDelegate")];
                                i && (e = i)
                            }
                            return {
                                nativeRequestAnimationFrame: t,
                                nativeCancelAnimationFrame: e
                            }
                        }().nativeRequestAnimationFrame,
                        function(t) {
                            const e = !!t.shouldCoalesceEventChangeDetection && t.nativeRequestAnimationFrame && (() => {
                                ! function(t) {
                                    -1 === t.lastRequestAnimationFrameId && (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(At, () => {
                                        t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                            t.lastRequestAnimationFrameId = -1, lc(t), ac(t)
                                        }, void 0, () => {}, () => {})), t.fakeTopEventTask.invoke()
                                    }), lc(t))
                                }(t)
                            });
                            t._inner = t._inner.fork({
                                name: "angular",
                                properties: {
                                    isAngularZone: !0,
                                    maybeDelayChangeDetection: e
                                },
                                onInvokeTask: (n, i, s, r, o, a) => {
                                    try {
                                        return cc(t), n.invokeTask(s, r, o, a)
                                    } finally {
                                        e && "eventTask" === r.type && e(), hc(t)
                                    }
                                },
                                onInvoke: (e, n, i, s, r, o, a) => {
                                    try {
                                        return cc(t), e.invoke(i, s, r, o, a)
                                    } finally {
                                        hc(t)
                                    }
                                },
                                onHasTask: (e, n, i, s) => {
                                    e.hasTask(i, s), n === i && ("microTask" == s.change ? (t._hasPendingMicrotasks = s.microTask, lc(t), ac(t)) : "macroTask" == s.change && (t.hasPendingMacrotasks = s.macroTask))
                                },
                                onHandleError: (e, n, i, s) => (e.handleError(i, s), t.runOutsideAngular(() => t.onError.emit(s)), !1)
                            })
                        }(n)
                }
                static isInAngularZone() {
                    return !0 === Zone.current.get("isAngularZone")
                }
                static assertInAngularZone() {
                    if (!rc.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!")
                }
                static assertNotInAngularZone() {
                    if (rc.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!")
                }
                run(t, e, n) {
                    return this._inner.run(t, e, n)
                }
                runTask(t, e, n, i) {
                    const s = this._inner,
                        r = s.scheduleEventTask("NgZoneEvent: " + i, t, oc, ga, ga);
                    try {
                        return s.runTask(r, e, n)
                    } finally {
                        s.cancelTask(r)
                    }
                }
                runGuarded(t, e, n) {
                    return this._inner.runGuarded(t, e, n)
                }
                runOutsideAngular(t) {
                    return this._outer.run(t)
                }
            }
            const oc = {};

            function ac(t) {
                if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable) try {
                    t._nesting++, t.onMicrotaskEmpty.emit(null)
                } finally {
                    if (t._nesting--, !t.hasPendingMicrotasks) try {
                        t.runOutsideAngular(() => t.onStable.emit(null))
                    } finally {
                        t.isStable = !0
                    }
                }
            }

            function lc(t) {
                t.hasPendingMicrotasks = !!(t._hasPendingMicrotasks || t.shouldCoalesceEventChangeDetection && -1 !== t.lastRequestAnimationFrameId)
            }

            function cc(t) {
                t._nesting++, t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
            }

            function hc(t) {
                t._nesting--, ac(t)
            }
            class uc {
                constructor() {
                    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new ml, this.onMicrotaskEmpty = new ml, this.onStable = new ml, this.onError = new ml
                }
                run(t, e, n) {
                    return t.apply(e, n)
                }
                runGuarded(t, e, n) {
                    return t.apply(e, n)
                }
                runOutsideAngular(t) {
                    return t()
                }
                runTask(t, e, n, i) {
                    return t.apply(e, n)
                }
            }
            let dc = (() => {
                    class t {
                        constructor(t) {
                            this._ngZone = t, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), t.run(() => {
                                this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                            })
                        }
                        _watchAngularEvents() {
                            this._ngZone.onUnstable.subscribe({
                                next: () => {
                                    this._didWork = !0, this._isZoneStable = !1
                                }
                            }), this._ngZone.runOutsideAngular(() => {
                                this._ngZone.onStable.subscribe({
                                    next: () => {
                                        rc.assertNotInAngularZone(), sc(() => {
                                            this._isZoneStable = !0, this._runCallbacksIfReady()
                                        })
                                    }
                                })
                            })
                        }
                        increasePendingRequestCount() {
                            return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                        }
                        decreasePendingRequestCount() {
                            if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                            return this._runCallbacksIfReady(), this._pendingCount
                        }
                        isStable() {
                            return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                        }
                        _runCallbacksIfReady() {
                            if (this.isStable()) sc(() => {
                                for (; 0 !== this._callbacks.length;) {
                                    let t = this._callbacks.pop();
                                    clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                                }
                                this._didWork = !1
                            });
                            else {
                                let t = this.getPendingTasks();
                                this._callbacks = this._callbacks.filter(e => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)), this._didWork = !0
                            }
                        }
                        getPendingTasks() {
                            return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                                source: t.source,
                                creationLocation: t.creationLocation,
                                data: t.data
                            })) : []
                        }
                        addCallback(t, e, n) {
                            let i = -1;
                            e && e > 0 && (i = setTimeout(() => {
                                this._callbacks = this._callbacks.filter(t => t.timeoutId !== i), t(this._didWork, this.getPendingTasks())
                            }, e)), this._callbacks.push({
                                doneCb: t,
                                timeoutId: i,
                                updateCb: n
                            })
                        }
                        whenStable(t, e, n) {
                            if (n && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                            this.addCallback(t, e, n), this._runCallbacksIfReady()
                        }
                        getPendingRequestCount() {
                            return this._pendingCount
                        }
                        findProviders(t, e, n) {
                            return []
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(rc))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                pc = (() => {
                    class t {
                        constructor() {
                            this._applications = new Map, gc.addToWindow(this)
                        }
                        registerApplication(t, e) {
                            this._applications.set(t, e)
                        }
                        unregisterApplication(t) {
                            this._applications.delete(t)
                        }
                        unregisterAllApplications() {
                            this._applications.clear()
                        }
                        getTestability(t) {
                            return this._applications.get(t) || null
                        }
                        getAllTestabilities() {
                            return Array.from(this._applications.values())
                        }
                        getAllRootElements() {
                            return Array.from(this._applications.keys())
                        }
                        findTestabilityInTree(t, e = !0) {
                            return gc.findTestabilityInTree(this, t, e)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })();
            class fc {
                addToWindow(t) {}
                findTestabilityInTree(t, e, n) {
                    return null
                }
            }
            let mc, gc = new fc,
                _c = !0,
                yc = !1;

            function bc() {
                return yc = !0, _c
            }
            const vc = new Un("AllowMultipleToken");

            function wc(t, e, n = []) {
                const i = "Platform: " + e,
                    s = new Un(i);
                return (e = []) => {
                    let r = Cc();
                    if (!r || r.injector.get(vc, !1))
                        if (t) t(n.concat(e).concat({
                            provide: s,
                            useValue: !0
                        }));
                        else {
                            const t = n.concat(e).concat({
                                provide: s,
                                useValue: !0
                            }, {
                                provide: Hr,
                                useValue: "platform"
                            });
                            ! function(t) {
                                if (mc && !mc.destroyed && !mc.injector.get(vc, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                                mc = t.get(xc);
                                const e = t.get(ql, null);
                                e && e.forEach(t => t())
                            }(eo.create({
                                providers: t,
                                name: i
                            }))
                        } return function(t) {
                        const e = Cc();
                        if (!e) throw new Error("No platform exists!");
                        if (!e.injector.get(t, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                        return e
                    }(s)
                }
            }

            function Cc() {
                return mc && !mc.destroyed ? mc : null
            }
            let xc = (() => {
                class t {
                    constructor(t) {
                        this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                    }
                    bootstrapModuleFactory(t, e) {
                        const n = function(t, e) {
                                let n;
                                return n = "noop" === t ? new uc : ("zone.js" === t ? void 0 : t) || new rc({
                                    enableLongStackTrace: bc(),
                                    shouldCoalesceEventChangeDetection: e
                                }), n
                            }(e ? e.ngZone : void 0, e && e.ngZoneEventCoalescing || !1),
                            i = [{
                                provide: rc,
                                useValue: n
                            }];
                        return n.run(() => {
                            const e = eo.create({
                                    providers: i,
                                    parent: this.injector,
                                    name: t.moduleType.name
                                }),
                                s = t.create(e),
                                r = s.injector.get(Xi, null);
                            if (!r) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                            return n.runOutsideAngular(() => {
                                    const t = n.onError.subscribe({
                                        next: t => {
                                            r.handleError(t)
                                        }
                                    });
                                    s.onDestroy(() => {
                                        kc(this._modules, s), t.unsubscribe()
                                    })
                                }),
                                function(t, e, n) {
                                    try {
                                        const i = n();
                                        return ko(i) ? i.catch(n => {
                                            throw e.runOutsideAngular(() => t.handleError(n)), n
                                        }) : i
                                    } catch (i) {
                                        throw e.runOutsideAngular(() => t.handleError(i)), i
                                    }
                                }(r, n, () => {
                                    const t = s.injector.get(jl);
                                    return t.runInitializers(), t.donePromise.then(() => (sa(s.injector.get(Zl, na) || na), this._moduleDoBootstrap(s), s))
                                })
                        })
                    }
                    bootstrapModule(t, e = []) {
                        const n = Ec({}, e);
                        return function(t, e, n) {
                            const i = new pl(n);
                            return Promise.resolve(i)
                        }(0, 0, t).then(t => this.bootstrapModuleFactory(t, n))
                    }
                    _moduleDoBootstrap(t) {
                        const e = t.injector.get(Sc);
                        if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(t => e.bootstrap(t));
                        else {
                            if (!t.instance.ngDoBootstrap) throw new Error(`The module ${nt(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
                            t.instance.ngDoBootstrap(e)
                        }
                        this._modules.push(t)
                    }
                    onDestroy(t) {
                        this._destroyListeners.push(t)
                    }
                    get injector() {
                        return this._injector
                    }
                    destroy() {
                        if (this._destroyed) throw new Error("The platform has already been destroyed!");
                        this._modules.slice().forEach(t => t.destroy()), this._destroyListeners.forEach(t => t()), this._destroyed = !0
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(eo))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();

            function Ec(t, e) {
                return Array.isArray(e) ? e.reduce(Ec, t) : Object.assign(Object.assign({}, t), e)
            }
            let Sc = (() => {
                class t {
                    constructor(t, e, n, i, s, r) {
                        this._zone = t, this._console = e, this._injector = n, this._exceptionHandler = i, this._componentFactoryResolver = s, this._initStatus = r, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                            next: () => {
                                this._zone.run(() => {
                                    this.tick()
                                })
                            }
                        });
                        const o = new y(t => {
                                this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                                    t.next(this._stable), t.complete()
                                })
                            }),
                            a = new y(t => {
                                let e;
                                this._zone.runOutsideAngular(() => {
                                    e = this._zone.onStable.subscribe(() => {
                                        rc.assertNotInAngularZone(), sc(() => {
                                            this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0, t.next(!0))
                                        })
                                    })
                                });
                                const n = this._zone.onUnstable.subscribe(() => {
                                    rc.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                        t.next(!1)
                                    }))
                                });
                                return () => {
                                    e.unsubscribe(), n.unsubscribe()
                                }
                            });
                        this.isStable = $(o, a.pipe(J()))
                    }
                    bootstrap(t, e) {
                        if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                        let n;
                        n = t instanceof pa ? t : this._componentFactoryResolver.resolveComponentFactory(t), this.componentTypes.push(n.componentType);
                        const i = n.isBoundToModule ? void 0 : this._injector.get(Ya),
                            s = n.create(eo.NULL, [], e || n.selector, i),
                            r = s.location.nativeElement,
                            o = s.injector.get(dc, null),
                            a = o && s.injector.get(pc);
                        return o && a && a.registerApplication(r, o), s.onDestroy(() => {
                            this.detachView(s.hostView), kc(this.components, s), a && a.unregisterApplication(r)
                        }), this._loadComponent(s), bc() && this._console.log("Angular is running in development mode. Call enableProdMode() to enable production mode."), s
                    }
                    tick() {
                        if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
                        try {
                            this._runningTick = !0;
                            for (let t of this._views) t.detectChanges()
                        } catch (t) {
                            this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t))
                        } finally {
                            this._runningTick = !1
                        }
                    }
                    attachView(t) {
                        const e = t;
                        this._views.push(e), e.attachToAppRef(this)
                    }
                    detachView(t) {
                        const e = t;
                        kc(this._views, e), e.detachFromAppRef()
                    }
                    _loadComponent(t) {
                        this.attachView(t.hostView), this.tick(), this.components.push(t), this._injector.get($l, []).concat(this._bootstrapListeners).forEach(e => e(t))
                    }
                    ngOnDestroy() {
                        this._views.slice().forEach(t => t.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
                    }
                    get viewCount() {
                        return this._views.length
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(rc), di(Wl), di(eo), di(Xi), di(ma), di(jl))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();

            function kc(t, e) {
                const n = t.indexOf(e);
                n > -1 && t.splice(n, 1)
            }
            const Tc = wc(null, "core", [{
                    provide: Ul,
                    useValue: "unknown"
                }, {
                    provide: xc,
                    deps: [eo]
                }, {
                    provide: pc,
                    deps: []
                }, {
                    provide: Wl,
                    deps: []
                }]),
                Ac = [{
                    provide: Sc,
                    useClass: Sc,
                    deps: [rc, Wl, eo, Xi, ma, jl]
                }, {
                    provide: ll,
                    deps: [rc],
                    useFactory: function(t) {
                        let e = [];
                        return t.onStable.subscribe(() => {
                                for (; e.length;) e.pop()()
                            }),
                            function(t) {
                                e.push(t)
                            }
                    }
                }, {
                    provide: jl,
                    useClass: jl,
                    deps: [
                        [new ei, Vl]
                    ]
                }, {
                    provide: nc,
                    useClass: nc,
                    deps: []
                }, Hl, {
                    provide: Na,
                    useFactory: function() {
                        return Ua
                    },
                    deps: []
                }, {
                    provide: Ma,
                    useFactory: function() {
                        return $a
                    },
                    deps: []
                }, {
                    provide: Zl,
                    useFactory: function(t) {
                        return sa(t = t || "undefined" != typeof $localize && $localize.locale || na), t
                    },
                    deps: [
                        [new ti(Zl), new ei, new ii]
                    ]
                }, {
                    provide: Ql,
                    useValue: "USD"
                }];
            let Dc = (() => {
                class t {
                    constructor(t) {}
                }
                return t.\u0275mod = qt({
                    type: t
                }), t.\u0275inj = ct({
                    factory: function(e) {
                        return new(e || t)(di(Sc))
                    },
                    providers: Ac
                }), t
            })();
            const Rc = [];
            let Ic = null;

            function Oc() {
                return Ic
            }
            const Pc = new Un("DocumentToken");
            let Fc = (() => {
                class t {}
                return t.\u0275fac = function(e) {
                    return new(e || t)
                }, t.\u0275prov = lt({
                    factory: Lc,
                    token: t,
                    providedIn: "platform"
                }), t
            })();

            function Lc() {
                return di(Nc)
            }
            let Nc = (() => {
                class t extends Fc {
                    constructor(t) {
                        super(), this._doc = t, this._init()
                    }
                    _init() {
                        this.location = Oc().getLocation(), this._history = Oc().getHistory()
                    }
                    getBaseHrefFromDOM() {
                        return Oc().getBaseHref(this._doc)
                    }
                    onPopState(t) {
                        Oc().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", t, !1)
                    }
                    onHashChange(t) {
                        Oc().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", t, !1)
                    }
                    get href() {
                        return this.location.href
                    }
                    get protocol() {
                        return this.location.protocol
                    }
                    get hostname() {
                        return this.location.hostname
                    }
                    get port() {
                        return this.location.port
                    }
                    get pathname() {
                        return this.location.pathname
                    }
                    get search() {
                        return this.location.search
                    }
                    get hash() {
                        return this.location.hash
                    }
                    set pathname(t) {
                        this.location.pathname = t
                    }
                    pushState(t, e, n) {
                        Mc() ? this._history.pushState(t, e, n) : this.location.hash = n
                    }
                    replaceState(t, e, n) {
                        Mc() ? this._history.replaceState(t, e, n) : this.location.hash = n
                    }
                    forward() {
                        this._history.forward()
                    }
                    back() {
                        this._history.back()
                    }
                    getState() {
                        return this._history.state
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(Pc))
                }, t.\u0275prov = lt({
                    factory: Vc,
                    token: t,
                    providedIn: "platform"
                }), t
            })();

            function Mc() {
                return !!window.history.pushState
            }

            function Vc() {
                return new Nc(di(Pc))
            }

            function jc(t, e) {
                if (0 == t.length) return e;
                if (0 == e.length) return t;
                let n = 0;
                return t.endsWith("/") && n++, e.startsWith("/") && n++, 2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
            }

            function Bc(t) {
                const e = t.match(/#|\?|$/),
                    n = e && e.index || t.length;
                return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
            }

            function Hc(t) {
                return t && "?" !== t[0] ? "?" + t : t
            }
            let zc = (() => {
                class t {}
                return t.\u0275fac = function(e) {
                    return new(e || t)
                }, t.\u0275prov = lt({
                    factory: qc,
                    token: t,
                    providedIn: "root"
                }), t
            })();

            function qc(t) {
                const e = di(Pc).location;
                return new $c(di(Fc), e && e.origin || "")
            }
            const Uc = new Un("appBaseHref");
            let $c = (() => {
                    class t extends zc {
                        constructor(t, e) {
                            if (super(), this._platformLocation = t, null == e && (e = this._platformLocation.getBaseHrefFromDOM()), null == e) throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                            this._baseHref = e
                        }
                        onPopState(t) {
                            this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t)
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        prepareExternalUrl(t) {
                            return jc(this._baseHref, t)
                        }
                        path(t = !1) {
                            const e = this._platformLocation.pathname + Hc(this._platformLocation.search),
                                n = this._platformLocation.hash;
                            return n && t ? `${e}${n}` : e
                        }
                        pushState(t, e, n, i) {
                            const s = this.prepareExternalUrl(n + Hc(i));
                            this._platformLocation.pushState(t, e, s)
                        }
                        replaceState(t, e, n, i) {
                            const s = this.prepareExternalUrl(n + Hc(i));
                            this._platformLocation.replaceState(t, e, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Fc), di(Uc, 8))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                Wc = (() => {
                    class t {
                        constructor(t, e) {
                            this._subject = new ml, this._urlChangeListeners = [], this._platformStrategy = t;
                            const n = this._platformStrategy.getBaseHref();
                            this._platformLocation = e, this._baseHref = Bc(Qc(n)), this._platformStrategy.onPopState(t => {
                                this._subject.emit({
                                    url: this.path(!0),
                                    pop: !0,
                                    state: t.state,
                                    type: t.type
                                })
                            })
                        }
                        path(t = !1) {
                            return this.normalize(this._platformStrategy.path(t))
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        isCurrentPathEqualTo(t, e = "") {
                            return this.path() == this.normalize(t + Hc(e))
                        }
                        normalize(e) {
                            return t.stripTrailingSlash(function(t, e) {
                                return t && e.startsWith(t) ? e.substring(t.length) : e
                            }(this._baseHref, Qc(e)))
                        }
                        prepareExternalUrl(t) {
                            return t && "/" !== t[0] && (t = "/" + t), this._platformStrategy.prepareExternalUrl(t)
                        }
                        go(t, e = "", n = null) {
                            this._platformStrategy.pushState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Hc(e)), n)
                        }
                        replaceState(t, e = "", n = null) {
                            this._platformStrategy.replaceState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Hc(e)), n)
                        }
                        forward() {
                            this._platformStrategy.forward()
                        }
                        back() {
                            this._platformStrategy.back()
                        }
                        onUrlChange(t) {
                            this._urlChangeListeners.push(t), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(t => {
                                this._notifyUrlChangeListeners(t.url, t.state)
                            }))
                        }
                        _notifyUrlChangeListeners(t = "", e) {
                            this._urlChangeListeners.forEach(n => n(t, e))
                        }
                        subscribe(t, e, n) {
                            return this._subject.subscribe({
                                next: t,
                                error: e,
                                complete: n
                            })
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(zc), di(Fc))
                    }, t.normalizeQueryParams = Hc, t.joinWithSlash = jc, t.stripTrailingSlash = Bc, t.\u0275prov = lt({
                        factory: Zc,
                        token: t,
                        providedIn: "root"
                    }), t
                })();

            function Zc() {
                return new Wc(di(zc), di(Fc))
            }

            function Qc(t) {
                return t.replace(/\/index.html$/, "")
            }
            var Kc = function(t) {
                return t[t.Zero = 0] = "Zero", t[t.One = 1] = "One", t[t.Two = 2] = "Two", t[t.Few = 3] = "Few", t[t.Many = 4] = "Many", t[t.Other = 5] = "Other", t
            }({});
            class Gc {}
            let Yc = (() => {
                class t extends Gc {
                    constructor(t) {
                        super(), this.locale = t
                    }
                    getPluralCategory(t, e) {
                        switch (function(t) {
                                return function(t) {
                                    const e = function(t) {
                                        return t.toLowerCase().replace(/_/g, "-")
                                    }(t);
                                    let n = ta(e);
                                    if (n) return n;
                                    const i = e.split("-")[0];
                                    if (n = ta(i), n) return n;
                                    if ("en" === i) return Xo;
                                    throw new Error(`Missing locale data for the locale "${t}".`)
                                }(t)[ea.PluralCase]
                            }(e || this.locale)(t)) {
                            case Kc.Zero:
                                return "zero";
                            case Kc.One:
                                return "one";
                            case Kc.Two:
                                return "two";
                            case Kc.Few:
                                return "few";
                            case Kc.Many:
                                return "many";
                            default:
                                return "other"
                        }
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(Zl))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();

            function Xc(t, e) {
                e = encodeURIComponent(e);
                for (const n of t.split(";")) {
                    const t = n.indexOf("="),
                        [i, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
                    if (i.trim() === e) return decodeURIComponent(s)
                }
                return null
            }
            let Jc = (() => {
                class t {
                    constructor(t, e) {
                        this._viewContainer = t, this._context = new th, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = e
                    }
                    set ngIf(t) {
                        this._context.$implicit = this._context.ngIf = t, this._updateView()
                    }
                    set ngIfThen(t) {
                        eh("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView()
                    }
                    set ngIfElse(t) {
                        eh("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView()
                    }
                    _updateView() {
                        this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                    }
                    static ngTemplateContextGuard(t, e) {
                        return !0
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(Ja), _o(Za))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["", "ngIf", ""]
                    ],
                    inputs: {
                        ngIf: "ngIf",
                        ngIfThen: "ngIfThen",
                        ngIfElse: "ngIfElse"
                    }
                }), t
            })();
            class th {
                constructor() {
                    this.$implicit = null, this.ngIf = null
                }
            }

            function eh(t, e) {
                if (e && !e.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${nt(e)}'.`)
            }
            class nh {
                constructor(t, e) {
                    this._viewContainerRef = t, this._templateRef = e, this._created = !1
                }
                create() {
                    this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef)
                }
                destroy() {
                    this._created = !1, this._viewContainerRef.clear()
                }
                enforceState(t) {
                    t && !this._created ? this.create() : !t && this._created && this.destroy()
                }
            }
            let ih = (() => {
                    class t {
                        constructor() {
                            this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1
                        }
                        set ngSwitch(t) {
                            this._ngSwitch = t, 0 === this._caseCount && this._updateDefaultCases(!0)
                        }
                        _addCase() {
                            return this._caseCount++
                        }
                        _addDefault(t) {
                            this._defaultViews || (this._defaultViews = []), this._defaultViews.push(t)
                        }
                        _matchCase(t) {
                            const e = t == this._ngSwitch;
                            return this._lastCasesMatched = this._lastCasesMatched || e, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), e
                        }
                        _updateDefaultCases(t) {
                            if (this._defaultViews && t !== this._defaultUsed) {
                                this._defaultUsed = t;
                                for (let e = 0; e < this._defaultViews.length; e++) this._defaultViews[e].enforceState(t)
                            }
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "ngSwitch", ""]
                        ],
                        inputs: {
                            ngSwitch: "ngSwitch"
                        }
                    }), t
                })(),
                sh = (() => {
                    class t {
                        constructor(t, e, n) {
                            this.ngSwitch = n, n._addCase(), this._view = new nh(t, e)
                        }
                        ngDoCheck() {
                            this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(Ja), _o(Za), _o(ih, 1))
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "ngSwitchCase", ""]
                        ],
                        inputs: {
                            ngSwitchCase: "ngSwitchCase"
                        }
                    }), t
                })(),
                rh = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [{
                            provide: Gc,
                            useClass: Yc
                        }]
                    }), t
                })();
            class oh extends class extends class {} {
                constructor() {
                    super()
                }
                supportsDOMEvents() {
                    return !0
                }
            } {
                static makeCurrent() {
                    var t;
                    t = new oh, Ic || (Ic = t)
                }
                getProperty(t, e) {
                    return t[e]
                }
                log(t) {
                    window.console && window.console.log && window.console.log(t)
                }
                logGroup(t) {
                    window.console && window.console.group && window.console.group(t)
                }
                logGroupEnd() {
                    window.console && window.console.groupEnd && window.console.groupEnd()
                }
                onAndCancel(t, e, n) {
                    return t.addEventListener(e, n, !1), () => {
                        t.removeEventListener(e, n, !1)
                    }
                }
                dispatchEvent(t, e) {
                    t.dispatchEvent(e)
                }
                remove(t) {
                    return t.parentNode && t.parentNode.removeChild(t), t
                }
                getValue(t) {
                    return t.value
                }
                createElement(t, e) {
                    return (e = e || this.getDefaultDocument()).createElement(t)
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument("fakeTitle")
                }
                getDefaultDocument() {
                    return document
                }
                isElementNode(t) {
                    return t.nodeType === Node.ELEMENT_NODE
                }
                isShadowRoot(t) {
                    return t instanceof DocumentFragment
                }
                getGlobalEventTarget(t, e) {
                    return "window" === e ? window : "document" === e ? t : "body" === e ? t.body : null
                }
                getHistory() {
                    return window.history
                }
                getLocation() {
                    return window.location
                }
                getBaseHref(t) {
                    const e = lh || (lh = document.querySelector("base"), lh) ? lh.getAttribute("href") : null;
                    return null == e ? null : (n = e, ah || (ah = document.createElement("a")), ah.setAttribute("href", n), "/" === ah.pathname.charAt(0) ? ah.pathname : "/" + ah.pathname);
                    var n
                }
                resetBaseElement() {
                    lh = null
                }
                getUserAgent() {
                    return window.navigator.userAgent
                }
                performanceNow() {
                    return window.performance && window.performance.now ? window.performance.now() : (new Date).getTime()
                }
                supportsCookies() {
                    return !0
                }
                getCookie(t) {
                    return Xc(document.cookie, t)
                }
            }
            let ah, lh = null;
            const ch = new Un("TRANSITION_ID"),
                hh = [{
                    provide: Vl,
                    useFactory: function(t, e, n) {
                        return () => {
                            n.get(jl).donePromise.then(() => {
                                const n = Oc();
                                Array.prototype.slice.apply(e.querySelectorAll("style[ng-transition]")).filter(e => e.getAttribute("ng-transition") === t).forEach(t => n.remove(t))
                            })
                        }
                    },
                    deps: [ch, Pc, eo],
                    multi: !0
                }];
            class uh {
                static init() {
                    var t;
                    t = new uh, gc = t
                }
                addToWindow(t) {
                    At.getAngularTestability = (e, n = !0) => {
                        const i = t.findTestabilityInTree(e, n);
                        if (null == i) throw new Error("Could not find testability for element.");
                        return i
                    }, At.getAllAngularTestabilities = () => t.getAllTestabilities(), At.getAllAngularRootElements = () => t.getAllRootElements(), At.frameworkStabilizers || (At.frameworkStabilizers = []), At.frameworkStabilizers.push(t => {
                        const e = At.getAllAngularTestabilities();
                        let n = e.length,
                            i = !1;
                        const s = function(e) {
                            i = i || e, n--, 0 == n && t(i)
                        };
                        e.forEach(function(t) {
                            t.whenStable(s)
                        })
                    })
                }
                findTestabilityInTree(t, e, n) {
                    if (null == e) return null;
                    const i = t.getTestability(e);
                    return null != i ? i : n ? Oc().isShadowRoot(e) ? this.findTestabilityInTree(t, e.host, !0) : this.findTestabilityInTree(t, e.parentElement, !0) : null
                }
            }
            const dh = new Un("EventManagerPlugins");
            let ph = (() => {
                class t {
                    constructor(t, e) {
                        this._zone = e, this._eventNameToPlugin = new Map, t.forEach(t => t.manager = this), this._plugins = t.slice().reverse()
                    }
                    addEventListener(t, e, n) {
                        return this._findPluginFor(e).addEventListener(t, e, n)
                    }
                    addGlobalEventListener(t, e, n) {
                        return this._findPluginFor(e).addGlobalEventListener(t, e, n)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(t) {
                        const e = this._eventNameToPlugin.get(t);
                        if (e) return e;
                        const n = this._plugins;
                        for (let i = 0; i < n.length; i++) {
                            const e = n[i];
                            if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e
                        }
                        throw new Error("No event manager plugin found for event " + t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(dh), di(rc))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            class fh {
                constructor(t) {
                    this._doc = t
                }
                addGlobalEventListener(t, e, n) {
                    const i = Oc().getGlobalEventTarget(this._doc, t);
                    if (!i) throw new Error(`Unsupported event target ${i} for event ${e}`);
                    return this.addEventListener(i, e, n)
                }
            }
            let mh = (() => {
                    class t {
                        constructor() {
                            this._stylesSet = new Set
                        }
                        addStyles(t) {
                            const e = new Set;
                            t.forEach(t => {
                                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t))
                            }), this.onStylesAdded(e)
                        }
                        onStylesAdded(t) {}
                        getAllStyles() {
                            return Array.from(this._stylesSet)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                gh = (() => {
                    class t extends mh {
                        constructor(t) {
                            super(), this._doc = t, this._hostNodes = new Set, this._styleNodes = new Set, this._hostNodes.add(t.head)
                        }
                        _addStylesToHost(t, e) {
                            t.forEach(t => {
                                const n = this._doc.createElement("style");
                                n.textContent = t, this._styleNodes.add(e.appendChild(n))
                            })
                        }
                        addHost(t) {
                            this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t)
                        }
                        removeHost(t) {
                            this._hostNodes.delete(t)
                        }
                        onStylesAdded(t) {
                            this._hostNodes.forEach(e => this._addStylesToHost(t, e))
                        }
                        ngOnDestroy() {
                            this._styleNodes.forEach(t => Oc().remove(t))
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Pc))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })();
            const _h = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: "http://www.w3.org/1999/xhtml",
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/"
                },
                yh = /%COMP%/g;

            function bh(t, e, n) {
                for (let i = 0; i < e.length; i++) {
                    let s = e[i];
                    Array.isArray(s) ? bh(t, s, n) : (s = s.replace(yh, t), n.push(s))
                }
                return n
            }

            function vh(t) {
                return e => {
                    if ("__ngUnwrap__" === e) return t;
                    !1 === t(e) && (e.preventDefault(), e.returnValue = !1)
                }
            }
            let wh = (() => {
                class t {
                    constructor(t, e, n) {
                        this.eventManager = t, this.sharedStylesHost = e, this.appId = n, this.rendererByCompId = new Map, this.defaultRenderer = new Ch(t)
                    }
                    createRenderer(t, e) {
                        if (!t || !e) return this.defaultRenderer;
                        switch (e.encapsulation) {
                            case xt.Emulated: {
                                let n = this.rendererByCompId.get(e.id);
                                return n || (n = new xh(this.eventManager, this.sharedStylesHost, e, this.appId), this.rendererByCompId.set(e.id, n)), n.applyToHost(t), n
                            }
                            case 1:
                            case xt.ShadowDom:
                                return new Eh(this.eventManager, this.sharedStylesHost, t, e);
                            default:
                                if (!this.rendererByCompId.has(e.id)) {
                                    const t = bh(e.id, e.styles, []);
                                    this.sharedStylesHost.addStyles(t), this.rendererByCompId.set(e.id, this.defaultRenderer)
                                }
                                return this.defaultRenderer
                        }
                    }
                    begin() {}
                    end() {}
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(ph), di(gh), di(Bl))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            class Ch {
                constructor(t) {
                    this.eventManager = t, this.data = Object.create(null)
                }
                destroy() {}
                createElement(t, e) {
                    return e ? document.createElementNS(_h[e] || e, t) : document.createElement(t)
                }
                createComment(t) {
                    return document.createComment(t)
                }
                createText(t) {
                    return document.createTextNode(t)
                }
                appendChild(t, e) {
                    t.appendChild(e)
                }
                insertBefore(t, e, n) {
                    t && t.insertBefore(e, n)
                }
                removeChild(t, e) {
                    t && t.removeChild(e)
                }
                selectRootElement(t, e) {
                    let n = "string" == typeof t ? document.querySelector(t) : t;
                    if (!n) throw new Error(`The selector "${t}" did not match any elements`);
                    return e || (n.textContent = ""), n
                }
                parentNode(t) {
                    return t.parentNode
                }
                nextSibling(t) {
                    return t.nextSibling
                }
                setAttribute(t, e, n, i) {
                    if (i) {
                        e = i + ":" + e;
                        const s = _h[i];
                        s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n)
                    } else t.setAttribute(e, n)
                }
                removeAttribute(t, e, n) {
                    if (n) {
                        const i = _h[n];
                        i ? t.removeAttributeNS(i, e) : t.removeAttribute(`${n}:${e}`)
                    } else t.removeAttribute(e)
                }
                addClass(t, e) {
                    t.classList.add(e)
                }
                removeClass(t, e) {
                    t.classList.remove(e)
                }
                setStyle(t, e, n, i) {
                    i & (is.DashCase | is.Important) ? t.style.setProperty(e, n, i & is.Important ? "important" : "") : t.style[e] = n
                }
                removeStyle(t, e, n) {
                    n & is.DashCase ? t.style.removeProperty(e) : t.style[e] = ""
                }
                setProperty(t, e, n) {
                    t[e] = n
                }
                setValue(t, e) {
                    t.nodeValue = e
                }
                listen(t, e, n) {
                    return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, e, vh(n)) : this.eventManager.addEventListener(t, e, vh(n))
                }
            }
            class xh extends Ch {
                constructor(t, e, n, i) {
                    super(t), this.component = n;
                    const s = bh(i + "-" + n.id, n.styles, []);
                    e.addStyles(s), this.contentAttr = "_ngcontent-%COMP%".replace(yh, i + "-" + n.id), this.hostAttr = "_nghost-%COMP%".replace(yh, i + "-" + n.id)
                }
                applyToHost(t) {
                    super.setAttribute(t, this.hostAttr, "")
                }
                createElement(t, e) {
                    const n = super.createElement(t, e);
                    return super.setAttribute(n, this.contentAttr, ""), n
                }
            }
            class Eh extends Ch {
                constructor(t, e, n, i) {
                    super(t), this.sharedStylesHost = e, this.hostEl = n, this.shadowRoot = n.attachShadow({
                        mode: "open"
                    }), this.sharedStylesHost.addHost(this.shadowRoot);
                    const s = bh(i.id, i.styles, []);
                    for (let r = 0; r < s.length; r++) {
                        const t = document.createElement("style");
                        t.textContent = s[r], this.shadowRoot.appendChild(t)
                    }
                }
                nodeOrShadowRoot(t) {
                    return t === this.hostEl ? this.shadowRoot : t
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot)
                }
                appendChild(t, e) {
                    return super.appendChild(this.nodeOrShadowRoot(t), e)
                }
                insertBefore(t, e, n) {
                    return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
                }
                removeChild(t, e) {
                    return super.removeChild(this.nodeOrShadowRoot(t), e)
                }
                parentNode(t) {
                    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
                }
            }
            let Sh = (() => {
                class t extends fh {
                    constructor(t) {
                        super(t)
                    }
                    supports(t) {
                        return !0
                    }
                    addEventListener(t, e, n) {
                        return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n)
                    }
                    removeEventListener(t, e, n) {
                        return t.removeEventListener(e, n)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(Pc))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            const kh = ["alt", "control", "meta", "shift"],
                Th = {
                    "\b": "Backspace",
                    "\t": "Tab",
                    "\x7f": "Delete",
                    "\x1b": "Escape",
                    Del: "Delete",
                    Esc: "Escape",
                    Left: "ArrowLeft",
                    Right: "ArrowRight",
                    Up: "ArrowUp",
                    Down: "ArrowDown",
                    Menu: "ContextMenu",
                    Scroll: "ScrollLock",
                    Win: "OS"
                },
                Ah = {
                    A: "1",
                    B: "2",
                    C: "3",
                    D: "4",
                    E: "5",
                    F: "6",
                    G: "7",
                    H: "8",
                    I: "9",
                    J: "*",
                    K: "+",
                    M: "-",
                    N: ".",
                    O: "/",
                    "`": "0",
                    "\x90": "NumLock"
                },
                Dh = {
                    alt: t => t.altKey,
                    control: t => t.ctrlKey,
                    meta: t => t.metaKey,
                    shift: t => t.shiftKey
                };
            let Rh = (() => {
                    class t extends fh {
                        constructor(t) {
                            super(t)
                        }
                        supports(e) {
                            return null != t.parseEventName(e)
                        }
                        addEventListener(e, n, i) {
                            const s = t.parseEventName(n),
                                r = t.eventCallback(s.fullKey, i, this.manager.getZone());
                            return this.manager.getZone().runOutsideAngular(() => Oc().onAndCancel(e, s.domEventName, r))
                        }
                        static parseEventName(e) {
                            const n = e.toLowerCase().split("."),
                                i = n.shift();
                            if (0 === n.length || "keydown" !== i && "keyup" !== i) return null;
                            const s = t._normalizeKey(n.pop());
                            let r = "";
                            if (kh.forEach(t => {
                                    const e = n.indexOf(t);
                                    e > -1 && (n.splice(e, 1), r += t + ".")
                                }), r += s, 0 != n.length || 0 === s.length) return null;
                            const o = {};
                            return o.domEventName = i, o.fullKey = r, o
                        }
                        static getEventFullKey(t) {
                            let e = "",
                                n = function(t) {
                                    let e = t.key;
                                    if (null == e) {
                                        if (e = t.keyIdentifier, null == e) return "Unidentified";
                                        e.startsWith("U+") && (e = String.fromCharCode(parseInt(e.substring(2), 16)), 3 === t.location && Ah.hasOwnProperty(e) && (e = Ah[e]))
                                    }
                                    return Th[e] || e
                                }(t);
                            return n = n.toLowerCase(), " " === n ? n = "space" : "." === n && (n = "dot"), kh.forEach(i => {
                                i != n && (0, Dh[i])(t) && (e += i + ".")
                            }), e += n, e
                        }
                        static eventCallback(e, n, i) {
                            return s => {
                                t.getEventFullKey(s) === e && i.runGuarded(() => n(s))
                            }
                        }
                        static _normalizeKey(t) {
                            switch (t) {
                                case "esc":
                                    return "escape";
                                default:
                                    return t
                            }
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Pc))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                Ih = (() => {
                    class t {}
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return di(Oh)
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                Oh = (() => {
                    class t extends Ih {
                        constructor(t) {
                            super(), this._doc = t
                        }
                        sanitize(t, e) {
                            if (null == e) return null;
                            switch (t) {
                                case Qi.NONE:
                                    return e;
                                case Qi.HTML:
                                    return Ei(e, "HTML") ? xi(e) : function(t, e) {
                                        let n = null;
                                        try {
                                            Wi = Wi || function(t) {
                                                const e = new Ti(t);
                                                return function() {
                                                    try {
                                                        return !!(new window.DOMParser).parseFromString(gi(""), "text/html")
                                                    } catch (t) {
                                                        return !1
                                                    }
                                                }() ? new ki(e) : e
                                            }(t);
                                            let i = e ? String(e) : "";
                                            n = Wi.getInertBodyElement(i);
                                            let s = 5,
                                                r = i;
                                            do {
                                                if (0 === s) throw new Error("Failed to sanitize html because the input is unstable");
                                                s--, i = r, r = n.innerHTML, n = Wi.getInertBodyElement(i)
                                            } while (i !== r);
                                            return (new zi).sanitizeChildren(Zi(n) || n)
                                        } finally {
                                            if (n) {
                                                const t = Zi(n) || n;
                                                for (; t.firstChild;) t.removeChild(t.firstChild)
                                            }
                                        }
                                    }(this._doc, String(e));
                                case Qi.STYLE:
                                    return Ei(e, "Style") ? xi(e) : e;
                                case Qi.SCRIPT:
                                    if (Ei(e, "Script")) return xi(e);
                                    throw new Error("unsafe value used in a script context");
                                case Qi.URL:
                                    return Si(e), Ei(e, "URL") ? xi(e) : Ri(String(e));
                                case Qi.RESOURCE_URL:
                                    if (Ei(e, "ResourceURL")) return xi(e);
                                    throw new Error("unsafe value used in a resource URL context (see https://g.co/ng/security#xss)");
                                default:
                                    throw new Error(`Unexpected SecurityContext ${t} (see https://g.co/ng/security#xss)`)
                            }
                        }
                        bypassSecurityTrustHtml(t) {
                            return new yi(t)
                        }
                        bypassSecurityTrustStyle(t) {
                            return new bi(t)
                        }
                        bypassSecurityTrustScript(t) {
                            return new vi(t)
                        }
                        bypassSecurityTrustUrl(t) {
                            return new wi(t)
                        }
                        bypassSecurityTrustResourceUrl(t) {
                            return new Ci(t)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Pc))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return t = di(jr), new Oh(t.get(Pc));
                            var t
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })();
            const Ph = wc(Tc, "browser", [{
                    provide: Ul,
                    useValue: "browser"
                }, {
                    provide: ql,
                    useValue: function() {
                        oh.makeCurrent(), uh.init()
                    },
                    multi: !0
                }, {
                    provide: Pc,
                    useFactory: function() {
                        return function(t) {
                            fe = t
                        }(document), document
                    },
                    deps: []
                }]),
                Fh = [
                    [], {
                        provide: Hr,
                        useValue: "root"
                    }, {
                        provide: Xi,
                        useFactory: function() {
                            return new Xi
                        },
                        deps: []
                    }, {
                        provide: dh,
                        useClass: Sh,
                        multi: !0,
                        deps: [Pc, rc, Ul]
                    }, {
                        provide: dh,
                        useClass: Rh,
                        multi: !0,
                        deps: [Pc]
                    },
                    [], {
                        provide: wh,
                        useClass: wh,
                        deps: [ph, gh, Bl]
                    }, {
                        provide: va,
                        useExisting: wh
                    }, {
                        provide: mh,
                        useExisting: gh
                    }, {
                        provide: gh,
                        useClass: gh,
                        deps: [Pc]
                    }, {
                        provide: dc,
                        useClass: dc,
                        deps: [rc]
                    }, {
                        provide: ph,
                        useClass: ph,
                        deps: [dh, rc]
                    },
                    []
                ];
            let Lh = (() => {
                class t {
                    constructor(t) {
                        if (t) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
                    }
                    static withServerTransition(e) {
                        return {
                            ngModule: t,
                            providers: [{
                                provide: Bl,
                                useValue: e.appId
                            }, {
                                provide: ch,
                                useExisting: Bl
                            }, hh]
                        }
                    }
                }
                return t.\u0275mod = qt({
                    type: t
                }), t.\u0275inj = ct({
                    factory: function(e) {
                        return new(e || t)(di(t, 12))
                    },
                    providers: Fh,
                    imports: [rh, Dc]
                }), t
            })();

            function Nh(...t) {
                let e = t[t.length - 1];
                return S(e) ? (t.pop(), L(t, e)) : U(t)
            }

            function Mh() {}

            function Vh(t, e, n) {
                return function(i) {
                    return i.lift(new jh(t, e, n))
                }
            }
            "undefined" != typeof window && window;
            class jh {
                constructor(t, e, n) {
                    this.nextOrObserver = t, this.error = e, this.complete = n
                }
                call(t, e) {
                    return e.subscribe(new Bh(t, this.nextOrObserver, this.error, this.complete))
                }
            }
            class Bh extends f {
                constructor(t, e, n, s) {
                    super(t), this._tapNext = Mh, this._tapError = Mh, this._tapComplete = Mh, this._tapError = n || Mh, this._tapComplete = s || Mh, i(e) ? (this._context = this, this._tapNext = e) : e && (this._context = e, this._tapNext = e.next || Mh, this._tapError = e.error || Mh, this._tapComplete = e.complete || Mh)
                }
                _next(t) {
                    try {
                        this._tapNext.call(this._context, t)
                    } catch (e) {
                        return void this.destination.error(e)
                    }
                    this.destination.next(t)
                }
                _error(t) {
                    try {
                        this._tapError.call(this._context, t)
                    } catch (t) {
                        return void this.destination.error(t)
                    }
                    this.destination.error(t)
                }
                _complete() {
                    try {
                        this._tapComplete.call(this._context)
                    } catch (t) {
                        return void this.destination.error(t)
                    }
                    return this.destination.complete()
                }
            }
            class Hh extends u {
                constructor(t, e) {
                    super()
                }
                schedule(t, e = 0) {
                    return this
                }
            }
            class zh extends Hh {
                constructor(t, e) {
                    super(t, e), this.scheduler = t, this.work = e, this.pending = !1
                }
                schedule(t, e = 0) {
                    if (this.closed) return this;
                    this.state = t;
                    const n = this.id,
                        i = this.scheduler;
                    return null != n && (this.id = this.recycleAsyncId(i, n, e)), this.pending = !0, this.delay = e, this.id = this.id || this.requestAsyncId(i, this.id, e), this
                }
                requestAsyncId(t, e, n = 0) {
                    return setInterval(t.flush.bind(t, this), n)
                }
                recycleAsyncId(t, e, n = 0) {
                    if (null !== n && this.delay === n && !1 === this.pending) return e;
                    clearInterval(e)
                }
                execute(t, e) {
                    if (this.closed) return new Error("executing a cancelled action");
                    this.pending = !1;
                    const n = this._execute(t, e);
                    if (n) return n;
                    !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
                }
                _execute(t, e) {
                    let n = !1,
                        i = void 0;
                    try {
                        this.work(t)
                    } catch (s) {
                        n = !0, i = !!s && s || new Error(s)
                    }
                    if (n) return this.unsubscribe(), i
                }
                _unsubscribe() {
                    const t = this.id,
                        e = this.scheduler,
                        n = e.actions,
                        i = n.indexOf(this);
                    this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== i && n.splice(i, 1), null != t && (this.id = this.recycleAsyncId(e, t, null)), this.delay = null
                }
            }
            let qh = (() => {
                class t {
                    constructor(e, n = t.now) {
                        this.SchedulerAction = e, this.now = n
                    }
                    schedule(t, e = 0, n) {
                        return new this.SchedulerAction(this, t).schedule(n, e)
                    }
                }
                return t.now = () => Date.now(), t
            })();
            class Uh extends qh {
                constructor(t, e = qh.now) {
                    super(t, () => Uh.delegate && Uh.delegate !== this ? Uh.delegate.now() : e()), this.actions = [], this.active = !1, this.scheduled = void 0
                }
                schedule(t, e = 0, n) {
                    return Uh.delegate && Uh.delegate !== this ? Uh.delegate.schedule(t, e, n) : super.schedule(t, e, n)
                }
                flush(t) {
                    const {
                        actions: e
                    } = this;
                    if (this.active) return void e.push(t);
                    let n;
                    this.active = !0;
                    do {
                        if (n = t.execute(t.state, t.delay)) break
                    } while (t = e.shift());
                    if (this.active = !1, n) {
                        for (; t = e.shift();) t.unsubscribe();
                        throw n
                    }
                }
            }
            const $h = new Uh(zh);
            class Wh {
                constructor(t, e) {
                    this.dueTime = t, this.scheduler = e
                }
                call(t, e) {
                    return e.subscribe(new Zh(t, this.dueTime, this.scheduler))
                }
            }
            class Zh extends f {
                constructor(t, e, n) {
                    super(t), this.dueTime = e, this.scheduler = n, this.debouncedSubscription = null, this.lastValue = null, this.hasValue = !1
                }
                _next(t) {
                    this.clearDebounce(), this.lastValue = t, this.hasValue = !0, this.add(this.debouncedSubscription = this.scheduler.schedule(Qh, this.dueTime, this))
                }
                _complete() {
                    this.debouncedNext(), this.destination.complete()
                }
                debouncedNext() {
                    if (this.clearDebounce(), this.hasValue) {
                        const {
                            lastValue: t
                        } = this;
                        this.lastValue = null, this.hasValue = !1, this.destination.next(t)
                    }
                }
                clearDebounce() {
                    const t = this.debouncedSubscription;
                    null !== t && (this.remove(t), t.unsubscribe(), this.debouncedSubscription = null)
                }
            }

            function Qh(t) {
                t.debouncedNext()
            }

            function Kh(t, e) {
                return function(n) {
                    return n.lift(new Gh(t, e))
                }
            }
            class Gh {
                constructor(t, e) {
                    this.predicate = t, this.thisArg = e
                }
                call(t, e) {
                    return e.subscribe(new Yh(t, this.predicate, this.thisArg))
                }
            }
            class Yh extends f {
                constructor(t, e, n) {
                    super(t), this.predicate = e, this.thisArg = n, this.count = 0
                }
                _next(t) {
                    let e;
                    try {
                        e = this.predicate.call(this.thisArg, t, this.count++)
                    } catch (n) {
                        return void this.destination.error(n)
                    }
                    e && this.destination.next(t)
                }
            }
            const Xh = (() => {
                    function t() {
                        return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
                    }
                    return t.prototype = Object.create(Error.prototype), t
                })(),
                Jh = new y(t => t.complete());

            function tu(t) {
                return t ? function(t) {
                    return new y(e => t.schedule(() => e.complete()))
                }(t) : Jh
            }

            function eu(t) {
                return e => 0 === t ? tu() : e.lift(new nu(t))
            }
            class nu {
                constructor(t) {
                    if (this.total = t, this.total < 0) throw new Xh
                }
                call(t, e) {
                    return e.subscribe(new iu(t, this.total))
                }
            }
            class iu extends f {
                constructor(t, e) {
                    super(t), this.total = e, this.count = 0
                }
                _next(t) {
                    const e = this.total,
                        n = ++this.count;
                    n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()))
                }
            }

            function su(t) {
                return null != t && "" + t != "false"
            }

            function ru(t, e = 0) {
                return function(t) {
                    return !isNaN(parseFloat(t)) && !isNaN(Number(t))
                }(t) ? Number(t) : e
            }

            function ou(t) {
                return Array.isArray(t) ? t : [t]
            }

            function au(t) {
                return null == t ? "" : "string" == typeof t ? t : t + "px"
            }

            function lu(t) {
                return t instanceof ba ? t.nativeElement : t
            }
            let cu;
            try {
                cu = "undefined" != typeof Intl && Intl.v8BreakIterator
            } catch (xC) {
                cu = !1
            }
            let hu, uu = (() => {
                    class t {
                        constructor(t) {
                            this._platformId = t, this.isBrowser = this._platformId ? "browser" === this._platformId : "object" == typeof document && !!document, this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent), this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent), this.BLINK = this.isBrowser && !(!window.chrome && !cu) && "undefined" != typeof CSS && !this.EDGE && !this.TRIDENT, this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT, this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window), this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent), this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT, this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Ul))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(Ul))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                du = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })();
            const pu = ["color", "button", "checkbox", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];

            function fu() {
                if (hu) return hu;
                if ("object" != typeof document || !document) return hu = new Set(pu), hu;
                let t = document.createElement("input");
                return hu = new Set(pu.filter(e => (t.setAttribute("type", e), t.type === e))), hu
            }
            let mu, gu, _u;

            function yu(t) {
                return function() {
                    if (null == mu && "undefined" != typeof window) try {
                        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                            get: () => mu = !0
                        }))
                    } finally {
                        mu = mu || !1
                    }
                    return mu
                }() ? t : !!t.capture
            }

            function bu() {
                if (null == gu) {
                    if ("object" != typeof document || !document || "function" != typeof Element || !Element) return gu = !1, gu;
                    if ("scrollBehavior" in document.documentElement.style) gu = !0;
                    else {
                        const t = Element.prototype.scrollTo;
                        gu = !!t && !/\{\s*\[native code\]\s*\}/.test(t.toString())
                    }
                }
                return gu
            }

            function vu(t) {
                if (function() {
                        if (null == _u) {
                            const t = "undefined" != typeof document ? document.head : null;
                            _u = !(!t || !t.createShadowRoot && !t.attachShadow)
                        }
                        return _u
                    }()) {
                    const e = t.getRootNode ? t.getRootNode() : null;
                    if ("undefined" != typeof ShadowRoot && ShadowRoot && e instanceof ShadowRoot) return e
                }
                return null
            }
            let wu = (() => {
                    class t {
                        create(t) {
                            return "undefined" == typeof MutationObserver ? null : new MutationObserver(t)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                Cu = (() => {
                    class t {
                        constructor(t) {
                            this._mutationObserverFactory = t, this._observedElements = new Map
                        }
                        ngOnDestroy() {
                            this._observedElements.forEach((t, e) => this._cleanupObserver(e))
                        }
                        observe(t) {
                            const e = lu(t);
                            return new y(t => {
                                const n = this._observeElement(e).subscribe(t);
                                return () => {
                                    n.unsubscribe(), this._unobserveElement(e)
                                }
                            })
                        }
                        _observeElement(t) {
                            if (this._observedElements.has(t)) this._observedElements.get(t).count++;
                            else {
                                const e = new x,
                                    n = this._mutationObserverFactory.create(t => e.next(t));
                                n && n.observe(t, {
                                    characterData: !0,
                                    childList: !0,
                                    subtree: !0
                                }), this._observedElements.set(t, {
                                    observer: n,
                                    stream: e,
                                    count: 1
                                })
                            }
                            return this._observedElements.get(t).stream
                        }
                        _unobserveElement(t) {
                            this._observedElements.has(t) && (this._observedElements.get(t).count--, this._observedElements.get(t).count || this._cleanupObserver(t))
                        }
                        _cleanupObserver(t) {
                            if (this._observedElements.has(t)) {
                                const {
                                    observer: e,
                                    stream: n
                                } = this._observedElements.get(t);
                                e && e.disconnect(), n.complete(), this._observedElements.delete(t)
                            }
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(wu))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(wu))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                xu = (() => {
                    class t {
                        constructor(t, e, n) {
                            this._contentObserver = t, this._elementRef = e, this._ngZone = n, this.event = new ml, this._disabled = !1, this._currentSubscription = null
                        }
                        get disabled() {
                            return this._disabled
                        }
                        set disabled(t) {
                            this._disabled = su(t), this._disabled ? this._unsubscribe() : this._subscribe()
                        }
                        get debounce() {
                            return this._debounce
                        }
                        set debounce(t) {
                            this._debounce = ru(t), this._subscribe()
                        }
                        ngAfterContentInit() {
                            this._currentSubscription || this.disabled || this._subscribe()
                        }
                        ngOnDestroy() {
                            this._unsubscribe()
                        }
                        _subscribe() {
                            this._unsubscribe();
                            const t = this._contentObserver.observe(this._elementRef);
                            this._ngZone.runOutsideAngular(() => {
                                this._currentSubscription = (this.debounce ? t.pipe(function(t, e = $h) {
                                    return n => n.lift(new Wh(t, e))
                                }(this.debounce)) : t).subscribe(this.event)
                            })
                        }
                        _unsubscribe() {
                            var t;
                            null === (t = this._currentSubscription) || void 0 === t || t.unsubscribe()
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(Cu), _o(ba), _o(rc))
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "cdkObserveContent", ""]
                        ],
                        inputs: {
                            disabled: ["cdkObserveContentDisabled", "disabled"],
                            debounce: "debounce"
                        },
                        outputs: {
                            event: "cdkObserveContent"
                        },
                        exportAs: ["cdkObserveContent"]
                    }), t
                })(),
                Eu = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [wu]
                    }), t
                })(),
                Su = (() => {
                    class t {
                        constructor(t) {
                            this._platform = t
                        }
                        isDisabled(t) {
                            return t.hasAttribute("disabled")
                        }
                        isVisible(t) {
                            return function(t) {
                                return !!(t.offsetWidth || t.offsetHeight || "function" == typeof t.getClientRects && t.getClientRects().length)
                            }(t) && "visible" === getComputedStyle(t).visibility
                        }
                        isTabbable(t) {
                            if (!this._platform.isBrowser) return !1;
                            const e = function(t) {
                                try {
                                    return t.frameElement
                                } catch (xC) {
                                    return null
                                }
                            }((n = t).ownerDocument && n.ownerDocument.defaultView || window);
                            var n;
                            if (e) {
                                if (-1 === Tu(e)) return !1;
                                if (!this.isVisible(e)) return !1
                            }
                            let i = t.nodeName.toLowerCase(),
                                s = Tu(t);
                            return t.hasAttribute("contenteditable") ? -1 !== s : "iframe" !== i && "object" !== i && !(this._platform.WEBKIT && this._platform.IOS && ! function(t) {
                                let e = t.nodeName.toLowerCase(),
                                    n = "input" === e && t.type;
                                return "text" === n || "password" === n || "select" === e || "textarea" === e
                            }(t)) && ("audio" === i ? !!t.hasAttribute("controls") && -1 !== s : "video" === i ? -1 !== s && (null !== s || this._platform.FIREFOX || t.hasAttribute("controls")) : t.tabIndex >= 0)
                        }
                        isFocusable(t, e) {
                            return function(t) {
                                return ! function(t) {
                                    return function(t) {
                                        return "input" == t.nodeName.toLowerCase()
                                    }(t) && "hidden" == t.type
                                }(t) && (function(t) {
                                    let e = t.nodeName.toLowerCase();
                                    return "input" === e || "select" === e || "button" === e || "textarea" === e
                                }(t) || function(t) {
                                    return function(t) {
                                        return "a" == t.nodeName.toLowerCase()
                                    }(t) && t.hasAttribute("href")
                                }(t) || t.hasAttribute("contenteditable") || ku(t))
                            }(t) && !this.isDisabled(t) && ((null == e ? void 0 : e.ignoreVisibility) || this.isVisible(t))
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(uu))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(uu))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })();

            function ku(t) {
                if (!t.hasAttribute("tabindex") || void 0 === t.tabIndex) return !1;
                let e = t.getAttribute("tabindex");
                return "-32768" != e && !(!e || isNaN(parseInt(e, 10)))
            }

            function Tu(t) {
                if (!ku(t)) return null;
                const e = parseInt(t.getAttribute("tabindex") || "", 10);
                return isNaN(e) ? -1 : e
            }
            class Au {
                constructor(t, e, n, i, s = !1) {
                    this._element = t, this._checker = e, this._ngZone = n, this._document = i, this._hasAttached = !1, this.startAnchorListener = () => this.focusLastTabbableElement(), this.endAnchorListener = () => this.focusFirstTabbableElement(), this._enabled = !0, s || this.attachAnchors()
                }
                get enabled() {
                    return this._enabled
                }
                set enabled(t) {
                    this._enabled = t, this._startAnchor && this._endAnchor && (this._toggleAnchorTabIndex(t, this._startAnchor), this._toggleAnchorTabIndex(t, this._endAnchor))
                }
                destroy() {
                    const t = this._startAnchor,
                        e = this._endAnchor;
                    t && (t.removeEventListener("focus", this.startAnchorListener), t.parentNode && t.parentNode.removeChild(t)), e && (e.removeEventListener("focus", this.endAnchorListener), e.parentNode && e.parentNode.removeChild(e)), this._startAnchor = this._endAnchor = null, this._hasAttached = !1
                }
                attachAnchors() {
                    return !!this._hasAttached || (this._ngZone.runOutsideAngular(() => {
                        this._startAnchor || (this._startAnchor = this._createAnchor(), this._startAnchor.addEventListener("focus", this.startAnchorListener)), this._endAnchor || (this._endAnchor = this._createAnchor(), this._endAnchor.addEventListener("focus", this.endAnchorListener))
                    }), this._element.parentNode && (this._element.parentNode.insertBefore(this._startAnchor, this._element), this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling), this._hasAttached = !0), this._hasAttached)
                }
                focusInitialElementWhenReady() {
                    return new Promise(t => {
                        this._executeOnStable(() => t(this.focusInitialElement()))
                    })
                }
                focusFirstTabbableElementWhenReady() {
                    return new Promise(t => {
                        this._executeOnStable(() => t(this.focusFirstTabbableElement()))
                    })
                }
                focusLastTabbableElementWhenReady() {
                    return new Promise(t => {
                        this._executeOnStable(() => t(this.focusLastTabbableElement()))
                    })
                }
                _getRegionBoundary(t) {
                    let e = this._element.querySelectorAll(`[cdk-focus-region-${t}], [cdkFocusRegion${t}], [cdk-focus-${t}]`);
                    for (let n = 0; n < e.length; n++) e[n].hasAttribute("cdk-focus-" + t) ? console.warn(`Found use of deprecated attribute 'cdk-focus-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`, e[n]) : e[n].hasAttribute("cdk-focus-region-" + t) && console.warn(`Found use of deprecated attribute 'cdk-focus-region-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`, e[n]);
                    return "start" == t ? e.length ? e[0] : this._getFirstTabbableElement(this._element) : e.length ? e[e.length - 1] : this._getLastTabbableElement(this._element)
                }
                focusInitialElement() {
                    const t = this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");
                    if (t) {
                        if (t.hasAttribute("cdk-focus-initial") && console.warn("Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0", t), !this._checker.isFocusable(t)) {
                            const e = this._getFirstTabbableElement(t);
                            return null == e || e.focus(), !!e
                        }
                        return t.focus(), !0
                    }
                    return this.focusFirstTabbableElement()
                }
                focusFirstTabbableElement() {
                    const t = this._getRegionBoundary("start");
                    return t && t.focus(), !!t
                }
                focusLastTabbableElement() {
                    const t = this._getRegionBoundary("end");
                    return t && t.focus(), !!t
                }
                hasAttached() {
                    return this._hasAttached
                }
                _getFirstTabbableElement(t) {
                    if (this._checker.isFocusable(t) && this._checker.isTabbable(t)) return t;
                    let e = t.children || t.childNodes;
                    for (let n = 0; n < e.length; n++) {
                        let t = e[n].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(e[n]) : null;
                        if (t) return t
                    }
                    return null
                }
                _getLastTabbableElement(t) {
                    if (this._checker.isFocusable(t) && this._checker.isTabbable(t)) return t;
                    let e = t.children || t.childNodes;
                    for (let n = e.length - 1; n >= 0; n--) {
                        let t = e[n].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(e[n]) : null;
                        if (t) return t
                    }
                    return null
                }
                _createAnchor() {
                    const t = this._document.createElement("div");
                    return this._toggleAnchorTabIndex(this._enabled, t), t.classList.add("cdk-visually-hidden"), t.classList.add("cdk-focus-trap-anchor"), t.setAttribute("aria-hidden", "true"), t
                }
                _toggleAnchorTabIndex(t, e) {
                    t ? e.setAttribute("tabindex", "0") : e.removeAttribute("tabindex")
                }
                toggleAnchors(t) {
                    this._startAnchor && this._endAnchor && (this._toggleAnchorTabIndex(t, this._startAnchor), this._toggleAnchorTabIndex(t, this._endAnchor))
                }
                _executeOnStable(t) {
                    this._ngZone.isStable ? t() : this._ngZone.onStable.pipe(eu(1)).subscribe(t)
                }
            }
            let Du = (() => {
                class t {
                    constructor(t, e, n) {
                        this._checker = t, this._ngZone = e, this._document = n
                    }
                    create(t, e = !1) {
                        return new Au(t, this._checker, this._ngZone, this._document, e)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(Su), di(rc), di(Pc))
                }, t.\u0275prov = lt({
                    factory: function() {
                        return new t(di(Su), di(rc), di(Pc))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })();

            function Ru(t) {
                return 0 === t.buttons
            }

            function Iu(t) {
                const e = t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0];
                return !(!e || -1 !== e.identifier || null != e.radiusX && 1 !== e.radiusX || null != e.radiusY && 1 !== e.radiusY)
            }
            "undefined" != typeof Element && Element;
            const Ou = new Un("cdk-focus-monitor-default-options"),
                Pu = yu({
                    passive: !0,
                    capture: !0
                });
            let Fu = (() => {
                class t {
                    constructor(t, e, n, i) {
                        this._ngZone = t, this._platform = e, this._origin = null, this._windowFocused = !1, this._elementInfo = new Map, this._monitoredElementCount = 0, this._rootNodeFocusListenerCount = new Map, this._documentKeydownListener = () => {
                            this._lastTouchTarget = null, this._setOriginForCurrentEventQueue("keyboard")
                        }, this._documentMousedownListener = t => {
                            if (!this._lastTouchTarget) {
                                const e = Ru(t) ? "keyboard" : "mouse";
                                this._setOriginForCurrentEventQueue(e)
                            }
                        }, this._documentTouchstartListener = t => {
                            Iu(t) ? this._lastTouchTarget || this._setOriginForCurrentEventQueue("keyboard") : (null != this._touchTimeoutId && clearTimeout(this._touchTimeoutId), this._lastTouchTarget = Lu(t), this._touchTimeoutId = setTimeout(() => this._lastTouchTarget = null, 650))
                        }, this._windowFocusListener = () => {
                            this._windowFocused = !0, this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = !1)
                        }, this._rootNodeFocusAndBlurListener = t => {
                            const e = Lu(t),
                                n = "focus" === t.type ? this._onFocus : this._onBlur;
                            for (let i = e; i; i = i.parentElement) n.call(this, t, i)
                        }, this._document = n, this._detectionMode = (null == i ? void 0 : i.detectionMode) || 0
                    }
                    monitor(t, e = !1) {
                        const n = lu(t);
                        if (!this._platform.isBrowser || 1 !== n.nodeType) return Nh(null);
                        const i = vu(n) || this._getDocument(),
                            s = this._elementInfo.get(n);
                        if (s) return e && (s.checkChildren = !0), s.subject;
                        const r = {
                            checkChildren: e,
                            subject: new x,
                            rootNode: i
                        };
                        return this._elementInfo.set(n, r), this._registerGlobalListeners(r), r.subject
                    }
                    stopMonitoring(t) {
                        const e = lu(t),
                            n = this._elementInfo.get(e);
                        n && (n.subject.complete(), this._setClasses(e), this._elementInfo.delete(e), this._removeGlobalListeners(n))
                    }
                    focusVia(t, e, n) {
                        const i = lu(t);
                        i === this._getDocument().activeElement ? this._getClosestElementsInfo(i).forEach(([t, n]) => this._originChanged(t, e, n)) : (this._setOriginForCurrentEventQueue(e), "function" == typeof i.focus && i.focus(n))
                    }
                    ngOnDestroy() {
                        this._elementInfo.forEach((t, e) => this.stopMonitoring(e))
                    }
                    _getDocument() {
                        return this._document || document
                    }
                    _getWindow() {
                        return this._getDocument().defaultView || window
                    }
                    _toggleClass(t, e, n) {
                        n ? t.classList.add(e) : t.classList.remove(e)
                    }
                    _getFocusOrigin(t) {
                        return this._origin ? this._origin : this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : this._wasCausedByTouch(t) ? "touch" : "program"
                    }
                    _setClasses(t, e) {
                        this._toggleClass(t, "cdk-focused", !!e), this._toggleClass(t, "cdk-touch-focused", "touch" === e), this._toggleClass(t, "cdk-keyboard-focused", "keyboard" === e), this._toggleClass(t, "cdk-mouse-focused", "mouse" === e), this._toggleClass(t, "cdk-program-focused", "program" === e)
                    }
                    _setOriginForCurrentEventQueue(t) {
                        this._ngZone.runOutsideAngular(() => {
                            this._origin = t, 0 === this._detectionMode && (this._originTimeoutId = setTimeout(() => this._origin = null, 1))
                        })
                    }
                    _wasCausedByTouch(t) {
                        const e = Lu(t);
                        return this._lastTouchTarget instanceof Node && e instanceof Node && (e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
                    }
                    _onFocus(t, e) {
                        const n = this._elementInfo.get(e);
                        n && (n.checkChildren || e === Lu(t)) && this._originChanged(e, this._getFocusOrigin(t), n)
                    }
                    _onBlur(t, e) {
                        const n = this._elementInfo.get(e);
                        !n || n.checkChildren && t.relatedTarget instanceof Node && e.contains(t.relatedTarget) || (this._setClasses(e), this._emitOrigin(n.subject, null))
                    }
                    _emitOrigin(t, e) {
                        this._ngZone.run(() => t.next(e))
                    }
                    _registerGlobalListeners(t) {
                        if (!this._platform.isBrowser) return;
                        const e = t.rootNode,
                            n = this._rootNodeFocusListenerCount.get(e) || 0;
                        n || this._ngZone.runOutsideAngular(() => {
                            e.addEventListener("focus", this._rootNodeFocusAndBlurListener, Pu), e.addEventListener("blur", this._rootNodeFocusAndBlurListener, Pu)
                        }), this._rootNodeFocusListenerCount.set(e, n + 1), 1 == ++this._monitoredElementCount && this._ngZone.runOutsideAngular(() => {
                            const t = this._getDocument(),
                                e = this._getWindow();
                            t.addEventListener("keydown", this._documentKeydownListener, Pu), t.addEventListener("mousedown", this._documentMousedownListener, Pu), t.addEventListener("touchstart", this._documentTouchstartListener, Pu), e.addEventListener("focus", this._windowFocusListener)
                        })
                    }
                    _removeGlobalListeners(t) {
                        const e = t.rootNode;
                        if (this._rootNodeFocusListenerCount.has(e)) {
                            const t = this._rootNodeFocusListenerCount.get(e);
                            t > 1 ? this._rootNodeFocusListenerCount.set(e, t - 1) : (e.removeEventListener("focus", this._rootNodeFocusAndBlurListener, Pu), e.removeEventListener("blur", this._rootNodeFocusAndBlurListener, Pu), this._rootNodeFocusListenerCount.delete(e))
                        }
                        if (!--this._monitoredElementCount) {
                            const t = this._getDocument(),
                                e = this._getWindow();
                            t.removeEventListener("keydown", this._documentKeydownListener, Pu), t.removeEventListener("mousedown", this._documentMousedownListener, Pu), t.removeEventListener("touchstart", this._documentTouchstartListener, Pu), e.removeEventListener("focus", this._windowFocusListener), clearTimeout(this._windowFocusTimeoutId), clearTimeout(this._touchTimeoutId), clearTimeout(this._originTimeoutId)
                        }
                    }
                    _originChanged(t, e, n) {
                        this._setClasses(t, e), this._emitOrigin(n.subject, e), this._lastFocusOrigin = e
                    }
                    _getClosestElementsInfo(t) {
                        const e = [];
                        return this._elementInfo.forEach((n, i) => {
                            (i === t || n.checkChildren && i.contains(t)) && e.push([i, n])
                        }), e
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(rc), di(uu), di(Pc, 8), di(Ou, 8))
                }, t.\u0275prov = lt({
                    factory: function() {
                        return new t(di(rc), di(uu), di(Pc, 8), di(Ou, 8))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })();

            function Lu(t) {
                return t.composedPath ? t.composedPath()[0] : t.target
            }
            const Nu = "cdk-high-contrast-black-on-white",
                Mu = "cdk-high-contrast-white-on-black",
                Vu = "cdk-high-contrast-active";
            let ju = (() => {
                    class t {
                        constructor(t, e) {
                            this._platform = t, this._document = e
                        }
                        getHighContrastMode() {
                            if (!this._platform.isBrowser) return 0;
                            const t = this._document.createElement("div");
                            t.style.backgroundColor = "rgb(1,2,3)", t.style.position = "absolute", this._document.body.appendChild(t);
                            const e = this._document.defaultView || window,
                                n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
                                i = (n && n.backgroundColor || "").replace(/ /g, "");
                            switch (this._document.body.removeChild(t), i) {
                                case "rgb(0,0,0)":
                                    return 2;
                                case "rgb(255,255,255)":
                                    return 1
                            }
                            return 0
                        }
                        _applyBodyHighContrastModeCssClasses() {
                            if (this._platform.isBrowser && this._document.body) {
                                const t = this._document.body.classList;
                                t.remove(Vu), t.remove(Nu), t.remove(Mu);
                                const e = this.getHighContrastMode();
                                1 === e ? (t.add(Vu), t.add(Nu)) : 2 === e && (t.add(Vu), t.add(Mu))
                            }
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(uu), di(Pc))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(uu), di(Pc))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                Bu = (() => {
                    class t {
                        constructor(t) {
                            t._applyBodyHighContrastModeCssClasses()
                        }
                    }
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)(di(ju))
                        },
                        imports: [
                            [du, Eu]
                        ]
                    }), t
                })(),
                Hu = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })();

            function zu(t, e, n, s) {
                return i(n) && (s = n, n = void 0), s ? zu(t, e, n).pipe(k(t => l(t) ? s(...t) : s(t))) : new y(i => {
                    qu(t, e, function(t) {
                        i.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : t)
                    }, i, n)
                })
            }

            function qu(t, e, n, i, s) {
                let r;
                if (function(t) {
                        return t && "function" == typeof t.addEventListener && "function" == typeof t.removeEventListener
                    }(t)) {
                    const i = t;
                    t.addEventListener(e, n, s), r = () => i.removeEventListener(e, n, s)
                } else if (function(t) {
                        return t && "function" == typeof t.on && "function" == typeof t.off
                    }(t)) {
                    const i = t;
                    t.on(e, n), r = () => i.off(e, n)
                } else if (function(t) {
                        return t && "function" == typeof t.addListener && "function" == typeof t.removeListener
                    }(t)) {
                    const i = t;
                    t.addListener(e, n), r = () => i.removeListener(e, n)
                } else {
                    if (!t || !t.length) throw new TypeError("Invalid event target");
                    for (let r = 0, o = t.length; r < o; r++) qu(t[r], e, n, i, s)
                }
                i.add(r)
            }
            class Uu extends zh {
                constructor(t, e) {
                    super(t, e), this.scheduler = t, this.work = e
                }
                requestAsyncId(t, e, n = 0) {
                    return null !== n && n > 0 ? super.requestAsyncId(t, e, n) : (t.actions.push(this), t.scheduled || (t.scheduled = requestAnimationFrame(() => t.flush(null))))
                }
                recycleAsyncId(t, e, n = 0) {
                    if (null !== n && n > 0 || null === n && this.delay > 0) return super.recycleAsyncId(t, e, n);
                    0 === t.actions.length && (cancelAnimationFrame(e), t.scheduled = void 0)
                }
            }
            class $u extends Uh {
                flush(t) {
                    this.active = !0, this.scheduled = void 0;
                    const {
                        actions: e
                    } = this;
                    let n, i = -1,
                        s = e.length;
                    t = t || e.shift();
                    do {
                        if (n = t.execute(t.state, t.delay)) break
                    } while (++i < s && (t = e.shift()));
                    if (this.active = !1, n) {
                        for (; ++i < s && (t = e.shift());) t.unsubscribe();
                        throw n
                    }
                }
            }
            const Wu = new $u(Uu);
            class Zu {
                constructor(t) {
                    this.durationSelector = t
                }
                call(t, e) {
                    return e.subscribe(new Qu(t, this.durationSelector))
                }
            }
            class Qu extends V {
                constructor(t, e) {
                    super(t), this.durationSelector = e, this.hasValue = !1
                }
                _next(t) {
                    if (this.value = t, this.hasValue = !0, !this.throttled) {
                        let n;
                        try {
                            const {
                                durationSelector: e
                            } = this;
                            n = e(t)
                        } catch (e) {
                            return this.destination.error(e)
                        }
                        const i = j(n, new M(this));
                        !i || i.closed ? this.clearThrottle() : this.add(this.throttled = i)
                    }
                }
                clearThrottle() {
                    const {
                        value: t,
                        hasValue: e,
                        throttled: n
                    } = this;
                    n && (this.remove(n), this.throttled = void 0, n.unsubscribe()), e && (this.value = void 0, this.hasValue = !1, this.destination.next(t))
                }
                notifyNext() {
                    this.clearThrottle()
                }
                notifyComplete() {
                    this.clearThrottle()
                }
            }

            function Ku(t) {
                return !l(t) && t - parseFloat(t) + 1 >= 0
            }

            function Gu(t = 0, e, n) {
                let i = -1;
                return Ku(e) ? i = Number(e) < 1 ? 1 : Number(e) : S(e) && (n = e), S(n) || (n = $h), new y(e => {
                    const s = Ku(t) ? t : +t - n.now();
                    return n.schedule(Yu, s, {
                        index: 0,
                        period: i,
                        subscriber: e
                    })
                })
            }

            function Yu(t) {
                const {
                    index: e,
                    period: n,
                    subscriber: i
                } = t;
                if (i.next(e), !i.closed) {
                    if (-1 === n) return i.complete();
                    t.index = e + 1, this.schedule(t, n)
                }
            }

            function Xu(t, e = $h) {
                return n = () => Gu(t, e),
                    function(t) {
                        return t.lift(new Zu(n))
                    };
                var n
            }

            function Ju(t) {
                return e => e.lift(new td(t))
            }
            class td {
                constructor(t) {
                    this.notifier = t
                }
                call(t, e) {
                    const n = new ed(t),
                        i = j(this.notifier, new M(n));
                    return i && !n.seenValue ? (n.add(i), e.subscribe(n)) : n
                }
            }
            class ed extends V {
                constructor(t) {
                    super(t), this.seenValue = !1
                }
                notifyNext() {
                    this.seenValue = !0, this.complete()
                }
                notifyComplete() {}
            }

            function nd(...t) {
                return q(1)(Nh(...t))
            }

            function id(...t) {
                const e = t[t.length - 1];
                return S(e) ? (t.pop(), n => nd(t, n, e)) : e => nd(t, e)
            }
            const sd = new Un("cdk-dir-doc", {
                providedIn: "root",
                factory: function() {
                    return pi(Pc)
                }
            });
            let rd = (() => {
                    class t {
                        constructor(t) {
                            if (this.value = "ltr", this.change = new ml, t) {
                                const e = t.documentElement ? t.documentElement.dir : null,
                                    n = (t.body ? t.body.dir : null) || e;
                                this.value = "ltr" === n || "rtl" === n ? n : "ltr"
                            }
                        }
                        ngOnDestroy() {
                            this.change.complete()
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(sd, 8))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(sd, 8))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                od = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })(),
                ad = (() => {
                    class t {
                        constructor(t, e, n) {
                            this._ngZone = t, this._platform = e, this._scrolled = new x, this._globalSubscription = null, this._scrolledCount = 0, this.scrollContainers = new Map, this._document = n
                        }
                        register(t) {
                            this.scrollContainers.has(t) || this.scrollContainers.set(t, t.elementScrolled().subscribe(() => this._scrolled.next(t)))
                        }
                        deregister(t) {
                            const e = this.scrollContainers.get(t);
                            e && (e.unsubscribe(), this.scrollContainers.delete(t))
                        }
                        scrolled(t = 20) {
                            return this._platform.isBrowser ? new y(e => {
                                this._globalSubscription || this._addGlobalListener();
                                const n = t > 0 ? this._scrolled.pipe(Xu(t)).subscribe(e) : this._scrolled.subscribe(e);
                                return this._scrolledCount++, () => {
                                    n.unsubscribe(), this._scrolledCount--, this._scrolledCount || this._removeGlobalListener()
                                }
                            }) : Nh()
                        }
                        ngOnDestroy() {
                            this._removeGlobalListener(), this.scrollContainers.forEach((t, e) => this.deregister(e)), this._scrolled.complete()
                        }
                        ancestorScrolled(t, e) {
                            const n = this.getAncestorScrollContainers(t);
                            return this.scrolled(e).pipe(Kh(t => !t || n.indexOf(t) > -1))
                        }
                        getAncestorScrollContainers(t) {
                            const e = [];
                            return this.scrollContainers.forEach((n, i) => {
                                this._scrollableContainsElement(i, t) && e.push(i)
                            }), e
                        }
                        _getWindow() {
                            return this._document.defaultView || window
                        }
                        _scrollableContainsElement(t, e) {
                            let n = lu(e),
                                i = t.getElementRef().nativeElement;
                            do {
                                if (n == i) return !0
                            } while (n = n.parentElement);
                            return !1
                        }
                        _addGlobalListener() {
                            this._globalSubscription = this._ngZone.runOutsideAngular(() => zu(this._getWindow().document, "scroll").subscribe(() => this._scrolled.next()))
                        }
                        _removeGlobalListener() {
                            this._globalSubscription && (this._globalSubscription.unsubscribe(), this._globalSubscription = null)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(rc), di(uu), di(Pc, 8))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(rc), di(uu), di(Pc, 8))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                ld = (() => {
                    class t {
                        constructor(t, e, n) {
                            this._platform = t, this._change = new x, this._changeListener = t => {
                                this._change.next(t)
                            }, this._document = n, e.runOutsideAngular(() => {
                                if (t.isBrowser) {
                                    const t = this._getWindow();
                                    t.addEventListener("resize", this._changeListener), t.addEventListener("orientationchange", this._changeListener)
                                }
                                this.change().subscribe(() => this._updateViewportSize())
                            })
                        }
                        ngOnDestroy() {
                            if (this._platform.isBrowser) {
                                const t = this._getWindow();
                                t.removeEventListener("resize", this._changeListener), t.removeEventListener("orientationchange", this._changeListener)
                            }
                            this._change.complete()
                        }
                        getViewportSize() {
                            this._viewportSize || this._updateViewportSize();
                            const t = {
                                width: this._viewportSize.width,
                                height: this._viewportSize.height
                            };
                            return this._platform.isBrowser || (this._viewportSize = null), t
                        }
                        getViewportRect() {
                            const t = this.getViewportScrollPosition(),
                                {
                                    width: e,
                                    height: n
                                } = this.getViewportSize();
                            return {
                                top: t.top,
                                left: t.left,
                                bottom: t.top + n,
                                right: t.left + e,
                                height: n,
                                width: e
                            }
                        }
                        getViewportScrollPosition() {
                            if (!this._platform.isBrowser) return {
                                top: 0,
                                left: 0
                            };
                            const t = this._document,
                                e = this._getWindow(),
                                n = t.documentElement,
                                i = n.getBoundingClientRect();
                            return {
                                top: -i.top || t.body.scrollTop || e.scrollY || n.scrollTop || 0,
                                left: -i.left || t.body.scrollLeft || e.scrollX || n.scrollLeft || 0
                            }
                        }
                        change(t = 20) {
                            return t > 0 ? this._change.pipe(Xu(t)) : this._change
                        }
                        _getWindow() {
                            return this._document.defaultView || window
                        }
                        _updateViewportSize() {
                            const t = this._getWindow();
                            this._viewportSize = this._platform.isBrowser ? {
                                width: t.innerWidth,
                                height: t.innerHeight
                            } : {
                                width: 0,
                                height: 0
                            }
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(uu), di(rc), di(Pc, 8))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(uu), di(rc), di(Pc, 8))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                cd = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })(),
                hd = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [od, du, cd], od, cd
                        ]
                    }), t
                })();

            function ud(t) {
                const {
                    subscriber: e,
                    counter: n,
                    period: i
                } = t;
                e.next(n), this.schedule({
                    subscriber: e,
                    counter: n + 1,
                    period: i
                }, i)
            }

            function dd(t, e) {
                for (let n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
            }

            function pd(t, e) {
                const n = e ? "" : "none";
                dd(t.style, {
                    touchAction: e ? "" : "none",
                    webkitUserDrag: e ? "" : "none",
                    webkitTapHighlightColor: e ? "" : "transparent",
                    userSelect: n,
                    msUserSelect: n,
                    webkitUserSelect: n,
                    MozUserSelect: n
                })
            }

            function fd(t, e) {
                const n = t.style;
                n.position = e ? "" : "fixed", n.top = n.opacity = e ? "" : "0", n.left = e ? "" : "-999em"
            }

            function md(t) {
                const e = t.toLowerCase().indexOf("ms") > -1 ? 1 : 1e3;
                return parseFloat(t) * e
            }

            function gd(t, e) {
                return t.getPropertyValue(e).split(",").map(t => t.trim())
            }

            function _d(t) {
                const e = t.getBoundingClientRect();
                return {
                    top: e.top,
                    right: e.right,
                    bottom: e.bottom,
                    left: e.left,
                    width: e.width,
                    height: e.height
                }
            }

            function yd(t, e, n) {
                const {
                    top: i,
                    bottom: s,
                    left: r,
                    right: o
                } = t;
                return n >= i && n <= s && e >= r && e <= o
            }

            function bd(t, e, n) {
                t.top += e, t.bottom = t.top + t.height, t.left += n, t.right = t.left + t.width
            }

            function vd(t, e, n, i) {
                const {
                    top: s,
                    right: r,
                    bottom: o,
                    left: a,
                    width: l,
                    height: c
                } = t, h = l * e, u = c * e;
                return i > s - u && i < o + u && n > a - h && n < r + h
            }
            class wd {
                constructor(t, e) {
                    this._document = t, this._viewportRuler = e, this.positions = new Map
                }
                clear() {
                    this.positions.clear()
                }
                cache(t) {
                    this.clear(), this.positions.set(this._document, {
                        scrollPosition: this._viewportRuler.getViewportScrollPosition()
                    }), t.forEach(t => {
                        this.positions.set(t, {
                            scrollPosition: {
                                top: t.scrollTop,
                                left: t.scrollLeft
                            },
                            clientRect: _d(t)
                        })
                    })
                }
                handleScroll(t) {
                    const e = t.target,
                        n = this.positions.get(e);
                    if (!n) return null;
                    const i = e === this._document ? e.documentElement : e,
                        s = n.scrollPosition;
                    let r, o;
                    if (e === this._document) {
                        const t = this._viewportRuler.getViewportScrollPosition();
                        r = t.top, o = t.left
                    } else r = e.scrollTop, o = e.scrollLeft;
                    const a = s.top - r,
                        l = s.left - o;
                    return this.positions.forEach((t, n) => {
                        t.clientRect && e !== n && i.contains(n) && bd(t.clientRect, a, l)
                    }), s.top = r, s.left = o, {
                        top: a,
                        left: l
                    }
                }
            }

            function Cd(t) {
                const e = t.cloneNode(!0),
                    n = e.querySelectorAll("[id]"),
                    i = t.nodeName.toLowerCase();
                e.removeAttribute("id");
                for (let s = 0; s < n.length; s++) n[s].removeAttribute("id");
                return "canvas" === i ? kd(t, e) : "input" !== i && "select" !== i && "textarea" !== i || Sd(t, e), xd("canvas", t, e, kd), xd("input, textarea, select", t, e, Sd), e
            }

            function xd(t, e, n, i) {
                const s = e.querySelectorAll(t);
                if (s.length) {
                    const e = n.querySelectorAll(t);
                    for (let t = 0; t < s.length; t++) i(s[t], e[t])
                }
            }
            let Ed = 0;

            function Sd(t, e) {
                "file" !== e.type && (e.value = t.value), "radio" === e.type && e.name && (e.name = `mat-clone-${e.name}-${Ed++}`)
            }

            function kd(t, e) {
                const n = e.getContext("2d");
                if (n) try {
                    n.drawImage(t, 0, 0)
                } catch (xC) {}
            }
            const Td = yu({
                    passive: !0
                }),
                Ad = yu({
                    passive: !1
                });
            class Dd {
                constructor(t, e, n, i, s, r) {
                    this._config = e, this._document = n, this._ngZone = i, this._viewportRuler = s, this._dragDropRegistry = r, this._passiveTransform = {
                        x: 0,
                        y: 0
                    }, this._activeTransform = {
                        x: 0,
                        y: 0
                    }, this._moveEvents = new x, this._pointerMoveSubscription = u.EMPTY, this._pointerUpSubscription = u.EMPTY, this._scrollSubscription = u.EMPTY, this._resizeSubscription = u.EMPTY, this._boundaryElement = null, this._nativeInteractionsEnabled = !0, this._handles = [], this._disabledHandles = new Set, this._direction = "ltr", this.dragStartDelay = 0, this._disabled = !1, this.beforeStarted = new x, this.started = new x, this.released = new x, this.ended = new x, this.entered = new x, this.exited = new x, this.dropped = new x, this.moved = this._moveEvents, this._pointerDown = t => {
                        if (this.beforeStarted.next(), this._handles.length) {
                            const e = this._handles.find(e => {
                                const n = t.target;
                                return !!n && (n === e || e.contains(n))
                            });
                            !e || this._disabledHandles.has(e) || this.disabled || this._initializeDragSequence(e, t)
                        } else this.disabled || this._initializeDragSequence(this._rootElement, t)
                    }, this._pointerMove = t => {
                        const e = this._getPointerPositionOnPage(t);
                        if (!this._hasStartedDragging) {
                            if (Math.abs(e.x - this._pickupPositionOnPage.x) + Math.abs(e.y - this._pickupPositionOnPage.y) >= this._config.dragStartThreshold) {
                                const e = Date.now() >= this._dragStartTime + this._getDragStartDelay(t),
                                    n = this._dropContainer;
                                if (!e) return void this._endDragSequence(t);
                                n && (n.isDragging() || n.isReceiving()) || (t.preventDefault(), this._hasStartedDragging = !0, this._ngZone.run(() => this._startDragSequence(t)))
                            }
                            return
                        }
                        this._boundaryElement && (this._previewRect && (this._previewRect.width || this._previewRect.height) || (this._previewRect = (this._preview || this._rootElement).getBoundingClientRect())), t.preventDefault();
                        const n = this._getConstrainedPointerPosition(e);
                        if (this._hasMoved = !0, this._lastKnownPointerPosition = e, this._updatePointerDirectionDelta(n), this._dropContainer) this._updateActiveDropContainer(n, e);
                        else {
                            const t = this._activeTransform;
                            t.x = n.x - this._pickupPositionOnPage.x + this._passiveTransform.x, t.y = n.y - this._pickupPositionOnPage.y + this._passiveTransform.y, this._applyRootElementTransform(t.x, t.y), "undefined" != typeof SVGElement && this._rootElement instanceof SVGElement && this._rootElement.setAttribute("transform", `translate(${t.x} ${t.y})`)
                        }
                        this._moveEvents.observers.length && this._ngZone.run(() => {
                            this._moveEvents.next({
                                source: this,
                                pointerPosition: n,
                                event: t,
                                distance: this._getDragDistance(n),
                                delta: this._pointerDirectionDelta
                            })
                        })
                    }, this._pointerUp = t => {
                        this._endDragSequence(t)
                    }, this.withRootElement(t).withParent(e.parentDragRef || null), this._parentPositions = new wd(n, s), r.registerDragItem(this)
                }
                get disabled() {
                    return this._disabled || !(!this._dropContainer || !this._dropContainer.disabled)
                }
                set disabled(t) {
                    const e = su(t);
                    e !== this._disabled && (this._disabled = e, this._toggleNativeDragInteractions(), this._handles.forEach(t => pd(t, e)))
                }
                getPlaceholderElement() {
                    return this._placeholder
                }
                getRootElement() {
                    return this._rootElement
                }
                getVisibleElement() {
                    return this.isDragging() ? this.getPlaceholderElement() : this.getRootElement()
                }
                withHandles(t) {
                    this._handles = t.map(t => lu(t)), this._handles.forEach(t => pd(t, this.disabled)), this._toggleNativeDragInteractions();
                    const e = new Set;
                    return this._disabledHandles.forEach(t => {
                        this._handles.indexOf(t) > -1 && e.add(t)
                    }), this._disabledHandles = e, this
                }
                withPreviewTemplate(t) {
                    return this._previewTemplate = t, this
                }
                withPlaceholderTemplate(t) {
                    return this._placeholderTemplate = t, this
                }
                withRootElement(t) {
                    const e = lu(t);
                    return e !== this._rootElement && (this._rootElement && this._removeRootElementListeners(this._rootElement), this._ngZone.runOutsideAngular(() => {
                        e.addEventListener("mousedown", this._pointerDown, Ad), e.addEventListener("touchstart", this._pointerDown, Td)
                    }), this._initialTransform = void 0, this._rootElement = e), "undefined" != typeof SVGElement && this._rootElement instanceof SVGElement && (this._ownerSVGElement = this._rootElement.ownerSVGElement), this
                }
                withBoundaryElement(t) {
                    return this._boundaryElement = t ? lu(t) : null, this._resizeSubscription.unsubscribe(), t && (this._resizeSubscription = this._viewportRuler.change(10).subscribe(() => this._containInsideBoundaryOnResize())), this
                }
                withParent(t) {
                    return this._parentDragRef = t, this
                }
                dispose() {
                    this._removeRootElementListeners(this._rootElement), this.isDragging() && Od(this._rootElement), Od(this._anchor), this._destroyPreview(), this._destroyPlaceholder(), this._dragDropRegistry.removeDragItem(this), this._removeSubscriptions(), this.beforeStarted.complete(), this.started.complete(), this.released.complete(), this.ended.complete(), this.entered.complete(), this.exited.complete(), this.dropped.complete(), this._moveEvents.complete(), this._handles = [], this._disabledHandles.clear(), this._dropContainer = void 0, this._resizeSubscription.unsubscribe(), this._parentPositions.clear(), this._boundaryElement = this._rootElement = this._ownerSVGElement = this._placeholderTemplate = this._previewTemplate = this._anchor = this._parentDragRef = null
                }
                isDragging() {
                    return this._hasStartedDragging && this._dragDropRegistry.isDragging(this)
                }
                reset() {
                    this._rootElement.style.transform = this._initialTransform || "", this._activeTransform = {
                        x: 0,
                        y: 0
                    }, this._passiveTransform = {
                        x: 0,
                        y: 0
                    }
                }
                disableHandle(t) {
                    !this._disabledHandles.has(t) && this._handles.indexOf(t) > -1 && (this._disabledHandles.add(t), pd(t, !0))
                }
                enableHandle(t) {
                    this._disabledHandles.has(t) && (this._disabledHandles.delete(t), pd(t, this.disabled))
                }
                withDirection(t) {
                    return this._direction = t, this
                }
                _withDropContainer(t) {
                    this._dropContainer = t
                }
                getFreeDragPosition() {
                    const t = this.isDragging() ? this._activeTransform : this._passiveTransform;
                    return {
                        x: t.x,
                        y: t.y
                    }
                }
                setFreeDragPosition(t) {
                    return this._activeTransform = {
                        x: 0,
                        y: 0
                    }, this._passiveTransform.x = t.x, this._passiveTransform.y = t.y, this._dropContainer || this._applyRootElementTransform(t.x, t.y), this
                }
                _sortFromLastPointerPosition() {
                    const t = this._lastKnownPointerPosition;
                    t && this._dropContainer && this._updateActiveDropContainer(this._getConstrainedPointerPosition(t), t)
                }
                _removeSubscriptions() {
                    this._pointerMoveSubscription.unsubscribe(), this._pointerUpSubscription.unsubscribe(), this._scrollSubscription.unsubscribe()
                }
                _destroyPreview() {
                    this._preview && Od(this._preview), this._previewRef && this._previewRef.destroy(), this._preview = this._previewRef = null
                }
                _destroyPlaceholder() {
                    this._placeholder && Od(this._placeholder), this._placeholderRef && this._placeholderRef.destroy(), this._placeholder = this._placeholderRef = null
                }
                _endDragSequence(t) {
                    this._dragDropRegistry.isDragging(this) && (this._removeSubscriptions(), this._dragDropRegistry.stopDragging(this), this._toggleNativeDragInteractions(), this._handles && (this._rootElement.style.webkitTapHighlightColor = this._rootElementTapHighlight), this._hasStartedDragging && (this.released.next({
                        source: this
                    }), this._dropContainer ? (this._dropContainer._stopScrolling(), this._animatePreviewToPlaceholder().then(() => {
                        this._cleanupDragArtifacts(t), this._cleanupCachedDimensions(), this._dragDropRegistry.stopDragging(this)
                    })) : (this._passiveTransform.x = this._activeTransform.x, this._passiveTransform.y = this._activeTransform.y, this._ngZone.run(() => {
                        this.ended.next({
                            source: this,
                            distance: this._getDragDistance(this._getPointerPositionOnPage(t))
                        })
                    }), this._cleanupCachedDimensions(), this._dragDropRegistry.stopDragging(this))))
                }
                _startDragSequence(t) {
                    Pd(t) && (this._lastTouchEventTime = Date.now()), this._toggleNativeDragInteractions();
                    const e = this._dropContainer;
                    if (e) {
                        const t = this._rootElement,
                            n = t.parentNode,
                            i = this._preview = this._createPreviewElement(),
                            s = this._placeholder = this._createPlaceholderElement(),
                            r = this._anchor = this._anchor || this._document.createComment(""),
                            o = this._getShadowRoot();
                        n.insertBefore(r, t), fd(t, !1), this._document.body.appendChild(n.replaceChild(s, t)),
                            function(t, e) {
                                return e || t.fullscreenElement || t.webkitFullscreenElement || t.mozFullScreenElement || t.msFullscreenElement || t.body
                            }(this._document, o).appendChild(i), this.started.next({
                                source: this
                            }), e.start(), this._initialContainer = e, this._initialIndex = e.getItemIndex(this)
                    } else this.started.next({
                        source: this
                    }), this._initialContainer = this._initialIndex = void 0;
                    this._parentPositions.cache(e ? e.getScrollableParents() : [])
                }
                _initializeDragSequence(t, e) {
                    this._parentDragRef && e.stopPropagation();
                    const n = this.isDragging(),
                        i = Pd(e),
                        s = !i && 0 !== e.button,
                        r = this._rootElement,
                        o = !i && this._lastTouchEventTime && this._lastTouchEventTime + 800 > Date.now();
                    if (e.target && e.target.draggable && "mousedown" === e.type && e.preventDefault(), n || s || o) return;
                    this._handles.length && (this._rootElementTapHighlight = r.style.webkitTapHighlightColor || "", r.style.webkitTapHighlightColor = "transparent"), this._hasStartedDragging = this._hasMoved = !1, this._removeSubscriptions(), this._pointerMoveSubscription = this._dragDropRegistry.pointerMove.subscribe(this._pointerMove), this._pointerUpSubscription = this._dragDropRegistry.pointerUp.subscribe(this._pointerUp), this._scrollSubscription = this._dragDropRegistry.scroll.subscribe(t => {
                        this._updateOnScroll(t)
                    }), this._boundaryElement && (this._boundaryRect = _d(this._boundaryElement));
                    const a = this._previewTemplate;
                    this._pickupPositionInElement = a && a.template && !a.matchSize ? {
                        x: 0,
                        y: 0
                    } : this._getPointerPositionInElement(t, e);
                    const l = this._pickupPositionOnPage = this._lastKnownPointerPosition = this._getPointerPositionOnPage(e);
                    this._pointerDirectionDelta = {
                        x: 0,
                        y: 0
                    }, this._pointerPositionAtLastDirectionChange = {
                        x: l.x,
                        y: l.y
                    }, this._dragStartTime = Date.now(), this._dragDropRegistry.startDragging(this, e)
                }
                _cleanupDragArtifacts(t) {
                    fd(this._rootElement, !0), this._anchor.parentNode.replaceChild(this._rootElement, this._anchor), this._destroyPreview(), this._destroyPlaceholder(), this._boundaryRect = this._previewRect = void 0, this._ngZone.run(() => {
                        const e = this._dropContainer,
                            n = e.getItemIndex(this),
                            i = this._getPointerPositionOnPage(t),
                            s = this._getDragDistance(this._getPointerPositionOnPage(t)),
                            r = e._isOverContainer(i.x, i.y);
                        this.ended.next({
                            source: this,
                            distance: s
                        }), this.dropped.next({
                            item: this,
                            currentIndex: n,
                            previousIndex: this._initialIndex,
                            container: e,
                            previousContainer: this._initialContainer,
                            isPointerOverContainer: r,
                            distance: s
                        }), e.drop(this, n, this._initialIndex, this._initialContainer, r, s), this._dropContainer = this._initialContainer
                    })
                }
                _updateActiveDropContainer({
                    x: t,
                    y: e
                }, {
                    x: n,
                    y: i
                }) {
                    let s = this._initialContainer._getSiblingContainerFromPosition(this, t, e);
                    !s && this._dropContainer !== this._initialContainer && this._initialContainer._isOverContainer(t, e) && (s = this._initialContainer), s && s !== this._dropContainer && this._ngZone.run(() => {
                        this.exited.next({
                            item: this,
                            container: this._dropContainer
                        }), this._dropContainer.exit(this), this._dropContainer = s, this._dropContainer.enter(this, t, e, s === this._initialContainer && s.sortingDisabled ? this._initialIndex : void 0), this.entered.next({
                            item: this,
                            container: s,
                            currentIndex: s.getItemIndex(this)
                        })
                    }), this._dropContainer._startScrollingIfNecessary(n, i), this._dropContainer._sortItem(this, t, e, this._pointerDirectionDelta), this._preview.style.transform = Rd(t - this._pickupPositionInElement.x, e - this._pickupPositionInElement.y)
                }
                _createPreviewElement() {
                    const t = this._previewTemplate,
                        e = this.previewClass,
                        n = t ? t.template : null;
                    let i;
                    if (n && t) {
                        const e = t.matchSize ? this._rootElement.getBoundingClientRect() : null,
                            s = t.viewContainer.createEmbeddedView(n, t.context);
                        s.detectChanges(), i = Fd(s, this._document), this._previewRef = s, t.matchSize ? Ld(i, e) : i.style.transform = Rd(this._pickupPositionOnPage.x, this._pickupPositionOnPage.y)
                    } else {
                        const t = this._rootElement;
                        i = Cd(t), Ld(i, t.getBoundingClientRect())
                    }
                    return dd(i.style, {
                        pointerEvents: "none",
                        margin: "0",
                        position: "fixed",
                        top: "0",
                        left: "0",
                        zIndex: "" + (this._config.zIndex || 1e3)
                    }), pd(i, !1), i.classList.add("cdk-drag-preview"), i.setAttribute("dir", this._direction), e && (Array.isArray(e) ? e.forEach(t => i.classList.add(t)) : i.classList.add(e)), i
                }
                _animatePreviewToPlaceholder() {
                    if (!this._hasMoved) return Promise.resolve();
                    const t = this._placeholder.getBoundingClientRect();
                    this._preview.classList.add("cdk-drag-animating"), this._preview.style.transform = Rd(t.left, t.top);
                    const e = function(t) {
                        const e = getComputedStyle(t),
                            n = gd(e, "transition-property"),
                            i = n.find(t => "transform" === t || "all" === t);
                        if (!i) return 0;
                        const s = n.indexOf(i),
                            r = gd(e, "transition-duration"),
                            o = gd(e, "transition-delay");
                        return md(r[s]) + md(o[s])
                    }(this._preview);
                    return 0 === e ? Promise.resolve() : this._ngZone.runOutsideAngular(() => new Promise(t => {
                        const n = e => {
                                (!e || e.target === this._preview && "transform" === e.propertyName) && (this._preview.removeEventListener("transitionend", n), t(), clearTimeout(i))
                            },
                            i = setTimeout(n, 1.5 * e);
                        this._preview.addEventListener("transitionend", n)
                    }))
                }
                _createPlaceholderElement() {
                    const t = this._placeholderTemplate,
                        e = t ? t.template : null;
                    let n;
                    return e ? (this._placeholderRef = t.viewContainer.createEmbeddedView(e, t.context), this._placeholderRef.detectChanges(), n = Fd(this._placeholderRef, this._document)) : n = Cd(this._rootElement), n.classList.add("cdk-drag-placeholder"), n
                }
                _getPointerPositionInElement(t, e) {
                    const n = this._rootElement.getBoundingClientRect(),
                        i = t === this._rootElement ? null : t,
                        s = i ? i.getBoundingClientRect() : n,
                        r = Pd(e) ? e.targetTouches[0] : e,
                        o = this._getViewportScrollPosition();
                    return {
                        x: s.left - n.left + (r.pageX - s.left - o.left),
                        y: s.top - n.top + (r.pageY - s.top - o.top)
                    }
                }
                _getPointerPositionOnPage(t) {
                    const e = this._getViewportScrollPosition(),
                        n = Pd(t) ? t.touches[0] || t.changedTouches[0] || {
                            pageX: 0,
                            pageY: 0
                        } : t,
                        i = n.pageX - e.left,
                        s = n.pageY - e.top;
                    if (this._ownerSVGElement) {
                        const t = this._ownerSVGElement.getScreenCTM();
                        if (t) {
                            const e = this._ownerSVGElement.createSVGPoint();
                            return e.x = i, e.y = s, e.matrixTransform(t.inverse())
                        }
                    }
                    return {
                        x: i,
                        y: s
                    }
                }
                _getConstrainedPointerPosition(t) {
                    const e = this._dropContainer ? this._dropContainer.lockAxis : null;
                    let {
                        x: n,
                        y: i
                    } = this.constrainPosition ? this.constrainPosition(t, this) : t;
                    if ("x" === this.lockAxis || "x" === e ? i = this._pickupPositionOnPage.y : "y" !== this.lockAxis && "y" !== e || (n = this._pickupPositionOnPage.x), this._boundaryRect) {
                        const {
                            x: t,
                            y: e
                        } = this._pickupPositionInElement, s = this._boundaryRect, r = this._previewRect, o = s.top + e, a = s.bottom - (r.height - e);
                        n = Id(n, s.left + t, s.right - (r.width - t)), i = Id(i, o, a)
                    }
                    return {
                        x: n,
                        y: i
                    }
                }
                _updatePointerDirectionDelta(t) {
                    const {
                        x: e,
                        y: n
                    } = t, i = this._pointerDirectionDelta, s = this._pointerPositionAtLastDirectionChange, r = Math.abs(e - s.x), o = Math.abs(n - s.y);
                    return r > this._config.pointerDirectionChangeThreshold && (i.x = e > s.x ? 1 : -1, s.x = e), o > this._config.pointerDirectionChangeThreshold && (i.y = n > s.y ? 1 : -1, s.y = n), i
                }
                _toggleNativeDragInteractions() {
                    if (!this._rootElement || !this._handles) return;
                    const t = this._handles.length > 0 || !this.isDragging();
                    t !== this._nativeInteractionsEnabled && (this._nativeInteractionsEnabled = t, pd(this._rootElement, t))
                }
                _removeRootElementListeners(t) {
                    t.removeEventListener("mousedown", this._pointerDown, Ad), t.removeEventListener("touchstart", this._pointerDown, Td)
                }
                _applyRootElementTransform(t, e) {
                    const n = Rd(t, e);
                    null == this._initialTransform && (this._initialTransform = this._rootElement.style.transform || ""), this._rootElement.style.transform = this._initialTransform ? n + " " + this._initialTransform : n
                }
                _getDragDistance(t) {
                    const e = this._pickupPositionOnPage;
                    return e ? {
                        x: t.x - e.x,
                        y: t.y - e.y
                    } : {
                        x: 0,
                        y: 0
                    }
                }
                _cleanupCachedDimensions() {
                    this._boundaryRect = this._previewRect = void 0, this._parentPositions.clear()
                }
                _containInsideBoundaryOnResize() {
                    let {
                        x: t,
                        y: e
                    } = this._passiveTransform;
                    if (0 === t && 0 === e || this.isDragging() || !this._boundaryElement) return;
                    const n = this._boundaryElement.getBoundingClientRect(),
                        i = this._rootElement.getBoundingClientRect();
                    if (0 === n.width && 0 === n.height || 0 === i.width && 0 === i.height) return;
                    const s = n.left - i.left,
                        r = i.right - n.right,
                        o = n.top - i.top,
                        a = i.bottom - n.bottom;
                    n.width > i.width ? (s > 0 && (t += s), r > 0 && (t -= r)) : t = 0, n.height > i.height ? (o > 0 && (e += o), a > 0 && (e -= a)) : e = 0, t === this._passiveTransform.x && e === this._passiveTransform.y || this.setFreeDragPosition({
                        y: e,
                        x: t
                    })
                }
                _getDragStartDelay(t) {
                    const e = this.dragStartDelay;
                    return "number" == typeof e ? e : Pd(t) ? e.touch : e ? e.mouse : 0
                }
                _updateOnScroll(t) {
                    const e = this._parentPositions.handleScroll(t);
                    if (e) {
                        const n = t.target;
                        this._boundaryRect && (n === this._document || n !== this._boundaryElement && n.contains(this._boundaryElement)) && bd(this._boundaryRect, e.top, e.left), this._pickupPositionOnPage.x += e.left, this._pickupPositionOnPage.y += e.top, this._dropContainer || (this._activeTransform.x -= e.left, this._activeTransform.y -= e.top, this._applyRootElementTransform(this._activeTransform.x, this._activeTransform.y))
                    }
                }
                _getViewportScrollPosition() {
                    const t = this._parentPositions.positions.get(this._document);
                    return t ? t.scrollPosition : this._viewportRuler.getViewportScrollPosition()
                }
                _getShadowRoot() {
                    return void 0 === this._cachedShadowRoot && (this._cachedShadowRoot = vu(this._rootElement)), this._cachedShadowRoot
                }
            }

            function Rd(t, e) {
                return `translate3d(${Math.round(t)}px, ${Math.round(e)}px, 0)`
            }

            function Id(t, e, n) {
                return Math.max(e, Math.min(n, t))
            }

            function Od(t) {
                t && t.parentNode && t.parentNode.removeChild(t)
            }

            function Pd(t) {
                return "t" === t.type[0]
            }

            function Fd(t, e) {
                const n = t.rootNodes;
                if (1 === n.length && n[0].nodeType === e.ELEMENT_NODE) return n[0];
                const i = e.createElement("div");
                return n.forEach(t => i.appendChild(t)), i
            }

            function Ld(t, e) {
                t.style.width = e.width + "px", t.style.height = e.height + "px", t.style.transform = Rd(e.left, e.top)
            }

            function Nd(t, e) {
                return Math.max(0, Math.min(e, t))
            }
            class Md {
                constructor(t, e, n, i, s) {
                    this._dragDropRegistry = e, this._ngZone = i, this._viewportRuler = s, this.disabled = !1, this.sortingDisabled = !1, this.autoScrollDisabled = !1, this.autoScrollStep = 2, this.enterPredicate = () => !0, this.sortPredicate = () => !0, this.beforeStarted = new x, this.entered = new x, this.exited = new x, this.dropped = new x, this.sorted = new x, this._isDragging = !1, this._itemPositions = [], this._previousSwap = {
                        drag: null,
                        delta: 0,
                        overlaps: !1
                    }, this._draggables = [], this._siblings = [], this._orientation = "vertical", this._activeSiblings = new Set, this._direction = "ltr", this._viewportScrollSubscription = u.EMPTY, this._verticalScrollDirection = 0, this._horizontalScrollDirection = 0, this._stopScrollTimers = new x, this._cachedShadowRoot = null, this._startScrollInterval = () => {
                        this._stopScrolling(),
                            function(t = 0, e = $h) {
                                return (!Ku(t) || t < 0) && (t = 0), e && "function" == typeof e.schedule || (e = $h), new y(n => (n.add(e.schedule(ud, t, {
                                    subscriber: n,
                                    counter: 0,
                                    period: t
                                })), n))
                            }(0, Wu).pipe(Ju(this._stopScrollTimers)).subscribe(() => {
                                const t = this._scrollNode,
                                    e = this.autoScrollStep;
                                1 === this._verticalScrollDirection ? jd(t, -e) : 2 === this._verticalScrollDirection && jd(t, e), 1 === this._horizontalScrollDirection ? Bd(t, -e) : 2 === this._horizontalScrollDirection && Bd(t, e)
                            })
                    }, this.element = lu(t), this._document = n, this.withScrollableParents([this.element]), e.registerDropContainer(this), this._parentPositions = new wd(n, s)
                }
                dispose() {
                    this._stopScrolling(), this._stopScrollTimers.complete(), this._viewportScrollSubscription.unsubscribe(), this.beforeStarted.complete(), this.entered.complete(), this.exited.complete(), this.dropped.complete(), this.sorted.complete(), this._activeSiblings.clear(), this._scrollNode = null, this._parentPositions.clear(), this._dragDropRegistry.removeDropContainer(this)
                }
                isDragging() {
                    return this._isDragging
                }
                start() {
                    this._draggingStarted(), this._notifyReceivingSiblings()
                }
                enter(t, e, n, i) {
                    let s;
                    this._draggingStarted(), null == i ? (s = this.sortingDisabled ? this._draggables.indexOf(t) : -1, -1 === s && (s = this._getItemIndexFromPointerPosition(t, e, n))) : s = i;
                    const r = this._activeDraggables,
                        o = r.indexOf(t),
                        a = t.getPlaceholderElement();
                    let l = r[s];
                    if (l === t && (l = r[s + 1]), o > -1 && r.splice(o, 1), l && !this._dragDropRegistry.isDragging(l)) {
                        const e = l.getRootElement();
                        e.parentElement.insertBefore(a, e), r.splice(s, 0, t)
                    } else if (this._shouldEnterAsFirstChild(e, n)) {
                        const e = r[0].getRootElement();
                        e.parentNode.insertBefore(a, e), r.unshift(t)
                    } else lu(this.element).appendChild(a), r.push(t);
                    a.style.transform = "", this._cacheItemPositions(), this._cacheParentPositions(), this._notifyReceivingSiblings(), this.entered.next({
                        item: t,
                        container: this,
                        currentIndex: this.getItemIndex(t)
                    })
                }
                exit(t) {
                    this._reset(), this.exited.next({
                        item: t,
                        container: this
                    })
                }
                drop(t, e, n, i, s, r) {
                    this._reset(), this.dropped.next({
                        item: t,
                        currentIndex: e,
                        previousIndex: n,
                        container: this,
                        previousContainer: i,
                        isPointerOverContainer: s,
                        distance: r
                    })
                }
                withItems(t) {
                    const e = this._draggables;
                    return this._draggables = t, t.forEach(t => t._withDropContainer(this)), this.isDragging() && (e.filter(t => t.isDragging()).every(e => -1 === t.indexOf(e)) ? this._reset() : this._cacheItems()), this
                }
                withDirection(t) {
                    return this._direction = t, this
                }
                connectedTo(t) {
                    return this._siblings = t.slice(), this
                }
                withOrientation(t) {
                    return this._orientation = t, this
                }
                withScrollableParents(t) {
                    const e = lu(this.element);
                    return this._scrollableElements = -1 === t.indexOf(e) ? [e, ...t] : t.slice(), this
                }
                getScrollableParents() {
                    return this._scrollableElements
                }
                getItemIndex(t) {
                    return this._isDragging ? Vd("horizontal" === this._orientation && "rtl" === this._direction ? this._itemPositions.slice().reverse() : this._itemPositions, e => e.drag === t) : this._draggables.indexOf(t)
                }
                isReceiving() {
                    return this._activeSiblings.size > 0
                }
                _sortItem(t, e, n, i) {
                    if (this.sortingDisabled || !this._clientRect || !vd(this._clientRect, .05, e, n)) return;
                    const s = this._itemPositions,
                        r = this._getItemIndexFromPointerPosition(t, e, n, i);
                    if (-1 === r && s.length > 0) return;
                    const o = "horizontal" === this._orientation,
                        a = Vd(s, e => e.drag === t),
                        l = s[r],
                        c = l.clientRect,
                        h = a > r ? 1 : -1,
                        u = this._getItemOffsetPx(s[a].clientRect, c, h),
                        d = this._getSiblingOffsetPx(a, s, h),
                        p = s.slice();
                    ! function(t, e, n) {
                        const i = Nd(e, t.length - 1),
                            s = Nd(n, t.length - 1);
                        if (i === s) return;
                        const r = t[i],
                            o = s < i ? -1 : 1;
                        for (let a = i; a !== s; a += o) t[a] = t[a + o];
                        t[s] = r
                    }(s, a, r), this.sorted.next({
                        previousIndex: a,
                        currentIndex: r,
                        container: this,
                        item: t
                    }), s.forEach((e, n) => {
                        if (p[n] === e) return;
                        const i = e.drag === t,
                            s = i ? u : d,
                            r = i ? t.getPlaceholderElement() : e.drag.getRootElement();
                        e.offset += s, o ? (r.style.transform = `translate3d(${Math.round(e.offset)}px, 0, 0)`, bd(e.clientRect, 0, s)) : (r.style.transform = `translate3d(0, ${Math.round(e.offset)}px, 0)`, bd(e.clientRect, s, 0))
                    }), this._previousSwap.overlaps = yd(c, e, n), this._previousSwap.drag = l.drag, this._previousSwap.delta = o ? i.x : i.y
                }
                _startScrollingIfNecessary(t, e) {
                    if (this.autoScrollDisabled) return;
                    let n, i = 0,
                        s = 0;
                    if (this._parentPositions.positions.forEach((r, o) => {
                            o !== this._document && r.clientRect && !n && vd(r.clientRect, .05, t, e) && ([i, s] = function(t, e, n, i) {
                                const s = Hd(e, i),
                                    r = zd(e, n);
                                let o = 0,
                                    a = 0;
                                if (s) {
                                    const e = t.scrollTop;
                                    1 === s ? e > 0 && (o = 1) : t.scrollHeight - e > t.clientHeight && (o = 2)
                                }
                                if (r) {
                                    const e = t.scrollLeft;
                                    1 === r ? e > 0 && (a = 1) : t.scrollWidth - e > t.clientWidth && (a = 2)
                                }
                                return [o, a]
                            }(o, r.clientRect, t, e), (i || s) && (n = o))
                        }), !i && !s) {
                        const {
                            width: r,
                            height: o
                        } = this._viewportRuler.getViewportSize(), a = {
                            width: r,
                            height: o,
                            top: 0,
                            right: r,
                            bottom: o,
                            left: 0
                        };
                        i = Hd(a, e), s = zd(a, t), n = window
                    }!n || i === this._verticalScrollDirection && s === this._horizontalScrollDirection && n === this._scrollNode || (this._verticalScrollDirection = i, this._horizontalScrollDirection = s, this._scrollNode = n, (i || s) && n ? this._ngZone.runOutsideAngular(this._startScrollInterval) : this._stopScrolling())
                }
                _stopScrolling() {
                    this._stopScrollTimers.next()
                }
                _draggingStarted() {
                    const t = lu(this.element).style;
                    this.beforeStarted.next(), this._isDragging = !0, this._initialScrollSnap = t.msScrollSnapType || t.scrollSnapType || "", t.scrollSnapType = t.msScrollSnapType = "none", this._cacheItems(), this._viewportScrollSubscription.unsubscribe(), this._listenToScrollEvents()
                }
                _cacheParentPositions() {
                    const t = lu(this.element);
                    this._parentPositions.cache(this._scrollableElements), this._clientRect = this._parentPositions.positions.get(t).clientRect
                }
                _cacheItemPositions() {
                    const t = "horizontal" === this._orientation;
                    this._itemPositions = this._activeDraggables.map(t => {
                        const e = t.getVisibleElement();
                        return {
                            drag: t,
                            offset: 0,
                            clientRect: _d(e)
                        }
                    }).sort((e, n) => t ? e.clientRect.left - n.clientRect.left : e.clientRect.top - n.clientRect.top)
                }
                _reset() {
                    this._isDragging = !1;
                    const t = lu(this.element).style;
                    t.scrollSnapType = t.msScrollSnapType = this._initialScrollSnap, this._activeDraggables.forEach(t => {
                        const e = t.getRootElement();
                        e && (e.style.transform = "")
                    }), this._siblings.forEach(t => t._stopReceiving(this)), this._activeDraggables = [], this._itemPositions = [], this._previousSwap.drag = null, this._previousSwap.delta = 0, this._previousSwap.overlaps = !1, this._stopScrolling(), this._viewportScrollSubscription.unsubscribe(), this._parentPositions.clear()
                }
                _getSiblingOffsetPx(t, e, n) {
                    const i = "horizontal" === this._orientation,
                        s = e[t].clientRect,
                        r = e[t + -1 * n];
                    let o = s[i ? "width" : "height"] * n;
                    if (r) {
                        const t = i ? "left" : "top",
                            e = i ? "right" : "bottom"; - 1 === n ? o -= r.clientRect[t] - s[e] : o += s[t] - r.clientRect[e]
                    }
                    return o
                }
                _getItemOffsetPx(t, e, n) {
                    const i = "horizontal" === this._orientation;
                    let s = i ? e.left - t.left : e.top - t.top;
                    return -1 === n && (s += i ? e.width - t.width : e.height - t.height), s
                }
                _shouldEnterAsFirstChild(t, e) {
                    if (!this._activeDraggables.length) return !1;
                    const n = this._itemPositions,
                        i = "horizontal" === this._orientation;
                    if (n[0].drag !== this._activeDraggables[0]) {
                        const s = n[n.length - 1].clientRect;
                        return i ? t >= s.right : e >= s.bottom
                    } {
                        const s = n[0].clientRect;
                        return i ? t <= s.left : e <= s.top
                    }
                }
                _getItemIndexFromPointerPosition(t, e, n, i) {
                    const s = "horizontal" === this._orientation,
                        r = Vd(this._itemPositions, ({
                            drag: r,
                            clientRect: o
                        }, a, l) => {
                            if (r === t) return l.length < 2;
                            if (i) {
                                const t = s ? i.x : i.y;
                                if (r === this._previousSwap.drag && this._previousSwap.overlaps && t === this._previousSwap.delta) return !1
                            }
                            return s ? e >= Math.floor(o.left) && e < Math.floor(o.right) : n >= Math.floor(o.top) && n < Math.floor(o.bottom)
                        });
                    return -1 !== r && this.sortPredicate(r, t, this) ? r : -1
                }
                _cacheItems() {
                    this._activeDraggables = this._draggables.slice(), this._cacheItemPositions(), this._cacheParentPositions()
                }
                _isOverContainer(t, e) {
                    return null != this._clientRect && yd(this._clientRect, t, e)
                }
                _getSiblingContainerFromPosition(t, e, n) {
                    return this._siblings.find(i => i._canReceive(t, e, n))
                }
                _canReceive(t, e, n) {
                    if (!this._clientRect || !yd(this._clientRect, e, n) || !this.enterPredicate(t, this)) return !1;
                    const i = this._getShadowRoot().elementFromPoint(e, n);
                    if (!i) return !1;
                    const s = lu(this.element);
                    return i === s || s.contains(i)
                }
                _startReceiving(t, e) {
                    const n = this._activeSiblings;
                    !n.has(t) && e.every(t => this.enterPredicate(t, this) || this._draggables.indexOf(t) > -1) && (n.add(t), this._cacheParentPositions(), this._listenToScrollEvents())
                }
                _stopReceiving(t) {
                    this._activeSiblings.delete(t), this._viewportScrollSubscription.unsubscribe()
                }
                _listenToScrollEvents() {
                    this._viewportScrollSubscription = this._dragDropRegistry.scroll.subscribe(t => {
                        if (this.isDragging()) {
                            const e = this._parentPositions.handleScroll(t);
                            e && (this._itemPositions.forEach(({
                                clientRect: t
                            }) => {
                                bd(t, e.top, e.left)
                            }), this._itemPositions.forEach(({
                                drag: t
                            }) => {
                                this._dragDropRegistry.isDragging(t) && t._sortFromLastPointerPosition()
                            }))
                        } else this.isReceiving() && this._cacheParentPositions()
                    })
                }
                _getShadowRoot() {
                    if (!this._cachedShadowRoot) {
                        const t = vu(lu(this.element));
                        this._cachedShadowRoot = t || this._document
                    }
                    return this._cachedShadowRoot
                }
                _notifyReceivingSiblings() {
                    const t = this._activeDraggables.filter(t => t.isDragging());
                    this._siblings.forEach(e => e._startReceiving(this, t))
                }
            }

            function Vd(t, e) {
                for (let n = 0; n < t.length; n++)
                    if (e(t[n], n, t)) return n;
                return -1
            }

            function jd(t, e) {
                t === window ? t.scrollBy(0, e) : t.scrollTop += e
            }

            function Bd(t, e) {
                t === window ? t.scrollBy(e, 0) : t.scrollLeft += e
            }

            function Hd(t, e) {
                const {
                    top: n,
                    bottom: i,
                    height: s
                } = t, r = .05 * s;
                return e >= n - r && e <= n + r ? 1 : e >= i - r && e <= i + r ? 2 : 0
            }

            function zd(t, e) {
                const {
                    left: n,
                    right: i,
                    width: s
                } = t, r = .05 * s;
                return e >= n - r && e <= n + r ? 1 : e >= i - r && e <= i + r ? 2 : 0
            }
            const qd = yu({
                passive: !1,
                capture: !0
            });
            let Ud = (() => {
                class t {
                    constructor(t, e) {
                        this._ngZone = t, this._dropInstances = new Set, this._dragInstances = new Set, this._activeDragInstances = [], this._globalListeners = new Map, this._draggingPredicate = t => t.isDragging(), this.pointerMove = new x, this.pointerUp = new x, this.scroll = new x, this._preventDefaultWhileDragging = t => {
                            this._activeDragInstances.length > 0 && t.preventDefault()
                        }, this._persistentTouchmoveListener = t => {
                            this._activeDragInstances.length > 0 && (this._activeDragInstances.some(this._draggingPredicate) && t.preventDefault(), this.pointerMove.next(t))
                        }, this._document = e
                    }
                    registerDropContainer(t) {
                        this._dropInstances.has(t) || this._dropInstances.add(t)
                    }
                    registerDragItem(t) {
                        this._dragInstances.add(t), 1 === this._dragInstances.size && this._ngZone.runOutsideAngular(() => {
                            this._document.addEventListener("touchmove", this._persistentTouchmoveListener, qd)
                        })
                    }
                    removeDropContainer(t) {
                        this._dropInstances.delete(t)
                    }
                    removeDragItem(t) {
                        this._dragInstances.delete(t), this.stopDragging(t), 0 === this._dragInstances.size && this._document.removeEventListener("touchmove", this._persistentTouchmoveListener, qd)
                    }
                    startDragging(t, e) {
                        if (!(this._activeDragInstances.indexOf(t) > -1) && (this._activeDragInstances.push(t), 1 === this._activeDragInstances.length)) {
                            const t = e.type.startsWith("touch");
                            this._globalListeners.set(t ? "touchend" : "mouseup", {
                                handler: t => this.pointerUp.next(t),
                                options: !0
                            }).set("scroll", {
                                handler: t => this.scroll.next(t),
                                options: !0
                            }).set("selectstart", {
                                handler: this._preventDefaultWhileDragging,
                                options: qd
                            }), t || this._globalListeners.set("mousemove", {
                                handler: t => this.pointerMove.next(t),
                                options: qd
                            }), this._ngZone.runOutsideAngular(() => {
                                this._globalListeners.forEach((t, e) => {
                                    this._document.addEventListener(e, t.handler, t.options)
                                })
                            })
                        }
                    }
                    stopDragging(t) {
                        const e = this._activeDragInstances.indexOf(t);
                        e > -1 && (this._activeDragInstances.splice(e, 1), 0 === this._activeDragInstances.length && this._clearGlobalListeners())
                    }
                    isDragging(t) {
                        return this._activeDragInstances.indexOf(t) > -1
                    }
                    ngOnDestroy() {
                        this._dragInstances.forEach(t => this.removeDragItem(t)), this._dropInstances.forEach(t => this.removeDropContainer(t)), this._clearGlobalListeners(), this.pointerMove.complete(), this.pointerUp.complete()
                    }
                    _clearGlobalListeners() {
                        this._globalListeners.forEach((t, e) => {
                            this._document.removeEventListener(e, t.handler, t.options)
                        }), this._globalListeners.clear()
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(rc), di(Pc))
                }, t.\u0275prov = lt({
                    factory: function() {
                        return new t(di(rc), di(Pc))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })();
            const $d = {
                dragStartThreshold: 5,
                pointerDirectionChangeThreshold: 5
            };
            let Wd = (() => {
                    class t {
                        constructor(t, e, n, i) {
                            this._document = t, this._ngZone = e, this._viewportRuler = n, this._dragDropRegistry = i
                        }
                        createDrag(t, e = $d) {
                            return new Dd(t, e, this._document, this._ngZone, this._viewportRuler, this._dragDropRegistry)
                        }
                        createDropList(t) {
                            return new Md(t, this._dragDropRegistry, this._document, this._ngZone, this._viewportRuler)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Pc), di(rc), di(ld), di(Ud))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(Pc), di(rc), di(ld), di(Ud))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                Zd = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [Wd],
                        imports: [cd]
                    }), t
                })();
            class Qd {
                attach(t) {
                    return this._attachedHost = t, t.attach(this)
                }
                detach() {
                    let t = this._attachedHost;
                    null != t && (this._attachedHost = null, t.detach())
                }
                get isAttached() {
                    return null != this._attachedHost
                }
                setAttachedHost(t) {
                    this._attachedHost = t
                }
            }
            class Kd extends Qd {
                constructor(t, e, n, i) {
                    super(), this.component = t, this.viewContainerRef = e, this.injector = n, this.componentFactoryResolver = i
                }
            }
            class Gd extends Qd {
                constructor(t, e, n) {
                    super(), this.templateRef = t, this.viewContainerRef = e, this.context = n
                }
                get origin() {
                    return this.templateRef.elementRef
                }
                attach(t, e = this.context) {
                    return this.context = e, super.attach(t)
                }
                detach() {
                    return this.context = void 0, super.detach()
                }
            }
            class Yd extends Qd {
                constructor(t) {
                    super(), this.element = t instanceof ba ? t.nativeElement : t
                }
            }
            class Xd {
                constructor() {
                    this._isDisposed = !1, this.attachDomPortal = null
                }
                hasAttached() {
                    return !!this._attachedPortal
                }
                attach(t) {
                    return t instanceof Kd ? (this._attachedPortal = t, this.attachComponentPortal(t)) : t instanceof Gd ? (this._attachedPortal = t, this.attachTemplatePortal(t)) : this.attachDomPortal && t instanceof Yd ? (this._attachedPortal = t, this.attachDomPortal(t)) : void 0
                }
                detach() {
                    this._attachedPortal && (this._attachedPortal.setAttachedHost(null), this._attachedPortal = null), this._invokeDisposeFn()
                }
                dispose() {
                    this.hasAttached() && this.detach(), this._invokeDisposeFn(), this._isDisposed = !0
                }
                setDisposeFn(t) {
                    this._disposeFn = t
                }
                _invokeDisposeFn() {
                    this._disposeFn && (this._disposeFn(), this._disposeFn = null)
                }
            }
            class Jd extends Xd {
                constructor(t, e, n, i, s) {
                    super(), this.outletElement = t, this._componentFactoryResolver = e, this._appRef = n, this._defaultInjector = i, this.attachDomPortal = t => {
                        const e = t.element,
                            n = this._document.createComment("dom-portal");
                        e.parentNode.insertBefore(n, e), this.outletElement.appendChild(e), this._attachedPortal = t, super.setDisposeFn(() => {
                            n.parentNode && n.parentNode.replaceChild(e, n)
                        })
                    }, this._document = s
                }
                attachComponentPortal(t) {
                    const e = (t.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(t.component);
                    let n;
                    return t.viewContainerRef ? (n = t.viewContainerRef.createComponent(e, t.viewContainerRef.length, t.injector || t.viewContainerRef.injector), this.setDisposeFn(() => n.destroy())) : (n = e.create(t.injector || this._defaultInjector), this._appRef.attachView(n.hostView), this.setDisposeFn(() => {
                        this._appRef.detachView(n.hostView), n.destroy()
                    })), this.outletElement.appendChild(this._getComponentRootNode(n)), this._attachedPortal = t, n
                }
                attachTemplatePortal(t) {
                    let e = t.viewContainerRef,
                        n = e.createEmbeddedView(t.templateRef, t.context);
                    return n.rootNodes.forEach(t => this.outletElement.appendChild(t)), n.detectChanges(), this.setDisposeFn(() => {
                        let t = e.indexOf(n); - 1 !== t && e.remove(t)
                    }), this._attachedPortal = t, n
                }
                dispose() {
                    super.dispose(), null != this.outletElement.parentNode && this.outletElement.parentNode.removeChild(this.outletElement)
                }
                _getComponentRootNode(t) {
                    return t.hostView.rootNodes[0]
                }
            }
            let tp = (() => {
                    class t extends Xd {
                        constructor(t, e, n) {
                            super(), this._componentFactoryResolver = t, this._viewContainerRef = e, this._isInitialized = !1, this.attached = new ml, this.attachDomPortal = t => {
                                const e = t.element,
                                    n = this._document.createComment("dom-portal");
                                t.setAttachedHost(this), e.parentNode.insertBefore(n, e), this._getRootNode().appendChild(e), this._attachedPortal = t, super.setDisposeFn(() => {
                                    n.parentNode && n.parentNode.replaceChild(e, n)
                                })
                            }, this._document = n
                        }
                        get portal() {
                            return this._attachedPortal
                        }
                        set portal(t) {
                            (!this.hasAttached() || t || this._isInitialized) && (this.hasAttached() && super.detach(), t && super.attach(t), this._attachedPortal = t)
                        }
                        get attachedRef() {
                            return this._attachedRef
                        }
                        ngOnInit() {
                            this._isInitialized = !0
                        }
                        ngOnDestroy() {
                            super.dispose(), this._attachedPortal = null, this._attachedRef = null
                        }
                        attachComponentPortal(t) {
                            t.setAttachedHost(this);
                            const e = null != t.viewContainerRef ? t.viewContainerRef : this._viewContainerRef,
                                n = (t.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(t.component),
                                i = e.createComponent(n, e.length, t.injector || e.injector);
                            return e !== this._viewContainerRef && this._getRootNode().appendChild(i.hostView.rootNodes[0]), super.setDisposeFn(() => i.destroy()), this._attachedPortal = t, this._attachedRef = i, this.attached.emit(i), i
                        }
                        attachTemplatePortal(t) {
                            t.setAttachedHost(this);
                            const e = this._viewContainerRef.createEmbeddedView(t.templateRef, t.context);
                            return super.setDisposeFn(() => this._viewContainerRef.clear()), this._attachedPortal = t, this._attachedRef = e, this.attached.emit(e), e
                        }
                        _getRootNode() {
                            const t = this._viewContainerRef.element.nativeElement;
                            return t.nodeType === t.ELEMENT_NODE ? t : t.parentNode
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(ma), _o(Ja), _o(Pc))
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "cdkPortalOutlet", ""]
                        ],
                        inputs: {
                            portal: ["cdkPortalOutlet", "portal"]
                        },
                        outputs: {
                            attached: "attached"
                        },
                        exportAs: ["cdkPortalOutlet"],
                        features: [io]
                    }), t
                })(),
                ep = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })(),
                np = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [od]
                        ]
                    }), t
                })(),
                ip = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [hd]
                        ]
                    }), t
                })(),
                sp = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })();
            const rp = new Ea("11.2.13");
            class op {}
            const ap = "*";

            function lp(t, e) {
                return {
                    type: 7,
                    name: t,
                    definitions: e,
                    options: {}
                }
            }

            function cp(t, e = null) {
                return {
                    type: 4,
                    styles: e,
                    timings: t
                }
            }

            function hp(t, e = null) {
                return {
                    type: 2,
                    steps: t,
                    options: e
                }
            }

            function up(t) {
                return {
                    type: 6,
                    styles: t,
                    offset: null
                }
            }

            function dp(t, e, n) {
                return {
                    type: 0,
                    name: t,
                    styles: e,
                    options: n
                }
            }

            function pp(t, e, n = null) {
                return {
                    type: 1,
                    expr: t,
                    animation: e,
                    options: n
                }
            }

            function fp(t) {
                Promise.resolve(null).then(t)
            }
            class mp {
                constructor(t = 0, e = 0) {
                    this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = t + e
                }
                _onFinish() {
                    this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
                }
                onStart(t) {
                    this._onStartFns.push(t)
                }
                onDone(t) {
                    this._onDoneFns.push(t)
                }
                onDestroy(t) {
                    this._onDestroyFns.push(t)
                }
                hasStarted() {
                    return this._started
                }
                init() {}
                play() {
                    this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0
                }
                triggerMicrotask() {
                    fp(() => this._onFinish())
                }
                _onStart() {
                    this._onStartFns.forEach(t => t()), this._onStartFns = []
                }
                pause() {}
                restart() {}
                finish() {
                    this._onFinish()
                }
                destroy() {
                    this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
                }
                reset() {}
                setPosition(t) {
                    this._position = this.totalTime ? t * this.totalTime : 1
                }
                getPosition() {
                    return this.totalTime ? this._position / this.totalTime : 1
                }
                triggerCallback(t) {
                    const e = "start" == t ? this._onStartFns : this._onDoneFns;
                    e.forEach(t => t()), e.length = 0
                }
            }
            class gp {
                constructor(t) {
                    this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = t;
                    let e = 0,
                        n = 0,
                        i = 0;
                    const s = this.players.length;
                    0 == s ? fp(() => this._onFinish()) : this.players.forEach(t => {
                        t.onDone(() => {
                            ++e == s && this._onFinish()
                        }), t.onDestroy(() => {
                            ++n == s && this._onDestroy()
                        }), t.onStart(() => {
                            ++i == s && this._onStart()
                        })
                    }), this.totalTime = this.players.reduce((t, e) => Math.max(t, e.totalTime), 0)
                }
                _onFinish() {
                    this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
                }
                init() {
                    this.players.forEach(t => t.init())
                }
                onStart(t) {
                    this._onStartFns.push(t)
                }
                _onStart() {
                    this.hasStarted() || (this._started = !0, this._onStartFns.forEach(t => t()), this._onStartFns = [])
                }
                onDone(t) {
                    this._onDoneFns.push(t)
                }
                onDestroy(t) {
                    this._onDestroyFns.push(t)
                }
                hasStarted() {
                    return this._started
                }
                play() {
                    this.parentPlayer || this.init(), this._onStart(), this.players.forEach(t => t.play())
                }
                pause() {
                    this.players.forEach(t => t.pause())
                }
                restart() {
                    this.players.forEach(t => t.restart())
                }
                finish() {
                    this._onFinish(), this.players.forEach(t => t.finish())
                }
                destroy() {
                    this._onDestroy()
                }
                _onDestroy() {
                    this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(t => t.destroy()), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
                }
                reset() {
                    this.players.forEach(t => t.reset()), this._destroyed = !1, this._finished = !1, this._started = !1
                }
                setPosition(t) {
                    const e = t * this.totalTime;
                    this.players.forEach(t => {
                        const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
                        t.setPosition(n)
                    })
                }
                getPosition() {
                    const t = this.players.reduce((t, e) => null === t || e.totalTime > t.totalTime ? e : t, null);
                    return null != t ? t.getPosition() : 0
                }
                beforeDestroy() {
                    this.players.forEach(t => {
                        t.beforeDestroy && t.beforeDestroy()
                    })
                }
                triggerCallback(t) {
                    const e = "start" == t ? this._onStartFns : this._onDoneFns;
                    e.forEach(t => t()), e.length = 0
                }
            }

            function _p() {
                return "undefined" != typeof process && "[object process]" === {}.toString.call(process)
            }

            function yp(t) {
                switch (t.length) {
                    case 0:
                        return new mp;
                    case 1:
                        return t[0];
                    default:
                        return new gp(t)
                }
            }

            function bp(t, e, n, i, s = {}, r = {}) {
                const o = [],
                    a = [];
                let l = -1,
                    c = null;
                if (i.forEach(t => {
                        const n = t.offset,
                            i = n == l,
                            h = i && c || {};
                        Object.keys(t).forEach(n => {
                            let i = n,
                                a = t[n];
                            if ("offset" !== n) switch (i = e.normalizePropertyName(i, o), a) {
                                case "!":
                                    a = s[n];
                                    break;
                                case ap:
                                    a = r[n];
                                    break;
                                default:
                                    a = e.normalizeStyleValue(n, i, a, o)
                            }
                            h[i] = a
                        }), i || a.push(h), c = h, l = n
                    }), o.length) {
                    const t = "\n - ";
                    throw new Error(`Unable to animate due to the following errors:${t}${o.join(t)}`)
                }
                return a
            }

            function vp(t, e, n, i) {
                switch (e) {
                    case "start":
                        t.onStart(() => i(n && wp(n, "start", t)));
                        break;
                    case "done":
                        t.onDone(() => i(n && wp(n, "done", t)));
                        break;
                    case "destroy":
                        t.onDestroy(() => i(n && wp(n, "destroy", t)))
                }
            }

            function wp(t, e, n) {
                const i = n.totalTime,
                    s = Cp(t.element, t.triggerName, t.fromState, t.toState, e || t.phaseName, null == i ? t.totalTime : i, !!n.disabled),
                    r = t._data;
                return null != r && (s._data = r), s
            }

            function Cp(t, e, n, i, s = "", r = 0, o) {
                return {
                    element: t,
                    triggerName: e,
                    fromState: n,
                    toState: i,
                    phaseName: s,
                    totalTime: r,
                    disabled: !!o
                }
            }

            function xp(t, e, n) {
                let i;
                return t instanceof Map ? (i = t.get(e), i || t.set(e, i = n)) : (i = t[e], i || (i = t[e] = n)), i
            }

            function Ep(t) {
                const e = t.indexOf(":");
                return [t.substring(1, e), t.substr(e + 1)]
            }
            let Sp = (t, e) => !1,
                kp = (t, e) => !1,
                Tp = (t, e, n) => [];
            const Ap = _p();
            (Ap || "undefined" != typeof Element) && (Sp = (t, e) => t.contains(e), kp = (() => {
                if (Ap || Element.prototype.matches) return (t, e) => t.matches(e);
                {
                    const t = Element.prototype,
                        e = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector;
                    return e ? (t, n) => e.apply(t, [n]) : kp
                }
            })(), Tp = (t, e, n) => {
                let i = [];
                if (n) {
                    const n = t.querySelectorAll(e);
                    for (let t = 0; t < n.length; t++) i.push(n[t])
                } else {
                    const n = t.querySelector(e);
                    n && i.push(n)
                }
                return i
            });
            let Dp = null,
                Rp = !1;

            function Ip(t) {
                Dp || (Dp = ("undefined" != typeof document ? document.body : null) || {}, Rp = !!Dp.style && "WebkitAppearance" in Dp.style);
                let e = !0;
                return Dp.style && ! function(t) {
                    return "ebkit" == t.substring(1, 6)
                }(t) && (e = t in Dp.style, !e && Rp) && (e = "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in Dp.style), e
            }
            const Op = kp,
                Pp = Sp,
                Fp = Tp;

            function Lp(t) {
                const e = {};
                return Object.keys(t).forEach(n => {
                    const i = n.replace(/([a-z])([A-Z])/g, "$1-$2");
                    e[i] = t[n]
                }), e
            }
            let Np = (() => {
                    class t {
                        validateStyleProperty(t) {
                            return Ip(t)
                        }
                        matchesElement(t, e) {
                            return Op(t, e)
                        }
                        containsElement(t, e) {
                            return Pp(t, e)
                        }
                        query(t, e, n) {
                            return Fp(t, e, n)
                        }
                        computeStyle(t, e, n) {
                            return n || ""
                        }
                        animate(t, e, n, i, s, r = [], o) {
                            return new mp(n, i)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                Mp = (() => {
                    class t {}
                    return t.NOOP = new Np, t
                })();
            const Vp = "ng-enter",
                jp = "ng-leave",
                Bp = "ng-trigger",
                Hp = ".ng-trigger",
                zp = "ng-animating",
                qp = ".ng-animating";

            function Up(t) {
                if ("number" == typeof t) return t;
                const e = t.match(/^(-?[\.\d]+)(m?s)/);
                return !e || e.length < 2 ? 0 : $p(parseFloat(e[1]), e[2])
            }

            function $p(t, e) {
                switch (e) {
                    case "s":
                        return 1e3 * t;
                    default:
                        return t
                }
            }

            function Wp(t, e, n) {
                return t.hasOwnProperty("duration") ? t : function(t, e, n) {
                    let i, s = 0,
                        r = "";
                    if ("string" == typeof t) {
                        const n = t.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                        if (null === n) return e.push(`The provided timing value "${t}" is invalid.`), {
                            duration: 0,
                            delay: 0,
                            easing: ""
                        };
                        i = $p(parseFloat(n[1]), n[2]);
                        const o = n[3];
                        null != o && (s = $p(parseFloat(o), n[4]));
                        const a = n[5];
                        a && (r = a)
                    } else i = t;
                    if (!n) {
                        let n = !1,
                            r = e.length;
                        i < 0 && (e.push("Duration values below 0 are not allowed for this animation step."), n = !0), s < 0 && (e.push("Delay values below 0 are not allowed for this animation step."), n = !0), n && e.splice(r, 0, `The provided timing value "${t}" is invalid.`)
                    }
                    return {
                        duration: i,
                        delay: s,
                        easing: r
                    }
                }(t, e, n)
            }

            function Zp(t, e = {}) {
                return Object.keys(t).forEach(n => {
                    e[n] = t[n]
                }), e
            }

            function Qp(t, e, n = {}) {
                if (e)
                    for (let i in t) n[i] = t[i];
                else Zp(t, n);
                return n
            }

            function Kp(t, e, n) {
                return n ? e + ":" + n + ";" : ""
            }

            function Gp(t) {
                let e = "";
                for (let n = 0; n < t.style.length; n++) {
                    const i = t.style.item(n);
                    e += Kp(0, i, t.style.getPropertyValue(i))
                }
                for (const n in t.style) t.style.hasOwnProperty(n) && !n.startsWith("_") && (e += Kp(0, n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), t.style[n]));
                t.setAttribute("style", e)
            }

            function Yp(t, e, n) {
                t.style && (Object.keys(e).forEach(i => {
                    const s = of(i);
                    n && !n.hasOwnProperty(i) && (n[i] = t.style[s]), t.style[s] = e[i]
                }), _p() && Gp(t))
            }

            function Xp(t, e) {
                t.style && (Object.keys(e).forEach(e => {
                    const n = of(e);
                    t.style[n] = ""
                }), _p() && Gp(t))
            }

            function Jp(t) {
                return Array.isArray(t) ? 1 == t.length ? t[0] : hp(t) : t
            }
            const tf = new RegExp("{{\\s*(.+?)\\s*}}", "g");

            function ef(t) {
                let e = [];
                if ("string" == typeof t) {
                    let n;
                    for (; n = tf.exec(t);) e.push(n[1]);
                    tf.lastIndex = 0
                }
                return e
            }

            function nf(t, e, n) {
                const i = t.toString(),
                    s = i.replace(tf, (t, i) => {
                        let s = e[i];
                        return e.hasOwnProperty(i) || (n.push("Please provide a value for the animation param " + i), s = ""), s.toString()
                    });
                return s == i ? t : s
            }

            function sf(t) {
                const e = [];
                let n = t.next();
                for (; !n.done;) e.push(n.value), n = t.next();
                return e
            }
            const rf = /-+([a-z0-9])/g;

            function of(t) {
                return t.replace(rf, (...t) => t[1].toUpperCase())
            }

            function af(t, e) {
                return 0 === t || 0 === e
            }

            function lf(t, e, n) {
                const i = Object.keys(n);
                if (i.length && e.length) {
                    let r = e[0],
                        o = [];
                    if (i.forEach(t => {
                            r.hasOwnProperty(t) || o.push(t), r[t] = n[t]
                        }), o.length)
                        for (var s = 1; s < e.length; s++) {
                            let n = e[s];
                            o.forEach(function(e) {
                                n[e] = hf(t, e)
                            })
                        }
                }
                return e
            }

            function cf(t, e, n) {
                switch (e.type) {
                    case 7:
                        return t.visitTrigger(e, n);
                    case 0:
                        return t.visitState(e, n);
                    case 1:
                        return t.visitTransition(e, n);
                    case 2:
                        return t.visitSequence(e, n);
                    case 3:
                        return t.visitGroup(e, n);
                    case 4:
                        return t.visitAnimate(e, n);
                    case 5:
                        return t.visitKeyframes(e, n);
                    case 6:
                        return t.visitStyle(e, n);
                    case 8:
                        return t.visitReference(e, n);
                    case 9:
                        return t.visitAnimateChild(e, n);
                    case 10:
                        return t.visitAnimateRef(e, n);
                    case 11:
                        return t.visitQuery(e, n);
                    case 12:
                        return t.visitStagger(e, n);
                    default:
                        throw new Error("Unable to resolve animation metadata node #" + e.type)
                }
            }

            function hf(t, e) {
                return window.getComputedStyle(t)[e]
            }
            const uf = "*";

            function df(t, e) {
                const n = [];
                return "string" == typeof t ? t.split(/\s*,\s*/).forEach(t => function(t, e, n) {
                    if (":" == t[0]) {
                        const i = function(t, e) {
                            switch (t) {
                                case ":enter":
                                    return "void => *";
                                case ":leave":
                                    return "* => void";
                                case ":increment":
                                    return (t, e) => parseFloat(e) > parseFloat(t);
                                case ":decrement":
                                    return (t, e) => parseFloat(e) < parseFloat(t);
                                default:
                                    return e.push(`The transition alias value "${t}" is not supported`), "* => *"
                            }
                        }(t, n);
                        if ("function" == typeof i) return void e.push(i);
                        t = i
                    }
                    const i = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                    if (null == i || i.length < 4) return n.push(`The provided transition expression "${t}" is not supported`), e;
                    const s = i[1],
                        r = i[2],
                        o = i[3];
                    e.push(mf(s, o)), "<" != r[0] || s == uf && o == uf || e.push(mf(o, s))
                }(t, n, e)) : n.push(t), n
            }
            const pf = new Set(["true", "1"]),
                ff = new Set(["false", "0"]);

            function mf(t, e) {
                const n = pf.has(t) || ff.has(t),
                    i = pf.has(e) || ff.has(e);
                return (s, r) => {
                    let o = t == uf || t == s,
                        a = e == uf || e == r;
                    return !o && n && "boolean" == typeof s && (o = s ? pf.has(t) : ff.has(t)), !a && i && "boolean" == typeof r && (a = r ? pf.has(e) : ff.has(e)), o && a
                }
            }
            const gf = new RegExp("s*:selfs*,?", "g");

            function _f(t, e, n) {
                return new yf(t).build(e, n)
            }
            class yf {
                constructor(t) {
                    this._driver = t
                }
                build(t, e) {
                    const n = new bf(e);
                    return this._resetContextStyleTimingState(n), cf(this, Jp(t), n)
                }
                _resetContextStyleTimingState(t) {
                    t.currentQuerySelector = "", t.collectedStyles = {}, t.collectedStyles[""] = {}, t.currentTime = 0
                }
                visitTrigger(t, e) {
                    let n = e.queryCount = 0,
                        i = e.depCount = 0;
                    const s = [],
                        r = [];
                    return "@" == t.name.charAt(0) && e.errors.push("animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"), t.definitions.forEach(t => {
                        if (this._resetContextStyleTimingState(e), 0 == t.type) {
                            const n = t,
                                i = n.name;
                            i.toString().split(/\s*,\s*/).forEach(t => {
                                n.name = t, s.push(this.visitState(n, e))
                            }), n.name = i
                        } else if (1 == t.type) {
                            const s = this.visitTransition(t, e);
                            n += s.queryCount, i += s.depCount, r.push(s)
                        } else e.errors.push("only state() and transition() definitions can sit inside of a trigger()")
                    }), {
                        type: 7,
                        name: t.name,
                        states: s,
                        transitions: r,
                        queryCount: n,
                        depCount: i,
                        options: null
                    }
                }
                visitState(t, e) {
                    const n = this.visitStyle(t.styles, e),
                        i = t.options && t.options.params || null;
                    if (n.containsDynamicStyles) {
                        const s = new Set,
                            r = i || {};
                        if (n.styles.forEach(t => {
                                if (vf(t)) {
                                    const e = t;
                                    Object.keys(e).forEach(t => {
                                        ef(e[t]).forEach(t => {
                                            r.hasOwnProperty(t) || s.add(t)
                                        })
                                    })
                                }
                            }), s.size) {
                            const n = sf(s.values());
                            e.errors.push(`state("${t.name}", ...) must define default values for all the following style substitutions: ${n.join(", ")}`)
                        }
                    }
                    return {
                        type: 0,
                        name: t.name,
                        style: n,
                        options: i ? {
                            params: i
                        } : null
                    }
                }
                visitTransition(t, e) {
                    e.queryCount = 0, e.depCount = 0;
                    const n = cf(this, Jp(t.animation), e);
                    return {
                        type: 1,
                        matchers: df(t.expr, e.errors),
                        animation: n,
                        queryCount: e.queryCount,
                        depCount: e.depCount,
                        options: wf(t.options)
                    }
                }
                visitSequence(t, e) {
                    return {
                        type: 2,
                        steps: t.steps.map(t => cf(this, t, e)),
                        options: wf(t.options)
                    }
                }
                visitGroup(t, e) {
                    const n = e.currentTime;
                    let i = 0;
                    const s = t.steps.map(t => {
                        e.currentTime = n;
                        const s = cf(this, t, e);
                        return i = Math.max(i, e.currentTime), s
                    });
                    return e.currentTime = i, {
                        type: 3,
                        steps: s,
                        options: wf(t.options)
                    }
                }
                visitAnimate(t, e) {
                    const n = function(t, e) {
                        let n = null;
                        if (t.hasOwnProperty("duration")) n = t;
                        else if ("number" == typeof t) return Cf(Wp(t, e).duration, 0, "");
                        const i = t;
                        if (i.split(/\s+/).some(t => "{" == t.charAt(0) && "{" == t.charAt(1))) {
                            const t = Cf(0, 0, "");
                            return t.dynamic = !0, t.strValue = i, t
                        }
                        return n = n || Wp(i, e), Cf(n.duration, n.delay, n.easing)
                    }(t.timings, e.errors);
                    let i;
                    e.currentAnimateTimings = n;
                    let s = t.styles ? t.styles : up({});
                    if (5 == s.type) i = this.visitKeyframes(s, e);
                    else {
                        let s = t.styles,
                            r = !1;
                        if (!s) {
                            r = !0;
                            const t = {};
                            n.easing && (t.easing = n.easing), s = up(t)
                        }
                        e.currentTime += n.duration + n.delay;
                        const o = this.visitStyle(s, e);
                        o.isEmptyStep = r, i = o
                    }
                    return e.currentAnimateTimings = null, {
                        type: 4,
                        timings: n,
                        style: i,
                        options: null
                    }
                }
                visitStyle(t, e) {
                    const n = this._makeStyleAst(t, e);
                    return this._validateStyleAst(n, e), n
                }
                _makeStyleAst(t, e) {
                    const n = [];
                    Array.isArray(t.styles) ? t.styles.forEach(t => {
                        "string" == typeof t ? t == ap ? n.push(t) : e.errors.push(`The provided style string value ${t} is not allowed.`) : n.push(t)
                    }) : n.push(t.styles);
                    let i = !1,
                        s = null;
                    return n.forEach(t => {
                        if (vf(t)) {
                            const e = t,
                                n = e.easing;
                            if (n && (s = n, delete e.easing), !i)
                                for (let t in e)
                                    if (e[t].toString().indexOf("{{") >= 0) {
                                        i = !0;
                                        break
                                    }
                        }
                    }), {
                        type: 6,
                        styles: n,
                        easing: s,
                        offset: t.offset,
                        containsDynamicStyles: i,
                        options: null
                    }
                }
                _validateStyleAst(t, e) {
                    const n = e.currentAnimateTimings;
                    let i = e.currentTime,
                        s = e.currentTime;
                    n && s > 0 && (s -= n.duration + n.delay), t.styles.forEach(t => {
                        "string" != typeof t && Object.keys(t).forEach(n => {
                            if (!this._driver.validateStyleProperty(n)) return void e.errors.push(`The provided animation property "${n}" is not a supported CSS property for animations`);
                            const r = e.collectedStyles[e.currentQuerySelector],
                                o = r[n];
                            let a = !0;
                            o && (s != i && s >= o.startTime && i <= o.endTime && (e.errors.push(`The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${i}ms"`), a = !1), s = o.startTime), a && (r[n] = {
                                startTime: s,
                                endTime: i
                            }), e.options && function(t, e, n) {
                                const i = e.params || {},
                                    s = ef(t);
                                s.length && s.forEach(t => {
                                    i.hasOwnProperty(t) || n.push(`Unable to resolve the local animation param ${t} in the given list of values`)
                                })
                            }(t[n], e.options, e.errors)
                        })
                    })
                }
                visitKeyframes(t, e) {
                    const n = {
                        type: 5,
                        styles: [],
                        options: null
                    };
                    if (!e.currentAnimateTimings) return e.errors.push("keyframes() must be placed inside of a call to animate()"), n;
                    let i = 0;
                    const s = [];
                    let r = !1,
                        o = !1,
                        a = 0;
                    const l = t.steps.map(t => {
                        const n = this._makeStyleAst(t, e);
                        let l = null != n.offset ? n.offset : function(t) {
                                if ("string" == typeof t) return null;
                                let e = null;
                                if (Array.isArray(t)) t.forEach(t => {
                                    if (vf(t) && t.hasOwnProperty("offset")) {
                                        const n = t;
                                        e = parseFloat(n.offset), delete n.offset
                                    }
                                });
                                else if (vf(t) && t.hasOwnProperty("offset")) {
                                    const n = t;
                                    e = parseFloat(n.offset), delete n.offset
                                }
                                return e
                            }(n.styles),
                            c = 0;
                        return null != l && (i++, c = n.offset = l), o = o || c < 0 || c > 1, r = r || c < a, a = c, s.push(c), n
                    });
                    o && e.errors.push("Please ensure that all keyframe offsets are between 0 and 1"), r && e.errors.push("Please ensure that all keyframe offsets are in order");
                    const c = t.steps.length;
                    let h = 0;
                    i > 0 && i < c ? e.errors.push("Not all style() steps within the declared keyframes() contain offsets") : 0 == i && (h = 1 / (c - 1));
                    const u = c - 1,
                        d = e.currentTime,
                        p = e.currentAnimateTimings,
                        f = p.duration;
                    return l.forEach((t, i) => {
                        const r = h > 0 ? i == u ? 1 : h * i : s[i],
                            o = r * f;
                        e.currentTime = d + p.delay + o, p.duration = o, this._validateStyleAst(t, e), t.offset = r, n.styles.push(t)
                    }), n
                }
                visitReference(t, e) {
                    return {
                        type: 8,
                        animation: cf(this, Jp(t.animation), e),
                        options: wf(t.options)
                    }
                }
                visitAnimateChild(t, e) {
                    return e.depCount++, {
                        type: 9,
                        options: wf(t.options)
                    }
                }
                visitAnimateRef(t, e) {
                    return {
                        type: 10,
                        animation: this.visitReference(t.animation, e),
                        options: wf(t.options)
                    }
                }
                visitQuery(t, e) {
                    const n = e.currentQuerySelector,
                        i = t.options || {};
                    e.queryCount++, e.currentQuery = t;
                    const [s, r] = function(t) {
                        const e = !!t.split(/\s*,\s*/).find(t => ":self" == t);
                        return e && (t = t.replace(gf, "")), [t = t.replace(/@\*/g, Hp).replace(/@\w+/g, t => ".ng-trigger-" + t.substr(1)).replace(/:animating/g, qp), e]
                    }(t.selector);
                    e.currentQuerySelector = n.length ? n + " " + s : s, xp(e.collectedStyles, e.currentQuerySelector, {});
                    const o = cf(this, Jp(t.animation), e);
                    return e.currentQuery = null, e.currentQuerySelector = n, {
                        type: 11,
                        selector: s,
                        limit: i.limit || 0,
                        optional: !!i.optional,
                        includeSelf: r,
                        animation: o,
                        originalSelector: t.selector,
                        options: wf(t.options)
                    }
                }
                visitStagger(t, e) {
                    e.currentQuery || e.errors.push("stagger() can only be used inside of query()");
                    const n = "full" === t.timings ? {
                        duration: 0,
                        delay: 0,
                        easing: "full"
                    } : Wp(t.timings, e.errors, !0);
                    return {
                        type: 12,
                        animation: cf(this, Jp(t.animation), e),
                        timings: n,
                        options: null
                    }
                }
            }
            class bf {
                constructor(t) {
                    this.errors = t, this.queryCount = 0, this.depCount = 0, this.currentTransition = null, this.currentQuery = null, this.currentQuerySelector = null, this.currentAnimateTimings = null, this.currentTime = 0, this.collectedStyles = {}, this.options = null
                }
            }

            function vf(t) {
                return !Array.isArray(t) && "object" == typeof t
            }

            function wf(t) {
                var e;
                return t ? (t = Zp(t)).params && (t.params = (e = t.params) ? Zp(e) : null) : t = {}, t
            }

            function Cf(t, e, n) {
                return {
                    duration: t,
                    delay: e,
                    easing: n
                }
            }

            function xf(t, e, n, i, s, r, o = null, a = !1) {
                return {
                    type: 1,
                    element: t,
                    keyframes: e,
                    preStyleProps: n,
                    postStyleProps: i,
                    duration: s,
                    delay: r,
                    totalTime: s + r,
                    easing: o,
                    subTimeline: a
                }
            }
            class Ef {
                constructor() {
                    this._map = new Map
                }
                consume(t) {
                    let e = this._map.get(t);
                    return e ? this._map.delete(t) : e = [], e
                }
                append(t, e) {
                    let n = this._map.get(t);
                    n || this._map.set(t, n = []), n.push(...e)
                }
                has(t) {
                    return this._map.has(t)
                }
                clear() {
                    this._map.clear()
                }
            }
            const Sf = new RegExp(":enter", "g"),
                kf = new RegExp(":leave", "g");

            function Tf(t, e, n, i, s, r = {}, o = {}, a, l, c = []) {
                return (new Af).buildKeyframes(t, e, n, i, s, r, o, a, l, c)
            }
            class Af {
                buildKeyframes(t, e, n, i, s, r, o, a, l, c = []) {
                    l = l || new Ef;
                    const h = new Rf(t, e, l, i, s, c, []);
                    h.options = a, h.currentTimeline.setStyles([r], null, h.errors, a), cf(this, n, h);
                    const u = h.timelines.filter(t => t.containsAnimation());
                    if (u.length && Object.keys(o).length) {
                        const t = u[u.length - 1];
                        t.allowOnlyTimelineStyles() || t.setStyles([o], null, h.errors, a)
                    }
                    return u.length ? u.map(t => t.buildKeyframes()) : [xf(e, [], [], [], 0, 0, "", !1)]
                }
                visitTrigger(t, e) {}
                visitState(t, e) {}
                visitTransition(t, e) {}
                visitAnimateChild(t, e) {
                    const n = e.subInstructions.consume(e.element);
                    if (n) {
                        const i = e.createSubContext(t.options),
                            s = e.currentTimeline.currentTime,
                            r = this._visitSubInstructions(n, i, i.options);
                        s != r && e.transformIntoNewTimeline(r)
                    }
                    e.previousNode = t
                }
                visitAnimateRef(t, e) {
                    const n = e.createSubContext(t.options);
                    n.transformIntoNewTimeline(), this.visitReference(t.animation, n), e.transformIntoNewTimeline(n.currentTimeline.currentTime), e.previousNode = t
                }
                _visitSubInstructions(t, e, n) {
                    let i = e.currentTimeline.currentTime;
                    const s = null != n.duration ? Up(n.duration) : null,
                        r = null != n.delay ? Up(n.delay) : null;
                    return 0 !== s && t.forEach(t => {
                        const n = e.appendInstructionToTimeline(t, s, r);
                        i = Math.max(i, n.duration + n.delay)
                    }), i
                }
                visitReference(t, e) {
                    e.updateOptions(t.options, !0), cf(this, t.animation, e), e.previousNode = t
                }
                visitSequence(t, e) {
                    const n = e.subContextCount;
                    let i = e;
                    const s = t.options;
                    if (s && (s.params || s.delay) && (i = e.createSubContext(s), i.transformIntoNewTimeline(), null != s.delay)) {
                        6 == i.previousNode.type && (i.currentTimeline.snapshotCurrentStyles(), i.previousNode = Df);
                        const t = Up(s.delay);
                        i.delayNextStep(t)
                    }
                    t.steps.length && (t.steps.forEach(t => cf(this, t, i)), i.currentTimeline.applyStylesToKeyframe(), i.subContextCount > n && i.transformIntoNewTimeline()), e.previousNode = t
                }
                visitGroup(t, e) {
                    const n = [];
                    let i = e.currentTimeline.currentTime;
                    const s = t.options && t.options.delay ? Up(t.options.delay) : 0;
                    t.steps.forEach(r => {
                        const o = e.createSubContext(t.options);
                        s && o.delayNextStep(s), cf(this, r, o), i = Math.max(i, o.currentTimeline.currentTime), n.push(o.currentTimeline)
                    }), n.forEach(t => e.currentTimeline.mergeTimelineCollectedStyles(t)), e.transformIntoNewTimeline(i), e.previousNode = t
                }
                _visitTiming(t, e) {
                    if (t.dynamic) {
                        const n = t.strValue;
                        return Wp(e.params ? nf(n, e.params, e.errors) : n, e.errors)
                    }
                    return {
                        duration: t.duration,
                        delay: t.delay,
                        easing: t.easing
                    }
                }
                visitAnimate(t, e) {
                    const n = e.currentAnimateTimings = this._visitTiming(t.timings, e),
                        i = e.currentTimeline;
                    n.delay && (e.incrementTime(n.delay), i.snapshotCurrentStyles());
                    const s = t.style;
                    5 == s.type ? this.visitKeyframes(s, e) : (e.incrementTime(n.duration), this.visitStyle(s, e), i.applyStylesToKeyframe()), e.currentAnimateTimings = null, e.previousNode = t
                }
                visitStyle(t, e) {
                    const n = e.currentTimeline,
                        i = e.currentAnimateTimings;
                    !i && n.getCurrentStyleProperties().length && n.forwardFrame();
                    const s = i && i.easing || t.easing;
                    t.isEmptyStep ? n.applyEmptyStep(s) : n.setStyles(t.styles, s, e.errors, e.options), e.previousNode = t
                }
                visitKeyframes(t, e) {
                    const n = e.currentAnimateTimings,
                        i = e.currentTimeline.duration,
                        s = n.duration,
                        r = e.createSubContext().currentTimeline;
                    r.easing = n.easing, t.styles.forEach(t => {
                        r.forwardTime((t.offset || 0) * s), r.setStyles(t.styles, t.easing, e.errors, e.options), r.applyStylesToKeyframe()
                    }), e.currentTimeline.mergeTimelineCollectedStyles(r), e.transformIntoNewTimeline(i + s), e.previousNode = t
                }
                visitQuery(t, e) {
                    const n = e.currentTimeline.currentTime,
                        i = t.options || {},
                        s = i.delay ? Up(i.delay) : 0;
                    s && (6 === e.previousNode.type || 0 == n && e.currentTimeline.getCurrentStyleProperties().length) && (e.currentTimeline.snapshotCurrentStyles(), e.previousNode = Df);
                    let r = n;
                    const o = e.invokeQuery(t.selector, t.originalSelector, t.limit, t.includeSelf, !!i.optional, e.errors);
                    e.currentQueryTotal = o.length;
                    let a = null;
                    o.forEach((n, i) => {
                        e.currentQueryIndex = i;
                        const o = e.createSubContext(t.options, n);
                        s && o.delayNextStep(s), n === e.element && (a = o.currentTimeline), cf(this, t.animation, o), o.currentTimeline.applyStylesToKeyframe(), r = Math.max(r, o.currentTimeline.currentTime)
                    }), e.currentQueryIndex = 0, e.currentQueryTotal = 0, e.transformIntoNewTimeline(r), a && (e.currentTimeline.mergeTimelineCollectedStyles(a), e.currentTimeline.snapshotCurrentStyles()), e.previousNode = t
                }
                visitStagger(t, e) {
                    const n = e.parentContext,
                        i = e.currentTimeline,
                        s = t.timings,
                        r = Math.abs(s.duration),
                        o = r * (e.currentQueryTotal - 1);
                    let a = r * e.currentQueryIndex;
                    switch (s.duration < 0 ? "reverse" : s.easing) {
                        case "reverse":
                            a = o - a;
                            break;
                        case "full":
                            a = n.currentStaggerTime
                    }
                    const l = e.currentTimeline;
                    a && l.delayNextStep(a);
                    const c = l.currentTime;
                    cf(this, t.animation, e), e.previousNode = t, n.currentStaggerTime = i.currentTime - c + (i.startTime - n.currentTimeline.startTime)
                }
            }
            const Df = {};
            class Rf {
                constructor(t, e, n, i, s, r, o, a) {
                    this._driver = t, this.element = e, this.subInstructions = n, this._enterClassName = i, this._leaveClassName = s, this.errors = r, this.timelines = o, this.parentContext = null, this.currentAnimateTimings = null, this.previousNode = Df, this.subContextCount = 0, this.options = {}, this.currentQueryIndex = 0, this.currentQueryTotal = 0, this.currentStaggerTime = 0, this.currentTimeline = a || new If(this._driver, e, 0), o.push(this.currentTimeline)
                }
                get params() {
                    return this.options.params
                }
                updateOptions(t, e) {
                    if (!t) return;
                    const n = t;
                    let i = this.options;
                    null != n.duration && (i.duration = Up(n.duration)), null != n.delay && (i.delay = Up(n.delay));
                    const s = n.params;
                    if (s) {
                        let t = i.params;
                        t || (t = this.options.params = {}), Object.keys(s).forEach(n => {
                            e && t.hasOwnProperty(n) || (t[n] = nf(s[n], t, this.errors))
                        })
                    }
                }
                _copyOptions() {
                    const t = {};
                    if (this.options) {
                        const e = this.options.params;
                        if (e) {
                            const n = t.params = {};
                            Object.keys(e).forEach(t => {
                                n[t] = e[t]
                            })
                        }
                    }
                    return t
                }
                createSubContext(t = null, e, n) {
                    const i = e || this.element,
                        s = new Rf(this._driver, i, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(i, n || 0));
                    return s.previousNode = this.previousNode, s.currentAnimateTimings = this.currentAnimateTimings, s.options = this._copyOptions(), s.updateOptions(t), s.currentQueryIndex = this.currentQueryIndex, s.currentQueryTotal = this.currentQueryTotal, s.parentContext = this, this.subContextCount++, s
                }
                transformIntoNewTimeline(t) {
                    return this.previousNode = Df, this.currentTimeline = this.currentTimeline.fork(this.element, t), this.timelines.push(this.currentTimeline), this.currentTimeline
                }
                appendInstructionToTimeline(t, e, n) {
                    const i = {
                            duration: null != e ? e : t.duration,
                            delay: this.currentTimeline.currentTime + (null != n ? n : 0) + t.delay,
                            easing: ""
                        },
                        s = new Of(this._driver, t.element, t.keyframes, t.preStyleProps, t.postStyleProps, i, t.stretchStartingKeyframe);
                    return this.timelines.push(s), i
                }
                incrementTime(t) {
                    this.currentTimeline.forwardTime(this.currentTimeline.duration + t)
                }
                delayNextStep(t) {
                    t > 0 && this.currentTimeline.delayNextStep(t)
                }
                invokeQuery(t, e, n, i, s, r) {
                    let o = [];
                    if (i && o.push(this.element), t.length > 0) {
                        t = (t = t.replace(Sf, "." + this._enterClassName)).replace(kf, "." + this._leaveClassName);
                        let e = this._driver.query(this.element, t, 1 != n);
                        0 !== n && (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)), o.push(...e)
                    }
                    return s || 0 != o.length || r.push(`\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`), o
                }
            }
            class If {
                constructor(t, e, n, i) {
                    this._driver = t, this.element = e, this.startTime = n, this._elementTimelineStylesLookup = i, this.duration = 0, this._previousKeyframe = {}, this._currentKeyframe = {}, this._keyframes = new Map, this._styleSummary = {}, this._pendingStyles = {}, this._backFill = {}, this._currentEmptyStepKeyframe = null, this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map), this._localTimelineStyles = Object.create(this._backFill, {}), this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e), this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)), this._loadKeyframe()
                }
                containsAnimation() {
                    switch (this._keyframes.size) {
                        case 0:
                            return !1;
                        case 1:
                            return this.getCurrentStyleProperties().length > 0;
                        default:
                            return !0
                    }
                }
                getCurrentStyleProperties() {
                    return Object.keys(this._currentKeyframe)
                }
                get currentTime() {
                    return this.startTime + this.duration
                }
                delayNextStep(t) {
                    const e = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
                    this.duration || e ? (this.forwardTime(this.currentTime + t), e && this.snapshotCurrentStyles()) : this.startTime += t
                }
                fork(t, e) {
                    return this.applyStylesToKeyframe(), new If(this._driver, t, e || this.currentTime, this._elementTimelineStylesLookup)
                }
                _loadKeyframe() {
                    this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe), this._currentKeyframe = this._keyframes.get(this.duration), this._currentKeyframe || (this._currentKeyframe = Object.create(this._backFill, {}), this._keyframes.set(this.duration, this._currentKeyframe))
                }
                forwardFrame() {
                    this.duration += 1, this._loadKeyframe()
                }
                forwardTime(t) {
                    this.applyStylesToKeyframe(), this.duration = t, this._loadKeyframe()
                }
                _updateStyle(t, e) {
                    this._localTimelineStyles[t] = e, this._globalTimelineStyles[t] = e, this._styleSummary[t] = {
                        time: this.currentTime,
                        value: e
                    }
                }
                allowOnlyTimelineStyles() {
                    return this._currentEmptyStepKeyframe !== this._currentKeyframe
                }
                applyEmptyStep(t) {
                    t && (this._previousKeyframe.easing = t), Object.keys(this._globalTimelineStyles).forEach(t => {
                        this._backFill[t] = this._globalTimelineStyles[t] || ap, this._currentKeyframe[t] = ap
                    }), this._currentEmptyStepKeyframe = this._currentKeyframe
                }
                setStyles(t, e, n, i) {
                    e && (this._previousKeyframe.easing = e);
                    const s = i && i.params || {},
                        r = function(t, e) {
                            const n = {};
                            let i;
                            return t.forEach(t => {
                                "*" === t ? (i = i || Object.keys(e), i.forEach(t => {
                                    n[t] = ap
                                })) : Qp(t, !1, n)
                            }), n
                        }(t, this._globalTimelineStyles);
                    Object.keys(r).forEach(t => {
                        const e = nf(r[t], s, n);
                        this._pendingStyles[t] = e, this._localTimelineStyles.hasOwnProperty(t) || (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(t) ? this._globalTimelineStyles[t] : ap), this._updateStyle(t, e)
                    })
                }
                applyStylesToKeyframe() {
                    const t = this._pendingStyles,
                        e = Object.keys(t);
                    0 != e.length && (this._pendingStyles = {}, e.forEach(e => {
                        this._currentKeyframe[e] = t[e]
                    }), Object.keys(this._localTimelineStyles).forEach(t => {
                        this._currentKeyframe.hasOwnProperty(t) || (this._currentKeyframe[t] = this._localTimelineStyles[t])
                    }))
                }
                snapshotCurrentStyles() {
                    Object.keys(this._localTimelineStyles).forEach(t => {
                        const e = this._localTimelineStyles[t];
                        this._pendingStyles[t] = e, this._updateStyle(t, e)
                    })
                }
                getFinalKeyframe() {
                    return this._keyframes.get(this.duration)
                }
                get properties() {
                    const t = [];
                    for (let e in this._currentKeyframe) t.push(e);
                    return t
                }
                mergeTimelineCollectedStyles(t) {
                    Object.keys(t._styleSummary).forEach(e => {
                        const n = this._styleSummary[e],
                            i = t._styleSummary[e];
                        (!n || i.time > n.time) && this._updateStyle(e, i.value)
                    })
                }
                buildKeyframes() {
                    this.applyStylesToKeyframe();
                    const t = new Set,
                        e = new Set,
                        n = 1 === this._keyframes.size && 0 === this.duration;
                    let i = [];
                    this._keyframes.forEach((s, r) => {
                        const o = Qp(s, !0);
                        Object.keys(o).forEach(n => {
                            const i = o[n];
                            "!" == i ? t.add(n) : i == ap && e.add(n)
                        }), n || (o.offset = r / this.duration), i.push(o)
                    });
                    const s = t.size ? sf(t.values()) : [],
                        r = e.size ? sf(e.values()) : [];
                    if (n) {
                        const t = i[0],
                            e = Zp(t);
                        t.offset = 0, e.offset = 1, i = [t, e]
                    }
                    return xf(this.element, i, s, r, this.duration, this.startTime, this.easing, !1)
                }
            }
            class Of extends If {
                constructor(t, e, n, i, s, r, o = !1) {
                    super(t, e, r.delay), this.element = e, this.keyframes = n, this.preStyleProps = i, this.postStyleProps = s, this._stretchStartingKeyframe = o, this.timings = {
                        duration: r.duration,
                        delay: r.delay,
                        easing: r.easing
                    }
                }
                containsAnimation() {
                    return this.keyframes.length > 1
                }
                buildKeyframes() {
                    let t = this.keyframes,
                        {
                            delay: e,
                            duration: n,
                            easing: i
                        } = this.timings;
                    if (this._stretchStartingKeyframe && e) {
                        const s = [],
                            r = n + e,
                            o = e / r,
                            a = Qp(t[0], !1);
                        a.offset = 0, s.push(a);
                        const l = Qp(t[0], !1);
                        l.offset = Pf(o), s.push(l);
                        const c = t.length - 1;
                        for (let i = 1; i <= c; i++) {
                            let o = Qp(t[i], !1);
                            o.offset = Pf((e + o.offset * n) / r), s.push(o)
                        }
                        n = r, e = 0, i = "", t = s
                    }
                    return xf(this.element, t, this.preStyleProps, this.postStyleProps, n, e, i, !0)
                }
            }

            function Pf(t, e = 3) {
                const n = Math.pow(10, e - 1);
                return Math.round(t * n) / n
            }
            class Ff {}
            class Lf extends Ff {
                normalizePropertyName(t, e) {
                    return of(t)
                }
                normalizeStyleValue(t, e, n, i) {
                    let s = "";
                    const r = n.toString().trim();
                    if (Nf[e] && 0 !== n && "0" !== n)
                        if ("number" == typeof n) s = "px";
                        else {
                            const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
                            e && 0 == e[1].length && i.push(`Please provide a CSS unit value for ${t}:${n}`)
                        } return r + s
                }
            }
            const Nf = (() => function(t) {
                const e = {};
                return t.forEach(t => e[t] = !0), e
            }("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(",")))();

            function Mf(t, e, n, i, s, r, o, a, l, c, h, u, d) {
                return {
                    type: 0,
                    element: t,
                    triggerName: e,
                    isRemovalTransition: s,
                    fromState: n,
                    fromStyles: r,
                    toState: i,
                    toStyles: o,
                    timelines: a,
                    queriedElements: l,
                    preStyleProps: c,
                    postStyleProps: h,
                    totalTime: u,
                    errors: d
                }
            }
            const Vf = {};
            class jf {
                constructor(t, e, n) {
                    this._triggerName = t, this.ast = e, this._stateStyles = n
                }
                match(t, e, n, i) {
                    return function(t, e, n, i, s) {
                        return t.some(t => t(e, n, i, s))
                    }(this.ast.matchers, t, e, n, i)
                }
                buildStyles(t, e, n) {
                    const i = this._stateStyles["*"],
                        s = this._stateStyles[t],
                        r = i ? i.buildStyles(e, n) : {};
                    return s ? s.buildStyles(e, n) : r
                }
                build(t, e, n, i, s, r, o, a, l, c) {
                    const h = [],
                        u = this.ast.options && this.ast.options.params || Vf,
                        d = this.buildStyles(n, o && o.params || Vf, h),
                        p = a && a.params || Vf,
                        f = this.buildStyles(i, p, h),
                        m = new Set,
                        g = new Map,
                        _ = new Map,
                        y = "void" === i,
                        b = {
                            params: Object.assign(Object.assign({}, u), p)
                        },
                        v = c ? [] : Tf(t, e, this.ast.animation, s, r, d, f, b, l, h);
                    let w = 0;
                    if (v.forEach(t => {
                            w = Math.max(t.duration + t.delay, w)
                        }), h.length) return Mf(e, this._triggerName, n, i, y, d, f, [], [], g, _, w, h);
                    v.forEach(t => {
                        const n = t.element,
                            i = xp(g, n, {});
                        t.preStyleProps.forEach(t => i[t] = !0);
                        const s = xp(_, n, {});
                        t.postStyleProps.forEach(t => s[t] = !0), n !== e && m.add(n)
                    });
                    const C = sf(m.values());
                    return Mf(e, this._triggerName, n, i, y, d, f, v, C, g, _, w)
                }
            }
            class Bf {
                constructor(t, e) {
                    this.styles = t, this.defaultParams = e
                }
                buildStyles(t, e) {
                    const n = {},
                        i = Zp(this.defaultParams);
                    return Object.keys(t).forEach(e => {
                        const n = t[e];
                        null != n && (i[e] = n)
                    }), this.styles.styles.forEach(t => {
                        if ("string" != typeof t) {
                            const s = t;
                            Object.keys(s).forEach(t => {
                                let r = s[t];
                                r.length > 1 && (r = nf(r, i, e)), n[t] = r
                            })
                        }
                    }), n
                }
            }
            class Hf {
                constructor(t, e) {
                    this.name = t, this.ast = e, this.transitionFactories = [], this.states = {}, e.states.forEach(t => {
                        this.states[t.name] = new Bf(t.style, t.options && t.options.params || {})
                    }), zf(this.states, "true", "1"), zf(this.states, "false", "0"), e.transitions.forEach(e => {
                        this.transitionFactories.push(new jf(t, e, this.states))
                    }), this.fallbackTransition = new jf(t, {
                        type: 1,
                        animation: {
                            type: 2,
                            steps: [],
                            options: null
                        },
                        matchers: [(t, e) => !0],
                        options: null,
                        queryCount: 0,
                        depCount: 0
                    }, this.states)
                }
                get containsQueries() {
                    return this.ast.queryCount > 0
                }
                matchTransition(t, e, n, i) {
                    return this.transitionFactories.find(s => s.match(t, e, n, i)) || null
                }
                matchStyles(t, e, n) {
                    return this.fallbackTransition.buildStyles(t, e, n)
                }
            }

            function zf(t, e, n) {
                t.hasOwnProperty(e) ? t.hasOwnProperty(n) || (t[n] = t[e]) : t.hasOwnProperty(n) && (t[e] = t[n])
            }
            const qf = new Ef;
            class Uf {
                constructor(t, e, n) {
                    this.bodyNode = t, this._driver = e, this._normalizer = n, this._animations = {}, this._playersById = {}, this.players = []
                }
                register(t, e) {
                    const n = [],
                        i = _f(this._driver, e, n);
                    if (n.length) throw new Error("Unable to build the animation due to the following errors: " + n.join("\n"));
                    this._animations[t] = i
                }
                _buildPlayer(t, e, n) {
                    const i = t.element,
                        s = bp(0, this._normalizer, 0, t.keyframes, e, n);
                    return this._driver.animate(i, s, t.duration, t.delay, t.easing, [], !0)
                }
                create(t, e, n = {}) {
                    const i = [],
                        s = this._animations[t];
                    let r;
                    const o = new Map;
                    if (s ? (r = Tf(this._driver, e, s, Vp, jp, {}, {}, n, qf, i), r.forEach(t => {
                            const e = xp(o, t.element, {});
                            t.postStyleProps.forEach(t => e[t] = null)
                        })) : (i.push("The requested animation doesn't exist or has already been destroyed"), r = []), i.length) throw new Error("Unable to create the animation due to the following errors: " + i.join("\n"));
                    o.forEach((t, e) => {
                        Object.keys(t).forEach(n => {
                            t[n] = this._driver.computeStyle(e, n, ap)
                        })
                    });
                    const a = yp(r.map(t => {
                        const e = o.get(t.element);
                        return this._buildPlayer(t, {}, e)
                    }));
                    return this._playersById[t] = a, a.onDestroy(() => this.destroy(t)), this.players.push(a), a
                }
                destroy(t) {
                    const e = this._getPlayer(t);
                    e.destroy(), delete this._playersById[t];
                    const n = this.players.indexOf(e);
                    n >= 0 && this.players.splice(n, 1)
                }
                _getPlayer(t) {
                    const e = this._playersById[t];
                    if (!e) throw new Error("Unable to find the timeline player referenced by " + t);
                    return e
                }
                listen(t, e, n, i) {
                    const s = Cp(e, "", "", "");
                    return vp(this._getPlayer(t), n, s, i), () => {}
                }
                command(t, e, n, i) {
                    if ("register" == n) return void this.register(t, i[0]);
                    if ("create" == n) return void this.create(t, e, i[0] || {});
                    const s = this._getPlayer(t);
                    switch (n) {
                        case "play":
                            s.play();
                            break;
                        case "pause":
                            s.pause();
                            break;
                        case "reset":
                            s.reset();
                            break;
                        case "restart":
                            s.restart();
                            break;
                        case "finish":
                            s.finish();
                            break;
                        case "init":
                            s.init();
                            break;
                        case "setPosition":
                            s.setPosition(parseFloat(i[0]));
                            break;
                        case "destroy":
                            this.destroy(t)
                    }
                }
            }
            const $f = "ng-animate-queued",
                Wf = "ng-animate-disabled",
                Zf = ".ng-animate-disabled",
                Qf = [],
                Kf = {
                    namespaceId: "",
                    setForRemoval: !1,
                    setForMove: !1,
                    hasAnimation: !1,
                    removedBeforeQueried: !1
                },
                Gf = {
                    namespaceId: "",
                    setForMove: !1,
                    setForRemoval: !1,
                    hasAnimation: !1,
                    removedBeforeQueried: !0
                };
            class Yf {
                constructor(t, e = "") {
                    this.namespaceId = e;
                    const n = t && t.hasOwnProperty("value");
                    if (this.value = null != (i = n ? t.value : t) ? i : null, n) {
                        const e = Zp(t);
                        delete e.value, this.options = e
                    } else this.options = {};
                    var i;
                    this.options.params || (this.options.params = {})
                }
                get params() {
                    return this.options.params
                }
                absorbOptions(t) {
                    const e = t.params;
                    if (e) {
                        const t = this.options.params;
                        Object.keys(e).forEach(n => {
                            null == t[n] && (t[n] = e[n])
                        })
                    }
                }
            }
            const Xf = "void",
                Jf = new Yf(Xf);
            class tm {
                constructor(t, e, n) {
                    this.id = t, this.hostElement = e, this._engine = n, this.players = [], this._triggers = {}, this._queue = [], this._elementListeners = new Map, this._hostClassName = "ng-tns-" + t, am(e, this._hostClassName)
                }
                listen(t, e, n, i) {
                    if (!this._triggers.hasOwnProperty(e)) throw new Error(`Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`);
                    if (null == n || 0 == n.length) throw new Error(`Unable to listen on the animation trigger "${e}" because the provided event is undefined!`);
                    if ("start" != (s = n) && "done" != s) throw new Error(`The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`);
                    var s;
                    const r = xp(this._elementListeners, t, []),
                        o = {
                            name: e,
                            phase: n,
                            callback: i
                        };
                    r.push(o);
                    const a = xp(this._engine.statesByElement, t, {});
                    return a.hasOwnProperty(e) || (am(t, Bp), am(t, "ng-trigger-" + e), a[e] = Jf), () => {
                        this._engine.afterFlush(() => {
                            const t = r.indexOf(o);
                            t >= 0 && r.splice(t, 1), this._triggers[e] || delete a[e]
                        })
                    }
                }
                register(t, e) {
                    return !this._triggers[t] && (this._triggers[t] = e, !0)
                }
                _getTrigger(t) {
                    const e = this._triggers[t];
                    if (!e) throw new Error(`The provided animation trigger "${t}" has not been registered!`);
                    return e
                }
                trigger(t, e, n, i = !0) {
                    const s = this._getTrigger(e),
                        r = new nm(this.id, e, t);
                    let o = this._engine.statesByElement.get(t);
                    o || (am(t, Bp), am(t, "ng-trigger-" + e), this._engine.statesByElement.set(t, o = {}));
                    let a = o[e];
                    const l = new Yf(n, this.id);
                    if (!(n && n.hasOwnProperty("value")) && a && l.absorbOptions(a.options), o[e] = l, a || (a = Jf), l.value !== Xf && a.value === l.value) {
                        if (! function(t, e) {
                                const n = Object.keys(t),
                                    i = Object.keys(e);
                                if (n.length != i.length) return !1;
                                for (let s = 0; s < n.length; s++) {
                                    const i = n[s];
                                    if (!e.hasOwnProperty(i) || t[i] !== e[i]) return !1
                                }
                                return !0
                            }(a.params, l.params)) {
                            const e = [],
                                n = s.matchStyles(a.value, a.params, e),
                                i = s.matchStyles(l.value, l.params, e);
                            e.length ? this._engine.reportError(e) : this._engine.afterFlush(() => {
                                Xp(t, n), Yp(t, i)
                            })
                        }
                        return
                    }
                    const c = xp(this._engine.playersByElement, t, []);
                    c.forEach(t => {
                        t.namespaceId == this.id && t.triggerName == e && t.queued && t.destroy()
                    });
                    let h = s.matchTransition(a.value, l.value, t, l.params),
                        u = !1;
                    if (!h) {
                        if (!i) return;
                        h = s.fallbackTransition, u = !0
                    }
                    return this._engine.totalQueuedPlayers++, this._queue.push({
                        element: t,
                        triggerName: e,
                        transition: h,
                        fromState: a,
                        toState: l,
                        player: r,
                        isFallbackTransition: u
                    }), u || (am(t, $f), r.onStart(() => {
                        lm(t, $f)
                    })), r.onDone(() => {
                        let e = this.players.indexOf(r);
                        e >= 0 && this.players.splice(e, 1);
                        const n = this._engine.playersByElement.get(t);
                        if (n) {
                            let t = n.indexOf(r);
                            t >= 0 && n.splice(t, 1)
                        }
                    }), this.players.push(r), c.push(r), r
                }
                deregister(t) {
                    delete this._triggers[t], this._engine.statesByElement.forEach((e, n) => {
                        delete e[t]
                    }), this._elementListeners.forEach((e, n) => {
                        this._elementListeners.set(n, e.filter(e => e.name != t))
                    })
                }
                clearElementCache(t) {
                    this._engine.statesByElement.delete(t), this._elementListeners.delete(t);
                    const e = this._engine.playersByElement.get(t);
                    e && (e.forEach(t => t.destroy()), this._engine.playersByElement.delete(t))
                }
                _signalRemovalForInnerTriggers(t, e) {
                    const n = this._engine.driver.query(t, Hp, !0);
                    n.forEach(t => {
                        if (t.__ng_removed) return;
                        const n = this._engine.fetchNamespacesByElement(t);
                        n.size ? n.forEach(n => n.triggerLeaveAnimation(t, e, !1, !0)) : this.clearElementCache(t)
                    }), this._engine.afterFlushAnimationsDone(() => n.forEach(t => this.clearElementCache(t)))
                }
                triggerLeaveAnimation(t, e, n, i) {
                    const s = this._engine.statesByElement.get(t);
                    if (s) {
                        const r = [];
                        if (Object.keys(s).forEach(e => {
                                if (this._triggers[e]) {
                                    const n = this.trigger(t, e, Xf, i);
                                    n && r.push(n)
                                }
                            }), r.length) return this._engine.markElementAsRemoved(this.id, t, !0, e), n && yp(r).onDone(() => this._engine.processLeaveNode(t)), !0
                    }
                    return !1
                }
                prepareLeaveAnimationListeners(t) {
                    const e = this._elementListeners.get(t);
                    if (e) {
                        const n = new Set;
                        e.forEach(e => {
                            const i = e.name;
                            if (n.has(i)) return;
                            n.add(i);
                            const s = this._triggers[i].fallbackTransition,
                                r = this._engine.statesByElement.get(t)[i] || Jf,
                                o = new Yf(Xf),
                                a = new nm(this.id, i, t);
                            this._engine.totalQueuedPlayers++, this._queue.push({
                                element: t,
                                triggerName: i,
                                transition: s,
                                fromState: r,
                                toState: o,
                                player: a,
                                isFallbackTransition: !0
                            })
                        })
                    }
                }
                removeNode(t, e) {
                    const n = this._engine;
                    if (t.childElementCount && this._signalRemovalForInnerTriggers(t, e), this.triggerLeaveAnimation(t, e, !0)) return;
                    let i = !1;
                    if (n.totalAnimations) {
                        const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
                        if (e && e.length) i = !0;
                        else {
                            let e = t;
                            for (; e = e.parentNode;)
                                if (n.statesByElement.get(e)) {
                                    i = !0;
                                    break
                                }
                        }
                    }
                    if (this.prepareLeaveAnimationListeners(t), i) n.markElementAsRemoved(this.id, t, !1, e);
                    else {
                        const i = t.__ng_removed;
                        i && i !== Kf || (n.afterFlush(() => this.clearElementCache(t)), n.destroyInnerAnimations(t), n._onRemovalComplete(t, e))
                    }
                }
                insertNode(t, e) {
                    am(t, this._hostClassName)
                }
                drainQueuedTransitions(t) {
                    const e = [];
                    return this._queue.forEach(n => {
                        const i = n.player;
                        if (i.destroyed) return;
                        const s = n.element,
                            r = this._elementListeners.get(s);
                        r && r.forEach(e => {
                            if (e.name == n.triggerName) {
                                const i = Cp(s, n.triggerName, n.fromState.value, n.toState.value);
                                i._data = t, vp(n.player, e.phase, i, e.callback)
                            }
                        }), i.markedForDestroy ? this._engine.afterFlush(() => {
                            i.destroy()
                        }) : e.push(n)
                    }), this._queue = [], e.sort((t, e) => {
                        const n = t.transition.ast.depCount,
                            i = e.transition.ast.depCount;
                        return 0 == n || 0 == i ? n - i : this._engine.driver.containsElement(t.element, e.element) ? 1 : -1
                    })
                }
                destroy(t) {
                    this.players.forEach(t => t.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, t)
                }
                elementContainsData(t) {
                    let e = !1;
                    return this._elementListeners.has(t) && (e = !0), e = !!this._queue.find(e => e.element === t) || e, e
                }
            }
            class em {
                constructor(t, e, n) {
                    this.bodyNode = t, this.driver = e, this._normalizer = n, this.players = [], this.newHostElements = new Map, this.playersByElement = new Map, this.playersByQueriedElement = new Map, this.statesByElement = new Map, this.disabledNodes = new Set, this.totalAnimations = 0, this.totalQueuedPlayers = 0, this._namespaceLookup = {}, this._namespaceList = [], this._flushFns = [], this._whenQuietFns = [], this.namespacesByHostElement = new Map, this.collectedEnterElements = [], this.collectedLeaveElements = [], this.onRemovalComplete = (t, e) => {}
                }
                _onRemovalComplete(t, e) {
                    this.onRemovalComplete(t, e)
                }
                get queuedPlayers() {
                    const t = [];
                    return this._namespaceList.forEach(e => {
                        e.players.forEach(e => {
                            e.queued && t.push(e)
                        })
                    }), t
                }
                createNamespace(t, e) {
                    const n = new tm(t, e, this);
                    return e.parentNode ? this._balanceNamespaceList(n, e) : (this.newHostElements.set(e, n), this.collectEnterElement(e)), this._namespaceLookup[t] = n
                }
                _balanceNamespaceList(t, e) {
                    const n = this._namespaceList.length - 1;
                    if (n >= 0) {
                        let i = !1;
                        for (let s = n; s >= 0; s--)
                            if (this.driver.containsElement(this._namespaceList[s].hostElement, e)) {
                                this._namespaceList.splice(s + 1, 0, t), i = !0;
                                break
                            } i || this._namespaceList.splice(0, 0, t)
                    } else this._namespaceList.push(t);
                    return this.namespacesByHostElement.set(e, t), t
                }
                register(t, e) {
                    let n = this._namespaceLookup[t];
                    return n || (n = this.createNamespace(t, e)), n
                }
                registerTrigger(t, e, n) {
                    let i = this._namespaceLookup[t];
                    i && i.register(e, n) && this.totalAnimations++
                }
                destroy(t, e) {
                    if (!t) return;
                    const n = this._fetchNamespace(t);
                    this.afterFlush(() => {
                        this.namespacesByHostElement.delete(n.hostElement), delete this._namespaceLookup[t];
                        const e = this._namespaceList.indexOf(n);
                        e >= 0 && this._namespaceList.splice(e, 1)
                    }), this.afterFlushAnimationsDone(() => n.destroy(e))
                }
                _fetchNamespace(t) {
                    return this._namespaceLookup[t]
                }
                fetchNamespacesByElement(t) {
                    const e = new Set,
                        n = this.statesByElement.get(t);
                    if (n) {
                        const t = Object.keys(n);
                        for (let i = 0; i < t.length; i++) {
                            const s = n[t[i]].namespaceId;
                            if (s) {
                                const t = this._fetchNamespace(s);
                                t && e.add(t)
                            }
                        }
                    }
                    return e
                }
                trigger(t, e, n, i) {
                    if (im(e)) {
                        const s = this._fetchNamespace(t);
                        if (s) return s.trigger(e, n, i), !0
                    }
                    return !1
                }
                insertNode(t, e, n, i) {
                    if (!im(e)) return;
                    const s = e.__ng_removed;
                    if (s && s.setForRemoval) {
                        s.setForRemoval = !1, s.setForMove = !0;
                        const t = this.collectedLeaveElements.indexOf(e);
                        t >= 0 && this.collectedLeaveElements.splice(t, 1)
                    }
                    if (t) {
                        const i = this._fetchNamespace(t);
                        i && i.insertNode(e, n)
                    }
                    i && this.collectEnterElement(e)
                }
                collectEnterElement(t) {
                    this.collectedEnterElements.push(t)
                }
                markElementAsDisabled(t, e) {
                    e ? this.disabledNodes.has(t) || (this.disabledNodes.add(t), am(t, Wf)) : this.disabledNodes.has(t) && (this.disabledNodes.delete(t), lm(t, Wf))
                }
                removeNode(t, e, n, i) {
                    if (im(e)) {
                        const s = t ? this._fetchNamespace(t) : null;
                        if (s ? s.removeNode(e, i) : this.markElementAsRemoved(t, e, !1, i), n) {
                            const n = this.namespacesByHostElement.get(e);
                            n && n.id !== t && n.removeNode(e, i)
                        }
                    } else this._onRemovalComplete(e, i)
                }
                markElementAsRemoved(t, e, n, i) {
                    this.collectedLeaveElements.push(e), e.__ng_removed = {
                        namespaceId: t,
                        setForRemoval: i,
                        hasAnimation: n,
                        removedBeforeQueried: !1
                    }
                }
                listen(t, e, n, i, s) {
                    return im(e) ? this._fetchNamespace(t).listen(e, n, i, s) : () => {}
                }
                _buildInstruction(t, e, n, i, s) {
                    return t.transition.build(this.driver, t.element, t.fromState.value, t.toState.value, n, i, t.fromState.options, t.toState.options, e, s)
                }
                destroyInnerAnimations(t) {
                    let e = this.driver.query(t, Hp, !0);
                    e.forEach(t => this.destroyActiveAnimationsForElement(t)), 0 != this.playersByQueriedElement.size && (e = this.driver.query(t, qp, !0), e.forEach(t => this.finishActiveQueriedAnimationOnElement(t)))
                }
                destroyActiveAnimationsForElement(t) {
                    const e = this.playersByElement.get(t);
                    e && e.forEach(t => {
                        t.queued ? t.markedForDestroy = !0 : t.destroy()
                    })
                }
                finishActiveQueriedAnimationOnElement(t) {
                    const e = this.playersByQueriedElement.get(t);
                    e && e.forEach(t => t.finish())
                }
                whenRenderingDone() {
                    return new Promise(t => {
                        if (this.players.length) return yp(this.players).onDone(() => t());
                        t()
                    })
                }
                processLeaveNode(t) {
                    const e = t.__ng_removed;
                    if (e && e.setForRemoval) {
                        if (t.__ng_removed = Kf, e.namespaceId) {
                            this.destroyInnerAnimations(t);
                            const n = this._fetchNamespace(e.namespaceId);
                            n && n.clearElementCache(t)
                        }
                        this._onRemovalComplete(t, e.setForRemoval)
                    }
                    this.driver.matchesElement(t, Zf) && this.markElementAsDisabled(t, !1), this.driver.query(t, Zf, !0).forEach(t => {
                        this.markElementAsDisabled(t, !1)
                    })
                }
                flush(t = -1) {
                    let e = [];
                    if (this.newHostElements.size && (this.newHostElements.forEach((t, e) => this._balanceNamespaceList(t, e)), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length)
                        for (let n = 0; n < this.collectedEnterElements.length; n++) am(this.collectedEnterElements[n], "ng-star-inserted");
                    if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
                        const n = [];
                        try {
                            e = this._flushAnimations(n, t)
                        } finally {
                            for (let t = 0; t < n.length; t++) n[t]()
                        }
                    } else
                        for (let n = 0; n < this.collectedLeaveElements.length; n++) this.processLeaveNode(this.collectedLeaveElements[n]);
                    if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, this._flushFns.forEach(t => t()), this._flushFns = [], this._whenQuietFns.length) {
                        const t = this._whenQuietFns;
                        this._whenQuietFns = [], e.length ? yp(e).onDone(() => {
                            t.forEach(t => t())
                        }) : t.forEach(t => t())
                    }
                }
                reportError(t) {
                    throw new Error("Unable to process animations due to the following failed trigger transitions\n " + t.join("\n"))
                }
                _flushAnimations(t, e) {
                    const n = new Ef,
                        i = [],
                        s = new Map,
                        r = [],
                        o = new Map,
                        a = new Map,
                        l = new Map,
                        c = new Set;
                    this.disabledNodes.forEach(t => {
                        c.add(t);
                        const e = this.driver.query(t, ".ng-animate-queued", !0);
                        for (let n = 0; n < e.length; n++) c.add(e[n])
                    });
                    const h = this.bodyNode,
                        u = Array.from(this.statesByElement.keys()),
                        d = om(u, this.collectedEnterElements),
                        p = new Map;
                    let f = 0;
                    d.forEach((t, e) => {
                        const n = Vp + f++;
                        p.set(e, n), t.forEach(t => am(t, n))
                    });
                    const m = [],
                        g = new Set,
                        _ = new Set;
                    for (let R = 0; R < this.collectedLeaveElements.length; R++) {
                        const t = this.collectedLeaveElements[R],
                            e = t.__ng_removed;
                        e && e.setForRemoval && (m.push(t), g.add(t), e.hasAnimation ? this.driver.query(t, ".ng-star-inserted", !0).forEach(t => g.add(t)) : _.add(t))
                    }
                    const y = new Map,
                        b = om(u, Array.from(g));
                    b.forEach((t, e) => {
                        const n = jp + f++;
                        y.set(e, n), t.forEach(t => am(t, n))
                    }), t.push(() => {
                        d.forEach((t, e) => {
                            const n = p.get(e);
                            t.forEach(t => lm(t, n))
                        }), b.forEach((t, e) => {
                            const n = y.get(e);
                            t.forEach(t => lm(t, n))
                        }), m.forEach(t => {
                            this.processLeaveNode(t)
                        })
                    });
                    const v = [],
                        w = [];
                    for (let R = this._namespaceList.length - 1; R >= 0; R--) this._namespaceList[R].drainQueuedTransitions(e).forEach(t => {
                        const e = t.player,
                            s = t.element;
                        if (v.push(e), this.collectedEnterElements.length) {
                            const t = s.__ng_removed;
                            if (t && t.setForMove) return void e.destroy()
                        }
                        const c = !h || !this.driver.containsElement(h, s),
                            u = y.get(s),
                            d = p.get(s),
                            f = this._buildInstruction(t, n, d, u, c);
                        if (f.errors && f.errors.length) w.push(f);
                        else {
                            if (c) return e.onStart(() => Xp(s, f.fromStyles)), e.onDestroy(() => Yp(s, f.toStyles)), void i.push(e);
                            if (t.isFallbackTransition) return e.onStart(() => Xp(s, f.fromStyles)), e.onDestroy(() => Yp(s, f.toStyles)), void i.push(e);
                            f.timelines.forEach(t => t.stretchStartingKeyframe = !0), n.append(s, f.timelines), r.push({
                                instruction: f,
                                player: e,
                                element: s
                            }), f.queriedElements.forEach(t => xp(o, t, []).push(e)), f.preStyleProps.forEach((t, e) => {
                                const n = Object.keys(t);
                                if (n.length) {
                                    let t = a.get(e);
                                    t || a.set(e, t = new Set), n.forEach(e => t.add(e))
                                }
                            }), f.postStyleProps.forEach((t, e) => {
                                const n = Object.keys(t);
                                let i = l.get(e);
                                i || l.set(e, i = new Set), n.forEach(t => i.add(t))
                            })
                        }
                    });
                    if (w.length) {
                        const t = [];
                        w.forEach(e => {
                            t.push(`@${e.triggerName} has failed due to:\n`), e.errors.forEach(e => t.push(`- ${e}\n`))
                        }), v.forEach(t => t.destroy()), this.reportError(t)
                    }
                    const C = new Map,
                        x = new Map;
                    r.forEach(t => {
                        const e = t.element;
                        n.has(e) && (x.set(e, e), this._beforeAnimationBuild(t.player.namespaceId, t.instruction, C))
                    }), i.forEach(t => {
                        const e = t.element;
                        this._getPreviousPlayers(e, !1, t.namespaceId, t.triggerName, null).forEach(t => {
                            xp(C, e, []).push(t), t.destroy()
                        })
                    });
                    const E = m.filter(t => um(t, a, l)),
                        S = new Map;
                    rm(S, this.driver, _, l, ap).forEach(t => {
                        um(t, a, l) && E.push(t)
                    });
                    const k = new Map;
                    d.forEach((t, e) => {
                        rm(k, this.driver, new Set(t), a, "!")
                    }), E.forEach(t => {
                        const e = S.get(t),
                            n = k.get(t);
                        S.set(t, Object.assign(Object.assign({}, e), n))
                    });
                    const T = [],
                        A = [],
                        D = {};
                    r.forEach(t => {
                        const {
                            element: e,
                            player: r,
                            instruction: o
                        } = t;
                        if (n.has(e)) {
                            if (c.has(e)) return r.onDestroy(() => Yp(e, o.toStyles)), r.disabled = !0, r.overrideTotalTime(o.totalTime), void i.push(r);
                            let t = D;
                            if (x.size > 1) {
                                let n = e;
                                const i = [];
                                for (; n = n.parentNode;) {
                                    const e = x.get(n);
                                    if (e) {
                                        t = e;
                                        break
                                    }
                                    i.push(n)
                                }
                                i.forEach(e => x.set(e, t))
                            }
                            const n = this._buildAnimation(r.namespaceId, o, C, s, k, S);
                            if (r.setRealPlayer(n), t === D) T.push(r);
                            else {
                                const e = this.playersByElement.get(t);
                                e && e.length && (r.parentPlayer = yp(e)), i.push(r)
                            }
                        } else Xp(e, o.fromStyles), r.onDestroy(() => Yp(e, o.toStyles)), A.push(r), c.has(e) && i.push(r)
                    }), A.forEach(t => {
                        const e = s.get(t.element);
                        if (e && e.length) {
                            const n = yp(e);
                            t.setRealPlayer(n)
                        }
                    }), i.forEach(t => {
                        t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy()
                    });
                    for (let R = 0; R < m.length; R++) {
                        const t = m[R],
                            e = t.__ng_removed;
                        if (lm(t, jp), e && e.hasAnimation) continue;
                        let n = [];
                        if (o.size) {
                            let e = o.get(t);
                            e && e.length && n.push(...e);
                            let i = this.driver.query(t, qp, !0);
                            for (let t = 0; t < i.length; t++) {
                                let e = o.get(i[t]);
                                e && e.length && n.push(...e)
                            }
                        }
                        const i = n.filter(t => !t.destroyed);
                        i.length ? cm(this, t, i) : this.processLeaveNode(t)
                    }
                    return m.length = 0, T.forEach(t => {
                        this.players.push(t), t.onDone(() => {
                            t.destroy();
                            const e = this.players.indexOf(t);
                            this.players.splice(e, 1)
                        }), t.play()
                    }), T
                }
                elementContainsData(t, e) {
                    let n = !1;
                    const i = e.__ng_removed;
                    return i && i.setForRemoval && (n = !0), this.playersByElement.has(e) && (n = !0), this.playersByQueriedElement.has(e) && (n = !0), this.statesByElement.has(e) && (n = !0), this._fetchNamespace(t).elementContainsData(e) || n
                }
                afterFlush(t) {
                    this._flushFns.push(t)
                }
                afterFlushAnimationsDone(t) {
                    this._whenQuietFns.push(t)
                }
                _getPreviousPlayers(t, e, n, i, s) {
                    let r = [];
                    if (e) {
                        const e = this.playersByQueriedElement.get(t);
                        e && (r = e)
                    } else {
                        const e = this.playersByElement.get(t);
                        if (e) {
                            const t = !s || s == Xf;
                            e.forEach(e => {
                                e.queued || (t || e.triggerName == i) && r.push(e)
                            })
                        }
                    }
                    return (n || i) && (r = r.filter(t => !(n && n != t.namespaceId || i && i != t.triggerName))), r
                }
                _beforeAnimationBuild(t, e, n) {
                    const i = e.element,
                        s = e.isRemovalTransition ? void 0 : t,
                        r = e.isRemovalTransition ? void 0 : e.triggerName;
                    for (const o of e.timelines) {
                        const t = o.element,
                            a = t !== i,
                            l = xp(n, t, []);
                        this._getPreviousPlayers(t, a, s, r, e.toState).forEach(t => {
                            const e = t.getRealPlayer();
                            e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t)
                        })
                    }
                    Xp(i, e.fromStyles)
                }
                _buildAnimation(t, e, n, i, s, r) {
                    const o = e.triggerName,
                        a = e.element,
                        l = [],
                        c = new Set,
                        h = new Set,
                        u = e.timelines.map(e => {
                            const u = e.element;
                            c.add(u);
                            const d = u.__ng_removed;
                            if (d && d.removedBeforeQueried) return new mp(e.duration, e.delay);
                            const p = u !== a,
                                f = function(t) {
                                    const e = [];
                                    return hm(t, e), e
                                }((n.get(u) || Qf).map(t => t.getRealPlayer())).filter(t => !!t.element && t.element === u),
                                m = s.get(u),
                                g = r.get(u),
                                _ = bp(0, this._normalizer, 0, e.keyframes, m, g),
                                y = this._buildPlayer(e, _, f);
                            if (e.subTimeline && i && h.add(u), p) {
                                const e = new nm(t, o, u);
                                e.setRealPlayer(y), l.push(e)
                            }
                            return y
                        });
                    l.forEach(t => {
                        xp(this.playersByQueriedElement, t.element, []).push(t), t.onDone(() => function(t, e, n) {
                            let i;
                            if (t instanceof Map) {
                                if (i = t.get(e), i) {
                                    if (i.length) {
                                        const t = i.indexOf(n);
                                        i.splice(t, 1)
                                    }
                                    0 == i.length && t.delete(e)
                                }
                            } else if (i = t[e], i) {
                                if (i.length) {
                                    const t = i.indexOf(n);
                                    i.splice(t, 1)
                                }
                                0 == i.length && delete t[e]
                            }
                            return i
                        }(this.playersByQueriedElement, t.element, t))
                    }), c.forEach(t => am(t, zp));
                    const d = yp(u);
                    return d.onDestroy(() => {
                        c.forEach(t => lm(t, zp)), Yp(a, e.toStyles)
                    }), h.forEach(t => {
                        xp(i, t, []).push(d)
                    }), d
                }
                _buildPlayer(t, e, n) {
                    return e.length > 0 ? this.driver.animate(t.element, e, t.duration, t.delay, t.easing, n) : new mp(t.duration, t.delay)
                }
            }
            class nm {
                constructor(t, e, n) {
                    this.namespaceId = t, this.triggerName = e, this.element = n, this._player = new mp, this._containsRealPlayer = !1, this._queuedCallbacks = {}, this.destroyed = !1, this.markedForDestroy = !1, this.disabled = !1, this.queued = !0, this.totalTime = 0
                }
                setRealPlayer(t) {
                    this._containsRealPlayer || (this._player = t, Object.keys(this._queuedCallbacks).forEach(e => {
                        this._queuedCallbacks[e].forEach(n => vp(t, e, void 0, n))
                    }), this._queuedCallbacks = {}, this._containsRealPlayer = !0, this.overrideTotalTime(t.totalTime), this.queued = !1)
                }
                getRealPlayer() {
                    return this._player
                }
                overrideTotalTime(t) {
                    this.totalTime = t
                }
                syncPlayerEvents(t) {
                    const e = this._player;
                    e.triggerCallback && t.onStart(() => e.triggerCallback("start")), t.onDone(() => this.finish()), t.onDestroy(() => this.destroy())
                }
                _queueEvent(t, e) {
                    xp(this._queuedCallbacks, t, []).push(e)
                }
                onDone(t) {
                    this.queued && this._queueEvent("done", t), this._player.onDone(t)
                }
                onStart(t) {
                    this.queued && this._queueEvent("start", t), this._player.onStart(t)
                }
                onDestroy(t) {
                    this.queued && this._queueEvent("destroy", t), this._player.onDestroy(t)
                }
                init() {
                    this._player.init()
                }
                hasStarted() {
                    return !this.queued && this._player.hasStarted()
                }
                play() {
                    !this.queued && this._player.play()
                }
                pause() {
                    !this.queued && this._player.pause()
                }
                restart() {
                    !this.queued && this._player.restart()
                }
                finish() {
                    this._player.finish()
                }
                destroy() {
                    this.destroyed = !0, this._player.destroy()
                }
                reset() {
                    !this.queued && this._player.reset()
                }
                setPosition(t) {
                    this.queued || this._player.setPosition(t)
                }
                getPosition() {
                    return this.queued ? 0 : this._player.getPosition()
                }
                triggerCallback(t) {
                    const e = this._player;
                    e.triggerCallback && e.triggerCallback(t)
                }
            }

            function im(t) {
                return t && 1 === t.nodeType
            }

            function sm(t, e) {
                const n = t.style.display;
                return t.style.display = null != e ? e : "none", n
            }

            function rm(t, e, n, i, s) {
                const r = [];
                n.forEach(t => r.push(sm(t)));
                const o = [];
                i.forEach((n, i) => {
                    const r = {};
                    n.forEach(t => {
                        const n = r[t] = e.computeStyle(i, t, s);
                        n && 0 != n.length || (i.__ng_removed = Gf, o.push(i))
                    }), t.set(i, r)
                });
                let a = 0;
                return n.forEach(t => sm(t, r[a++])), o
            }

            function om(t, e) {
                const n = new Map;
                if (t.forEach(t => n.set(t, [])), 0 == e.length) return n;
                const i = new Set(e),
                    s = new Map;

                function r(t) {
                    if (!t) return 1;
                    let e = s.get(t);
                    if (e) return e;
                    const o = t.parentNode;
                    return e = n.has(o) ? o : i.has(o) ? 1 : r(o), s.set(t, e), e
                }
                return e.forEach(t => {
                    const e = r(t);
                    1 !== e && n.get(e).push(t)
                }), n
            }

            function am(t, e) {
                if (t.classList) t.classList.add(e);
                else {
                    let n = t.$$classes;
                    n || (n = t.$$classes = {}), n[e] = !0
                }
            }

            function lm(t, e) {
                if (t.classList) t.classList.remove(e);
                else {
                    let n = t.$$classes;
                    n && delete n[e]
                }
            }

            function cm(t, e, n) {
                yp(n).onDone(() => t.processLeaveNode(e))
            }

            function hm(t, e) {
                for (let n = 0; n < t.length; n++) {
                    const i = t[n];
                    i instanceof gp ? hm(i.players, e) : e.push(i)
                }
            }

            function um(t, e, n) {
                const i = n.get(t);
                if (!i) return !1;
                let s = e.get(t);
                return s ? i.forEach(t => s.add(t)) : e.set(t, i), n.delete(t), !0
            }
            class dm {
                constructor(t, e, n) {
                    this.bodyNode = t, this._driver = e, this._triggerCache = {}, this.onRemovalComplete = (t, e) => {}, this._transitionEngine = new em(t, e, n), this._timelineEngine = new Uf(t, e, n), this._transitionEngine.onRemovalComplete = (t, e) => this.onRemovalComplete(t, e)
                }
                registerTrigger(t, e, n, i, s) {
                    const r = t + "-" + i;
                    let o = this._triggerCache[r];
                    if (!o) {
                        const t = [],
                            e = _f(this._driver, s, t);
                        if (t.length) throw new Error(`The animation trigger "${i}" has failed to build due to the following errors:\n - ${t.join("\n - ")}`);
                        o = function(t, e) {
                            return new Hf(t, e)
                        }(i, e), this._triggerCache[r] = o
                    }
                    this._transitionEngine.registerTrigger(e, i, o)
                }
                register(t, e) {
                    this._transitionEngine.register(t, e)
                }
                destroy(t, e) {
                    this._transitionEngine.destroy(t, e)
                }
                onInsert(t, e, n, i) {
                    this._transitionEngine.insertNode(t, e, n, i)
                }
                onRemove(t, e, n, i) {
                    this._transitionEngine.removeNode(t, e, i || !1, n)
                }
                disableAnimations(t, e) {
                    this._transitionEngine.markElementAsDisabled(t, e)
                }
                process(t, e, n, i) {
                    if ("@" == n.charAt(0)) {
                        const [t, s] = Ep(n);
                        this._timelineEngine.command(t, e, s, i)
                    } else this._transitionEngine.trigger(t, e, n, i)
                }
                listen(t, e, n, i, s) {
                    if ("@" == n.charAt(0)) {
                        const [t, i] = Ep(n);
                        return this._timelineEngine.listen(t, e, i, s)
                    }
                    return this._transitionEngine.listen(t, e, n, i, s)
                }
                flush(t = -1) {
                    this._transitionEngine.flush(t)
                }
                get players() {
                    return this._transitionEngine.players.concat(this._timelineEngine.players)
                }
                whenRenderingDone() {
                    return this._transitionEngine.whenRenderingDone()
                }
            }

            function pm(t, e) {
                let n = null,
                    i = null;
                return Array.isArray(e) && e.length ? (n = mm(e[0]), e.length > 1 && (i = mm(e[e.length - 1]))) : e && (n = mm(e)), n || i ? new fm(t, n, i) : null
            }
            let fm = (() => {
                class t {
                    constructor(e, n, i) {
                        this._element = e, this._startStyles = n, this._endStyles = i, this._state = 0;
                        let s = t.initialStylesByElement.get(e);
                        s || t.initialStylesByElement.set(e, s = {}), this._initialStyles = s
                    }
                    start() {
                        this._state < 1 && (this._startStyles && Yp(this._element, this._startStyles, this._initialStyles), this._state = 1)
                    }
                    finish() {
                        this.start(), this._state < 2 && (Yp(this._element, this._initialStyles), this._endStyles && (Yp(this._element, this._endStyles), this._endStyles = null), this._state = 1)
                    }
                    destroy() {
                        this.finish(), this._state < 3 && (t.initialStylesByElement.delete(this._element), this._startStyles && (Xp(this._element, this._startStyles), this._endStyles = null), this._endStyles && (Xp(this._element, this._endStyles), this._endStyles = null), Yp(this._element, this._initialStyles), this._state = 3)
                    }
                }
                return t.initialStylesByElement = new WeakMap, t
            })();

            function mm(t) {
                let e = null;
                const n = Object.keys(t);
                for (let i = 0; i < n.length; i++) {
                    const s = n[i];
                    gm(s) && (e = e || {}, e[s] = t[s])
                }
                return e
            }

            function gm(t) {
                return "display" === t || "position" === t
            }
            const _m = "animation",
                ym = "animationend";
            class bm {
                constructor(t, e, n, i, s, r, o) {
                    this._element = t, this._name = e, this._duration = n, this._delay = i, this._easing = s, this._fillMode = r, this._onDoneFn = o, this._finished = !1, this._destroyed = !1, this._startTime = 0, this._position = 0, this._eventFn = t => this._handleCallback(t)
                }
                apply() {
                    ! function(t, e) {
                        const n = Sm(t, "").trim();
                        n.length && (function(t, e) {
                            let n = 0;
                            for (let i = 0; i < t.length; i++) "," === t.charAt(i) && n++
                        }(n), e = `${n}, ${e}`), Em(t, "", e)
                    }(this._element, `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`), xm(this._element, this._eventFn, !1), this._startTime = Date.now()
                }
                pause() {
                    vm(this._element, this._name, "paused")
                }
                resume() {
                    vm(this._element, this._name, "running")
                }
                setPosition(t) {
                    const e = wm(this._element, this._name);
                    this._position = t * this._duration, Em(this._element, "Delay", `-${this._position}ms`, e)
                }
                getPosition() {
                    return this._position
                }
                _handleCallback(t) {
                    const e = t._ngTestManualTimestamp || Date.now(),
                        n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
                    t.animationName == this._name && Math.max(e - this._startTime, 0) >= this._delay && n >= this._duration && this.finish()
                }
                finish() {
                    this._finished || (this._finished = !0, this._onDoneFn(), xm(this._element, this._eventFn, !0))
                }
                destroy() {
                    this._destroyed || (this._destroyed = !0, this.finish(), function(t, e) {
                        const n = Sm(t, "").split(","),
                            i = Cm(n, e);
                        i >= 0 && (n.splice(i, 1), Em(t, "", n.join(",")))
                    }(this._element, this._name))
                }
            }

            function vm(t, e, n) {
                Em(t, "PlayState", n, wm(t, e))
            }

            function wm(t, e) {
                const n = Sm(t, "");
                return n.indexOf(",") > 0 ? Cm(n.split(","), e) : Cm([n], e)
            }

            function Cm(t, e) {
                for (let n = 0; n < t.length; n++)
                    if (t[n].indexOf(e) >= 0) return n;
                return -1
            }

            function xm(t, e, n) {
                n ? t.removeEventListener(ym, e) : t.addEventListener(ym, e)
            }

            function Em(t, e, n, i) {
                const s = _m + e;
                if (null != i) {
                    const e = t.style[s];
                    if (e.length) {
                        const t = e.split(",");
                        t[i] = n, n = t.join(",")
                    }
                }
                t.style[s] = n
            }

            function Sm(t, e) {
                return t.style[_m + e] || ""
            }
            class km {
                constructor(t, e, n, i, s, r, o, a) {
                    this.element = t, this.keyframes = e, this.animationName = n, this._duration = i, this._delay = s, this._finalStyles = o, this._specialStyles = a, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._started = !1, this.currentSnapshot = {}, this._state = 0, this.easing = r || "linear", this.totalTime = i + s, this._buildStyler()
                }
                onStart(t) {
                    this._onStartFns.push(t)
                }
                onDone(t) {
                    this._onDoneFns.push(t)
                }
                onDestroy(t) {
                    this._onDestroyFns.push(t)
                }
                destroy() {
                    this.init(), this._state >= 4 || (this._state = 4, this._styler.destroy(), this._flushStartFns(), this._flushDoneFns(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
                }
                _flushDoneFns() {
                    this._onDoneFns.forEach(t => t()), this._onDoneFns = []
                }
                _flushStartFns() {
                    this._onStartFns.forEach(t => t()), this._onStartFns = []
                }
                finish() {
                    this.init(), this._state >= 3 || (this._state = 3, this._styler.finish(), this._flushStartFns(), this._specialStyles && this._specialStyles.finish(), this._flushDoneFns())
                }
                setPosition(t) {
                    this._styler.setPosition(t)
                }
                getPosition() {
                    return this._styler.getPosition()
                }
                hasStarted() {
                    return this._state >= 2
                }
                init() {
                    this._state >= 1 || (this._state = 1, this._styler.apply(), this._delay && this._styler.pause())
                }
                play() {
                    this.init(), this.hasStarted() || (this._flushStartFns(), this._state = 2, this._specialStyles && this._specialStyles.start()), this._styler.resume()
                }
                pause() {
                    this.init(), this._styler.pause()
                }
                restart() {
                    this.reset(), this.play()
                }
                reset() {
                    this._styler.destroy(), this._buildStyler(), this._styler.apply()
                }
                _buildStyler() {
                    this._styler = new bm(this.element, this.animationName, this._duration, this._delay, this.easing, "forwards", () => this.finish())
                }
                triggerCallback(t) {
                    const e = "start" == t ? this._onStartFns : this._onDoneFns;
                    e.forEach(t => t()), e.length = 0
                }
                beforeDestroy() {
                    this.init();
                    const t = {};
                    if (this.hasStarted()) {
                        const e = this._state >= 3;
                        Object.keys(this._finalStyles).forEach(n => {
                            "offset" != n && (t[n] = e ? this._finalStyles[n] : hf(this.element, n))
                        })
                    }
                    this.currentSnapshot = t
                }
            }
            class Tm extends mp {
                constructor(t, e) {
                    super(), this.element = t, this._startingStyles = {}, this.__initialized = !1, this._styles = Lp(e)
                }
                init() {
                    !this.__initialized && this._startingStyles && (this.__initialized = !0, Object.keys(this._styles).forEach(t => {
                        this._startingStyles[t] = this.element.style[t]
                    }), super.init())
                }
                play() {
                    this._startingStyles && (this.init(), Object.keys(this._styles).forEach(t => this.element.style.setProperty(t, this._styles[t])), super.play())
                }
                destroy() {
                    this._startingStyles && (Object.keys(this._startingStyles).forEach(t => {
                        const e = this._startingStyles[t];
                        e ? this.element.style.setProperty(t, e) : this.element.style.removeProperty(t)
                    }), this._startingStyles = null, super.destroy())
                }
            }
            class Am {
                constructor() {
                    this._count = 0, this._head = document.querySelector("head")
                }
                validateStyleProperty(t) {
                    return Ip(t)
                }
                matchesElement(t, e) {
                    return Op(t, e)
                }
                containsElement(t, e) {
                    return Pp(t, e)
                }
                query(t, e, n) {
                    return Fp(t, e, n)
                }
                computeStyle(t, e, n) {
                    return window.getComputedStyle(t)[e]
                }
                buildKeyframeElement(t, e, n) {
                    n = n.map(t => Lp(t));
                    let i = `@keyframes ${e} {\n`,
                        s = "";
                    n.forEach(t => {
                        s = " ";
                        const e = parseFloat(t.offset);
                        i += `${s}${100*e}% {\n`, s += " ", Object.keys(t).forEach(e => {
                            const n = t[e];
                            switch (e) {
                                case "offset":
                                    return;
                                case "easing":
                                    return void(n && (i += `${s}animation-timing-function: ${n};\n`));
                                default:
                                    return void(i += `${s}${e}: ${n};\n`)
                            }
                        }), i += s + "}\n"
                    }), i += "}\n";
                    const r = document.createElement("style");
                    return r.textContent = i, r
                }
                animate(t, e, n, i, s, r = [], o) {
                    const a = r.filter(t => t instanceof km),
                        l = {};
                    af(n, i) && a.forEach(t => {
                        let e = t.currentSnapshot;
                        Object.keys(e).forEach(t => l[t] = e[t])
                    });
                    const c = function(t) {
                        let e = {};
                        return t && (Array.isArray(t) ? t : [t]).forEach(t => {
                            Object.keys(t).forEach(n => {
                                "offset" != n && "easing" != n && (e[n] = t[n])
                            })
                        }), e
                    }(e = lf(t, e, l));
                    if (0 == n) return new Tm(t, c);
                    const h = "gen_css_kf_" + this._count++,
                        u = this.buildKeyframeElement(t, h, e);
                    document.querySelector("head").appendChild(u);
                    const d = pm(t, e),
                        p = new km(t, e, h, n, i, s, c, d);
                    return p.onDestroy(() => {
                        var t;
                        (t = u).parentNode.removeChild(t)
                    }), p
                }
            }
            class Dm {
                constructor(t, e, n, i) {
                    this.element = t, this.keyframes = e, this.options = n, this._specialStyles = i, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._initialized = !1, this._finished = !1, this._started = !1, this._destroyed = !1, this.time = 0, this.parentPlayer = null, this.currentSnapshot = {}, this._duration = n.duration, this._delay = n.delay || 0, this.time = this._duration + this._delay
                }
                _onFinish() {
                    this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
                }
                init() {
                    this._buildPlayer(), this._preparePlayerBeforeStart()
                }
                _buildPlayer() {
                    if (this._initialized) return;
                    this._initialized = !0;
                    const t = this.keyframes;
                    this.domPlayer = this._triggerWebAnimation(this.element, t, this.options), this._finalKeyframe = t.length ? t[t.length - 1] : {}, this.domPlayer.addEventListener("finish", () => this._onFinish())
                }
                _preparePlayerBeforeStart() {
                    this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
                }
                _triggerWebAnimation(t, e, n) {
                    return t.animate(e, n)
                }
                onStart(t) {
                    this._onStartFns.push(t)
                }
                onDone(t) {
                    this._onDoneFns.push(t)
                }
                onDestroy(t) {
                    this._onDestroyFns.push(t)
                }
                play() {
                    this._buildPlayer(), this.hasStarted() || (this._onStartFns.forEach(t => t()), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()), this.domPlayer.play()
                }
                pause() {
                    this.init(), this.domPlayer.pause()
                }
                finish() {
                    this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish()
                }
                reset() {
                    this._resetDomPlayerState(), this._destroyed = !1, this._finished = !1, this._started = !1
                }
                _resetDomPlayerState() {
                    this.domPlayer && this.domPlayer.cancel()
                }
                restart() {
                    this.reset(), this.play()
                }
                hasStarted() {
                    return this._started
                }
                destroy() {
                    this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
                }
                setPosition(t) {
                    this.domPlayer.currentTime = t * this.time
                }
                getPosition() {
                    return this.domPlayer.currentTime / this.time
                }
                get totalTime() {
                    return this._delay + this._duration
                }
                beforeDestroy() {
                    const t = {};
                    this.hasStarted() && Object.keys(this._finalKeyframe).forEach(e => {
                        "offset" != e && (t[e] = this._finished ? this._finalKeyframe[e] : hf(this.element, e))
                    }), this.currentSnapshot = t
                }
                triggerCallback(t) {
                    const e = "start" == t ? this._onStartFns : this._onDoneFns;
                    e.forEach(t => t()), e.length = 0
                }
            }
            class Rm {
                constructor() {
                    this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(Im().toString()), this._cssKeyframesDriver = new Am
                }
                validateStyleProperty(t) {
                    return Ip(t)
                }
                matchesElement(t, e) {
                    return Op(t, e)
                }
                containsElement(t, e) {
                    return Pp(t, e)
                }
                query(t, e, n) {
                    return Fp(t, e, n)
                }
                computeStyle(t, e, n) {
                    return window.getComputedStyle(t)[e]
                }
                overrideWebAnimationsSupport(t) {
                    this._isNativeImpl = t
                }
                animate(t, e, n, i, s, r = [], o) {
                    if (!o && !this._isNativeImpl) return this._cssKeyframesDriver.animate(t, e, n, i, s, r);
                    const a = {
                        duration: n,
                        delay: i,
                        fill: 0 == i ? "both" : "forwards"
                    };
                    s && (a.easing = s);
                    const l = {},
                        c = r.filter(t => t instanceof Dm);
                    af(n, i) && c.forEach(t => {
                        let e = t.currentSnapshot;
                        Object.keys(e).forEach(t => l[t] = e[t])
                    });
                    const h = pm(t, e = lf(t, e = e.map(t => Qp(t, !1)), l));
                    return new Dm(t, e, a, h)
                }
            }

            function Im() {
                return "undefined" != typeof window && void 0 !== window.document && Element.prototype.animate || {}
            }
            let Om = (() => {
                class t extends op {
                    constructor(t, e) {
                        super(), this._nextAnimationId = 0, this._renderer = t.createRenderer(e.body, {
                            id: "0",
                            encapsulation: xt.None,
                            styles: [],
                            data: {
                                animation: []
                            }
                        })
                    }
                    build(t) {
                        const e = this._nextAnimationId.toString();
                        this._nextAnimationId++;
                        const n = Array.isArray(t) ? hp(t) : t;
                        return Lm(this._renderer, null, e, "register", [n]), new Pm(e, this._renderer)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(va), di(Pc))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            class Pm extends class {} {
                constructor(t, e) {
                    super(), this._id = t, this._renderer = e
                }
                create(t, e) {
                    return new Fm(this._id, t, e || {}, this._renderer)
                }
            }
            class Fm {
                constructor(t, e, n, i) {
                    this.id = t, this.element = e, this._renderer = i, this.parentPlayer = null, this._started = !1, this.totalTime = 0, this._command("create", n)
                }
                _listen(t, e) {
                    return this._renderer.listen(this.element, `@@${this.id}:${t}`, e)
                }
                _command(t, ...e) {
                    return Lm(this._renderer, this.element, this.id, t, e)
                }
                onDone(t) {
                    this._listen("done", t)
                }
                onStart(t) {
                    this._listen("start", t)
                }
                onDestroy(t) {
                    this._listen("destroy", t)
                }
                init() {
                    this._command("init")
                }
                hasStarted() {
                    return this._started
                }
                play() {
                    this._command("play"), this._started = !0
                }
                pause() {
                    this._command("pause")
                }
                restart() {
                    this._command("restart")
                }
                finish() {
                    this._command("finish")
                }
                destroy() {
                    this._command("destroy")
                }
                reset() {
                    this._command("reset")
                }
                setPosition(t) {
                    this._command("setPosition", t)
                }
                getPosition() {
                    var t, e;
                    return null !== (e = null === (t = this._renderer.engine.players[+this.id]) || void 0 === t ? void 0 : t.getPosition()) && void 0 !== e ? e : 0
                }
            }

            function Lm(t, e, n, i, s) {
                return t.setProperty(e, `@@${n}:${i}`, s)
            }
            const Nm = "@",
                Mm = "@.disabled";
            let Vm = (() => {
                class t {
                    constructor(t, e, n) {
                        this.delegate = t, this.engine = e, this._zone = n, this._currentId = 0, this._microtaskId = 1, this._animationCallbacksBuffer = [], this._rendererCache = new Map, this._cdRecurDepth = 0, this.promise = Promise.resolve(0), e.onRemovalComplete = (t, e) => {
                            e && e.parentNode(t) && e.removeChild(t.parentNode, t)
                        }
                    }
                    createRenderer(t, e) {
                        const n = this.delegate.createRenderer(t, e);
                        if (!(t && e && e.data && e.data.animation)) {
                            let t = this._rendererCache.get(n);
                            return t || (t = new jm("", n, this.engine), this._rendererCache.set(n, t)), t
                        }
                        const i = e.id,
                            s = e.id + "-" + this._currentId;
                        this._currentId++, this.engine.register(s, t);
                        const r = e => {
                            Array.isArray(e) ? e.forEach(r) : this.engine.registerTrigger(i, s, t, e.name, e)
                        };
                        return e.data.animation.forEach(r), new Bm(this, s, n, this.engine)
                    }
                    begin() {
                        this._cdRecurDepth++, this.delegate.begin && this.delegate.begin()
                    }
                    _scheduleCountTask() {
                        this.promise.then(() => {
                            this._microtaskId++
                        })
                    }
                    scheduleListenerCallback(t, e, n) {
                        t >= 0 && t < this._microtaskId ? this._zone.run(() => e(n)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(() => {
                            this._zone.run(() => {
                                this._animationCallbacksBuffer.forEach(t => {
                                    const [e, n] = t;
                                    e(n)
                                }), this._animationCallbacksBuffer = []
                            })
                        }), this._animationCallbacksBuffer.push([e, n]))
                    }
                    end() {
                        this._cdRecurDepth--, 0 == this._cdRecurDepth && this._zone.runOutsideAngular(() => {
                            this._scheduleCountTask(), this.engine.flush(this._microtaskId)
                        }), this.delegate.end && this.delegate.end()
                    }
                    whenRenderingDone() {
                        return this.engine.whenRenderingDone()
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(va), di(dm), di(rc))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            class jm {
                constructor(t, e, n) {
                    this.namespaceId = t, this.delegate = e, this.engine = n, this.destroyNode = this.delegate.destroyNode ? t => e.destroyNode(t) : null
                }
                get data() {
                    return this.delegate.data
                }
                destroy() {
                    this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy()
                }
                createElement(t, e) {
                    return this.delegate.createElement(t, e)
                }
                createComment(t) {
                    return this.delegate.createComment(t)
                }
                createText(t) {
                    return this.delegate.createText(t)
                }
                appendChild(t, e) {
                    this.delegate.appendChild(t, e), this.engine.onInsert(this.namespaceId, e, t, !1)
                }
                insertBefore(t, e, n, i = !0) {
                    this.delegate.insertBefore(t, e, n), this.engine.onInsert(this.namespaceId, e, t, i)
                }
                removeChild(t, e, n) {
                    this.engine.onRemove(this.namespaceId, e, this.delegate, n)
                }
                selectRootElement(t, e) {
                    return this.delegate.selectRootElement(t, e)
                }
                parentNode(t) {
                    return this.delegate.parentNode(t)
                }
                nextSibling(t) {
                    return this.delegate.nextSibling(t)
                }
                setAttribute(t, e, n, i) {
                    this.delegate.setAttribute(t, e, n, i)
                }
                removeAttribute(t, e, n) {
                    this.delegate.removeAttribute(t, e, n)
                }
                addClass(t, e) {
                    this.delegate.addClass(t, e)
                }
                removeClass(t, e) {
                    this.delegate.removeClass(t, e)
                }
                setStyle(t, e, n, i) {
                    this.delegate.setStyle(t, e, n, i)
                }
                removeStyle(t, e, n) {
                    this.delegate.removeStyle(t, e, n)
                }
                setProperty(t, e, n) {
                    e.charAt(0) == Nm && e == Mm ? this.disableAnimations(t, !!n) : this.delegate.setProperty(t, e, n)
                }
                setValue(t, e) {
                    this.delegate.setValue(t, e)
                }
                listen(t, e, n) {
                    return this.delegate.listen(t, e, n)
                }
                disableAnimations(t, e) {
                    this.engine.disableAnimations(t, e)
                }
            }
            class Bm extends jm {
                constructor(t, e, n, i) {
                    super(e, n, i), this.factory = t, this.namespaceId = e
                }
                setProperty(t, e, n) {
                    e.charAt(0) == Nm ? "." == e.charAt(1) && e == Mm ? this.disableAnimations(t, n = void 0 === n || !!n) : this.engine.process(this.namespaceId, t, e.substr(1), n) : this.delegate.setProperty(t, e, n)
                }
                listen(t, e, n) {
                    if (e.charAt(0) == Nm) {
                        const i = function(t) {
                            switch (t) {
                                case "body":
                                    return document.body;
                                case "document":
                                    return document;
                                case "window":
                                    return window;
                                default:
                                    return t
                            }
                        }(t);
                        let s = e.substr(1),
                            r = "";
                        return s.charAt(0) != Nm && ([s, r] = function(t) {
                            const e = t.indexOf(".");
                            return [t.substring(0, e), t.substr(e + 1)]
                        }(s)), this.engine.listen(this.namespaceId, i, s, r, t => {
                            this.factory.scheduleListenerCallback(t._data || -1, n, t)
                        })
                    }
                    return this.delegate.listen(t, e, n)
                }
            }
            let Hm = (() => {
                class t extends dm {
                    constructor(t, e, n) {
                        super(t.body, e, n)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(Pc), di(Mp), di(Ff))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            const zm = new Un("AnimationModuleType"),
                qm = [{
                    provide: Mp,
                    useFactory: function() {
                        return "function" == typeof Im() ? new Rm : new Am
                    }
                }, {
                    provide: zm,
                    useValue: "BrowserAnimations"
                }, {
                    provide: op,
                    useClass: Om
                }, {
                    provide: Ff,
                    useFactory: function() {
                        return new Lf
                    }
                }, {
                    provide: dm,
                    useClass: Hm
                }, {
                    provide: va,
                    useFactory: function(t, e, n) {
                        return new Vm(t, e, n)
                    },
                    deps: [wh, dm, rc]
                }];
            let Um = (() => {
                class t {}
                return t.\u0275mod = qt({
                    type: t
                }), t.\u0275inj = ct({
                    factory: function(e) {
                        return new(e || t)
                    },
                    providers: qm,
                    imports: [Lh]
                }), t
            })();
            const $m = new Ea("11.2.13"),
                Wm = new Un("mat-sanity-checks", {
                    providedIn: "root",
                    factory: function() {
                        return !0
                    }
                });
            let Zm = (() => {
                class t {
                    constructor(t, e, n) {
                        this._hasDoneGlobalChecks = !1, this._document = n, t._applyBodyHighContrastModeCssClasses(), this._sanityChecks = e, this._hasDoneGlobalChecks || (this._checkDoctypeIsDefined(), this._checkThemeIsPresent(), this._checkCdkVersionMatch(), this._hasDoneGlobalChecks = !0)
                    }
                    _getWindow() {
                        const t = this._document.defaultView || window;
                        return "object" == typeof t && t ? t : null
                    }
                    _checksAreEnabled() {
                        return bc() && !this._isTestEnv()
                    }
                    _isTestEnv() {
                        const t = this._getWindow();
                        return t && (t.__karma__ || t.jasmine)
                    }
                    _checkDoctypeIsDefined() {
                        this._checksAreEnabled() && (!0 === this._sanityChecks || this._sanityChecks.doctype) && !this._document.doctype && console.warn("Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.")
                    }
                    _checkThemeIsPresent() {
                        if (!this._checksAreEnabled() || !1 === this._sanityChecks || !this._sanityChecks.theme || !this._document.body || "function" != typeof getComputedStyle) return;
                        const t = this._document.createElement("div");
                        t.classList.add("mat-theme-loaded-marker"), this._document.body.appendChild(t);
                        const e = getComputedStyle(t);
                        e && "none" !== e.display && console.warn("Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"), this._document.body.removeChild(t)
                    }
                    _checkCdkVersionMatch() {
                        this._checksAreEnabled() && (!0 === this._sanityChecks || this._sanityChecks.version) && $m.full !== rp.full && console.warn("The Angular Material version (" + $m.full + ") does not match the Angular CDK version (" + rp.full + ").\nPlease ensure the versions of these two packages exactly match.")
                    }
                }
                return t.\u0275mod = qt({
                    type: t
                }), t.\u0275inj = ct({
                    factory: function(e) {
                        return new(e || t)(di(ju), di(Wm, 8), di(Pc))
                    },
                    imports: [
                        [od], od
                    ]
                }), t
            })();

            function Qm(t) {
                return class extends t {
                    constructor(...t) {
                        super(...t), this._disabled = !1
                    }
                    get disabled() {
                        return this._disabled
                    }
                    set disabled(t) {
                        this._disabled = su(t)
                    }
                }
            }

            function Km(t, e) {
                return class extends t {
                    constructor(...t) {
                        super(...t), this.defaultColor = e, this.color = e
                    }
                    get color() {
                        return this._color
                    }
                    set color(t) {
                        const e = t || this.defaultColor;
                        e !== this._color && (this._color && this._elementRef.nativeElement.classList.remove("mat-" + this._color), e && this._elementRef.nativeElement.classList.add("mat-" + e), this._color = e)
                    }
                }
            }

            function Gm(t) {
                return class extends t {
                    constructor(...t) {
                        super(...t), this._disableRipple = !1
                    }
                    get disableRipple() {
                        return this._disableRipple
                    }
                    set disableRipple(t) {
                        this._disableRipple = su(t)
                    }
                }
            }

            function Ym(t, e = 0) {
                return class extends t {
                    constructor(...t) {
                        super(...t), this._tabIndex = e, this.defaultTabIndex = e
                    }
                    get tabIndex() {
                        return this.disabled ? -1 : this._tabIndex
                    }
                    set tabIndex(t) {
                        this._tabIndex = null != t ? ru(t) : this.defaultTabIndex
                    }
                }
            }

            function Xm(t) {
                return class extends t {
                    constructor(...t) {
                        super(...t), this.errorState = !1, this.stateChanges = new x
                    }
                    updateErrorState() {
                        const t = this.errorState,
                            e = (this.errorStateMatcher || this._defaultErrorStateMatcher).isErrorState(this.ngControl ? this.ngControl.control : null, this._parentFormGroup || this._parentForm);
                        e !== t && (this.errorState = e, this.stateChanges.next())
                    }
                }
            }
            const Jm = new Un("MAT_DATE_LOCALE", {
                providedIn: "root",
                factory: function() {
                    return pi(Zl)
                }
            });
            class tg {
                constructor() {
                    this._localeChanges = new x, this.localeChanges = this._localeChanges
                }
                getValidDateOrNull(t) {
                    return this.isDateInstance(t) && this.isValid(t) ? t : null
                }
                deserialize(t) {
                    return null == t || this.isDateInstance(t) && this.isValid(t) ? t : this.invalid()
                }
                setLocale(t) {
                    this.locale = t, this._localeChanges.next()
                }
                compareDate(t, e) {
                    return this.getYear(t) - this.getYear(e) || this.getMonth(t) - this.getMonth(e) || this.getDate(t) - this.getDate(e)
                }
                sameDate(t, e) {
                    if (t && e) {
                        let n = this.isValid(t),
                            i = this.isValid(e);
                        return n && i ? !this.compareDate(t, e) : n == i
                    }
                    return t == e
                }
                clampDate(t, e, n) {
                    return e && this.compareDate(t, e) < 0 ? e : n && this.compareDate(t, n) > 0 ? n : t
                }
            }
            const eg = new Un("mat-date-formats");
            let ng;
            try {
                ng = "undefined" != typeof Intl
            } catch (xC) {
                ng = !1
            }
            const ig = {
                    long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
                },
                sg = ag(31, t => String(t + 1)),
                rg = {
                    long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    narrow: ["S", "M", "T", "W", "T", "F", "S"]
                },
                og = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;

            function ag(t, e) {
                const n = Array(t);
                for (let i = 0; i < t; i++) n[i] = e(i);
                return n
            }
            let lg = (() => {
                    class t extends tg {
                        constructor(t, e) {
                            super(), this.useUtcForDisplay = !0, super.setLocale(t), this.useUtcForDisplay = !e.TRIDENT, this._clampDate = e.TRIDENT || e.EDGE
                        }
                        getYear(t) {
                            return t.getFullYear()
                        }
                        getMonth(t) {
                            return t.getMonth()
                        }
                        getDate(t) {
                            return t.getDate()
                        }
                        getDayOfWeek(t) {
                            return t.getDay()
                        }
                        getMonthNames(t) {
                            if (ng) {
                                const e = new Intl.DateTimeFormat(this.locale, {
                                    month: t,
                                    timeZone: "utc"
                                });
                                return ag(12, t => this._stripDirectionalityCharacters(this._format(e, new Date(2017, t, 1))))
                            }
                            return ig[t]
                        }
                        getDateNames() {
                            if (ng) {
                                const t = new Intl.DateTimeFormat(this.locale, {
                                    day: "numeric",
                                    timeZone: "utc"
                                });
                                return ag(31, e => this._stripDirectionalityCharacters(this._format(t, new Date(2017, 0, e + 1))))
                            }
                            return sg
                        }
                        getDayOfWeekNames(t) {
                            if (ng) {
                                const e = new Intl.DateTimeFormat(this.locale, {
                                    weekday: t,
                                    timeZone: "utc"
                                });
                                return ag(7, t => this._stripDirectionalityCharacters(this._format(e, new Date(2017, 0, t + 1))))
                            }
                            return rg[t]
                        }
                        getYearName(t) {
                            if (ng) {
                                const e = new Intl.DateTimeFormat(this.locale, {
                                    year: "numeric",
                                    timeZone: "utc"
                                });
                                return this._stripDirectionalityCharacters(this._format(e, t))
                            }
                            return String(this.getYear(t))
                        }
                        getFirstDayOfWeek() {
                            return 0
                        }
                        getNumDaysInMonth(t) {
                            return this.getDate(this._createDateWithOverflow(this.getYear(t), this.getMonth(t) + 1, 0))
                        }
                        clone(t) {
                            return new Date(t.getTime())
                        }
                        createDate(t, e, n) {
                            let i = this._createDateWithOverflow(t, e, n);
                            return i.getMonth(), i
                        }
                        today() {
                            return new Date
                        }
                        parse(t) {
                            return "number" == typeof t ? new Date(t) : t ? new Date(Date.parse(t)) : null
                        }
                        format(t, e) {
                            if (!this.isValid(t)) throw Error("NativeDateAdapter: Cannot format invalid date.");
                            if (ng) {
                                this._clampDate && (t.getFullYear() < 1 || t.getFullYear() > 9999) && (t = this.clone(t)).setFullYear(Math.max(1, Math.min(9999, t.getFullYear()))), e = Object.assign(Object.assign({}, e), {
                                    timeZone: "utc"
                                });
                                const n = new Intl.DateTimeFormat(this.locale, e);
                                return this._stripDirectionalityCharacters(this._format(n, t))
                            }
                            return this._stripDirectionalityCharacters(t.toDateString())
                        }
                        addCalendarYears(t, e) {
                            return this.addCalendarMonths(t, 12 * e)
                        }
                        addCalendarMonths(t, e) {
                            let n = this._createDateWithOverflow(this.getYear(t), this.getMonth(t) + e, this.getDate(t));
                            return this.getMonth(n) != ((this.getMonth(t) + e) % 12 + 12) % 12 && (n = this._createDateWithOverflow(this.getYear(n), this.getMonth(n), 0)), n
                        }
                        addCalendarDays(t, e) {
                            return this._createDateWithOverflow(this.getYear(t), this.getMonth(t), this.getDate(t) + e)
                        }
                        toIso8601(t) {
                            return [t.getUTCFullYear(), this._2digit(t.getUTCMonth() + 1), this._2digit(t.getUTCDate())].join("-")
                        }
                        deserialize(t) {
                            if ("string" == typeof t) {
                                if (!t) return null;
                                if (og.test(t)) {
                                    let e = new Date(t);
                                    if (this.isValid(e)) return e
                                }
                            }
                            return super.deserialize(t)
                        }
                        isDateInstance(t) {
                            return t instanceof Date
                        }
                        isValid(t) {
                            return !isNaN(t.getTime())
                        }
                        invalid() {
                            return new Date(NaN)
                        }
                        _createDateWithOverflow(t, e, n) {
                            const i = new Date;
                            return i.setFullYear(t, e, n), i.setHours(0, 0, 0, 0), i
                        }
                        _2digit(t) {
                            return ("00" + t).slice(-2)
                        }
                        _stripDirectionalityCharacters(t) {
                            return t.replace(/[\u200e\u200f]/g, "")
                        }
                        _format(t, e) {
                            const n = new Date;
                            return n.setUTCFullYear(e.getFullYear(), e.getMonth(), e.getDate()), n.setUTCHours(e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()), t.format(n)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Jm, 8), di(uu))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                cg = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [{
                            provide: tg,
                            useClass: lg
                        }],
                        imports: [
                            [du]
                        ]
                    }), t
                })();
            const hg = {
                parse: {
                    dateInput: null
                },
                display: {
                    dateInput: {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric"
                    },
                    monthYearLabel: {
                        year: "numeric",
                        month: "short"
                    },
                    dateA11yLabel: {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    },
                    monthYearA11yLabel: {
                        year: "numeric",
                        month: "long"
                    }
                }
            };
            let ug = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [{
                            provide: eg,
                            useValue: hg
                        }],
                        imports: [
                            [cg]
                        ]
                    }), t
                })(),
                dg = (() => {
                    class t {
                        isErrorState(t, e) {
                            return !!(t && t.invalid && (t.touched || e && e.submitted))
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                pg = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Zm], Zm
                        ]
                    }), t
                })();
            class fg {
                constructor(t, e, n) {
                    this._renderer = t, this.element = e, this.config = n, this.state = 3
                }
                fadeOut() {
                    this._renderer.fadeOutRipple(this)
                }
            }
            const mg = {
                    enterDuration: 450,
                    exitDuration: 400
                },
                gg = yu({
                    passive: !0
                }),
                _g = ["mousedown", "touchstart"],
                yg = ["mouseup", "mouseleave", "touchend", "touchcancel"];
            class bg {
                constructor(t, e, n, i) {
                    this._target = t, this._ngZone = e, this._isPointerDown = !1, this._activeRipples = new Set, this._pointerUpEventsRegistered = !1, i.isBrowser && (this._containerElement = lu(n))
                }
                fadeInRipple(t, e, n = {}) {
                    const i = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect(),
                        s = Object.assign(Object.assign({}, mg), n.animation);
                    n.centered && (t = i.left + i.width / 2, e = i.top + i.height / 2);
                    const r = n.radius || function(t, e, n) {
                            const i = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                                s = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                            return Math.sqrt(i * i + s * s)
                        }(t, e, i),
                        o = t - i.left,
                        a = e - i.top,
                        l = s.enterDuration,
                        c = document.createElement("div");
                    c.classList.add("mat-ripple-element"), c.style.left = o - r + "px", c.style.top = a - r + "px", c.style.height = 2 * r + "px", c.style.width = 2 * r + "px", null != n.color && (c.style.backgroundColor = n.color), c.style.transitionDuration = l + "ms", this._containerElement.appendChild(c), window.getComputedStyle(c).getPropertyValue("opacity"), c.style.transform = "scale(1)";
                    const h = new fg(this, c, n);
                    return h.state = 0, this._activeRipples.add(h), n.persistent || (this._mostRecentTransientRipple = h), this._runTimeoutOutsideZone(() => {
                        const t = h === this._mostRecentTransientRipple;
                        h.state = 1, n.persistent || t && this._isPointerDown || h.fadeOut()
                    }, l), h
                }
                fadeOutRipple(t) {
                    const e = this._activeRipples.delete(t);
                    if (t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null), this._activeRipples.size || (this._containerRect = null), !e) return;
                    const n = t.element,
                        i = Object.assign(Object.assign({}, mg), t.config.animation);
                    n.style.transitionDuration = i.exitDuration + "ms", n.style.opacity = "0", t.state = 2, this._runTimeoutOutsideZone(() => {
                        t.state = 3, n.parentNode.removeChild(n)
                    }, i.exitDuration)
                }
                fadeOutAll() {
                    this._activeRipples.forEach(t => t.fadeOut())
                }
                fadeOutAllNonPersistent() {
                    this._activeRipples.forEach(t => {
                        t.config.persistent || t.fadeOut()
                    })
                }
                setupTriggerEvents(t) {
                    const e = lu(t);
                    e && e !== this._triggerElement && (this._removeTriggerEvents(), this._triggerElement = e, this._registerEvents(_g))
                }
                handleEvent(t) {
                    "mousedown" === t.type ? this._onMousedown(t) : "touchstart" === t.type ? this._onTouchStart(t) : this._onPointerUp(), this._pointerUpEventsRegistered || (this._registerEvents(yg), this._pointerUpEventsRegistered = !0)
                }
                _onMousedown(t) {
                    const e = Ru(t),
                        n = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
                    this._target.rippleDisabled || e || n || (this._isPointerDown = !0, this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig))
                }
                _onTouchStart(t) {
                    if (!this._target.rippleDisabled && !Iu(t)) {
                        this._lastTouchStartEvent = Date.now(), this._isPointerDown = !0;
                        const e = t.changedTouches;
                        for (let t = 0; t < e.length; t++) this.fadeInRipple(e[t].clientX, e[t].clientY, this._target.rippleConfig)
                    }
                }
                _onPointerUp() {
                    this._isPointerDown && (this._isPointerDown = !1, this._activeRipples.forEach(t => {
                        !t.config.persistent && (1 === t.state || t.config.terminateOnPointerUp && 0 === t.state) && t.fadeOut()
                    }))
                }
                _runTimeoutOutsideZone(t, e = 0) {
                    this._ngZone.runOutsideAngular(() => setTimeout(t, e))
                }
                _registerEvents(t) {
                    this._ngZone.runOutsideAngular(() => {
                        t.forEach(t => {
                            this._triggerElement.addEventListener(t, this, gg)
                        })
                    })
                }
                _removeTriggerEvents() {
                    this._triggerElement && (_g.forEach(t => {
                        this._triggerElement.removeEventListener(t, this, gg)
                    }), this._pointerUpEventsRegistered && yg.forEach(t => {
                        this._triggerElement.removeEventListener(t, this, gg)
                    }))
                }
            }
            const vg = new Un("mat-ripple-global-options");
            let wg = (() => {
                    class t {
                        constructor(t, e, n, i, s) {
                            this._elementRef = t, this._animationMode = s, this.radius = 0, this._disabled = !1, this._isInitialized = !1, this._globalOptions = i || {}, this._rippleRenderer = new bg(this, e, t, n)
                        }
                        get disabled() {
                            return this._disabled
                        }
                        set disabled(t) {
                            t && this.fadeOutAllNonPersistent(), this._disabled = t, this._setupTriggerEventsIfEnabled()
                        }
                        get trigger() {
                            return this._trigger || this._elementRef.nativeElement
                        }
                        set trigger(t) {
                            this._trigger = t, this._setupTriggerEventsIfEnabled()
                        }
                        ngOnInit() {
                            this._isInitialized = !0, this._setupTriggerEventsIfEnabled()
                        }
                        ngOnDestroy() {
                            this._rippleRenderer._removeTriggerEvents()
                        }
                        fadeOutAll() {
                            this._rippleRenderer.fadeOutAll()
                        }
                        fadeOutAllNonPersistent() {
                            this._rippleRenderer.fadeOutAllNonPersistent()
                        }
                        get rippleConfig() {
                            return {
                                centered: this.centered,
                                radius: this.radius,
                                color: this.color,
                                animation: Object.assign(Object.assign(Object.assign({}, this._globalOptions.animation), "NoopAnimations" === this._animationMode ? {
                                    enterDuration: 0,
                                    exitDuration: 0
                                } : {}), this.animation),
                                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
                            }
                        }
                        get rippleDisabled() {
                            return this.disabled || !!this._globalOptions.disabled
                        }
                        _setupTriggerEventsIfEnabled() {
                            !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger)
                        }
                        launch(t, e = 0, n) {
                            return "number" == typeof t ? this._rippleRenderer.fadeInRipple(t, e, Object.assign(Object.assign({}, this.rippleConfig), n)) : this._rippleRenderer.fadeInRipple(0, 0, Object.assign(Object.assign({}, this.rippleConfig), t))
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(ba), _o(rc), _o(uu), _o(vg, 8), _o(zm, 8))
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "mat-ripple", ""],
                            ["", "matRipple", ""]
                        ],
                        hostAttrs: [1, "mat-ripple"],
                        hostVars: 2,
                        hostBindings: function(t, e) {
                            2 & t && Bo("mat-ripple-unbounded", e.unbounded)
                        },
                        inputs: {
                            radius: ["matRippleRadius", "radius"],
                            disabled: ["matRippleDisabled", "disabled"],
                            trigger: ["matRippleTrigger", "trigger"],
                            color: ["matRippleColor", "color"],
                            unbounded: ["matRippleUnbounded", "unbounded"],
                            centered: ["matRippleCentered", "centered"],
                            animation: ["matRippleAnimation", "animation"]
                        },
                        exportAs: ["matRipple"]
                    }), t
                })(),
                Cg = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Zm, du], Zm
                        ]
                    }), t
                })(),
                xg = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Zm]
                        ]
                    }), t
                })(),
                Eg = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Cg, rh, Zm, xg]
                        ]
                    }), t
                })();
            const Sg = bu();
            class kg {
                constructor(t, e) {
                    this._viewportRuler = t, this._previousHTMLStyles = {
                        top: "",
                        left: ""
                    }, this._isEnabled = !1, this._document = e
                }
                attach() {}
                enable() {
                    if (this._canBeEnabled()) {
                        const t = this._document.documentElement;
                        this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition(), this._previousHTMLStyles.left = t.style.left || "", this._previousHTMLStyles.top = t.style.top || "", t.style.left = au(-this._previousScrollPosition.left), t.style.top = au(-this._previousScrollPosition.top), t.classList.add("cdk-global-scrollblock"), this._isEnabled = !0
                    }
                }
                disable() {
                    if (this._isEnabled) {
                        const t = this._document.documentElement,
                            e = t.style,
                            n = this._document.body.style,
                            i = e.scrollBehavior || "",
                            s = n.scrollBehavior || "";
                        this._isEnabled = !1, e.left = this._previousHTMLStyles.left, e.top = this._previousHTMLStyles.top, t.classList.remove("cdk-global-scrollblock"), Sg && (e.scrollBehavior = n.scrollBehavior = "auto"), window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top), Sg && (e.scrollBehavior = i, n.scrollBehavior = s)
                    }
                }
                _canBeEnabled() {
                    if (this._document.documentElement.classList.contains("cdk-global-scrollblock") || this._isEnabled) return !1;
                    const t = this._document.body,
                        e = this._viewportRuler.getViewportSize();
                    return t.scrollHeight > e.height || t.scrollWidth > e.width
                }
            }
            class Tg {
                constructor(t, e, n, i) {
                    this._scrollDispatcher = t, this._ngZone = e, this._viewportRuler = n, this._config = i, this._scrollSubscription = null, this._detach = () => {
                        this.disable(), this._overlayRef.hasAttached() && this._ngZone.run(() => this._overlayRef.detach())
                    }
                }
                attach(t) {
                    this._overlayRef = t
                }
                enable() {
                    if (this._scrollSubscription) return;
                    const t = this._scrollDispatcher.scrolled(0);
                    this._config && this._config.threshold && this._config.threshold > 1 ? (this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top, this._scrollSubscription = t.subscribe(() => {
                        const t = this._viewportRuler.getViewportScrollPosition().top;
                        Math.abs(t - this._initialScrollPosition) > this._config.threshold ? this._detach() : this._overlayRef.updatePosition()
                    })) : this._scrollSubscription = t.subscribe(this._detach)
                }
                disable() {
                    this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
                }
                detach() {
                    this.disable(), this._overlayRef = null
                }
            }
            class Ag {
                enable() {}
                disable() {}
                attach() {}
            }

            function Dg(t, e) {
                return e.some(e => t.bottom < e.top || t.top > e.bottom || t.right < e.left || t.left > e.right)
            }

            function Rg(t, e) {
                return e.some(e => t.top < e.top || t.bottom > e.bottom || t.left < e.left || t.right > e.right)
            }
            class Ig {
                constructor(t, e, n, i) {
                    this._scrollDispatcher = t, this._viewportRuler = e, this._ngZone = n, this._config = i, this._scrollSubscription = null
                }
                attach(t) {
                    this._overlayRef = t
                }
                enable() {
                    this._scrollSubscription || (this._scrollSubscription = this._scrollDispatcher.scrolled(this._config ? this._config.scrollThrottle : 0).subscribe(() => {
                        if (this._overlayRef.updatePosition(), this._config && this._config.autoClose) {
                            const t = this._overlayRef.overlayElement.getBoundingClientRect(),
                                {
                                    width: e,
                                    height: n
                                } = this._viewportRuler.getViewportSize();
                            Dg(t, [{
                                width: e,
                                height: n,
                                bottom: n,
                                right: e,
                                top: 0,
                                left: 0
                            }]) && (this.disable(), this._ngZone.run(() => this._overlayRef.detach()))
                        }
                    }))
                }
                disable() {
                    this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
                }
                detach() {
                    this.disable(), this._overlayRef = null
                }
            }
            let Og = (() => {
                class t {
                    constructor(t, e, n, i) {
                        this._scrollDispatcher = t, this._viewportRuler = e, this._ngZone = n, this.noop = () => new Ag, this.close = t => new Tg(this._scrollDispatcher, this._ngZone, this._viewportRuler, t), this.block = () => new kg(this._viewportRuler, this._document), this.reposition = t => new Ig(this._scrollDispatcher, this._viewportRuler, this._ngZone, t), this._document = i
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(ad), di(ld), di(rc), di(Pc))
                }, t.\u0275prov = lt({
                    factory: function() {
                        return new t(di(ad), di(ld), di(rc), di(Pc))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })();
            class Pg {
                constructor(t) {
                    if (this.scrollStrategy = new Ag, this.panelClass = "", this.hasBackdrop = !1, this.backdropClass = "cdk-overlay-dark-backdrop", this.disposeOnNavigation = !1, t) {
                        const e = Object.keys(t);
                        for (const n of e) void 0 !== t[n] && (this[n] = t[n])
                    }
                }
            }
            class Fg {
                constructor(t, e, n, i, s) {
                    this.offsetX = n, this.offsetY = i, this.panelClass = s, this.originX = t.originX, this.originY = t.originY, this.overlayX = e.overlayX, this.overlayY = e.overlayY
                }
            }
            class Lg {
                constructor(t, e) {
                    this.connectionPair = t, this.scrollableViewProperties = e
                }
            }
            let Ng = (() => {
                    class t {
                        constructor(t) {
                            this._attachedOverlays = [], this._document = t
                        }
                        ngOnDestroy() {
                            this.detach()
                        }
                        add(t) {
                            this.remove(t), this._attachedOverlays.push(t)
                        }
                        remove(t) {
                            const e = this._attachedOverlays.indexOf(t);
                            e > -1 && this._attachedOverlays.splice(e, 1), 0 === this._attachedOverlays.length && this.detach()
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Pc))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(Pc))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                Mg = (() => {
                    class t extends Ng {
                        constructor(t) {
                            super(t), this._keydownListener = t => {
                                const e = this._attachedOverlays;
                                for (let n = e.length - 1; n > -1; n--)
                                    if (e[n]._keydownEvents.observers.length > 0) {
                                        e[n]._keydownEvents.next(t);
                                        break
                                    }
                            }
                        }
                        add(t) {
                            super.add(t), this._isAttached || (this._document.body.addEventListener("keydown", this._keydownListener), this._isAttached = !0)
                        }
                        detach() {
                            this._isAttached && (this._document.body.removeEventListener("keydown", this._keydownListener), this._isAttached = !1)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Pc))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(Pc))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                Vg = (() => {
                    class t extends Ng {
                        constructor(t, e) {
                            super(t), this._platform = e, this._cursorStyleIsSet = !1, this._clickListener = t => {
                                const e = t.composedPath ? t.composedPath()[0] : t.target,
                                    n = this._attachedOverlays.slice();
                                for (let i = n.length - 1; i > -1; i--) {
                                    const s = n[i];
                                    if (!(s._outsidePointerEvents.observers.length < 1) && s.hasAttached()) {
                                        if (s.overlayElement.contains(e)) break;
                                        s._outsidePointerEvents.next(t)
                                    }
                                }
                            }
                        }
                        add(t) {
                            if (super.add(t), !this._isAttached) {
                                const t = this._document.body;
                                t.addEventListener("click", this._clickListener, !0), t.addEventListener("auxclick", this._clickListener, !0), t.addEventListener("contextmenu", this._clickListener, !0), this._platform.IOS && !this._cursorStyleIsSet && (this._cursorOriginalValue = t.style.cursor, t.style.cursor = "pointer", this._cursorStyleIsSet = !0), this._isAttached = !0
                            }
                        }
                        detach() {
                            if (this._isAttached) {
                                const t = this._document.body;
                                t.removeEventListener("click", this._clickListener, !0), t.removeEventListener("auxclick", this._clickListener, !0), t.removeEventListener("contextmenu", this._clickListener, !0), this._platform.IOS && this._cursorStyleIsSet && (t.style.cursor = this._cursorOriginalValue, this._cursorStyleIsSet = !1), this._isAttached = !1
                            }
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Pc), di(uu))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(Pc), di(uu))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })();
            const jg = !("undefined" == typeof window || !window || !window.__karma__ && !window.jasmine);
            let Bg = (() => {
                class t {
                    constructor(t, e) {
                        this._platform = e, this._document = t
                    }
                    ngOnDestroy() {
                        const t = this._containerElement;
                        t && t.parentNode && t.parentNode.removeChild(t)
                    }
                    getContainerElement() {
                        return this._containerElement || this._createContainer(), this._containerElement
                    }
                    _createContainer() {
                        const t = "cdk-overlay-container";
                        if (this._platform.isBrowser || jg) {
                            const e = this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);
                            for (let t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t])
                        }
                        const e = this._document.createElement("div");
                        e.classList.add(t), jg ? e.setAttribute("platform", "test") : this._platform.isBrowser || e.setAttribute("platform", "server"), this._document.body.appendChild(e), this._containerElement = e
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(Pc), di(uu))
                }, t.\u0275prov = lt({
                    factory: function() {
                        return new t(di(Pc), di(uu))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })();
            class Hg {
                constructor(t, e, n, i, s, r, o, a, l) {
                    this._portalOutlet = t, this._host = e, this._pane = n, this._config = i, this._ngZone = s, this._keyboardDispatcher = r, this._document = o, this._location = a, this._outsideClickDispatcher = l, this._backdropElement = null, this._backdropClick = new x, this._attachments = new x, this._detachments = new x, this._locationChanges = u.EMPTY, this._backdropClickHandler = t => this._backdropClick.next(t), this._keydownEvents = new x, this._outsidePointerEvents = new x, i.scrollStrategy && (this._scrollStrategy = i.scrollStrategy, this._scrollStrategy.attach(this)), this._positionStrategy = i.positionStrategy
                }
                get overlayElement() {
                    return this._pane
                }
                get backdropElement() {
                    return this._backdropElement
                }
                get hostElement() {
                    return this._host
                }
                attach(t) {
                    let e = this._portalOutlet.attach(t);
                    return !this._host.parentElement && this._previousHostParent && this._previousHostParent.appendChild(this._host), this._positionStrategy && this._positionStrategy.attach(this), this._updateStackingOrder(), this._updateElementSize(), this._updateElementDirection(), this._scrollStrategy && this._scrollStrategy.enable(), this._ngZone.onStable.pipe(eu(1)).subscribe(() => {
                        this.hasAttached() && this.updatePosition()
                    }), this._togglePointerEvents(!0), this._config.hasBackdrop && this._attachBackdrop(), this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0), this._attachments.next(), this._keyboardDispatcher.add(this), this._config.disposeOnNavigation && (this._locationChanges = this._location.subscribe(() => this.dispose())), this._outsideClickDispatcher.add(this), e
                }
                detach() {
                    if (!this.hasAttached()) return;
                    this.detachBackdrop(), this._togglePointerEvents(!1), this._positionStrategy && this._positionStrategy.detach && this._positionStrategy.detach(), this._scrollStrategy && this._scrollStrategy.disable();
                    const t = this._portalOutlet.detach();
                    return this._detachments.next(), this._keyboardDispatcher.remove(this), this._detachContentWhenStable(), this._locationChanges.unsubscribe(), this._outsideClickDispatcher.remove(this), t
                }
                dispose() {
                    const t = this.hasAttached();
                    this._positionStrategy && this._positionStrategy.dispose(), this._disposeScrollStrategy(), this.detachBackdrop(), this._locationChanges.unsubscribe(), this._keyboardDispatcher.remove(this), this._portalOutlet.dispose(), this._attachments.complete(), this._backdropClick.complete(), this._keydownEvents.complete(), this._outsidePointerEvents.complete(), this._outsideClickDispatcher.remove(this), this._host && this._host.parentNode && (this._host.parentNode.removeChild(this._host), this._host = null), this._previousHostParent = this._pane = null, t && this._detachments.next(), this._detachments.complete()
                }
                hasAttached() {
                    return this._portalOutlet.hasAttached()
                }
                backdropClick() {
                    return this._backdropClick
                }
                attachments() {
                    return this._attachments
                }
                detachments() {
                    return this._detachments
                }
                keydownEvents() {
                    return this._keydownEvents
                }
                outsidePointerEvents() {
                    return this._outsidePointerEvents
                }
                getConfig() {
                    return this._config
                }
                updatePosition() {
                    this._positionStrategy && this._positionStrategy.apply()
                }
                updatePositionStrategy(t) {
                    t !== this._positionStrategy && (this._positionStrategy && this._positionStrategy.dispose(), this._positionStrategy = t, this.hasAttached() && (t.attach(this), this.updatePosition()))
                }
                updateSize(t) {
                    this._config = Object.assign(Object.assign({}, this._config), t), this._updateElementSize()
                }
                setDirection(t) {
                    this._config = Object.assign(Object.assign({}, this._config), {
                        direction: t
                    }), this._updateElementDirection()
                }
                addPanelClass(t) {
                    this._pane && this._toggleClasses(this._pane, t, !0)
                }
                removePanelClass(t) {
                    this._pane && this._toggleClasses(this._pane, t, !1)
                }
                getDirection() {
                    const t = this._config.direction;
                    return t ? "string" == typeof t ? t : t.value : "ltr"
                }
                updateScrollStrategy(t) {
                    t !== this._scrollStrategy && (this._disposeScrollStrategy(), this._scrollStrategy = t, this.hasAttached() && (t.attach(this), t.enable()))
                }
                _updateElementDirection() {
                    this._host.setAttribute("dir", this.getDirection())
                }
                _updateElementSize() {
                    if (!this._pane) return;
                    const t = this._pane.style;
                    t.width = au(this._config.width), t.height = au(this._config.height), t.minWidth = au(this._config.minWidth), t.minHeight = au(this._config.minHeight), t.maxWidth = au(this._config.maxWidth), t.maxHeight = au(this._config.maxHeight)
                }
                _togglePointerEvents(t) {
                    this._pane.style.pointerEvents = t ? "" : "none"
                }
                _attachBackdrop() {
                    const t = "cdk-overlay-backdrop-showing";
                    this._backdropElement = this._document.createElement("div"), this._backdropElement.classList.add("cdk-overlay-backdrop"), this._config.backdropClass && this._toggleClasses(this._backdropElement, this._config.backdropClass, !0), this._host.parentElement.insertBefore(this._backdropElement, this._host), this._backdropElement.addEventListener("click", this._backdropClickHandler), "undefined" != typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
                        requestAnimationFrame(() => {
                            this._backdropElement && this._backdropElement.classList.add(t)
                        })
                    }) : this._backdropElement.classList.add(t)
                }
                _updateStackingOrder() {
                    this._host.nextSibling && this._host.parentNode.appendChild(this._host)
                }
                detachBackdrop() {
                    let t, e = this._backdropElement;
                    if (!e) return;
                    let n = () => {
                        e && (e.removeEventListener("click", this._backdropClickHandler), e.removeEventListener("transitionend", n), e.parentNode && e.parentNode.removeChild(e)), this._backdropElement == e && (this._backdropElement = null), this._config.backdropClass && this._toggleClasses(e, this._config.backdropClass, !1), clearTimeout(t)
                    };
                    e.classList.remove("cdk-overlay-backdrop-showing"), this._ngZone.runOutsideAngular(() => {
                        e.addEventListener("transitionend", n)
                    }), e.style.pointerEvents = "none", t = this._ngZone.runOutsideAngular(() => setTimeout(n, 500))
                }
                _toggleClasses(t, e, n) {
                    const i = t.classList;
                    ou(e).forEach(t => {
                        t && (n ? i.add(t) : i.remove(t))
                    })
                }
                _detachContentWhenStable() {
                    this._ngZone.runOutsideAngular(() => {
                        const t = this._ngZone.onStable.pipe(Ju($(this._attachments, this._detachments))).subscribe(() => {
                            this._pane && this._host && 0 !== this._pane.children.length || (this._pane && this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !1), this._host && this._host.parentElement && (this._previousHostParent = this._host.parentElement, this._previousHostParent.removeChild(this._host)), t.unsubscribe())
                        })
                    })
                }
                _disposeScrollStrategy() {
                    const t = this._scrollStrategy;
                    t && (t.disable(), t.detach && t.detach())
                }
            }
            const zg = "cdk-overlay-connected-position-bounding-box",
                qg = /([A-Za-z%]+)$/;
            class Ug {
                constructor(t, e, n, i, s) {
                    this._viewportRuler = e, this._document = n, this._platform = i, this._overlayContainer = s, this._lastBoundingBoxSize = {
                        width: 0,
                        height: 0
                    }, this._isPushed = !1, this._canPush = !0, this._growAfterOpen = !1, this._hasFlexibleDimensions = !0, this._positionLocked = !1, this._viewportMargin = 0, this._scrollables = [], this._preferredPositions = [], this._positionChanges = new x, this._resizeSubscription = u.EMPTY, this._offsetX = 0, this._offsetY = 0, this._appliedPanelClasses = [], this.positionChanges = this._positionChanges, this.setOrigin(t)
                }
                get positions() {
                    return this._preferredPositions
                }
                attach(t) {
                    this._validatePositions(), t.hostElement.classList.add(zg), this._overlayRef = t, this._boundingBox = t.hostElement, this._pane = t.overlayElement, this._isDisposed = !1, this._isInitialRender = !0, this._lastPosition = null, this._resizeSubscription.unsubscribe(), this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
                        this._isInitialRender = !0, this.apply()
                    })
                }
                apply() {
                    if (this._isDisposed || !this._platform.isBrowser) return;
                    if (!this._isInitialRender && this._positionLocked && this._lastPosition) return void this.reapplyLastPosition();
                    this._clearPanelClasses(), this._resetOverlayElementStyles(), this._resetBoundingBoxStyles(), this._viewportRect = this._getNarrowedViewportRect(), this._originRect = this._getOriginRect(), this._overlayRect = this._pane.getBoundingClientRect();
                    const t = this._originRect,
                        e = this._overlayRect,
                        n = this._viewportRect,
                        i = [];
                    let s;
                    for (let r of this._preferredPositions) {
                        let o = this._getOriginPoint(t, r),
                            a = this._getOverlayPoint(o, e, r),
                            l = this._getOverlayFit(a, e, n, r);
                        if (l.isCompletelyWithinViewport) return this._isPushed = !1, void this._applyPosition(r, o);
                        this._canFitWithFlexibleDimensions(l, a, n) ? i.push({
                            position: r,
                            origin: o,
                            overlayRect: e,
                            boundingBoxRect: this._calculateBoundingBoxRect(o, r)
                        }) : (!s || s.overlayFit.visibleArea < l.visibleArea) && (s = {
                            overlayFit: l,
                            overlayPoint: a,
                            originPoint: o,
                            position: r,
                            overlayRect: e
                        })
                    }
                    if (i.length) {
                        let t = null,
                            e = -1;
                        for (const n of i) {
                            const i = n.boundingBoxRect.width * n.boundingBoxRect.height * (n.position.weight || 1);
                            i > e && (e = i, t = n)
                        }
                        return this._isPushed = !1, void this._applyPosition(t.position, t.origin)
                    }
                    if (this._canPush) return this._isPushed = !0, void this._applyPosition(s.position, s.originPoint);
                    this._applyPosition(s.position, s.originPoint)
                }
                detach() {
                    this._clearPanelClasses(), this._lastPosition = null, this._previousPushAmount = null, this._resizeSubscription.unsubscribe()
                }
                dispose() {
                    this._isDisposed || (this._boundingBox && $g(this._boundingBox.style, {
                        top: "",
                        left: "",
                        right: "",
                        bottom: "",
                        height: "",
                        width: "",
                        alignItems: "",
                        justifyContent: ""
                    }), this._pane && this._resetOverlayElementStyles(), this._overlayRef && this._overlayRef.hostElement.classList.remove(zg), this.detach(), this._positionChanges.complete(), this._overlayRef = this._boundingBox = null, this._isDisposed = !0)
                }
                reapplyLastPosition() {
                    if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
                        this._originRect = this._getOriginRect(), this._overlayRect = this._pane.getBoundingClientRect(), this._viewportRect = this._getNarrowedViewportRect();
                        const t = this._lastPosition || this._preferredPositions[0],
                            e = this._getOriginPoint(this._originRect, t);
                        this._applyPosition(t, e)
                    }
                }
                withScrollableContainers(t) {
                    return this._scrollables = t, this
                }
                withPositions(t) {
                    return this._preferredPositions = t, -1 === t.indexOf(this._lastPosition) && (this._lastPosition = null), this._validatePositions(), this
                }
                withViewportMargin(t) {
                    return this._viewportMargin = t, this
                }
                withFlexibleDimensions(t = !0) {
                    return this._hasFlexibleDimensions = t, this
                }
                withGrowAfterOpen(t = !0) {
                    return this._growAfterOpen = t, this
                }
                withPush(t = !0) {
                    return this._canPush = t, this
                }
                withLockedPosition(t = !0) {
                    return this._positionLocked = t, this
                }
                setOrigin(t) {
                    return this._origin = t, this
                }
                withDefaultOffsetX(t) {
                    return this._offsetX = t, this
                }
                withDefaultOffsetY(t) {
                    return this._offsetY = t, this
                }
                withTransformOriginOn(t) {
                    return this._transformOriginSelector = t, this
                }
                _getOriginPoint(t, e) {
                    let n, i;
                    if ("center" == e.originX) n = t.left + t.width / 2;
                    else {
                        const i = this._isRtl() ? t.right : t.left,
                            s = this._isRtl() ? t.left : t.right;
                        n = "start" == e.originX ? i : s
                    }
                    return i = "center" == e.originY ? t.top + t.height / 2 : "top" == e.originY ? t.top : t.bottom, {
                        x: n,
                        y: i
                    }
                }
                _getOverlayPoint(t, e, n) {
                    let i, s;
                    return i = "center" == n.overlayX ? -e.width / 2 : "start" === n.overlayX ? this._isRtl() ? -e.width : 0 : this._isRtl() ? 0 : -e.width, s = "center" == n.overlayY ? -e.height / 2 : "top" == n.overlayY ? 0 : -e.height, {
                        x: t.x + i,
                        y: t.y + s
                    }
                }
                _getOverlayFit(t, e, n, i) {
                    const s = Zg(e);
                    let {
                        x: r,
                        y: o
                    } = t, a = this._getOffset(i, "x"), l = this._getOffset(i, "y");
                    a && (r += a), l && (o += l);
                    let c = 0 - o,
                        h = o + s.height - n.height,
                        u = this._subtractOverflows(s.width, 0 - r, r + s.width - n.width),
                        d = this._subtractOverflows(s.height, c, h),
                        p = u * d;
                    return {
                        visibleArea: p,
                        isCompletelyWithinViewport: s.width * s.height === p,
                        fitsInViewportVertically: d === s.height,
                        fitsInViewportHorizontally: u == s.width
                    }
                }
                _canFitWithFlexibleDimensions(t, e, n) {
                    if (this._hasFlexibleDimensions) {
                        const i = n.bottom - e.y,
                            s = n.right - e.x,
                            r = Wg(this._overlayRef.getConfig().minHeight),
                            o = Wg(this._overlayRef.getConfig().minWidth),
                            a = t.fitsInViewportHorizontally || null != o && o <= s;
                        return (t.fitsInViewportVertically || null != r && r <= i) && a
                    }
                    return !1
                }
                _pushOverlayOnScreen(t, e, n) {
                    if (this._previousPushAmount && this._positionLocked) return {
                        x: t.x + this._previousPushAmount.x,
                        y: t.y + this._previousPushAmount.y
                    };
                    const i = Zg(e),
                        s = this._viewportRect,
                        r = Math.max(t.x + i.width - s.width, 0),
                        o = Math.max(t.y + i.height - s.height, 0),
                        a = Math.max(s.top - n.top - t.y, 0),
                        l = Math.max(s.left - n.left - t.x, 0);
                    let c = 0,
                        h = 0;
                    return c = i.width <= s.width ? l || -r : t.x < this._viewportMargin ? s.left - n.left - t.x : 0, h = i.height <= s.height ? a || -o : t.y < this._viewportMargin ? s.top - n.top - t.y : 0, this._previousPushAmount = {
                        x: c,
                        y: h
                    }, {
                        x: t.x + c,
                        y: t.y + h
                    }
                }
                _applyPosition(t, e) {
                    if (this._setTransformOrigin(t), this._setOverlayElementStyles(e, t), this._setBoundingBoxStyles(e, t), t.panelClass && this._addPanelClasses(t.panelClass), this._lastPosition = t, this._positionChanges.observers.length) {
                        const e = this._getScrollVisibility(),
                            n = new Lg(t, e);
                        this._positionChanges.next(n)
                    }
                    this._isInitialRender = !1
                }
                _setTransformOrigin(t) {
                    if (!this._transformOriginSelector) return;
                    const e = this._boundingBox.querySelectorAll(this._transformOriginSelector);
                    let n, i = t.overlayY;
                    n = "center" === t.overlayX ? "center" : this._isRtl() ? "start" === t.overlayX ? "right" : "left" : "start" === t.overlayX ? "left" : "right";
                    for (let s = 0; s < e.length; s++) e[s].style.transformOrigin = `${n} ${i}`
                }
                _calculateBoundingBoxRect(t, e) {
                    const n = this._viewportRect,
                        i = this._isRtl();
                    let s, r, o, a, l, c;
                    if ("top" === e.overlayY) r = t.y, s = n.height - r + this._viewportMargin;
                    else if ("bottom" === e.overlayY) o = n.height - t.y + 2 * this._viewportMargin, s = n.height - o + this._viewportMargin;
                    else {
                        const e = Math.min(n.bottom - t.y + n.top, t.y),
                            i = this._lastBoundingBoxSize.height;
                        s = 2 * e, r = t.y - e, s > i && !this._isInitialRender && !this._growAfterOpen && (r = t.y - i / 2)
                    }
                    if ("end" === e.overlayX && !i || "start" === e.overlayX && i) c = n.width - t.x + this._viewportMargin, a = t.x - this._viewportMargin;
                    else if ("start" === e.overlayX && !i || "end" === e.overlayX && i) l = t.x, a = n.right - t.x;
                    else {
                        const e = Math.min(n.right - t.x + n.left, t.x),
                            i = this._lastBoundingBoxSize.width;
                        a = 2 * e, l = t.x - e, a > i && !this._isInitialRender && !this._growAfterOpen && (l = t.x - i / 2)
                    }
                    return {
                        top: r,
                        left: l,
                        bottom: o,
                        right: c,
                        width: a,
                        height: s
                    }
                }
                _setBoundingBoxStyles(t, e) {
                    const n = this._calculateBoundingBoxRect(t, e);
                    this._isInitialRender || this._growAfterOpen || (n.height = Math.min(n.height, this._lastBoundingBoxSize.height), n.width = Math.min(n.width, this._lastBoundingBoxSize.width));
                    const i = {};
                    if (this._hasExactPosition()) i.top = i.left = "0", i.bottom = i.right = i.maxHeight = i.maxWidth = "", i.width = i.height = "100%";
                    else {
                        const t = this._overlayRef.getConfig().maxHeight,
                            s = this._overlayRef.getConfig().maxWidth;
                        i.height = au(n.height), i.top = au(n.top), i.bottom = au(n.bottom), i.width = au(n.width), i.left = au(n.left), i.right = au(n.right), i.alignItems = "center" === e.overlayX ? "center" : "end" === e.overlayX ? "flex-end" : "flex-start", i.justifyContent = "center" === e.overlayY ? "center" : "bottom" === e.overlayY ? "flex-end" : "flex-start", t && (i.maxHeight = au(t)), s && (i.maxWidth = au(s))
                    }
                    this._lastBoundingBoxSize = n, $g(this._boundingBox.style, i)
                }
                _resetBoundingBoxStyles() {
                    $g(this._boundingBox.style, {
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        height: "",
                        width: "",
                        alignItems: "",
                        justifyContent: ""
                    })
                }
                _resetOverlayElementStyles() {
                    $g(this._pane.style, {
                        top: "",
                        left: "",
                        bottom: "",
                        right: "",
                        position: "",
                        transform: ""
                    })
                }
                _setOverlayElementStyles(t, e) {
                    const n = {},
                        i = this._hasExactPosition(),
                        s = this._hasFlexibleDimensions,
                        r = this._overlayRef.getConfig();
                    if (i) {
                        const i = this._viewportRuler.getViewportScrollPosition();
                        $g(n, this._getExactOverlayY(e, t, i)), $g(n, this._getExactOverlayX(e, t, i))
                    } else n.position = "static";
                    let o = "",
                        a = this._getOffset(e, "x"),
                        l = this._getOffset(e, "y");
                    a && (o += `translateX(${a}px) `), l && (o += `translateY(${l}px)`), n.transform = o.trim(), r.maxHeight && (i ? n.maxHeight = au(r.maxHeight) : s && (n.maxHeight = "")), r.maxWidth && (i ? n.maxWidth = au(r.maxWidth) : s && (n.maxWidth = "")), $g(this._pane.style, n)
                }
                _getExactOverlayY(t, e, n) {
                    let i = {
                            top: "",
                            bottom: ""
                        },
                        s = this._getOverlayPoint(e, this._overlayRect, t);
                    this._isPushed && (s = this._pushOverlayOnScreen(s, this._overlayRect, n));
                    let r = this._overlayContainer.getContainerElement().getBoundingClientRect().top;
                    return s.y -= r, "bottom" === t.overlayY ? i.bottom = this._document.documentElement.clientHeight - (s.y + this._overlayRect.height) + "px" : i.top = au(s.y), i
                }
                _getExactOverlayX(t, e, n) {
                    let i, s = {
                            left: "",
                            right: ""
                        },
                        r = this._getOverlayPoint(e, this._overlayRect, t);
                    return this._isPushed && (r = this._pushOverlayOnScreen(r, this._overlayRect, n)), i = this._isRtl() ? "end" === t.overlayX ? "left" : "right" : "end" === t.overlayX ? "right" : "left", "right" === i ? s.right = this._document.documentElement.clientWidth - (r.x + this._overlayRect.width) + "px" : s.left = au(r.x), s
                }
                _getScrollVisibility() {
                    const t = this._getOriginRect(),
                        e = this._pane.getBoundingClientRect(),
                        n = this._scrollables.map(t => t.getElementRef().nativeElement.getBoundingClientRect());
                    return {
                        isOriginClipped: Rg(t, n),
                        isOriginOutsideView: Dg(t, n),
                        isOverlayClipped: Rg(e, n),
                        isOverlayOutsideView: Dg(e, n)
                    }
                }
                _subtractOverflows(t, ...e) {
                    return e.reduce((t, e) => t - Math.max(e, 0), t)
                }
                _getNarrowedViewportRect() {
                    const t = this._document.documentElement.clientWidth,
                        e = this._document.documentElement.clientHeight,
                        n = this._viewportRuler.getViewportScrollPosition();
                    return {
                        top: n.top + this._viewportMargin,
                        left: n.left + this._viewportMargin,
                        right: n.left + t - this._viewportMargin,
                        bottom: n.top + e - this._viewportMargin,
                        width: t - 2 * this._viewportMargin,
                        height: e - 2 * this._viewportMargin
                    }
                }
                _isRtl() {
                    return "rtl" === this._overlayRef.getDirection()
                }
                _hasExactPosition() {
                    return !this._hasFlexibleDimensions || this._isPushed
                }
                _getOffset(t, e) {
                    return "x" === e ? null == t.offsetX ? this._offsetX : t.offsetX : null == t.offsetY ? this._offsetY : t.offsetY
                }
                _validatePositions() {}
                _addPanelClasses(t) {
                    this._pane && ou(t).forEach(t => {
                        "" !== t && -1 === this._appliedPanelClasses.indexOf(t) && (this._appliedPanelClasses.push(t), this._pane.classList.add(t))
                    })
                }
                _clearPanelClasses() {
                    this._pane && (this._appliedPanelClasses.forEach(t => {
                        this._pane.classList.remove(t)
                    }), this._appliedPanelClasses = [])
                }
                _getOriginRect() {
                    const t = this._origin;
                    if (t instanceof ba) return t.nativeElement.getBoundingClientRect();
                    if (t instanceof Element) return t.getBoundingClientRect();
                    const e = t.width || 0,
                        n = t.height || 0;
                    return {
                        top: t.y,
                        bottom: t.y + n,
                        left: t.x,
                        right: t.x + e,
                        height: n,
                        width: e
                    }
                }
            }

            function $g(t, e) {
                for (let n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
            }

            function Wg(t) {
                if ("number" != typeof t && null != t) {
                    const [e, n] = t.split(qg);
                    return n && "px" !== n ? null : parseFloat(e)
                }
                return t || null
            }

            function Zg(t) {
                return {
                    top: Math.floor(t.top),
                    right: Math.floor(t.right),
                    bottom: Math.floor(t.bottom),
                    left: Math.floor(t.left),
                    width: Math.floor(t.width),
                    height: Math.floor(t.height)
                }
            }
            class Qg {
                constructor(t, e, n, i, s, r, o) {
                    this._preferredPositions = [], this._positionStrategy = new Ug(n, i, s, r, o).withFlexibleDimensions(!1).withPush(!1).withViewportMargin(0), this.withFallbackPosition(t, e), this.onPositionChange = this._positionStrategy.positionChanges
                }
                get positions() {
                    return this._preferredPositions
                }
                attach(t) {
                    this._overlayRef = t, this._positionStrategy.attach(t), this._direction && (t.setDirection(this._direction), this._direction = null)
                }
                dispose() {
                    this._positionStrategy.dispose()
                }
                detach() {
                    this._positionStrategy.detach()
                }
                apply() {
                    this._positionStrategy.apply()
                }
                recalculateLastPosition() {
                    this._positionStrategy.reapplyLastPosition()
                }
                withScrollableContainers(t) {
                    this._positionStrategy.withScrollableContainers(t)
                }
                withFallbackPosition(t, e, n, i) {
                    const s = new Fg(t, e, n, i);
                    return this._preferredPositions.push(s), this._positionStrategy.withPositions(this._preferredPositions), this
                }
                withDirection(t) {
                    return this._overlayRef ? this._overlayRef.setDirection(t) : this._direction = t, this
                }
                withOffsetX(t) {
                    return this._positionStrategy.withDefaultOffsetX(t), this
                }
                withOffsetY(t) {
                    return this._positionStrategy.withDefaultOffsetY(t), this
                }
                withLockedPosition(t) {
                    return this._positionStrategy.withLockedPosition(t), this
                }
                withPositions(t) {
                    return this._preferredPositions = t.slice(), this._positionStrategy.withPositions(this._preferredPositions), this
                }
                setOrigin(t) {
                    return this._positionStrategy.setOrigin(t), this
                }
            }
            const Kg = "cdk-global-overlay-wrapper";
            class Gg {
                constructor() {
                    this._cssPosition = "static", this._topOffset = "", this._bottomOffset = "", this._leftOffset = "", this._rightOffset = "", this._alignItems = "", this._justifyContent = "", this._width = "", this._height = ""
                }
                attach(t) {
                    const e = t.getConfig();
                    this._overlayRef = t, this._width && !e.width && t.updateSize({
                        width: this._width
                    }), this._height && !e.height && t.updateSize({
                        height: this._height
                    }), t.hostElement.classList.add(Kg), this._isDisposed = !1
                }
                top(t = "") {
                    return this._bottomOffset = "", this._topOffset = t, this._alignItems = "flex-start", this
                }
                left(t = "") {
                    return this._rightOffset = "", this._leftOffset = t, this._justifyContent = "flex-start", this
                }
                bottom(t = "") {
                    return this._topOffset = "", this._bottomOffset = t, this._alignItems = "flex-end", this
                }
                right(t = "") {
                    return this._leftOffset = "", this._rightOffset = t, this._justifyContent = "flex-end", this
                }
                width(t = "") {
                    return this._overlayRef ? this._overlayRef.updateSize({
                        width: t
                    }) : this._width = t, this
                }
                height(t = "") {
                    return this._overlayRef ? this._overlayRef.updateSize({
                        height: t
                    }) : this._height = t, this
                }
                centerHorizontally(t = "") {
                    return this.left(t), this._justifyContent = "center", this
                }
                centerVertically(t = "") {
                    return this.top(t), this._alignItems = "center", this
                }
                apply() {
                    if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
                    const t = this._overlayRef.overlayElement.style,
                        e = this._overlayRef.hostElement.style,
                        n = this._overlayRef.getConfig(),
                        {
                            width: i,
                            height: s,
                            maxWidth: r,
                            maxHeight: o
                        } = n,
                        a = !("100%" !== i && "100vw" !== i || r && "100%" !== r && "100vw" !== r),
                        l = !("100%" !== s && "100vh" !== s || o && "100%" !== o && "100vh" !== o);
                    t.position = this._cssPosition, t.marginLeft = a ? "0" : this._leftOffset, t.marginTop = l ? "0" : this._topOffset, t.marginBottom = this._bottomOffset, t.marginRight = this._rightOffset, a ? e.justifyContent = "flex-start" : "center" === this._justifyContent ? e.justifyContent = "center" : "rtl" === this._overlayRef.getConfig().direction ? "flex-start" === this._justifyContent ? e.justifyContent = "flex-end" : "flex-end" === this._justifyContent && (e.justifyContent = "flex-start") : e.justifyContent = this._justifyContent, e.alignItems = l ? "flex-start" : this._alignItems
                }
                dispose() {
                    if (this._isDisposed || !this._overlayRef) return;
                    const t = this._overlayRef.overlayElement.style,
                        e = this._overlayRef.hostElement,
                        n = e.style;
                    e.classList.remove(Kg), n.justifyContent = n.alignItems = t.marginTop = t.marginBottom = t.marginLeft = t.marginRight = t.position = "", this._overlayRef = null, this._isDisposed = !0
                }
            }
            let Yg = (() => {
                    class t {
                        constructor(t, e, n, i) {
                            this._viewportRuler = t, this._document = e, this._platform = n, this._overlayContainer = i
                        }
                        global() {
                            return new Gg
                        }
                        connectedTo(t, e, n) {
                            return new Qg(e, n, t, this._viewportRuler, this._document, this._platform, this._overlayContainer)
                        }
                        flexibleConnectedTo(t) {
                            return new Ug(t, this._viewportRuler, this._document, this._platform, this._overlayContainer)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(ld), di(Pc), di(uu), di(Bg))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(ld), di(Pc), di(uu), di(Bg))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                Xg = 0,
                Jg = (() => {
                    class t {
                        constructor(t, e, n, i, s, r, o, a, l, c, h) {
                            this.scrollStrategies = t, this._overlayContainer = e, this._componentFactoryResolver = n, this._positionBuilder = i, this._keyboardDispatcher = s, this._injector = r, this._ngZone = o, this._document = a, this._directionality = l, this._location = c, this._outsideClickDispatcher = h
                        }
                        create(t) {
                            const e = this._createHostElement(),
                                n = this._createPaneElement(e),
                                i = this._createPortalOutlet(n),
                                s = new Pg(t);
                            return s.direction = s.direction || this._directionality.value, new Hg(i, e, n, s, this._ngZone, this._keyboardDispatcher, this._document, this._location, this._outsideClickDispatcher)
                        }
                        position() {
                            return this._positionBuilder
                        }
                        _createPaneElement(t) {
                            const e = this._document.createElement("div");
                            return e.id = "cdk-overlay-" + Xg++, e.classList.add("cdk-overlay-pane"), t.appendChild(e), e
                        }
                        _createHostElement() {
                            const t = this._document.createElement("div");
                            return this._overlayContainer.getContainerElement().appendChild(t), t
                        }
                        _createPortalOutlet(t) {
                            return this._appRef || (this._appRef = this._injector.get(Sc)), new Jd(t, this._componentFactoryResolver, this._appRef, this._injector, this._document)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Og), di(Bg), di(ma), di(Yg), di(Mg), di(eo), di(rc), di(Pc), di(rd), di(Wc), di(Vg))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })();
            const t_ = {
                provide: new Un("cdk-connected-overlay-scroll-strategy"),
                deps: [Jg],
                useFactory: function(t) {
                    return () => t.scrollStrategies.reposition()
                }
            };
            let e_ = (() => {
                class t {}
                return t.\u0275mod = qt({
                    type: t
                }), t.\u0275inj = ct({
                    factory: function(e) {
                        return new(e || t)
                    },
                    providers: [Jg, t_],
                    imports: [
                        [od, ep, hd], hd
                    ]
                }), t
            })();

            function n_(...t) {
                if (1 === t.length) {
                    const e = t[0];
                    if (l(e)) return i_(e, null);
                    if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
                        const t = Object.keys(e);
                        return i_(t.map(t => e[t]), t)
                    }
                }
                if ("function" == typeof t[t.length - 1]) {
                    const e = t.pop();
                    return i_(t = 1 === t.length && l(t[0]) ? t[0] : t, null).pipe(k(t => e(...t)))
                }
                return i_(t, null)
            }

            function i_(t, e) {
                return new y(n => {
                    const i = t.length;
                    if (0 === i) return void n.complete();
                    const s = new Array(i);
                    let r = 0,
                        o = 0;
                    for (let a = 0; a < i; a++) {
                        const l = N(t[a]);
                        let c = !1;
                        n.add(l.subscribe({
                            next: t => {
                                c || (c = !0, o++), s[a] = t
                            },
                            error: t => n.error(t),
                            complete: () => {
                                r++, r !== i && c || (o === i && n.next(e ? e.reduce((t, e, n) => (t[e] = s[n], t), {}) : s), n.complete())
                            }
                        }))
                    }
                })
            }
            const s_ = new Un("NgValueAccessor"),
                r_ = {
                    provide: s_,
                    useExisting: rt(() => o_),
                    multi: !0
                };
            let o_ = (() => {
                class t {
                    constructor(t, e) {
                        this._renderer = t, this._elementRef = e, this.onChange = t => {}, this.onTouched = () => {}
                    }
                    writeValue(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "checked", t)
                    }
                    registerOnChange(t) {
                        this.onChange = t
                    }
                    registerOnTouched(t) {
                        this.onTouched = t
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(wa), _o(ba))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["input", "type", "checkbox", "formControlName", ""],
                        ["input", "type", "checkbox", "formControl", ""],
                        ["input", "type", "checkbox", "ngModel", ""]
                    ],
                    hostBindings: function(t, e) {
                        1 & t && To("change", function(t) {
                            return e.onChange(t.target.checked)
                        })("blur", function() {
                            return e.onTouched()
                        })
                    },
                    features: [da([r_])]
                }), t
            })();
            const a_ = {
                    provide: s_,
                    useExisting: rt(() => c_),
                    multi: !0
                },
                l_ = new Un("CompositionEventMode");
            let c_ = (() => {
                class t {
                    constructor(t, e, n) {
                        this._renderer = t, this._elementRef = e, this._compositionMode = n, this.onChange = t => {}, this.onTouched = () => {}, this._composing = !1, null == this._compositionMode && (this._compositionMode = ! function() {
                            const t = Oc() ? Oc().getUserAgent() : "";
                            return /android (\d+)/.test(t.toLowerCase())
                        }())
                    }
                    writeValue(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "value", null == t ? "" : t)
                    }
                    registerOnChange(t) {
                        this.onChange = t
                    }
                    registerOnTouched(t) {
                        this.onTouched = t
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                    }
                    _handleInput(t) {
                        (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(t)
                    }
                    _compositionStart() {
                        this._composing = !0
                    }
                    _compositionEnd(t) {
                        this._composing = !1, this._compositionMode && this.onChange(t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(wa), _o(ba), _o(l_, 8))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["input", "formControlName", "", 3, "type", "checkbox"],
                        ["textarea", "formControlName", ""],
                        ["input", "formControl", "", 3, "type", "checkbox"],
                        ["textarea", "formControl", ""],
                        ["input", "ngModel", "", 3, "type", "checkbox"],
                        ["textarea", "ngModel", ""],
                        ["", "ngDefaultControl", ""]
                    ],
                    hostBindings: function(t, e) {
                        1 & t && To("input", function(t) {
                            return e._handleInput(t.target.value)
                        })("blur", function() {
                            return e.onTouched()
                        })("compositionstart", function() {
                            return e._compositionStart()
                        })("compositionend", function(t) {
                            return e._compositionEnd(t.target.value)
                        })
                    },
                    features: [da([a_])]
                }), t
            })();

            function h_(t) {
                return null == t || 0 === t.length
            }

            function u_(t) {
                return null != t && "number" == typeof t.length
            }
            const d_ = new Un("NgValidators"),
                p_ = new Un("NgAsyncValidators"),
                f_ = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            class m_ {
                static min(t) {
                    return e => {
                        if (h_(e.value) || h_(t)) return null;
                        const n = parseFloat(e.value);
                        return !isNaN(n) && n < t ? {
                            min: {
                                min: t,
                                actual: e.value
                            }
                        } : null
                    }
                }
                static max(t) {
                    return e => {
                        if (h_(e.value) || h_(t)) return null;
                        const n = parseFloat(e.value);
                        return !isNaN(n) && n > t ? {
                            max: {
                                max: t,
                                actual: e.value
                            }
                        } : null
                    }
                }
                static required(t) {
                    return h_(t.value) ? {
                        required: !0
                    } : null
                }
                static requiredTrue(t) {
                    return !0 === t.value ? null : {
                        required: !0
                    }
                }
                static email(t) {
                    return h_(t.value) || f_.test(t.value) ? null : {
                        email: !0
                    }
                }
                static minLength(t) {
                    return e => h_(e.value) || !u_(e.value) ? null : e.value.length < t ? {
                        minlength: {
                            requiredLength: t,
                            actualLength: e.value.length
                        }
                    } : null
                }
                static maxLength(t) {
                    return e => u_(e.value) && e.value.length > t ? {
                        maxlength: {
                            requiredLength: t,
                            actualLength: e.value.length
                        }
                    } : null
                }
                static pattern(t) {
                    if (!t) return m_.nullValidator;
                    let e, n;
                    return "string" == typeof t ? (n = "", "^" !== t.charAt(0) && (n += "^"), n += t, "$" !== t.charAt(t.length - 1) && (n += "$"), e = new RegExp(n)) : (n = t.toString(), e = t), t => {
                        if (h_(t.value)) return null;
                        const i = t.value;
                        return e.test(i) ? null : {
                            pattern: {
                                requiredPattern: n,
                                actualValue: i
                            }
                        }
                    }
                }
                static nullValidator(t) {
                    return null
                }
                static compose(t) {
                    if (!t) return null;
                    const e = t.filter(g_);
                    return 0 == e.length ? null : function(t) {
                        return y_(b_(t, e))
                    }
                }
                static composeAsync(t) {
                    if (!t) return null;
                    const e = t.filter(g_);
                    return 0 == e.length ? null : function(t) {
                        return n_(b_(t, e).map(__)).pipe(k(y_))
                    }
                }
            }

            function g_(t) {
                return null != t
            }

            function __(t) {
                const e = ko(t) ? N(t) : t;
                return e
            }

            function y_(t) {
                let e = {};
                return t.forEach(t => {
                    e = null != t ? Object.assign(Object.assign({}, e), t) : e
                }), 0 === Object.keys(e).length ? null : e
            }

            function b_(t, e) {
                return e.map(e => e(t))
            }

            function v_(t) {
                return t.map(t => function(t) {
                    return !t.validate
                }(t) ? t : e => t.validate(e))
            }

            function w_(t) {
                return null != t ? m_.compose(v_(t)) : null
            }

            function C_(t) {
                return null != t ? m_.composeAsync(v_(t)) : null
            }

            function x_(t, e) {
                return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e]
            }

            function E_(t) {
                return t._rawValidators
            }

            function S_(t) {
                return t._rawAsyncValidators
            }
            let k_ = (() => {
                    class t {
                        constructor() {
                            this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
                        }
                        get value() {
                            return this.control ? this.control.value : null
                        }
                        get valid() {
                            return this.control ? this.control.valid : null
                        }
                        get invalid() {
                            return this.control ? this.control.invalid : null
                        }
                        get pending() {
                            return this.control ? this.control.pending : null
                        }
                        get disabled() {
                            return this.control ? this.control.disabled : null
                        }
                        get enabled() {
                            return this.control ? this.control.enabled : null
                        }
                        get errors() {
                            return this.control ? this.control.errors : null
                        }
                        get pristine() {
                            return this.control ? this.control.pristine : null
                        }
                        get dirty() {
                            return this.control ? this.control.dirty : null
                        }
                        get touched() {
                            return this.control ? this.control.touched : null
                        }
                        get status() {
                            return this.control ? this.control.status : null
                        }
                        get untouched() {
                            return this.control ? this.control.untouched : null
                        }
                        get statusChanges() {
                            return this.control ? this.control.statusChanges : null
                        }
                        get valueChanges() {
                            return this.control ? this.control.valueChanges : null
                        }
                        get path() {
                            return null
                        }
                        _setValidators(t) {
                            this._rawValidators = t || [], this._composedValidatorFn = w_(this._rawValidators)
                        }
                        _setAsyncValidators(t) {
                            this._rawAsyncValidators = t || [], this._composedAsyncValidatorFn = C_(this._rawAsyncValidators)
                        }
                        get validator() {
                            return this._composedValidatorFn || null
                        }
                        get asyncValidator() {
                            return this._composedAsyncValidatorFn || null
                        }
                        _registerOnDestroy(t) {
                            this._onDestroyCallbacks.push(t)
                        }
                        _invokeOnDestroyCallbacks() {
                            this._onDestroyCallbacks.forEach(t => t()), this._onDestroyCallbacks = []
                        }
                        reset(t) {
                            this.control && this.control.reset(t)
                        }
                        hasError(t, e) {
                            return !!this.control && this.control.hasError(t, e)
                        }
                        getError(t, e) {
                            return this.control ? this.control.getError(t, e) : null
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275dir = $t({
                        type: t
                    }), t
                })(),
                T_ = (() => {
                    class t extends k_ {
                        get formDirective() {
                            return null
                        }
                        get path() {
                            return null
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return A_(e || t)
                    }, t.\u0275dir = $t({
                        type: t,
                        features: [io]
                    }), t
                })();
            const A_ = Bn(T_);
            class D_ extends k_ {
                constructor() {
                    super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
                }
            }
            let R_ = (() => {
                class t extends class {
                    constructor(t) {
                        this._cd = t
                    }
                    get ngClassUntouched() {
                        var t, e, n;
                        return null !== (n = null === (e = null === (t = this._cd) || void 0 === t ? void 0 : t.control) || void 0 === e ? void 0 : e.untouched) && void 0 !== n && n
                    }
                    get ngClassTouched() {
                        var t, e, n;
                        return null !== (n = null === (e = null === (t = this._cd) || void 0 === t ? void 0 : t.control) || void 0 === e ? void 0 : e.touched) && void 0 !== n && n
                    }
                    get ngClassPristine() {
                        var t, e, n;
                        return null !== (n = null === (e = null === (t = this._cd) || void 0 === t ? void 0 : t.control) || void 0 === e ? void 0 : e.pristine) && void 0 !== n && n
                    }
                    get ngClassDirty() {
                        var t, e, n;
                        return null !== (n = null === (e = null === (t = this._cd) || void 0 === t ? void 0 : t.control) || void 0 === e ? void 0 : e.dirty) && void 0 !== n && n
                    }
                    get ngClassValid() {
                        var t, e, n;
                        return null !== (n = null === (e = null === (t = this._cd) || void 0 === t ? void 0 : t.control) || void 0 === e ? void 0 : e.valid) && void 0 !== n && n
                    }
                    get ngClassInvalid() {
                        var t, e, n;
                        return null !== (n = null === (e = null === (t = this._cd) || void 0 === t ? void 0 : t.control) || void 0 === e ? void 0 : e.invalid) && void 0 !== n && n
                    }
                    get ngClassPending() {
                        var t, e, n;
                        return null !== (n = null === (e = null === (t = this._cd) || void 0 === t ? void 0 : t.control) || void 0 === e ? void 0 : e.pending) && void 0 !== n && n
                    }
                } {
                    constructor(t) {
                        super(t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(D_, 2))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["", "formControlName", ""],
                        ["", "ngModel", ""],
                        ["", "formControl", ""]
                    ],
                    hostVars: 14,
                    hostBindings: function(t, e) {
                        2 & t && Bo("ng-untouched", e.ngClassUntouched)("ng-touched", e.ngClassTouched)("ng-pristine", e.ngClassPristine)("ng-dirty", e.ngClassDirty)("ng-valid", e.ngClassValid)("ng-invalid", e.ngClassInvalid)("ng-pending", e.ngClassPending)
                    },
                    features: [io]
                }), t
            })();
            const I_ = {
                provide: s_,
                useExisting: rt(() => O_),
                multi: !0
            };
            let O_ = (() => {
                class t {
                    constructor(t, e) {
                        this._renderer = t, this._elementRef = e, this.onChange = t => {}, this.onTouched = () => {}
                    }
                    writeValue(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "value", null == t ? "" : t)
                    }
                    registerOnChange(t) {
                        this.onChange = e => {
                            t("" == e ? null : parseFloat(e))
                        }
                    }
                    registerOnTouched(t) {
                        this.onTouched = t
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(wa), _o(ba))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["input", "type", "number", "formControlName", ""],
                        ["input", "type", "number", "formControl", ""],
                        ["input", "type", "number", "ngModel", ""]
                    ],
                    hostBindings: function(t, e) {
                        1 & t && To("input", function(t) {
                            return e.onChange(t.target.value)
                        })("blur", function() {
                            return e.onTouched()
                        })
                    },
                    features: [da([I_])]
                }), t
            })();
            const P_ = {
                provide: s_,
                useExisting: rt(() => L_),
                multi: !0
            };
            let F_ = (() => {
                    class t {
                        constructor() {
                            this._accessors = []
                        }
                        add(t, e) {
                            this._accessors.push([t, e])
                        }
                        remove(t) {
                            for (let e = this._accessors.length - 1; e >= 0; --e)
                                if (this._accessors[e][1] === t) return void this._accessors.splice(e, 1)
                        }
                        select(t) {
                            this._accessors.forEach(e => {
                                this._isSameGroup(e, t) && e[1] !== t && e[1].fireUncheck(t.value)
                            })
                        }
                        _isSameGroup(t, e) {
                            return !!t[0].control && t[0]._parent === e._control._parent && t[1].name === e.name
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                L_ = (() => {
                    class t {
                        constructor(t, e, n, i) {
                            this._renderer = t, this._elementRef = e, this._registry = n, this._injector = i, this.onChange = () => {}, this.onTouched = () => {}
                        }
                        ngOnInit() {
                            this._control = this._injector.get(D_), this._checkName(), this._registry.add(this._control, this)
                        }
                        ngOnDestroy() {
                            this._registry.remove(this)
                        }
                        writeValue(t) {
                            this._state = t === this.value, this._renderer.setProperty(this._elementRef.nativeElement, "checked", this._state)
                        }
                        registerOnChange(t) {
                            this._fn = t, this.onChange = () => {
                                t(this.value), this._registry.select(this)
                            }
                        }
                        fireUncheck(t) {
                            this.writeValue(t)
                        }
                        registerOnTouched(t) {
                            this.onTouched = t
                        }
                        setDisabledState(t) {
                            this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                        }
                        _checkName() {
                            !this.name && this.formControlName && (this.name = this.formControlName)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(wa), _o(ba), _o(F_), _o(eo))
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["input", "type", "radio", "formControlName", ""],
                            ["input", "type", "radio", "formControl", ""],
                            ["input", "type", "radio", "ngModel", ""]
                        ],
                        hostBindings: function(t, e) {
                            1 & t && To("change", function() {
                                return e.onChange()
                            })("blur", function() {
                                return e.onTouched()
                            })
                        },
                        inputs: {
                            name: "name",
                            formControlName: "formControlName",
                            value: "value"
                        },
                        features: [da([P_])]
                    }), t
                })();
            const N_ = {
                provide: s_,
                useExisting: rt(() => M_),
                multi: !0
            };
            let M_ = (() => {
                class t {
                    constructor(t, e) {
                        this._renderer = t, this._elementRef = e, this.onChange = t => {}, this.onTouched = () => {}
                    }
                    writeValue(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "value", parseFloat(t))
                    }
                    registerOnChange(t) {
                        this.onChange = e => {
                            t("" == e ? null : parseFloat(e))
                        }
                    }
                    registerOnTouched(t) {
                        this.onTouched = t
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(wa), _o(ba))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["input", "type", "range", "formControlName", ""],
                        ["input", "type", "range", "formControl", ""],
                        ["input", "type", "range", "ngModel", ""]
                    ],
                    hostBindings: function(t, e) {
                        1 & t && To("change", function(t) {
                            return e.onChange(t.target.value)
                        })("input", function(t) {
                            return e.onChange(t.target.value)
                        })("blur", function() {
                            return e.onTouched()
                        })
                    },
                    features: [da([N_])]
                }), t
            })();
            const V_ = {
                provide: s_,
                useExisting: rt(() => j_),
                multi: !0
            };
            let j_ = (() => {
                class t {
                    constructor(t, e) {
                        this._renderer = t, this._elementRef = e, this._optionMap = new Map, this._idCounter = 0, this.onChange = t => {}, this.onTouched = () => {}, this._compareWith = Object.is
                    }
                    set compareWith(t) {
                        this._compareWith = t
                    }
                    writeValue(t) {
                        this.value = t;
                        const e = this._getOptionId(t);
                        null == e && this._renderer.setProperty(this._elementRef.nativeElement, "selectedIndex", -1);
                        const n = function(t, e) {
                            return null == t ? "" + e : (e && "object" == typeof e && (e = "Object"), `${t}: ${e}`.slice(0, 50))
                        }(e, t);
                        this._renderer.setProperty(this._elementRef.nativeElement, "value", n)
                    }
                    registerOnChange(t) {
                        this.onChange = e => {
                            this.value = this._getOptionValue(e), t(this.value)
                        }
                    }
                    registerOnTouched(t) {
                        this.onTouched = t
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                    }
                    _registerOption() {
                        return (this._idCounter++).toString()
                    }
                    _getOptionId(t) {
                        for (const e of Array.from(this._optionMap.keys()))
                            if (this._compareWith(this._optionMap.get(e), t)) return e;
                        return null
                    }
                    _getOptionValue(t) {
                        const e = function(t) {
                            return t.split(":")[0]
                        }(t);
                        return this._optionMap.has(e) ? this._optionMap.get(e) : t
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(wa), _o(ba))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["select", "formControlName", "", 3, "multiple", ""],
                        ["select", "formControl", "", 3, "multiple", ""],
                        ["select", "ngModel", "", 3, "multiple", ""]
                    ],
                    hostBindings: function(t, e) {
                        1 & t && To("change", function(t) {
                            return e.onChange(t.target.value)
                        })("blur", function() {
                            return e.onTouched()
                        })
                    },
                    inputs: {
                        compareWith: "compareWith"
                    },
                    features: [da([V_])]
                }), t
            })();
            const B_ = {
                provide: s_,
                useExisting: rt(() => H_),
                multi: !0
            };
            let H_ = (() => {
                class t {
                    constructor(t, e) {
                        this._renderer = t, this._elementRef = e, this._optionMap = new Map, this._idCounter = 0, this.onChange = t => {}, this.onTouched = () => {}, this._compareWith = Object.is
                    }
                    set compareWith(t) {
                        this._compareWith = t
                    }
                    writeValue(t) {
                        let e;
                        if (this.value = t, Array.isArray(t)) {
                            const n = t.map(t => this._getOptionId(t));
                            e = (t, e) => {
                                t._setSelected(n.indexOf(e.toString()) > -1)
                            }
                        } else e = (t, e) => {
                            t._setSelected(!1)
                        };
                        this._optionMap.forEach(e)
                    }
                    registerOnChange(t) {
                        this.onChange = e => {
                            const n = [];
                            if (void 0 !== e.selectedOptions) {
                                const t = e.selectedOptions;
                                for (let e = 0; e < t.length; e++) {
                                    const i = t.item(e),
                                        s = this._getOptionValue(i.value);
                                    n.push(s)
                                }
                            } else {
                                const t = e.options;
                                for (let e = 0; e < t.length; e++) {
                                    const i = t.item(e);
                                    if (i.selected) {
                                        const t = this._getOptionValue(i.value);
                                        n.push(t)
                                    }
                                }
                            }
                            this.value = n, t(n)
                        }
                    }
                    registerOnTouched(t) {
                        this.onTouched = t
                    }
                    setDisabledState(t) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                    }
                    _registerOption(t) {
                        const e = (this._idCounter++).toString();
                        return this._optionMap.set(e, t), e
                    }
                    _getOptionId(t) {
                        for (const e of Array.from(this._optionMap.keys()))
                            if (this._compareWith(this._optionMap.get(e)._value, t)) return e;
                        return null
                    }
                    _getOptionValue(t) {
                        const e = function(t) {
                            return t.split(":")[0]
                        }(t);
                        return this._optionMap.has(e) ? this._optionMap.get(e)._value : t
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(wa), _o(ba))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["select", "multiple", "", "formControlName", ""],
                        ["select", "multiple", "", "formControl", ""],
                        ["select", "multiple", "", "ngModel", ""]
                    ],
                    hostBindings: function(t, e) {
                        1 & t && To("change", function(t) {
                            return e.onChange(t.target)
                        })("blur", function() {
                            return e.onTouched()
                        })
                    },
                    inputs: {
                        compareWith: "compareWith"
                    },
                    features: [da([B_])]
                }), t
            })();

            function z_(t, e) {
                U_(t, e, !0), e.valueAccessor.writeValue(t.value),
                    function(t, e) {
                        e.valueAccessor.registerOnChange(n => {
                            t._pendingValue = n, t._pendingChange = !0, t._pendingDirty = !0, "change" === t.updateOn && W_(t, e)
                        })
                    }(t, e),
                    function(t, e) {
                        const n = (t, n) => {
                            e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t)
                        };
                        t.registerOnChange(n), e._registerOnDestroy(() => {
                            t._unregisterOnChange(n)
                        })
                    }(t, e),
                    function(t, e) {
                        e.valueAccessor.registerOnTouched(() => {
                            t._pendingTouched = !0, "blur" === t.updateOn && t._pendingChange && W_(t, e), "submit" !== t.updateOn && t.markAsTouched()
                        })
                    }(t, e),
                    function(t, e) {
                        if (e.valueAccessor.setDisabledState) {
                            const n = t => {
                                e.valueAccessor.setDisabledState(t)
                            };
                            t.registerOnDisabledChange(n), e._registerOnDestroy(() => {
                                t._unregisterOnDisabledChange(n)
                            })
                        }
                    }(t, e)
            }

            function q_(t, e) {
                t.forEach(t => {
                    t.registerOnValidatorChange && t.registerOnValidatorChange(e)
                })
            }

            function U_(t, e, n) {
                const i = E_(t);
                null !== e.validator ? t.setValidators(x_(i, e.validator)) : "function" == typeof i && t.setValidators([i]);
                const s = S_(t);
                if (null !== e.asyncValidator ? t.setAsyncValidators(x_(s, e.asyncValidator)) : "function" == typeof s && t.setAsyncValidators([s]), n) {
                    const n = () => t.updateValueAndValidity();
                    q_(e._rawValidators, n), q_(e._rawAsyncValidators, n)
                }
            }

            function $_(t, e, n) {
                if (null !== t) {
                    if (null !== e.validator) {
                        const n = E_(t);
                        Array.isArray(n) && n.length > 0 && t.setValidators(n.filter(t => t !== e.validator))
                    }
                    if (null !== e.asyncValidator) {
                        const n = S_(t);
                        Array.isArray(n) && n.length > 0 && t.setAsyncValidators(n.filter(t => t !== e.asyncValidator))
                    }
                }
                if (n) {
                    const t = () => {};
                    q_(e._rawValidators, t), q_(e._rawAsyncValidators, t)
                }
            }

            function W_(t, e) {
                t._pendingDirty && t.markAsDirty(), t.setValue(t._pendingValue, {
                    emitModelToViewChange: !1
                }), e.viewToModelUpdate(t._pendingValue), t._pendingChange = !1
            }

            function Z_(t, e) {
                U_(t, e, !1)
            }
            const Q_ = [o_, M_, O_, j_, H_, L_];

            function K_(t, e) {
                t._syncPendingControls(), e.forEach(t => {
                    const e = t.control;
                    "submit" === e.updateOn && e._pendingChange && (t.viewToModelUpdate(e._pendingValue), e._pendingChange = !1)
                })
            }

            function G_(t, e) {
                const n = t.indexOf(e);
                n > -1 && t.splice(n, 1)
            }
            const Y_ = "VALID",
                X_ = "INVALID",
                J_ = "PENDING",
                ty = "DISABLED";

            function ey(t) {
                return (ry(t) ? t.validators : t) || null
            }

            function ny(t) {
                return Array.isArray(t) ? w_(t) : t || null
            }

            function iy(t, e) {
                return (ry(e) ? e.asyncValidators : t) || null
            }

            function sy(t) {
                return Array.isArray(t) ? C_(t) : t || null
            }

            function ry(t) {
                return null != t && !Array.isArray(t) && "object" == typeof t
            }
            class oy {
                constructor(t, e) {
                    this._hasOwnPendingAsyncValidator = !1, this._onCollectionChange = () => {}, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._rawValidators = t, this._rawAsyncValidators = e, this._composedValidatorFn = ny(this._rawValidators), this._composedAsyncValidatorFn = sy(this._rawAsyncValidators)
                }
                get validator() {
                    return this._composedValidatorFn
                }
                set validator(t) {
                    this._rawValidators = this._composedValidatorFn = t
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn
                }
                set asyncValidator(t) {
                    this._rawAsyncValidators = this._composedAsyncValidatorFn = t
                }
                get parent() {
                    return this._parent
                }
                get valid() {
                    return this.status === Y_
                }
                get invalid() {
                    return this.status === X_
                }
                get pending() {
                    return this.status == J_
                }
                get disabled() {
                    return this.status === ty
                }
                get enabled() {
                    return this.status !== ty
                }
                get dirty() {
                    return !this.pristine
                }
                get untouched() {
                    return !this.touched
                }
                get updateOn() {
                    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
                }
                setValidators(t) {
                    this._rawValidators = t, this._composedValidatorFn = ny(t)
                }
                setAsyncValidators(t) {
                    this._rawAsyncValidators = t, this._composedAsyncValidatorFn = sy(t)
                }
                clearValidators() {
                    this.validator = null
                }
                clearAsyncValidators() {
                    this.asyncValidator = null
                }
                markAsTouched(t = {}) {
                    this.touched = !0, this._parent && !t.onlySelf && this._parent.markAsTouched(t)
                }
                markAllAsTouched() {
                    this.markAsTouched({
                        onlySelf: !0
                    }), this._forEachChild(t => t.markAllAsTouched())
                }
                markAsUntouched(t = {}) {
                    this.touched = !1, this._pendingTouched = !1, this._forEachChild(t => {
                        t.markAsUntouched({
                            onlySelf: !0
                        })
                    }), this._parent && !t.onlySelf && this._parent._updateTouched(t)
                }
                markAsDirty(t = {}) {
                    this.pristine = !1, this._parent && !t.onlySelf && this._parent.markAsDirty(t)
                }
                markAsPristine(t = {}) {
                    this.pristine = !0, this._pendingDirty = !1, this._forEachChild(t => {
                        t.markAsPristine({
                            onlySelf: !0
                        })
                    }), this._parent && !t.onlySelf && this._parent._updatePristine(t)
                }
                markAsPending(t = {}) {
                    this.status = J_, !1 !== t.emitEvent && this.statusChanges.emit(this.status), this._parent && !t.onlySelf && this._parent.markAsPending(t)
                }
                disable(t = {}) {
                    const e = this._parentMarkedDirty(t.onlySelf);
                    this.status = ty, this.errors = null, this._forEachChild(e => {
                        e.disable(Object.assign(Object.assign({}, t), {
                            onlySelf: !0
                        }))
                    }), this._updateValue(), !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors(Object.assign(Object.assign({}, t), {
                        skipPristineCheck: e
                    })), this._onDisabledChange.forEach(t => t(!0))
                }
                enable(t = {}) {
                    const e = this._parentMarkedDirty(t.onlySelf);
                    this.status = Y_, this._forEachChild(e => {
                        e.enable(Object.assign(Object.assign({}, t), {
                            onlySelf: !0
                        }))
                    }), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    }), this._updateAncestors(Object.assign(Object.assign({}, t), {
                        skipPristineCheck: e
                    })), this._onDisabledChange.forEach(t => t(!1))
                }
                _updateAncestors(t) {
                    this._parent && !t.onlySelf && (this._parent.updateValueAndValidity(t), t.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
                }
                setParent(t) {
                    this._parent = t
                }
                updateValueAndValidity(t = {}) {
                    this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), this.status !== Y_ && this.status !== J_ || this._runAsyncValidator(t.emitEvent)), !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t)
                }
                _updateTreeValidity(t = {
                    emitEvent: !0
                }) {
                    this._forEachChild(e => e._updateTreeValidity(t)), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                _setInitialStatus() {
                    this.status = this._allControlsDisabled() ? ty : Y_
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null
                }
                _runAsyncValidator(t) {
                    if (this.asyncValidator) {
                        this.status = J_, this._hasOwnPendingAsyncValidator = !0;
                        const e = __(this.asyncValidator(this));
                        this._asyncValidationSubscription = e.subscribe(e => {
                            this._hasOwnPendingAsyncValidator = !1, this.setErrors(e, {
                                emitEvent: t
                            })
                        })
                    }
                }
                _cancelExistingSubscription() {
                    this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
                }
                setErrors(t, e = {}) {
                    this.errors = t, this._updateControlsErrors(!1 !== e.emitEvent)
                }
                get(t) {
                    return function(t, e, n) {
                        if (null == e) return null;
                        if (Array.isArray(e) || (e = e.split(".")), Array.isArray(e) && 0 === e.length) return null;
                        let i = t;
                        return e.forEach(t => {
                            i = i instanceof ly ? i.controls.hasOwnProperty(t) ? i.controls[t] : null : i instanceof cy && i.at(t) || null
                        }), i
                    }(this, t)
                }
                getError(t, e) {
                    const n = e ? this.get(e) : this;
                    return n && n.errors ? n.errors[t] : null
                }
                hasError(t, e) {
                    return !!this.getError(t, e)
                }
                get root() {
                    let t = this;
                    for (; t._parent;) t = t._parent;
                    return t
                }
                _updateControlsErrors(t) {
                    this.status = this._calculateStatus(), t && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(t)
                }
                _initObservables() {
                    this.valueChanges = new ml, this.statusChanges = new ml
                }
                _calculateStatus() {
                    return this._allControlsDisabled() ? ty : this.errors ? X_ : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(J_) ? J_ : this._anyControlsHaveStatus(X_) ? X_ : Y_
                }
                _anyControlsHaveStatus(t) {
                    return this._anyControls(e => e.status === t)
                }
                _anyControlsDirty() {
                    return this._anyControls(t => t.dirty)
                }
                _anyControlsTouched() {
                    return this._anyControls(t => t.touched)
                }
                _updatePristine(t = {}) {
                    this.pristine = !this._anyControlsDirty(), this._parent && !t.onlySelf && this._parent._updatePristine(t)
                }
                _updateTouched(t = {}) {
                    this.touched = this._anyControlsTouched(), this._parent && !t.onlySelf && this._parent._updateTouched(t)
                }
                _isBoxedValue(t) {
                    return "object" == typeof t && null !== t && 2 === Object.keys(t).length && "value" in t && "disabled" in t
                }
                _registerOnCollectionChange(t) {
                    this._onCollectionChange = t
                }
                _setUpdateStrategy(t) {
                    ry(t) && null != t.updateOn && (this._updateOn = t.updateOn)
                }
                _parentMarkedDirty(t) {
                    return !t && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
                }
            }
            class ay extends oy {
                constructor(t = null, e, n) {
                    super(ey(e), iy(n, e)), this._onChange = [], this._applyFormState(t), this._setUpdateStrategy(e), this._initObservables(), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!n
                    })
                }
                setValue(t, e = {}) {
                    this.value = this._pendingValue = t, this._onChange.length && !1 !== e.emitModelToViewChange && this._onChange.forEach(t => t(this.value, !1 !== e.emitViewToModelChange)), this.updateValueAndValidity(e)
                }
                patchValue(t, e = {}) {
                    this.setValue(t, e)
                }
                reset(t = null, e = {}) {
                    this._applyFormState(t), this.markAsPristine(e), this.markAsUntouched(e), this.setValue(this.value, e), this._pendingChange = !1
                }
                _updateValue() {}
                _anyControls(t) {
                    return !1
                }
                _allControlsDisabled() {
                    return this.disabled
                }
                registerOnChange(t) {
                    this._onChange.push(t)
                }
                _unregisterOnChange(t) {
                    G_(this._onChange, t)
                }
                registerOnDisabledChange(t) {
                    this._onDisabledChange.push(t)
                }
                _unregisterOnDisabledChange(t) {
                    G_(this._onDisabledChange, t)
                }
                _forEachChild(t) {}
                _syncPendingControls() {
                    return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                        onlySelf: !0,
                        emitModelToViewChange: !1
                    }), 0))
                }
                _applyFormState(t) {
                    this._isBoxedValue(t) ? (this.value = this._pendingValue = t.value, t.disabled ? this.disable({
                        onlySelf: !0,
                        emitEvent: !1
                    }) : this.enable({
                        onlySelf: !0,
                        emitEvent: !1
                    })) : this.value = this._pendingValue = t
                }
            }
            class ly extends oy {
                constructor(t, e, n) {
                    super(ey(e), iy(n, e)), this.controls = t, this._initObservables(), this._setUpdateStrategy(e), this._setUpControls(), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!n
                    })
                }
                registerControl(t, e) {
                    return this.controls[t] ? this.controls[t] : (this.controls[t] = e, e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange), e)
                }
                addControl(t, e) {
                    this.registerControl(t, e), this.updateValueAndValidity(), this._onCollectionChange()
                }
                removeControl(t) {
                    this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), delete this.controls[t], this.updateValueAndValidity(), this._onCollectionChange()
                }
                setControl(t, e) {
                    this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), delete this.controls[t], e && this.registerControl(t, e), this.updateValueAndValidity(), this._onCollectionChange()
                }
                contains(t) {
                    return this.controls.hasOwnProperty(t) && this.controls[t].enabled
                }
                setValue(t, e = {}) {
                    this._checkAllValuesPresent(t), Object.keys(t).forEach(n => {
                        this._throwIfControlMissing(n), this.controls[n].setValue(t[n], {
                            onlySelf: !0,
                            emitEvent: e.emitEvent
                        })
                    }), this.updateValueAndValidity(e)
                }
                patchValue(t, e = {}) {
                    Object.keys(t).forEach(n => {
                        this.controls[n] && this.controls[n].patchValue(t[n], {
                            onlySelf: !0,
                            emitEvent: e.emitEvent
                        })
                    }), this.updateValueAndValidity(e)
                }
                reset(t = {}, e = {}) {
                    this._forEachChild((n, i) => {
                        n.reset(t[i], {
                            onlySelf: !0,
                            emitEvent: e.emitEvent
                        })
                    }), this._updatePristine(e), this._updateTouched(e), this.updateValueAndValidity(e)
                }
                getRawValue() {
                    return this._reduceChildren({}, (t, e, n) => (t[n] = e instanceof ay ? e.value : e.getRawValue(), t))
                }
                _syncPendingControls() {
                    let t = this._reduceChildren(!1, (t, e) => !!e._syncPendingControls() || t);
                    return t && this.updateValueAndValidity({
                        onlySelf: !0
                    }), t
                }
                _throwIfControlMissing(t) {
                    if (!Object.keys(this.controls).length) throw new Error("\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                    if (!this.controls[t]) throw new Error(`Cannot find form control with name: ${t}.`)
                }
                _forEachChild(t) {
                    Object.keys(this.controls).forEach(e => t(this.controls[e], e))
                }
                _setUpControls() {
                    this._forEachChild(t => {
                        t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
                    })
                }
                _updateValue() {
                    this.value = this._reduceValue()
                }
                _anyControls(t) {
                    for (const e of Object.keys(this.controls)) {
                        const n = this.controls[e];
                        if (this.contains(e) && t(n)) return !0
                    }
                    return !1
                }
                _reduceValue() {
                    return this._reduceChildren({}, (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t))
                }
                _reduceChildren(t, e) {
                    let n = t;
                    return this._forEachChild((t, i) => {
                        n = e(n, t, i)
                    }), n
                }
                _allControlsDisabled() {
                    for (const t of Object.keys(this.controls))
                        if (this.controls[t].enabled) return !1;
                    return Object.keys(this.controls).length > 0 || this.disabled
                }
                _checkAllValuesPresent(t) {
                    this._forEachChild((e, n) => {
                        if (void 0 === t[n]) throw new Error(`Must supply a value for form control with name: '${n}'.`)
                    })
                }
            }
            class cy extends oy {
                constructor(t, e, n) {
                    super(ey(e), iy(n, e)), this.controls = t, this._initObservables(), this._setUpdateStrategy(e), this._setUpControls(), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!n
                    })
                }
                at(t) {
                    return this.controls[t]
                }
                push(t) {
                    this.controls.push(t), this._registerControl(t), this.updateValueAndValidity(), this._onCollectionChange()
                }
                insert(t, e) {
                    this.controls.splice(t, 0, e), this._registerControl(e), this.updateValueAndValidity()
                }
                removeAt(t) {
                    this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), this.controls.splice(t, 1), this.updateValueAndValidity()
                }
                setControl(t, e) {
                    this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), this.controls.splice(t, 1), e && (this.controls.splice(t, 0, e), this._registerControl(e)), this.updateValueAndValidity(), this._onCollectionChange()
                }
                get length() {
                    return this.controls.length
                }
                setValue(t, e = {}) {
                    this._checkAllValuesPresent(t), t.forEach((t, n) => {
                        this._throwIfControlMissing(n), this.at(n).setValue(t, {
                            onlySelf: !0,
                            emitEvent: e.emitEvent
                        })
                    }), this.updateValueAndValidity(e)
                }
                patchValue(t, e = {}) {
                    t.forEach((t, n) => {
                        this.at(n) && this.at(n).patchValue(t, {
                            onlySelf: !0,
                            emitEvent: e.emitEvent
                        })
                    }), this.updateValueAndValidity(e)
                }
                reset(t = [], e = {}) {
                    this._forEachChild((n, i) => {
                        n.reset(t[i], {
                            onlySelf: !0,
                            emitEvent: e.emitEvent
                        })
                    }), this._updatePristine(e), this._updateTouched(e), this.updateValueAndValidity(e)
                }
                getRawValue() {
                    return this.controls.map(t => t instanceof ay ? t.value : t.getRawValue())
                }
                clear() {
                    this.controls.length < 1 || (this._forEachChild(t => t._registerOnCollectionChange(() => {})), this.controls.splice(0), this.updateValueAndValidity())
                }
                _syncPendingControls() {
                    let t = this.controls.reduce((t, e) => !!e._syncPendingControls() || t, !1);
                    return t && this.updateValueAndValidity({
                        onlySelf: !0
                    }), t
                }
                _throwIfControlMissing(t) {
                    if (!this.controls.length) throw new Error("\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                    if (!this.at(t)) throw new Error("Cannot find form control at index " + t)
                }
                _forEachChild(t) {
                    this.controls.forEach((e, n) => {
                        t(e, n)
                    })
                }
                _updateValue() {
                    this.value = this.controls.filter(t => t.enabled || this.disabled).map(t => t.value)
                }
                _anyControls(t) {
                    return this.controls.some(e => e.enabled && t(e))
                }
                _setUpControls() {
                    this._forEachChild(t => this._registerControl(t))
                }
                _checkAllValuesPresent(t) {
                    this._forEachChild((e, n) => {
                        if (void 0 === t[n]) throw new Error(`Must supply a value for form control at index: ${n}.`)
                    })
                }
                _allControlsDisabled() {
                    for (const t of this.controls)
                        if (t.enabled) return !1;
                    return this.controls.length > 0 || this.disabled
                }
                _registerControl(t) {
                    t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
                }
            }
            const hy = {
                    provide: T_,
                    useExisting: rt(() => dy)
                },
                uy = (() => Promise.resolve(null))();
            let dy = (() => {
                class t extends T_ {
                    constructor(t, e) {
                        super(), this.submitted = !1, this._directives = [], this.ngSubmit = new ml, this.form = new ly({}, w_(t), C_(e))
                    }
                    ngAfterViewInit() {
                        this._setUpdateStrategy()
                    }
                    get formDirective() {
                        return this
                    }
                    get control() {
                        return this.form
                    }
                    get path() {
                        return []
                    }
                    get controls() {
                        return this.form.controls
                    }
                    addControl(t) {
                        uy.then(() => {
                            const e = this._findContainer(t.path);
                            t.control = e.registerControl(t.name, t.control), z_(t.control, t), t.control.updateValueAndValidity({
                                emitEvent: !1
                            }), this._directives.push(t)
                        })
                    }
                    getControl(t) {
                        return this.form.get(t.path)
                    }
                    removeControl(t) {
                        uy.then(() => {
                            const e = this._findContainer(t.path);
                            e && e.removeControl(t.name), G_(this._directives, t)
                        })
                    }
                    addFormGroup(t) {
                        uy.then(() => {
                            const e = this._findContainer(t.path),
                                n = new ly({});
                            Z_(n, t), e.registerControl(t.name, n), n.updateValueAndValidity({
                                emitEvent: !1
                            })
                        })
                    }
                    removeFormGroup(t) {
                        uy.then(() => {
                            const e = this._findContainer(t.path);
                            e && e.removeControl(t.name)
                        })
                    }
                    getFormGroup(t) {
                        return this.form.get(t.path)
                    }
                    updateModel(t, e) {
                        uy.then(() => {
                            this.form.get(t.path).setValue(e)
                        })
                    }
                    setValue(t) {
                        this.control.setValue(t)
                    }
                    onSubmit(t) {
                        return this.submitted = !0, K_(this.form, this._directives), this.ngSubmit.emit(t), !1
                    }
                    onReset() {
                        this.resetForm()
                    }
                    resetForm(t) {
                        this.form.reset(t), this.submitted = !1
                    }
                    _setUpdateStrategy() {
                        this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn)
                    }
                    _findContainer(t) {
                        return t.pop(), t.length ? this.form.get(t) : this.form
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(d_, 10), _o(p_, 10))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
                        ["ng-form"],
                        ["", "ngForm", ""]
                    ],
                    hostBindings: function(t, e) {
                        1 & t && To("submit", function(t) {
                            return e.onSubmit(t)
                        })("reset", function() {
                            return e.onReset()
                        })
                    },
                    inputs: {
                        options: ["ngFormOptions", "options"]
                    },
                    outputs: {
                        ngSubmit: "ngSubmit"
                    },
                    exportAs: ["ngForm"],
                    features: [da([hy]), io]
                }), t
            })();
            const py = {
                    provide: D_,
                    useExisting: rt(() => my)
                },
                fy = (() => Promise.resolve(null))();
            let my = (() => {
                class t extends D_ {
                    constructor(t, e, n, i) {
                        super(), this.control = new ay, this._registered = !1, this.update = new ml, this._parent = t, this._setValidators(e), this._setAsyncValidators(n), this.valueAccessor = function(t, e) {
                            if (!e) return null;
                            Array.isArray(e);
                            let n = void 0,
                                i = void 0,
                                s = void 0;
                            return e.forEach(t => {
                                var e;
                                t.constructor === c_ ? n = t : (e = t, Q_.some(t => e.constructor === t) ? i = t : s = t)
                            }), s || i || n || null
                        }(0, i)
                    }
                    ngOnChanges(t) {
                        this._checkForErrors(), this._registered || this._setUpControl(), "isDisabled" in t && this._updateDisabled(t),
                            function(t, e) {
                                if (!t.hasOwnProperty("model")) return !1;
                                const n = t.model;
                                return !!n.isFirstChange() || !Object.is(e, n.currentValue)
                            }(t, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model)
                    }
                    ngOnDestroy() {
                        this.formDirective && this.formDirective.removeControl(this)
                    }
                    get path() {
                        return this._parent ? [...this._parent.path, this.name] : [this.name]
                    }
                    get formDirective() {
                        return this._parent ? this._parent.formDirective : null
                    }
                    viewToModelUpdate(t) {
                        this.viewModel = t, this.update.emit(t)
                    }
                    _setUpControl() {
                        this._setUpdateStrategy(), this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this), this._registered = !0
                    }
                    _setUpdateStrategy() {
                        this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn)
                    }
                    _isStandalone() {
                        return !this._parent || !(!this.options || !this.options.standalone)
                    }
                    _setUpStandalone() {
                        z_(this.control, this), this.control.updateValueAndValidity({
                            emitEvent: !1
                        })
                    }
                    _checkForErrors() {
                        this._isStandalone() || this._checkParentType(), this._checkName()
                    }
                    _checkParentType() {}
                    _checkName() {
                        this.options && this.options.name && (this.name = this.options.name), this._isStandalone()
                    }
                    _updateValue(t) {
                        fy.then(() => {
                            this.control.setValue(t, {
                                emitViewToModelChange: !1
                            })
                        })
                    }
                    _updateDisabled(t) {
                        const e = t.isDisabled.currentValue,
                            n = "" === e || e && "false" !== e;
                        fy.then(() => {
                            n && !this.control.disabled ? this.control.disable() : !n && this.control.disabled && this.control.enable()
                        })
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(_o(T_, 9), _o(d_, 10), _o(p_, 10), _o(s_, 10))
                }, t.\u0275dir = $t({
                    type: t,
                    selectors: [
                        ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]
                    ],
                    inputs: {
                        name: "name",
                        isDisabled: ["disabled", "isDisabled"],
                        model: ["ngModel", "model"],
                        options: ["ngModelOptions", "options"]
                    },
                    outputs: {
                        update: "ngModelChange"
                    },
                    exportAs: ["ngModel"],
                    features: [da([py]), io, le]
                }), t
            })();
            const gy = {
                provide: T_,
                useExisting: rt(() => _y)
            };
            let _y = (() => {
                    class t extends T_ {
                        constructor(t, e) {
                            super(), this.validators = t, this.asyncValidators = e, this.submitted = !1, this.directives = [], this.form = null, this.ngSubmit = new ml, this._setValidators(t), this._setAsyncValidators(e)
                        }
                        ngOnChanges(t) {
                            this._checkFormPresent(), t.hasOwnProperty("form") && (this._updateValidators(), this._updateDomValue(), this._updateRegistrations(), this._oldForm = this.form)
                        }
                        get formDirective() {
                            return this
                        }
                        get control() {
                            return this.form
                        }
                        get path() {
                            return []
                        }
                        addControl(t) {
                            const e = this.form.get(t.path);
                            return z_(e, t), e.updateValueAndValidity({
                                emitEvent: !1
                            }), this.directives.push(t), e
                        }
                        getControl(t) {
                            return this.form.get(t.path)
                        }
                        removeControl(t) {
                            G_(this.directives, t)
                        }
                        addFormGroup(t) {
                            const e = this.form.get(t.path);
                            Z_(e, t), e.updateValueAndValidity({
                                emitEvent: !1
                            })
                        }
                        removeFormGroup(t) {}
                        getFormGroup(t) {
                            return this.form.get(t.path)
                        }
                        addFormArray(t) {
                            const e = this.form.get(t.path);
                            Z_(e, t), e.updateValueAndValidity({
                                emitEvent: !1
                            })
                        }
                        removeFormArray(t) {}
                        getFormArray(t) {
                            return this.form.get(t.path)
                        }
                        updateModel(t, e) {
                            this.form.get(t.path).setValue(e)
                        }
                        onSubmit(t) {
                            return this.submitted = !0, K_(this.form, this.directives), this.ngSubmit.emit(t), !1
                        }
                        onReset() {
                            this.resetForm()
                        }
                        resetForm(t) {
                            this.form.reset(t), this.submitted = !1
                        }
                        _updateDomValue() {
                            this.directives.forEach(t => {
                                const e = this.form.get(t.path);
                                t.control !== e && (function(t, e) {
                                    const n = () => {};
                                    e.valueAccessor.registerOnChange(n), e.valueAccessor.registerOnTouched(n), $_(t, e, !0), t && (e._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {}))
                                }(t.control || null, t), e && z_(e, t), t.control = e)
                            }), this.form._updateTreeValidity({
                                emitEvent: !1
                            })
                        }
                        _updateRegistrations() {
                            this.form._registerOnCollectionChange(() => this._updateDomValue()), this._oldForm && this._oldForm._registerOnCollectionChange(() => {})
                        }
                        _updateValidators() {
                            U_(this.form, this, !1), this._oldForm && $_(this._oldForm, this, !1)
                        }
                        _checkFormPresent() {}
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(d_, 10), _o(p_, 10))
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "formGroup", ""]
                        ],
                        hostBindings: function(t, e) {
                            1 & t && To("submit", function(t) {
                                return e.onSubmit(t)
                            })("reset", function() {
                                return e.onReset()
                            })
                        },
                        inputs: {
                            form: ["formGroup", "form"]
                        },
                        outputs: {
                            ngSubmit: "ngSubmit"
                        },
                        exportAs: ["ngForm"],
                        features: [da([gy]), io, le]
                    }), t
                })(),
                yy = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })(),
                by = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [F_],
                        imports: [yy]
                    }), t
                })();
            const vy = ["underline"],
                wy = ["connectionContainer"],
                Cy = ["inputContainer"],
                xy = ["label"];

            function Ey(t, e) {
                1 & t && (xo(0), vo(1, "div", 14), Co(2, "div", 15), Co(3, "div", 16), Co(4, "div", 17), wo(), vo(5, "div", 18), Co(6, "div", 15), Co(7, "div", 16), Co(8, "div", 17), wo(), Eo())
            }

            function Sy(t, e) {
                1 & t && (vo(0, "div", 19), Lo(1, 1), wo())
            }

            function ky(t, e) {
                if (1 & t && (xo(0), Lo(1, 2), vo(2, "span"), Wo(3), wo(), Eo()), 2 & t) {
                    const t = Oo(2);
                    qs(3), Zo(t._control.placeholder)
                }
            }

            function Ty(t, e) {
                1 & t && Lo(0, 3, ["*ngSwitchCase", "true"])
            }

            function Ay(t, e) {
                1 & t && (vo(0, "span", 23), Wo(1, " *"), wo())
            }

            function Dy(t, e) {
                if (1 & t) {
                    const t = So();
                    vo(0, "label", 20, 21), To("cdkObserveContent", function() {
                        return Oe(t), Oo().updateOutlineGap()
                    }), mo(2, ky, 4, 1, "ng-container", 12), mo(3, Ty, 1, 0, "ng-content", 12), mo(4, Ay, 2, 0, "span", 22), wo()
                }
                if (2 & t) {
                    const t = Oo();
                    Bo("mat-empty", t._control.empty && !t._shouldAlwaysFloat())("mat-form-field-empty", t._control.empty && !t._shouldAlwaysFloat())("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color), yo("cdkObserveContentDisabled", "outline" != t.appearance)("id", t._labelId)("ngSwitch", t._hasLabel()), fo("for", t._control.id)("aria-owns", t._control.id), qs(2), yo("ngSwitchCase", !1), qs(1), yo("ngSwitchCase", !0), qs(1), yo("ngIf", !t.hideRequiredMarker && t._control.required && !t._control.disabled)
                }
            }

            function Ry(t, e) {
                1 & t && (vo(0, "div", 24), Lo(1, 4), wo())
            }

            function Iy(t, e) {
                if (1 & t && (vo(0, "div", 25, 26), Co(2, "span", 27), wo()), 2 & t) {
                    const t = Oo();
                    qs(2), Bo("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color)
                }
            }

            function Oy(t, e) {
                1 & t && (vo(0, "div"), Lo(1, 5), wo()), 2 & t && yo("@transitionMessages", Oo()._subscriptAnimationState)
            }

            function Py(t, e) {
                if (1 & t && (vo(0, "div", 31), Wo(1), wo()), 2 & t) {
                    const t = Oo(2);
                    yo("id", t._hintLabelId), qs(1), Zo(t.hintLabel)
                }
            }

            function Fy(t, e) {
                if (1 & t && (vo(0, "div", 28), mo(1, Py, 2, 2, "div", 29), Lo(2, 6), Co(3, "div", 30), Lo(4, 7), wo()), 2 & t) {
                    const t = Oo();
                    yo("@transitionMessages", t._subscriptAnimationState), qs(1), yo("ngIf", t.hintLabel)
                }
            }
            const Ly = ["*", [
                        ["", "matPrefix", ""]
                    ],
                    [
                        ["mat-placeholder"]
                    ],
                    [
                        ["mat-label"]
                    ],
                    [
                        ["", "matSuffix", ""]
                    ],
                    [
                        ["mat-error"]
                    ],
                    [
                        ["mat-hint", 3, "align", "end"]
                    ],
                    [
                        ["mat-hint", "align", "end"]
                    ]
                ],
                Ny = ["*", "[matPrefix]", "mat-placeholder", "mat-label", "[matSuffix]", "mat-error", "mat-hint:not([align='end'])", "mat-hint[align='end']"],
                My = new Un("MatError"),
                Vy = {
                    transitionMessages: lp("transitionMessages", [dp("enter", up({
                        opacity: 1,
                        transform: "translateY(0%)"
                    })), pp("void => enter", [up({
                        opacity: 0,
                        transform: "translateY(-5px)"
                    }), cp("300ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])
                };
            let jy = (() => {
                    class t {}
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275dir = $t({
                        type: t
                    }), t
                })(),
                By = 0;
            const Hy = new Un("MatHint");
            let zy = (() => {
                    class t {
                        constructor() {
                            this.align = "start", this.id = "mat-hint-" + By++
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["mat-hint"]
                        ],
                        hostAttrs: [1, "mat-hint"],
                        hostVars: 4,
                        hostBindings: function(t, e) {
                            2 & t && (fo("id", e.id)("align", null), Bo("mat-form-field-hint-end", "end" === e.align))
                        },
                        inputs: {
                            align: "align",
                            id: "id"
                        },
                        features: [da([{
                            provide: Hy,
                            useExisting: t
                        }])]
                    }), t
                })(),
                qy = (() => {
                    class t {}
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["mat-label"]
                        ]
                    }), t
                })(),
                Uy = (() => {
                    class t {}
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["mat-placeholder"]
                        ]
                    }), t
                })();
            const $y = new Un("MatPrefix"),
                Wy = new Un("MatSuffix");
            let Zy = 0;
            class Qy {
                constructor(t) {
                    this._elementRef = t
                }
            }
            const Ky = Km(Qy, "primary"),
                Gy = new Un("MAT_FORM_FIELD_DEFAULT_OPTIONS"),
                Yy = new Un("MatFormField");
            let Xy = (() => {
                    class t extends Ky {
                        constructor(t, e, n, i, s, r, o, a) {
                            super(t), this._elementRef = t, this._changeDetectorRef = e, this._dir = i, this._defaults = s, this._platform = r, this._ngZone = o, this._outlineGapCalculationNeededImmediately = !1, this._outlineGapCalculationNeededOnStable = !1, this._destroyed = new x, this._showAlwaysAnimate = !1, this._subscriptAnimationState = "", this._hintLabel = "", this._hintLabelId = "mat-hint-" + Zy++, this._labelId = "mat-form-field-label-" + Zy++, this.floatLabel = this._getDefaultFloatLabelState(), this._animationsEnabled = "NoopAnimations" !== a, this.appearance = s && s.appearance ? s.appearance : "legacy", this._hideRequiredMarker = !(!s || null == s.hideRequiredMarker) && s.hideRequiredMarker
                        }
                        get appearance() {
                            return this._appearance
                        }
                        set appearance(t) {
                            const e = this._appearance;
                            this._appearance = t || this._defaults && this._defaults.appearance || "legacy", "outline" === this._appearance && e !== t && (this._outlineGapCalculationNeededOnStable = !0)
                        }
                        get hideRequiredMarker() {
                            return this._hideRequiredMarker
                        }
                        set hideRequiredMarker(t) {
                            this._hideRequiredMarker = su(t)
                        }
                        _shouldAlwaysFloat() {
                            return "always" === this.floatLabel && !this._showAlwaysAnimate
                        }
                        _canLabelFloat() {
                            return "never" !== this.floatLabel
                        }
                        get hintLabel() {
                            return this._hintLabel
                        }
                        set hintLabel(t) {
                            this._hintLabel = t, this._processHints()
                        }
                        get floatLabel() {
                            return "legacy" !== this.appearance && "never" === this._floatLabel ? "auto" : this._floatLabel
                        }
                        set floatLabel(t) {
                            t !== this._floatLabel && (this._floatLabel = t || this._getDefaultFloatLabelState(), this._changeDetectorRef.markForCheck())
                        }
                        get _control() {
                            return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic
                        }
                        set _control(t) {
                            this._explicitFormFieldControl = t
                        }
                        getLabelId() {
                            return this._hasFloatingLabel() ? this._labelId : null
                        }
                        getConnectedOverlayOrigin() {
                            return this._connectionContainerRef || this._elementRef
                        }
                        ngAfterContentInit() {
                            this._validateControlChild();
                            const t = this._control;
                            t.controlType && this._elementRef.nativeElement.classList.add("mat-form-field-type-" + t.controlType), t.stateChanges.pipe(id(null)).subscribe(() => {
                                this._validatePlaceholders(), this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
                            }), t.ngControl && t.ngControl.valueChanges && t.ngControl.valueChanges.pipe(Ju(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck()), this._ngZone.runOutsideAngular(() => {
                                this._ngZone.onStable.pipe(Ju(this._destroyed)).subscribe(() => {
                                    this._outlineGapCalculationNeededOnStable && this.updateOutlineGap()
                                })
                            }), $(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
                                this._outlineGapCalculationNeededOnStable = !0, this._changeDetectorRef.markForCheck()
                            }), this._hintChildren.changes.pipe(id(null)).subscribe(() => {
                                this._processHints(), this._changeDetectorRef.markForCheck()
                            }), this._errorChildren.changes.pipe(id(null)).subscribe(() => {
                                this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
                            }), this._dir && this._dir.change.pipe(Ju(this._destroyed)).subscribe(() => {
                                "function" == typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
                                    requestAnimationFrame(() => this.updateOutlineGap())
                                }) : this.updateOutlineGap()
                            })
                        }
                        ngAfterContentChecked() {
                            this._validateControlChild(), this._outlineGapCalculationNeededImmediately && this.updateOutlineGap()
                        }
                        ngAfterViewInit() {
                            this._subscriptAnimationState = "enter", this._changeDetectorRef.detectChanges()
                        }
                        ngOnDestroy() {
                            this._destroyed.next(), this._destroyed.complete()
                        }
                        _shouldForward(t) {
                            const e = this._control ? this._control.ngControl : null;
                            return e && e[t]
                        }
                        _hasPlaceholder() {
                            return !!(this._control && this._control.placeholder || this._placeholderChild)
                        }
                        _hasLabel() {
                            return !(!this._labelChildNonStatic && !this._labelChildStatic)
                        }
                        _shouldLabelFloat() {
                            return this._canLabelFloat() && (this._control && this._control.shouldLabelFloat || this._shouldAlwaysFloat())
                        }
                        _hideControlPlaceholder() {
                            return "legacy" === this.appearance && !this._hasLabel() || this._hasLabel() && !this._shouldLabelFloat()
                        }
                        _hasFloatingLabel() {
                            return this._hasLabel() || "legacy" === this.appearance && this._hasPlaceholder()
                        }
                        _getDisplayedMessages() {
                            return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? "error" : "hint"
                        }
                        _animateAndLockLabel() {
                            this._hasFloatingLabel() && this._canLabelFloat() && (this._animationsEnabled && this._label && (this._showAlwaysAnimate = !0, zu(this._label.nativeElement, "transitionend").pipe(eu(1)).subscribe(() => {
                                this._showAlwaysAnimate = !1
                            })), this.floatLabel = "always", this._changeDetectorRef.markForCheck())
                        }
                        _validatePlaceholders() {}
                        _processHints() {
                            this._validateHints(), this._syncDescribedByIds()
                        }
                        _validateHints() {}
                        _getDefaultFloatLabelState() {
                            return this._defaults && this._defaults.floatLabel || "auto"
                        }
                        _syncDescribedByIds() {
                            if (this._control) {
                                let t = [];
                                if (this._control.userAriaDescribedBy && "string" == typeof this._control.userAriaDescribedBy && t.push(...this._control.userAriaDescribedBy.split(" ")), "hint" === this._getDisplayedMessages()) {
                                    const e = this._hintChildren ? this._hintChildren.find(t => "start" === t.align) : null,
                                        n = this._hintChildren ? this._hintChildren.find(t => "end" === t.align) : null;
                                    e ? t.push(e.id) : this._hintLabel && t.push(this._hintLabelId), n && t.push(n.id)
                                } else this._errorChildren && t.push(...this._errorChildren.map(t => t.id));
                                this._control.setDescribedByIds(t)
                            }
                        }
                        _validateControlChild() {}
                        updateOutlineGap() {
                            const t = this._label ? this._label.nativeElement : null;
                            if ("outline" !== this.appearance || !t || !t.children.length || !t.textContent.trim()) return;
                            if (!this._platform.isBrowser) return;
                            if (!this._isAttachedToDOM()) return void(this._outlineGapCalculationNeededImmediately = !0);
                            let e = 0,
                                n = 0;
                            const i = this._connectionContainerRef.nativeElement,
                                s = i.querySelectorAll(".mat-form-field-outline-start"),
                                r = i.querySelectorAll(".mat-form-field-outline-gap");
                            if (this._label && this._label.nativeElement.children.length) {
                                const s = i.getBoundingClientRect();
                                if (0 === s.width && 0 === s.height) return this._outlineGapCalculationNeededOnStable = !0, void(this._outlineGapCalculationNeededImmediately = !1);
                                const r = this._getStartEnd(s),
                                    o = t.children,
                                    a = this._getStartEnd(o[0].getBoundingClientRect());
                                let l = 0;
                                for (let t = 0; t < o.length; t++) l += o[t].offsetWidth;
                                e = Math.abs(a - r) - 5, n = l > 0 ? .75 * l + 10 : 0
                            }
                            for (let o = 0; o < s.length; o++) s[o].style.width = e + "px";
                            for (let o = 0; o < r.length; o++) r[o].style.width = n + "px";
                            this._outlineGapCalculationNeededOnStable = this._outlineGapCalculationNeededImmediately = !1
                        }
                        _getStartEnd(t) {
                            return this._dir && "rtl" === this._dir.value ? t.right : t.left
                        }
                        _isAttachedToDOM() {
                            const t = this._elementRef.nativeElement;
                            if (t.getRootNode) {
                                const e = t.getRootNode();
                                return e && e !== t
                            }
                            return document.documentElement.contains(t)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(ba), _o(za), _o(ba), _o(rd, 8), _o(Gy, 8), _o(uu), _o(rc), _o(zm, 8))
                    }, t.\u0275cmp = jt({
                        type: t,
                        selectors: [
                            ["mat-form-field"]
                        ],
                        contentQueries: function(t, e, n) {
                            if (1 & t && (Il(n, jy, !0), Ol(n, jy, !0), Il(n, qy, !0), Ol(n, qy, !0), Il(n, Uy, !0), Il(n, My, !0), Il(n, Hy, !0), Il(n, $y, !0), Il(n, Wy, !0)), 2 & t) {
                                let t;
                                Tl(t = Fl()) && (e._controlNonStatic = t.first), Tl(t = Fl()) && (e._controlStatic = t.first), Tl(t = Fl()) && (e._labelChildNonStatic = t.first), Tl(t = Fl()) && (e._labelChildStatic = t.first), Tl(t = Fl()) && (e._placeholderChild = t.first), Tl(t = Fl()) && (e._errorChildren = t), Tl(t = Fl()) && (e._hintChildren = t), Tl(t = Fl()) && (e._prefixChildren = t), Tl(t = Fl()) && (e._suffixChildren = t)
                            }
                        },
                        viewQuery: function(t, e) {
                            if (1 & t && (Dl(vy, !0), Al(wy, !0), Dl(Cy, !0), Dl(xy, !0)), 2 & t) {
                                let t;
                                Tl(t = Fl()) && (e.underlineRef = t.first), Tl(t = Fl()) && (e._connectionContainerRef = t.first), Tl(t = Fl()) && (e._inputContainerRef = t.first), Tl(t = Fl()) && (e._label = t.first)
                            }
                        },
                        hostAttrs: [1, "mat-form-field"],
                        hostVars: 40,
                        hostBindings: function(t, e) {
                            2 & t && Bo("mat-form-field-appearance-standard", "standard" == e.appearance)("mat-form-field-appearance-fill", "fill" == e.appearance)("mat-form-field-appearance-outline", "outline" == e.appearance)("mat-form-field-appearance-legacy", "legacy" == e.appearance)("mat-form-field-invalid", e._control.errorState)("mat-form-field-can-float", e._canLabelFloat())("mat-form-field-should-float", e._shouldLabelFloat())("mat-form-field-has-label", e._hasFloatingLabel())("mat-form-field-hide-placeholder", e._hideControlPlaceholder())("mat-form-field-disabled", e._control.disabled)("mat-form-field-autofilled", e._control.autofilled)("mat-focused", e._control.focused)("ng-untouched", e._shouldForward("untouched"))("ng-touched", e._shouldForward("touched"))("ng-pristine", e._shouldForward("pristine"))("ng-dirty", e._shouldForward("dirty"))("ng-valid", e._shouldForward("valid"))("ng-invalid", e._shouldForward("invalid"))("ng-pending", e._shouldForward("pending"))("_mat-animation-noopable", !e._animationsEnabled)
                        },
                        inputs: {
                            color: "color",
                            floatLabel: "floatLabel",
                            appearance: "appearance",
                            hideRequiredMarker: "hideRequiredMarker",
                            hintLabel: "hintLabel"
                        },
                        exportAs: ["matFormField"],
                        features: [da([{
                            provide: Yy,
                            useExisting: t
                        }]), io],
                        ngContentSelectors: Ny,
                        decls: 15,
                        vars: 8,
                        consts: [
                            [1, "mat-form-field-wrapper"],
                            [1, "mat-form-field-flex", 3, "click"],
                            ["connectionContainer", ""],
                            [4, "ngIf"],
                            ["class", "mat-form-field-prefix", 4, "ngIf"],
                            [1, "mat-form-field-infix"],
                            ["inputContainer", ""],
                            [1, "mat-form-field-label-wrapper"],
                            ["class", "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "mat-empty", "mat-form-field-empty", "mat-accent", "mat-warn", "ngSwitch", "cdkObserveContent", 4, "ngIf"],
                            ["class", "mat-form-field-suffix", 4, "ngIf"],
                            ["class", "mat-form-field-underline", 4, "ngIf"],
                            [1, "mat-form-field-subscript-wrapper", 3, "ngSwitch"],
                            [4, "ngSwitchCase"],
                            ["class", "mat-form-field-hint-wrapper", 4, "ngSwitchCase"],
                            [1, "mat-form-field-outline"],
                            [1, "mat-form-field-outline-start"],
                            [1, "mat-form-field-outline-gap"],
                            [1, "mat-form-field-outline-end"],
                            [1, "mat-form-field-outline", "mat-form-field-outline-thick"],
                            [1, "mat-form-field-prefix"],
                            [1, "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "ngSwitch", "cdkObserveContent"],
                            ["label", ""],
                            ["class", "mat-placeholder-required mat-form-field-required-marker", "aria-hidden", "true", 4, "ngIf"],
                            ["aria-hidden", "true", 1, "mat-placeholder-required", "mat-form-field-required-marker"],
                            [1, "mat-form-field-suffix"],
                            [1, "mat-form-field-underline"],
                            ["underline", ""],
                            [1, "mat-form-field-ripple"],
                            [1, "mat-form-field-hint-wrapper"],
                            ["class", "mat-hint", 3, "id", 4, "ngIf"],
                            [1, "mat-form-field-hint-spacer"],
                            [1, "mat-hint", 3, "id"]
                        ],
                        template: function(t, e) {
                            1 & t && (Fo(Ly), vo(0, "div", 0), vo(1, "div", 1, 2), To("click", function(t) {
                                return e._control.onContainerClick && e._control.onContainerClick(t)
                            }), mo(3, Ey, 9, 0, "ng-container", 3), mo(4, Sy, 2, 0, "div", 4), vo(5, "div", 5, 6), Lo(7), vo(8, "span", 7), mo(9, Dy, 5, 16, "label", 8), wo(), wo(), mo(10, Ry, 2, 0, "div", 9), wo(), mo(11, Iy, 3, 4, "div", 10), vo(12, "div", 11), mo(13, Oy, 2, 1, "div", 12), mo(14, Fy, 5, 2, "div", 13), wo(), wo()), 2 & t && (qs(3), yo("ngIf", "outline" == e.appearance), qs(1), yo("ngIf", e._prefixChildren.length), qs(5), yo("ngIf", e._hasFloatingLabel()), qs(1), yo("ngIf", e._suffixChildren.length), qs(1), yo("ngIf", "outline" != e.appearance), qs(1), yo("ngSwitch", e._getDisplayedMessages()), qs(1), yo("ngSwitchCase", "error"), qs(1), yo("ngSwitchCase", "hint"))
                        },
                        directives: [Jc, ih, sh, xu],
                        styles: [".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}.cdk-high-contrast-active .mat-form-field-infix{border-image:linear-gradient(transparent, transparent)}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.mat-form-field-empty.mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scale3d(1, 1.0001, 1)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(0.5);opacity:0;transition:background-color 300ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:none;transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 300ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-subscript-wrapper .mat-icon,.mat-form-field-label-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field-hint-end{order:1}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}\n", '.mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:"";display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}\n', '.mat-input-element{font:inherit;background:transparent;color:currentColor;border:none;outline:none;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit;box-sizing:content-box}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::-ms-clear,.mat-input-element::-ms-reveal{display:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date],.mat-input-element[type=datetime],.mat-input-element[type=datetime-local],.mat-input-element[type=month],.mat-input-element[type=week],.mat-input-element[type=time]{line-height:1}.mat-input-element[type=date]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=month]::after,.mat-input-element[type=week]::after,.mat-input-element[type=time]::after{content:" ";white-space:pre;width:1px}.mat-input-element::-webkit-inner-spin-button,.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-moz-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-moz-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-webkit-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element:-ms-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:transparent;display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-ms-expand{display:none}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}select.mat-input-element::-ms-value{color:inherit;background:none}.mat-focused .cdk-high-contrast-active select.mat-input-element::-ms-value{color:inherit}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}\n', ".mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px);-ms-transform:none}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}\n", ".mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-0.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-end{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap{border-width:2px}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap{transition:none}\n", ".mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}\n"],
                        encapsulation: 2,
                        data: {
                            animation: [Vy.transitionMessages]
                        },
                        changeDetection: 0
                    }), t
                })(),
                Jy = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [rh, Zm, Eu], Zm
                        ]
                    }), t
                })();
            const tb = {
                provide: new Un("mat-autocomplete-scroll-strategy"),
                deps: [Jg],
                useFactory: function(t) {
                    return () => t.scrollStrategies.reposition()
                }
            };
            let eb = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [tb],
                        imports: [
                            [e_, Eg, Zm, rh], cd, Eg, Zm
                        ]
                    }), t
                })(),
                nb = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Bu, Zm], Zm
                        ]
                    }), t
                })(),
                ib = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [e_, Zm, ep], Zm
                        ]
                    }), t
                })();
            const sb = ["mat-button", ""],
                rb = ["*"],
                ob = ["mat-button", "mat-flat-button", "mat-icon-button", "mat-raised-button", "mat-stroked-button", "mat-mini-fab", "mat-fab"];
            class ab {
                constructor(t) {
                    this._elementRef = t
                }
            }
            const lb = Km(Qm(Gm(ab)));
            let cb = (() => {
                    class t extends lb {
                        constructor(t, e, n) {
                            super(t), this._focusMonitor = e, this._animationMode = n, this.isRoundButton = this._hasHostAttributes("mat-fab", "mat-mini-fab"), this.isIconButton = this._hasHostAttributes("mat-icon-button");
                            for (const i of ob) this._hasHostAttributes(i) && this._getHostElement().classList.add(i);
                            t.nativeElement.classList.add("mat-button-base"), this.isRoundButton && (this.color = "accent")
                        }
                        ngAfterViewInit() {
                            this._focusMonitor.monitor(this._elementRef, !0)
                        }
                        ngOnDestroy() {
                            this._focusMonitor.stopMonitoring(this._elementRef)
                        }
                        focus(t, e) {
                            t ? this._focusMonitor.focusVia(this._getHostElement(), t, e) : this._getHostElement().focus(e)
                        }
                        _getHostElement() {
                            return this._elementRef.nativeElement
                        }
                        _isRippleDisabled() {
                            return this.disableRipple || this.disabled
                        }
                        _hasHostAttributes(...t) {
                            return t.some(t => this._getHostElement().hasAttribute(t))
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(ba), _o(Fu), _o(zm, 8))
                    }, t.\u0275cmp = jt({
                        type: t,
                        selectors: [
                            ["button", "mat-button", ""],
                            ["button", "mat-raised-button", ""],
                            ["button", "mat-icon-button", ""],
                            ["button", "mat-fab", ""],
                            ["button", "mat-mini-fab", ""],
                            ["button", "mat-stroked-button", ""],
                            ["button", "mat-flat-button", ""]
                        ],
                        viewQuery: function(t, e) {
                            if (1 & t && Dl(wg, !0), 2 & t) {
                                let t;
                                Tl(t = Fl()) && (e.ripple = t.first)
                            }
                        },
                        hostAttrs: [1, "mat-focus-indicator"],
                        hostVars: 5,
                        hostBindings: function(t, e) {
                            2 & t && (fo("disabled", e.disabled || null), Bo("_mat-animation-noopable", "NoopAnimations" === e._animationMode)("mat-button-disabled", e.disabled))
                        },
                        inputs: {
                            disabled: "disabled",
                            disableRipple: "disableRipple",
                            color: "color"
                        },
                        exportAs: ["matButton"],
                        features: [io],
                        attrs: sb,
                        ngContentSelectors: rb,
                        decls: 4,
                        vars: 5,
                        consts: [
                            [1, "mat-button-wrapper"],
                            ["matRipple", "", 1, "mat-button-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"],
                            [1, "mat-button-focus-overlay"]
                        ],
                        template: function(t, e) {
                            1 & t && (Fo(), vo(0, "span", 0), Lo(1), wo(), Co(2, "span", 1), Co(3, "span", 2)), 2 & t && (qs(2), Bo("mat-button-ripple-round", e.isRoundButton || e.isIconButton), yo("matRippleDisabled", e._isRippleDisabled())("matRippleCentered", e.isIconButton)("matRippleTrigger", e._getHostElement()))
                        },
                        directives: [wg],
                        styles: [".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n"],
                        encapsulation: 2,
                        changeDetection: 0
                    }), t
                })(),
                hb = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Cg, Zm], Zm
                        ]
                    }), t
                })(),
                ub = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Zm, Cg], Zm
                        ]
                    }), t
                })(),
                db = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Zm], Zm
                        ]
                    }), t
                })();
            const pb = ["input"],
                fb = function() {
                    return {
                        enterDuration: 150
                    }
                },
                mb = ["*"],
                gb = new Un("mat-checkbox-default-options", {
                    providedIn: "root",
                    factory: _b
                });

            function _b() {
                return {
                    color: "accent",
                    clickAction: "check-indeterminate"
                }
            }
            let yb = 0;
            const bb = _b(),
                vb = {
                    provide: s_,
                    useExisting: rt(() => Eb),
                    multi: !0
                };
            class wb {}
            class Cb {
                constructor(t) {
                    this._elementRef = t
                }
            }
            const xb = Ym(Km(Gm(Qm(Cb))));
            let Eb = (() => {
                    class t extends xb {
                        constructor(t, e, n, i, s, r, o) {
                            super(t), this._changeDetectorRef = e, this._focusMonitor = n, this._ngZone = i, this._animationMode = r, this._options = o, this.ariaLabel = "", this.ariaLabelledby = null, this._uniqueId = "mat-checkbox-" + ++yb, this.id = this._uniqueId, this.labelPosition = "after", this.name = null, this.change = new ml, this.indeterminateChange = new ml, this._onTouched = () => {}, this._currentAnimationClass = "", this._currentCheckState = 0, this._controlValueAccessorChangeFn = () => {}, this._checked = !1, this._disabled = !1, this._indeterminate = !1, this._options = this._options || bb, this.color = this.defaultColor = this._options.color || bb.color, this.tabIndex = parseInt(s) || 0
                        }
                        get inputId() {
                            return (this.id || this._uniqueId) + "-input"
                        }
                        get required() {
                            return this._required
                        }
                        set required(t) {
                            this._required = su(t)
                        }
                        ngAfterViewInit() {
                            this._focusMonitor.monitor(this._elementRef, !0).subscribe(t => {
                                t || Promise.resolve().then(() => {
                                    this._onTouched(), this._changeDetectorRef.markForCheck()
                                })
                            }), this._syncIndeterminate(this._indeterminate)
                        }
                        ngAfterViewChecked() {}
                        ngOnDestroy() {
                            this._focusMonitor.stopMonitoring(this._elementRef)
                        }
                        get checked() {
                            return this._checked
                        }
                        set checked(t) {
                            t != this.checked && (this._checked = t, this._changeDetectorRef.markForCheck())
                        }
                        get disabled() {
                            return this._disabled
                        }
                        set disabled(t) {
                            const e = su(t);
                            e !== this.disabled && (this._disabled = e, this._changeDetectorRef.markForCheck())
                        }
                        get indeterminate() {
                            return this._indeterminate
                        }
                        set indeterminate(t) {
                            const e = t != this._indeterminate;
                            this._indeterminate = su(t), e && (this._transitionCheckState(this._indeterminate ? 3 : this.checked ? 1 : 2), this.indeterminateChange.emit(this._indeterminate)), this._syncIndeterminate(this._indeterminate)
                        }
                        _isRippleDisabled() {
                            return this.disableRipple || this.disabled
                        }
                        _onLabelTextChange() {
                            this._changeDetectorRef.detectChanges()
                        }
                        writeValue(t) {
                            this.checked = !!t
                        }
                        registerOnChange(t) {
                            this._controlValueAccessorChangeFn = t
                        }
                        registerOnTouched(t) {
                            this._onTouched = t
                        }
                        setDisabledState(t) {
                            this.disabled = t
                        }
                        _getAriaChecked() {
                            return this.checked ? "true" : this.indeterminate ? "mixed" : "false"
                        }
                        _transitionCheckState(t) {
                            let e = this._currentCheckState,
                                n = this._elementRef.nativeElement;
                            if (e !== t && (this._currentAnimationClass.length > 0 && n.classList.remove(this._currentAnimationClass), this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(e, t), this._currentCheckState = t, this._currentAnimationClass.length > 0)) {
                                n.classList.add(this._currentAnimationClass);
                                const t = this._currentAnimationClass;
                                this._ngZone.runOutsideAngular(() => {
                                    setTimeout(() => {
                                        n.classList.remove(t)
                                    }, 1e3)
                                })
                            }
                        }
                        _emitChangeEvent() {
                            const t = new wb;
                            t.source = this, t.checked = this.checked, this._controlValueAccessorChangeFn(this.checked), this.change.emit(t), this._inputElement && (this._inputElement.nativeElement.checked = this.checked)
                        }
                        toggle() {
                            this.checked = !this.checked
                        }
                        _onInputClick(t) {
                            var e;
                            const n = null === (e = this._options) || void 0 === e ? void 0 : e.clickAction;
                            t.stopPropagation(), this.disabled || "noop" === n ? this.disabled || "noop" !== n || (this._inputElement.nativeElement.checked = this.checked, this._inputElement.nativeElement.indeterminate = this.indeterminate) : (this.indeterminate && "check" !== n && Promise.resolve().then(() => {
                                this._indeterminate = !1, this.indeterminateChange.emit(this._indeterminate)
                            }), this.toggle(), this._transitionCheckState(this._checked ? 1 : 2), this._emitChangeEvent())
                        }
                        focus(t, e) {
                            t ? this._focusMonitor.focusVia(this._inputElement, t, e) : this._inputElement.nativeElement.focus(e)
                        }
                        _onInteractionEvent(t) {
                            t.stopPropagation()
                        }
                        _getAnimationClassForCheckStateTransition(t, e) {
                            if ("NoopAnimations" === this._animationMode) return "";
                            let n = "";
                            switch (t) {
                                case 0:
                                    if (1 === e) n = "unchecked-checked";
                                    else {
                                        if (3 != e) return "";
                                        n = "unchecked-indeterminate"
                                    }
                                    break;
                                case 2:
                                    n = 1 === e ? "unchecked-checked" : "unchecked-indeterminate";
                                    break;
                                case 1:
                                    n = 2 === e ? "checked-unchecked" : "checked-indeterminate";
                                    break;
                                case 3:
                                    n = 1 === e ? "indeterminate-checked" : "indeterminate-unchecked"
                            }
                            return "mat-checkbox-anim-" + n
                        }
                        _syncIndeterminate(t) {
                            const e = this._inputElement;
                            e && (e.nativeElement.indeterminate = t)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(ba), _o(za), _o(Fu), _o(rc), Hn("tabindex"), _o(zm, 8), _o(gb, 8))
                    }, t.\u0275cmp = jt({
                        type: t,
                        selectors: [
                            ["mat-checkbox"]
                        ],
                        viewQuery: function(t, e) {
                            if (1 & t && (Dl(pb, !0), Dl(wg, !0)), 2 & t) {
                                let t;
                                Tl(t = Fl()) && (e._inputElement = t.first), Tl(t = Fl()) && (e.ripple = t.first)
                            }
                        },
                        hostAttrs: [1, "mat-checkbox"],
                        hostVars: 12,
                        hostBindings: function(t, e) {
                            2 & t && (Ko("id", e.id), fo("tabindex", null), Bo("mat-checkbox-indeterminate", e.indeterminate)("mat-checkbox-checked", e.checked)("mat-checkbox-disabled", e.disabled)("mat-checkbox-label-before", "before" == e.labelPosition)("_mat-animation-noopable", "NoopAnimations" === e._animationMode))
                        },
                        inputs: {
                            disableRipple: "disableRipple",
                            color: "color",
                            tabIndex: "tabIndex",
                            ariaLabel: ["aria-label", "ariaLabel"],
                            ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
                            id: "id",
                            labelPosition: "labelPosition",
                            name: "name",
                            required: "required",
                            checked: "checked",
                            disabled: "disabled",
                            indeterminate: "indeterminate",
                            ariaDescribedby: ["aria-describedby", "ariaDescribedby"],
                            value: "value"
                        },
                        outputs: {
                            change: "change",
                            indeterminateChange: "indeterminateChange"
                        },
                        exportAs: ["matCheckbox"],
                        features: [da([vb]), io],
                        ngContentSelectors: mb,
                        decls: 17,
                        vars: 20,
                        consts: [
                            [1, "mat-checkbox-layout"],
                            ["label", ""],
                            [1, "mat-checkbox-inner-container"],
                            ["type", "checkbox", 1, "mat-checkbox-input", "cdk-visually-hidden", 3, "id", "required", "checked", "disabled", "tabIndex", "change", "click"],
                            ["input", ""],
                            ["matRipple", "", 1, "mat-checkbox-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleRadius", "matRippleCentered", "matRippleAnimation"],
                            [1, "mat-ripple-element", "mat-checkbox-persistent-ripple"],
                            [1, "mat-checkbox-frame"],
                            [1, "mat-checkbox-background"],
                            ["version", "1.1", "focusable", "false", "viewBox", "0 0 24 24", 0, "xml", "space", "preserve", 1, "mat-checkbox-checkmark"],
                            ["fill", "none", "stroke", "white", "d", "M4.1,12.7 9,17.6 20.3,6.3", 1, "mat-checkbox-checkmark-path"],
                            [1, "mat-checkbox-mixedmark"],
                            [1, "mat-checkbox-label", 3, "cdkObserveContent"],
                            ["checkboxLabel", ""],
                            [2, "display", "none"]
                        ],
                        template: function(t, e) {
                            if (1 & t && (Fo(), vo(0, "label", 0, 1), vo(2, "span", 2), vo(3, "input", 3, 4), To("change", function(t) {
                                    return e._onInteractionEvent(t)
                                })("click", function(t) {
                                    return e._onInputClick(t)
                                }), wo(), vo(5, "span", 5), Co(6, "span", 6), wo(), Co(7, "span", 7), vo(8, "span", 8), Ae.lFrame.currentNamespace = pe, vo(9, "svg", 9), Co(10, "path", 10), wo(), Ae.lFrame.currentNamespace = null, Co(11, "span", 11), wo(), wo(), vo(12, "span", 12, 13), To("cdkObserveContent", function() {
                                    return e._onLabelTextChange()
                                }), vo(14, "span", 14), Wo(15, "\xa0"), wo(), Lo(16), wo(), wo()), 2 & t) {
                                const t = go(1),
                                    n = go(13);
                                fo("for", e.inputId), qs(2), Bo("mat-checkbox-inner-container-no-side-margin", !n.textContent || !n.textContent.trim()), qs(1), yo("id", e.inputId)("required", e.required)("checked", e.checked)("disabled", e.disabled)("tabIndex", e.tabIndex), fo("value", e.value)("name", e.name)("aria-label", e.ariaLabel || null)("aria-labelledby", e.ariaLabelledby)("aria-checked", e._getAriaChecked())("aria-describedby", e.ariaDescribedby), qs(2), yo("matRippleTrigger", t)("matRippleDisabled", e._isRippleDisabled())("matRippleRadius", 20)("matRippleCentered", !0)("matRippleAnimation", fl(19, fb))
                            }
                        },
                        directives: [wg, xu],
                        styles: ["@keyframes mat-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes mat-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes mat-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes mat-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mat-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes mat-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes mat-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes mat-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes mat-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes mat-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.mat-checkbox-background,.mat-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.mat-checkbox{display:inline-block;transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:transparent}._mat-animation-noopable.mat-checkbox{transition:none;animation:none}.mat-checkbox .mat-ripple-element:not(.mat-checkbox-persistent-ripple){opacity:.16}.mat-checkbox-layout{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mat-checkbox-label{-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}.mat-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mat-checkbox-inner-container{margin-left:8px;margin-right:auto}.mat-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mat-checkbox-frame{background-color:transparent;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._mat-animation-noopable .mat-checkbox-frame{transition:none}.cdk-high-contrast-active .mat-checkbox.cdk-keyboard-focused .mat-checkbox-frame{border-style:dotted}.mat-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);-webkit-print-color-adjust:exact;color-adjust:exact}._mat-animation-noopable .mat-checkbox-background{transition:none}.cdk-high-contrast-active .mat-checkbox .mat-checkbox-background{background:none}.mat-checkbox-persistent-ripple{display:block;width:100%;height:100%;transform:none}.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:.04}.mat-checkbox.cdk-keyboard-focused .mat-checkbox-persistent-ripple{opacity:.12}.mat-checkbox-persistent-ripple,.mat-checkbox.mat-checkbox-disabled .mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:0}@media(hover: none){.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{display:none}}.mat-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.mat-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .mat-checkbox-checkmark-path{stroke:#000 !important}.mat-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .mat-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.mat-checkbox-label-before .mat-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mat-checkbox-label-before .mat-checkbox-inner-container{margin-left:auto;margin-right:8px}.mat-checkbox-checked .mat-checkbox-checkmark{opacity:1}.mat-checkbox-checked .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-checked .mat-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-indeterminate .mat-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.mat-checkbox-unchecked .mat-checkbox-background{background-color:transparent}.mat-checkbox-disabled{cursor:default}.cdk-high-contrast-active .mat-checkbox-disabled{opacity:.5}.mat-checkbox-anim-unchecked-checked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-checked .mat-checkbox-checkmark-path{animation:180ms linear 0ms mat-checkbox-unchecked-checked-checkmark-path}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-unchecked-indeterminate-mixedmark}.mat-checkbox-anim-checked-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-checked-unchecked .mat-checkbox-checkmark-path{animation:90ms linear 0ms mat-checkbox-checked-unchecked-checkmark-path}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-checkmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-checkmark}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-mixedmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-checkmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-checkmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-mixedmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-mixedmark}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-mixedmark{animation:300ms linear 0ms mat-checkbox-indeterminate-unchecked-mixedmark}.mat-checkbox-input{bottom:0;left:50%}.mat-checkbox .mat-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}\n"],
                        encapsulation: 2,
                        changeDetection: 0
                    }), t
                })(),
                Sb = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })(),
                kb = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Cg, Zm, Eu, Sb], Zm, Sb
                        ]
                    }), t
                })();
            const Tb = new Un("mat-chips-default-options"),
                Ab = {
                    separatorKeyCodes: [13]
                };
            let Db = (() => {
                class t {}
                return t.\u0275mod = qt({
                    type: t
                }), t.\u0275inj = ct({
                    factory: function(e) {
                        return new(e || t)
                    },
                    providers: [dg, {
                        provide: Tb,
                        useValue: Ab
                    }],
                    imports: [
                        [Zm]
                    ]
                }), t
            })();

            function Rb(t) {
                return function(e) {
                    const n = new Ib(t),
                        i = e.lift(n);
                    return n.caught = i
                }
            }
            class Ib {
                constructor(t) {
                    this.selector = t
                }
                call(t, e) {
                    return e.subscribe(new Ob(t, this.selector, this.caught))
                }
            }
            class Ob extends V {
                constructor(t, e, n) {
                    super(t), this.selector = e, this.caught = n
                }
                error(t) {
                    if (!this.isStopped) {
                        let n;
                        try {
                            n = this.selector(t, this.caught)
                        } catch (e) {
                            return void super.error(e)
                        }
                        this._unsubscribeAndRecycle();
                        const i = new M(this);
                        this.add(i);
                        const s = j(n, i);
                        s !== i && this.add(s)
                    }
                }
            }
            class Pb {
                constructor(t) {
                    this.callback = t
                }
                call(t, e) {
                    return e.subscribe(new Fb(t, this.callback))
                }
            }
            class Fb extends f {
                constructor(t, e) {
                    super(t), this.add(new u(e))
                }
            }
            class Lb {}
            class Nb {}
            class Mb {
                constructor(t) {
                    this.normalizedNames = new Map, this.lazyUpdate = null, t ? this.lazyInit = "string" == typeof t ? () => {
                        this.headers = new Map, t.split("\n").forEach(t => {
                            const e = t.indexOf(":");
                            if (e > 0) {
                                const n = t.slice(0, e),
                                    i = n.toLowerCase(),
                                    s = t.slice(e + 1).trim();
                                this.maybeSetNormalizedName(n, i), this.headers.has(i) ? this.headers.get(i).push(s) : this.headers.set(i, [s])
                            }
                        })
                    } : () => {
                        this.headers = new Map, Object.keys(t).forEach(e => {
                            let n = t[e];
                            const i = e.toLowerCase();
                            "string" == typeof n && (n = [n]), n.length > 0 && (this.headers.set(i, n), this.maybeSetNormalizedName(e, i))
                        })
                    } : this.headers = new Map
                }
                has(t) {
                    return this.init(), this.headers.has(t.toLowerCase())
                }
                get(t) {
                    this.init();
                    const e = this.headers.get(t.toLowerCase());
                    return e && e.length > 0 ? e[0] : null
                }
                keys() {
                    return this.init(), Array.from(this.normalizedNames.values())
                }
                getAll(t) {
                    return this.init(), this.headers.get(t.toLowerCase()) || null
                }
                append(t, e) {
                    return this.clone({
                        name: t,
                        value: e,
                        op: "a"
                    })
                }
                set(t, e) {
                    return this.clone({
                        name: t,
                        value: e,
                        op: "s"
                    })
                }
                delete(t, e) {
                    return this.clone({
                        name: t,
                        value: e,
                        op: "d"
                    })
                }
                maybeSetNormalizedName(t, e) {
                    this.normalizedNames.has(e) || this.normalizedNames.set(e, t)
                }
                init() {
                    this.lazyInit && (this.lazyInit instanceof Mb ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)), this.lazyUpdate = null))
                }
                copyFrom(t) {
                    t.init(), Array.from(t.headers.keys()).forEach(e => {
                        this.headers.set(e, t.headers.get(e)), this.normalizedNames.set(e, t.normalizedNames.get(e))
                    })
                }
                clone(t) {
                    const e = new Mb;
                    return e.lazyInit = this.lazyInit && this.lazyInit instanceof Mb ? this.lazyInit : this, e.lazyUpdate = (this.lazyUpdate || []).concat([t]), e
                }
                applyUpdate(t) {
                    const e = t.name.toLowerCase();
                    switch (t.op) {
                        case "a":
                        case "s":
                            let n = t.value;
                            if ("string" == typeof n && (n = [n]), 0 === n.length) return;
                            this.maybeSetNormalizedName(t.name, e);
                            const i = ("a" === t.op ? this.headers.get(e) : void 0) || [];
                            i.push(...n), this.headers.set(e, i);
                            break;
                        case "d":
                            const s = t.value;
                            if (s) {
                                let t = this.headers.get(e);
                                if (!t) return;
                                t = t.filter(t => -1 === s.indexOf(t)), 0 === t.length ? (this.headers.delete(e), this.normalizedNames.delete(e)) : this.headers.set(e, t)
                            } else this.headers.delete(e), this.normalizedNames.delete(e)
                    }
                }
                forEach(t) {
                    this.init(), Array.from(this.normalizedNames.keys()).forEach(e => t(this.normalizedNames.get(e), this.headers.get(e)))
                }
            }
            class Vb {
                encodeKey(t) {
                    return jb(t)
                }
                encodeValue(t) {
                    return jb(t)
                }
                decodeKey(t) {
                    return decodeURIComponent(t)
                }
                decodeValue(t) {
                    return decodeURIComponent(t)
                }
            }

            function jb(t) {
                return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/gi, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%3F/gi, "?").replace(/%2F/gi, "/")
            }
            class Bb {
                constructor(t = {}) {
                    if (this.updates = null, this.cloneFrom = null, this.encoder = t.encoder || new Vb, t.fromString) {
                        if (t.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                        this.map = function(t, e) {
                            const n = new Map;
                            return t.length > 0 && t.split("&").forEach(t => {
                                const i = t.indexOf("="),
                                    [s, r] = -1 == i ? [e.decodeKey(t), ""] : [e.decodeKey(t.slice(0, i)), e.decodeValue(t.slice(i + 1))],
                                    o = n.get(s) || [];
                                o.push(r), n.set(s, o)
                            }), n
                        }(t.fromString, this.encoder)
                    } else t.fromObject ? (this.map = new Map, Object.keys(t.fromObject).forEach(e => {
                        const n = t.fromObject[e];
                        this.map.set(e, Array.isArray(n) ? n : [n])
                    })) : this.map = null
                }
                has(t) {
                    return this.init(), this.map.has(t)
                }
                get(t) {
                    this.init();
                    const e = this.map.get(t);
                    return e ? e[0] : null
                }
                getAll(t) {
                    return this.init(), this.map.get(t) || null
                }
                keys() {
                    return this.init(), Array.from(this.map.keys())
                }
                append(t, e) {
                    return this.clone({
                        param: t,
                        value: e,
                        op: "a"
                    })
                }
                set(t, e) {
                    return this.clone({
                        param: t,
                        value: e,
                        op: "s"
                    })
                }
                delete(t, e) {
                    return this.clone({
                        param: t,
                        value: e,
                        op: "d"
                    })
                }
                toString() {
                    return this.init(), this.keys().map(t => {
                        const e = this.encoder.encodeKey(t);
                        return this.map.get(t).map(t => e + "=" + this.encoder.encodeValue(t)).join("&")
                    }).filter(t => "" !== t).join("&")
                }
                clone(t) {
                    const e = new Bb({
                        encoder: this.encoder
                    });
                    return e.cloneFrom = this.cloneFrom || this, e.updates = (this.updates || []).concat([t]), e
                }
                init() {
                    null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))), this.updates.forEach(t => {
                        switch (t.op) {
                            case "a":
                            case "s":
                                const e = ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                                e.push(t.value), this.map.set(t.param, e);
                                break;
                            case "d":
                                if (void 0 === t.value) {
                                    this.map.delete(t.param);
                                    break
                                } {
                                    let e = this.map.get(t.param) || [];
                                    const n = e.indexOf(t.value); - 1 !== n && e.splice(n, 1), e.length > 0 ? this.map.set(t.param, e) : this.map.delete(t.param)
                                }
                        }
                    }), this.cloneFrom = this.updates = null)
                }
            }

            function Hb(t) {
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
            }

            function zb(t) {
                return "undefined" != typeof Blob && t instanceof Blob
            }

            function qb(t) {
                return "undefined" != typeof FormData && t instanceof FormData
            }
            class Ub {
                constructor(t, e, n, i) {
                    let s;
                    if (this.url = e, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = t.toUpperCase(), function(t) {
                            switch (t) {
                                case "DELETE":
                                case "GET":
                                case "HEAD":
                                case "OPTIONS":
                                case "JSONP":
                                    return !1;
                                default:
                                    return !0
                            }
                        }(this.method) || i ? (this.body = void 0 !== n ? n : null, s = i) : s = n, s && (this.reportProgress = !!s.reportProgress, this.withCredentials = !!s.withCredentials, s.responseType && (this.responseType = s.responseType), s.headers && (this.headers = s.headers), s.params && (this.params = s.params)), this.headers || (this.headers = new Mb), this.params) {
                        const t = this.params.toString();
                        if (0 === t.length) this.urlWithParams = e;
                        else {
                            const n = e.indexOf("?");
                            this.urlWithParams = e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t
                        }
                    } else this.params = new Bb, this.urlWithParams = e
                }
                serializeBody() {
                    return null === this.body ? null : Hb(this.body) || zb(this.body) || qb(this.body) || "string" == typeof this.body ? this.body : this.body instanceof Bb ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
                }
                detectContentTypeHeader() {
                    return null === this.body || qb(this.body) ? null : zb(this.body) ? this.body.type || null : Hb(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof Bb ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || Array.isArray(this.body) ? "application/json" : null
                }
                clone(t = {}) {
                    const e = t.method || this.method,
                        n = t.url || this.url,
                        i = t.responseType || this.responseType,
                        s = void 0 !== t.body ? t.body : this.body,
                        r = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
                        o = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
                    let a = t.headers || this.headers,
                        l = t.params || this.params;
                    return void 0 !== t.setHeaders && (a = Object.keys(t.setHeaders).reduce((e, n) => e.set(n, t.setHeaders[n]), a)), t.setParams && (l = Object.keys(t.setParams).reduce((e, n) => e.set(n, t.setParams[n]), l)), new Ub(e, n, s, {
                        params: l,
                        headers: a,
                        reportProgress: o,
                        responseType: i,
                        withCredentials: r
                    })
                }
            }
            var $b = function(t) {
                return t[t.Sent = 0] = "Sent", t[t.UploadProgress = 1] = "UploadProgress", t[t.ResponseHeader = 2] = "ResponseHeader", t[t.DownloadProgress = 3] = "DownloadProgress", t[t.Response = 4] = "Response", t[t.User = 5] = "User", t
            }({});
            class Wb {
                constructor(t, e = 200, n = "OK") {
                    this.headers = t.headers || new Mb, this.status = void 0 !== t.status ? t.status : e, this.statusText = t.statusText || n, this.url = t.url || null, this.ok = this.status >= 200 && this.status < 300
                }
            }
            class Zb extends Wb {
                constructor(t = {}) {
                    super(t), this.type = $b.ResponseHeader
                }
                clone(t = {}) {
                    return new Zb({
                        headers: t.headers || this.headers,
                        status: void 0 !== t.status ? t.status : this.status,
                        statusText: t.statusText || this.statusText,
                        url: t.url || this.url || void 0
                    })
                }
            }
            class Qb extends Wb {
                constructor(t = {}) {
                    super(t), this.type = $b.Response, this.body = void 0 !== t.body ? t.body : null
                }
                clone(t = {}) {
                    return new Qb({
                        body: void 0 !== t.body ? t.body : this.body,
                        headers: t.headers || this.headers,
                        status: void 0 !== t.status ? t.status : this.status,
                        statusText: t.statusText || this.statusText,
                        url: t.url || this.url || void 0
                    })
                }
            }
            class Kb extends Wb {
                constructor(t) {
                    super(t, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? "Http failure during parsing for " + (t.url || "(unknown url)") : `Http failure response for ${t.url||"(unknown url)"}: ${t.status} ${t.statusText}`, this.error = t.error || null
                }
            }

            function Gb(t, e) {
                return {
                    body: e,
                    headers: t.headers,
                    observe: t.observe,
                    params: t.params,
                    reportProgress: t.reportProgress,
                    responseType: t.responseType,
                    withCredentials: t.withCredentials
                }
            }
            let Yb = (() => {
                class t {
                    constructor(t) {
                        this.handler = t
                    }
                    request(t, e, n = {}) {
                        let i;
                        if (t instanceof Ub) i = t;
                        else {
                            let s = void 0;
                            s = n.headers instanceof Mb ? n.headers : new Mb(n.headers);
                            let r = void 0;
                            n.params && (r = n.params instanceof Bb ? n.params : new Bb({
                                fromObject: n.params
                            })), i = new Ub(t, e, void 0 !== n.body ? n.body : null, {
                                headers: s,
                                params: r,
                                reportProgress: n.reportProgress,
                                responseType: n.responseType || "json",
                                withCredentials: n.withCredentials
                            })
                        }
                        const s = Nh(i).pipe(B(t => this.handler.handle(t), void 0, 1));
                        if (t instanceof Ub || "events" === n.observe) return s;
                        const r = s.pipe(Kh(t => t instanceof Qb));
                        switch (n.observe || "body") {
                            case "body":
                                switch (i.responseType) {
                                    case "arraybuffer":
                                        return r.pipe(k(t => {
                                            if (null !== t.body && !(t.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                            return t.body
                                        }));
                                    case "blob":
                                        return r.pipe(k(t => {
                                            if (null !== t.body && !(t.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                            return t.body
                                        }));
                                    case "text":
                                        return r.pipe(k(t => {
                                            if (null !== t.body && "string" != typeof t.body) throw new Error("Response is not a string.");
                                            return t.body
                                        }));
                                    case "json":
                                    default:
                                        return r.pipe(k(t => t.body))
                                }
                            case "response":
                                return r;
                            default:
                                throw new Error(`Unreachable: unhandled observe type ${n.observe}}`)
                        }
                    }
                    delete(t, e = {}) {
                        return this.request("DELETE", t, e)
                    }
                    get(t, e = {}) {
                        return this.request("GET", t, e)
                    }
                    head(t, e = {}) {
                        return this.request("HEAD", t, e)
                    }
                    jsonp(t, e) {
                        return this.request("JSONP", t, {
                            params: (new Bb).append(e, "JSONP_CALLBACK"),
                            observe: "body",
                            responseType: "json"
                        })
                    }
                    options(t, e = {}) {
                        return this.request("OPTIONS", t, e)
                    }
                    patch(t, e, n = {}) {
                        return this.request("PATCH", t, Gb(n, e))
                    }
                    post(t, e, n = {}) {
                        return this.request("POST", t, Gb(n, e))
                    }
                    put(t, e, n = {}) {
                        return this.request("PUT", t, Gb(n, e))
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(Lb))
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            class Xb {
                constructor(t, e) {
                    this.next = t, this.interceptor = e
                }
                handle(t) {
                    return this.interceptor.intercept(t, this.next)
                }
            }
            const Jb = new Un("HTTP_INTERCEPTORS");
            let tv = (() => {
                class t {
                    intercept(t, e) {
                        return e.handle(t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)
                }, t.\u0275prov = lt({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
            const ev = /^\)\]\}',?\n/;
            class nv {}
            let iv = (() => {
                    class t {
                        constructor() {}
                        build() {
                            return new XMLHttpRequest
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                sv = (() => {
                    class t {
                        constructor(t) {
                            this.xhrFactory = t
                        }
                        handle(t) {
                            if ("JSONP" === t.method) throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");
                            return new y(e => {
                                const n = this.xhrFactory.build();
                                if (n.open(t.method, t.urlWithParams), t.withCredentials && (n.withCredentials = !0), t.headers.forEach((t, e) => n.setRequestHeader(t, e.join(","))), t.headers.has("Accept") || n.setRequestHeader("Accept", "application/json, text/plain, */*"), !t.headers.has("Content-Type")) {
                                    const e = t.detectContentTypeHeader();
                                    null !== e && n.setRequestHeader("Content-Type", e)
                                }
                                if (t.responseType) {
                                    const e = t.responseType.toLowerCase();
                                    n.responseType = "json" !== e ? e : "text"
                                }
                                const i = t.serializeBody();
                                let s = null;
                                const r = () => {
                                        if (null !== s) return s;
                                        const e = 1223 === n.status ? 204 : n.status,
                                            i = n.statusText || "OK",
                                            r = new Mb(n.getAllResponseHeaders()),
                                            o = function(t) {
                                                return "responseURL" in t && t.responseURL ? t.responseURL : /^X-Request-URL:/m.test(t.getAllResponseHeaders()) ? t.getResponseHeader("X-Request-URL") : null
                                            }(n) || t.url;
                                        return s = new Zb({
                                            headers: r,
                                            status: e,
                                            statusText: i,
                                            url: o
                                        }), s
                                    },
                                    o = () => {
                                        let {
                                            headers: i,
                                            status: s,
                                            statusText: o,
                                            url: a
                                        } = r(), l = null;
                                        204 !== s && (l = void 0 === n.response ? n.responseText : n.response), 0 === s && (s = l ? 200 : 0);
                                        let c = s >= 200 && s < 300;
                                        if ("json" === t.responseType && "string" == typeof l) {
                                            const t = l;
                                            l = l.replace(ev, "");
                                            try {
                                                l = "" !== l ? JSON.parse(l) : null
                                            } catch (h) {
                                                l = t, c && (c = !1, l = {
                                                    error: h,
                                                    text: l
                                                })
                                            }
                                        }
                                        c ? (e.next(new Qb({
                                            body: l,
                                            headers: i,
                                            status: s,
                                            statusText: o,
                                            url: a || void 0
                                        })), e.complete()) : e.error(new Kb({
                                            error: l,
                                            headers: i,
                                            status: s,
                                            statusText: o,
                                            url: a || void 0
                                        }))
                                    },
                                    a = t => {
                                        const {
                                            url: i
                                        } = r(), s = new Kb({
                                            error: t,
                                            status: n.status || 0,
                                            statusText: n.statusText || "Unknown Error",
                                            url: i || void 0
                                        });
                                        e.error(s)
                                    };
                                let l = !1;
                                const c = i => {
                                        l || (e.next(r()), l = !0);
                                        let s = {
                                            type: $b.DownloadProgress,
                                            loaded: i.loaded
                                        };
                                        i.lengthComputable && (s.total = i.total), "text" === t.responseType && n.responseText && (s.partialText = n.responseText), e.next(s)
                                    },
                                    h = t => {
                                        let n = {
                                            type: $b.UploadProgress,
                                            loaded: t.loaded
                                        };
                                        t.lengthComputable && (n.total = t.total), e.next(n)
                                    };
                                return n.addEventListener("load", o), n.addEventListener("error", a), t.reportProgress && (n.addEventListener("progress", c), null !== i && n.upload && n.upload.addEventListener("progress", h)), n.send(i), e.next({
                                    type: $b.Sent
                                }), () => {
                                    n.removeEventListener("error", a), n.removeEventListener("load", o), t.reportProgress && (n.removeEventListener("progress", c), null !== i && n.upload && n.upload.removeEventListener("progress", h)), n.readyState !== n.DONE && n.abort()
                                }
                            })
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(nv))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })();
            const rv = new Un("XSRF_COOKIE_NAME"),
                ov = new Un("XSRF_HEADER_NAME");
            class av {}
            let lv = (() => {
                    class t {
                        constructor(t, e, n) {
                            this.doc = t, this.platform = e, this.cookieName = n, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0
                        }
                        getToken() {
                            if ("server" === this.platform) return null;
                            const t = this.doc.cookie || "";
                            return t !== this.lastCookieString && (this.parseCount++, this.lastToken = Xc(t, this.cookieName), this.lastCookieString = t), this.lastToken
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Pc), di(Ul), di(rv))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                cv = (() => {
                    class t {
                        constructor(t, e) {
                            this.tokenService = t, this.headerName = e
                        }
                        intercept(t, e) {
                            const n = t.url.toLowerCase();
                            if ("GET" === t.method || "HEAD" === t.method || n.startsWith("http://") || n.startsWith("https://")) return e.handle(t);
                            const i = this.tokenService.getToken();
                            return null === i || t.headers.has(this.headerName) || (t = t.clone({
                                headers: t.headers.set(this.headerName, i)
                            })), e.handle(t)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(av), di(ov))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                hv = (() => {
                    class t {
                        constructor(t, e) {
                            this.backend = t, this.injector = e, this.chain = null
                        }
                        handle(t) {
                            if (null === this.chain) {
                                const t = this.injector.get(Jb, []);
                                this.chain = t.reduceRight((t, e) => new Xb(t, e), this.backend)
                            }
                            return this.chain.handle(t)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Nb), di(eo))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                uv = (() => {
                    class t {
                        static disable() {
                            return {
                                ngModule: t,
                                providers: [{
                                    provide: cv,
                                    useClass: tv
                                }]
                            }
                        }
                        static withOptions(e = {}) {
                            return {
                                ngModule: t,
                                providers: [e.cookieName ? {
                                    provide: rv,
                                    useValue: e.cookieName
                                } : [], e.headerName ? {
                                    provide: ov,
                                    useValue: e.headerName
                                } : []]
                            }
                        }
                    }
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [cv, {
                            provide: Jb,
                            useExisting: cv,
                            multi: !0
                        }, {
                            provide: av,
                            useClass: lv
                        }, {
                            provide: rv,
                            useValue: "XSRF-TOKEN"
                        }, {
                            provide: ov,
                            useValue: "X-XSRF-TOKEN"
                        }]
                    }), t
                })(),
                dv = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [Yb, {
                            provide: Lb,
                            useClass: hv
                        }, sv, {
                            provide: Nb,
                            useExisting: sv
                        }, iv, {
                            provide: nv,
                            useExisting: iv
                        }],
                        imports: [
                            [uv.withOptions({
                                cookieName: "XSRF-TOKEN",
                                headerName: "X-XSRF-TOKEN"
                            })]
                        ]
                    }), t
                })();
            const pv = ["*"];

            function fv(t) {
                return Error(`Unable to find icon with the name "${t}"`)
            }

            function mv(t) {
                return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)
            }

            function gv(t) {
                return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)
            }
            class _v {
                constructor(t, e, n) {
                    this.url = t, this.svgText = e, this.options = n
                }
            }
            let yv = (() => {
                class t {
                    constructor(t, e, n, i) {
                        this._httpClient = t, this._sanitizer = e, this._errorHandler = i, this._svgIconConfigs = new Map, this._iconSetConfigs = new Map, this._cachedIconsByUrl = new Map, this._inProgressUrlFetches = new Map, this._fontCssClassesByAlias = new Map, this._resolvers = [], this._defaultFontSetClass = "material-icons", this._document = n
                    }
                    addSvgIcon(t, e, n) {
                        return this.addSvgIconInNamespace("", t, e, n)
                    }
                    addSvgIconLiteral(t, e, n) {
                        return this.addSvgIconLiteralInNamespace("", t, e, n)
                    }
                    addSvgIconInNamespace(t, e, n, i) {
                        return this._addSvgIconConfig(t, e, new _v(n, null, i))
                    }
                    addSvgIconResolver(t) {
                        return this._resolvers.push(t), this
                    }
                    addSvgIconLiteralInNamespace(t, e, n, i) {
                        const s = this._sanitizer.sanitize(Qi.HTML, n);
                        if (!s) throw gv(n);
                        return this._addSvgIconConfig(t, e, new _v("", s, i))
                    }
                    addSvgIconSet(t, e) {
                        return this.addSvgIconSetInNamespace("", t, e)
                    }
                    addSvgIconSetLiteral(t, e) {
                        return this.addSvgIconSetLiteralInNamespace("", t, e)
                    }
                    addSvgIconSetInNamespace(t, e, n) {
                        return this._addSvgIconSetConfig(t, new _v(e, null, n))
                    }
                    addSvgIconSetLiteralInNamespace(t, e, n) {
                        const i = this._sanitizer.sanitize(Qi.HTML, e);
                        if (!i) throw gv(e);
                        return this._addSvgIconSetConfig(t, new _v("", i, n))
                    }
                    registerFontClassAlias(t, e = t) {
                        return this._fontCssClassesByAlias.set(t, e), this
                    }
                    classNameForFontAlias(t) {
                        return this._fontCssClassesByAlias.get(t) || t
                    }
                    setDefaultFontSetClass(t) {
                        return this._defaultFontSetClass = t, this
                    }
                    getDefaultFontSetClass() {
                        return this._defaultFontSetClass
                    }
                    getSvgIconFromUrl(t) {
                        const e = this._sanitizer.sanitize(Qi.RESOURCE_URL, t);
                        if (!e) throw mv(t);
                        const n = this._cachedIconsByUrl.get(e);
                        return n ? Nh(bv(n)) : this._loadSvgIconFromConfig(new _v(t, null)).pipe(Vh(t => this._cachedIconsByUrl.set(e, t)), k(t => bv(t)))
                    }
                    getNamedSvgIcon(t, e = "") {
                        const n = vv(e, t);
                        let i = this._svgIconConfigs.get(n);
                        if (i) return this._getSvgFromConfig(i);
                        if (i = this._getIconConfigFromResolvers(e, t), i) return this._svgIconConfigs.set(n, i), this._getSvgFromConfig(i);
                        const s = this._iconSetConfigs.get(e);
                        return s ? this._getSvgFromIconSetConfigs(t, s) : (r = fv(n), new y(t => t.error(r)));
                        var r
                    }
                    ngOnDestroy() {
                        this._resolvers = [], this._svgIconConfigs.clear(), this._iconSetConfigs.clear(), this._cachedIconsByUrl.clear()
                    }
                    _getSvgFromConfig(t) {
                        return t.svgText ? Nh(bv(this._svgElementFromConfig(t))) : this._loadSvgIconFromConfig(t).pipe(k(t => bv(t)))
                    }
                    _getSvgFromIconSetConfigs(t, e) {
                        const n = this._extractIconWithNameFromAnySet(t, e);
                        return n ? Nh(n) : n_(e.filter(t => !t.svgText).map(t => this._loadSvgIconSetFromConfig(t).pipe(Rb(e => {
                            const n = this._sanitizer.sanitize(Qi.RESOURCE_URL, t.url);
                            return this._errorHandler.handleError(new Error(`Loading icon set URL: ${n} failed: ${e.message}`)), Nh(null)
                        })))).pipe(k(() => {
                            const n = this._extractIconWithNameFromAnySet(t, e);
                            if (!n) throw fv(t);
                            return n
                        }))
                    }
                    _extractIconWithNameFromAnySet(t, e) {
                        for (let n = e.length - 1; n >= 0; n--) {
                            const i = e[n];
                            if (i.svgText && i.svgText.indexOf(t) > -1) {
                                const e = this._svgElementFromConfig(i),
                                    n = this._extractSvgIconFromSet(e, t, i.options);
                                if (n) return n
                            }
                        }
                        return null
                    }
                    _loadSvgIconFromConfig(t) {
                        return this._fetchIcon(t).pipe(Vh(e => t.svgText = e), k(() => this._svgElementFromConfig(t)))
                    }
                    _loadSvgIconSetFromConfig(t) {
                        return t.svgText ? Nh(null) : this._fetchIcon(t).pipe(Vh(e => t.svgText = e))
                    }
                    _extractSvgIconFromSet(t, e, n) {
                        const i = t.querySelector(`[id="${e}"]`);
                        if (!i) return null;
                        const s = i.cloneNode(!0);
                        if (s.removeAttribute("id"), "svg" === s.nodeName.toLowerCase()) return this._setSvgAttributes(s, n);
                        if ("symbol" === s.nodeName.toLowerCase()) return this._setSvgAttributes(this._toSvgElement(s), n);
                        const r = this._svgElementFromString("<svg></svg>");
                        return r.appendChild(s), this._setSvgAttributes(r, n)
                    }
                    _svgElementFromString(t) {
                        const e = this._document.createElement("DIV");
                        e.innerHTML = t;
                        const n = e.querySelector("svg");
                        if (!n) throw Error("<svg> tag not found");
                        return n
                    }
                    _toSvgElement(t) {
                        const e = this._svgElementFromString("<svg></svg>"),
                            n = t.attributes;
                        for (let i = 0; i < n.length; i++) {
                            const {
                                name: t,
                                value: s
                            } = n[i];
                            "id" !== t && e.setAttribute(t, s)
                        }
                        for (let i = 0; i < t.childNodes.length; i++) t.childNodes[i].nodeType === this._document.ELEMENT_NODE && e.appendChild(t.childNodes[i].cloneNode(!0));
                        return e
                    }
                    _setSvgAttributes(t, e) {
                        return t.setAttribute("fit", ""), t.setAttribute("height", "100%"), t.setAttribute("width", "100%"), t.setAttribute("preserveAspectRatio", "xMidYMid meet"), t.setAttribute("focusable", "false"), e && e.viewBox && t.setAttribute("viewBox", e.viewBox), t
                    }
                    _fetchIcon(t) {
                        var e;
                        const {
                            url: n,
                            options: i
                        } = t, s = null !== (e = null == i ? void 0 : i.withCredentials) && void 0 !== e && e;
                        if (!this._httpClient) throw Error("Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.");
                        if (null == n) throw Error(`Cannot fetch icon from URL "${n}".`);
                        const r = this._sanitizer.sanitize(Qi.RESOURCE_URL, n);
                        if (!r) throw mv(n);
                        const o = this._inProgressUrlFetches.get(r);
                        if (o) return o;
                        const a = this._httpClient.get(r, {
                            responseType: "text",
                            withCredentials: s
                        }).pipe((l = () => this._inProgressUrlFetches.delete(r), t => t.lift(new Pb(l))), J());
                        var l;
                        return this._inProgressUrlFetches.set(r, a), a
                    }
                    _addSvgIconConfig(t, e, n) {
                        return this._svgIconConfigs.set(vv(t, e), n), this
                    }
                    _addSvgIconSetConfig(t, e) {
                        const n = this._iconSetConfigs.get(t);
                        return n ? n.push(e) : this._iconSetConfigs.set(t, [e]), this
                    }
                    _svgElementFromConfig(t) {
                        if (!t.svgElement) {
                            const e = this._svgElementFromString(t.svgText);
                            this._setSvgAttributes(e, t.options), t.svgElement = e
                        }
                        return t.svgElement
                    }
                    _getIconConfigFromResolvers(t, e) {
                        for (let i = 0; i < this._resolvers.length; i++) {
                            const s = this._resolvers[i](e, t);
                            if (s) return (n = s).url && n.options ? new _v(s.url, null, s.options) : new _v(s, null)
                        }
                        var n
                    }
                }
                return t.\u0275fac = function(e) {
                    return new(e || t)(di(Yb, 8), di(Ih), di(Pc, 8), di(Xi))
                }, t.\u0275prov = lt({
                    factory: function() {
                        return new t(di(Yb, 8), di(Ih), di(Pc, 8), di(Xi))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })();

            function bv(t) {
                return t.cloneNode(!0)
            }

            function vv(t, e) {
                return t + ":" + e
            }
            class wv {
                constructor(t) {
                    this._elementRef = t
                }
            }
            const Cv = Km(wv),
                xv = new Un("mat-icon-location", {
                    providedIn: "root",
                    factory: function() {
                        const t = pi(Pc),
                            e = t ? t.location : null;
                        return {
                            getPathname: () => e ? e.pathname + e.search : ""
                        }
                    }
                }),
                Ev = ["clip-path", "color-profile", "src", "cursor", "fill", "filter", "marker", "marker-start", "marker-mid", "marker-end", "mask", "stroke"],
                Sv = Ev.map(t => `[${t}]`).join(", "),
                kv = /^url\(['"]?#(.*?)['"]?\)$/;
            let Tv = (() => {
                    class t extends Cv {
                        constructor(t, e, n, i, s) {
                            super(t), this._iconRegistry = e, this._location = i, this._errorHandler = s, this._inline = !1, this._currentIconFetch = u.EMPTY, n || t.nativeElement.setAttribute("aria-hidden", "true")
                        }
                        get inline() {
                            return this._inline
                        }
                        set inline(t) {
                            this._inline = su(t)
                        }
                        get svgIcon() {
                            return this._svgIcon
                        }
                        set svgIcon(t) {
                            t !== this._svgIcon && (t ? this._updateSvgIcon(t) : this._svgIcon && this._clearSvgElement(), this._svgIcon = t)
                        }
                        get fontSet() {
                            return this._fontSet
                        }
                        set fontSet(t) {
                            const e = this._cleanupFontValue(t);
                            e !== this._fontSet && (this._fontSet = e, this._updateFontIconClasses())
                        }
                        get fontIcon() {
                            return this._fontIcon
                        }
                        set fontIcon(t) {
                            const e = this._cleanupFontValue(t);
                            e !== this._fontIcon && (this._fontIcon = e, this._updateFontIconClasses())
                        }
                        _splitIconName(t) {
                            if (!t) return ["", ""];
                            const e = t.split(":");
                            switch (e.length) {
                                case 1:
                                    return ["", e[0]];
                                case 2:
                                    return e;
                                default:
                                    throw Error(`Invalid icon name: "${t}"`)
                            }
                        }
                        ngOnInit() {
                            this._updateFontIconClasses()
                        }
                        ngAfterViewChecked() {
                            const t = this._elementsWithExternalReferences;
                            if (t && t.size) {
                                const t = this._location.getPathname();
                                t !== this._previousPath && (this._previousPath = t, this._prependPathToReferences(t))
                            }
                        }
                        ngOnDestroy() {
                            this._currentIconFetch.unsubscribe(), this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear()
                        }
                        _usingFontIcon() {
                            return !this.svgIcon
                        }
                        _setSvgElement(t) {
                            this._clearSvgElement();
                            const e = t.querySelectorAll("style");
                            for (let i = 0; i < e.length; i++) e[i].textContent += " ";
                            const n = this._location.getPathname();
                            this._previousPath = n, this._cacheChildrenWithExternalReferences(t), this._prependPathToReferences(n), this._elementRef.nativeElement.appendChild(t)
                        }
                        _clearSvgElement() {
                            const t = this._elementRef.nativeElement;
                            let e = t.childNodes.length;
                            for (this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear(); e--;) {
                                const n = t.childNodes[e];
                                1 === n.nodeType && "svg" !== n.nodeName.toLowerCase() || t.removeChild(n)
                            }
                        }
                        _updateFontIconClasses() {
                            if (!this._usingFontIcon()) return;
                            const t = this._elementRef.nativeElement,
                                e = this.fontSet ? this._iconRegistry.classNameForFontAlias(this.fontSet) : this._iconRegistry.getDefaultFontSetClass();
                            e != this._previousFontSetClass && (this._previousFontSetClass && t.classList.remove(this._previousFontSetClass), e && t.classList.add(e), this._previousFontSetClass = e), this.fontIcon != this._previousFontIconClass && (this._previousFontIconClass && t.classList.remove(this._previousFontIconClass), this.fontIcon && t.classList.add(this.fontIcon), this._previousFontIconClass = this.fontIcon)
                        }
                        _cleanupFontValue(t) {
                            return "string" == typeof t ? t.trim().split(" ")[0] : t
                        }
                        _prependPathToReferences(t) {
                            const e = this._elementsWithExternalReferences;
                            e && e.forEach((e, n) => {
                                e.forEach(e => {
                                    n.setAttribute(e.name, `url('${t}#${e.value}')`)
                                })
                            })
                        }
                        _cacheChildrenWithExternalReferences(t) {
                            const e = t.querySelectorAll(Sv),
                                n = this._elementsWithExternalReferences = this._elementsWithExternalReferences || new Map;
                            for (let i = 0; i < e.length; i++) Ev.forEach(t => {
                                const s = e[i],
                                    r = s.getAttribute(t),
                                    o = r ? r.match(kv) : null;
                                if (o) {
                                    let e = n.get(s);
                                    e || (e = [], n.set(s, e)), e.push({
                                        name: t,
                                        value: o[1]
                                    })
                                }
                            })
                        }
                        _updateSvgIcon(t) {
                            if (this._svgNamespace = null, this._svgName = null, this._currentIconFetch.unsubscribe(), t) {
                                const [e, n] = this._splitIconName(t);
                                e && (this._svgNamespace = e), n && (this._svgName = n), this._currentIconFetch = this._iconRegistry.getNamedSvgIcon(n, e).pipe(eu(1)).subscribe(t => this._setSvgElement(t), t => {
                                    this._errorHandler.handleError(new Error(`Error retrieving icon ${e}:${n}! ${t.message}`))
                                })
                            }
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(ba), _o(yv), Hn("aria-hidden"), _o(xv), _o(Xi))
                    }, t.\u0275cmp = jt({
                        type: t,
                        selectors: [
                            ["mat-icon"]
                        ],
                        hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
                        hostVars: 7,
                        hostBindings: function(t, e) {
                            2 & t && (fo("data-mat-icon-type", e._usingFontIcon() ? "font" : "svg")("data-mat-icon-name", e._svgName || e.fontIcon)("data-mat-icon-namespace", e._svgNamespace || e.fontSet), Bo("mat-icon-inline", e.inline)("mat-icon-no-color", "primary" !== e.color && "accent" !== e.color && "warn" !== e.color))
                        },
                        inputs: {
                            color: "color",
                            inline: "inline",
                            svgIcon: "svgIcon",
                            fontSet: "fontSet",
                            fontIcon: "fontIcon"
                        },
                        exportAs: ["matIcon"],
                        features: [io],
                        ngContentSelectors: pv,
                        decls: 1,
                        vars: 0,
                        template: function(t, e) {
                            1 & t && (Fo(), Lo(0))
                        },
                        styles: [".mat-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}\n"],
                        encapsulation: 2,
                        changeDetection: 0
                    }), t
                })(),
                Av = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Zm], Zm
                        ]
                    }), t
                })(),
                Dv = (() => {
                    class t {
                        constructor() {
                            this.changes = new x, this.optionalLabel = "Optional"
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })();
            const Rv = {
                provide: Dv,
                deps: [
                    [new ei, new ii, Dv]
                ],
                useFactory: function(t) {
                    return t || new Dv
                }
            };
            let Iv = (() => {
                class t {}
                return t.\u0275mod = qt({
                    type: t
                }), t.\u0275inj = ct({
                    factory: function(e) {
                        return new(e || t)
                    },
                    providers: [Rv, dg],
                    imports: [
                        [Zm, rh, ep, hb, np, Av, Cg], Zm
                    ]
                }), t
            })();

            function Ov(t, e) {}
            class Pv {
                constructor() {
                    this.role = "dialog", this.panelClass = "", this.hasBackdrop = !0, this.backdropClass = "", this.disableClose = !1, this.width = "", this.height = "", this.maxWidth = "80vw", this.data = null, this.ariaDescribedBy = null, this.ariaLabelledBy = null, this.ariaLabel = null, this.autoFocus = !0, this.restoreFocus = !0, this.closeOnNavigation = !0
                }
            }
            const Fv = {
                dialogContainer: lp("dialogContainer", [dp("void, exit", up({
                    opacity: 0,
                    transform: "scale(0.7)"
                })), dp("enter", up({
                    transform: "none"
                })), pp("* => enter", cp("150ms cubic-bezier(0, 0, 0.2, 1)", up({
                    transform: "none",
                    opacity: 1
                }))), pp("* => void, * => exit", cp("75ms cubic-bezier(0.4, 0.0, 0.2, 1)", up({
                    opacity: 0
                })))])
            };
            let Lv = (() => {
                    class t extends Xd {
                        constructor(t, e, n, i, s, r) {
                            super(), this._elementRef = t, this._focusTrapFactory = e, this._changeDetectorRef = n, this._config = s, this._focusMonitor = r, this._animationStateChanged = new ml, this._elementFocusedBeforeDialogWasOpened = null, this._closeInteractionType = null, this.attachDomPortal = t => (this._portalOutlet.hasAttached(), this._portalOutlet.attachDomPortal(t)), this._ariaLabelledBy = s.ariaLabelledBy || null, this._document = i
                        }
                        _initializeWithAttachedContent() {
                            this._setupFocusTrap(), this._capturePreviouslyFocusedElement(), this._focusDialogContainer()
                        }
                        attachComponentPortal(t) {
                            return this._portalOutlet.hasAttached(), this._portalOutlet.attachComponentPortal(t)
                        }
                        attachTemplatePortal(t) {
                            return this._portalOutlet.hasAttached(), this._portalOutlet.attachTemplatePortal(t)
                        }
                        _recaptureFocus() {
                            this._containsFocus() || (!this._config.autoFocus || !this._focusTrap.focusInitialElement()) && this._elementRef.nativeElement.focus()
                        }
                        _trapFocus() {
                            this._config.autoFocus ? this._focusTrap.focusInitialElementWhenReady() : this._containsFocus() || this._elementRef.nativeElement.focus()
                        }
                        _restoreFocus() {
                            const t = this._elementFocusedBeforeDialogWasOpened;
                            if (this._config.restoreFocus && t && "function" == typeof t.focus) {
                                const e = this._getActiveElement(),
                                    n = this._elementRef.nativeElement;
                                e && e !== this._document.body && e !== n && !n.contains(e) || (this._focusMonitor ? (this._focusMonitor.focusVia(t, this._closeInteractionType), this._closeInteractionType = null) : t.focus())
                            }
                            this._focusTrap && this._focusTrap.destroy()
                        }
                        _setupFocusTrap() {
                            this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement)
                        }
                        _capturePreviouslyFocusedElement() {
                            this._document && (this._elementFocusedBeforeDialogWasOpened = this._getActiveElement())
                        }
                        _focusDialogContainer() {
                            this._elementRef.nativeElement.focus && this._elementRef.nativeElement.focus()
                        }
                        _containsFocus() {
                            const t = this._elementRef.nativeElement,
                                e = this._getActiveElement();
                            return t === e || t.contains(e)
                        }
                        _getActiveElement() {
                            var t;
                            const e = this._document.activeElement;
                            return (null === (t = null == e ? void 0 : e.shadowRoot) || void 0 === t ? void 0 : t.activeElement) || e
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(ba), _o(Du), _o(za), _o(Pc, 8), _o(Pv), _o(Fu))
                    }, t.\u0275dir = $t({
                        type: t,
                        viewQuery: function(t, e) {
                            if (1 & t && Al(tp, !0), 2 & t) {
                                let t;
                                Tl(t = Fl()) && (e._portalOutlet = t.first)
                            }
                        },
                        features: [io]
                    }), t
                })(),
                Nv = (() => {
                    class t extends Lv {
                        constructor() {
                            super(...arguments), this._state = "enter"
                        }
                        _onAnimationDone({
                            toState: t,
                            totalTime: e
                        }) {
                            "enter" === t ? (this._trapFocus(), this._animationStateChanged.next({
                                state: "opened",
                                totalTime: e
                            })) : "exit" === t && (this._restoreFocus(), this._animationStateChanged.next({
                                state: "closed",
                                totalTime: e
                            }))
                        }
                        _onAnimationStart({
                            toState: t,
                            totalTime: e
                        }) {
                            "enter" === t ? this._animationStateChanged.next({
                                state: "opening",
                                totalTime: e
                            }) : "exit" !== t && "void" !== t || this._animationStateChanged.next({
                                state: "closing",
                                totalTime: e
                            })
                        }
                        _startExitAnimation() {
                            this._state = "exit", this._changeDetectorRef.markForCheck()
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return Mv(e || t)
                    }, t.\u0275cmp = jt({
                        type: t,
                        selectors: [
                            ["mat-dialog-container"]
                        ],
                        hostAttrs: ["tabindex", "-1", "aria-modal", "true", 1, "mat-dialog-container"],
                        hostVars: 6,
                        hostBindings: function(t, e) {
                            1 & t && Ao("@dialogContainer.start", function(t) {
                                return e._onAnimationStart(t)
                            })("@dialogContainer.done", function(t) {
                                return e._onAnimationDone(t)
                            }), 2 & t && (Ko("id", e._id), fo("role", e._config.role)("aria-labelledby", e._config.ariaLabel ? null : e._ariaLabelledBy)("aria-label", e._config.ariaLabel)("aria-describedby", e._config.ariaDescribedBy || null), Go("@dialogContainer", e._state))
                        },
                        features: [io],
                        decls: 1,
                        vars: 0,
                        consts: [
                            ["cdkPortalOutlet", ""]
                        ],
                        template: function(t, e) {
                            1 & t && mo(0, Ov, 0, 0, "ng-template", 0)
                        },
                        directives: [tp],
                        styles: [".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;box-sizing:content-box;margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],
                        encapsulation: 2,
                        data: {
                            animation: [Fv.dialogContainer]
                        }
                    }), t
                })();
            const Mv = Bn(Nv);
            let Vv = 0;
            class jv {
                constructor(t, e, n = "mat-dialog-" + Vv++) {
                    this._overlayRef = t, this._containerInstance = e, this.id = n, this.disableClose = this._containerInstance._config.disableClose, this._afterOpened = new x, this._afterClosed = new x, this._beforeClosed = new x, this._state = 0, e._id = n, e._animationStateChanged.pipe(Kh(t => "opened" === t.state), eu(1)).subscribe(() => {
                        this._afterOpened.next(), this._afterOpened.complete()
                    }), e._animationStateChanged.pipe(Kh(t => "closed" === t.state), eu(1)).subscribe(() => {
                        clearTimeout(this._closeFallbackTimeout), this._finishDialogClose()
                    }), t.detachments().subscribe(() => {
                        this._beforeClosed.next(this._result), this._beforeClosed.complete(), this._afterClosed.next(this._result), this._afterClosed.complete(), this.componentInstance = null, this._overlayRef.dispose()
                    }), t.keydownEvents().pipe(Kh(t => 27 === t.keyCode && !this.disableClose && ! function(t, ...e) {
                        return e.length ? e.some(e => t[e]) : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey
                    }(t))).subscribe(t => {
                        t.preventDefault(), Bv(this, "keyboard")
                    }), t.backdropClick().subscribe(() => {
                        this.disableClose ? this._containerInstance._recaptureFocus() : Bv(this, "mouse")
                    })
                }
                close(t) {
                    this._result = t, this._containerInstance._animationStateChanged.pipe(Kh(t => "closing" === t.state), eu(1)).subscribe(e => {
                        this._beforeClosed.next(t), this._beforeClosed.complete(), this._overlayRef.detachBackdrop(), this._closeFallbackTimeout = setTimeout(() => this._finishDialogClose(), e.totalTime + 100)
                    }), this._state = 1, this._containerInstance._startExitAnimation()
                }
                afterOpened() {
                    return this._afterOpened
                }
                afterClosed() {
                    return this._afterClosed
                }
                beforeClosed() {
                    return this._beforeClosed
                }
                backdropClick() {
                    return this._overlayRef.backdropClick()
                }
                keydownEvents() {
                    return this._overlayRef.keydownEvents()
                }
                updatePosition(t) {
                    let e = this._getPositionStrategy();
                    return t && (t.left || t.right) ? t.left ? e.left(t.left) : e.right(t.right) : e.centerHorizontally(), t && (t.top || t.bottom) ? t.top ? e.top(t.top) : e.bottom(t.bottom) : e.centerVertically(), this._overlayRef.updatePosition(), this
                }
                updateSize(t = "", e = "") {
                    return this._overlayRef.updateSize({
                        width: t,
                        height: e
                    }), this._overlayRef.updatePosition(), this
                }
                addPanelClass(t) {
                    return this._overlayRef.addPanelClass(t), this
                }
                removePanelClass(t) {
                    return this._overlayRef.removePanelClass(t), this
                }
                getState() {
                    return this._state
                }
                _finishDialogClose() {
                    this._state = 2, this._overlayRef.dispose()
                }
                _getPositionStrategy() {
                    return this._overlayRef.getConfig().positionStrategy
                }
            }

            function Bv(t, e, n) {
                return void 0 !== t._containerInstance && (t._containerInstance._closeInteractionType = e), t.close(n)
            }
            const Hv = new Un("MatDialogData"),
                zv = new Un("mat-dialog-default-options"),
                qv = new Un("mat-dialog-scroll-strategy"),
                Uv = {
                    provide: qv,
                    deps: [Jg],
                    useFactory: function(t) {
                        return () => t.scrollStrategies.block()
                    }
                };
            let $v = (() => {
                    class t {
                        constructor(t, e, n, i, s, r, o, a, l) {
                            var c;
                            this._overlay = t, this._injector = e, this._defaultOptions = n, this._parentDialog = i, this._overlayContainer = s, this._dialogRefConstructor = o, this._dialogContainerType = a, this._dialogDataToken = l, this._openDialogsAtThisLevel = [], this._afterAllClosedAtThisLevel = new x, this._afterOpenedAtThisLevel = new x, this._ariaHiddenElements = new Map, this.afterAllClosed = (c = () => this.openDialogs.length ? this._getAfterAllClosed() : this._getAfterAllClosed().pipe(id(void 0)), new y(t => {
                                let e;
                                try {
                                    e = c()
                                } catch (n) {
                                    return void t.error(n)
                                }
                                return (e ? N(e) : tu()).subscribe(t)
                            })), this._scrollStrategy = r
                        }
                        get openDialogs() {
                            return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel
                        }
                        get afterOpened() {
                            return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel
                        }
                        _getAfterAllClosed() {
                            const t = this._parentDialog;
                            return t ? t._getAfterAllClosed() : this._afterAllClosedAtThisLevel
                        }
                        open(t, e) {
                            (e = function(t, e) {
                                return Object.assign(Object.assign({}, e), t)
                            }(e, this._defaultOptions || new Pv)).id && this.getDialogById(e.id);
                            const n = this._createOverlay(e),
                                i = this._attachDialogContainer(n, e),
                                s = this._attachDialogContent(t, i, n, e);
                            return this.openDialogs.length || this._hideNonDialogContentFromAssistiveTechnology(), this.openDialogs.push(s), s.afterClosed().subscribe(() => this._removeOpenDialog(s)), this.afterOpened.next(s), i._initializeWithAttachedContent(), s
                        }
                        closeAll() {
                            this._closeDialogs(this.openDialogs)
                        }
                        getDialogById(t) {
                            return this.openDialogs.find(e => e.id === t)
                        }
                        ngOnDestroy() {
                            this._closeDialogs(this._openDialogsAtThisLevel), this._afterAllClosedAtThisLevel.complete(), this._afterOpenedAtThisLevel.complete()
                        }
                        _createOverlay(t) {
                            const e = this._getOverlayConfig(t);
                            return this._overlay.create(e)
                        }
                        _getOverlayConfig(t) {
                            const e = new Pg({
                                positionStrategy: this._overlay.position().global(),
                                scrollStrategy: t.scrollStrategy || this._scrollStrategy(),
                                panelClass: t.panelClass,
                                hasBackdrop: t.hasBackdrop,
                                direction: t.direction,
                                minWidth: t.minWidth,
                                minHeight: t.minHeight,
                                maxWidth: t.maxWidth,
                                maxHeight: t.maxHeight,
                                disposeOnNavigation: t.closeOnNavigation
                            });
                            return t.backdropClass && (e.backdropClass = t.backdropClass), e
                        }
                        _attachDialogContainer(t, e) {
                            const n = eo.create({
                                    parent: e && e.viewContainerRef && e.viewContainerRef.injector || this._injector,
                                    providers: [{
                                        provide: Pv,
                                        useValue: e
                                    }]
                                }),
                                i = new Kd(this._dialogContainerType, e.viewContainerRef, n, e.componentFactoryResolver);
                            return t.attach(i).instance
                        }
                        _attachDialogContent(t, e, n, i) {
                            const s = new this._dialogRefConstructor(n, e, i.id);
                            if (t instanceof Za) e.attachTemplatePortal(new Gd(t, null, {
                                $implicit: i.data,
                                dialogRef: s
                            }));
                            else {
                                const n = this._createInjector(i, s, e),
                                    r = e.attachComponentPortal(new Kd(t, i.viewContainerRef, n));
                                s.componentInstance = r.instance
                            }
                            return s.updateSize(i.width, i.height).updatePosition(i.position), s
                        }
                        _createInjector(t, e, n) {
                            const i = t && t.viewContainerRef && t.viewContainerRef.injector,
                                s = [{
                                    provide: this._dialogContainerType,
                                    useValue: n
                                }, {
                                    provide: this._dialogDataToken,
                                    useValue: t.data
                                }, {
                                    provide: this._dialogRefConstructor,
                                    useValue: e
                                }];
                            return !t.direction || i && i.get(rd, null) || s.push({
                                provide: rd,
                                useValue: {
                                    value: t.direction,
                                    change: Nh()
                                }
                            }), eo.create({
                                parent: i || this._injector,
                                providers: s
                            })
                        }
                        _removeOpenDialog(t) {
                            const e = this.openDialogs.indexOf(t);
                            e > -1 && (this.openDialogs.splice(e, 1), this.openDialogs.length || (this._ariaHiddenElements.forEach((t, e) => {
                                t ? e.setAttribute("aria-hidden", t) : e.removeAttribute("aria-hidden")
                            }), this._ariaHiddenElements.clear(), this._getAfterAllClosed().next()))
                        }
                        _hideNonDialogContentFromAssistiveTechnology() {
                            const t = this._overlayContainer.getContainerElement();
                            if (t.parentElement) {
                                const e = t.parentElement.children;
                                for (let n = e.length - 1; n > -1; n--) {
                                    let i = e[n];
                                    i === t || "SCRIPT" === i.nodeName || "STYLE" === i.nodeName || i.hasAttribute("aria-live") || (this._ariaHiddenElements.set(i, i.getAttribute("aria-hidden")), i.setAttribute("aria-hidden", "true"))
                                }
                            }
                        }
                        _closeDialogs(t) {
                            let e = t.length;
                            for (; e--;) t[e].close()
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(Jg), _o(eo), _o(void 0), _o(void 0), _o(Bg), _o(void 0), _o($n), _o($n), _o(Un))
                    }, t.\u0275dir = $t({
                        type: t
                    }), t
                })(),
                Wv = (() => {
                    class t extends $v {
                        constructor(t, e, n, i, s, r, o) {
                            super(t, e, i, r, o, s, jv, Nv, Hv)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Jg), di(eo), di(Wc, 8), di(zv, 8), di(qv), di(t, 12), di(Bg))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac
                    }), t
                })(),
                Zv = 0,
                Qv = (() => {
                    class t {
                        constructor(t, e, n) {
                            this.dialogRef = t, this._elementRef = e, this._dialog = n, this.type = "button"
                        }
                        ngOnInit() {
                            this.dialogRef || (this.dialogRef = Xv(this._elementRef, this._dialog.openDialogs))
                        }
                        ngOnChanges(t) {
                            const e = t._matDialogClose || t._matDialogCloseResult;
                            e && (this.dialogResult = e.currentValue)
                        }
                        _onButtonClick(t) {
                            Bv(this.dialogRef, 0 === t.screenX && 0 === t.screenY ? "keyboard" : "mouse", this.dialogResult)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(jv, 8), _o(ba), _o(Wv))
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "mat-dialog-close", ""],
                            ["", "matDialogClose", ""]
                        ],
                        hostVars: 2,
                        hostBindings: function(t, e) {
                            1 & t && To("click", function(t) {
                                return e._onButtonClick(t)
                            }), 2 & t && fo("aria-label", e.ariaLabel || null)("type", e.type)
                        },
                        inputs: {
                            type: "type",
                            dialogResult: ["mat-dialog-close", "dialogResult"],
                            ariaLabel: ["aria-label", "ariaLabel"],
                            _matDialogClose: ["matDialogClose", "_matDialogClose"]
                        },
                        exportAs: ["matDialogClose"],
                        features: [le]
                    }), t
                })(),
                Kv = (() => {
                    class t {
                        constructor(t, e, n) {
                            this._dialogRef = t, this._elementRef = e, this._dialog = n, this.id = "mat-dialog-title-" + Zv++
                        }
                        ngOnInit() {
                            this._dialogRef || (this._dialogRef = Xv(this._elementRef, this._dialog.openDialogs)), this._dialogRef && Promise.resolve().then(() => {
                                const t = this._dialogRef._containerInstance;
                                t && !t._ariaLabelledBy && (t._ariaLabelledBy = this.id)
                            })
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(jv, 8), _o(ba), _o(Wv))
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "mat-dialog-title", ""],
                            ["", "matDialogTitle", ""]
                        ],
                        hostAttrs: [1, "mat-dialog-title"],
                        hostVars: 1,
                        hostBindings: function(t, e) {
                            2 & t && Ko("id", e.id)
                        },
                        inputs: {
                            id: "id"
                        },
                        exportAs: ["matDialogTitle"]
                    }), t
                })(),
                Gv = (() => {
                    class t {}
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "mat-dialog-content", ""],
                            ["mat-dialog-content"],
                            ["", "matDialogContent", ""]
                        ],
                        hostAttrs: [1, "mat-dialog-content"]
                    }), t
                })(),
                Yv = (() => {
                    class t {}
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["", "mat-dialog-actions", ""],
                            ["mat-dialog-actions"],
                            ["", "matDialogActions", ""]
                        ],
                        hostAttrs: [1, "mat-dialog-actions"]
                    }), t
                })();

            function Xv(t, e) {
                let n = t.nativeElement.parentElement;
                for (; n && !n.classList.contains("mat-dialog-container");) n = n.parentElement;
                return n ? e.find(t => t.id === n.id) : null
            }
            let Jv = (() => {
                class t {}
                return t.\u0275mod = qt({
                    type: t
                }), t.\u0275inj = ct({
                    factory: function(e) {
                        return new(e || t)
                    },
                    providers: [Wv, Uv],
                    imports: [
                        [e_, ep, Zm], Zm
                    ]
                }), t
            })();
            const tw = yu({
                passive: !0
            });
            let ew = (() => {
                    class t {
                        constructor(t, e) {
                            this._platform = t, this._ngZone = e, this._monitoredElements = new Map
                        }
                        monitor(t) {
                            if (!this._platform.isBrowser) return Jh;
                            const e = lu(t),
                                n = this._monitoredElements.get(e);
                            if (n) return n.subject;
                            const i = new x,
                                s = "cdk-text-field-autofilled",
                                r = t => {
                                    "cdk-text-field-autofill-start" !== t.animationName || e.classList.contains(s) ? "cdk-text-field-autofill-end" === t.animationName && e.classList.contains(s) && (e.classList.remove(s), this._ngZone.run(() => i.next({
                                        target: t.target,
                                        isAutofilled: !1
                                    }))) : (e.classList.add(s), this._ngZone.run(() => i.next({
                                        target: t.target,
                                        isAutofilled: !0
                                    })))
                                };
                            return this._ngZone.runOutsideAngular(() => {
                                e.addEventListener("animationstart", r, tw), e.classList.add("cdk-text-field-autofill-monitored")
                            }), this._monitoredElements.set(e, {
                                subject: i,
                                unlisten: () => {
                                    e.removeEventListener("animationstart", r, tw)
                                }
                            }), i
                        }
                        stopMonitoring(t) {
                            const e = lu(t),
                                n = this._monitoredElements.get(e);
                            n && (n.unlisten(), n.subject.complete(), e.classList.remove("cdk-text-field-autofill-monitored"), e.classList.remove("cdk-text-field-autofilled"), this._monitoredElements.delete(e))
                        }
                        ngOnDestroy() {
                            this._monitoredElements.forEach((t, e) => this.stopMonitoring(e))
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(uu), di(rc))
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t(di(uu), di(rc))
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })(),
                nw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [du]
                        ]
                    }), t
                })();
            const iw = new Un("MAT_INPUT_VALUE_ACCESSOR"),
                sw = ["button", "checkbox", "file", "hidden", "image", "radio", "range", "reset", "submit"];
            let rw = 0;
            class ow {
                constructor(t, e, n, i) {
                    this._defaultErrorStateMatcher = t, this._parentForm = e, this._parentFormGroup = n, this.ngControl = i
                }
            }
            const aw = Xm(ow);
            let lw = (() => {
                    class t extends aw {
                        constructor(t, e, n, i, s, r, o, a, l, c) {
                            super(r, i, s, n), this._elementRef = t, this._platform = e, this.ngControl = n, this._autofillMonitor = a, this._formField = c, this._uid = "mat-input-" + rw++, this.focused = !1, this.stateChanges = new x, this.controlType = "mat-input", this.autofilled = !1, this._disabled = !1, this._required = !1, this._type = "text", this._readonly = !1, this._neverEmptyInputTypes = ["date", "datetime", "datetime-local", "month", "time", "week"].filter(t => fu().has(t));
                            const h = this._elementRef.nativeElement,
                                u = h.nodeName.toLowerCase();
                            this._inputValueAccessor = o || h, this._previousNativeValue = this.value, this.id = this.id, e.IOS && l.runOutsideAngular(() => {
                                t.nativeElement.addEventListener("keyup", t => {
                                    let e = t.target;
                                    e.value || e.selectionStart || e.selectionEnd || (e.setSelectionRange(1, 1), e.setSelectionRange(0, 0))
                                })
                            }), this._isServer = !this._platform.isBrowser, this._isNativeSelect = "select" === u, this._isTextarea = "textarea" === u, this._isNativeSelect && (this.controlType = h.multiple ? "mat-native-select-multiple" : "mat-native-select")
                        }
                        get disabled() {
                            return this.ngControl && null !== this.ngControl.disabled ? this.ngControl.disabled : this._disabled
                        }
                        set disabled(t) {
                            this._disabled = su(t), this.focused && (this.focused = !1, this.stateChanges.next())
                        }
                        get id() {
                            return this._id
                        }
                        set id(t) {
                            this._id = t || this._uid
                        }
                        get required() {
                            return this._required
                        }
                        set required(t) {
                            this._required = su(t)
                        }
                        get type() {
                            return this._type
                        }
                        set type(t) {
                            this._type = t || "text", this._validateType(), !this._isTextarea && fu().has(this._type) && (this._elementRef.nativeElement.type = this._type)
                        }
                        get value() {
                            return this._inputValueAccessor.value
                        }
                        set value(t) {
                            t !== this.value && (this._inputValueAccessor.value = t, this.stateChanges.next())
                        }
                        get readonly() {
                            return this._readonly
                        }
                        set readonly(t) {
                            this._readonly = su(t)
                        }
                        ngAfterViewInit() {
                            this._platform.isBrowser && this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(t => {
                                this.autofilled = t.isAutofilled, this.stateChanges.next()
                            })
                        }
                        ngOnChanges() {
                            this.stateChanges.next()
                        }
                        ngOnDestroy() {
                            this.stateChanges.complete(), this._platform.isBrowser && this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement)
                        }
                        ngDoCheck() {
                            this.ngControl && this.updateErrorState(), this._dirtyCheckNativeValue(), this._dirtyCheckPlaceholder()
                        }
                        focus(t) {
                            this._elementRef.nativeElement.focus(t)
                        }
                        _focusChanged(t) {
                            t === this.focused || this.readonly && t || (this.focused = t, this.stateChanges.next())
                        }
                        _onInput() {}
                        _dirtyCheckPlaceholder() {
                            var t, e;
                            const n = (null === (e = null === (t = this._formField) || void 0 === t ? void 0 : t._hideControlPlaceholder) || void 0 === e ? void 0 : e.call(t)) ? null : this.placeholder;
                            if (n !== this._previousPlaceholder) {
                                const t = this._elementRef.nativeElement;
                                this._previousPlaceholder = n, n ? t.setAttribute("placeholder", n) : t.removeAttribute("placeholder")
                            }
                        }
                        _dirtyCheckNativeValue() {
                            const t = this._elementRef.nativeElement.value;
                            this._previousNativeValue !== t && (this._previousNativeValue = t, this.stateChanges.next())
                        }
                        _validateType() {
                            sw.indexOf(this._type)
                        }
                        _isNeverEmpty() {
                            return this._neverEmptyInputTypes.indexOf(this._type) > -1
                        }
                        _isBadInput() {
                            let t = this._elementRef.nativeElement.validity;
                            return t && t.badInput
                        }
                        get empty() {
                            return !(this._isNeverEmpty() || this._elementRef.nativeElement.value || this._isBadInput() || this.autofilled)
                        }
                        get shouldLabelFloat() {
                            if (this._isNativeSelect) {
                                const t = this._elementRef.nativeElement,
                                    e = t.options[0];
                                return this.focused || t.multiple || !this.empty || !!(t.selectedIndex > -1 && e && e.label)
                            }
                            return this.focused || !this.empty
                        }
                        setDescribedByIds(t) {
                            t.length ? this._elementRef.nativeElement.setAttribute("aria-describedby", t.join(" ")) : this._elementRef.nativeElement.removeAttribute("aria-describedby")
                        }
                        onContainerClick() {
                            this.focused || this.focus()
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(ba), _o(uu), _o(D_, 10), _o(dy, 8), _o(_y, 8), _o(dg), _o(iw, 10), _o(ew), _o(rc), _o(Yy, 8))
                    }, t.\u0275dir = $t({
                        type: t,
                        selectors: [
                            ["input", "matInput", ""],
                            ["textarea", "matInput", ""],
                            ["select", "matNativeControl", ""],
                            ["input", "matNativeControl", ""],
                            ["textarea", "matNativeControl", ""]
                        ],
                        hostAttrs: [1, "mat-input-element", "mat-form-field-autofill-control"],
                        hostVars: 9,
                        hostBindings: function(t, e) {
                            1 & t && To("focus", function() {
                                return e._focusChanged(!0)
                            })("blur", function() {
                                return e._focusChanged(!1)
                            })("input", function() {
                                return e._onInput()
                            }), 2 & t && (Ko("disabled", e.disabled)("required", e.required), fo("id", e.id)("data-placeholder", e.placeholder)("readonly", e.readonly && !e._isNativeSelect || null)("aria-invalid", e.errorState && !e.empty)("aria-required", e.required), Bo("mat-input-server", e._isServer))
                        },
                        inputs: {
                            id: "id",
                            disabled: "disabled",
                            required: "required",
                            type: "type",
                            value: "value",
                            readonly: "readonly",
                            placeholder: "placeholder",
                            errorStateMatcher: "errorStateMatcher",
                            userAriaDescribedBy: ["aria-describedby", "userAriaDescribedBy"]
                        },
                        exportAs: ["matInput"],
                        features: [da([{
                            provide: jy,
                            useExisting: t
                        }]), io, le]
                    }), t
                })(),
                cw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [dg],
                        imports: [
                            [nw, Jy, Zm], nw, Jy
                        ]
                    }), t
                })(),
                hw = (() => {
                    class t {
                        constructor() {
                            this.changes = new x, this.calendarLabel = "Calendar", this.openCalendarLabel = "Open calendar", this.closeCalendarLabel = "Close calendar", this.prevMonthLabel = "Previous month", this.nextMonthLabel = "Next month", this.prevYearLabel = "Previous year", this.nextYearLabel = "Next year", this.prevMultiYearLabel = "Previous 20 years", this.nextMultiYearLabel = "Next 20 years", this.switchToMonthViewLabel = "Choose date", this.switchToMultiYearViewLabel = "Choose month and year"
                        }
                        formatYearRange(t, e) {
                            return `${t} \u2013 ${e}`
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })();
            const uw = {
                provide: new Un("mat-datepicker-scroll-strategy"),
                deps: [Jg],
                useFactory: function(t) {
                    return () => t.scrollStrategies.reposition()
                }
            };
            let dw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [hw, uw],
                        imports: [
                            [rh, hb, Jv, e_, Bu, ep, Zm], cd
                        ]
                    }), t
                })(),
                pw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Zm], Zm
                        ]
                    }), t
                })(),
                fw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })(),
                mw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [rh, Zm, fw, ep]
                        ]
                    }), t
                })(),
                gw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [pg, Zm], pg, Zm
                        ]
                    }), t
                })(),
                _w = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [pg, Cg, Zm, xg, rh], pg, Zm, xg, pw
                        ]
                    }), t
                })();
            const yw = {
                provide: new Un("mat-menu-scroll-strategy"),
                deps: [Jg],
                useFactory: function(t) {
                    return () => t.scrollStrategies.reposition()
                }
            };
            let bw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [yw],
                        imports: [Zm]
                    }), t
                })(),
                vw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [yw],
                        imports: [
                            [rh, Zm, Cg, e_, bw], cd, Zm, bw
                        ]
                    }), t
                })();
            const ww = {
                provide: new Un("mat-select-scroll-strategy"),
                deps: [Jg],
                useFactory: function(t) {
                    return () => t.scrollStrategies.reposition()
                }
            };
            let Cw = (() => {
                class t {}
                return t.\u0275mod = qt({
                    type: t
                }), t.\u0275inj = ct({
                    factory: function(e) {
                        return new(e || t)
                    },
                    providers: [ww],
                    imports: [
                        [rh, e_, Eg, Zm], cd, Jy, Eg, Zm
                    ]
                }), t
            })();
            const xw = {
                provide: new Un("mat-tooltip-scroll-strategy"),
                deps: [Jg],
                useFactory: function(t) {
                    return () => t.scrollStrategies.reposition({
                        scrollThrottle: 20
                    })
                }
            };
            let Ew = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [xw],
                        imports: [
                            [Bu, rh, e_, Zm], Zm, cd
                        ]
                    }), t
                })(),
                Sw = (() => {
                    class t {
                        constructor() {
                            this.changes = new x, this.itemsPerPageLabel = "Items per page:", this.nextPageLabel = "Next page", this.previousPageLabel = "Previous page", this.firstPageLabel = "First page", this.lastPageLabel = "Last page", this.getRangeLabel = (t, e, n) => {
                                if (0 == n || 0 == e) return "0 of " + n;
                                const i = t * e;
                                return `${i+1} \u2013 ${i<(n=Math.max(n,0))?Math.min(i+e,n):i+e} of ${n}`
                            }
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })();
            const kw = {
                provide: Sw,
                deps: [
                    [new ei, new ii, Sw]
                ],
                useFactory: function(t) {
                    return t || new Sw
                }
            };
            let Tw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [kw],
                        imports: [
                            [rh, hb, Cw, Ew, Zm]
                        ]
                    }), t
                })(),
                Aw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [rh, Zm], Zm
                        ]
                    }), t
                })(),
                Dw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Zm, rh], Zm
                        ]
                    }), t
                })(),
                Rw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Cg, Zm], Zm
                        ]
                    }), t
                })(),
                Iw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [rh, Zm, du, cd], cd, Zm
                        ]
                    }), t
                })(),
                Ow = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [rh, Zm], Zm
                        ]
                    }), t
                })();
            const Pw = ["thumbContainer"],
                Fw = ["toggleBar"],
                Lw = ["input"],
                Nw = function() {
                    return {
                        enterDuration: 150
                    }
                },
                Mw = ["*"],
                Vw = new Un("mat-slide-toggle-default-options", {
                    providedIn: "root",
                    factory: () => ({
                        disableToggleValue: !1
                    })
                });
            let jw = 0;
            const Bw = {
                provide: s_,
                useExisting: rt(() => Uw),
                multi: !0
            };
            class Hw {
                constructor(t, e) {
                    this.source = t, this.checked = e
                }
            }
            class zw {
                constructor(t) {
                    this._elementRef = t
                }
            }
            const qw = Ym(Km(Gm(Qm(zw)), "accent"));
            let Uw = (() => {
                    class t extends qw {
                        constructor(t, e, n, i, s, r) {
                            super(t), this._focusMonitor = e, this._changeDetectorRef = n, this.defaults = s, this._animationMode = r, this._onChange = t => {}, this._onTouched = () => {}, this._uniqueId = "mat-slide-toggle-" + ++jw, this._required = !1, this._checked = !1, this.name = null, this.id = this._uniqueId, this.labelPosition = "after", this.ariaLabel = null, this.ariaLabelledby = null, this.change = new ml, this.toggleChange = new ml, this.tabIndex = parseInt(i) || 0
                        }
                        get required() {
                            return this._required
                        }
                        set required(t) {
                            this._required = su(t)
                        }
                        get checked() {
                            return this._checked
                        }
                        set checked(t) {
                            this._checked = su(t), this._changeDetectorRef.markForCheck()
                        }
                        get inputId() {
                            return (this.id || this._uniqueId) + "-input"
                        }
                        ngAfterContentInit() {
                            this._focusMonitor.monitor(this._elementRef, !0).subscribe(t => {
                                "keyboard" === t || "program" === t ? this._inputElement.nativeElement.focus() : t || Promise.resolve().then(() => this._onTouched())
                            })
                        }
                        ngOnDestroy() {
                            this._focusMonitor.stopMonitoring(this._elementRef)
                        }
                        _onChangeEvent(t) {
                            t.stopPropagation(), this.toggleChange.emit(), this.defaults.disableToggleValue ? this._inputElement.nativeElement.checked = this.checked : (this.checked = this._inputElement.nativeElement.checked, this._emitChangeEvent())
                        }
                        _onInputClick(t) {
                            t.stopPropagation()
                        }
                        writeValue(t) {
                            this.checked = !!t
                        }
                        registerOnChange(t) {
                            this._onChange = t
                        }
                        registerOnTouched(t) {
                            this._onTouched = t
                        }
                        setDisabledState(t) {
                            this.disabled = t, this._changeDetectorRef.markForCheck()
                        }
                        focus(t, e) {
                            e ? this._focusMonitor.focusVia(this._inputElement, e, t) : this._inputElement.nativeElement.focus(t)
                        }
                        toggle() {
                            this.checked = !this.checked, this._onChange(this.checked)
                        }
                        _emitChangeEvent() {
                            this._onChange(this.checked), this.change.emit(new Hw(this, this.checked))
                        }
                        _onLabelTextChange() {
                            this._changeDetectorRef.detectChanges()
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(ba), _o(Fu), _o(za), Hn("tabindex"), _o(Vw), _o(zm, 8))
                    }, t.\u0275cmp = jt({
                        type: t,
                        selectors: [
                            ["mat-slide-toggle"]
                        ],
                        viewQuery: function(t, e) {
                            if (1 & t && (Dl(Pw, !0), Dl(Fw, !0), Dl(Lw, !0)), 2 & t) {
                                let t;
                                Tl(t = Fl()) && (e._thumbEl = t.first), Tl(t = Fl()) && (e._thumbBarEl = t.first), Tl(t = Fl()) && (e._inputElement = t.first)
                            }
                        },
                        hostAttrs: [1, "mat-slide-toggle"],
                        hostVars: 12,
                        hostBindings: function(t, e) {
                            2 & t && (Ko("id", e.id), fo("tabindex", e.disabled ? null : -1)("aria-label", null)("aria-labelledby", null), Bo("mat-checked", e.checked)("mat-disabled", e.disabled)("mat-slide-toggle-label-before", "before" == e.labelPosition)("_mat-animation-noopable", "NoopAnimations" === e._animationMode))
                        },
                        inputs: {
                            disabled: "disabled",
                            disableRipple: "disableRipple",
                            color: "color",
                            tabIndex: "tabIndex",
                            name: "name",
                            id: "id",
                            labelPosition: "labelPosition",
                            ariaLabel: ["aria-label", "ariaLabel"],
                            ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
                            required: "required",
                            checked: "checked"
                        },
                        outputs: {
                            change: "change",
                            toggleChange: "toggleChange"
                        },
                        exportAs: ["matSlideToggle"],
                        features: [da([Bw]), io],
                        ngContentSelectors: Mw,
                        decls: 16,
                        vars: 18,
                        consts: [
                            [1, "mat-slide-toggle-label"],
                            ["label", ""],
                            [1, "mat-slide-toggle-bar"],
                            ["toggleBar", ""],
                            ["type", "checkbox", "role", "switch", 1, "mat-slide-toggle-input", "cdk-visually-hidden", 3, "id", "required", "tabIndex", "checked", "disabled", "change", "click"],
                            ["input", ""],
                            [1, "mat-slide-toggle-thumb-container"],
                            ["thumbContainer", ""],
                            [1, "mat-slide-toggle-thumb"],
                            ["mat-ripple", "", 1, "mat-slide-toggle-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered", "matRippleRadius", "matRippleAnimation"],
                            [1, "mat-ripple-element", "mat-slide-toggle-persistent-ripple"],
                            [1, "mat-slide-toggle-content", 3, "cdkObserveContent"],
                            ["labelContent", ""],
                            [2, "display", "none"]
                        ],
                        template: function(t, e) {
                            if (1 & t && (Fo(), vo(0, "label", 0, 1), vo(2, "div", 2, 3), vo(4, "input", 4, 5), To("change", function(t) {
                                    return e._onChangeEvent(t)
                                })("click", function(t) {
                                    return e._onInputClick(t)
                                }), wo(), vo(6, "div", 6, 7), Co(8, "div", 8), vo(9, "div", 9), Co(10, "div", 10), wo(), wo(), wo(), vo(11, "span", 11, 12), To("cdkObserveContent", function() {
                                    return e._onLabelTextChange()
                                }), vo(13, "span", 13), Wo(14, "\xa0"), wo(), Lo(15), wo(), wo()), 2 & t) {
                                const t = go(1),
                                    n = go(12);
                                fo("for", e.inputId), qs(2), Bo("mat-slide-toggle-bar-no-side-margin", !n.textContent || !n.textContent.trim()), qs(2), yo("id", e.inputId)("required", e.required)("tabIndex", e.tabIndex)("checked", e.checked)("disabled", e.disabled), fo("name", e.name)("aria-checked", e.checked.toString())("aria-label", e.ariaLabel)("aria-labelledby", e.ariaLabelledby), qs(5), yo("matRippleTrigger", t)("matRippleDisabled", e.disableRipple || e.disabled)("matRippleCentered", !0)("matRippleRadius", 20)("matRippleAnimation", fl(17, Nw))
                            }
                        },
                        directives: [wg, xu],
                        styles: [".mat-slide-toggle{display:inline-block;height:24px;max-width:100%;line-height:24px;white-space:nowrap;outline:none;-webkit-tap-highlight-color:transparent}.mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(16px, 0, 0)}[dir=rtl] .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(-16px, 0, 0)}.mat-slide-toggle.mat-disabled{opacity:.38}.mat-slide-toggle.mat-disabled .mat-slide-toggle-label,.mat-slide-toggle.mat-disabled .mat-slide-toggle-thumb-container{cursor:default}.mat-slide-toggle-label{display:none;flex:1;flex-direction:row;align-items:center;height:inherit;cursor:pointer}.mat-slide-toggle-content{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-slide-toggle-label-before .mat-slide-toggle-label{order:1}.mat-slide-toggle-label-before .mat-slide-toggle-bar{order:2}[dir=rtl] .mat-slide-toggle-label-before .mat-slide-toggle-bar,.mat-slide-toggle-bar{margin-right:8px;margin-left:0}[dir=rtl] .mat-slide-toggle-bar,.mat-slide-toggle-label-before .mat-slide-toggle-bar{margin-left:8px;margin-right:0}.mat-slide-toggle-bar-no-side-margin{margin-left:0;margin-right:0}.mat-slide-toggle-thumb-container{position:absolute;z-index:1;width:20px;height:20px;top:-3px;left:0;transform:translate3d(0, 0, 0);transition:all 80ms linear;transition-property:transform}._mat-animation-noopable .mat-slide-toggle-thumb-container{transition:none}[dir=rtl] .mat-slide-toggle-thumb-container{left:auto;right:0}.mat-slide-toggle-thumb{height:20px;width:20px;border-radius:50%}.mat-slide-toggle-bar{position:relative;width:36px;height:14px;flex-shrink:0;border-radius:8px}.mat-slide-toggle-input{bottom:0;left:10px}[dir=rtl] .mat-slide-toggle-input{left:auto;right:10px}.mat-slide-toggle-bar,.mat-slide-toggle-thumb{transition:all 80ms linear;transition-property:background-color;transition-delay:50ms}._mat-animation-noopable .mat-slide-toggle-bar,._mat-animation-noopable .mat-slide-toggle-thumb{transition:none}.mat-slide-toggle .mat-slide-toggle-ripple{position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.mat-slide-toggle .mat-slide-toggle-ripple .mat-ripple-element:not(.mat-slide-toggle-persistent-ripple){opacity:.12}.mat-slide-toggle-persistent-ripple{width:100%;height:100%;transform:none}.mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{opacity:.04}.mat-slide-toggle:not(.mat-disabled).cdk-keyboard-focused .mat-slide-toggle-persistent-ripple{opacity:.12}.mat-slide-toggle-persistent-ripple,.mat-slide-toggle.mat-disabled .mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{opacity:0}@media(hover: none){.mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{display:none}}.cdk-high-contrast-active .mat-slide-toggle-thumb,.cdk-high-contrast-active .mat-slide-toggle-bar{border:1px solid}.cdk-high-contrast-active .mat-slide-toggle.cdk-keyboard-focused .mat-slide-toggle-bar{outline:2px dotted;outline-offset:5px}\n"],
                        encapsulation: 2,
                        changeDetection: 0
                    }), t
                })(),
                $w = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        }
                    }), t
                })(),
                Ww = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [$w, Cg, Zm, Eu], $w, Zm
                        ]
                    }), t
                })(),
                Zw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [e_, ep, rh, hb, Zm], Zm
                        ]
                    }), t
                })(),
                Qw = (() => {
                    class t {
                        constructor() {
                            this.changes = new x, this.sortButtonLabel = t => "Change sorting for " + t
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        factory: function() {
                            return new t
                        },
                        token: t,
                        providedIn: "root"
                    }), t
                })();
            const Kw = {
                provide: Qw,
                deps: [
                    [new ei, new ii, Qw]
                ],
                useFactory: function(t) {
                    return t || new Qw
                }
            };
            let Gw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [Kw],
                        imports: [
                            [rh, Zm]
                        ]
                    }), t
                })(),
                Yw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [ip, Zm], Zm
                        ]
                    }), t
                })(),
                Xw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [rh, Zm, ep, Cg, Eu, Bu], Zm
                        ]
                    }), t
                })(),
                Jw = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [Zm], Zm
                        ]
                    }), t
                })(),
                tC = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [sp, Zm], Zm
                        ]
                    }), t
                })(),
                eC = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [Bu, Hu, np, ip, sp, Zd, eb, nb, ib, hb, ub, db, kb, Db, Iv, dw, Jv, pw, mw, gw, Av, cw, _w, vw, ug, Tw, Aw, Dw, Rw, Cg, Cw, Iw, Ow, Ww, Zw, Gw, Yw, Xw, Jw, Ew, tC, e_, ep, hd]
                    }), t
                })();
            class nC {
                constructor(t) {
                    this.durationSelector = t
                }
                call(t, e) {
                    return e.subscribe(new iC(t, this.durationSelector))
                }
            }
            class iC extends V {
                constructor(t, e) {
                    super(t), this.durationSelector = e, this.hasValue = !1
                }
                _next(t) {
                    try {
                        const e = this.durationSelector.call(this, t);
                        e && this._tryNext(t, e)
                    } catch (e) {
                        this.destination.error(e)
                    }
                }
                _complete() {
                    this.emitValue(), this.destination.complete()
                }
                _tryNext(t, e) {
                    let n = this.durationSubscription;
                    this.value = t, this.hasValue = !0, n && (n.unsubscribe(), this.remove(n)), n = j(e, new M(this)), n && !n.closed && this.add(this.durationSubscription = n)
                }
                notifyNext() {
                    this.emitValue()
                }
                notifyComplete() {
                    this.emitValue()
                }
                emitValue() {
                    if (this.hasValue) {
                        const t = this.value,
                            e = this.durationSubscription;
                        e && (this.durationSubscription = void 0, e.unsubscribe(), this.remove(e)), this.value = void 0, this.hasValue = !1, super._next(t)
                    }
                }
            }
            class sC {
                constructor(t, e) {
                    this.x = t, this.y = e
                }
                get style() {
                    return {
                        x: this.x + "px",
                        y: this.y + "px"
                    }
                }
            }
            class rC {
                constructor(t, e) {
                    let n = 0,
                        i = 0,
                        s = 0,
                        r = 0;
                    t && e && (n = Math.abs(t.y - e.y), i = Math.abs(t.x - e.x), s = Math.min(t.y, e.y), r = Math.min(t.x, e.x)), this.height = n + "px", this.width = i + "px", this.start = new sC(r, s)
                }
            }
            class oC {
                constructor() {
                    this.start = null, this.end = null, this.stopped = !0
                }
            }
            //initial class
            class aC {
                constructor() {
                    this.greekingEnabled = 1, this.blurImagesEnabled = 1, this.blurImageRolesEnabled = 1, this.blurObjectsEnabled = 1, this.blurSvgsEnabled = 1, this.blurBackgroundImagesEnabled = 1, this.blurLargeEmptyElementsEnabled = 1, this.blurLargeEmptyElementParentsEnabled = 1, this.blurLargeEmptyElementsSquare = 4e4, this.blurVideosEnabled = 1, this.blurIframeEnabled = 1, this.hiddenEnabled = 1, this.blurTextEnabled = 1, this.enabled = 1, this.canUpdate = 1
                }
            }
            class lC {
                constructor() {
                    this.selection = new oC, this.settings = new aC, this.selectionEnabled = !1
                }
            }
            let cC = (() => {
                    class t {}
                    return t.restoreSelection = "restoreSelection", t.updateSelection = "updateSelection", t.updateSelectionLayout = "updateSelectionLayout", t.updateLayout = "updateLayout", t.applySavedSettings = "applySavedSettings", t.sendSavedSettings = "sendSavedSettings", t.updateSettings = "updateSettings", t.updateSettingsLight = "updateSettingsLight", t.updateVisibility = "updateVisibility", t.urlUpdated = "urlUpdated", t.panelInitialized = "panelInitialized", t
                })(),
                hC = (() => {
                    class t {}
                    return t.left = "left", t.right = "right", t
                })(),
                uC = (() => {
                    class t {
                        constructor(t) {
                            this.data = t
                        }
                        ngOnInit() {}
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(Hv))
                    }, t.\u0275cmp = jt({
                        type: t,
                        selectors: [
                            ["app-dialog"]
                        ],
                        decls: 8,
                        vars: 2,
                        consts: [
                            ["mat-dialog-title", ""],
                            ["mat-dialog-content", "", 1, "gb-dialog-message"],
                            ["mat-dialog-actions", ""],
                            ["mat-button", "", "mat-dialog-close", ""]
                        ],
                        template: function(t, e) {
                            1 & t && (vo(0, "h1", 0), Wo(1), wo(), vo(2, "div", 1), vo(3, "p"), Wo(4), wo(), wo(), vo(5, "div", 2), vo(6, "button", 3), Wo(7, "Ok"), wo(), wo()), 2 & t && (qs(1), Zo(e.data.title), qs(3), Zo(e.data.message))
                        },
                        directives: [Kv, Gv, Yv, cb, Qv],
                        styles: [".gb-dialog-message[_ngcontent-%COMP%]{word-break:break-word}"]
                    }), t
                })(),
                dC = (() => {
                    class t {
                        constructor(t) {
                            this.responseResultsSubject = new x, window.addEventListener("message", e => {
                                const n = e.data;
                                t.run(() => {
                                    this.responseResultsSubject.next(n)
                                })
                            })
                        }
                        get responseResults() {
                            return this.responseResultsSubject.asObservable()
                        }
                        ngOnDestroy() {
                            this.responseResultsSubject.complete()
                        }
                        update(t, e) {
                            return this.sendToCurrentTab({
                                name: e,
                                actionContext: t
                            })
                        }
                        applySavedSettings(t) {
                            this.sendToCurrentTab({
                                name: cC.applySavedSettings,
                                settingsContext: t
                            })
                        }
                        updateSettings(t) {
                            this.sendToCurrentTab({
                                name: cC.updateSettings,
                                settings: t
                            })
                        }
                        updateSettingsLight(t) {
                            this.sendToCurrentTab({
                                name: cC.updateSettingsLight,
                                settings: t
                            })
                        }
                        updateLayout(t) {
                            this.sendToCurrentTab({
                                name: cC.updateLayout,
                                layout: t
                            })
                        }
                        hide() {
                            this.sendToCurrentTab({
                                name: cC.updateVisibility,
                                isVisible: !1
                            })
                        }
                        onInit() {
                            this.sendToCurrentTab({
                                name: cC.panelInitialized
                            })
                        }
                        sendToCurrentTab(t) {
                            window.parent.postMessage(t, "*")
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(rc))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac,
                        providedIn: "root"
                    }), t
                })(),
                pC = (() => {
                    class t {
                        constructor(t) {
                            this.http = t
                        }
                        getAppInfo() {
                            return this.http.get("https://anton-voronov-a.github.io/greeked/assets/info.json").pipe(Rb(t => (console.log(t), tu())), k(t => {
                                const e = {
                                        remoteResult: t,
                                        currentExtensionId: chrome.runtime.id,
                                        currentVersion: null
                                    },
                                    n = chrome.runtime.getManifest();
                                return n && (e.currentVersion = n.version), e
                            }))
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(di(Yb))
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac,
                        providedIn: "root"
                    }), t
                })(),
                fC = (() => {
                    class t {
                        constructor() {}
                        parseVersion(t) {
                            const e = t.split(".").map(t => parseInt(t));
                            return 3 === e.length ? {
                                major: e[0],
                                minor: e[1],
                                patch: e[2]
                            } : null
                        }
                        getValidationError(t) {
                            const e = t.remoteResult;
                            if (t.currentExtensionId) {
                                const n = t.remoteResult.errorMessages;
                                if (-1 === e.registeredExtensionIds.indexOf(t.currentExtensionId)) return n.extensionId.replace("{currentExtensionId}", t.currentExtensionId);
                                if (t.currentVersion) {
                                    const i = this.parseVersion(e.minVersion),
                                        s = this.parseVersion(t.currentVersion);
                                    if (i && !(s && s.major >= i.major && s.minor >= i.minor && s.patch >= i.patch)) return n.minVersion.replace("{minVersion}", e.minVersion).replace("{currentVersion}", t.currentVersion)
                                }
                            }
                            return null
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275prov = lt({
                        token: t,
                        factory: t.\u0275fac,
                        providedIn: "root"
                    }), t
                })();

            function mC(t, e) {
                if (1 & t && Co(0, "div", 21), 2 & t) {
                    const t = Oo();
                    jo("top", t.panelRectangle.start.style.y)("left", t.panelRectangle.start.style.x)("height", t.panelRectangle.height)("width", t.panelRectangle.width)
                }
            }

            function gC(t, e) {
                if (1 & t) {
                    const t = So();
                    vo(0, "button", 22), To("click", function() {
                        return Oe(t), Oo().left()
                    }), vo(1, "mat-icon"), Wo(2, "switch_left"), wo(), wo()
                }
            }

            function _C(t, e) {
                if (1 & t) {
                    const t = So();
                    vo(0, "button", 23), To("click", function() {
                        return Oe(t), Oo().right()
                    }), vo(1, "mat-icon"), Wo(2, "switch_right"), wo(), wo()
                }
            }
            let yC = (() => {
                    class t {
                        constructor(t, e, n, i) {
                            var s;
                            this.service = t, this.infoService = e, this.appValidationService = n, this.dialog = i, this.restoreButtonDisabled = !0, this.panelHidden = !1, this.destroySubject = new x, this.updateSelectionSubject = new x, this.tabContext = new lC, this.panelRectangle = null, this.hasAppValidationError = null, this.layout = hC.right, this.updateSelectionSubject.pipe((s = () => Gu(20), t => t.lift(new nC(s))), Ju(this.destroySubject)).subscribe(() => {
                                this.sendUpdateSelection()
                            }), this.service.responseResults.pipe(Ju(this.destroySubject)).subscribe(t => {
                                switch (t.finishedActionName) {
                                    case cC.updateSelectionLayout:
                                        this.panelHidden = this.tabContext.selectionEnabled;
                                        break;
                                    case cC.updateSelection:
                                        this.tryUpdateRestoreButton(t.selectionResult);
                                        break;
                                    case cC.sendSavedSettings:
                                        const e = t.settingsContext;
                                        e && (this.tabContext.settings = e.settings, this.service.applySavedSettings(e))
                                }
                            }), this.service.updateLayout(this.layout), this.service.onInit()
                        }
                        tryUpdateRestoreButton(t) {
                            t && (this.restoreButtonDisabled = 0 === t.selectedCount)
                        }
                        ngOnInit() {}
                        hide() {
                            this.service.hide()
                        }
                        onEnabledChange() {
                            const t = this.tabContext.settings;
                            this.hasAppValidationError && t.enabled ? t.enabled = !1 : (this.service.updateSettings(t), null === this.hasAppValidationError && this.infoService.getAppInfo().pipe(Ju(this.destroySubject)).subscribe(t => {
                                const e = this.appValidationService.getValidationError(t);
                                this.hasAppValidationError = !!e, e && setTimeout(() => {
                                    this.dialog.open(uC, {
                                        data: {
                                            title: "Error",
                                            message: e
                                        }
                                    }).afterClosed().subscribe(() => {
                                        this.tabContext.settings.enabled = !1, this.service.updateSettings(this.tabContext.settings), this.hide()
                                    })
                                }, 1e4)
                            }))
                        }
                        updateSettings() {
                            this.service.updateSettings(this.tabContext.settings)
                        }
                        updateSettingsLight() {
                            this.service.updateSettingsLight(this.tabContext.settings)
                        }
                        ngOnDestroy() {
                            this.destroySubject.next(), this.destroySubject.complete()
                        }
                        selectionStart(t) {
                            const e = this.tabContext.selection;
                            e.start = new sC(t.clientX, t.clientY), e.end = null, e.stopped = !1, this.updateSelectionRectangle(), this.updateSelectionSubject.next()
                        }
                        trySelectionMove(t) {
                            const e = this.tabContext.selection;
                            return !e.stopped && (e.end = new sC(t.clientX, t.clientY), this.updateSelectionRectangle(), this.updateSelectionSubject.next(), !0)
                        }
                        trySelectionEnd(t) {
                            const e = this.tabContext.selection;
                            return !e.stopped && (e.end = new sC(t.clientX, t.clientY), e.stopped = !0, this.tabContext.selectionEnabled = !1, this.updateSelectionRectangle(), this.service.update({
                                tabContext: this.tabContext
                            }, cC.updateSelectionLayout), this.sendUpdateSelection(), !0)
                        }
                        onMouseDown(t) {
                            0 === t.button && this.selectionStart(t)
                        }
                        onTouchStart(t) {
                            const e = t.touches;
                            e && e.length && (this.selectionStart(e[0]), t.preventDefault())
                        }
                        onTouchMove(t) {
                            const e = t.touches;
                            e && e.length && this.trySelectionMove(e[0]) && t.preventDefault()
                        }
                        onMousemove(t) {
                            this.trySelectionMove(t)
                        }
                        onTouchEnd(t) {
                            const e = t.changedTouches;
                            e && e.length && this.trySelectionEnd(e[0]) && t.preventDefault()
                        }
                        onMouseup(t) {
                            this.trySelectionEnd(t)
                        }
                        isRectangleVisible() {
                            return this.tabContext.selectionEnabled && !this.tabContext.selection.stopped
                        }
                        updateSelectionRectangle() {
                            const t = this.tabContext.selection,
                                e = t.start;
                            this.panelRectangle = e ? new rC(e, t.end || e) : null
                        }
                        onRestore() {
                            this.service.update({
                                tabContext: this.tabContext
                            }, cC.restoreSelection), this.restoreButtonDisabled = !0
                        }
                        sendUpdateSelection() {
                            this.service.update({
                                tabContext: this.tabContext
                            }, cC.updateSelection)
                        }
                        onSelect() {
                            const t = this.tabContext.selection;
                            t.start = t.end = null, this.tabContext.selectionEnabled = !0, this.panelHidden = !0, this.service.update({
                                tabContext: this.tabContext
                            }, cC.updateSelectionLayout)
                        }
                        blurValues() {
                            const t = this.tabContext.settings;
                            return [t.blurTextEnabled, t.blurImagesEnabled, t.blurImageRolesEnabled, t.blurBackgroundImagesEnabled, t.blurObjectsEnabled, t.blurSvgsEnabled, t.blurVideosEnabled, t.blurIframeEnabled, t.blurLargeEmptyElementsEnabled, t.blurLargeEmptyElementParentsEnabled]
                        }
                        blurAll(t) {
                            const e = this.tabContext.settings;
                            e.blurTextEnabled = e.blurImagesEnabled = e.blurImageRolesEnabled = e.blurBackgroundImagesEnabled = e.blurObjectsEnabled = e.blurSvgsEnabled = e.blurVideosEnabled = e.blurIframeEnabled = e.blurLargeEmptyElementsEnabled = e.blurLargeEmptyElementParentsEnabled = t, this.updateSettingsLight()
                        }
                        blurAllEnabled() {
                            return -1 === this.blurValues().indexOf(!1)
                        }
                        blurAllIndeterminate() {
                            const t = this.blurValues();
                            return t.indexOf(!1) > -1 && t.indexOf(!0) > -1
                        }
                        canMoveLeft() {
                            return this.layout === hC.right
                        }
                        canMoveRight() {
                            return this.layout === hC.left
                        }
                        right() {
                            this.layout = hC.right, this.service.updateLayout(this.layout)
                        }
                        left() {
                            this.layout = hC.left, this.service.updateLayout(this.layout)
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)(_o(dC), _o(pC), _o(fC), _o(Wv))
                    }, t.\u0275cmp = jt({
                        type: t,
                        selectors: [
                            ["app-panel"]
                        ],
                        hostBindings: function(t, e) {
                            1 & t && To("touchmove", function(t) {
                                return e.onTouchMove(t)
                            }, !1, es)("mousemove", function(t) {
                                return e.onMousemove(t)
                            }, !1, es)("touchend", function(t) {
                                return e.onTouchEnd(t)
                            }, !1, es)("mouseup", function(t) {
                                return e.onMouseup(t)
                            }, !1, es)
                        },
                        decls: 59,
                        vars: 41,
                        consts: [
                            [1, "gb-screen-selection", 3, "mousedown", "touchstart"],
                            ["class", "gb-screen-selection__rectangle", 3, "top", "left", "height", "width", 4, "ngIf"],
                            [1, "gb-panel-window"],
                            [1, "gb-panel-window__header", "mat-elevation-z4"],
                            [1, "gb-panel-window__header-text"],
                            [1, "gb-spacer"],
                            ["mat-icon-button", "", "title", "Move left", 3, "click", 4, "ngIf"],
                            ["mat-icon-button", "", "title", "Move right", 3, "click", 4, "ngIf"],
                            ["mat-icon-button", "", "title", "Close", 3, "click"],
                            [1, "gb-actions"],
                            ["mat-button", "", 3, "disabled", "click"],
                            [1, "gb-control", 3, "ngModel", "color", "disabled", "ngModelChange", "change"],
                            [1, "gb-window-content-scroll"],
                            [1, "gb-panel"],
                            [1, "gb-panel__controls"],
                            [1, "gb-control", 3, "ngModel", "disabled", "ngModelChange", "change"],
                            [1, "gb-control", 3, "checked", "indeterminate", "disabled", "change"],
                            [1, "gb-blur-settings"],
                            [1, "gb-fields"],
                            ["appearance", "fill"],
                            ["matInput", "", "type", "number", "step", "500", "min", "500", 1, "gb-control", 3, "ngModel", "disabled", "ngModelChange", "change"],
                            [1, "gb-screen-selection__rectangle"],
                            ["mat-icon-button", "", "title", "Move left", 3, "click"],
                            ["mat-icon-button", "", "title", "Move right", 3, "click"]
                        ],
                        template: function(t, e) {
                            1 & t && (vo(0, "div", 0), To("mousedown", function(t) {
                                return e.onMouseDown(t)
                            })("touchstart", function(t) {
                                return e.onTouchStart(t)
                            }), mo(1, mC, 1, 8, "div", 1), wo(), vo(2, "div", 2), vo(3, "div", 3), vo(4, "div", 4), Wo(5, "All blurred"), wo(), Co(6, "div", 5), mo(7, gC, 3, 0, "button", 6), mo(8, _C, 3, 0, "button", 7), vo(9, "button", 8), To("click", function() {
                                return e.hide()
                            }), vo(10, "mat-icon"), Wo(11, "close"), wo(), wo(), wo(), vo(12, "div", 9), vo(13, "button", 10), To("click", function() {
                                return e.onSelect()
                            }), Wo(14, " Select "), wo(), vo(15, "button", 10), To("click", function() {
                                return e.onRestore()
                            }), Wo(16, " Restore "), wo(), Co(17, "div", 5), vo(18, "mat-slide-toggle", 11), To("ngModelChange", function(t) {
                                return e.tabContext.settings.enabled = true
                            })("change", function() {
                                return e.onEnabledChange()
                            }), Wo(19, " Enabled "), wo(), wo(), vo(20, "div", 12), vo(21, "div", 13), vo(22, "div", 14), vo(23, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.canUpdate = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(24, " Can update "), wo(), vo(25, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.greekingEnabled = t
                            })("change", function() {
                                return e.updateSettings()
                            }), Wo(26, " Greeking "), wo(), vo(27, "mat-checkbox", 16), To("change", function(t) {
                                return e.blurAll(t.checked)
                            }), Wo(28, " Blur "), wo(), vo(29, "div", 17), vo(30, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurTextEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(31, " Text "), wo(), vo(32, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurImagesEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(33, " Images "), wo(), vo(34, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurBackgroundImagesEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(35, " Background images "), wo(), vo(36, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurImageRolesEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(37, " Elements with role img "), wo(), vo(38, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurSvgsEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(39, " SVGs "), wo(), vo(40, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurVideosEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(41, " Videos "), wo(), vo(42, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurIframeEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(43, " Iframes "), wo(), vo(44, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurObjectsEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(45, " Objects "), wo(), vo(46, "div", 18), vo(47, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurLargeEmptyElementsEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(48, " Large empty elements "), wo(), vo(49, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurLargeEmptyElementParentsEnabled = t
                            })("change", function() {
                                return e.updateSettingsLight()
                            }), Wo(50, " Large empty element parents "), wo(), vo(51, "mat-form-field", 19), vo(52, "mat-label"), Wo(53, " Min large elements square "), wo(), vo(54, "input", 20), To("ngModelChange", function(t) {
                                return e.tabContext.settings.blurLargeEmptyElementsSquare = t
                            })("change", function() {
                                return e.updateSettings()
                            }), wo(), vo(55, "mat-hint"), Wo(56, "square pixels"), wo(), wo(), wo(), wo(), vo(57, "mat-checkbox", 15), To("ngModelChange", function(t) {
                                return e.tabContext.settings.hiddenEnabled = t
                            })("change", function() {
                                return e.updateSettings()
                            }), Wo(58, " Hidden elements enabled "), wo(), wo(), wo(), wo(), wo()), 2 & t && (qs(1), yo("ngIf", e.panelRectangle && e.isRectangleVisible()), qs(1), Bo("gb-panel-window--hidden", e.panelHidden), qs(5), yo("ngIf", e.canMoveLeft()), qs(1), yo("ngIf", e.canMoveRight()), qs(5), yo("disabled", !e.tabContext.settings.enabled), qs(2), yo("disabled", e.restoreButtonDisabled || !e.tabContext.settings.enabled), qs(3), yo("ngModel", e.tabContext.settings.enabled)("color", "primary")("disabled", !!e.hasAppValidationError), qs(5), yo("ngModel", e.tabContext.settings.canUpdate)("disabled", !e.tabContext.settings.enabled), qs(2), yo("ngModel", e.tabContext.settings.greekingEnabled)("disabled", !e.tabContext.settings.enabled || !e.tabContext.settings.canUpdate), qs(2), yo("checked", e.blurAllEnabled())("indeterminate", e.blurAllIndeterminate())("disabled", !e.tabContext.settings.enabled), qs(3), yo("ngModel", e.tabContext.settings.blurTextEnabled)("disabled", !e.tabContext.settings.enabled), qs(2), yo("ngModel", e.tabContext.settings.blurImagesEnabled)("disabled", !e.tabContext.settings.enabled), qs(2), yo("ngModel", e.tabContext.settings.blurBackgroundImagesEnabled)("disabled", !e.tabContext.settings.enabled), qs(2), yo("ngModel", e.tabContext.settings.blurImageRolesEnabled)("disabled", !e.tabContext.settings.enabled), qs(2), yo("ngModel", e.tabContext.settings.blurSvgsEnabled)("disabled", !e.tabContext.settings.enabled), qs(2), yo("ngModel", e.tabContext.settings.blurVideosEnabled)("disabled", !e.tabContext.settings.enabled), qs(2), yo("ngModel", e.tabContext.settings.blurIframeEnabled)("disabled", !e.tabContext.settings.enabled), qs(2), yo("ngModel", e.tabContext.settings.blurObjectsEnabled)("disabled", !e.tabContext.settings.enabled), qs(3), yo("ngModel", e.tabContext.settings.blurLargeEmptyElementsEnabled)("disabled", !e.tabContext.settings.enabled), qs(2), yo("ngModel", e.tabContext.settings.blurLargeEmptyElementParentsEnabled)("disabled", !e.tabContext.settings.enabled), qs(5), yo("ngModel", e.tabContext.settings.blurLargeEmptyElementsSquare)("disabled", !e.tabContext.settings.enabled), qs(3), yo("ngModel", e.tabContext.settings.hiddenEnabled)("disabled", !e.tabContext.settings.enabled))
                        },
                        directives: [Jc, cb, Tv, Uw, R_, my, Eb, Xy, qy, lw, O_, c_, zy],
                        styles: ["[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;position:absolute;width:100%}.gb-panel[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex:1;padding:8px}.gb-screen-selection[_ngcontent-%COMP%]{position:absolute;top:0;left:0;bottom:0;right:0;cursor:crosshair;overflow:hidden}.gb-screen-selection__rectangle[_ngcontent-%COMP%]{background-color:rgba(255,0,182,.11);outline:2px solid #c890ff;position:absolute}.gb-panel__controls[_ngcontent-%COMP%]{display:flex;flex-direction:column}.gb-control[_ngcontent-%COMP%]{margin:8px}.gb-fields[_ngcontent-%COMP%], .gb-panel-window[_ngcontent-%COMP%]{display:flex;flex-direction:column}.gb-panel-window[_ngcontent-%COMP%]{--gb-panel-opacity-duration:0.2s;--gb-selection-opacity-duration:0.2s;--gb-panel-opacity-delay:calc(var(--gb-selection-opacity-duration) + 0.1s);background-color:#fff;z-index:1;height:100%;visibility:visible;opacity:1;transition:all var(--gb-panel-opacity-duration) var(--gb-selection-opacity-duration)}.gb-panel-window.gb-panel-window--hidden[_ngcontent-%COMP%]{visibility:hidden;opacity:0;transition:all var(--gb-panel-opacity-duration)}.gb-panel-window__header[_ngcontent-%COMP%]{--left-color:#af84f5;display:flex;background-image:linear-gradient(90deg,#6a11cb,#2575fc 700px);color:#fff;padding:4px}.gb-panel-window__header-text[_ngcontent-%COMP%]{line-height:40px;margin-left:9px;font-size:18px;font-family:Kavoon,Helvetica Neue,sans-serif;overflow:hidden;background-image:linear-gradient(90deg,#fff,var(--left-color));color:transparent;-webkit-background-clip:text}.gb-spacer[_ngcontent-%COMP%]{flex:1}.gb-actions[_ngcontent-%COMP%]{display:flex;padding:4px 8px;border-bottom:1px solid rgba(0,0,0,.15)}.gb-window-content-scroll[_ngcontent-%COMP%]{height:100%;overflow:auto}.gb-blur-settings[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-left:30px}"]
                    }), t
                })(),
                bC = (() => {
                    class t {
                        constructor() {
                            this.title = "content-app"
                        }
                    }
                    return t.\u0275fac = function(e) {
                        return new(e || t)
                    }, t.\u0275cmp = jt({
                        type: t,
                        selectors: [
                            ["app-root"]
                        ],
                        decls: 1,
                        vars: 0,
                        template: function(t, e) {
                            1 & t && Co(0, "app-panel")
                        },
                        directives: [yC],
                        styles: [""]
                    }), t
                })(),
                vC = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [rh, eC]
                        ]
                    }), t
                })(),
                wC = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        imports: [
                            [rh, by, Um, dv, eC, vC]
                        ]
                    }), t
                })(),
                CC = (() => {
                    class t {}
                    return t.\u0275mod = qt({
                        type: t,
                        bootstrap: [bC]
                    }), t.\u0275inj = ct({
                        factory: function(e) {
                            return new(e || t)
                        },
                        providers: [],
                        imports: [
                            [Lh, eC, wC].concat(Rc)
                        ]
                    }), t
                })();
            (function() {
                if (yc) throw new Error("Cannot enable prod mode after platform setup.");
                _c = !1
            })(), Ph().bootstrapModule(CC).catch(t => console.error(t))
        },
        zn8P: function(t, e) {
            function n(t) {
                return Promise.resolve().then(function() {
                    var e = new Error("Cannot find module '" + t + "'");
                    throw e.code = "MODULE_NOT_FOUND", e
                })
            }
            n.keys = function() {
                return []
            }, n.resolve = n, t.exports = n, n.id = "zn8P"
        }
    },
    [
        [0, 0]
    ]
]);