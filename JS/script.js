(function () {
  "use strict";

  var STORAGE_KEY = "classledger:students";
  var LANG_KEY = "classledger:lang";

  var LEVELS = ["7 أساسي", "8 أساسي", "9 أساسي", "1 ثانوي", "2 ثانوي", "3 ثانوي", "4 ثانوي"];
  var LEVEL_CATEGORY = {
    "7 أساسي": "college", "8 أساسي": "college", "9 أساسي": "college",
    "1 ثانوي": "lycee", "2 ثانوي": "lycee", "3 ثانوي": "lycee", "4 ثانوي": "lycee"
  };
  var LEVEL_LABELS = {
    en: {
      "7 أساسي": "7th Grade", "8 أساسي": "8th Grade", "9 أساسي": "9th Grade",
      "1 ثانوي": "1st Form (Lycée)", "2 ثانوي": "2nd Form (Lycée)",
      "3 ثانوي": "3rd Form (Lycée)", "4 ثانوي": "4th Form / Bac"
    },
    ar: {
      "7 أساسي": "7 أساسي", "8 أساسي": "8 أساسي", "9 أساسي": "9 أساسي",
      "1 ثانوي": "1 ثانوي", "2 ثانوي": "2 ثانوي", "3 ثانوي": "3 ثانوي", "4 ثانوي": "4 ثانوي"
    }
  };

  var STR = {
    en: {
      navStudents: "Students", navCalendar: "Calendar", sidebarTotal: "enrolled students",
      pageTitleStudents: "Students", pageTitleCalendar: "Calendar",
      heroMorning: "Good morning 👋", heroDay: "Hello 👋", heroEvening: "Good evening 👋",
      heroText: "Track your students, add new ones, and keep every detail in one place.",
      statTotal: "Total students", searchPlaceholder: "Search by first or last name...",
      allLevels: "All levels", addStudent: "+ Add student",
      thName: "Name", thLevel: "Level", thStart: "Start date", thEnd: "End date", thNotes: "Notes",
      edit: "Edit", delete: "Delete",
      emptyNoneTitle: "No students yet", emptyNoneText: "Add your first student to get started.",
      emptyFilterTitle: "No results", emptyFilterText: "Try a different search or level.",
      modalAddTitle: "Add student", modalEditTitle: "Edit student",
      firstName: "First name", lastName: "Last name", level: "Level",
      startDate: "Start date", endDate: "End date", optional: "(optional)",
      notes: "Notes", notesPlaceholder: "Any extra info about the student...",
      cancel: "Cancel", add: "Add", saveChanges: "Save changes",
      deleteConfirm: function (name) { return "Delete " + name + "? This can't be undone."; },
      notesModalPrefix: "Notes — ", close: "Close", today: "Today",
      dow: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      eventsTitle: "Day events", legendStart: "Start of studies", legendEnd: "End of studies",
      noEventsTitle: "No events", noEventsText: "Pick another day or add an end date for a student.",
      saveError: "Could not save data in this browser.", locale: "en-GB"
    },
    ar: {
      navStudents: "قائمة التلاميذ", navCalendar: "التقويم", sidebarTotal: "تلميذ مسجّل",
      pageTitleStudents: "قائمة التلاميذ", pageTitleCalendar: "التقويم",
      heroMorning: "صباح الخير 👋", heroDay: "مرحبا 👋", heroEvening: "مساء الخير 👋",
      heroText: "تابع تلاميذك، زيد الجداد، وأرشيف كل معلومة تحتاجها في مكان وحد.",
      statTotal: "مجموع التلاميذ", searchPlaceholder: "ابحث بالاسم أو اللقب...",
      allLevels: "كل الأقسام", addStudent: "+ إضافة تلميذ",
      thName: "الاسم واللقب", thLevel: "القسم", thStart: "تاريخ البداية", thEnd: "تاريخ الانتهاء", thNotes: "ملاحظات",
      edit: "تعديل", delete: "حذف",
      emptyNoneTitle: "ما فماش تلاميذ ثما", emptyNoneText: "زيد أول تلميذ باش تبدا في التسيير.",
      emptyFilterTitle: "ما فماش نتائج", emptyFilterText: "جرّب كلمة بحث أو قسم آخر.",
      modalAddTitle: "إضافة تلميذ", modalEditTitle: "تعديل معلومات التلميذ",
      firstName: "الاسم", lastName: "اللقب", level: "القسم",
      startDate: "تاريخ بداية الدراسة", endDate: "تاريخ الانتهاء", optional: "(اختياري)",
      notes: "ملاحظات", notesPlaceholder: "أي معلومة إضافية على التلميذ...",
      cancel: "إلغاء", add: "إضافة", saveChanges: "حفظ التعديلات",
      deleteConfirm: function (name) { return "تأكد باش تحذف " + name + "؟"; },
      notesModalPrefix: "ملاحظات — ", close: "إغلاق", today: "اليوم",
      dow: ["إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"],
      eventsTitle: "أحداث اليوم", legendStart: "بداية الدراسة", legendEnd: "نهاية الدراسة",
      noEventsTitle: "ما فماش أحداث", noEventsText: "اختر يوم آخر أو زيد تاريخ انتهاء لتلميذ.",
      saveError: "تعذّر حفظ البيانات في هذا المتصفح.", locale: "ar-TN"
    }
  };

  function t(key) { return STR[currentLang][key]; }
  function levelLabel(value) { return LEVEL_LABELS[currentLang][value] || value; }

  var els = {
    sideTotal: document.getElementById("sideTotal"),
    sideTotalLabel: document.getElementById("sideTotalLabel"),
    navStudentsLabel: document.getElementById("navStudentsLabel"),
    navCalendarLabel: document.getElementById("navCalendarLabel"),
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
    startDate: document.getElementById("startDate"),
    endDate: document.getElementById("endDate"),
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
    langSwitch: document.getElementById("langSwitch")
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
    } catch (e) { students = []; }
  }
  function saveStudents() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(students)); }
    catch (e) { alert(t("saveError")); }
  }
  function loadLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === "ar" || saved === "en") currentLang = saved;
    } catch (e) {}
  }
  function saveLang() {
    try { localStorage.setItem(LANG_KEY, currentLang); } catch (e) {}
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
    return currentLang === "ar" ? (parts[2] + "/" + parts[1] + "/" + parts[0]) : (parts[2] + "/" + parts[1] + "/" + parts[0]);
  }
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : str;
    return div.innerHTML;
  }
  function toDateKey(d) {
    var y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
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
    els.pageDate.textContent = now.toLocaleDateString(t("locale"), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    var hour = now.getHours();
    els.heroGreeting.textContent = hour < 12 ? t("heroMorning") : (hour < 18 ? t("heroDay") : t("heroEvening"));
  }

  /* ---------------- language ---------------- */
  function applyStaticText() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

    els.langSwitch.querySelectorAll(".lang-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === currentLang);
    });

    els.navStudentsLabel.textContent = t("navStudents");
    els.navCalendarLabel.textContent = t("navCalendar");
    els.sideTotalLabel.textContent = t("sidebarTotal");
    els.heroText.textContent = t("heroText");
    els.openAddBtn.textContent = t("addStudent");
    els.searchInput.placeholder = t("searchPlaceholder");
    els.eventsTitle.textContent = t("eventsTitle");
    els.legendStartLabel.textContent = t("legendStart");
    els.legendEndLabel.textContent = t("legendEnd");
    els.calTodayBtn.textContent = t("today");
    els.calPrevBtn.setAttribute("aria-label", currentLang === "ar" ? "الشهر السابق" : "Previous month");
    els.calNextBtn.setAttribute("aria-label", currentLang === "ar" ? "الشهر القادم" : "Next month");

    els.lblFirstName.textContent = t("firstName");
    els.lblLastName.textContent = t("lastName");
    els.lblLevel.textContent = t("level");
    els.lblStartDate.textContent = t("startDate");
    els.lblEndDateText.textContent = t("endDate");
    els.lblEndDateOptional.textContent = t("optional");
    els.lblNotesText.textContent = t("notes");
    els.lblNotesOptional.textContent = t("optional");
    els.notes.placeholder = t("notesPlaceholder");
    els.cancelBtn.textContent = t("cancel");
    els.noteCloseBtn.textContent = t("close");

    els.pageTitle.textContent = currentPage === "students" ? t("pageTitleStudents") : t("pageTitleCalendar");

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
    document.querySelectorAll(".nav-item").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.page === pageName);
    });
    document.querySelectorAll(".page").forEach(function (sec) {
      sec.classList.toggle("active", sec.id === "page-" + pageName);
    });
    els.pageTitle.textContent = pageName === "students" ? t("pageTitleStudents") : t("pageTitleCalendar");
    els.actionsStudents.style.display = pageName === "students" ? "flex" : "none";
    els.actionsCalendar.style.display = pageName === "calendar" ? "flex" : "none";
    if (pageName === "calendar") renderCalendar();
  }

  /* ---------------- students rendering ---------------- */
  function renderStats() {
    var total = students.length;
    var counts = {};
    LEVELS.forEach(function (l) { counts[l] = 0; });
    students.forEach(function (s) { if (counts[s.level] !== undefined) counts[s.level]++; });

    els.sideTotal.textContent = total;

    var chipsHtml = LEVELS.map(function (l) {
      return '<span class="chip">' + levelLabel(l) + ": <b>" + counts[l] + "</b></span>";
    }).join("");

    els.statsBar.innerHTML =
      '<div class="stat-card"><b>' + total + "</b><span>" + t("statTotal") + "</span></div>" +
      '<div class="stat-card" style="flex:3;"><div class="chip-row">' + chipsHtml + "</div></div>";
  }

  function getFilteredStudents() {
    var query = els.searchInput.value.trim().toLowerCase();
    var levelFilterVal = els.levelFilter.value;
    return students
      .filter(function (s) {
        var matchesQuery = !query || (s.firstName + " " + s.lastName).toLowerCase().indexOf(query) !== -1;
        var matchesLevel = !levelFilterVal || s.level === levelFilterVal;
        return matchesQuery && matchesLevel;
      })
      .sort(function (a, b) {
        var ai = LEVELS.indexOf(a.level), bi = LEVELS.indexOf(b.level);
        if (ai !== bi) return ai - bi;
        return a.lastName.localeCompare(b.lastName);
      });
  }

  function renderTable() {
    var list = getFilteredStudents();

    if (students.length === 0) {
      els.tableWrap.innerHTML = '<div class="empty"><b>' + t("emptyNoneTitle") + "</b>" + t("emptyNoneText") + "</div>";
      return;
    }
    if (list.length === 0) {
      els.tableWrap.innerHTML = '<div class="empty"><b>' + t("emptyFilterTitle") + "</b>" + t("emptyFilterText") + "</div>";
      return;
    }

    var rows = list.map(function (s) {
      var badgeClass = LEVEL_CATEGORY[s.level] === "lycee" ? "badge-lycee" : "badge-college";
      var hasNotes = s.notes && s.notes.trim().length > 0;
      var noteCell = hasNotes
        ? '<button type="button" class="note-btn" data-action="note" data-id="' + s.id + '">📝</button>'
        : '<span class="muted-cell">—</span>';
      return (
        "<tr>" +
        '<td data-label="' + t("thName") + '" class="name-cell">' + escapeHtml(s.firstName) + " " + escapeHtml(s.lastName) + "</td>" +
        '<td data-label="' + t("thLevel") + '"><span class="badge ' + badgeClass + '">' + escapeHtml(levelLabel(s.level)) + "</span></td>" +
        '<td data-label="' + t("thStart") + '">' + formatDate(s.startDate) + "</td>" +
        '<td data-label="' + t("thEnd") + '" class="muted-cell">' + formatDate(s.endDate) + "</td>" +
        '<td data-label="' + t("thNotes") + '">' + noteCell + "</td>" +
        '<td data-label=""><div class="row-actions">' +
          '<button type="button" class="btn-edit-text" data-action="edit" data-id="' + s.id + '">' + t("edit") + "</button>" +
          '<button type="button" class="btn-danger-text" data-action="delete" data-id="' + s.id + '">' + t("delete") + "</button>" +
        "</div></td>" +
        "</tr>"
      );
    }).join("");

    els.tableWrap.innerHTML =
      "<table><thead><tr>" +
      "<th>" + t("thName") + "</th><th>" + t("thLevel") + "</th><th>" + t("thStart") + "</th><th>" + t("thEnd") + "</th><th>" + t("thNotes") + "</th><th></th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table>";
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
      els.startDate.value = student.startDate;
      els.endDate.value = student.endDate || "";
      els.notes.value = student.notes || "";
    } else {
      els.modalTitle.textContent = t("modalAddTitle");
      els.submitBtn.textContent = t("add");
      els.studentId.value = "";
      els.level.value = LEVELS[0];
    }
    els.modalOverlay.classList.add("open");
    els.firstName.focus();
  }
  function closeModal() { els.modalOverlay.classList.remove("open"); }

  function handleSubmit(e) {
    e.preventDefault();
    var id = els.studentId.value;
    var data = {
      firstName: els.firstName.value.trim(),
      lastName: els.lastName.value.trim(),
      level: els.level.value,
      startDate: els.startDate.value,
      endDate: els.endDate.value || "",
      notes: els.notes.value.trim()
    };
    if (!data.firstName || !data.lastName || !data.level || !data.startDate) return;

    if (id) {
      students = students.map(function (s) { return s.id === id ? Object.assign({}, s, data) : s; });
    } else {
      data.id = makeId();
      students.push(data);
    }
    saveStudents();
    closeModal();
    renderStudentsPage();
    if (currentPage === "calendar") renderCalendar();
  }

  function openNoteModal(student) {
    els.noteModalTitle.textContent = t("notesModalPrefix") + student.firstName + " " + student.lastName;
    els.noteModalBody.textContent = student.notes;
    els.noteModalOverlay.classList.add("open");
  }
  function closeNoteModal() { els.noteModalOverlay.classList.remove("open"); }

  function handleTableClick(e) {
    var btn = e.target.closest("button[data-action]");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    var student = students.filter(function (s) { return s.id === id; })[0];
    if (!student) return;

    if (btn.dataset.action === "edit") {
      openModal("edit", student);
    } else if (btn.dataset.action === "delete") {
      if (confirm(t("deleteConfirm")(student.firstName + " " + student.lastName))) {
        students = students.filter(function (s) { return s.id !== id; });
        saveStudents();
        renderStudentsPage();
      }
    } else if (btn.dataset.action === "note") {
      openNoteModal(student);
    }
  }

  /* ---------------- calendar ---------------- */
  function buildEventsMap() {
    var map = {};
    students.forEach(function (s) {
      if (s.startDate) { map[s.startDate] = map[s.startDate] || []; map[s.startDate].push({ student: s, type: "start" }); }
      if (s.endDate) { map[s.endDate] = map[s.endDate] || []; map[s.endDate].push({ student: s, type: "end" }); }
    });
    return map;
  }

  function renderCalendar() {
    var eventsMap = buildEventsMap();
    var year = calendarCursor.getFullYear();
    var month = calendarCursor.getMonth();

    els.calMonthLabel.textContent = calendarCursor.toLocaleDateString(t("locale"), { month: "long", year: "numeric" });

    var firstOfMonth = new Date(year, month, 1);
    var startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
    var gridStart = new Date(year, month, 1 - startOffset);
    var today = new Date();
    var dow = t("dow");
    var cellsHtml = dow.map(function (d) { return '<div class="cal-dow">' + d + "</div>"; }).join("");

    for (var i = 0; i < 42; i++) {
      var cellDate = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
      var isOutside = cellDate.getMonth() !== month;
      var key = toDateKey(cellDate);
      var dayEvents = eventsMap[key] || [];
      var hasStart = dayEvents.some(function (ev) { return ev.type === "start"; });
      var hasEnd = dayEvents.some(function (ev) { return ev.type === "end"; });

      var classes = ["cal-cell"];
      if (isOutside) classes.push("outside");
      if (sameDay(cellDate, today)) classes.push("today");
      if (sameDay(cellDate, selectedDate)) classes.push("selected");

      var dotsHtml = "";
      if (hasStart || hasEnd) {
        dotsHtml = '<div class="cal-dots">' +
          (hasStart ? '<span class="cal-dot dot-start"></span>' : "") +
          (hasEnd ? '<span class="cal-dot dot-end"></span>' : "") +
          "</div>";
      }
      cellsHtml += '<div class="' + classes.join(" ") + '" data-date="' + key + '"><span>' + cellDate.getDate() + "</span>" + dotsHtml + "</div>";
    }

    els.calGrid.innerHTML = cellsHtml;
    renderEventsList(eventsMap);
  }

  function renderEventsList(eventsMap) {
    var key = toDateKey(selectedDate);
    var dayEvents = eventsMap[key] || [];
    els.eventsSub.textContent = selectedDate.toLocaleDateString(t("locale"), { weekday: "long", day: "numeric", month: "long" });

    if (dayEvents.length === 0) {
      els.eventsList.innerHTML = '<div class="empty" style="padding:30px 10px;"><b>' + t("noEventsTitle") + "</b>" + t("noEventsText") + "</div>";
      return;
    }

    els.eventsList.innerHTML = dayEvents.map(function (ev) {
      var color = ev.type === "start" ? "var(--color-primary)" : "var(--color-accent-ink)";
      var label = ev.type === "start" ? t("legendStart") : t("legendEnd");
      return '<div class="event-item">' +
        '<span class="event-dot" style="background:' + color + '"></span>' +
        "<span><b>" + escapeHtml(ev.student.firstName + " " + ev.student.lastName) + "</b><small>" + label + " — " + escapeHtml(levelLabel(ev.student.level)) + "</small></span>" +
        "</div>";
    }).join("");
  }

  function handleCalGridClick(e) {
    var cell = e.target.closest(".cal-cell");
    if (!cell || cell.classList.contains("outside")) return;
    var parts = cell.dataset.date.split("-");
    selectedDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    renderCalendar();
  }

  /* ---------------- events ---------------- */
  document.querySelectorAll(".nav-item").forEach(function (btn) {
    btn.addEventListener("click", function () { switchPage(btn.dataset.page); });
  });
  els.langSwitch.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { setLang(btn.dataset.lang); });
  });

  els.openAddBtn.addEventListener("click", function () { openModal("add"); });
  els.cancelBtn.addEventListener("click", closeModal);
  els.modalOverlay.addEventListener("click", function (e) { if (e.target === els.modalOverlay) closeModal(); });
  els.studentForm.addEventListener("submit", handleSubmit);
  els.tableWrap.addEventListener("click", handleTableClick);
  els.searchInput.addEventListener("input", renderTable);
  els.levelFilter.addEventListener("change", renderTable);

  els.noteCloseBtn.addEventListener("click", closeNoteModal);
  els.noteModalOverlay.addEventListener("click", function (e) { if (e.target === els.noteModalOverlay) closeNoteModal(); });

  els.calGrid.addEventListener("click", handleCalGridClick);
  els.calPrevBtn.addEventListener("click", function () { calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1); renderCalendar(); });
  els.calNextBtn.addEventListener("click", function () { calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1); renderCalendar(); });
  els.calTodayBtn.addEventListener("click", function () { calendarCursor = new Date(); selectedDate = new Date(); renderCalendar(); });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (els.modalOverlay.classList.contains("open")) closeModal();
    if (els.noteModalOverlay.classList.contains("open")) closeNoteModal();
  });

  /* ---------------- init ---------------- */
  loadLang();
  loadStudents();
  applyStaticText();
  setHeaderDate();
  renderStudentsPage();
})();
