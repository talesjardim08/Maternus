import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_ENTRIES = "@diario_entries";
const KEY_DAILY = "@diario_daily";

export async function getAllEntries() {
  try {
    const raw = await AsyncStorage.getItem(KEY_ENTRIES);
    return raw ? JSON.parse(raw) : {};
  } catch {
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
  const all = await getAllEntries();
  const list = all[chapterId] || [];
  const newEntry = { id: Date.now().toString(), ...entry };
  const updated = { ...all, [chapterId]: [...list, newEntry] };
  await AsyncStorage.setItem(KEY_ENTRIES, JSON.stringify(updated));
  return newEntry;
}

export async function saveDailyForm(dateISO, payload) {
  try {
    const raw = await AsyncStorage.getItem(KEY_DAILY);
    const data = raw ? JSON.parse(raw) : {};
    data[dateISO] = payload;
    await AsyncStorage.setItem(KEY_DAILY, JSON.stringify(data));
    return payload;
  } catch {
    return null;
  }
}

export async function getDailyForm(dateISO) {
  try {
    const raw = await AsyncStorage.getItem(KEY_DAILY);
    const data = raw ? JSON.parse(raw) : {};
    return data[dateISO] || null;
  } catch {
    return null;
  }
}
