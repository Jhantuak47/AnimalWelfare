import { surfaceShadow } from "@/styles/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/auth/server";

async function Header() {
  const user = await getUser();

  return (
    <header
      className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8"
      style={{ boxShadow: surfaceShadow }}
    >
      <Link href="/" className="flex items-end gap-2">
        <Image src="/globe.svg" height={60} width={60} alt="logo" className="rounded-full" priority />
        <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
          Animal <span>Welfare</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <nav className="hidden items-center gap-4 text-sm font-medium text-muted-foreground sm:flex">
          <Link href="/strays" className="hover:text-foreground">Map</Link>
          <Link href="/report" className="hover:text-foreground">Report a Stray</Link>
        </nav>
        {user ? <LogoutButton /> : (
          <>
            <Button className="hidden sm:block">
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
            <Button variant="outline">
              <Link href="/auth/login">Login</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
