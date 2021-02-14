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
      bio VARCHAR(700) NOT NULL,
      role VARCHAR(100) NOT NULL,
      band_id INTEGER REFERENCES "Band"(id)
    );
    INSERT INTO "Band" (id, name) VALUES(1, 'Queen');
    INSERT INTO "Band" (id, name) VALUES(2, 'David Bowie and the Spiders From Mars');
    INSERT INTO "Members" (id, name, birthdate, bio, role, band_id) VALUES(1, 'Freddie Mercury', 'September 5, 1946', 'Freddie was a British singer, songwriter, record producer, and lead vocalist of the rock band Queen. Regarded as one of the greatest singers in the history of rock music, he was known for his flamboyant stage persona and four-octave vocal range. Mercury defied the conventions of a rock frontman, with his highly theatrical style influencing the artistic direction of Queen.', 'Lead Singer & Pianist', 1);
    INSERT INTO "Members" (id, name, birthdate, bio, role, band_id) VALUES(2, 'Brian May', 'July 19, 1947', 'Brian is an English musician, singer, songwriter, record producer, and astrophysicist. He is the lead guitarist of the rock band Queen. May was a co-founder of Queen with lead singer Freddie Mercury and drummer Roger Taylor, having previously performed with Taylor in the band Smile, which he had joined while he was at university.', 'Guitarist', 1);
    INSERT INTO "Members" (id, name, birthdate, bio, role, band_id) VALUES(3, 'Roger Taylor', 'July 26, 1949', 'Roger is an English musician, singer, songwriter, and multi-instrumentalist, best known as the drummer for the rock band Queen. As a drummer, Taylor was recognised early in his career for his unique sound.', 'Drummer', 1);
    INSERT INTO "Members" (id, name, birthdate, bio, role, band_id) VALUES(4, 'John Deacon', 'August 29, 1951', 'John is an English retired musician, best known for being the bass guitarist for the rock band Queen. After the death of lead singer Freddie Mercury in 1991 and the following years Tribute Concert, Deacon performed only sporadically with the remaining members of Queen before retiring from the music industry in 1997 after recording "No-One but You (Only the Good Die Young)."', 'Basist', 1);
    INSERT INTO "Members" (id, name, birthdate, bio, role, band_id) VALUES(5, 'David Bowie', 'Januay 8, 2947', 'David Robert Jones, known professionally as David Bowie was an English singer-songwriter and actor. He was a leading figure in the music industry and is regarded as one of the most influential musicians of the 20th century. His career was marked by reinvention and visual presentation, with his music and stagecraft having a significant impact on popular music. During his lifetime, his record sales, estimated at over 100 million records worldwide, made him one of the best-selling music artists of all time.', 'Singer & Guitarist', 2);
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
