import PropertyModel from "../models/mongodb.property.model.js";

export const getAllProperties = async (query, options) => {};

export const getPropertyById = async (propertyId) => {};

export const getPubicScriptureByPropertyId = async (propertyId) => {};

export const getPropertyTaxReceiptsByPropertyId = async (propertyId) => {};

export const getPublicPropertyRecordsByPropertyId = async (propertyId) => {};

export const createProperty = async (data) => {};

export const addPropertysTaxReceipt = async (propertyId, data) => {};

export const addPropertysScripture = async (propertyId, data) => {};

export const addPropertysPictures = async (propertyId, data) => {};

export const updateProperty = async (propertyId, data) => {};

export const updatePropertysPublicScripture = async (propertyId, data) => {};

export const updatePropertysTaxReceipt = async (propertyId, data) => {};

export const updatePropertysPublicRecord = async (propertyId, data) => {};
