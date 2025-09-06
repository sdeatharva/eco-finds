const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function getDbConnection() {
  const db = await open({
    filename: './ecofinds.db',
    driver: sqlite3.Database,
  });
  return db;
}

async function initializeDb() {
  const db = await getDbConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      price REAL NOT NULL,
      sellerName TEXT NOT NULL
    )
  `);

  console.log('Database initialized.');
  await db.close();
}

if (require.main === module) {
  initializeDb();
}

module.exports = { getDbConnection };