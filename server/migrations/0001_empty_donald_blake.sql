CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text,
	"title" text NOT NULL,
	"price" real NOT NULL,
	"created" timestamp DEFAULT now()
);
