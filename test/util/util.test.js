import { prismaClient } from "../../src/application/database";

const createUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: "rahasia",
      name: "test",
      token: "test",
    },
  });
};

const removeUser = async () => {
  await prismaClient.user.delete({
    where: {
      username: "test",
    },
  });
};

const createContact = async () => {
  await prismaClient.contact.create({
    data: {
      id: 1,
      first_name: "test",
      email: "test@gmail.com",
      phone: "082341234234",
      username: "test",
    },
  });
};

const createAddress = async () => {
  await prismaClient.address.create({
    data: {
      id: 1,
      street: "test",
      city: "test",
      province: "test",
      country: "test",
      postal_code: "12345",
      contact_id: 1,
    },
  });
};

export { createUser, removeUser, createContact, createAddress };
