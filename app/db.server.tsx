// db.js
import postgres from 'postgres'

const sql = postgres('postgres://app_user:app_pass@localhost:5432/blog') // will use psql environment variables

export default sql