import { describe, it, expect } from "bun:test";
import { app } from "../src/index";

describe("Elysia App", () => {
    it("should return 'Hello Elysia' on GET /", async () => {
        const response = await app.handle(new Request("http://localhost/"));
        const text = await response.text();
        expect(text).toBe("Hello Elysia");
    });

    it("should return status 200", async () => {
        const response = await app.handle(new Request("http://localhost/"));
        expect(response.status).toBe(200);
    });
});
