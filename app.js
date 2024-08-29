const express = require('express')
const app = express()
const port = 3000
const os = require('os')

const interfaces = os.networkInterfaces();
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  const ip = getNetworkAddress()
  console.log(`Example app listening on port ${port} ip: ${ip}`)
})