import { LoginForm } from "@/app/components/auth/login-form"
import { auth } from "@/server/auth"

export default async function Login() {
  return <LoginForm />
}