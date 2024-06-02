import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("https://api.example.com/user", ({ request }) => {
		console.log("mocked");
		return HttpResponse.json({
			title: "Lord of the Rings",
			imageUrl: "/book-cover.jpg",
			description:
				"The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
		});
	}),
];
