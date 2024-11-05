(() => {
    "use strict";

    function e(e, t, s, a) {
        return new(s || (s = Promise))((function(n, i) {
            function l(e) {
                try {
                    o(a.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function r(e) {
                try {
                    o(a.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function o(e) {
                var t;
                e.done ? n(e.value) : (t = e.value, t instanceof s ? t : new s((function(e) {
                    e(t)
                }))).then(l, r)
            }
            o((a = a.apply(e, t || [])).next())
        }))
    }
    Object.create, Object.create;
    class t {}
    t.enabledClass = "gb-body", t.textClass = "gb-blur-text", t.blurImagesClass = "gb-blur-images", t.blurImageRolesClass = "gb-blur-image-roles", t.blurIframesClass = "gb-blur-iframes", t.blurObjectsClass = "gb-blur-objects", t.blurSvgsClass = "gb-blur-svgs", t.blurBackgroundImagesClass = "gb-blur-background-images", t.blurLargeEmptyElementsClass = "gb-blur-large-empty-elements", t.blurLargeEmptyElementParentsClass = "gb-blur-large-empty-element-parents", t.blurVideosClass = "gb-blur-videos", t.blurTextClass = "gb-blur-text", t.blurIframeClass = "gb-blur-iframe", t.selectionClass = "gb-selection", t.highlightClass = "gb-highlight", t.imageClass = "gb-blur-image", t.imageRoleClass = "gb-blur-image-role", t.objectClass = "gb-blur-object", t.svgClass = "gb-blur-svg", t.backgroundImageClass = "gb-blur-background-image", t.largeEmptyElementClass = "gb-blur-large-empty-element", t.largeEmptyElementParentClass = "gb-blur-large-empty-element-parent", t.videoClass = "gb-blur-video", t.spaIframeId = "gbIframe", t.spaIframeClass = "gb-iframe", t.spaIframeRightClass = "gb-iframe--right", t.spaIframeLeftClass = "gb-iframe--left", t.hasPanelClass = "gb-body--has-panel", t.spaIframeActiveClass = "gb-iframe--active", t.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    // status class (add or remove status)
    class s {
        static add(e, t) {
            e.contains(t) || e.add(t);
        }
        static remove(e, t) {
            e.contains(t) && e.remove(t)
        }
    }
    class a {
        static setup(e) {
            const t = e.context;
            if (e.enabled ? a.enable(e.elementParams, t) : a.disable(e.elementParams, t), !t.restore) {
                const s = () => {
                    t.restored = !0, t.restore = null, a.disable(e.elementParams, t)
                };
                t.restore = s
            }
        }
        static enable(e, t) {
            if (s.add(t.classSource.classList, e.className), e.parentClassName) {
                const a = t.classSource.parentElement;
                a && s.add(a.classList, e.parentClassName)
            }
            e.isText && (t.greeking ? t.dom.textContent = t.fakeTextContent : t.dom.textContent === t.fakeTextContent && (t.dom.textContent = t.textContent))
        }
        static disable(e, a) {
            e.isText && a.dom.textContent === a.fakeTextContent && (a.dom.textContent = a.textContent);
            const n = [e.className, t.selectionClass, t.highlightClass],
                i = a.classSource,
                l = i.parentElement;
            n.forEach((e => {
                s.remove(i.classList, e)
            })), e.parentClassName && l && s.remove(l.classList, e.parentClassName)
        }
    }
    //fake word class
    class n {
        constructor(e, t = 0) {
            this.globalShift = e, this.localShift = t
        }
        getFakeWord(e) {
            let t = "";
            for (; e.length;) {
                const s = n.getFakeWord(e, this.globalShift, this.localShift);
                t += s;
                for (let t = 0; t < s.length; t++) e.shift();
                this.localShift++
            }
            return t
        }
        getFakeDigit() {
            let e = "";
            const t = n.randomNumbers.length,
                s = (this.globalShift + this.localShift) % t;
            return e += n.randomNumbers[s], this.localShift++, e
        }
        static getFakeWord(e, t, s) {
            const a = Array.from(n.groupedWords),
                i = e.length;
            a.sort((([e], [t]) => Math.abs(i - e) - Math.abs(i - t)));
            const l = a[0][1],
                r = l[(t + s) % l.length];
            return e.map(((e, t) => t < r.length ? e.toUpperCase() === e ? r[t].toUpperCase() : r[t] : "")).join("")
        }
    }
    n.groupedWords = (() => {
        const e = new Map;
        return t.text.replace(/[,\.]/g, "").split(" ").forEach((t => {
            const s = t.length;
            let a = e.get(s);
            a || (a = [], e.set(s, a));
            const n = t.toLowerCase(); - 1 === a.indexOf(n) && a.push(n)
        })), e
    })(), n.randomNumbers = (() => {
        const e = [];
        for (let t = 0; t < 100; t++) {
            const t = Math.trunc(10 * Math.random());
            e.push(t)
        }
        return e
    })();
    // fake text class
    class i {
        static getFakeText(e, t) {
            if (e) {
                const s = e.length;
                let a = "",
                    i = [];
                const l = new n(t);
                for (let t = 0; t < s; t++) {
                    const s = e[t],
                        n = s.toLowerCase() === s,
                        r = s.toUpperCase() === s;
                    n && r ? (a += l.getFakeWord(i), a += /\d/.test(s) ? l.getFakeDigit() : s) : i.push(s)
                }
                return i.length && (a += l.getFakeWord(i)), a
            }
            return null
        }
    }
    class l {
        constructor(e, t = null, s = !1) {
            this.className = e, this.parentClassName = t, this.isText = s
        }
    }
    // mutation class(blur or show)
    class r {
        constructor() {
            this.changedElements = new Set, this.updatedNodes = new Set, this.removedNodes = new Set, this.items = new Map, this.selected = null, this.tabSettings = null, new MutationObserver((e => {
                this.tabSettings && this.onMutation(e, this.tabSettings)
            })).observe(document.body, {
                childList: !0,
                subtree: !0,
                characterData: !0,
                attributes: !0,
                attributeFilter: ["style", "class"]
            }), setInterval((() => {
                const e = this.tabSettings;
                e && (this.onUpdateNode([...this.updatedNodes], e), this.onRemoveNode([...this.removedNodes]), this.changedElements.forEach((t => this.onUpdateText(t, e))), this.updatedNodes.clear(), this.removedNodes.clear(), this.changedElements.clear());
            }), 100)
        }
        onMutation(e, t) {
            t.enabled && t.canUpdate && e.forEach((e => {
                switch (e.type) {
                    case "characterData":
                        const t = e.target.parentNode;
                        t instanceof Element && this.changedElements.add(t);
                        break;
                    case "childList":
                        e.addedNodes.forEach((e => {
                            this.updatedNodes.add(e)
                        })), e.removedNodes.forEach((e => {
                            this.removedNodes.add(e)
                        }));
                        break;
                    case "attributes":
                        const s = e.target;
                        s instanceof Element && this.updatedNodes.add(s)
                }
            }))
        }
        onUpdateText(e, t) {
            this.onProcessNode(e, t)
        }
        onUpdateNode(e, t) {
            const s = new Set;
            e.forEach((e => {
                r.fillElements(e, s)
            })), s.forEach((e => {
                const s = e;
                s instanceof Element && this.onProcessNode(s, t)
            }))
        }
        onRemoveNode(e) {
            const t = new Set;
            e.forEach((e => {
                r.fillElements(e, t)
            })), t.forEach((e => {
                this.items.delete(e)
            }))
        }
        static fillElements(e, t) {
            t.has(e) || (t.add(e), e.childNodes.forEach((e => {
                r.fillElements(e, t)
            })))
        }
        restoreSelection() {
            this.selected && (this.selected.forEach((e => {
                e.restore && e.restore()
            })), this.selected = null)
        }
        updateSelectionLayout(e) {
            if (e) {
                const a = e.tabContext,
                    n = document.getElementById(t.spaIframeId);
                n && (a.selectionEnabled ? s.add(n.classList, t.spaIframeActiveClass) : s.remove(n.classList, t.spaIframeActiveClass));

                this.selected && (this.selected.forEach((e => {
                    e.restore && e.restore()
                })), this.selected = null);
            }
        }
        selectItems(e, a) {
            const n = [];
            if (e) {
                const i = e.tabContext,
                    l = i.selection;
                this.items.forEach((e => {
                    let r = !1,
                        o = !1;
                    if (l && l.start && l.end) {
                        const t = e.classSource.getBoundingClientRect(),
                            s = Math.min(l.start.x, l.end.x),
                            a = Math.max(l.start.x, l.end.x),
                            d = Math.min(l.start.y, l.end.y),
                            c = Math.max(l.start.y, l.end.y),
                            m = t.x >= s && t.x + t.width <= a,
                            g = t.y >= d && t.y + t.height <= c;
                        if (r = m && g, r && e.restore && n.push(e), i.selectionEnabled) {
                            const e = t.x < a && t.x + t.width > s,
                                n = t.y < c && t.y + t.height > d;
                            o = e && n
                        }
                    }
                    const d = e.classSource.classList;
                    r && !e.restored ? (a.selectedCount++, s.add(d, t.selectionClass), s.remove(d, t.highlightClass)) : (s.remove(d, t.selectionClass), o && !e.restored ? s.add(d, t.highlightClass) : s.remove(d, t.highlightClass))
                })), this.selected = n
            }
        }
        updateBodyClasses(e) {
            this.tabSettings = e;
            const a = document.body.classList;
            e.enabled ? (s.add(a, t.enabledClass), e.blurImagesEnabled ? s.add(a, t.blurImagesClass) : s.remove(a, t.blurImagesClass), e.blurImageRolesEnabled ? s.add(a, t.blurImageRolesClass) : s.remove(a, t.blurImageRolesClass), e.blurIframeEnabled ? s.add(a, t.blurIframesClass) : s.remove(a, t.blurIframesClass), e.blurObjectsEnabled ? s.add(a, t.blurObjectsClass) : s.remove(a, t.blurObjectsClass), e.blurSvgsEnabled ? s.add(a, t.blurSvgsClass) : s.remove(a, t.blurSvgsClass), e.blurBackgroundImagesEnabled ? s.add(a, t.blurBackgroundImagesClass) : s.remove(a, t.blurBackgroundImagesClass), e.blurLargeEmptyElementsEnabled ? s.add(a, t.blurLargeEmptyElementsClass) : s.remove(a, t.blurLargeEmptyElementsClass), e.blurLargeEmptyElementParentsEnabled ? s.add(a, t.blurLargeEmptyElementParentsClass) : s.remove(a, t.blurLargeEmptyElementParentsClass), e.blurVideosEnabled ? s.add(a, t.blurVideosClass) : s.remove(a, t.blurVideosClass), e.blurTextEnabled ? s.add(a, t.blurTextClass) : s.remove(a, t.blurTextClass)) : s.remove(a, t.enabledClass)
        }
        onProcessNode(e, s) {
            let a = !1;
            if (e.matches("iframe:not(.gb-iframe)") && (a = !0, this.blur(e, e, {
                    elementParams: new l(t.blurIframeClass),
                    tabSettings: s
                })), e.matches("img") && (a = !0, this.blur(e, e, {
                    elementParams: new l(t.imageClass),
                    tabSettings: s
                })), e.matches("[role='img']") && (a = !0, this.blur(e, e, {
                    elementParams: new l(t.imageRoleClass),
                    tabSettings: s
                })), e.matches("object") && (a = !0, this.blur(e, e, {
                    elementParams: new l(t.objectClass),
                    tabSettings: s
                })), e.matches("svg") && (a = !0, this.blur(e, e, {
                    elementParams: new l(t.svgClass),
                    tabSettings: s
                })), e.matches("video") && (a = !0, this.blur(e, e, {
                    elementParams: new l(t.videoClass),
                    tabSettings: s
                })), e.matches("*:not(.gb-iframe,script,style,noscript)") && !a) {
                    e.childNodes.forEach((n => {
                        const i = n;
                        for( var j = 0; j < s.keywords.length; j ++) {
                            n.nodeType === Node.TEXT_NODE && n.textContent.toLowerCase().includes(s.keywords[j]) && i && n.textContent.trim().replace(/\n/g, "").length && (a = !0, this.blur(i, e, {
                                elementParams: new l(t.textClass, null, !0),
                                tabSettings: s
                            }))
                        }
                    }));
                    // async () => {
                    //     const configUrl = chrome.runtime.getURL("config/config.json");
                    //     const response = await fetch(configUrl);
                    //     const configData = await response.json();
                    //     let key_data = configData["keywords"];
                        
                    // }

                //remove spin
                const injectedDiv = document.getElementById("owagent-div");
                if (injectedDiv) {
                    injectedDiv.remove();
                }
                const n = window.getComputedStyle(e);
                if ("none" !== n.backgroundImage) a = !0, this.blur(e, e, {
                    elementParams: new l(t.backgroundImageClass),
                    tabSettings: s
                });
                else if (!e.childNodes.length && parseFloat(n.height) * parseFloat(n.width) > s.blurLargeEmptyElementsSquare) {
                    let n;
                    a = !0;
                    const i = !e.classList.length || e.classList.contains(t.largeEmptyElementClass),
                        r = !e.nextSibling && !e.previousSibling;
                    n = i && r ? t.largeEmptyElementParentClass : null, this.blur(e, e, {
                        elementParams: new l(t.largeEmptyElementClass, n),
                        tabSettings: s
                    })
                }
            }
            if (!a) {
                const t = this.items.get(e);
                t && (t.restore && t.restore(), this.items.delete(e))
            }
        }
        onSettings(e) {
            this.tabSettings = e;
            const t = document;
            this.updateBodyClasses(e), e.enabled ? t.querySelectorAll("*").forEach((t => {
                this.onProcessNode(t, e)
            })) : (this.restore(), this.items = new Map)
        }
        restore() {
            this.items.forEach((e => {
                e.restore && e.restore()
            }))
        }
        needUpdate(e) {
            const t = e.enabled,
                s = e.existed,
                a = e.textContent,
                n = e.itemOptions.tabSettings;
            let i;
            if (s)
                if (s.restored) i = !1;
                else if (s.hiddenEnabled !== n.hiddenEnabled) i = !0;
            else if (e.itemOptions.elementParams.isText) {
                let e;
                e = !!a && (n.greekingEnabled && t ? s.fakeTextContent !== a : s.textContent !== a), i = e
            } else i = !0;
            else i = !0;
            return i
        }
        blur(e, t, s) {
            const n = this.items.get(e);
            let l = null;
            const o = s.tabSettings;
            s.elementParams.isText && (l = e.textContent);
            const d = t instanceof HTMLElement && !t.offsetParent,
                c = !(d || n && n.wasHidden) || o.hiddenEnabled;
            if (this.needUpdate({
                    textContent: l,
                    existed: n,
                    enabled: c,
                    itemOptions: s
                }) && t) {
                let m;
                if (n) {
                    m = n;
                    const e = o.greekingEnabled !== m.greeking,
                        t = o.greekingEnabled && e && c;
                    m.textContent = t ? l : m.textContent, m.fakeTextContent = i.getFakeText(l, m.globalShift), m.greeking = o.greekingEnabled, m.hiddenEnabled = o.hiddenEnabled, m.wasHidden = d || m.wasHidden
                } else {
                    const s = r.globalShift++;
                    m = {
                        dom: e,
                        restored: !1,
                        wasHidden: d,
                        hiddenEnabled: o.hiddenEnabled,
                        greeking: o.greekingEnabled,
                        classSource: t,
                        textContent: l,
                        restore: null,
                        fakeTextContent: i.getFakeText(l, s),
                        globalShift: s
                    }, this.items.set(m.dom, m)
                }
                a.setup({
                    context: m,
                    enabled: c,
                    dom: e,
                    elementParams: s.elementParams
                })
            }
        }
    }
    r.globalShift = 0;
    class o {}
    o.restoreSelection = "restoreSelection", o.updateSelection = "updateSelection", o.updateSelectionLayout = "updateSelectionLayout", o.updateLayout = "updateLayout", o.applySavedSettings = "applySavedSettings", o.sendSavedSettings = "sendSavedSettings", o.updateSettings = "updateSettings", o.updateSettingsLight = "updateSettingsLight", o.updateVisibility = "updateVisibility", o.urlUpdated = "urlUpdated", o.panelInitialized = "panelInitialized";
    class d {
        constructor() {
            this.selectedCount = 0
        }
    }
    class c {}
    c.left = "left", c.right = "right";
    //initial setting value
    class m {
        constructor() {
            this.greekingEnabled = !1, this.blurImagesEnabled = !0, this.blurImageRolesEnabled = !1, this.blurObjectsEnabled = !0, this.blurSvgsEnabled = !1, this.blurBackgroundImagesEnabled = !1, this.blurLargeEmptyElementsEnabled = !0, this.blurLargeEmptyElementParentsEnabled = !1, this.blurLargeEmptyElementsSquare = 4e4, this.blurVideosEnabled = !0, this.blurIframeEnabled = !0, this.hiddenEnabled = !0, this.blurTextEnabled = !0, this.enabled = !1, this.canUpdate = !0, this.keywords = []
        }
    }
    class g {
        constructor(e, t) {
            this.id = e, this.settings = t
        }
    }
    //database class
    class u {
        constructor() {
            this.storeName = "settings", this.dbName = "greeked-and-blurred", this.dbVersion = 1
        }
        openDb() {
            return new Promise(((e, t) => {
                var s = indexedDB.open(this.dbName, this.dbVersion);
                s.onupgradeneeded = e => {
                    const t = this.storeName,
                        s = e.target.result;
                    s.objectStoreNames.contains(t) || s.createObjectStore(t, {
                        keyPath: "id"
                    })
                }, s.onsuccess = () => {
                    e(s.result)
                }, s.onerror = e => {
                    t(e)
                }
            }))
        }
        settingsEquals(e, t) {
            return JSON.stringify(e) === JSON.stringify(t)
        }
        saveSettings(t, s) {
            return new Promise(((a, n) => e(this, void 0, void 0, (function*() {
                try {
                    const e = yield this.openDb(), n = this.storeName, i = e.transaction(n, "readwrite").objectStore(n);
                    let l;
                    if (this.settingsEquals(new m, t)) l = i.delete(s);
                    else {
                        const e = new g(s, t);
                        l = i.put(e)
                    }
                    l.onsuccess = () => {
                        e.close(), a(!0)
                    }, l.onerror = t => {
                        e.close(), a(!1)
                    }
                } catch (e) {
                    a(!1)
                }
            }))))
        }
        getSettingsByKey(t) {
            return e(this, void 0, void 0, (function*() {
                return new Promise(((s, a) => e(this, void 0, void 0, (function*() {
                    try {
                        const e = yield this.openDb(), a = this.storeName, n = e.transaction(a, "readonly").objectStore(a).get(t);
                        n.onsuccess = () => {
                            e.close();
                            const t = n.result;
                            t && t.settings ? s(t.settings) : s(null)
                        }, n.onerror = t => {
                            e.close(), s(null)
                        }
                    } catch (e) {
                        s(null)
                    }
                }))))
            }))
        }
    }
    //create iframe in page
    class h {
        constructor(e) {
            this.appHtmlUrl = e
        }
        getExistedIframe() {
            return document.getElementById(t.spaIframeId)
        }
        tryCreateIframe() {
            if (!this.getExistedIframe()) {
                const e = document.createElement("iframe");
                return e.id = t.spaIframeId, e.setAttribute("src", this.appHtmlUrl), s.add(e.classList, t.spaIframeClass), document.body.append(e), !0
            }
            return !1
        }
        liftIframe() {
            const e = this.getExistedIframe();
            if (e) {
                const t = document.body;
                e.remove(), t.append(e)
            }
        }
        sendSettings(e) {
            const t = this.getExistedIframe();
            if (t) {
                const s = t.contentWindow;
                if (s) {
                    const t = {
                        ok: !0,
                        selectionResult: null,
                        settingsContext: e,
                        finishedActionName: o.sendSavedSettings
                    };
                    s.postMessage(t, "*")
                }
            }
        }
        initializeSettings(e) {
            this.sendSettings({
                settings: e,
                existedBefore: !1
            })
        }
        applySettings(e) {
            this.tryCreateIframe() || this.sendSettings({
                settings: e,
                existedBefore: !0
            })
        }
    }
    class b {
        constructor(e, t, s) {
            this.storageService = e, this.settingsProcessor = t, this.path = this.getPathname(s)
        }
        getPathname(e) {
            return new URL(e).pathname.toLowerCase().toLowerCase()
        }
        onUrl(t, s) {
            return e(this, void 0, void 0, (function*() {
                const e = this.getPathname(t);
                e !== this.path && (this.path = e, yield this.onPathAsync(s))
            }))
        }
        onPathAsync(t) {
            return e(this, void 0, void 0, (function*() {
                const e = this.path,
                    s = (yield this.storageService.getSettingsByKey(e)) || new m;
                let a;
                a = !t || !this.storageService.settingsEquals(t, s), a && this.settingsProcessor.applySettings(s)
            }))
        }
        getCurrentSettingsAsync() {
            return this.storageService.getSettingsByKey(this.path)
        }
    }
    e(void 0, void 0, void 0, (function*() {
        const a = new r,
            n = new u,
            i = chrome.runtime.getURL("content-app/index.html"),
            l = new h(i),
            m = new b(n, l, location.href),
            g = document.body;
        yield m.onPathAsync(null), a.restore();
        const p = e => {
            const a = g.classList;
            if (e) {
                l.tryCreateIframe() || l.liftIframe();
                const e = l.getExistedIframe();
                s.remove(e.classList, t.spaIframeActiveClass), s.add(a, t.hasPanelClass)
            } else s.remove(a, t.hasPanelClass)
        };
        //event process
        window.addEventListener("message", (r => {
            // console.log("log start");
            // console.log(r);
            if (0 === i.indexOf(r.origin)) {
                const i = r.data,
                    g = i.name;
                let u = null;
                // console.log(g);
                if (g === o.applySavedSettings) {
                    const e = i.settingsContext;
                    e && a.onSettings(e.settings)
                } else if (g === o.updateSettings) {
                    const e = i.settings;
                    e && (a.onSettings(e), n.saveSettings(e, m.path))
                } else if (g === o.updateSettingsLight) {
                    const e = i.settings;
                    e && (a.updateBodyClasses(e), n.saveSettings(e, m.path))
                } else if (g === o.restoreSelection) a.restoreSelection();
                else if (g === o.updateSelection) u = new d, i.actionContext && a.selectItems(i.actionContext, u);
                else if (g === o.updateSelectionLayout) i.actionContext && a.updateSelectionLayout(i.actionContext);
                else if (g === o.updateVisibility) p(!!i.isVisible);
                else if (g === o.updateLayout) {
                    const e = [{
                            layoutType: c.right,
                            layoutClass: t.spaIframeRightClass
                        }, {
                            layoutType: c.left,
                            layoutClass: t.spaIframeLeftClass
                        }],
                        a = l.getExistedIframe();
                    a && e.forEach((e => {
                        e.layoutType === i.layout ? s.add(a.classList, e.layoutClass) : s.remove(a.classList, e.layoutClass)
                    }))
                } else g === o.panelInitialized && e(void 0, void 0, void 0, (function*() {
                    const configUrl = chrome.runtime.getURL("config/config.json");
                    const response = yield fetch(configUrl);
                    const configData = yield response.json();
                    const key_data = configData["keywords"];
                    var e = yield m.getCurrentSettingsAsync();
                    if(e == null) {
                        e = {
                            'blurBackgroundImagesEnabled': 1, 
                            'blurIframeEnabled': 1,
                            'blurImageRolesEnabled': 1,
                            'blurImagesEnabled': 1, 
                            'blurLargeEmptyElementParentsEnabled': 1,
                            'blurLargeEmptyElementsEnabled': 1, 
                            'blurLargeEmptyElementsSquare':40000,
                            'blurObjectsEnabled':1,
                            'blurSvgsEnabled':1,
                            'blurTextEnabled':1,
                            'blurVideosEnabled':1,
                            'canUpdate': 1,
                            'enabled': 1,
                            'greekingEnabled': false,
                            'hiddenEnabled': 1,
                            'keywords': key_data
                        };
                    } else {
                        e.keywords = key_data;
                    }
                    // console.log(e);
                    e && l.initializeSettings(e)
                }));
                const h = l.getExistedIframe();
                if (h) {
                    const e = h.contentWindow;
                    if (e) {
                        const t = {
                            ok: !0,
                            settingsContext: null,
                            selectionResult: u,
                            finishedActionName: g
                        };
                        e.postMessage(t, "*")
                    }
                }
            }
        })), chrome.runtime.onMessage.addListener(((e, t, s) => {
            const n = e.name,
                i = e.data;
            // n === o.updateVisibility ? p(e.isVisible) : n === o.urlUpdated && i && m.onUrl(i.url, a.tabSettings), s({
            //     ok: !0
            // })
            
            //for SPA
            // const tabSettings = {
            //     'blurBackgroundImagesEnabled': 1, 
            //     'blurIframeEnabled': 1,
            //     'blurImageRolesEnabled': 1,
            //     'blurImagesEnabled': 1, 
            //     'blurLargeEmptyElementParentsEnabled': 1,
            //     'blurLargeEmptyElementsEnabled': 1, 
            //     'blurLargeEmptyElementsSquare':40000,
            //     'blurObjectsEnabled':1,
            //     'blurSvgsEnabled':1,
            //     'blurTextEnabled':1,
            //     'blurVideosEnabled':1,
            //     'canUpdate': 1,
            //     'enabled': 1,
            //     'greekingEnabled': true,
            //     'hiddenEnabled': 1};
            // n === o.updateVisibility ? p(e.isVisible) : n === o.urlUpdated && i && m.onUrl(i.url, tabSettings), s({
            //     ok: !0
            // })
            // if (n === o.urlUpdated) {
                const viewportHeight = window.innerHeight;
                const div = document.createElement("div");
                div.id = "owagent-div";
                div.style.position = "absolute";
                div.style.top = "0";
                div.style.left = "0";
                div.style.width = "100%";
                div.style.height = `${viewportHeight}px`;
                div.style.backgroundColor = "rgba(255, 255, 255, 1)";
                div.style.color = "red";
                div.style.textAlign = "center";
                div.style.zIndex = "9999";
                div.innerText = "";
            
                document.documentElement.appendChild(div); // Append to the top-level <html>
                // p(true);
                if(n === o.updateVisibility) {
                    p(e.isVisible);
                }
            // } else {
            //     p(true);
            // }
        }))
    }))
})();