"use client"

import { useEffect } from "react"
import { useRealtimeNotifications } from "@/hooks/use-realtime"
import { toast } from "sonner"
import { Bell, Home, User } from "lucide-react"

interface RealtimeNotifierProps {
  onInvalidateQueries?: (table: string) => void
}

export function RealtimeNotifier({ onInvalidateQueries }: RealtimeNotifierProps) {
  const { notifications } = useRealtimeNotifications()

  useEffect(() => {
    // Show toast for new notifications
    const latestNotification = notifications[0]
    
    if (latestNotification && !latestNotification.read) {
      const icon = latestNotification.type === 'property' ? Home : 
                  latestNotification.type === 'lead' ? User : Bell

      toast.success(latestNotification.title, {
        description: latestNotification.message,
        icon: icon({ size: 16 }),
        action: {
          label: "Ver",
          onClick: () => {
            console.log("Navigate to:", latestNotification.type, latestNotification.id)
            // Here you could navigate to the specific page
          },
        },
      })

      // Invalidate queries based on notification type
      if (onInvalidateQueries) {
        if (latestNotification.type === 'property') {
          onInvalidateQueries('properties')
        } else if (latestNotification.type === 'lead') {
          onInvalidateQueries('leads')
        }
      }
    }
  }, [notifications, onInvalidateQueries])

  return null // This component doesn't render anything
}
