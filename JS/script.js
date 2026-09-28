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
      editPurpose: "Edit the student's name, level, dates, or notes.",
      deletePurpose:
        "Permanently delete the student and their payment history.",
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
      kpiMonthlyIncome: "Monthly income",
      kpiPaidAmount: "Paid amount",
      kpiUnpaidAmount: "Unpaid amount",
      paymentsRosterTitle: "Student payments",
      paymentMonthlyFee: "Monthly fee",
      paymentAmountDue: "Amount due",
      paymentHistoryTitle: "Payment history",
      paymentHistoryEmpty: "No payments recorded yet.",
      halfMonthPaymentType: "Half-month charge",
      paymentDateLabel: "Paid on",
      paymentOnTime: "On time",
      paymentSlightlyLate: "Slightly late",
      paymentVeryLate: "Very late",
      dueOn: "Due",
      dtSuffix: "DT",
      statusOverdue: "Overdue",
      statusPaidUp: "Paid up",
      statusAmountDue: "Amount due",
      statusInProgress: "Current cycle",
      markPaid: "Mark paid",
      markPaidConfirm: function (name, amount) {
        return (
          "Record " +
          name +
          " as paid for " +
          amount +
          " DT? This clears overdue monthly fees and half-month charges."
        );
      },
      markPaidSuccess: "Payment recorded.",
      halfMonthTitle: "Half-month calculator",
      halfMonthHint:
        "Choose students to add half of their monthly fee to the amount due.",
      halfMonthCalculate: "Add to amount due",
      halfMonthAddedTitle: "Added to amount due",
      halfMonthAddSuccess: function (count, amount) {
        return count + " half-month charge(s) added. Total: " + amount + " DT.";
      },
      halfMonthPickerLabel: "Select students",
      halfMonthAll: "All",
      halfMonthAllSelected: "All students selected",
      halfMonthSelectedCount: function (count) {
        return count + " selected";
      },
      halfMonthNoStudents: "No students to select.",
      halfMonthAllLabel: "Select all students",
      halfMonthStudentLabel: function (name) {
        return "Select " + name;
      },
      halfMonthResultTitle: "Half-month amounts",
      halfMonthTotal: "Total",
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
      editPurpose: "تعديل الاسم أو القسم أو التواريخ أو الملاحظات.",
      deletePurpose: "حذف التلميذ وسجل خلاصه نهائيًا.",
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
      kpiMonthlyIncome: "الدخل الشهري",
      kpiPaidAmount: "المبلغ المدفوع",
      kpiUnpaidAmount: "المتبقي غير المدفوع",
      paymentsRosterTitle: "خلاص التلامذة",
      paymentMonthlyFee: "المعلوم الشهري",
      paymentAmountDue: "المبلغ المطلوب",
      paymentHistoryTitle: "سجل الدفعات",
      paymentHistoryEmpty: "ما تسجلت حتى دفعة قبل.",
      halfMonthPaymentType: "معلوم نصف شهر",
      paymentDateLabel: "تاريخ الدفع",
      paymentOnTime: "في وقتو",
      paymentSlightlyLate: "متأخر شوية",
      paymentVeryLate: "متأخر برشة",
      dueOn: "يخلص في",
      dtSuffix: "د.ت",
      statusOverdue: "متأخر",
      statusPaidUp: "مخلّص",
      statusAmountDue: "معلوم مطلوب",
      statusInProgress: "الدورة جارية",
      markPaid: "تسجيل الخلاص",
      markPaidConfirm: function (name, amount) {
        return (
          "تأكد باش تسجل خلاص " +
          name +
          " بمبلغ " +
          amount +
          " د.ت؟ المبلغ يشمل الشهور المتأخرة ومعلوم نصف الشهر."
        );
      },
      markPaidSuccess: "تم تسجيل الخلاص.",
      halfMonthTitle: "حساب معلوم نصف شهر",
      halfMonthHint:
        "اختار التلامذة باش تزيد نصف المعلوم الشهري للمبلغ المطلوب.",
      halfMonthCalculate: "أضف للمبلغ المطلوب",
      halfMonthAddedTitle: "تزاد للمبلغ المطلوب",
      halfMonthAddSuccess: function (count, amount) {
        return (
          "تزاد معلوم نصف شهر لـ " +
          count +
          " تلميذ، المجموع " +
          amount +
          " د.ت."
        );
      },
      halfMonthPickerLabel: "اختار التلامذة",
      halfMonthAll: "الكل",
      halfMonthAllSelected: "تم اختيار التلامذة الكل",
      halfMonthSelectedCount: function (count) {
        return "تم اختيار " + count;
      },
      halfMonthNoStudents: "ما فماش تلامذة للاختيار.",
      halfMonthAllLabel: "اختيار التلامذة الكل",
      halfMonthStudentLabel: function (name) {
        return "اختيار " + name;
      },
      halfMonthResultTitle: "مبالغ نصف الشهر",
      halfMonthTotal: "المجموع",
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
    halfMonthPicker: document.querySelector(".half-month-picker"),
    halfMonthTitle: document.getElementById("halfMonthTitle"),
    halfMonthHint: document.getElementById("halfMonthHint"),
    halfMonthPickerLabel: document.getElementById("halfMonthPickerLabel"),
    halfMonthPickerOptions: document.getElementById("halfMonthPickerOptions"),
    halfMonthCalculateBtn: document.getElementById("halfMonthCalculateBtn"),
    halfMonthResult: document.getElementById("halfMonthResult"),
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
  var selectedHalfMonthIds = [];
  var halfMonthCalculated = false;
  var halfMonthResultItems = [];

  /* ---------------- storage ---------------- */
  function loadStudents() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      students = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(students)) students = [];
      var avatarIndexes = { male: 0, female: 0 };
      students.forEach(function (student) {
        sanitizeHalfMonthCharges(student);
        if (!student.avatar) {
          student.avatar = getNextAvatar(
            student.gender,
            avatarIndexes[student.gender] || 0,
          );
          if (avatarIndexes[student.gender] !== undefined)
            avatarIndexes[student.gender]++;
        }
      });
      assignAvatarBackgrounds(students, []);
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
      version: 2,
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
  function sanitizePaymentHistory(student) {
    if (!Array.isArray(student.paymentHistory)) {
      student.paymentHistory = [];
      return student;
    }
    student.paymentHistory = student.paymentHistory
      .filter(function (p) {
        return (
          p &&
          typeof p.dueDate === "string" &&
          typeof p.paidAt === "string" &&
          typeof p.amount === "number"
        );
      })
      .map(function (p) {
        return {
          dueDate: p.dueDate,
          paidAt: p.paidAt,
          amount: p.amount,
          timing:
            p.timing === "slightly-late" || p.timing === "very-late"
              ? p.timing
              : "on-time",
          kind: p.kind === "half-month" ? "half-month" : "monthly",
        };
      });
    return student;
  }

  function sanitizeHalfMonthCharges(student) {
    student.halfMonthCharges = Array.isArray(student.halfMonthCharges)
      ? student.halfMonthCharges
          .filter(function (charge) {
            return (
              charge &&
              typeof charge.amount === "number" &&
              isFinite(charge.amount) &&
              charge.amount > 0 &&
              typeof charge.addedAt === "string"
            );
          })
          .map(function (charge) {
            return {
              amount: charge.amount,
              addedAt: charge.addedAt,
              paidAt: typeof charge.paidAt === "string" ? charge.paidAt : "",
            };
          })
      : [];
    return student;
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
        importedStudents = importedStudents.map(function (student) {
          return sanitizeHalfMonthCharges(sanitizePaymentHistory(student));
        });
        assignAvatarBackgrounds(importedStudents, []);
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
    els.halfMonthTitle.textContent = t("halfMonthTitle");
    els.halfMonthHint.textContent = t("halfMonthHint");
    els.halfMonthCalculateBtn.textContent = t("halfMonthCalculate");

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
  var AVATAR_BACKGROUNDS = [
    "#e8f4fc",
    "#dbeeff",
    "#cce5ff",
    "#eef7fc",
    "#f5f9fd",
    "#f3facf",
    "#e8f5b7",
    "#dcf08f",
  ];

  function getNextAvatar(gender, index) {
    var avatars = gender === "female" ? FEMALE_AVATARS : MALE_AVATARS;
    return "Images/slide-" + avatars[index % avatars.length] + ".svg";
  }

  function assignAvatarBackgrounds(targetStudents, existingStudents) {
    var usedColors = (existingStudents || [])
      .concat(targetStudents)
      .map(function (student) {
        return student.avatarBackground;
      })
      .filter(function (color) {
        return AVATAR_BACKGROUNDS.indexOf(color) !== -1;
      });

    targetStudents.forEach(function (student) {
      if (AVATAR_BACKGROUNDS.indexOf(student.avatarBackground) !== -1) return;
      var unusedColors = AVATAR_BACKGROUNDS.filter(function (color) {
        return usedColors.indexOf(color) === -1;
      });
      var choices = unusedColors.length ? unusedColors : AVATAR_BACKGROUNDS;
      var color = choices[Math.floor(Math.random() * choices.length)];
      student.avatarBackground = color;
      usedColors.push(color);
    });
  }

  function avatarMarkup(student) {
    var background =
      AVATAR_BACKGROUNDS.indexOf(student.avatarBackground) !== -1
        ? student.avatarBackground
        : AVATAR_BACKGROUNDS[0];
    return (
      '<img class="avatar" style="background-color:' +
      background +
      '" src="' +
      student.avatar +
      '" alt="">'
    );
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
          '" aria-label="' +
          t("deletePurpose") +
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

  function halfMonthChargeTotals(student) {
    return (
      Array.isArray(student.halfMonthCharges) ? student.halfMonthCharges : []
    ).reduce(
      function (totals, charge) {
        if (!charge || typeof charge.amount !== "number") return totals;
        totals.total += charge.amount;
        if (charge.paidAt) totals.paid += charge.amount;
        else totals.due += charge.amount;
        return totals;
      },
      { total: 0, paid: 0, due: 0 },
    );
  }

  function isPastDue(iso) {
    if (!iso) return false;
    return iso < toDateKey(new Date());
  }

  function nextDate(iso) {
    var parts = iso.split("-").map(Number);
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) return iso;
    return toDateKey(new Date(parts[0], parts[1] - 1, parts[2] + 1));
  }

  function countDueMonthlyCycles(endDate, today) {
    if (!endDate) return 0;
    var boundary = endDate;
    var count = 0;
    while (boundary < today && count < 1200) {
      var nextBoundary = advanceOneMonth(boundary);
      if (nextBoundary <= boundary) break;
      count++;
      boundary = nextBoundary;
    }
    return count;
  }

  function currentCycleStart(student, today) {
    var endDate = student.endDate;
    if (!endDate) return student.startDate || today;
    if (!isPastDue(endDate)) {
      var coveringPayment = (
        Array.isArray(student.paymentHistory) ? student.paymentHistory : []
      ).filter(function (payment) {
        return (
          payment &&
          payment.kind !== "half-month" &&
          payment.dueDate &&
          advanceOneMonth(payment.dueDate) === endDate
        );
      })[0];
      return coveringPayment
        ? nextDate(coveringPayment.dueDate)
        : student.startDate || endDate;
    }

    var boundary = endDate;
    var lastExpiredBoundary = endDate;
    var count = 0;
    while (boundary < today && count < 1200) {
      lastExpiredBoundary = boundary;
      var nextBoundary = advanceOneMonth(boundary);
      if (nextBoundary <= boundary) break;
      boundary = nextBoundary;
      count++;
    }
    return nextDate(lastExpiredBoundary);
  }

  function paidAmountForCycle(student, cycleStart, today, fee, cyclePaid) {
    var monthlyPaid = 0;
    var halfMonthPaid = 0;
    (Array.isArray(student.paymentHistory)
      ? student.paymentHistory
      : []
    ).forEach(function (payment) {
      if (
        !payment ||
        typeof payment.paidAt !== "string" ||
        payment.paidAt < cycleStart ||
        payment.paidAt > today ||
        typeof payment.amount !== "number"
      )
        return;
      if (payment.kind === "half-month") halfMonthPaid += payment.amount;
      else monthlyPaid += payment.amount;
    });
    if (!monthlyPaid && cyclePaid) monthlyPaid = fee;
    return monthlyPaid + halfMonthPaid;
  }

  function isCurrentCyclePaid(student) {
    if (!student.endDate || isPastDue(student.endDate)) return false;
    return (
      Array.isArray(student.paymentHistory) ? student.paymentHistory : []
    ).some(function (payment) {
      return (
        payment.kind !== "half-month" &&
        payment.dueDate &&
        advanceOneMonth(payment.dueDate) === student.endDate
      );
    });
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
    var paidAt = toDateKey(new Date());
    var monthlyDueCycles = countDueMonthlyCycles(student.endDate, paidAt);
    var monthlyDue = studentFee(student) * monthlyDueCycles;
    var unpaidCharges = (
      Array.isArray(student.halfMonthCharges) ? student.halfMonthCharges : []
    ).filter(function (charge) {
      return charge && !charge.paidAt;
    });
    var halfMonthDue = unpaidCharges.reduce(function (sum, charge) {
      return sum + charge.amount;
    }, 0);
    var amountDue = monthlyDue + halfMonthDue;
    if (amountDue <= 0) return;
    if (
      !confirm(
        t("markPaidConfirm")(
          student.firstName + " " + student.lastName,
          amountDue.toLocaleString(t("locale"), { maximumFractionDigits: 2 }),
        ),
      )
    )
      return;
    if (!Array.isArray(student.paymentHistory)) student.paymentHistory = [];
    if (monthlyDueCycles > 0) {
      var base = student.endDate;
      for (var i = 0; i < monthlyDueCycles; i++) {
        var dueDate = base;
        student.paymentHistory.unshift({
          dueDate: dueDate,
          paidAt: paidAt,
          amount: studentFee(student),
          timing: paymentTiming(dueDate, paidAt),
        });
        base = advanceOneMonth(base);
      }
      student.endDate = base;
    }
    unpaidCharges.forEach(function (charge) {
      charge.paidAt = paidAt;
      student.paymentHistory.unshift({
        dueDate: charge.addedAt,
        paidAt: paidAt,
        amount: charge.amount,
        timing: paymentTiming(charge.addedAt, paidAt),
        kind: "half-month",
      });
    });
    saveStudents();
    renderPaymentsPage();
    renderStudentsPage();
    if (currentPage === "calendar") renderCalendar();
    showToast(t("markPaidSuccess"));
  }

  function paymentDetailMarkup(selected) {
    var student = selected.student;
    var selectedStatusClass =
      selected.amountDue > 0
        ? "overdue"
        : selected.cyclePaid
          ? "ok"
          : "in-progress";
    var selectedStatusLabel = selected.overdue
      ? t("statusOverdue")
      : selected.halfMonthDue > 0
        ? t("statusAmountDue")
        : selected.cyclePaid
          ? t("statusPaidUp")
          : t("statusInProgress");
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
              (payment.kind === "half-month"
                ? t("halfMonthPaymentType")
                : t("paymentMonthlyFee")) +
              "</span><span>" +
              t("paymentDateLabel") +
              " " +
              formatDate(payment.paidAt) +
              "</span><span>" +
              payment.amount.toLocaleString(t("locale"), {
                maximumFractionDigits: 2,
              }) +
              " " +
              t("dtSuffix") +
              '</span></div><span class="payment-history-badge ' +
              badgeClass +
              '">' +
              timingLabel +
              "</span></article>"
            );
          })
          .join("")
      : '<p class="payment-history-empty">' + t("paymentHistoryEmpty") + "</p>";

    return (
      '<div class="payment-details-heading">' +
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
      t("paymentAmountDue") +
      "</span><b>" +
      selected.amountDue.toLocaleString(t("locale"), {
        maximumFractionDigits: 2,
      }) +
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
      "</div></div>"
    );
  }

  function isMobilePaymentsView() {
    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 920px)").matches
    );
  }

  function renderPaymentsPage() {
    if (!els.paymentsKpiRow || !els.paymentsList) return;

    selectedHalfMonthIds = selectedHalfMonthIds.filter(function (id) {
      return students.some(function (student) {
        return student.id === id;
      });
    });
    renderHalfMonthPicker();
    els.halfMonthCalculateBtn.disabled = selectedHalfMonthIds.length === 0;

    var rows = students.map(function (s) {
      var charges = halfMonthChargeTotals(s);
      var today = toDateKey(new Date());
      var dueCycles = countDueMonthlyCycles(s.endDate, today);
      var cyclePaid = dueCycles === 0 && isCurrentCyclePaid(s);
      return {
        student: s,
        fee: studentFee(s),
        overdue: dueCycles > 0,
        dueCycles: dueCycles,
        cyclePaid: cyclePaid,
        cycleStart: currentCycleStart(s, today),
        halfMonthTotals: charges,
        halfMonthDue: charges.due,
        amountDue: studentFee(s) * dueCycles + charges.due,
      };
    });

    var expected = rows.reduce(function (sum, r) {
      return sum + r.fee;
    }, 0);
    var paidAmount = rows.reduce(function (sum, r) {
      return (
        sum +
        paidAmountForCycle(
          r.student,
          r.cycleStart,
          toDateKey(new Date()),
          r.fee,
          r.cyclePaid,
        )
      );
    }, 0);
    var unpaidAmount = rows.reduce(function (sum, r) {
      return sum + r.amountDue;
    }, 0);

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
      halfMonthCalculated = false;
      renderHalfMonthResult();
      return;
    }

    rows.sort(function (a, b) {
      if (a.amountDue > 0 !== b.amountDue > 0) return a.amountDue > 0 ? -1 : 1;
      return (a.student.endDate || "").localeCompare(b.student.endDate || "");
    });

    var mobileView = isMobilePaymentsView();
    var selected = rows.filter(function (r) {
      return r.student.id === selectedPaymentId;
    })[0];
    if (!selected && !mobileView) {
      selected = rows[0];
      selectedPaymentId = rows[0].student.id;
    }

    var roster = rows
      .map(function (r) {
        var s = r.student;
        var isSelected = s.id === selectedPaymentId;
        var rowClass =
          "payment-row" +
          (r.amountDue > 0 ? " is-overdue" : "") +
          (isSelected ? " is-selected" : "");
        var statusClass =
          r.amountDue > 0 ? "overdue" : r.cyclePaid ? "ok" : "in-progress";
        var statusLabel = r.overdue
          ? t("statusOverdue")
          : r.halfMonthDue > 0
            ? t("statusAmountDue")
            : r.cyclePaid
              ? t("statusPaidUp")
              : t("statusInProgress");
        var articleHtml =
          '<article class="' +
          rowClass +
          '" data-id="' +
          s.id +
          '">' +
          '<button type="button" class="payment-select" data-action="select-payment" data-id="' +
          s.id +
          '" aria-pressed="' +
          isSelected +
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
          (r.amountDue > 0 ? r.amountDue : r.fee) +
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
          (r.amountDue > 0 ? "" : " disabled") +
          ">" +
          t("markPaid") +
          "</button>" +
          "</div></article>";

        if (isSelected && selected) {
          articleHtml +=
            '<div class="payment-details-inline is-open">' +
            paymentDetailMarkup(selected) +
            "</div>";
        }
        return articleHtml;
      })
      .join("");

    var detailsSectionHtml = selected
      ? '<section class="payment-details">' +
        paymentDetailMarkup(selected) +
        "</section>"
      : "";

    els.paymentsList.innerHTML =
      '<div class="payments-board"><section class="payments-roster"><h2 class="payments-board-title">' +
      t("paymentsRosterTitle") +
      '</h2><div class="payments-roster-list">' +
      roster +
      "</div></section>" +
      detailsSectionHtml +
      "</div>";
    renderHalfMonthResult();
  }

  function renderHalfMonthPicker() {
    var allSelected =
      students.length > 0 && selectedHalfMonthIds.length === students.length;
    var options =
      '<label class="half-month-option"><input type="checkbox" data-action="select-half-month-all" aria-label="' +
      t("halfMonthAllLabel") +
      '"' +
      (allSelected ? " checked" : "") +
      "><span>" +
      t("halfMonthAll") +
      "</span></label>";
    if (students.length) {
      options += students
        .map(function (student) {
          var selected = selectedHalfMonthIds.indexOf(student.id) !== -1;
          var name = escapeHtml(student.firstName + " " + student.lastName);
          return (
            '<label class="half-month-option"><input type="checkbox" data-action="select-half-month-student" data-id="' +
            student.id +
            '" aria-label="' +
            t("halfMonthStudentLabel")(name) +
            '"' +
            (selected ? " checked" : "") +
            "><span>" +
            name +
            "</span></label>"
          );
        })
        .join("");
    } else {
      options +=
        '<span class="half-month-no-students">' +
        t("halfMonthNoStudents") +
        "</span>";
    }
    els.halfMonthPickerOptions.innerHTML = options;
    updateHalfMonthPickerLabel();
  }

  function updateHalfMonthPickerLabel() {
    if (selectedHalfMonthIds.length === 0) {
      els.halfMonthPickerLabel.textContent = t("halfMonthPickerLabel");
    } else if (selectedHalfMonthIds.length === students.length) {
      els.halfMonthPickerLabel.textContent = t("halfMonthAllSelected");
    } else {
      els.halfMonthPickerLabel.textContent = t("halfMonthSelectedCount")(
        selectedHalfMonthIds.length,
      );
    }
    var allCheckbox = els.halfMonthPickerOptions.querySelector(
      'input[data-action="select-half-month-all"]',
    );
    if (allCheckbox) {
      allCheckbox.checked =
        students.length > 0 && selectedHalfMonthIds.length === students.length;
    }
  }

  function renderHalfMonthResult() {
    if (!halfMonthCalculated || halfMonthResultItems.length === 0) {
      els.halfMonthResult.hidden = true;
      els.halfMonthResult.innerHTML = "";
      return;
    }
    var total = halfMonthResultItems.reduce(function (sum, item) {
      return sum + item.amount;
    }, 0);
    var rows = halfMonthResultItems
      .map(function (item) {
        return (
          "<li><span>" +
          escapeHtml(item.name) +
          "</span><b>" +
          item.amount.toLocaleString(t("locale"), {
            maximumFractionDigits: 2,
          }) +
          " " +
          t("dtSuffix") +
          "</b></li>"
        );
      })
      .join("");
    els.halfMonthResult.innerHTML =
      "<h3>" +
      t("halfMonthAddedTitle") +
      "</h3><ul>" +
      rows +
      "</ul><p><b>" +
      t("halfMonthTotal") +
      ": " +
      total.toLocaleString(t("locale"), { maximumFractionDigits: 2 }) +
      " " +
      t("dtSuffix") +
      "</b></p>";
    els.halfMonthResult.hidden = false;
  }

  function addHalfMonthDue() {
    var selectedStudents = students.filter(function (student) {
      return selectedHalfMonthIds.indexOf(student.id) !== -1;
    });
    if (selectedStudents.length === 0) return;
    var addedAt = toDateKey(new Date());
    halfMonthResultItems = selectedStudents.map(function (student) {
      var amount = studentFee(student) / 2;
      if (!Array.isArray(student.halfMonthCharges))
        student.halfMonthCharges = [];
      student.halfMonthCharges.push({
        amount: amount,
        addedAt: addedAt,
        paidAt: "",
      });
      return {
        name: student.firstName + " " + student.lastName,
        amount: amount,
      };
    });
    selectedHalfMonthIds = [];
    halfMonthCalculated = true;
    saveStudents();
    renderPaymentsPage();
    var total = halfMonthResultItems.reduce(function (sum, item) {
      return sum + item.amount;
    }, 0);
    showToast(
      t("halfMonthAddSuccess")(
        halfMonthResultItems.length,
        total.toLocaleString(t("locale"), { maximumFractionDigits: 2 }),
      ),
    );
    renderHalfMonthResult();
  }

  function handleHalfMonthSelectionChange(e) {
    var checkbox = e.target.closest('input[data-action^="select-half-month"]');
    if (!checkbox) return;
    if (checkbox.dataset.action === "select-half-month-all") {
      selectedHalfMonthIds = checkbox.checked
        ? students.map(function (student) {
            return student.id;
          })
        : [];
      renderHalfMonthPicker();
    } else {
      var id = checkbox.getAttribute("data-id");
      if (checkbox.checked && selectedHalfMonthIds.indexOf(id) === -1) {
        selectedHalfMonthIds.push(id);
      } else if (!checkbox.checked) {
        selectedHalfMonthIds = selectedHalfMonthIds.filter(function (item) {
          return item !== id;
        });
      }
      updateHalfMonthPickerLabel();
    }
    halfMonthCalculated = false;
    els.halfMonthCalculateBtn.disabled = selectedHalfMonthIds.length === 0;
    els.halfMonthResult.hidden = true;
    els.halfMonthResult.innerHTML = "";
  }

  function handlePaymentsClick(e) {
    var btn = e.target.closest('button[data-action="mark-paid"]');
    if (btn) {
      markPaid(btn.getAttribute("data-id"));
      return;
    }
    var selectBtn = e.target.closest('button[data-action="select-payment"]');
    if (!selectBtn) return;
    var id = selectBtn.getAttribute("data-id");
    if (isMobilePaymentsView() && selectedPaymentId === id) {
      selectedPaymentId = null;
    } else {
      selectedPaymentId = id;
    }
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
      assignAvatarBackgrounds([data], students);
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
  if (els.halfMonthPickerOptions)
    els.halfMonthPickerOptions.addEventListener(
      "change",
      handleHalfMonthSelectionChange,
    );
  els.halfMonthCalculateBtn.addEventListener("click", addHalfMonthDue);
  var paymentsResizeTimer = null;
  window.addEventListener("resize", function () {
    if (currentPage !== "payments") return;
    clearTimeout(paymentsResizeTimer);
    paymentsResizeTimer = setTimeout(renderPaymentsPage, 150);
  });
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
    if (els.halfMonthPicker && !els.halfMonthPicker.contains(e.target)) {
      els.halfMonthPicker.open = false;
    }
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
