import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AuthForm from "@/components/AuthForm"

export default function SignUpPage() {
  return (
    <div className="flex flex-1 items-start justify-center px-4 pt-24 sm:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account and enjoy our services!</CardDescription>
        </CardHeader>
        <AuthForm type="signup" />
      </Card>
    </div>
  )
}
