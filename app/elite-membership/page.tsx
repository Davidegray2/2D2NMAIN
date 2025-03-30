import { EliteProfile } from "@/components/elite-profile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User } from "lucide-react"

export default function EliteMembershipPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-2">Elite Membership</h1>
      <p className="text-muted-foreground mb-6">Experience the exclusive features of your elite membership</p>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            My Elite Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <EliteProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}

