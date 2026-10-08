/* Pure helpers for the cloud sync (no Firebase, no DOM), so they can be tested alone. */

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    var out = {};
    Object.keys(value)
      .sort()
      .forEach(function (key) {
        if (value[key] !== undefined) out[key] = sortKeys(value[key]);
      });
    return out;
  }
  return value;
}

/* JSON with sorted keys: two objects with the same content always give the same string,
   even if Firestore returns the fields in a different order. */
export function stableStringify(value) {
  return JSON.stringify(sortKeys(value));
}

/* Compare the students on this device with what was last synced.
   lastSynced: Map(id -> stable string). Returns what to write and delete,
   plus the Map to remember once those writes are queued. */
export function diffStudents(lastSynced, students) {
  var upserts = [];
  var nextSynced = new Map();
  var seen = new Set();
  students.forEach(function (student) {
    if (!student || typeof student.id !== "string") return;
    var str = stableStringify(student);
    seen.add(student.id);
    nextSynced.set(student.id, str);
    if (lastSynced.get(student.id) !== str) upserts.push(student);
  });
  var deletes = [];
  lastSynced.forEach(function (_str, id) {
    if (!seen.has(id)) deletes.push(id);
  });
  return { upserts: upserts, deletes: deletes, nextSynced: nextSynced };
}

/* Union of two group lists by name (case-insensitive). The cloud copy wins on a clash. */
export function mergeGroups(cloudGroups, localGroups) {
  var names = new Set(
    cloudGroups.map(function (group) {
      return String(group.name).toLowerCase();
    }),
  );
  return cloudGroups.concat(
    localGroups.filter(function (group) {
      return !names.has(String(group.name).toLowerCase());
    }),
  );
}
