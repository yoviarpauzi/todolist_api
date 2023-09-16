import { validate } from "../validation/validation.js";
import { addressValidation } from "../validation/address-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const { value } = validate(addressValidation, request.body);
  const contactId = parseInt(request.params.contactId);
  value.contact_id = contactId;

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  return await prismaClient.address.create({
    data: value,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const update = async (request) => {
  const { value } = validate(addressValidation, request.body);
  const contactId = parseInt(request.params.contactId);
  const addressId = parseInt(request.params.addressId);

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  const address = await prismaClient.address.findUnique({
    where: {
      id: addressId,
    },
  });

  if (!address) {
    throw new ResponseError(404, "Address not found");
  }

  return await prismaClient.address.update({
    where: {
      id: addressId,
    },
    data: value,
    select: {
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const get = async (request) => {
  const contactId = parseInt(request.params.contactId);
  const addressId = parseInt(request.params.addressId);

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  const address = await prismaClient.address.findUnique({
    where: {
      id: addressId,
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) {
    throw new ResponseError(404, "Address not found");
  }

  return address;
};

const list = async (request) => {
  const contactId = parseInt(request.params.contactId);

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  return await prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const remove = async (request) => {
  const contactId = parseInt(request.params.contactId);
  const addressId = parseInt(request.params.addressId);

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  const address = await prismaClient.address.findUnique({
    where: {
      id: addressId,
    },
  });

  if (!address) {
    throw new ResponseError(404, "Address not found");
  }

  return await prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};
export default { create, update, get, list, remove };
