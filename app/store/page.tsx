import { Button } from "@/components/ui/button"

export default function StorePage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
        <h1 className="text-4xl font-bold tracking-tight mb-4">2D2N Merchandise Store</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Our exclusive fitness apparel and equipment collection is coming soon. Be the first to know when we launch!
        </p>

        <div className="w-full max-w-md mb-10">
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-muted-foreground">
              Sign up to be notified when our store launches and receive exclusive early access offers.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Notify Me</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Premium Apparel</h3>
            <p className="text-sm text-muted-foreground text-center">
              High-quality workout clothing designed for performance and comfort
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Fitness Equipment</h3>
            <p className="text-sm text-muted-foreground text-center">
              Essential tools to maximize your workouts at home or on the go
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M6 19v-3" />
                <path d="M10 19v-3" />
                <path d="M14 19v-3" />
                <path d="M18 19v-3" />
                <path d="M8 11V9" />
                <path d="M16 11V9" />
                <path d="M12 11V9" />
                <path d="M2 15h20" />
                <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Supplements</h3>
            <p className="text-sm text-muted-foreground text-center">
              Quality nutritional products to support your fitness goals
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

