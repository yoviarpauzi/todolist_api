import { web } from "../../src/application/web.js";
import supertest from "supertest";
import {
  createUser,
  createContact,
  createAddress,
  removeUser,
} from "../util/util.test.js";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeAll(async () => {
    await createUser();
    await createContact();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should success create address", async () => {
    const result = await supertest(web)
      .post("/api/contacts/1/addresses")
      .set("Authorization", "test")
      .send({
        country: "indonesia",
        postal_code: "43367",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("43367");
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeAll(async () => {
    await createUser();
    await createContact();
    await createAddress();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should success update address", async () => {
    const result = await supertest(web)
      .put("/api/contacts/1/addresses/1")
      .set("Authorization", "test")
      .send({
        country: "indonesia",
        postal_code: "test",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("43367");
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
  beforeAll(async () => {
    await createUser();
    await createContact();
    await createAddress();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should be success get contact", async () => {
    const result = await supertest(web)
      .get("/api/contacts/1/addresses/1")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(1);
    expect(result.body.data.street).toBe("test");
    expect(result.body.data.city).toBe("test");
    expect(result.body.data.province).toBe("test");
    expect(result.body.data.country).toBe("test");
    expect(result.body.data.postal_code).toBe("12345");
  });
});

describe("GET /api/contacts/:contactId/addresses", () => {
  beforeAll(async () => {
    await createUser();
    await createContact();
    await createAddress();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should be success list", async () => {
    const result = await supertest(web)
      .get("/api/contacts/1/addresses")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
  beforeAll(async () => {
    await createUser();
    await createContact();
    await createAddress();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should be success delete address", async () => {
    const result = await supertest(web)
      .delete("/api/contacts/1/addresses/1")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
  });
});
