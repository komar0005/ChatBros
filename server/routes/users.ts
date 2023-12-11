import { FastifyInstance } from "fastify";
import { StreamChat } from 'stream-chat'

require('dotenv').config();

const streamChat = StreamChat.getInstance(process.env.STREAM_API_KEY!, process.env.STREAM_API_PRIVET!)

const TOKEN_USER_ID_MAP = new Map<string, string>()

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post<{Body: {id: string; name: string; image?: string}}>('/signup', async (req, res) => {
    const {id, name, image} = req.body

    if(id == null || id === "" || name == null || name === "") {
      return res.status(400).send
    }
    const existingUser = await streamChat.queryUsers({id})
    if(existingUser.users.length > 0) {
      return res.status(400).send('ID is taken')
    }
    await streamChat.upsertUser({id, name, image})
  })

  fastify.post<{Body: {id: string; name: string; image?: string}}>('/login', async (req, res) => {
    const {id} = req.body

    if(id == null || id === "") {
      return res.status(400).send
    }
    const {users: [ user ]} = await streamChat.queryUsers({id})
    if(user == null) {
      return res.status(401).send
    }
    const token = streamChat.createToken(id)
    TOKEN_USER_ID_MAP.set(token, user.id)
    return {token: token, user: {name: user.name, id: user.id, image: user.image}}
  })
  fastify.post<{Body: {token: string}}>('/logout', async (req, res) => {
    const token = req.body.token;

    if (token == null || token === '') {
      return res.status(400).send({ error: 'Token is required' });
    }

    const id = TOKEN_USER_ID_MAP.get(token);

    if (id == null) {
      return res.status(400).send({ error: 'Invalid token' });
    }

    try {
      await streamChat.revokeUserToken(id, new Date());
      TOKEN_USER_ID_MAP.delete(token);

      return res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).send({ error: 'Internal server error during logout' });
    }
  });

}