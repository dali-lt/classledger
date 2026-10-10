/* ClassLedger student space (shell).
   Guards the page: signed out -> ./ , teacher -> teach.
   The chapters list is empty on purpose: step 2 fills it from Firestore. */

var SDK_VERSION = "10.14.1";
var SDK_BASE = "https://www.gstatic.com/firebasejs/" + SDK_VERSION + "/";
var LANG_KEY = "classledger:lang";

var STR = {
  en: {
    hello: "Hello",
    sub: "Pick a chapter, practice, and track your progress.",
    chapters: "Chapters",
    emptyTitle: "Your first chapters are on their way",
    emptyText: "Come back soon: new exercises are being added.",
    signOut: "Sign out",
  },
  ar: {
    hello: "مرحبا",
    sub: "اختار فصل، تمرّن، وتابع تقدمك.",
    chapters: "الفصول",
    emptyTitle: "أول الفصول في الطريق",
    emptyText: "ارجع قريب: تمارين جديدة تتزاد.",
    signOut: "تسجيل الخروج",
  },
};

var lang = "en";
try {
  lang = localStorage.getItem(LANG_KEY) === "ar" ? "ar" : "en";
} catch (e) {}

function t(key) {
  return STR[lang][key];
}
function $(id) {
  return document.getElementById(id);
}
function el(tag, cls, text) {
  var node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
}

var currentUser = null;

function render() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("#langSwitch .lang-btn").forEach(function (b) {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
  if (!currentUser) return;

  var first = (currentUser.displayName || "").trim().split(/\s+/)[0];
  $("sGreeting").textContent = first ? t("hello") + (lang === "ar" ? " " : ", ") + first : t("hello");
  $("sSub").textContent = t("sub");
  $("sChaptersTitle").textContent = t("chapters");
  $("sSignOut").textContent = t("signOut");

  var user = $("sUser");
  user.textContent = "";
  if (currentUser.photoURL) {
    var img = el("img");
    img.alt = "";
    img.referrerPolicy = "no-referrer";
    img.src = currentUser.photoURL;
    user.append(img);
  }

  var list = $("sChapters");
  list.textContent = "";
  var empty = el("div", "student-empty");
  empty.append(el("b", "", t("emptyTitle")), el("span", "", t("emptyText")));
  list.append(empty);
}

async function main() {
  document.querySelectorAll("#langSwitch .lang-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.lang === "ar" ? "ar" : "en";
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch (e) {}
      render();
    });
  });
  render();

  var cfg = window.CLASSLEDGER_FIREBASE_CONFIG;
  if (!cfg || !cfg.apiKey || /^PASTE/i.test(cfg.apiKey)) {
    window.location.replace("./");
    return;
  }

  var mods = await Promise.all([
    import(SDK_BASE + "firebase-app.js"),
    import(SDK_BASE + "firebase-auth.js"),
    import(SDK_BASE + "firebase-firestore.js"),
  ]);
  var sdk = Object.assign({}, mods[0], mods[1], mods[2]);
  var fbApp = sdk.initializeApp(cfg);
  var auth = sdk.getAuth(fbApp);
  var db = sdk.getFirestore(fbApp);

  $("sSignOut").addEventListener("click", function () {
    sdk.signOut(auth);
  });

  sdk.onAuthStateChanged(auth, async function (u) {
    if (!u) {
      window.location.replace("./");
      return;
    }
    var role = null;
    try {
      var snap = await sdk.getDoc(sdk.doc(db, "users", u.uid, "meta", "account"));
      role = snap.exists() ? snap.data().role : null;
    } catch (e) {
      window.location.replace("./");
      return;
    }
    if (role === "teacher") {
      window.location.replace("teach");
      return;
    }
    if (role !== "student") {
      window.location.replace("./");
      return;
    }
    currentUser = u;
    $("studentApp").hidden = false;
    render();
  });
}

main().catch(function (e) {
  console.warn("ClassLedger student page failed to start:", e);
  window.location.replace("./");
});
