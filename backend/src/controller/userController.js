import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "../models/userModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, "Users fetch successfully", users);
    } catch (err) {
        next(err);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        handleResponse(res, 200, "User fetch successfully", user);
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await createUserService(name, email, password);
        handleResponse(res, 201, "User created successfully", user);
    } catch(err){
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const user = await updateUserService(req.params.id, name, email);
        handleResponse(res, 201, "User updated successfully", user);
    } catch(err){
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await deleteUserService(req.params.id);
        handleResponse(res, 201, "User deleted successfully", user);
    } catch(err){
        next(err);
    }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser}