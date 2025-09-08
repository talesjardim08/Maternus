// screens/diario/storege/diario-store.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_ENTRIES = "@diario_entries"; // objeto: { [chapterId]: [entry, ...] }
const KEY_DAILY = "@diario_daily"; // objeto: { [dateISO]: payload }

export async function getAllEntries() {
  try {
    const raw = await AsyncStorage.getItem(KEY_ENTRIES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("getAllEntries error", e);
    return {};
  }
}

export async function getEntriesByChapter(chapterId) {
  const all = await getAllEntries();
  return all[chapterId] || [];
}

export async function getLastEntry(chapterId) {
  const list = await getEntriesByChapter(chapterId);
  return list.length ? list[list.length - 1] : null;
}

export async function saveEntry(chapterId, entry) {
  try {
    const all = await getAllEntries();
    const list = all[chapterId] || [];
    const newEntry = { id: Date.now().toString(), ...entry };
    const updated = { ...all, [chapterId]: [...list, newEntry] };
    await AsyncStorage.setItem(KEY_ENTRIES, JSON.stringify(updated));
    return newEntry;
  } catch (e) {
    console.warn("saveEntry error", e);
    return null;
  }
}

export async function deleteEntriesByChapter(chapterId) {
  try {
    const all = await getAllEntries();
    if (!all[chapterId]) return false;
    delete all[chapterId];
    await AsyncStorage.setItem(KEY_ENTRIES, JSON.stringify(all));
    return true;
  } catch (e) {
    console.warn("deleteEntriesByChapter error", e);
    return false;
  }
}

/* --- daily form (histórico de respostas) --- */
export async function saveDailyForm(dateISO, data) {
  try {
    const raw = await AsyncStorage.getItem(KEY_DAILY);
    const obj = raw ? JSON.parse(raw) : {};
    obj[dateISO] = { ...data, dateISO };
    await AsyncStorage.setItem(KEY_DAILY, JSON.stringify(obj));
    return true;
  } catch (e) {
    console.warn("saveDailyForm error", e);
    return false;
  }
}

export async function getDailyForm(dateISO) {
  try {
    const raw = await AsyncStorage.getItem(KEY_DAILY);
    const obj = raw ? JSON.parse(raw) : {};
    return obj[dateISO] || null;
  } catch (e) {
    console.warn("getDailyForm error", e);
    return null;
  }
}

export async function listDailyForms() {
  try {
    const raw = await AsyncStorage.getItem(KEY_DAILY);
    const obj = raw ? JSON.parse(raw) : {};
    const arr = Object.values(obj);
    // ordena por dateISO descendente
    return arr.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
  } catch (e) {
    console.warn("listDailyForms error", e);
    return [];
  }
}
