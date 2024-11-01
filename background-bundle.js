(() => {
    "use strict";
    Object.create, Object.create;
    class e {}
    var t, i, a, n;
    e.restoreSelection = "restoreSelection", e.updateSelection = "updateSelection", e.updateSelectionLayout = "updateSelectionLayout", e.updateLayout = "updateLayout", e.applySavedSettings = "applySavedSettings", e.sendSavedSettings = "sendSavedSettings", e.updateSettings = "updateSettings", e.updateSettingsLight = "updateSettingsLight", e.updateVisibility = "updateVisibility", e.urlUpdated = "urlUpdated", e.panelInitialized = "panelInitialized", t = void 0, i = void 0, n = function*() {
        const t = (e, t) => {
            chrome.tabs.sendMessage(e, t, (e => {
                chrome.runtime.lastError && console.debug(chrome.runtime.lastError.message)
            }))
        };
        chrome.tabs.onUpdated.addListener(((i, a, n) => {
            chrome.runtime.lastError ? console.log(chrome.runtime.lastError.message) : a.url && t(i, {
                name: e.urlUpdated,
                data: {
                    url: a.url
                }
            })
        })), chrome.action.onClicked.addListener((i => {
            chrome.runtime.lastError ? console.debug(chrome.runtime.lastError.message) : i && i.id && t(i.id, {
                name: e.updateVisibility,
                isVisible: !0
            })
        })), chrome.runtime.setUninstallURL("https://anton-voronov-a.github.io/greeked/assets/docs/review/")
    }, new((a = void 0) || (a = Promise))((function(e, r) {
        function o(e) {
            try {
                d(n.next(e))
            } catch (e) {
                r(e)
            }
        }

        function s(e) {
            try {
                d(n.throw(e))
            } catch (e) {
                r(e)
            }
        }

        function d(t) {
            var i;
            t.done ? e(t.value) : (i = t.value, i instanceof a ? i : new a((function(e) {
                e(i)
            }))).then(o, s)
        }
        d((n = n.apply(t, i || [])).next())
    }))
})();