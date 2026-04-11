import users from '../data/users.json'

export function validateUser(username, password) {
  return (
    users.find(
      (item) => item.name === username.trim() && item.password === password
    ) ?? null
  )
}

export { users }
