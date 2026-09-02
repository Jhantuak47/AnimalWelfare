import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AuthForm from "@/components/AuthForm"

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-start justify-center px-4 pt-24 sm:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to continue to your notes.</CardDescription>
        </CardHeader>
        <AuthForm type="login" />
      </Card>
    </div>
  )
}
