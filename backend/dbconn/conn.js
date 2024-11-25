import mongoose from "mongoose";

const connectdb = async (req, res) => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/blogApp`).then(() => {
            console.log(`Connected to the database`)
        })

    } catch (error) {
        console.log(error)
    }
}
export default connectdb;