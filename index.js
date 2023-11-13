const express = require('express');
const soap = require('soap');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

/*const url1 = 'http://127.0.0.1:8080/Disponibilitewebservice?wsdl';
const url2 = 'http://127.0.0.1:8080/reservationhotelwebservice?wsdl';

// Create SOAP clients for the web services
let client1;
let client2;

// Create SOAP clients for the web services
soap.createClient(url1, {}, (err, client) => {
  if (err) {
    console.error('Error creating SOAP client for web service 1', err);
  } else {
    client1 = client;
  }
});

soap.createClient(url2, {}, (err, client) => {
  if (err) {
    console.error('Error creating SOAP client for web service 2', err);
  } else {
    client2 = client;
  }
});
*/

// Endpoint 1: Consult Disponibilites
app.post('/consultDisponibilites', (req, res) => {
  const url = 'http://127.0.0.1:8080/Disponibilitewebservice?wsdl';

  // Create SOAP clients for the web services
  soap.createClient(url, {}, (err, client) => {
    if (err) {
      console.error('Error creating SOAP client for web service 1', err);
      return res.status(500).json({ error: 'SOAP client for web service 1 not available' });
    } else {
      client.consulterDisponibilites(req.body, (err, result) => {
        if (err) {
          console.error('Error calling SOAP method for web service 1', err);
          return res.status(500).json({ error: 'Error calling SOAP method for web service 1' });
        } else {
          res.json(result);
        }
      });
    }
  });
});

// Endpoint 2: Make Reservation
app.post('/makeReservation', (req, res) => {
  const url = 'http://127.0.0.1:8080/reservationhotelwebservice?wsdl';

  soap.createClient(url, {}, (err, client) => {
    if (err) {
      console.error('Error creating SOAP client for web service 2', err);
      return res.status(500).json({ error: 'SOAP client for web service 2 not available' });
    } else {
      client.reservation(req.body, (err, result) => {
        if (err) {
          console.error('Error calling SOAP method for web service 2', err);
          return res.status(500).json({ error: 'Error calling SOAP method for web service 2' });
        } else {
          res.json(result);
        }
      });
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
