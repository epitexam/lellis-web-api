import Elysia from "elysia";

export const indexRoutes = (app: Elysia) =>
	app.group("/", (group) =>
		group.get("/", async () => {
			return "Hello Elysia";
		})
	);