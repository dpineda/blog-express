const express = require('express')
const app = express()
const os = require('os')
const fs = require('fs')

const interfaces = os.networkInterfaces();
let ip;
const port = 3000;

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
  // initialize node.json as current node since we don't know the state of all other hosts on the network yet. 
  ip = String(getNetworkAddress()); 
  const currentDate = new Date()

  // default metadata: hostname + os type (windows / mac / linux)
  const platform = os.type() === "Darwin" ? "MacOs" : os.type()
  const defaultName = os.hostname() + "---" + platform
  fs.writeFileSync("nodes.json", JSON.stringify({
    "nodes" : [{ "ip" : ip + ":" + port, "metadata" : defaultName, "creationDate": currentDate }]
  }))

} catch (err) {
  console.log(err) 
  exit(1); 
}



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port} ip: ${ip}`)
})