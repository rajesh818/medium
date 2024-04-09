import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();


app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      }
    });
		if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "not able to find the user" });
	}
})

// database url
// postgres://avnadmin:AVNS_W461pJgBM0TOLsIhuwV@postgres-ambatigururajesh818-c2af.b.aivencloud.com:23340/defaultdb?sslmode=require
// pool url
// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjJmZjBiYTEtMDRiMS00OWUwLWFhY2QtNDViYjIxOGU2NTRiIiwidGVuYW50X2lkIjoiNjc3OWRmN2Q5N2E4MzNjNmQyZWEwNDM1MTlmOTBiYzQ0NTU3ZDEwN2RlODk3ZTZiMWUwMDRmOWIzNTE1Y2EzZCIsImludGVybmFsX3NlY3JldCI6ImM5YWM3ZWNjLTQ2ZmEtNDEzZS04ZGI1LTQxM2U0YmNkOWZlOSJ9.Yg7_nt01LsF63JMNuuNZOhaXOSRWHy9rYj0cw2ahX-w"




export default app
