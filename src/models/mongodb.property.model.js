import { Schema, model } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

export const PropertySchema = new Schema({
    name: {},
    address: {
        street: {},
        neighborhood: {},
        zipCode: {},
        city: {},
        state: {},
        country: {},
    },
    propertyTax: {
        account: {},
        fiscalValue: {},
        registeredArea: {},
        receipts: [String],
    },
    aquisition: {
        date: {},
        number: {},
        bookVolume: {},
        pubicRegistry: {
            number: {},
            folioReal: {},
            office: {}
        },
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