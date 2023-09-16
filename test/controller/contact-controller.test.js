import { web } from "../../src/application/web.js";
import supertest from "supertest";
import { createContact, createUser, removeUser } from "../util/util.test.js";

describe("POST /api/contacts", () => {
  beforeAll(async () => {
    await createUser();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should success create contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@gmail.com",
        phone: "123456789010",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("123456789010");
  });
});

describe("GET /api/contacts/:id", () => {
  beforeAll(async () => {
    await createUser();
    await createContact();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should success get contact", async () => {
    const result = await supertest(web)
      .get("/api/contacts/1")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(1);
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBeNull();
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("082341234234");
  });
});

describe("PUT /api/contacts/:id", () => {
  beforeAll(async () => {
    await createUser();
    await createContact();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should success update contact", async () => {
    const result = await supertest(web)
      .put("/api/contacts/1")
      .set("Authorization", "test")
      .send({
        id: 1,
        first_name: "tests",
        email: "test1@gmail.com",
        phone: "082341234235",
        username: "test",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(1);
    expect(result.body.data.first_name).toBe("tests");
    expect(result.body.data.last_name).toBeNull();
    expect(result.body.data.email).toBe("test1@gmail.com");
    expect(result.body.data.phone).toBe("082341234235");
  });
});

describe("DELETE /api/contacts/:id", () => {
  beforeAll(async () => {
    await createUser();
    await createContact();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should success remove contact", async () => {
    const result = await supertest(web)
      .delete("/api/contacts/1")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Ok");
  });
});

describe("GET /api/contacts", () => {
  beforeAll(async () => {
    await createUser();
    await createContact();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should success get all contact from users", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test")
      .send({
        page: 1,
        size: 2,
        name: "test",
      });

    expect(result.status).toBe(200);
  });
});
