const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); // Import your server file
const expect = chai.expect;

chai.use(chaiHttp);

describe('Locations API', () => {
    describe('GET /api/locations', () => {
        it('should return list of locations with default status "APPROVED"', (done) => {
            chai.request(server)
                .get('/api/locations')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    // Add more assertions based on the expected response
                    done();
                });
        });

        it('should return list of locations with status "REQUESTED"', (done) => {
            chai.request(server)
                .get('/api/locations?status=REQUESTED')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    // Add more assertions based on the expected response
                    done();
                });
        });

        // Add more test cases for different query parameters
    });

    describe('buildQuery function', () => {
        it('should build query with default status "APPROVED"', () => {
            const query = server.buildQuery();
            expect(query).to.contain('FROM locations WHERE status = \'APPROVED\'');
        });

        it('should build query with specified status "REQUESTED"', () => {
            const query = server.buildQuery('REQUESTED');
            expect(query).to.contain('FROM locations WHERE status = \'REQUESTED\'');
        });

        // Add more test cases for different inputs to buildQuery function
    });
});
