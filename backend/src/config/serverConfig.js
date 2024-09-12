import dotenv from 'dotenv'

dotenv.config()

export default {
    port : process.env.PORT || 9000,
    db : process.env.MONGO_DB_URL,
    jwt_key : process.env.JWT_SECRET_KEY || ''
}