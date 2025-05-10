"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <div className="w-full max-w-md">
          {/* SVG Illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            fill="none"
            className="mb-8"
          >
            {/* Background Gears */}
            <circle cx="400" cy="300" r="280" fill="#f5f5f5" opacity="0.5" />
            <path d="M150,300 A150,150 0 0,1 300,150 A150,150 0 0,1 450,300 A150,150 0 0,1 300,450 A150,150 0 0,1 150,300 Z" fill="#f0f0f0" opacity="0.7" />
            <path d="M500,200 A100,100 0 0,1 600,100 A100,100 0 0,1 700,200 A100,100 0 0,1 600,300 A100,100 0 0,1 500,200 Z" fill="#f0f0f0" opacity="0.7" />
            
            {/* "Oops!" Text */}
            <text x="175" y="180" fontFamily="Arial" fontSize="72" fontWeight="bold" fill="#1e293b" transform="rotate(-10, 175, 180)">Oops!</text>
            
            {/* 404 Numbers */}
            <text x="150" y="350" fontFamily="Arial" fontSize="180" fontWeight="bold" fill="#2563eb">4</text>
            <text x="550" y="350" fontFamily="Arial" fontSize="180" fontWeight="bold" fill="#2563eb">4</text>
            
            {/* Center Gear with "0" */}
            <circle cx="350" cy="280" r="80" fill="#2563eb" />
            <circle cx="350" cy="280" r="60" fill="#1e293b" />
            <circle cx="350" cy="280" r="20" fill="#2563eb" />
            
            {/* Small Gears */}
            <circle cx="450" cy="200" r="15" fill="#ffffff" stroke="#2563eb" strokeWidth="4" />
            <circle cx="480" cy="230" r="10" fill="#2563eb" />
            <circle cx="250" cy="230" r="12" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
            
            {/* Robot/Error Box */}
            <rect x="300" y="400" width="200" height="150" rx="20" fill="#2563eb" />
            <rect x="325" y="425" width="150" height="70" rx="10" fill="#1e293b" />
            <text x="350" y="470" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#ffffff">ERROR</text>
            <path d="M350,500 L375,520 L400,500 L425,520 L450,500" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            
            {/* Robot Eyes */}
            <circle cx="350" cy="380" r="15" fill="#1e293b" />
            <circle cx="355" cy="375" r="5" fill="#ffffff" />
            
            {/* Robot Arms */}
            <path d="M275,450 L300,475" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
            <path d="M525,450 L500,475" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
            
            {/* Robot Legs */}
            <path d="M350,550 L325,580" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
            <path d="M450,550 L475,580" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
            
            {/* Small Decorative Elements */}
            <circle cx="300" cy="150" r="5" fill="#2563eb" />
            <circle cx="500" cy="400" r="5" fill="#2563eb" />
            <circle cx="200" cy="400" r="5" fill="#2563eb" />
            <path d="M200,200 Q220,180 240,200" stroke="#2563eb" strokeWidth="2" fill="none" />
            <path d="M500,300 Q520,280 540,300" stroke="#2563eb" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Page Not Found</h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
