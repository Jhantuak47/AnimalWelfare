"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from './ui/toast';
import { useRouter } from 'next/navigation';
import { logOutUserAction } from '@/actions/auth';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true);
    const result = await logOutUserAction();
    const errorMessage = result?.errorMessage ?? null;

    if (!errorMessage) {
      toast.add({ title: "Logged Out", description: "You have been successfully logged out.", type: "success" })
      router.push("/")
    } else {
      toast.add({ title: "Error", description: errorMessage, type: "danger" })
    }
    setLoading(false);
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="w-24">
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  )
}
