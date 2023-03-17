import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

/**
 * Property Tax Receipt.
 */
export const PropertyTaxReceiptSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    area: {
        type: Number,
        required: true,
        min: 0,
    },
    fiscalValue: {
        type: Number,
        required: true,
        min: 0,
    },
    periodCovered: {
        from: {
            type: Date,
            required: true,
        },
        to: {
            type: Date,
            required: true,
        },
    },
    digitalDocument: {
        type: String,
        required: true,
        default: ""
    },
}, {
    timestamps: true,
});

PropertyTaxReceiptSchema.plugin(MongooseDelete, {
    indexFields: ["deleted", "deletedAt"],
    overrideMethods: [/find/gi, /update/gi, /delete/gi],
});

PropertyTaxReceiptSchema.plugin(MongoosePaginate);

export const PropertyTaxReceiptModel = model("PropertyTaxReceipt", PropertyTaxReceiptSchema);

/**
 * Public Property Record.
 */
export const PublicPropertyRecordSchema = new Schema({
    number: {
        type: Number,
        required: true,
        min: 1,
    },
    realFolioNumber: {
        type: Number,
        required: true,
        min: 1,
    },
    date: {
        type: Date,
        required: true,
    },
    recordType: {
        type: String,
        required: true,
    },
    office: {
        type: String,
        required: true,
    },
    restrictsDomain: {
        type: Boolean,
        required: true,
        default: false,
    },
    digitalDocument: {
        type: String,
        required: true,
        default: ""
    },
}, {
    timestamps: true,
});

PublicPropertyRecordSchema.plugin(MongooseDelete, {
    indexFields: ["deleted", "deletedAt"],
    overrideMethods: [/find/gi, /update/gi, /delete/gi],
});

PublicPropertyRecordSchema.plugin(MongoosePaginate);

export const PublicPropertyRecordModel = model("PublicPropertyRecord", PublicPropertyRecordSchema);

/**
 * Public Scripture.
 */
export const PublicScriptureSchema = new Schema({
    number: {
        type: String,
        required: true,
    },
    bookVolume: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    notary: {
        state: {
            type: String,
            required: false,
        },
        number: {
            type: String,
            required: false,
        },
        fullName: {
            type: String,
            required: false,
        },
        address: {
            street: {
                type: String,
                required: false,
            },
            neighborhood: {
                type: String,
                required: false,
            },
            zipCode: {
                type: String,
                required: false,
            },
            city: {
                type: String,
                required: false,
            },
        },
    },
    publicPropertyRecords: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: PublicPropertyRecordModel,
    },
    digitalDocuments: {
        type: [String],
        required: true,
        default: [],
    },
}, {
    timestamps: true,
});

PublicScriptureSchema.plugin(MongooseDelete, {
    indexFields: ["deleted", "deletedAt"],
    overrideMethods: [/find/gi, /update/gi, /delete/gi],
});

PublicScriptureSchema.plugin(MongoosePaginate);

export const PublicScriptureModel = model("PublicScripture", PublicScriptureSchema);

/**
 * Property.
 */
export const PropertySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        neighborhood: {
            type: String,
            required: false,
        },
        zipCode: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
            default: "México",
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
            required: false,
            index: '2dsphere',
        },
    },
    fiscalRecord: {
        account: {
            type: Number,
            required: true,
            min: 1,
        },
        receipts: {
            type: [Schema.Types.ObjectId],
            required: false,
            default: [],
            ref: PropertyTaxReceiptModel,
        },
    },
    publicScripture: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: PublicScriptureModel,
    },
    pubicPropertyRecords: {
        type: [Schema.Types.ObjectId],
        required: false,
        default: [],
        ref: PublicPropertyRecordModel,
    },
    pictures: [String],
}, {
    timestamps: true,
});

PropertySchema.plugin(MongoosePaginate);

PropertySchema.plugin(MongooseDelete, { 
    indexFields: ["deleted", "deletedAt"], 
    overrideMethods: [/find/gi, /update/gi, /delete/gi] 
});

const PropertyModel = model("Property", PropertySchema);

export default PropertyModel;