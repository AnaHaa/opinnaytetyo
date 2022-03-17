# Opinnäytetyön projektit

Sisältää kaksi erilaista ohjelmointirajapintaa.

## Functional

Noudattaa osittain funktionaalista ohjelmointia hyödyntämällä Higher-order ja callback funktioita.

## OOP

Noudattaa osittain olio-ohjelmointia hyödyntämällä luokkia.

## Asennus

Vaaditaan .env tiedosto, jossa on yhteystiedot MongoDB - tietokantaan.
Asennetaan ja suoritetaan:
```
npm i
npm start
```

## Endpointit

GET /items
Hakee kaikki dokumentit tietokannasta.

GET /item:_id
Hakee yhden dokumentin tietokannasta _id parametrin avulla.

POST /item
Luo yhden dokumentin tietokantaan JSON-bodyllä.
| field       | type    |
| ----------- | -------:|
| name        | string  |
| email       | string  |

DELETE /item:_id
Poistaa yhden dokumentin tietokannasta _id parametrin avulla.
