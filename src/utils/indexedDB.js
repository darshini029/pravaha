// IndexedDB helper for PRAVAHA Offline Field Operations
const DB_NAME = 'PRAVAHA_FIELD_DB';
const DB_VERSION = 1;
const STORE_NAME = 'field_reports';

export function openFieldDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('syncStatus', 'syncStatus', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('IndexedDB open error:', event.target.error);
      reject(event.target.error);
    };
  });
}

export async function saveFieldReportToIndexedDB(report) {
  const db = await openFieldDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const reportItem = {
      ...report,
      createdAt: report.createdAt || new Date().toISOString(),
      syncStatus: report.syncStatus || 'local_only', // 'local_only' or 'synced'
      storedIn: 'IndexedDB (Offline Storage)'
    };

    const request = store.add(reportItem);

    request.onsuccess = (event) => {
      resolve({ ...reportItem, id: event.target.result });
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function getAllFieldReportsFromIndexedDB() {
  const db = await openFieldDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result || []);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function syncAllPendingReportsInIndexedDB() {
  const db = await openFieldDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event) => {
      const all = event.target.result || [];
      let updatedCount = 0;
      
      all.forEach((item) => {
        if (item.syncStatus !== 'synced') {
          item.syncStatus = 'synced';
          item.syncedAt = new Date().toISOString();
          store.put(item);
          updatedCount++;
        }
      });

      transaction.oncomplete = () => {
        resolve({ count: updatedCount, allReports: all });
      };
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
