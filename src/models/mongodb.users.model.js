import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    veryfiedEmail: {
        type: Boolean,
        required: true,
        default: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
    initials: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: true,
        enum: ["female", "male", "other", "not specified"],
        default: "not specified",
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    roles: {
        type: [String],
        required: true,
        default: [],
    },
    mugshot: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

UserSchema.plugin(mongoosePaginate);

UserSchema.plugin(MongooseDelete, {
    indexFields: ["deleted", "deletedAt", "deletedBy"],
    overrideMethods: [/find/gi, /update/gi, /delete/gi],
});

const UserModel = model("User", UserSchema);

export default UserModel;
