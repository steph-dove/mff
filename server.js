const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
const DB_FILE_PATH = 'locations.db';

// Endpoint to get list of locations
app.get('/api/locations', (req, res) => {
    console.log('Request query:', req.query);
    // parse status query parameter
    let status = req.query && req.query.status.toUpperCase() || 'APPROVED';
    const options = ['APPROVED', 'ALL', 'DENIED', 'REQUESTED', 'SUSPEND', 'EXPIRED', 'ISSUED'];
    if (!options.includes(status.toUpperCase())) {
        status = 'APPROVED';
    }
    status = status.toUpperCase();

    // parse applicant query parameter
    let applicant = req.query && req.query.applicant || '';

    // parse address query parameter
    let address = req.query && req.query.address || '';

    // Open the SQLite database
    const db = new sqlite3.Database(DB_FILE_PATH, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            process.exit(1); // Exit the script with an error code
        } else {
            console.log('Connected to the SQLite database.', status, applicant, address);
        
            // build the SQL query
            const query = buildQuery(status, applicant, address);
            // Query the locations table
            db.all(query, (err, rows) => {
                if (err) {
                    console.error('Error querying data:', err.message);
                    process.exit(1); // Exit the script with an error code
                } else {
                    const locations = []
                    rows.forEach(row => {
                        locations.push({
                            objectid: row.objectid,
                            applicant: row.applicant,
                            facilitytype: row.facilitytype,
                            cnn: row.cnn,
                            locationdescription: row.locationdescription,
                            address: row.address,
                            blocklot: row.blocklot,
                            block: row.block,
                            lot: row.lot,
                            permit: row.permit,
                            status: row.status,
                            fooditems: row.fooditems,
                            x: row.x,
                            y: row.y,
                            latitude: row.latitude,
                            longitude: row.longitude,
                            schedule: row.schedule,
                            dayshours: row.dayshours,
                            noisent: row.noisent,
                            approved: row.approved,
                            received: row.received,
                            priorpermit: row.priorpermit,
                            expirationdate: row.expirationdate,
                        })
                    });
                    
                    res.json(locations);
                }
                
                // Close the database connection
                db.close((err) => {
                    if (err) {
                        console.error('Error closing database:', err.message);
                        process.exit(1); // Exit the script with an error code
                    } else {
                        console.log('Disconnected from the SQLite database.');
                    }
                });
            });
        }
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const buildQuery = (status, applicant, address) => {
    let query = `SELECT * FROM locations WHERE status = 'APPROVED'`;
    if (status) {
        query = `SELECT * FROM locations WHERE status = '${status}'`;
    }
    if (status === 'ALL') {
        query = `SELECT * FROM locations`;
    }
    if (applicant) {
        query += ` AND applicant LIKE '${applicant}'`;
    }
    if (address) {
        query += ` AND address LIKE '${address}'`;
    }
    return query;
}