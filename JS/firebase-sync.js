/* ClassLedger cloud sync (optional).
   Google sign-in + Firestore. The app keeps working from localStorage; this module only
   mirrors the data to the signed-in user's own space in Firebase:
     users/{uid}/students/{studentId}   one document per student
     users/{uid}/meta/groups            one document with all groups
     users/{uid}/meta/profile           the teacher's own details (name, phone, subject)
   Loaded as <script type="module">. If the config is not filled in, or Firebase can't be
   reached, nothing here runs and the app behaves exactly as before. */
import { stableStringify, diffStudents, mergeGroups } from "./sync-core.js";

var SDK_VERSION = "10.14.1";
var SDK_BASE = "https://www.gstatic.com/firebasejs/" + SDK_VERSION + "/";
var UID_KEY = "classledger:cloud-uid";
var PUSH_DELAY_MS = 600;

function idsKey(uid) {
  return "classledger:cloud-ids:" + uid;
}

var STR = {
  en: {
    hint: "Sign in to back up your data and use it on your other devices.",
    signIn: "Sign in with Google",
    signOut: "Sign out",
    status_syncing: "Syncing…",
    status_synced: "Saved to the cloud",
    status_offline: "Offline — changes will sync when you're back online",
    status_error: "Sync problem — your data is still safe on this device",
    switchAccount:
      "This device has data from a different account. Replace it with this account's data?",
    saveFailTitle: "Cloud save failed",
    saveFail:
      "Your data is safe on this device. Check your connection or the Firestore rules.",
    signInFail: "Sign-in failed.",
    signedIn: "Signed in. Your data is syncing.",
    domainHint:
      "This website address isn't authorized yet. Add it in Firebase → Authentication → Settings → Authorized domains.",
    rulesHint: "The cloud refused access. Check the Firestore security rules.",
    account: "My account",
    acctTitle: "My account",
    acctName: "Name",
    acctPhone: "Phone",
    acctSubject: "Subject / specialty",
    acctEmail: "Signed in as",
    acctSave: "Save",
    acctSaved: "Your details were saved.",
    close: "Close",
    dangerTitle: "Delete account",
    dangerText:
      "This permanently deletes all your data from the cloud (students, groups, details) and closes your account. It cannot be undone. Tip: use “Export data” first to keep a backup file.",
    eraseLocal: "Also erase the data stored on this device",
    typeToConfirm: "Type DELETE to confirm",
    deleteBtn: "Delete my account",
    deleting: "Deleting…",
    deleted: "Account deleted.",
    deleteFail: "Couldn't delete the account.",
  },
  ar: {
    hint: "سجّل دخولك باش تحفظ بياناتك وتستعملها في أجهزتك الأخرى.",
    signIn: "الدخول بحساب Google",
    signOut: "تسجيل الخروج",
    status_syncing: "جاري المزامنة…",
    status_synced: "محفوظ في السحابة",
    status_offline: "بلا إنترنت — التعديلات تتزامن كي ترجع الشبكة",
    status_error: "مشكل في المزامنة — بياناتك محفوظة في الجهاز",
    switchAccount:
      "الجهاز هذا فيه بيانات من حساب آخر. تحب تعوضها ببيانات الحساب هذا؟",
    saveFailTitle: "فشل الحفظ في السحابة",
    saveFail: "بياناتك محفوظة في الجهاز. تثبّت من الشبكة ولا من قواعد Firestore.",
    signInFail: "فشل تسجيل الدخول.",
    signedIn: "تم تسجيل الدخول. بياناتك تتزامن.",
    domainHint:
      "عنوان الموقع هذا موش مصرّح بيه. زيدو في Firebase ← Authentication ← Settings ← Authorized domains.",
    rulesHint: "السحابة رفضت الوصول. تثبّت من قواعد أمان Firestore.",
    account: "حسابي",
    acctTitle: "حسابي",
    acctName: "الاسم",
    acctPhone: "الهاتف",
    acctSubject: "المادة / الاختصاص",
    acctEmail: "مسجّل بحساب",
    acctSave: "حفظ",
    acctSaved: "تم حفظ معلوماتك.",
    close: "إغلاق",
    dangerTitle: "حذف الحساب",
    dangerText:
      "هذا يمسح بياناتك كلها من السحابة نهائياً (التلاميذ، المجموعات، المعلومات) ويغلق حسابك. ما ينجمش يتراجع. نصيحة: اعمل «إخراج البيانات» قبل باش تخزّن نسخة احتياطية.",
    eraseLocal: "امسح كذلك البيانات المخزّنة في الجهاز هذا",
    typeToConfirm: "اكتب DELETE للتأكيد",
    deleteBtn: "حذف حسابي",
    deleting: "جاري الحذف…",
    deleted: "تم حذف الحساب.",
    deleteFail: "ما نجمناش نحذفو الحساب.",
  },
};

