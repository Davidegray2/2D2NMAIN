import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dumbbell, Users, Trophy } from "lucide-react"

export default function ChallengeCreator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-primary" />
          Create a Challenge
        </CardTitle>
        <CardDescription>Challenge others to prove your strength</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exercise">Exercise Type</Label>
            <Select defaultValue="pushups">
              <SelectTrigger>
                <SelectValue placeholder="Select exercise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pushups">Push-ups</SelectItem>
                <SelectItem value="pullups">Pull-ups</SelectItem>
                <SelectItem value="squats">Squats</SelectItem>
                <SelectItem value="burpees">Burpees</SelectItem>
                <SelectItem value="plank">Plank Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (seconds)</Label>
            <Input id="duration" type="number" defaultValue="60" min="10" max="300" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="points">Points to Wager</Label>
            <Input id="points" type="number" defaultValue="50" min="10" max="1000" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" type="button">
              <Users className="mr-2 h-4 w-4" />
              Challenge Friend
            </Button>
            <Button type="submit">
              <Dumbbell className="mr-2 h-4 w-4" />
              Create Battle
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

