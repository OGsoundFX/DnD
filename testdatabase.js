// storing character data

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dbFileName = "database/players.json";
const adapter = new FileSync(dbFileName)
const db = low(adapter)

// Add another entry
db.get('players')
.push({
  "name": "Bob",
  "password": "theloser",
  "luck": "4",
  "magic": "18",
  "strength": "25",
  "experience": "5",
  "money": "100",
  "life": "12"
    })
.write();
