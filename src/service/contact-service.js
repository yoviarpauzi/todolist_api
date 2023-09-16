import { validate } from "../validation/validation.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const { value } = validate(createContactValidation, request.body);
  value.username = request.user;

  return await prismaClient.contact.create({
    data: value,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const get = async (request) => {
  const { value } = validate(getContactValidation, request.id);

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: value,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  return contact;
};

const update = async (request) => {
  const { value } = validate(updateContactValidation, request.body);
  const id = parseInt(request.params.id);

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: id,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  return await prismaClient.contact.update({
    where: {
      id: id,
    },
    data: value,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (request) => {
  const id = parseInt(request.params.id);

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: id,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  return await prismaClient.contact.delete({
    where: {
      id: id,
    },
  });
};

const search = async (request) => {
  const { value } = validate(searchContactValidation, request.body);
  const skip = (value.page - 1) * value.size;
  const filter = [];

  filter.push({
    username: request.user,
  });

  if (value.name) {
    filter.push({
      OR: [
        {
          first_name: {
            contains: value.name,
          },
        },
        {
          last_name: {
            contains: value.name,
          },
        },
      ],
    });
  }

  if (value.email) {
    filter.push({
      email: {
        contains: value.email,
      },
    });
  }

  if (value.phone) {
    filter.push({
      phone: {
        contains: value.phone,
      },
    });
  }

  const contact = await prismaClient.contact.findMany({
    where: {
      AND: filter,
    },
    take: value.size,
    skip: skip,
  });

  const total = await prismaClient.contact.count({
    where: {
      AND: filter,
    },
  });

  return {
    contact,
    paging: {
      page: value.page,
      total_item: total,
      total_page: Math.ceil(total / value.size),
    },
  };
};

export default { create, get, update, remove, search };
