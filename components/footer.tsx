import Link from "next/link"
import { Logo } from "@/components/logo"
import { Facebook, Instagram, X, Youtube, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Logo variant="full" />
            <p className="text-sm text-muted-foreground max-w-xs">
              The ultimate fitness community for serious athletes and fitness enthusiasts. Train hard, compete, and
              transform together.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com/2nd2nonefitness" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com/2nd2nonefitness"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://x.com/2nd2nonefitness" className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link href="https://youtube.com/2nd2nonefitness" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="https://linkedin.com/company/2nd2nonefitness"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-2 lg:col-span-3">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="text-muted-foreground hover:text-foreground">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Membership</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/membership-selection" className="text-muted-foreground hover:text-foreground">
                    Plans
                  </Link>
                </li>
                <li>
                  <Link href="/premium" className="text-muted-foreground hover:text-foreground">
                    Premium Features
                  </Link>
                </li>
                <li>
                  <Link href="/elite-membership" className="text-muted-foreground hover:text-foreground">
                    Elite Membership
                  </Link>
                </li>
                <li>
                  <Link href="/trainers" className="text-muted-foreground hover:text-foreground">
                    Personal Trainers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/legal" className="text-muted-foreground hover:text-foreground">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-muted-foreground hover:text-foreground">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 2ND2NONE Fitness. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link href="/legal" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal" className="text-xs text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/legal" className="text-xs text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

