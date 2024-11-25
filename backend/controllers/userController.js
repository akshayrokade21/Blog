import { User } from "../models/userSchema.js";

export const getallUser = async (req, res) => {
    try {
        const data = await User.find({})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
}
export const getUserbyid = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findById({ _id: id })
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findByIdAndDelete({ _id: id })
        res.status(200).send({
            message: "User deleted successfully",
            data
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const responce = await User.findByIdAndUpdate({ _id: id }, { $set: data })
        res.status(200).send({
            message: "User updated successfully",
            responce
        })
    } catch (error) {
        console.log(error)
    }
}