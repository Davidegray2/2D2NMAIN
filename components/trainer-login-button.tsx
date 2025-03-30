import Link from "next/link"
import { Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TrainerLoginButton() {
  return (
    <Link href="/trainer/login" passHref>
      <Button variant="outline" size="sm" className="hidden md:flex">
        <Briefcase className="mr-2 h-4 w-4" />
        Trainer Login
      </Button>
    </Link>
  )
}

