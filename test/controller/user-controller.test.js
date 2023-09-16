import supertest from "supertest";
import { web } from "../../src/application/web.js";
import { removeUser, createUser } from "../util/util.test.js";

describe("POST /api/users", () => {
  afterAll(async () => {
    await removeUser();
  });

  it("should register success", async () => {
    const result = await supertest(web).post("/api/users/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should register failure", async () => {
    const result = await supertest(web).post("/api/users/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBe("User already exists");
  });
});

describe("POST /api/users/login", () => {
  beforeAll(async () => {
    await supertest(web).post("/api/users/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
    });
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should login success", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "rahasia",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
  });

  it("should login failure", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "sukabumi",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBe("Incorrect username or password");
  });
});

describe("GET /api/users/current", () => {
  beforeAll(async () => {
    await createUser();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should get user success", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should get user failure", async () => {
    const result = await supertest(web).get("/api/users/current");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Unauthorized");
  });
});

describe("PATCH /api/users/current", () => {
  beforeAll(async () => {
    await createUser();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should success update", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .send({
        name: "tests",
        password: "secret",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("tests");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should failure update", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .send({
        name: "tests",
        password: "secret",
      })
      .set("Authorization", "failure");

    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/users/logout", () => {
  beforeAll(async () => {
    await createUser();
  });

  afterAll(async () => {
    await removeUser();
  });

  it("should success logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Ok");
  });

  it("should failure logout", async () => {
    const result = await supertest(web).delete("/api/users/logout");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Unauthorized");
  });
});
