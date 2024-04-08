const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());

// Define the database file path
const DB_FILE_PATH = 'locations.db';

// Open or create the SQLite database
const db = new sqlite3.Database(DB_FILE_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Create the locations table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS locations (
        objectid INTEGER PRIMARY KEY,
        applicant TEXT,
        facilitytype TEXT,
        cnn INTEGER,
        locationdescription TEXT,
        address TEXT,
        blocklot INTEGER,
        block INTEGER,
        lot INTEGER,
        permit TEXT,
        status TEXT,
        fooditems TEXT,
        x REAL,
        y REAL,
        latitude REAL,
        longitude REAL,
        schedule TEXT,
        dayshours TEXT,
        noisent TEXT,
        approved TEXT,
        received TEXT,
        priorpermit TEXT,
        expirationdate TEXT
      )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created successfully.');
            
            // Insert data into the locations table
            insertData();
        }
    });
  }
});

// fill database with sfgov public data
function insertData() {
    axios.get('https://data.sfgov.org/resource/rqzj-sfat.json')
    .then(response => {
      const locations = []
      response.data.forEach(element => {
            locations.push({
                objectid: element.objectid,
                applicant: element.applicant,
                facilitytype: element.facilitytype,
                cnn: element.cnn,
                locationdescription: element.locationdescription,
                address: element.address,
                blocklot: element.blocklot,
                block: element.block,
                lot: element.lot,
                permit: element.permit,
                status: element.status,
                fooditems: element.fooditems,
                x: element.x,
                y: element.y,
                latitude: element.latitude,
                longitude: element.longitude,
                schedule: element.schedule,
                dayshours: element.dayshours,
                noisent: element.noisent,
                approved: element.approved,
                received: element.received,
                priorpermit: element.priorpermit,
                expirationdate: element.expirationdate,
            })
        });
      
        locations.forEach(data => {
            const placeholders = Object.keys(data).map(() => '?').join(',');
            const values = Object.values(data);
            
            db.run(`INSERT INTO locations VALUES (${placeholders})`, values, function(err) {
            if (err) {
                console.error('Error inserting data:', err.message);
            } else {
                console.log(`Row inserted with ID: ${this.lastID}`);
            }
            });
        });
        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Disconnected from the SQLite database.');
            }
        });
    })
    .catch(error => {
        console.error('Error fetching locations:', error);
    });
}
