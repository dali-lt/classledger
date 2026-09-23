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
      toastSuccess: "Success",
      toastError: "Error",
      toastWarning: "Warning",
      toastInfo: "Info",
      studentAdded: "Student added successfully.",
      studentUpdated: "Student updated successfully.",
      studentDeleted: "Student deleted successfully.",
      dataCleared: "All student data was deleted.",
      saveError: "Could not save data in this browser.",
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
      toastSuccess: "نجح",
      toastError: "خطأ",
      toastWarning: "تنبيه",
      toastInfo: "معلومة",
      studentAdded: "تمت إضافة التلميذ بنجاح.",
      studentUpdated: "تم تعديل معلومات التلميذ بنجاح.",
      studentDeleted: "تم حذف التلميذ بنجاح.",
      dataCleared: "تم مسح معلومات التلامذة الكل.",
      saveError: "تعذّر حفظ البيانات في هذا المتصفح.",
      locale: "ar-TN",
    },
  };

  function t(key) {
    return STR[currentLang][key];
  }
  function levelLabel(value) {
    return LEVEL_LABELS[currentLang][value] || value;
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
    statsBar: document.getElementById("statsBar"),
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
  };

  var students = [];
  var calendarCursor = new Date();
  var selectedDate = new Date();
  var currentLang = "en";
  var currentPage = "students";

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
  function showToast(message, type) {
    if (!els.toast) return;
    type = type || "success";
    var titles = {
      success: t("toastSuccess"),
      error: t("toastError"),
      warning: t("toastWarning"),
      info: t("toastInfo"),
    };
    var icons = { success: "✓", error: "!", warning: "!", info: "i" };
    els.toastTitle.textContent = titles[type] || titles.info;
    els.toastMessage.textContent = message;
    els.toastIcon.textContent = icons[type] || icons.info;
    els.toast.className = "toast toast-" + type;
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
      showToast(t("saveError"), "error");
    }
  }
  function clearAllData() {
    if (!confirm(t("clearAllConfirm"))) return;
    students = [];
    saveStudents();
    renderStudentsPage();
    if (currentPage === "calendar") renderCalendar();
    showToast(t("dataCleared"), "warning");
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
    showToast(t("exportSuccess"), "success");
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
        showToast(t("importSuccess"), "success");
      } catch (e) {
        showToast(t("importError"), "error");
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

    els.pageTitle.textContent =
      currentPage === "students"
        ? t("pageTitleStudents")
        : t("pageTitleCalendar");

    populateLevelSelects();
  }

  function setLang(lang) {
    currentLang = lang;
    saveLang();
    applyStaticText();
    renderStudentsPage();
    if (currentPage === "calendar") renderCalendar();
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
    els.pageTitle.textContent =
      pageName === "students" ? t("pageTitleStudents") : t("pageTitleCalendar");
    els.actionsStudents.style.display =
      pageName === "students" ? "flex" : "none";
    els.actionsCalendar.style.display =
      pageName === "calendar" ? "flex" : "none";
    if (pageName === "calendar") renderCalendar();
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

    var chipsHtml = LEVELS.map(function (l) {
      return (
        '<span class="chip">' +
        levelLabel(l) +
        ": <b>" +
        counts[l] +
        "</b></span>"
      );
    }).join("");

    els.statsBar.innerHTML =
      '<div class="stat-card"><b>' +
      total +
      "</b><span>" +
      t("statTotal") +
      "</span></div>" +
      '<div class="stat-card" style="flex:3;"><div class="chip-row">' +
      chipsHtml +
      "</div></div>";
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
    showToast(t(id ? "studentUpdated" : "studentAdded"), "success");
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
        showToast(t("studentDeleted"), "success");
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
  els.toastClose.addEventListener("click", function () {
    els.toast.classList.remove("show");
  });
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
