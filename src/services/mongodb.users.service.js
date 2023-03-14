import UserModel from "../models/mongodb.users.model.js";

export const getAllUsers = async (query, options) => {
    try {
        return await UserModel.paginate(query, options);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserById = async (userId) => {
    try {
        return await UserModel.findById(userId);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createUser = async (data) => {
    try {
        return await UserModel.create(data);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUser = async (userId, data) => {
    try {
        return await UserModel.findByIdAndUpdate(userId, data, { new: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteUser = async (userId) => {
    try {
        return await UserModel.deleteOne({ _id: userId });
    } catch (error) {
        throw new Error(error.message);
    }
}
