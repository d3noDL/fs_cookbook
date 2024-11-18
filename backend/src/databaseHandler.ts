import { DB } from "https://deno.land/x/sqlite/mod.ts";
import type { Recipe, User } from "./globals.ts";

// Open a database
const db = new DB("./database.db");

db.execute(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL)",
);

// Close connection
db.close();

export function addUser(user: User) {
  db.query(
    "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
    [
      user.username,
      user.password,
    ],
  );
}

export function addRecipe(recipe: Recipe) {
  db.query(
    "INSERT OR IGNORE INTO recipes (title, subtitle, description, ingredients{}, steps{})",
    [
      recipe.title,
      recipe.subtitle,
      recipe.description,
      recipe.ingredients,
      recipe.steps,
    ],
  );
}
