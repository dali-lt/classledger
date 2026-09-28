(function () {
  "use strict";

  var STORAGE_KEY = "classledger:students";
  var LANG_KEY = "classledger:lang";

  var LEVELS = [
    "7 أساسي",
    "8 أساسي",
    "9 أساسي",
    "1 ثانوي",
    "2 ثانوي",
    "3 ثانوي",
    "4 ثانوي",
  ];
  var LEVEL_CATEGORY = {
    "7 أساسي": "college",
    "8 أساسي": "college",
    "9 أساسي": "college",
    "1 ثانوي": "lycee",
    "2 ثانوي": "lycee",
    "3 ثانوي": "lycee",
    "4 ثانوي": "lycee",
  };
  var LEVEL_SHORT_LABELS = {
    en: {
      "7 أساسي": "7th Grade",
      "8 أساسي": "8th Grade",
      "9 أساسي": "9th Grade",
      "1 ثانوي": "1st Lycée",
      "2 ثانوي": "2nd Lycée",
      "3 ثانوي": "3rd Lycée",
      "4 ثانوي": "4th / Bac",
    },
    ar: {
      "7 أساسي": "7 أساسي",
      "8 أساسي": "8 أساسي",
      "9 أساسي": "9 أساسي",
      "1 ثانوي": "1 ثانوي",
      "2 ثانوي": "2 ثانوي",
      "3 ثانوي": "3 ثانوي",
      "4 ثانوي": "4 ثانوي",
    },
  };
  var LEVEL_LABELS = {
    en: {
      "7 أساسي": "7th Grade",
      "8 أساسي": "8th Grade",
      "9 أساسي": "9th Grade",
      "1 ثانوي": "1st Form (Lycée)",
      "2 ثانوي": "2nd Form (Lycée)",
      "3 ثانوي": "3rd Form (Lycée)",
      "4 ثانوي": "4th Form / Bac",
    },
    ar: {
      "7 أساسي": "7 أساسي",
      "8 أساسي": "8 أساسي",
      "9 أساسي": "9 أساسي",
      "1 ثانوي": "1 ثانوي",
      "2 ثانوي": "2 ثانوي",
      "3 ثانوي": "3 ثانوي",
      "4 ثانوي": "4 ثانوي",
    },
  };

  var STR = {
    en: {
      navStudents: "Students",
      navCalendar: "Calendar",
      sidebarTotal: "enrolled students",
      pageTitleStudents: "Students",
      pageTitleCalendar: "Calendar",
      heroMorning: "Good morning 👋",
      heroDay: "Hello 👋",
      heroEvening: "Good evening 👋",
      heroText:
        "Track your students, add new ones, and keep every detail in one place.",
      statTotal: "Total students",
      kpiCollege: "Collège",
      kpiLycee: "Lycée",
      distributionTitle: "Collège vs Lycée",
      byLevelTitle: "Students per level",
      searchPlaceholder: "Search by first or last name...",
      allLevels: "All levels",
      addStudent: "+ Add student",
      thName: "Name",
      thLevel: "Level",
      thStart: "Start date",
      thEnd: "End date",
      thNotes: "Notes",
      edit: "Edit",
      delete: "Delete",
      emptyNoneTitle: "No students yet",
      emptyNoneText: "Add your first student to get started.",
      emptyFilterTitle: "No results",
      emptyFilterText: "Try a different search or level.",
      modalAddTitle: "Add student",
      modalEditTitle: "Edit student",
      firstName: "First name",
      lastName: "Last name",
      level: "Level",
      gender: "Gender",
      genderPlaceholder: "Select...",
      genderMale: "Male",
      genderFemale: "Female",
      startDate: "Start date",
      endDate: "End date",
      optional: "(optional)",
      endDateHint:
        "Auto-set to 1 month after the start date (minus 1 day) — you can change it.",
      notes: "Notes",
      notesPlaceholder: "Any extra info about the student...",
      cancel: "Cancel",
      add: "Add",
      saveChanges: "Save changes",
      viewDetails: "Details",
      deleteConfirm: function (name) {
        return "Delete " + name + "? This can't be undone.";
      },
      detailsTitlePrefix: "",
      close: "Close",
      today: "Today",
      dow: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      eventsTitle: "Day events",
      legendStart: "Start of studies",
      legendEnd: "End of studies",
      noEventsTitle: "No events",
      noEventsText: "Pick another day or add an end date for a student.",
      clearAllConfirm:
        "Delete all students and their data? This can't be undone.",
      clearAllButton: "Clear all data",
      exportData: "Export data",
      importData: "Import data",
      importConfirm: "Import {count} students and replace the current data?",
      importSuccess: "Data imported successfully.",
      importError: "This file is not a valid ClassLedger backup.",
      exportSuccess: "Backup file downloaded.",
      saveError: "Could not save data in this browser.",
      toastSuccessTitle: "Success",
      toastErrorTitle: "Error",
      navPayments: "Payments",
      pageTitlePayments: "Payments",
      kpiMonthlyIncome: "Expected monthly income",
      kpiPaidAmount: "Paid amount",
      kpiUnpaidAmount: "Unpaid amount",
      paymentsRosterTitle: "Student payments",
      paymentMonthlyFee: "Monthly fee",
      paymentHistoryTitle: "Payment history",
      paymentHistoryEmpty: "No payments recorded yet.",
      paymentDateLabel: "Paid on",
      paymentOnTime: "On time",
      paymentSlightlyLate: "Slightly late",
      paymentVeryLate: "Very late",
      dueOn: "Due",
      dtSuffix: "DT",
      statusOverdue: "Overdue",
      statusPaidUp: "Paid up",
      markPaid: "Mark paid",
      markPaidConfirm: function (name) {
        return (
          "Mark " +
          name +
          " as paid and set the next due date one month from now?"
        );
      },
      markPaidSuccess: "Payment recorded.",
      locale: "en-GB",
    },
    ar: {
      navStudents: "قائمة التلاميذ",
      navCalendar: "التقويم",
      sidebarTotal: "تلميذ مسجّل",
      pageTitleStudents: "قائمة التلاميذ",
      pageTitleCalendar: "التقويم",
      heroMorning: "صباح الخير 👋",
      heroDay: "مرحبا 👋",
      heroEvening: "مساء الخير 👋",
      heroText:
        "تابع تلاميذك، زيد الجداد، وأرشيف كل معلومة تحتاجها في مكان وحد.",
      statTotal: "مجموع التلاميذ",
      kpiCollege: "إعدادي",
      kpiLycee: "ثانوي",
      distributionTitle: "إعدادي مقابل ثانوي",
      byLevelTitle: "التلاميذ حسب القسم",
      searchPlaceholder: "ابحث بالاسم أو اللقب...",
      allLevels: "كل الأقسام",
      addStudent: "+ إضافة تلميذ",
      thName: "الاسم واللقب",
      thLevel: "القسم",
      thStart: "تاريخ البداية",
      thEnd: "تاريخ الانتهاء",
      thNotes: "ملاحظات",
      edit: "تعديل",
      delete: "حذف",
      emptyNoneTitle: "ما فماش تلاميذ ثما",
      emptyNoneText: "زيد أول تلميذ باش تبدا في التسيير.",
      emptyFilterTitle: "ما فماش نتائج",
      emptyFilterText: "جرّب كلمة بحث أو قسم آخر.",
      modalAddTitle: "إضافة تلميذ",
      modalEditTitle: "تعديل معلومات التلميذ",
      firstName: "الاسم",
      lastName: "اللقب",
      level: "القسم",
      gender: "الجنس",
      genderPlaceholder: "اختر...",
      genderMale: "ذكر",
      genderFemale: "أنثى",
      startDate: "تاريخ بداية الدراسة",
      endDate: "تاريخ الانتهاء",
      optional: "(اختياري)",
      endDateHint:
        "يتحسب تلقائيًا: شهر بعد تاريخ البداية ناقص يوم — تنجم تبدّلو.",
      notes: "ملاحظات",
      notesPlaceholder: "أي معلومة إضافية على التلميذ...",
      cancel: "إلغاء",
      add: "إضافة",
      saveChanges: "حفظ التعديلات",
      viewDetails: "التفاصيل",
      deleteConfirm: function (name) {
        return "تأكد باش تحذف " + name + "؟";
      },
      detailsTitlePrefix: "",
      close: "إغلاق",
      today: "اليوم",
      dow: ["إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"],
      eventsTitle: "أحداث اليوم",
      legendStart: "بداية الدراسة",
      legendEnd: "نهاية الدراسة",
      noEventsTitle: "ما فماش أحداث",
      noEventsText: "اختر يوم آخر أو زيد تاريخ انتهاء لتلميذ.",
      clearAllConfirm:
        "تأكد باش تحذف التلامذة الكل ومعلوماتهم؟ العملية ما تتراجعش.",
      clearAllButton: "مسح جميع البيانات",
      exportData: "إخراج البيانات",
      importData: "إدخال البيانات",
      importConfirm: "باش تدخل {count} تلامذة وتعوّض البيانات الحالية؟",
      importSuccess: "تم إدخال البيانات بنجاح.",
      importError: "الملف هذا موش نسخة احتياطية صالحة لـ ClassLedger.",
      exportSuccess: "تم تحميل ملف النسخة الاحتياطية.",
      saveError: "تعذّر حفظ البيانات في هذا المتصفح.",
      toastSuccessTitle: "تم بنجاح",
      toastErrorTitle: "خطأ",
      navPayments: "المدفوعات",
      pageTitlePayments: "المدفوعات",
      kpiMonthlyIncome: "الدخل الشهري المتوقع",
      kpiPaidAmount: "المبلغ المدفوع",
      kpiUnpaidAmount: "المتبقي غير المدفوع",
      paymentsRosterTitle: "خلاص التلامذة",
      paymentMonthlyFee: "المعلوم الشهري",
      paymentHistoryTitle: "سجل الدفعات",
      paymentHistoryEmpty: "ما تسجلت حتى دفعة قبل.",
      paymentDateLabel: "تاريخ الدفع",
      paymentOnTime: "في وقتو",
      paymentSlightlyLate: "متأخر شوية",
      paymentVeryLate: "متأخر برشة",
      dueOn: "يخلص في",
      dtSuffix: "د.ت",
      statusOverdue: "متأخر",
      statusPaidUp: "مخلّص",
      markPaid: "تسجيل الخلاص",
      markPaidConfirm: function (name) {
        return (
          "تأكد باش تسجل " + name + " كمخلّص وتحدد تاريخ الخلاص الجاي بعد شهر؟"
        );
      },
      markPaidSuccess: "تم تسجيل الخلاص.",
      locale: "ar-TN",
    },
  };

  function t(key) {
    return STR[currentLang][key];
  }
  function levelLabel(value) {
    return LEVEL_LABELS[currentLang][value] || value;
  }
  function shortLevelLabel(value) {
    return LEVEL_SHORT_LABELS[currentLang][value] || value;
  }

  var els = {
    pillStudentsLabel: document.getElementById("pillStudentsLabel"),
    pillCalendarLabel: document.getElementById("pillCalendarLabel"),
    pageTitle: document.getElementById("pageTitle"),
    pageDate: document.getElementById("pageDate"),
    heroGreeting: document.getElementById("heroGreeting"),
    heroText: document.getElementById("heroText"),
    actionsStudents: document.getElementById("actionsStudents"),
    actionsCalendar: document.getElementById("actionsCalendar"),
    kpiRow: document.getElementById("kpiRow"),
    barChart: document.getElementById("barChart"),
    distributionTitleEl: document.getElementById("distributionTitleEl"),
    byLevelTitleEl: document.getElementById("byLevelTitleEl"),
    donutTotalLabel: document.getElementById("donutTotalLabel"),
    legendCollegeLabel: document.getElementById("legendCollegeLabel"),
    legendLyceeLabel: document.getElementById("legendLyceeLabel"),
    tableWrap: document.getElementById("tableWrap"),
    searchInput: document.getElementById("searchInput"),
    levelFilter: document.getElementById("levelFilter"),
    openAddBtn: document.getElementById("openAddBtn"),
    modalOverlay: document.getElementById("modalOverlay"),
    modalTitle: document.getElementById("modalTitle"),
    studentForm: document.getElementById("studentForm"),
    studentId: document.getElementById("studentId"),
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    level: document.getElementById("level"),
    gender: document.getElementById("gender"),
    lblGender: document.getElementById("lblGender"),
    genderPlaceholderOpt: document.getElementById("genderPlaceholderOpt"),
    genderMaleOpt: document.getElementById("genderMaleOpt"),
    genderFemaleOpt: document.getElementById("genderFemaleOpt"),
    startDate: document.getElementById("startDate"),
    endDate: document.getElementById("endDate"),
    endDateHint: document.getElementById("endDateHint"),
    notes: document.getElementById("notes"),
    cancelBtn: document.getElementById("cancelBtn"),
    submitBtn: document.getElementById("submitBtn"),
    lblFirstName: document.getElementById("lblFirstName"),
    lblLastName: document.getElementById("lblLastName"),
    lblLevel: document.getElementById("lblLevel"),
    lblStartDate: document.getElementById("lblStartDate"),
    lblEndDateText: document.getElementById("lblEndDateText"),
    lblEndDateOptional: document.getElementById("lblEndDateOptional"),
    lblNotesText: document.getElementById("lblNotesText"),
    lblNotesOptional: document.getElementById("lblNotesOptional"),
    noteModalOverlay: document.getElementById("noteModalOverlay"),
    noteModalTitle: document.getElementById("noteModalTitle"),
    noteModalBody: document.getElementById("noteModalBody"),
    noteCloseBtn: document.getElementById("noteCloseBtn"),
    calMonthLabel: document.getElementById("calMonthLabel"),
    calGrid: document.getElementById("calGrid"),
    calPrevBtn: document.getElementById("calPrevBtn"),
    calNextBtn: document.getElementById("calNextBtn"),
    calTodayBtn: document.getElementById("calTodayBtn"),
    eventsTitle: document.getElementById("eventsTitle"),
    eventsSub: document.getElementById("eventsSub"),
    eventsList: document.getElementById("eventsList"),
    legendStartLabel: document.getElementById("legendStartLabel"),
    legendEndLabel: document.getElementById("legendEndLabel"),
    langSwitch: document.getElementById("langSwitch"),
    clearDataBtn: document.getElementById("clearDataBtn"),
    clearDataLabel: document.getElementById("clearDataLabel"),
    exportDataBtn: document.getElementById("exportDataBtn"),
    importDataBtn: document.getElementById("importDataBtn"),
    importFile: document.getElementById("importFile"),
    exportDataLabel: document.getElementById("exportDataLabel"),
    importDataLabel: document.getElementById("importDataLabel"),
    toast: document.getElementById("toast"),
    toastIcon: document.getElementById("toastIcon"),
    toastTitle: document.getElementById("toastTitle"),
    toastMessage: document.getElementById("toastMessage"),
    toastClose: document.getElementById("toastClose"),
    pillPaymentsLabel: document.getElementById("pillPaymentsLabel"),
    paymentsKpiRow: document.getElementById("paymentsKpiRow"),
    paymentsList: document.getElementById("paymentsList"),
  };

  var LEVEL_PRICE = { college: 40, lycee: 45 };

  var PAGE_TITLE_KEY = {
    students: "pageTitleStudents",
    calendar: "pageTitleCalendar",
    payments: "pageTitlePayments",
  };

  var students = [];
  var calendarCursor = new Date();
  var selectedDate = new Date();
  var currentLang = "en";
  var currentPage = "students";
  var selectedPaymentId = null;

  /* ---------------- storage ---------------- */
  function loadStudents() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      students = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(students)) students = [];
      var avatarIndexes = { male: 0, female: 0 };
      students.forEach(function (student) {
        if (student.avatar) return;
        student.avatar = getNextAvatar(
          student.gender,
          avatarIndexes[student.gender] || 0,
        );
        if (avatarIndexes[student.gender] !== undefined)
          avatarIndexes[student.gender]++;
      });
      saveStudents();
    } catch (e) {
      students = [];
    }
  }
  var toastTimer = null;
  var TOAST_ICON_OK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 13l4 4L19 7"/></svg>';
  var TOAST_ICON_ERR =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  function showToast(message, isError, title) {
    if (!els.toast) return;
    if (els.toastIcon)
      els.toastIcon.innerHTML = isError ? TOAST_ICON_ERR : TOAST_ICON_OK;
    if (els.toastTitle)
      els.toastTitle.textContent =
        title || (isError ? t("toastErrorTitle") : t("toastSuccessTitle"));
    if (els.toastMessage) els.toastMessage.textContent = message;
    els.toast.classList.toggle("toast-error", !!isError);
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      els.toast.classList.remove("show");
    }, 2600);
  }

  function saveStudents() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      showToast(t("saveError"), true);
    }
  }
  function clearAllData() {
    if (!confirm(t("clearAllConfirm"))) return;
    students = [];
    saveStudents();
    renderStudentsPage();
    if (currentPage === "calendar") renderCalendar();
    if (currentPage === "payments") renderPaymentsPage();
  }
  function exportData() {
    var backup = {
      app: "ClassLedger",
      version: 1,
      exportedAt: new Date().toISOString(),
      students: students,
      lang: currentLang,
    };
    var blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "classledger-backup-" + toDateKey(new Date()) + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(t("exportSuccess"));
  }
  function importData(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var backup = JSON.parse(reader.result);
        var importedStudents = backup && backup.students;
        var valid =
          backup &&
          backup.app === "ClassLedger" &&
          Array.isArray(importedStudents) &&
          importedStudents.every(function (student) {
            return (
              student &&
              typeof student.id === "string" &&
              typeof student.firstName === "string" &&
              typeof student.lastName === "string" &&
              typeof student.level === "string" &&
              typeof student.startDate === "string"
            );
          });
        if (!valid) throw new Error("Invalid backup");
        if (
          !confirm(
            t("importConfirm").replace("{count}", importedStudents.length),
          )
        )
          return;
        students = importedStudents;
        saveStudents();
        renderStudentsPage();
        if (currentPage === "calendar") renderCalendar();
        if (currentPage === "payments") renderPaymentsPage();
        showToast(t("importSuccess"));
      } catch (e) {
        showToast(t("importError"), true);
      } finally {
        els.importFile.value = "";
      }
    };
    reader.readAsText(file);
  }
  function loadLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === "ar" || saved === "en") currentLang = saved;
    } catch (e) {}
  }
  function saveLang() {
    try {
      localStorage.setItem(LANG_KEY, currentLang);
    } catch (e) {}
  }
  function makeId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "id-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  /* ---------------- helpers ---------------- */
  function formatDate(iso) {
    if (!iso) return "—";
    var parts = iso.split("-");
    if (parts.length !== 3) return iso;
    return currentLang === "ar"
      ? parts[2] + "/" + parts[1] + "/" + parts[0]
      : parts[2] + "/" + parts[1] + "/" + parts[0];
  }
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : str;
    return div.innerHTML;
  }
  function autoEndDate(startIso) {
    var parts = startIso.split("-");
    var y = Number(parts[0]),
      m = Number(parts[1]),
      d = Number(parts[2]);
    if (!y || !m || !d) return "";
    var dt = new Date(y, m, d); // same day, next month (m is 0-indexed next month)
    dt.setDate(dt.getDate() - 1); // minus 1 day
    var yy = dt.getFullYear(),
      mm = String(dt.getMonth() + 1).padStart(2, "0"),
      dd = String(dt.getDate()).padStart(2, "0");
    return yy + "-" + mm + "-" + dd;
  }
  function toDateKey(d) {
    var y = d.getFullYear(),
      m = String(d.getMonth() + 1).padStart(2, "0"),
      day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function sameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function populateLevelSelects() {
    var filterHtml = '<option value="">' + t("allLevels") + "</option>";
    var formHtml = "";
    LEVELS.forEach(function (l) {
      filterHtml += '<option value="' + l + '">' + levelLabel(l) + "</option>";
      formHtml += '<option value="' + l + '">' + levelLabel(l) + "</option>";
    });
    els.levelFilter.innerHTML = filterHtml;
    els.level.innerHTML = formHtml;
  }

  function setHeaderDate() {
    var now = new Date();
    els.pageDate.textContent = now.toLocaleDateString(t("locale"), {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    var hour = now.getHours();
    els.heroGreeting.textContent =
      hour < 12
        ? t("heroMorning")
        : hour < 18
          ? t("heroDay")
          : t("heroEvening");
  }

  /* ---------------- language ---------------- */
  function applyStaticText() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

    if (els.langSwitch) {
      els.langSwitch.querySelectorAll(".lang-btn").forEach(function (b) {
        b.classList.toggle("active", b.dataset.lang === currentLang);
      });
    }

    els.pillStudentsLabel.textContent = t("navStudents");
    els.pillCalendarLabel.textContent = t("navCalendar");
    els.pillPaymentsLabel.textContent = t("navPayments");
    if (els.toastClose) els.toastClose.setAttribute("aria-label", t("close"));
    els.distributionTitleEl.textContent = t("distributionTitle");
    els.byLevelTitleEl.textContent = t("byLevelTitle");
    els.donutTotalLabel.textContent = t("statTotal");
    els.legendCollegeLabel.textContent = t("kpiCollege");
    els.legendLyceeLabel.textContent = t("kpiLycee");
    els.heroText.textContent = t("heroText");
    els.openAddBtn.textContent = t("addStudent");
    els.clearDataLabel.textContent = t("clearAllButton");
    els.clearDataBtn.setAttribute("aria-label", t("clearAllButton"));
    els.clearDataBtn.setAttribute("title", t("clearAllButton"));
    els.exportDataLabel.textContent = t("exportData");
    els.importDataLabel.textContent = t("importData");
    els.exportDataBtn.setAttribute("title", t("exportData"));
    els.importDataBtn.setAttribute("title", t("importData"));
    els.searchInput.placeholder = t("searchPlaceholder");
    els.eventsTitle.textContent = t("eventsTitle");
    els.legendStartLabel.textContent = t("legendStart");
    els.legendEndLabel.textContent = t("legendEnd");
    els.calTodayBtn.textContent = t("today");
    els.calPrevBtn.setAttribute(
      "aria-label",
      currentLang === "ar" ? "الشهر السابق" : "Previous month",
    );
    els.calNextBtn.setAttribute(
      "aria-label",
      currentLang === "ar" ? "الشهر القادم" : "Next month",
    );

    els.lblFirstName.textContent = t("firstName");
    els.lblLastName.textContent = t("lastName");
    els.lblLevel.textContent = t("level");
    els.lblGender.textContent = t("gender");
    els.genderPlaceholderOpt.textContent = t("genderPlaceholder");
    els.genderMaleOpt.textContent = t("genderMale");
    els.genderFemaleOpt.textContent = t("genderFemale");
    els.lblStartDate.textContent = t("startDate");
    els.lblEndDateText.textContent = t("endDate");
    els.lblEndDateOptional.textContent = t("optional");
    els.endDateHint.textContent = t("endDateHint");
    els.lblNotesText.textContent = t("notes");
    els.lblNotesOptional.textContent = t("optional");
    els.notes.placeholder = t("notesPlaceholder");
    els.cancelBtn.textContent = t("cancel");
    els.noteCloseBtn.textContent = t("close");

    els.pageTitle.textContent = t(PAGE_TITLE_KEY[currentPage]);

    populateLevelSelects();
  }

  function setLang(lang) {
    currentLang = lang;
    saveLang();
    applyStaticText();
    renderStudentsPage();
    if (currentPage === "calendar") renderCalendar();
    if (currentPage === "payments") renderPaymentsPage();
    setHeaderDate();
  }

  /* ---------------- navigation ---------------- */
  function switchPage(pageName) {
    currentPage = pageName;
    document.querySelectorAll(".nav-target").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.page === pageName);
    });
    document.querySelectorAll(".page").forEach(function (sec) {
      sec.classList.toggle("active", sec.id === "page-" + pageName);
    });
    els.pageTitle.textContent = t(PAGE_TITLE_KEY[pageName]);
    els.actionsStudents.style.display =
      pageName === "students" ? "flex" : "none";
    els.actionsCalendar.style.display =
      pageName === "calendar" ? "flex" : "none";
    if (pageName === "calendar") renderCalendar();
    if (pageName === "payments") renderPaymentsPage();
  }

  /* ---------------- students rendering ---------------- */
  function renderStats() {
    var total = students.length;
    var counts = {};
    LEVELS.forEach(function (l) {
      counts[l] = 0;
    });
    students.forEach(function (s) {
      if (counts[s.level] !== undefined) counts[s.level]++;
    });

    var totalCollege = 0,
      totalLycee = 0;
    LEVELS.forEach(function (l) {
      if (LEVEL_CATEGORY[l] === "lycee") totalLycee += counts[l];
      else totalCollege += counts[l];
    });

    /* ---- KPI cards ---- */
    els.kpiRow.innerHTML =
      '<div class="kpi-card kpi-total"><span class="kpi-label">' +
      t("statTotal") +
      '</span><span class="kpi-value">' +
      total +
      "</span></div>" +
      '<div class="kpi-card kpi-college"><span class="kpi-label">' +
      t("kpiCollege") +
      '</span><span class="kpi-value">' +
      totalCollege +
      "</span></div>" +
      '<div class="kpi-card kpi-lycee"><span class="kpi-label">' +
      t("kpiLycee") +
      '</span><span class="kpi-value">' +
      totalLycee +
      "</span></div>";

    /* ---- Donut chart ---- */
    var CIRC = 2 * Math.PI * 45;
    var collegeLen = total ? (totalCollege / total) * CIRC : 0;
    var lyceeLen = total ? (totalLycee / total) * CIRC : 0;
    var donutCollege = document.getElementById("donutCollege");
    var donutLycee = document.getElementById("donutLycee");
    donutCollege.setAttribute(
      "stroke-dasharray",
      collegeLen + " " + (CIRC - collegeLen),
    );
    donutCollege.setAttribute("stroke-dashoffset", "0");
    donutLycee.setAttribute(
      "stroke-dasharray",
      lyceeLen + " " + (CIRC - lyceeLen),
    );
    donutLycee.setAttribute("stroke-dashoffset", String(-collegeLen));
    document.getElementById("donutTotal").textContent = total;
    document.getElementById("legendCollegeValue").textContent = totalCollege;
    document.getElementById("legendLyceeValue").textContent = totalLycee;

    /* ---- Bar chart ---- */
    var maxCount = Math.max.apply(
      null,
      LEVELS.map(function (l) {
        return counts[l];
      }).concat([1]),
    );
    els.barChart.innerHTML = LEVELS.map(function (l) {
      var pct = Math.round((counts[l] / maxCount) * 100);
      return (
        '<div class="bar-col">' +
        '<span class="bar-count">' +
        counts[l] +
        "</span>" +
        '<div class="bar-shape" style="height:' +
        pct +
        '%"></div>' +
        '<span class="bar-label">' +
        shortLevelLabel(l) +
        "</span>" +
        "</div>"
      );
    }).join("");
  }

  function getFilteredStudents() {
    var query = els.searchInput.value.trim().toLowerCase();
    var levelFilterVal = els.levelFilter.value;
    return students
      .filter(function (s) {
        var matchesQuery =
          !query ||
          (s.firstName + " " + s.lastName).toLowerCase().indexOf(query) !== -1;
        var matchesLevel = !levelFilterVal || s.level === levelFilterVal;
        return matchesQuery && matchesLevel;
      })
      .sort(function (a, b) {
        var ai = LEVELS.indexOf(a.level),
          bi = LEVELS.indexOf(b.level);
        if (ai !== bi) return ai - bi;
        return a.lastName.localeCompare(b.lastName);
      });
  }

  var MALE_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="7.5" r="3.3"/><path d="M5 20c0-3.9 3.1-6.4 7-6.4s7 2.5 7 6.4"/></svg>';
  var FEMALE_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="7.5" r="3.3"/><path d="M12 10.8c-3.2 0-5.4 2.1-6 4.9-.1.6.4 1.1 1 1.1h3l-.4 3.2h4.8l-.4-3.2h3c.6 0 1.1-.5 1-1.1-.6-2.8-2.8-4.9-6-4.9Z"/></svg>';
  var MALE_AVATARS = [1, 3, 5, 7, 9];
  var FEMALE_AVATARS = [2, 4, 6, 8, 10];

  function getNextAvatar(gender, index) {
    var avatars = gender === "female" ? FEMALE_AVATARS : MALE_AVATARS;
    return "Images/slide-" + avatars[index % avatars.length] + ".svg";
  }

  function avatarMarkup(student) {
    return '<img class="avatar" src="' + student.avatar + '" alt="">';
  }

  function renderTable() {
    var list = getFilteredStudents();

    if (students.length === 0) {
      els.tableWrap.innerHTML =
        '<div class="empty"><b>' +
        t("emptyNoneTitle") +
        "</b>" +
        t("emptyNoneText") +
        "</div>";
      return;
    }
    if (list.length === 0) {
      els.tableWrap.innerHTML =
        '<div class="empty"><b>' +
        t("emptyFilterTitle") +
        "</b>" +
        t("emptyFilterText") +
        "</div>";
      return;
    }

    els.tableWrap.innerHTML = list
      .map(function (s) {
        var badgeClass =
          LEVEL_CATEGORY[s.level] === "lycee" ? "badge-lycee" : "badge-college";
        var hasNotes = s.notes && s.notes.trim().length > 0;
        var notesRow = hasNotes
          ? '<div class="card-notes-row">📝 ' + escapeHtml(s.notes) + "</div>"
          : "";
        return (
          '<div class="student-card" data-id="' +
          s.id +
          '">' +
          '<div class="card-top">' +
          '<div class="card-identity">' +
          avatarMarkup(s) +
          "<div>" +
          '<p class="card-name">' +
          escapeHtml(s.firstName) +
          " " +
          escapeHtml(s.lastName) +
          "</p>" +
          '<p class="card-sub"><span class="badge ' +
          badgeClass +
          '">' +
          escapeHtml(levelLabel(s.level)) +
          "</span></p>" +
          "</div>" +
          "</div>" +
          '<div class="card-menu">' +
          '<button type="button" class="kebab-btn" data-action="kebab" data-id="' +
          s.id +
          '">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/></svg>' +
          "</button>" +
          '<div class="kebab-menu" data-menu-id="' +
          s.id +
          '">' +
          '<button type="button" data-action="delete" data-id="' +
          s.id +
          '">' +
          t("delete") +
          "</button>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="card-stats">' +
          '<div class="card-stat"><span>' +
          t("thStart") +
          "</span><b>" +
          formatDate(s.startDate) +
          "</b></div>" +
          '<div class="card-stat"><span>' +
          t("thEnd") +
          "</span><b>" +
          formatDate(s.endDate) +
          "</b></div>" +
          "</div>" +
          notesRow +
          '<div class="card-actions">' +
          '<button type="button" class="btn btn-ghost" data-action="edit" data-id="' +
          s.id +
          '">' +
          t("edit") +
          "</button>" +
          '<button type="button" class="btn btn-primary" data-action="details" data-id="' +
          s.id +
          '">' +
          t("viewDetails") +
          "</button>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderStudentsPage() {
    renderStats();
    renderTable();
  }

  /* ---------------- payments ---------------- */
  function studentFee(student) {
    var category = LEVEL_CATEGORY[student.level];
    return LEVEL_PRICE[category] || 0;
  }

  function isPastDue(iso) {
    if (!iso) return false;
    return iso < toDateKey(new Date());
  }

  function advanceOneMonth(iso) {
    var parts = iso.split("-");
    var y = Number(parts[0]),
      m = Number(parts[1]),
      d = Number(parts[2]);
    if (!y || !m || !d) return iso;
    var dt = new Date(y, m, d); // m is 1-indexed current month -> Date's 0-indexed next month
    var yy = dt.getFullYear(),
      mm = String(dt.getMonth() + 1).padStart(2, "0"),
      dd = String(dt.getDate()).padStart(2, "0");
    return yy + "-" + mm + "-" + dd;
  }

  function paymentTiming(dueDate, paidAt) {
    if (!dueDate || paidAt <= dueDate) return "on-time";
    var dueParts = dueDate.split("-").map(Number);
    var paidParts = paidAt.split("-").map(Number);
    var delayDays =
      (Date.UTC(paidParts[0], paidParts[1] - 1, paidParts[2]) -
        Date.UTC(dueParts[0], dueParts[1] - 1, dueParts[2])) /
      86400000;
    return delayDays <= 7 ? "slightly-late" : "very-late";
  }

  function formatPaymentMonth(iso) {
    if (!iso) return "—";
    var parts = iso.split("-");
    if (parts.length !== 3) return iso;
    return new Intl.DateTimeFormat(t("locale"), {
      month: "long",
      year: "numeric",
    }).format(new Date(Number(parts[0]), Number(parts[1]) - 1, 1));
  }

  function markPaid(id) {
    var student = students.filter(function (s) {
      return s.id === id;
    })[0];
    if (!student) return;
    if (
      !confirm(t("markPaidConfirm")(student.firstName + " " + student.lastName))
    )
      return;
    var base = student.endDate || toDateKey(new Date());
    var paidAt = toDateKey(new Date());
    if (!Array.isArray(student.paymentHistory)) student.paymentHistory = [];
    student.paymentHistory.unshift({
      dueDate: base,
      paidAt: paidAt,
      amount: studentFee(student),
      timing: paymentTiming(base, paidAt),
    });
    var nextDueDate = advanceOneMonth(base);
    if (isPastDue(nextDueDate)) nextDueDate = advanceOneMonth(paidAt);
    student.endDate = nextDueDate;
    saveStudents();
    renderPaymentsPage();
    renderStudentsPage();
    if (currentPage === "calendar") renderCalendar();
    showToast(t("markPaidSuccess"));
  }

  function renderPaymentsPage() {
    if (!els.paymentsKpiRow || !els.paymentsList) return;

    var rows = students.map(function (s) {
      return {
        student: s,
        fee: studentFee(s),
        overdue: isPastDue(s.endDate),
      };
    });

    var expected = rows.reduce(function (sum, r) {
      return sum + r.fee;
    }, 0);
    var paidAmount = rows.reduce(function (sum, r) {
      return sum + (r.overdue ? 0 : r.fee);
    }, 0);
    var unpaidAmount = expected - paidAmount;

    els.paymentsKpiRow.innerHTML =
      '<div class="kpi-card kpi-total"><span class="kpi-label">' +
      t("kpiMonthlyIncome") +
      '</span><span class="kpi-value">' +
      expected +
      " " +
      t("dtSuffix") +
      "</span></div>" +
      '<div class="kpi-card kpi-college"><span class="kpi-label">' +
      t("kpiPaidAmount") +
      '</span><span class="kpi-value">' +
      paidAmount +
      " " +
      t("dtSuffix") +
      "</span></div>" +
      '<div class="kpi-card kpi-danger"><span class="kpi-label">' +
      t("kpiUnpaidAmount") +
      '</span><span class="kpi-value">' +
      unpaidAmount +
      " " +
      t("dtSuffix") +
      "</span></div>";

    if (rows.length === 0) {
      els.paymentsList.innerHTML =
        '<div class="payments-board empty-board"><div class="empty"><b>' +
        t("emptyNoneTitle") +
        "</b>" +
        t("emptyNoneText") +
        "</div></div>";
      return;
    }

    rows.sort(function (a, b) {
      if (a.overdue !== b.overdue) return a.overdue ? -1 : 1;
      return (a.student.endDate || "").localeCompare(b.student.endDate || "");
    });

    var selected = rows.filter(function (r) {
      return r.student.id === selectedPaymentId;
    })[0];
    if (!selected) {
      selected = rows[0];
      selectedPaymentId = selected.student.id;
    }

    var roster = rows
      .map(function (r) {
        var s = r.student;
        var rowClass =
          "payment-row" +
          (r.overdue ? " is-overdue" : "") +
          (s.id === selectedPaymentId ? " is-selected" : "");
        var statusClass = r.overdue ? "overdue" : "ok";
        var statusLabel = r.overdue ? t("statusOverdue") : t("statusPaidUp");
        return (
          '<article class="' +
          rowClass +
          '" data-id="' +
          s.id +
          '">' +
          '<button type="button" class="payment-select" data-action="select-payment" data-id="' +
          s.id +
          '" aria-pressed="' +
          (s.id === selectedPaymentId) +
          '">' +
          avatarMarkup(s) +
          '<span class="payment-info-text">' +
          '<p class="payment-name">' +
          escapeHtml(s.firstName + " " + s.lastName) +
          "</p>" +
          '<p class="payment-due">' +
          t("dueOn") +
          " " +
          formatDate(s.endDate) +
          "</p></span>" +
          '<span class="payment-fee">' +
          r.fee +
          " " +
          t("dtSuffix") +
          "</span>" +
          '<span class="payment-status ' +
          statusClass +
          '">' +
          statusLabel +
          "</span></button>" +
          '<div class="payment-actions"><button type="button" class="btn btn-primary" data-action="mark-paid" data-id="' +
          s.id +
          '"' +
          (r.overdue ? "" : " disabled") +
          ">" +
          t("markPaid") +
          "</button>" +
          "</div></article>"
        );
      })
      .join("");

    var student = selected.student;
    var selectedStatusClass = selected.overdue ? "overdue" : "ok";
    var selectedStatusLabel = selected.overdue
      ? t("statusOverdue")
      : t("statusPaidUp");
    var paymentHistory = Array.isArray(student.paymentHistory)
      ? student.paymentHistory.slice().sort(function (a, b) {
          return (b.paidAt || "").localeCompare(a.paidAt || "");
        })
      : [];
    var historyMarkup = paymentHistory.length
      ? paymentHistory
          .map(function (payment) {
            var timing = payment.timing || "on-time";
            var timingLabel =
              timing === "slightly-late"
                ? t("paymentSlightlyLate")
                : timing === "very-late"
                  ? t("paymentVeryLate")
                  : t("paymentOnTime");
            var badgeClass =
              timing === "slightly-late"
                ? "slightly-late"
                : timing === "very-late"
                  ? "very-late"
                  : "on-time";
            return (
              '<article class="payment-history-item"><div class="payment-history-copy"><b>' +
              formatPaymentMonth(payment.dueDate || payment.paidAt) +
              "</b><span>" +
              t("paymentDateLabel") +
              " " +
              formatDate(payment.paidAt) +
              '</span></div><span class="payment-history-badge ' +
              badgeClass +
              '">' +
              timingLabel +
              "</span></article>"
            );
          })
          .join("")
      : '<p class="payment-history-empty">' + t("paymentHistoryEmpty") + "</p>";

    els.paymentsList.innerHTML =
      '<div class="payments-board"><section class="payments-roster"><h2 class="payments-board-title">' +
      t("paymentsRosterTitle") +
      '</h2><div class="payments-roster-list">' +
      roster +
      '</div></section><section class="payment-details"><div class="payment-details-heading">' +
      avatarMarkup(student) +
      '<div><p class="payment-detail-label">' +
      t("thName") +
      '</p><h2 class="payment-detail-name">' +
      escapeHtml(student.firstName + " " + student.lastName) +
      '</h2></div><span class="payment-status ' +
      selectedStatusClass +
      '">' +
      selectedStatusLabel +
      '</span></div><div class="payment-detail-grid"><div class="payment-detail-tile"><span>' +
      t("thLevel") +
      "</span><b>" +
      escapeHtml(levelLabel(student.level)) +
      '</b></div><div class="payment-detail-tile"><span>' +
      t("paymentMonthlyFee") +
      "</span><b>" +
      selected.fee +
      " " +
      t("dtSuffix") +
      '</b></div><div class="payment-detail-tile"><span>' +
      t("thEnd") +
      "</span><b>" +
      formatDate(student.endDate) +
      '</b></div></div><div class="payment-history"><h3>' +
      t("paymentHistoryTitle") +
      '</h3><div class="payment-history-list">' +
      historyMarkup +
      "</div></div></section></div>";
  }

  function handlePaymentsClick(e) {
    var btn = e.target.closest('button[data-action="mark-paid"]');
    if (btn) {
      markPaid(btn.getAttribute("data-id"));
      return;
    }
    var selectBtn = e.target.closest('button[data-action="select-payment"]');
    if (!selectBtn) return;
    selectedPaymentId = selectBtn.getAttribute("data-id");
    renderPaymentsPage();
  }

  /* ---------------- modal (add/edit) ---------------- */
  function openModal(mode, student) {
    els.studentForm.reset();
    if (mode === "edit" && student) {
      els.modalTitle.textContent = t("modalEditTitle");
      els.submitBtn.textContent = t("saveChanges");
      els.studentId.value = student.id;
      els.firstName.value = student.firstName;
      els.lastName.value = student.lastName;
      els.level.value = student.level;
      els.gender.value = student.gender || "";
      els.startDate.value = student.startDate;
      els.endDate.value = student.endDate || "";
      els.notes.value = student.notes || "";
      els.endDate.dataset.auto = student.endDate ? "false" : "true";
    } else {
      els.modalTitle.textContent = t("modalAddTitle");
      els.submitBtn.textContent = t("add");
      els.studentId.value = "";
      els.level.value = LEVELS[0];
      els.gender.value = "";
      els.endDate.dataset.auto = "true";
    }
    els.modalOverlay.classList.add("open");
    els.firstName.focus();
  }
  function closeModal() {
    els.modalOverlay.classList.remove("open");
  }

  function handleSubmit(e) {
    e.preventDefault();
    var id = els.studentId.value;
    var data = {
      firstName: els.firstName.value.trim(),
      lastName: els.lastName.value.trim(),
      level: els.level.value,
      gender: els.gender.value,
      startDate: els.startDate.value,
      endDate: els.endDate.value || "",
      notes: els.notes.value.trim(),
    };
    if (
      !data.firstName ||
      !data.lastName ||
      !data.level ||
      !data.gender ||
      !data.startDate
    )
      return;

    if (id) {
      students = students.map(function (s) {
        return s.id === id ? Object.assign({}, s, data) : s;
      });
    } else {
      data.id = makeId();
      data.avatar = getNextAvatar(
        data.gender,
        students.filter(function (s) {
          return s.gender === data.gender;
        }).length,
      );
      students.push(data);
    }
    saveStudents();
    closeModal();
    renderStudentsPage();
    if (currentPage === "calendar") renderCalendar();
    if (currentPage === "payments") renderPaymentsPage();
  }

  function openNoteModal(student) {
    els.noteModalTitle.textContent = student.firstName + " " + student.lastName;
    var badgeClass =
      LEVEL_CATEGORY[student.level] === "lycee"
        ? "badge-lycee"
        : "badge-college";
    var genderLabel =
      student.gender === "female"
        ? t("genderFemale")
        : student.gender === "male"
          ? t("genderMale")
          : "—";
    var html =
      '<div class="detail-profile">' +
      avatarMarkup(student) +
      "<span>" +
      escapeHtml(student.firstName + " " + student.lastName) +
      "</span></div>" +
      '<div class="detail-row"><span>' +
      t("thLevel") +
      '</span><b><span class="badge ' +
      badgeClass +
      '">' +
      escapeHtml(levelLabel(student.level)) +
      "</span></b></div>" +
      '<div class="detail-row"><span>' +
      t("gender") +
      "</span><b>" +
      genderLabel +
      "</b></div>" +
      '<div class="detail-row"><span>' +
      t("thStart") +
      "</span><b>" +
      formatDate(student.startDate) +
      "</b></div>" +
      '<div class="detail-row"><span>' +
      t("thEnd") +
      "</span><b>" +
      formatDate(student.endDate) +
      "</b></div>";
    if (student.notes && student.notes.trim()) {
      html +=
        '<div class="detail-notes">' + escapeHtml(student.notes) + "</div>";
    }
    els.noteModalBody.innerHTML = html;
    els.noteModalOverlay.classList.add("open");
  }
  function closeNoteModal() {
    els.noteModalOverlay.classList.remove("open");
  }

  function closeAllKebabMenus() {
    document.querySelectorAll(".kebab-menu.open").forEach(function (m) {
      m.classList.remove("open");
    });
  }

  function handleTableClick(e) {
    var btn = e.target.closest("button[data-action]");
    if (!btn) {
      closeAllKebabMenus();
      return;
    }
    var id = btn.getAttribute("data-id");
    var student = students.filter(function (s) {
      return s.id === id;
    })[0];

    if (btn.dataset.action === "kebab") {
      var menu = document.querySelector(
        '.kebab-menu[data-menu-id="' + id + '"]',
      );
      var wasOpen = menu && menu.classList.contains("open");
      closeAllKebabMenus();
      if (menu && !wasOpen) menu.classList.add("open");
      return;
    }
    if (!student) return;

    if (btn.dataset.action === "edit") {
      openModal("edit", student);
    } else if (btn.dataset.action === "delete") {
      closeAllKebabMenus();
      if (
        confirm(t("deleteConfirm")(student.firstName + " " + student.lastName))
      ) {
        students = students.filter(function (s) {
          return s.id !== id;
        });
        saveStudents();
        renderStudentsPage();
        if (currentPage === "payments") renderPaymentsPage();
      }
    } else if (btn.dataset.action === "details") {
      openNoteModal(student);
    }
  }

  /* ---------------- calendar ---------------- */
  function buildEventsMap() {
    var map = {};
    students.forEach(function (s) {
      if (s.startDate) {
        map[s.startDate] = map[s.startDate] || [];
        map[s.startDate].push({ student: s, type: "start" });
      }
      if (s.endDate) {
        map[s.endDate] = map[s.endDate] || [];
        map[s.endDate].push({ student: s, type: "end" });
      }
    });
    return map;
  }

  function renderCalendar() {
    var eventsMap = buildEventsMap();
    var year = calendarCursor.getFullYear();
    var month = calendarCursor.getMonth();

    els.calMonthLabel.textContent = calendarCursor.toLocaleDateString(
      t("locale"),
      { month: "long", year: "numeric" },
    );

    var firstOfMonth = new Date(year, month, 1);
    var startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
    var gridStart = new Date(year, month, 1 - startOffset);
    var today = new Date();
    var dow = t("dow");
    var cellsHtml = dow
      .map(function (d) {
        return '<div class="cal-dow">' + d + "</div>";
      })
      .join("");

    for (var i = 0; i < 42; i++) {
      var cellDate = new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + i,
      );
      var isOutside = cellDate.getMonth() !== month;
      var key = toDateKey(cellDate);
      var dayEvents = eventsMap[key] || [];
      var hasStart = dayEvents.some(function (ev) {
        return ev.type === "start";
      });
      var hasEnd = dayEvents.some(function (ev) {
        return ev.type === "end";
      });

      var classes = ["cal-cell"];
      if (isOutside) classes.push("outside");
      if (sameDay(cellDate, today)) classes.push("today");
      if (sameDay(cellDate, selectedDate)) classes.push("selected");

      var dotsHtml = "";
      if (hasStart || hasEnd) {
        dotsHtml =
          '<div class="cal-dots">' +
          (hasStart ? '<span class="cal-dot dot-start"></span>' : "") +
          (hasEnd ? '<span class="cal-dot dot-end"></span>' : "") +
          "</div>";
      }
      cellsHtml +=
        '<div class="' +
        classes.join(" ") +
        '" data-date="' +
        key +
        '"><span>' +
        cellDate.getDate() +
        "</span>" +
        dotsHtml +
        "</div>";
    }

    els.calGrid.innerHTML = cellsHtml;
    renderEventsList(eventsMap);
  }

  function renderEventsList(eventsMap) {
    var key = toDateKey(selectedDate);
    var dayEvents = eventsMap[key] || [];
    els.eventsSub.textContent = selectedDate.toLocaleDateString(t("locale"), {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    if (dayEvents.length === 0) {
      els.eventsList.innerHTML =
        '<div class="empty" style="padding:30px 10px;"><b>' +
        t("noEventsTitle") +
        "</b>" +
        t("noEventsText") +
        "</div>";
      return;
    }

    els.eventsList.innerHTML = dayEvents
      .map(function (ev) {
        var color =
          ev.type === "start"
            ? "var(--color-primary)"
            : "var(--color-accent-ink)";
        var label = ev.type === "start" ? t("legendStart") : t("legendEnd");
        return (
          '<div class="event-item">' +
          '<span class="event-dot" style="background:' +
          color +
          '"></span>' +
          "<span><b>" +
          escapeHtml(ev.student.firstName + " " + ev.student.lastName) +
          "</b><small>" +
          label +
          " — " +
          escapeHtml(levelLabel(ev.student.level)) +
          "</small></span>" +
          "</div>"
        );
      })
      .join("");
  }

  function handleCalGridClick(e) {
    var cell = e.target.closest(".cal-cell");
    if (!cell || cell.classList.contains("outside")) return;
    var parts = cell.dataset.date.split("-");
    selectedDate = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2]),
    );
    renderCalendar();
  }

  /* ---------------- events ---------------- */
  document.querySelectorAll(".nav-target").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchPage(btn.dataset.page);
    });
  });
  if (els.langSwitch) {
    els.langSwitch.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.dataset.lang);
      });
    });
  }

  els.startDate.addEventListener("input", function () {
    if (els.endDate.dataset.auto !== "false" && els.startDate.value) {
      els.endDate.value = autoEndDate(els.startDate.value);
    }
  });
  els.endDate.addEventListener("input", function () {
    els.endDate.dataset.auto = "false";
  });

  els.openAddBtn.addEventListener("click", function () {
    openModal("add");
  });
  els.cancelBtn.addEventListener("click", closeModal);
  els.modalOverlay.addEventListener("click", function (e) {
    if (e.target === els.modalOverlay) closeModal();
  });
  els.studentForm.addEventListener("submit", handleSubmit);
  els.tableWrap.addEventListener("click", handleTableClick);
  if (els.paymentsList)
    els.paymentsList.addEventListener("click", handlePaymentsClick);
  if (els.toastClose)
    els.toastClose.addEventListener("click", function () {
      els.toast.classList.remove("show");
    });
  els.searchInput.addEventListener("input", renderTable);
  els.levelFilter.addEventListener("change", renderTable);

  els.noteCloseBtn.addEventListener("click", closeNoteModal);
  els.noteModalOverlay.addEventListener("click", function (e) {
    if (e.target === els.noteModalOverlay) closeNoteModal();
  });

  els.calGrid.addEventListener("click", handleCalGridClick);
  els.calPrevBtn.addEventListener("click", function () {
    calendarCursor = new Date(
      calendarCursor.getFullYear(),
      calendarCursor.getMonth() - 1,
      1,
    );
    renderCalendar();
  });
  els.calNextBtn.addEventListener("click", function () {
    calendarCursor = new Date(
      calendarCursor.getFullYear(),
      calendarCursor.getMonth() + 1,
      1,
    );
    renderCalendar();
  });
  els.calTodayBtn.addEventListener("click", function () {
    calendarCursor = new Date();
    selectedDate = new Date();
    renderCalendar();
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".card-menu")) closeAllKebabMenus();
  });

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
      e.preventDefault();
      els.clearDataBtn.click();
      return;
    }
    if (e.key !== "Escape") return;
    if (els.modalOverlay.classList.contains("open")) closeModal();
    if (els.noteModalOverlay.classList.contains("open")) closeNoteModal();
    closeAllKebabMenus();
  });
  els.clearDataBtn.addEventListener("click", clearAllData);
  els.exportDataBtn.addEventListener("click", exportData);
  els.importDataBtn.addEventListener("click", function () {
    els.importFile.click();
  });
  els.importFile.addEventListener("change", function () {
    importData(els.importFile.files[0]);
  });

  /* ---------------- init ---------------- */
  loadLang();
  loadStudents();
  applyStaticText();
  setHeaderDate();
  renderStudentsPage();
})();
