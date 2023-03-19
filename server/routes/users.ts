import { FastifyInstance } from "fastify";
import { StreamChat } from "stream-chat";

type UserBody = {
  id: string;
  name: string;
  image?: string;
};

const streamChat = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

const TOKEN_USER_ID_MAP = new Map<string, string>();

export default async function (app: FastifyInstance) {
  app.post<{ Body: UserBody }>("/signup", async (req, res) => {
    const { id, name, image } = req.body;

    if (!id || !name) {
      return res.status(400).send({ message: "Bad request" });
    }

    // Check if user already exists
    const existingUsers = await streamChat.queryUsers({ id });
    if (existingUsers.users.length > 0) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Create a brand new user
    await streamChat.upsertUser({
      id,
      name,
      image,
    });
  });

  app.post<{ Body: Pick<UserBody, "id"> }>("/login", async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).send({ message: "Bad request" });
    }

    const {
      users: [user],
    } = await streamChat.queryUsers({ id });
    if (!user) {
      return res.status(401).send();
    }

    const token = streamChat.createToken(id);
    TOKEN_USER_ID_MAP.set(token, id);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    };
  });

  app.post<{ Body: { token: string } }>("/logout", async (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).send({ message: "Bad request" });
    }

    const userId = TOKEN_USER_ID_MAP.get(token);

    if (!userId) {
      return res.status(400).send();
    }

    await streamChat.revokeUserToken(userId, new Date());

    TOKEN_USER_ID_MAP.delete(token);
  });
}
