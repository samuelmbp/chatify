import { FastifyInstance } from "fastify";
import { StreamChat } from "stream-chat";

const streamChat = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_PRVATE_API_KEY!
);

export async function userRoutes(app: FastifyInstance) {
  app.post<{ Body: { id: string; name: string; image?: string } }>(
    "/signup",
    async (req, res) => {
      const { id, name, image } = req.body;
      if (id === null || id === "" || name === null || name === "") {
        return res.status(400).send();
      }

      // TODO: Check for existing users
      const existingUsers = await streamChat.queryUsers({ id });
      console.log(existingUsers.users);
      if (existingUsers.users.length > 0) {
        return res.status(400).send("User ID is already taken.");
      }

      // Create a new user
      streamChat.upsertUser({ id, name, image });
    }
  );

  app.post<{ Body: { id: string } }>("/login", async (req, res) => {
    const { id } = req.body;
    if (id === null || id === "") {
      return res.status(400).send();
    }

    // Gets the first user
    const {
      users: [user],
    } = await streamChat.queryUsers({ id });

    if (user === null) return res.status(401).send();

    const token = streamChat.createToken(id);
    return {
      token,
      user: { name: user.name, id: user.id, image: user.image },
    };
  });
}
