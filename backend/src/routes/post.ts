import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId : string,
  }
}>();

blogRouter.use('/*',async (c,next) =>{
    const authHeader = c.req.header('authorization') || "";
    console.log(authHeader);
    const response = await verify(authHeader,c.env.JWT_SECRET);
    if(response){
        c.set("userId",response.id);
        await next();
    } else {
        c.json({
            "error" : "Unauthorised",
            "message" : "You are not logged in"
        })
    }
});

blogRouter.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userId = c.get("userId");
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    return c.text("not able to create a blog");
  }
});

blogRouter.put("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();

    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
    return c.text("not able to update the blog");
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param('id');
    const blog = await prisma.post.findFirst({
        where : {id : id},
    })
    if(!blog){
        return c.json({
            "error" : "Blog not found",
            "message" : `The blog with ${id} does not exist`,
        },404);
    }
    return c.json(blog);
  } catch (error) {
    console.log(error);
    return c.text("cannot find the blog",500);
  }
});

blogRouter.get("/bulk", async (c) => {});
