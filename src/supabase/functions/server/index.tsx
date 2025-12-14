// @ts-nocheck
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { mockRestaurants, mockReservations } from "./mockData.ts";

declare const Deno: any;

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f6b7100b/health", (c) => {
  return c.json({ status: "ok" });
});

// GET Restaurants
app.get("/make-server-f6b7100b/restaurants", async (c) => {
  try {
    let restaurants = await kv.getByPrefix("restaurant:");
    
    if (restaurants.length === 0) {
      // Seed data
      const keys = mockRestaurants.map(r => `restaurant:${r.id}`);
      const values = mockRestaurants;
      await kv.mset(keys, values);
      restaurants = values;
      console.log("Seeded restaurants");
    }
    
    // Ensure restaurants are sorted by ID or something stable if needed, but for now just return
    return c.json(restaurants);
  } catch (e) {
    console.error("Error fetching restaurants:", e);
    return c.json({ error: e.message }, 500);
  }
});

// GET Reservations
app.get("/make-server-f6b7100b/reservations", async (c) => {
  try {
    let reservations = await kv.getByPrefix("reservation:");
    
    if (reservations.length === 0) {
      // Seed data
      const keys = mockReservations.map(r => `reservation:${r.id}`);
      const values = mockReservations;
      await kv.mset(keys, values);
      reservations = values;
      console.log("Seeded reservations");
    }
    
    return c.json(reservations);
  } catch (e) {
    console.error("Error fetching reservations:", e);
    return c.json({ error: e.message }, 500);
  }
});

// POST Reservation
app.post("/make-server-f6b7100b/reservations", async (c) => {
  try {
    const reservation = await c.req.json();
    if (!reservation.id) {
        return c.json({ error: "Reservation ID is required" }, 400);
    }
    await kv.set(`reservation:${reservation.id}`, reservation);
    return c.json({ success: true, reservation });
  } catch (e) {
    console.error("Error creating reservation:", e);
    return c.json({ error: e.message }, 500);
  }
});

// GET Favorites
app.get("/make-server-f6b7100b/favorites/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const favorites = await kv.get(`favorites:${userId}`);
    return c.json(favorites || []);
  } catch (e) {
    console.error("Error fetching favorites:", e);
    return c.json({ error: e.message }, 500);
  }
});

// POST Favorites
app.post("/make-server-f6b7100b/favorites/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const favorites = await c.req.json(); // Expecting array of strings
    await kv.set(`favorites:${userId}`, favorites);
    return c.json({ success: true, favorites });
  } catch (e) {
    console.error("Error saving favorites:", e);
    return c.json({ error: e.message }, 500);
  }
});

Deno.serve(app.fetch);