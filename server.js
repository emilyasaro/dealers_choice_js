const { client, syncAndSeed } = require('./db')
const html = require('html-template-tag');
const express = require('express');
const path = require('path');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res, next) => {
  try {
    const response = await client.query('SELECT * FROM "Band";');
    const bands = response.rows;
    res.send(html`
    <html>
      <head>
      <link rel='stylesheet' href='/public/styles.css' />
      </head>
      <body>
        <h1> 70s Glam Rock </h1>
        <h3> The Bands ... enough camp? </h3>
        <ul style="list-style-type:none;">
        $${bands.map( band => html `
          <li>
          <a href='/band_db/${band.id}'>
            ${ band.name }
          </li>
        `).join('')
      }
        </ul>
      </body>
    </html>
    `
    );
  }
  catch(ex) {

  }
})

const port = process.env.PORT || 1337;

const setUp = async () => {
  try {
    await client.connect(); // this is a promise?
    await syncAndSeed();
    console.log('connected to database');
    app.listen(port, () => console.log(`listening on port ${port}`));
  }
  catch(ex) {
    console.log(ex);
  }
}

setUp();


// INSERT INTO "Band" (id, name) VALUES(2, 'Brian May');
// INSERT INTO "Band" (id, name) VALUES(3, 'Roger Taylor');
// INSERT INTO "Band" (id, name) VALUES(4, 'John Deacon');
