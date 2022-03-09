const faker = require('@faker-js/faker');
const mongoDB = require('mongodb');
const dotenv = require('dotenv');

/**
 * Luo MongoDB Tietokantaan 1 000 000 erilaista henkilöä
 * Tarkoitettu opinnäytetyön rajapintojen testaukseen
 */
async function createFakeData() {
    // Hae asetukset .env tiedostosta
    dotenv.config();

    // Hae MongoDB tietokannan tiedot asetuksista
    const collectionName = process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME : '';
    const connectionString = process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : '';
    const databaseName = process.env.DB_NAME ? process.env.DB_NAME : '';

    const client = new mongoDB.MongoClient(connectionString);

    // Luo yhteys olemassaolevaan tietokantaan
    await client.connect();
    const db = client.db(databaseName);
    const itemsCollection = db.collection(collectionName);

    const fakePeople = [];

    // Luo 1 000 000 erilaista feikkihenkilöä
    // joilla on nimi ja sähköposti
    for (let i = 0; i < 1000000; i++) {
        fakePeople.push({
            name: faker.name.findName(),
            email: faker.internet.email()
        })
    }

    // Työnnä feikkihenkilöt tietokantaan
    const result = await itemsCollection.insertMany(fakePeople);
    console.log(result);
}

// Suorita funktio
createFakeData();
