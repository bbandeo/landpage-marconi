import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Mock data for now - will be replaced with real Supabase queries
    const mockStats = {
      stats: {
        activeProperties: { value: 23, change: "+12%" },
        newLeads: { value: 47, change: "+23%" },
        monthlySales: { value: "$145,000", change: "+15%" },
        totalViews: { value: "1,247", change: "+8%" },
      },
    }

    try {
      // Try to get real data from Supabase
      const { data: properties, error: propertiesError } = await supabaseAdmin
        .from("properties")
        .select("id, status")
        .eq("status", "active")

      const { data: leads, error: leadsError } = await supabaseAdmin
        .from("leads")
        .select("id, created_at")
        .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

      // If we have real data, use it
      if (properties && !propertiesError) {
        mockStats.stats.activeProperties.value = properties.length
      }

      if (leads && !leadsError) {
        mockStats.stats.newLeads.value = leads.length
      }
    } catch (dbError) {
      console.log("Database not available, using mock data:", dbError)
    }

    return NextResponse.json(mockStats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)

    // Return fallback mock data
    return NextResponse.json({
      stats: {
        activeProperties: { value: 23, change: "+12%" },
        newLeads: { value: 47, change: "+23%" },
        monthlySales: { value: "$145,000", change: "+15%" },
        totalViews: { value: "1,247", change: "+8%" },
      },
    })
  }
}
