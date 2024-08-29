const express = require('express')
const app = express()
const os = require('os')

const interfaces = os.networkInterfaces();
let ip;
const port = 3000;

// Expose local network ips based on <https://github.com/ProjectsByJackHe/airshare>
const getNetworkAddress = () => {
	for (const name of Object.keys(interfaces)) {
		for (const interface of interfaces[name]) {
			const {address, family, internal} = interface;
			if (family === 'IPv4' && !internal) {
				return address;
			}
		}
	}
};

try {
  // Get Internal IP
  ip = String(getNetworkAddress());
} catch (err) {
  console.log(err) 
  process.exit(1); 
}

app.get('/', (req, res) => {
  return res.send('Hello World!')
})

app.use(express.static('public'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on ${ip}:${port}`)
})