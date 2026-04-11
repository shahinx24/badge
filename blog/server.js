import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_PATH = path.join(__dirname, 'db.json')
const PORT = Number(process.env.PORT) || 3001

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  })
  response.end(JSON.stringify(data))
}

async function readDb() {
  const raw = await readFile(DB_PATH, 'utf8')
  return JSON.parse(raw)
}

async function writeDb(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

async function parseBody(request) {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(chunk)
  }

  if (chunks.length === 0) {
    return {}
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function notFound(response) {
  sendJson(response, 404, { message: 'Not found' })
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    response.end()
    return
  }

  try {
    if (request.method === 'POST' && url.pathname === '/api/login') {
      const { username = '', password = '' } = await parseBody(request)
      const db = await readDb()
      const user = db.users.find(
        (item) => item.name === username.trim() && item.password === password
      )

      if (!user) {
        sendJson(response, 401, { message: 'Invalid username or password.' })
        return
      }

      sendJson(response, 200, { id: user.id, name: user.name })
      return
    }

    if (request.method === 'GET' && url.pathname === '/api/blogs') {
      const author = url.searchParams.get('author')
      const db = await readDb()
      const blogs = author
        ? db.blogs.filter((blog) => blog.author === author)
        : db.blogs

      sendJson(response, 200, blogs)
      return
    }

    if (request.method === 'POST' && url.pathname === '/api/blogs') {
      const { title = '', excerpt = '', content = '', author = '' } = await parseBody(request)
      const db = await readDb()
      const user = db.users.find((item) => item.name === author)

      if (!user) {
        sendJson(response, 403, { message: 'User is not allowed to create blogs.' })
        return
      }

      const blog = {
        id: Date.now(),
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        author,
        createdAt: new Date().toISOString(),
      }

      db.blogs = [blog, ...db.blogs]
      await writeDb(db)
      sendJson(response, 201, blog)
      return
    }

    if (request.method === 'DELETE' && url.pathname.startsWith('/api/blogs/')) {
      const blogId = Number(url.pathname.split('/').pop())
      const author = url.searchParams.get('author')
      const db = await readDb()
      const blog = db.blogs.find((item) => item.id === blogId)

      if (!blog) {
        sendJson(response, 404, { message: 'Blog not found.' })
        return
      }

      if (!author || blog.author !== author) {
        sendJson(response, 403, { message: 'You can only delete your own blogs.' })
        return
      }

      db.blogs = db.blogs.filter((item) => item.id !== blogId)
      await writeDb(db)
      sendJson(response, 200, { message: 'Blog deleted.' })
      return
    }

    notFound(response)
  } catch (error) {
    sendJson(response, 500, {
      message: 'Server error',
      detail: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
