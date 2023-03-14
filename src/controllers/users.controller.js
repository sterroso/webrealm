import * as UsersService from "../services/mongodb.users.service.js";
import * as Constants from "../config/app.constans.js";

const isValidIntParam = (param, includesZero = false) => {
    const numParam = Number(param ?? 0);

    return !isNaN(numParam) && numParam > (includesZero ? -1 : 0) && numParam % 1 === 0;
}

export const getAllUsers = async (req, res) => {
    let returnObject = {};
    let returnStatus = Constants.Status200.OK.code;

    const { 
        limit = 10, 
        page = 1, 
        offset = 0, 
        email, 
        sortByFirstName, 
        sortByLastName 
    } = req.query;

    const query = {};

    const options = {};

    if (isValidIntParam(limit)) {
        options.customLabels = Constants.PaginateCustomLabels;

        options.limit = Number(limit);

        options.page = isValidIntParam(page) ? Number(page) : 1;

        if (isValidIntParam(offset, true)) {
            options.offset = Number(offset);
        }
    } else {
        options.pagination = false;
        options.customLabels = Constants.PaginateNoLabels;
    }

    if (["asc", "desc"].includes(sortByFirstName)) {
        options.sort = { firstName: sortByFirstName === "asc" ? 1 : -1 };
    }

    if (["asc", "desc"].includes(sortByLastName)) {
        if (options.sort) {
            options.sort.lastName = sortByLastName === "asc" ? 1 : -1;
        } else {
            options.sort = { lastName: sortByLastName === "asc" ? 1 : -1 };
        }
    }

    if (email) {
        query.email = email;
    }

    try {
        const allUsers = await UsersService.getAllUsers(query, options);

        if (allUsers?.results?.length) {
            returnObject = allUsers;
            returnObject.status = Constants.Status200.OK.name;
        } else {
            returnStatus = Constants.Status400.NOT_FOUND.code;

            returnObject.status = Constants.Status400.NOT_FOUND.name;
            returnObject.message = "No users were found with the specified parameters.";
        }
    } catch (error) {
        returnStatus = Constants.Status500.INTERNAL_SERVER_ERROR.code;
        
        returnObject.status = Constants.Status500.INTERNAL_SERVER_ERROR.name;
        returnObject.error = error.message;
    }

    res.status(returnStatus).json(returnObject);
};

export const getUserById = async (req, res) => {
    const returnObject = {};
    let returnStatus = Constants.Status200.OK.code;

    const { userId } = req.params;

    try {
        const user = await UsersService.getUserById(userId);

        if (user) {
            returnObject.status = Constants.Status200.OK.name;
            returnObject.results = user;
        } else {
            returnStatus = Constants.Status400.NOT_FOUND.code;

            returnObject.status = Constants.Status400.NOT_FOUND.name;
            returnObject.message = "No user found with the specified id.";
        }
    } catch (error) {
        returnStatus = Constants.Status500.INTERNAL_SERVER_ERROR.code;
        
        returnObject.status = Constants.Status500.INTERNAL_SERVER_ERROR.name;
        returnObject.error = error.message;
    }

    res.status(returnStatus).json(returnObject);
};

export const createUser = async (req, res) => {
    const returnObject = {};
    let returnStatus = Constants.Status200.CREATED.code;

    const { body: data } = req;

    try {
        const newUser = await UsersService.createUser(data);

        if (newUser) {
            returnObject.status = Constants.Status200.CREATED.name;
            returnObject.results = newUser;
        } else {
            returnStatus = Constants.Status500.INTERNAL_SERVER_ERROR.code;

            returnObject.status = Constants.Status500.INTERNAL_SERVER_ERROR.name;
            returnObject.message = "User could not be created."
        }
    } catch (error) {
        returnStatus = Constants.Status500.INTERNAL_SERVER_ERROR.code;
        
        returnObject.status = Constants.Status500.INTERNAL_SERVER_ERROR.name;
        returnObject.error = error.message;
    }

    res.status(returnStatus).json(returnObject);
};

export const updateUser = async (req, res) => {
    const returnObject = {};
    let returnStatus = Constants.Status200.OK.code;

    const { userId } = req.params;

    const { body: data } = req;

    try {
        const updatedUser = await UsersService.updateUser(userId, data);

        if (updatedUser) {
            returnObject.status = Constants.Status200.OK.name;
            returnObject.results = updatedUser;
        } else {
            returnStatus = Constants.Status500.INTERNAL_SERVER_ERROR.code;

            returnObject.status = Constants.Status500.INTERNAL_SERVER_ERROR.name;
            returnObject.message = "User could not be updated.";
        }
    } catch (error) {
        returnStatus = Constants.Status500.INTERNAL_SERVER_ERROR.code;
        
        returnObject.status = Constants.Status500.INTERNAL_SERVER_ERROR.name;
        returnObject.error = error.message;
    }

    res.status(returnStatus).json(returnObject);
};

export const deleteUser = async (req, res) => {
    const returnObject = {};
    let returnStatus = Constants.Status200.OK.code;

    const { userId } = req.params;

    try {
        const deleted = await UsersService.deleteUser(userId);

        if (deleted) {
            returnObject.status = Constants.Status200.OK.name;
            returnObject.results = deleted;
        } else {
            returnStatus = Constants.Status500.INTERNAL_SERVER_ERROR.code;

            returnObject.status = Constants.Status500.INTERNAL_SERVER_ERROR.name;
            returnObject.message = "User could not be deleted.";
        }
    } catch (error) {
        returnStatus = Constants.Status500.INTERNAL_SERVER_ERROR.code;
        
        returnObject.status = Constants.Status500.INTERNAL_SERVER_ERROR.name;
        returnObject.error = error.message;
    }

    res.status(returnStatus).json(returnObject);
};