var ICON_USER =
  '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></svg>';
var ICON_OUT =
  '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M16 8l4 4-4 4M20 12H9"/></svg>';

function t(key) {
  var lang = document.documentElement.lang === "ar" ? "ar" : "en";
  return STR[lang][key];
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readIds(uid) {
  try {
    return new Set(JSON.parse(window.localStorage.getItem(idsKey(uid)) || "[]"));
  } catch (e) {
    return new Set();
  }
}

async function loadSdk() {
  var mods = await Promise.all([
    import(SDK_BASE + "firebase-app.js"),
    import(SDK_BASE + "firebase-auth.js"),
    import(SDK_BASE + "firebase-firestore.js"),
  ]);
  return Object.assign({}, mods[0], mods[1], mods[2]);
}

async function main() {
  var mount = document.getElementById("cloudSync");
  var app = window.ClassLedgerApp;
  var cfg = window.CLASSLEDGER_FIREBASE_CONFIG;
  var configured =
    cfg &&
    cfg.apiKey &&
    cfg.projectId &&
    !/^PASTE/i.test(cfg.apiKey) &&
    !/^PASTE/i.test(cfg.projectId);
  if (!mount || !app || !configured) return; // stay local-only

  var sdk;
  try {
    // __CLASSLEDGER_TEST_SDK__ lets the tests plug in a fake Firebase
    sdk = window.__CLASSLEDGER_TEST_SDK__ || (await loadSdk());
  } catch (e) {
    console.warn("ClassLedger cloud sync unavailable:", e);
    return;
  }

  var fbApp = sdk.initializeApp(cfg);
  var auth = sdk.getAuth(fbApp);
  var db;
  try {
    db = sdk.initializeFirestore(fbApp, {
      localCache: sdk.persistentLocalCache({
        tabManager: sdk.persistentMultipleTabManager(),
      }),
    });
  } catch (e) {
    db = sdk.getFirestore(fbApp);
  }

  var user = null;
  var sync = null;
  var authReady = false;

  /* ---------------- UI ---------------- */
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }
  function button(label, icon, onClick) {
    var b = el("button", "data-transfer-btn");
    b.type = "button";
    var ic = el("span", "data-btn-icon");
    ic.innerHTML = icon; // static, trusted SVG
    b.append(ic, el("span", "", label));
    b.addEventListener("click", onClick);
    return b;
  }
  function currentStatus() {
    if (sync && sync.error) return "error";
    if (!window.navigator.onLine) return "offline";
    if (!sync || !sync.reconciled || sync.inflight > 0) return "syncing";
    return "synced";
  }
  function render() {
    if (!authReady) return;
    mount.hidden = false;
    mount.textContent = "";
    if (!user) {
      mount.append(el("p", "cloud-hint", t("hint")), button(t("signIn"), ICON_USER, signIn));
      return;
    }
    var account = el("div", "cloud-account");
    if (user.photoURL) {
      var img = el("img", "cloud-avatar");
      img.alt = "";
      img.referrerPolicy = "no-referrer";
      img.src = user.photoURL;
      account.append(img);
    }
    var shownName = (app.getProfile && app.getProfile().name) || user.email || user.displayName || "";
    account.append(el("span", "cloud-email", shownName));
    var status = currentStatus();
    var actions = el("div", "cloud-actions");
    actions.append(
      button(t("account"), ICON_USER, openAccountModal),
      button(t("signOut"), ICON_OUT, function () {
        sdk.signOut(auth);
      }),
    );
    mount.append(account, el("span", "cloud-status is-" + status, t("status_" + status)), actions);
  }

  /* ---------------- account modal ---------------- */
  function closeAccountModal() {
    var overlay = document.getElementById("acctOverlay");
    if (overlay) overlay.remove();
    document.removeEventListener("keydown", onAcctKey);
  }
  function onAcctKey(e) {
    if (e.key === "Escape") closeAccountModal();
  }
  function field(labelText, value, type, max) {
    var wrap = el("label", "acct-field");
    wrap.append(el("span", "acct-label", labelText));
    var input = el("input", "acct-input");
    input.type = type;
    input.value = value || "";
    input.maxLength = max;
    wrap.append(input);
    return { wrap: wrap, input: input };
  }
  function openAccountModal() {
    if (!user || document.getElementById("acctOverlay")) return;
    var p = app.getProfile();
    var overlay = el("div", "acct-overlay");
    overlay.id = "acctOverlay";
    var modal = el("div", "acct-modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", t("acctTitle"));

    var head = el("div", "acct-head");
    head.append(el("h2", "acct-title", t("acctTitle")));
    var x = el("button", "acct-close", "×");
    x.type = "button";
    x.setAttribute("aria-label", t("close"));
    x.addEventListener("click", closeAccountModal);
    head.append(x);

    var emailLine = el("p", "acct-email");
    emailLine.append(el("span", "", t("acctEmail") + " "), el("strong", "", user.email || ""));

    var fName = field(t("acctName"), p.name || user.displayName || "", "text", 60);
    var fPhone = field(t("acctPhone"), p.phone, "tel", 30);
    var fSubject = field(t("acctSubject"), p.subject, "text", 60);
    var save = el("button", "acct-primary", t("acctSave"));
    save.type = "button";
    save.addEventListener("click", function () {
      app.setProfile({
        name: fName.input.value,
        phone: fPhone.input.value,
        subject: fSubject.input.value,
      });
      app.toast(t("acctSaved"), false, null, "info");
      closeAccountModal();
      render();
    });

    var danger = el("div", "acct-danger");
    danger.append(el("h3", "acct-danger-title", t("dangerTitle")), el("p", "acct-danger-text", t("dangerText")));
    var eraseWrap = el("label", "acct-check");
    var erase = el("input");
    erase.type = "checkbox";
    eraseWrap.append(erase, el("span", "", t("eraseLocal")));
    var confirmField = field(t("typeToConfirm"), "", "text", 10);
    confirmField.input.autocomplete = "off";
    confirmField.input.setAttribute("dir", "ltr");
    var del = el("button", "acct-delete", t("deleteBtn"));
    del.type = "button";
    del.disabled = true;
    confirmField.input.addEventListener("input", function () {
      del.disabled = confirmField.input.value.trim() !== "DELETE";
    });
    del.addEventListener("click", function () {
      deleteAccount(erase.checked, del);
    });
    danger.append(eraseWrap, confirmField.wrap, del);

    modal.append(head, emailLine, fName.wrap, fPhone.wrap, fSubject.wrap, save, danger);
    overlay.append(modal);
    overlay.addEventListener("mousedown", function (e) {
      if (e.target === overlay) closeAccountModal();
    });
    document.body.append(overlay);
    document.addEventListener("keydown", onAcctKey);
    fName.input.focus();
  }

  async function deleteAccount(eraseLocal, delBtn) {
    var u = auth.currentUser;
    if (!u) return;
    var label = delBtn.textContent;
    function restore() {
      delBtn.disabled = false;
      delBtn.textContent = label;
    }
    delBtn.disabled = true;
    delBtn.textContent = t("deleting");
    // deleting an account is a sensitive action: Google asks the person to sign in again
    try {
      await sdk.reauthenticateWithPopup(u, new sdk.GoogleAuthProvider());
    } catch (err) {
      restore();
      var rc = err && err.code;
      if (rc !== "auth/popup-closed-by-user" && rc !== "auth/cancelled-popup-request")
        app.toast(t("deleteFail") + (rc ? " (" + rc + ")" : ""), true);
      return;
    }
    var uid = u.uid;
    stopSync(); // stop listening and pushing, otherwise the sync would re-upload what we delete
    try {
      var snap = await sdk.getDocs(sdk.collection(db, "users", uid, "students"));
      var refs = snap.docs
        .map(function (d) {
          return d.ref;
        })
        .concat([sdk.doc(db, "users", uid, "meta", "groups"), sdk.doc(db, "users", uid, "meta", "profile")]);
      for (var i = 0; i < refs.length; i += 400) {
        var batch = sdk.writeBatch(db);
        refs.slice(i, i + 400).forEach(function (ref) {
          batch.delete(ref);
        });
        await batch.commit();
      }
      await sdk.deleteUser(u);
    } catch (err2) {
      restore();
      var code = err2 && err2.code;
      app.toast(t("deleteFail") + (code ? " (" + code + ")" : ""), true);
      if (auth.currentUser) startSync(auth.currentUser); // nothing is lost: resume syncing
      render();
      return;
    }
    try {
      window.localStorage.removeItem(UID_KEY);
      window.localStorage.removeItem(idsKey(uid));
    } catch (e) {}
    if (eraseLocal) {
      app.applyRemote({ replaceAll: true });
      app.setProfile({}, { silent: true });
    }
    closeAccountModal();
    app.toast(t("deleted"), false, null, "info");
    render();
  }

  /* ---------------- auth ---------------- */
  async function signIn() {
    var provider = new sdk.GoogleAuthProvider();
    try {
      await sdk.signInWithPopup(auth, provider);
      app.toast(t("signedIn"), false, null, "info");
    } catch (err) {
      var code = err && err.code;
      if (
        code === "auth/popup-blocked" ||
        code === "auth/operation-not-supported-in-this-environment"
      ) {
        try {
          await sdk.signInWithRedirect(auth, provider);
          return;
        } catch (err2) {
          err = err2;
          code = err2 && err2.code;
        }
      }
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return;
      app.toast(
        code === "auth/unauthorized-domain"
          ? t("domainHint")
          : t("signInFail") + (code ? " (" + code + ")" : ""),
        true,
      );
    }
  }

  function stopSync() {
    if (sync) {
      clearTimeout(sync.timer);
      sync.unsubs.forEach(function (unsub) {
        try {
          unsub();
        } catch (e) {}
      });
    }
    sync = null;
    user = null;
  }

  function startSync(u) {
    stopSync();
    var prevUid = window.localStorage.getItem(UID_KEY);
    if (prevUid && prevUid !== u.uid) {
      // this device still holds another account's data: never mix it into this account
      if (!window.confirm(t("switchAccount"))) {
        sdk.signOut(auth);
        return;
      }
      app.applyRemote({ replaceAll: true });
    }
    window.localStorage.setItem(UID_KEY, u.uid);
    user = u;
    sync = {
      uid: u.uid,
      studentsCol: sdk.collection(db, "users", u.uid, "students"),
      groupsRef: sdk.doc(db, "users", u.uid, "meta", "groups"),
      profileRef: sdk.doc(db, "users", u.uid, "meta", "profile"),
      lastProfile: null, // stable string of the profile last known in the cloud
      lastSynced: new Map(), // student id -> stable string last known in the cloud
      lastGroups: null, // stable string of the groups last known in the cloud
      previousIds: readIds(u.uid), // students this device had synced in an earlier visit
      localDirty: false, // true while edits made on this device are waiting to be pushed
      gotStudents: false,
      gotGroups: false,
      reconciled: false, // first answer from the server for students
      groupsReconciled: false, // first answer from the server for groups
      inflight: 0,
      error: null,
      timer: null,
      unsubs: [],
    };
    var current = sync;
    current.unsubs.push(
      sdk.onSnapshot(current.studentsCol, { includeMetadataChanges: true }, onStudents, onSyncError),
      sdk.onSnapshot(current.groupsRef, { includeMetadataChanges: true }, onGroups, onSyncError),
      sdk.onSnapshot(current.profileRef, { includeMetadataChanges: true }, onProfile, onSyncError),
    );
  }

  function persistIds() {
    // before the server has answered, lastSynced may be a partial cache: don't overwrite the record
    if (!sync || !sync.reconciled) return;
    try {
      window.localStorage.setItem(
        idsKey(sync.uid),
        JSON.stringify(Array.from(sync.lastSynced.keys())),
      );
    } catch (e) {}
  }

  /* ---------------- cloud -> device ---------------- */
  function onStudents(snap) {
    if (!sync) return;
    sync.gotStudents = true;
    var upserts = [];
    var removed = [];
    snap.docChanges().forEach(function (change) {
      var id = change.doc.id;
      if (change.type === "removed") {
        sync.lastSynced.delete(id);
        removed.push(id);
        return;
      }
      var student = Object.assign({}, change.doc.data(), { id: id });
      var str = stableStringify(student);
      if (sync.lastSynced.get(id) === str) return; // echo of our own write
      sync.lastSynced.set(id, str);
      upserts.push(student);
    });

    var local = app.getSnapshot().students;
    if (!sync.reconciled && !snap.metadata.fromCache) {
      sync.reconciled = true;
      // students this device synced before but the cloud no longer has were deleted elsewhere
      var cloudIds = new Set(
        snap.docs.map(function (d) {
          return d.id;
        }),
      );
      local.forEach(function (s) {
        if (
          !cloudIds.has(s.id) &&
          sync.previousIds.has(s.id) &&
          removed.indexOf(s.id) === -1
        )
          removed.push(s.id);
      });
    }
    var localIds = new Set(
      local.map(function (s) {
        return s.id;
      }),
    );
    removed = removed.filter(function (id) {
      return localIds.has(id);
    });

    if (upserts.length || removed.length)
      app.applyRemote({ upsertStudents: upserts, removeStudentIds: removed });
    persistIds();
    sync.error = null;
    render();
    schedulePush(0);
  }

  function onGroups(snap) {
    if (!sync) return;
    sync.gotGroups = true;
    var items = snap.exists() ? snap.data().items || [] : null;
    if (items) {
      var str = stableStringify(items);
      if (str !== sync.lastGroups) {
        var next = items;
        // keep this device's own groups until the server has answered, or while edits are waiting
        if ((!sync.groupsReconciled && !snap.metadata.fromCache) || sync.localDirty) {
          next = mergeGroups(items, app.getSnapshot().groups);
        }
        sync.lastGroups = str;
        app.applyRemote({ groups: next });
      }
    }
    if (!snap.metadata.fromCache) sync.groupsReconciled = true;
    sync.error = null;
    render();
    schedulePush(0);
  }

  function hasProfile(p) {
    return !!(p && (p.name || p.phone || p.subject));
  }
  function onProfile(snap) {
    if (!sync) return;
    if (snap.exists()) {
      var data = snap.data();
      var p = { name: data.name || "", phone: data.phone || "", subject: data.subject || "" };
      var str = stableStringify(p);
      if (str !== sync.lastProfile) {
        sync.lastProfile = str; // also stops our own write from echoing back
        app.setProfile(p, { silent: true });
      }
    } else if (!snap.metadata.fromCache) {
      pushProfile(); // first sign-in: upload the details already typed on this device
    }
    render();
  }
  function pushProfile() {
    var current = sync;
    if (!current) return;
    var p = app.getProfile();
    var str = stableStringify(p);
    if (str === current.lastProfile) return;
    if (current.lastProfile === null && !hasProfile(p)) return;
    current.lastProfile = str;
    sdk
      .setDoc(current.profileRef, Object.assign({}, p, { updatedAt: sdk.serverTimestamp() }))
      .catch(function (err) {
        if (sync !== current) return;
        current.lastProfile = null;
        onSyncError(err);
      });
  }

  function onSyncError(err) {
    if (!sync) return;
    sync.error = err;
    if (err && err.code === "permission-denied") app.toast(t("rulesHint"), true, t("saveFailTitle"));
    render();
  }

  /* ---------------- device -> cloud ---------------- */
  function schedulePush(delay) {
    if (!sync) return;
    clearTimeout(sync.timer);
    sync.timer = setTimeout(pushNow, delay);
  }

  function pushNow() {
    var current = sync;
    if (!current) return;
    current.timer = null;
    if (!current.gotStudents || !current.gotGroups) return; // wait for the cloud's first answer
    // While online, wait until the server (not just the local cache) has answered for both,
    // so a stale copy on this device can never overwrite newer data.
    if (window.navigator.onLine && !(current.reconciled && current.groupsReconciled)) return;
    current.localDirty = false;

    var snapshot = app.getSnapshot();
    var diff = diffStudents(current.lastSynced, snapshot.students);
    var groups = clone(snapshot.groups);
    var groupsStr = stableStringify(groups);
    var pushGroups =
      groupsStr !== current.lastGroups && !(groups.length === 0 && current.lastGroups === null);
    if (!diff.upserts.length && !diff.deletes.length && !pushGroups) return;

    var batches = [];
    var batch = sdk.writeBatch(db);
    var count = 0;
    function add(fn) {
      fn(batch);
      if (++count >= 400) {
        batches.push(batch);
        batch = sdk.writeBatch(db);
        count = 0;
      }
    }
    diff.upserts.forEach(function (student) {
      add(function (b) {
        b.set(sdk.doc(current.studentsCol, student.id), clone(student));
      });
    });
    diff.deletes.forEach(function (id) {
      add(function (b) {
        b.delete(sdk.doc(current.studentsCol, id));
      });
    });
    if (pushGroups) {
      add(function (b) {
        b.set(current.groupsRef, { items: groups, updatedAt: sdk.serverTimestamp() });
      });
    }
    if (count > 0) batches.push(batch);

    // remember the new state now: Firestore queues the writes even while offline
    current.lastSynced = diff.nextSynced;
    if (pushGroups) current.lastGroups = groupsStr;
    persistIds();
    current.inflight += batches.length;
    render();
    batches.forEach(function (b) {
      b.commit().then(
        function () {
          if (sync !== current) return;
          current.inflight--;
          current.error = null;
          render();
        },
        function (err) {
          if (sync !== current) return;
          current.inflight--;
          current.error = err;
          // forget what we thought was saved so the next change uploads everything again
          current.lastSynced = new Map();
          current.lastGroups = null;
          app.toast(t("saveFail"), true, t("saveFailTitle"));
          render();
        },
      );
    });
  }

  /* ---------------- wiring ---------------- */
  window.addEventListener("classledger:data-changed", function () {
    if (sync) sync.localDirty = true;
    schedulePush(PUSH_DELAY_MS);
  });
  window.addEventListener("classledger:profile-changed", function () {
    pushProfile();
    render();
  });
  window.addEventListener("classledger:profile-applied", render);
  window.addEventListener("online", function () {
    render();
    schedulePush(0);
  });
  window.addEventListener("offline", render);
  if (typeof MutationObserver === "function") {
    new MutationObserver(render).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  sdk.onAuthStateChanged(auth, function (u) {
    authReady = true;
    if (u) startSync(u);
    else stopSync();
    render();
  });
}

main().catch(function (e) {
  console.warn("ClassLedger cloud sync failed to start:", e);
});
