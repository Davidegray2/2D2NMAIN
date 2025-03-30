"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "../button"

describe("Button Component", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole("button", { name: /click me/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("renders as disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeDisabled()
  })

  it("renders with the correct variant class", () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole("button", { name: /delete/i })
    expect(button).toHaveClass("bg-destructive")
  })

  it("renders as a link when asChild is used with an anchor", () => {
    render(
      <Button asChild>
        <a href="https://example.com">Visit Site</a>
      </Button>,
    )
    const link = screen.getByRole("link", { name: /visit site/i })
    expect(link).toHaveAttribute("href", "https://example.com")
    expect(link).toHaveClass("inline-flex")
  })
})

