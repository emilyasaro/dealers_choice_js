const pg = require('pg');

const client = new pg.Client('postgres://localhost/band_db');

const syncAndSeed = async () => {
  const SQL = `
    DROP TABLE IF EXISTS "Members";
    DROP TABLE IF EXISTS "Band";
    CREATE TABLE "Band"(
      id INTEGER PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );
    CREATE TABLE "Members"(
      id INTEGER PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      birthdate VARCHAR(100) NOT NULL,
      bio VARCHAR(300) NOT NULL,
      greatestHit VARCHAR(100) NOT NULL,
      band_id INTEGER REFERENCES "Band"(id)
    );
    INSERT INTO "Band" (id, name) VALUES(1, 'Queen');
    INSERT INTO "Band" (id, name) VALUES(2, 'David Bowie and the Spiders From Mars');
    INSERT INTO "Members" (id, name, birthdate, bio, greatestHit, band_id) VALUES(1, 'Freddie Mercury', 'September 5, 1946', 'lived in England', 'Bohemian Rhapsody', 1);
    INSERT INTO "Members" (id, name, birthdate, bio, greatestHit, band_id) VALUES(2, 'Brian May', 'July 19, 1947', 'lived in England', 'We Will Rock You', 1);
    INSERT INTO "Members" (id, name, birthdate, bio, greatestHit, band_id) VALUES(3, 'David Bowie', 'Januay 8, 2947', 'lived in England', 'Ziggy Stardust', 2);
  `
  await client.query(SQL)
}

module.exports = {
  client,
  syncAndSeed
}


// INSERT INTO "Band" (id, name) VALUES(2, 'Brian May');
// INSERT INTO "Band" (id, name) VALUES(3, 'Roger Taylor');
// INSERT INTO "Band" (id, name) VALUES(4, 'John Deacon');
