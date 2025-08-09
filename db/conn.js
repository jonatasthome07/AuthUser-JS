import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv"
dotenv.config()

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error)
    }
}
main()
export default mongoose