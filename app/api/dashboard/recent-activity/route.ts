import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Since we don't have real data yet, return mock data
    // This will be replaced with real Supabase queries once the database is set up
    const mockActivities = [
      {
        id: "activity_1",
        type: "property_created",
        message: "Nueva propiedad agregada: Casa en Barrio Parque",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
        icon: "home",
      },
      {
        id: "activity_2",
        type: "lead_created",
        message: "Nuevo contacto de María González para: Departamento Centro",
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
        icon: "message",
      },
      {
        id: "activity_3",
        type: "property_updated",
        message: "Propiedad actualizada: Terreno en Lorenzón - Estado: Disponible",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        icon: "edit",
      },
      {
        id: "activity_4",
        type: "lead_created",
        message: "Nuevo contacto de Juan Pérez para: Casa familiar",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        icon: "message",
      },
      {
        id: "activity_5",
        type: "property_created",
        message: "Nueva propiedad agregada: Departamento 2 ambientes",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        icon: "home",
      },
    ]

    // Try to fetch real data from Supabase (when available)
    try {
      // Attempt to get recent properties
      const { data: recentProperties, error: propertiesError } = await supabaseAdmin
        .from("properties")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(3)

      // Attempt to get recent leads
      const { data: recentLeads, error: leadsError } = await supabaseAdmin
        .from("leads")
        .select("id, name, property_id, created_at")
        .order("created_at", { ascending: false })
        .limit(3)

      // If we have real data, use it
      const activities = []

      if (recentProperties && !propertiesError) {
        recentProperties.forEach((property) => {
          activities.push({
            id: `property_new_${property.id}`,
            type: "property_created",
            message: `Nueva propiedad agregada: ${property.title}`,
            timestamp: property.created_at,
            icon: "home",
          })
        })
      }

      if (recentLeads && !leadsError) {
        recentLeads.forEach((lead) => {
          activities.push({
            id: `lead_new_${lead.id}`,
            type: "lead_created",
            message: `Nuevo contacto de ${lead.name}`,
            timestamp: lead.created_at,
            icon: "message",
          })
        })
      }

      // If we have real activities, use them; otherwise use mock data
      const finalActivities = activities.length > 0 ? activities : mockActivities

      // Sort by timestamp and limit results
      const sortedActivities = finalActivities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit)
        .map((activity) => ({
          ...activity,
          timeAgo: getTimeAgo(activity.timestamp),
        }))

      return NextResponse.json({ activities: sortedActivities })
    } catch (dbError) {
      console.log("Database not available, using mock data:", dbError)

      // Use mock data with time ago calculation
      const activitiesWithTimeAgo = mockActivities.slice(0, limit).map((activity) => ({
        ...activity,
        timeAgo: getTimeAgo(activity.timestamp),
      }))

      return NextResponse.json({ activities: activitiesWithTimeAgo })
    }
  } catch (error) {
    console.error("Error fetching recent activity:", error)

    // Return mock data as fallback
    const mockActivities = [
      {
        id: "fallback_1",
        type: "property_created",
        message: "Nueva propiedad agregada: Casa en Barrio Parque",
        timestamp: new Date().toISOString(),
        timeAgo: "Hace 5 minutos",
        icon: "home",
      },
      {
        id: "fallback_2",
        type: "lead_created",
        message: "Nuevo contacto de María González",
        timestamp: new Date().toISOString(),
        timeAgo: "Hace 15 minutos",
        icon: "message",
      },
    ]

    return NextResponse.json({ activities: mockActivities })
  }
}

// Helper function to calculate time ago
function getTimeAgo(timestamp: string): string {
  const now = new Date()
  const past = new Date(timestamp)
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Ahora mismo"
  if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`

  return past.toLocaleDateString("es-AR")
}
