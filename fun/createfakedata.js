const faker = require('@faker-js/faker');
const mongoDB = require('mongodb');
const dotenv = require('dotenv');

/**
 * Luo MongoDB Tietokantaan 10 000 erilaista henkilöä
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

    // Luo 10 000 erilaista feikkihenkilöä
    // joilla on nimi ja sähköposti
    for (let i = 0; i < 10000; i++) {
        fakePeople.push({
            name: faker.name.findName(),
            email: faker.internet.email()
        })
    }

    // Työnnä feikkihenkilöt tietokantaan
    return await itemsCollection.insertMany(fakePeople);
}

// Suorita funktio
createFakeData().then(
    console.log('Documents inserted'),
    process.exit()
);
