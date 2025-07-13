import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { STATUS_MAP_REVERSE } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase admin client not configured" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    const {
      data: properties,
      error,
      count,
    } = await supabaseAdmin
      .from("properties")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error("Error fetching properties:", error)
      return NextResponse.json({ error: "Error fetching properties" }, { status: 500 })
    }

    return NextResponse.json({
      properties: properties || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (error) {
    console.error("Error in GET /api/properties:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase admin client not configured" }, { status: 500 })
    }

    const body = await request.json()

    // Convertir el status del frontend al valor de la base de datos
    const propertyData = {
      ...body,
      status:
        body.status && STATUS_MAP_REVERSE[body.status as keyof typeof STATUS_MAP_REVERSE]
          ? STATUS_MAP_REVERSE[body.status as keyof typeof STATUS_MAP_REVERSE]
          : "available",
      currency: body.currency || "USD",
      city: body.city || "Reconquista",
      province: body.province || "Santa Fe",
      images: body.images || [],
      features: body.features || [],
      featured: body.featured || false,
      views: 0,
    }

    const { data, error } = await supabaseAdmin.from("properties").insert([propertyData]).select().single()

    if (error) {
      console.error("Error creating property:", error)
      return NextResponse.json({ error: "Error creating property", details: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/properties:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
