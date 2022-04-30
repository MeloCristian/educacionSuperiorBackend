const { parsed } = require('dotenv').config()
const crypto = require('crypto')
const fs = require('fs')
const chalk = require('chalk')
parsed.JWT_SECRET = crypto.randomBytes(32).toString('hex')
parsed.AES_KEY = crypto.randomBytes(32).toString('hex')
let result = ''
for (const key of Object.keys(parsed)) {
  result += `${key}=${parsed[key]}\n`
}
fs.writeFile('.env', result, err => {
  if (err) {
    console.error(err)
    console.error(chalk.red("Couldn't generate keys"))
    return
  }
  console.log(chalk.green('Keys generated successfully'))
})