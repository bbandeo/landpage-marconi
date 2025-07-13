import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { type PropertyInsert, STATUS_MAP_REVERSE } from "@/lib/supabase"

// GET /api/properties - Listar propiedades con filtros
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parámetros de filtro
    const type = searchParams.get("type")
    const operation = searchParams.get("operation")
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")
    const neighborhood = searchParams.get("neighborhood")
    const minPrice = searchParams.get("min_price")
    const maxPrice = searchParams.get("max_price")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search")

    // Construir query
    let query = supabaseAdmin.from("properties").select("*", { count: "exact" })

    // Aplicar filtros
    if (type) query = query.eq("property_type", type)
    if (operation) query = query.eq("operation_type", operation)
    if (status) {
      // Convertir status del frontend (español) a DB (inglés)
      const dbStatus = STATUS_MAP_REVERSE[status as keyof typeof STATUS_MAP_REVERSE] || status
      query = query.eq("status", dbStatus)
    }
    if (featured) query = query.eq("featured", featured === "true")
    if (neighborhood) query = query.eq("neighborhood", neighborhood)
    if (minPrice) query = query.gte("price", Number.parseFloat(minPrice))
    if (maxPrice) query = query.lte("price", Number.parseFloat(maxPrice))

    // Búsqueda de texto
    if (search) {
      query = query.or(`title.ilike.%${search}%,address.ilike.%${search}%,neighborhood.ilike.%${search}%`)
    }

    // Paginación y ordenamiento
    const from = (page - 1) * limit
    const to = from + limit - 1

    query = query.order("created_at", { ascending: false }).range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error("Error fetching properties:", error)
      return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
    }

    return NextResponse.json({
      properties: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/properties - Crear nueva propiedad
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos requeridos
    const requiredFields = ["title", "price", "property_type", "operation_type"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Campo requerido: ${field}` }, { status: 400 })
      }
    }

    // Convertir status del frontend a DB si es necesario
    let dbStatus = body.status || "available"
    if (STATUS_MAP_REVERSE[dbStatus as keyof typeof STATUS_MAP_REVERSE]) {
      dbStatus = STATUS_MAP_REVERSE[dbStatus as keyof typeof STATUS_MAP_REVERSE]
    }

    // Preparar datos para inserción
    const propertyData: PropertyInsert = {
      title: body.title,
      description: body.description || null,
      price: Number.parseFloat(body.price),
      currency: body.currency || "USD",
      property_type: body.property_type,
      operation_type: body.operation_type,
      bedrooms: body.bedrooms ? Number.parseInt(body.bedrooms) : null,
      bathrooms: body.bathrooms ? Number.parseInt(body.bathrooms) : null,
      area_m2: body.area_m2 ? Number.parseFloat(body.area_m2) : null,
      address: body.address || null,
      neighborhood: body.neighborhood || null,
      city: body.city || "Reconquista",
      province: body.province || "Santa Fe",
      images: body.images || [],
      features: body.features || [],
      featured: body.featured || false,
      status: dbStatus,
      views: 0,
    }

    const { data, error } = await supabaseAdmin.from("properties").insert(propertyData).select().single()

    if (error) {
      console.error("Error creating property:", error)
      return NextResponse.json(
        {
          error: "Failed to create property",
          details: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ property: data }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
