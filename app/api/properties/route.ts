import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { PropertyInsert } from "@/lib/supabase";

// GET /api/properties - Listar propiedades con filtros
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);

		// Parámetros de filtro
		const type = searchParams.get("type");
		const operation = searchParams.get("operation");
		const status = searchParams.get("status");
		const featured = searchParams.get("featured");
		const neighborhood = searchParams.get("neighborhood");
		const minPrice = searchParams.get("min_price");
		const maxPrice = searchParams.get("max_price");
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "10");
		const search = searchParams.get("search");

		// Construir query
		let query = supabaseAdmin.from("properties").select("*", { count: "exact" });

		// Aplicar filtros
		if (type) query = query.eq("property_type", type);
		if (operation) query = query.eq("operation_type", operation);
		if (status) query = query.eq("status", status);
		if (featured) query = query.eq("featured", featured === "true");
		if (neighborhood) query = query.eq("neighborhood", neighborhood);
		if (minPrice) query = query.gte("price", parseFloat(minPrice));
		if (maxPrice) query = query.lte("price", parseFloat(maxPrice));

		// Búsqueda de texto
		if (search) {
			query = query.or(`title.ilike.%${search}%,address.ilike.%${search}%,neighborhood.ilike.%${search}%`);
		}

		// Paginación y ordenamiento
		const from = (page - 1) * limit;
		const to = from + limit - 1;

		query = query.order("created_at", { ascending: false }).range(from, to);

		const { data, error, count } = await query;

		if (error) {
			console.error("Error fetching properties:", error);
			return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
		}

		return NextResponse.json({
			properties: data,
			pagination: {
				page,
				limit,
				total: count || 0,
				totalPages: Math.ceil((count || 0) / limit)
			}
		});
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// POST /api/properties - Crear nueva propiedad
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validar datos requeridos
		const requiredFields = ["title", "price", "property_type", "operation_type", "area_m2", "address"];
		for (const field of requiredFields) {
			if (!body[field]) {
				return NextResponse.json({ error: `Campo requerido: ${field}` }, { status: 400 });
			}
		}

		// Preparar datos para inserción
		const propertyData: PropertyInsert = {
			title: body.title,
			description: body.description || null,
			price: parseFloat(body.price),
			currency: body.currency || "USD",
			property_type: body.property_type,
			operation_type: body.operation_type,
			bedrooms: body.bedrooms ? parseInt(body.bedrooms) : null,
			bathrooms: body.bathrooms ? parseInt(body.bathrooms) : null,
			area_m2: parseFloat(body.area_m2),
			address: body.address,
			neighborhood: body.neighborhood,
			city: body.city || "Reconquista",
			province: body.province || "Santa Fe",
			images: body.images || [],
			features: body.features || [],
			featured: body.featured || false,
			status: body.status || "Disponible",
			views: 0
		};

		const { data, error } = await supabaseAdmin.from("properties").insert(propertyData).select().single();

		if (error) {
			console.error("Error creating property:", error);
			return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
		}

		return NextResponse.json({ property: data }, { status: 201 });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// app/api/properties/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { PropertyUpdate } from "@/lib/supabase";

// GET /api/properties/[id] - Obtener propiedad específica
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "ID de propiedad inválido" }, { status: 400 });
		}

		// Incrementar contador de vistas
		await supabaseAdmin
			.from("properties")
			.update({ views: supabaseAdmin.sql`views + 1` })
			.eq("id", id);

		// Obtener propiedad
		const { data, error } = await supabaseAdmin.from("properties").select("*").eq("id", id).single();

		if (error) {
			console.error("Error fetching property:", error);
			return NextResponse.json({ error: "Property not found" }, { status: 404 });
		}

		return NextResponse.json({ property: data });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// PUT /api/properties/[id] - Actualizar propiedad
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);
		const body = await request.json();

		if (isNaN(id)) {
			return NextResponse.json({ error: "ID de propiedad inválido" }, { status: 400 });
		}

		// Preparar datos para actualización
		const updateData: PropertyUpdate = {};

		// Solo actualizar campos que fueron enviados
		if (body.title !== undefined) updateData.title = body.title;
		if (body.description !== undefined) updateData.description = body.description;
		if (body.price !== undefined) updateData.price = parseFloat(body.price);
		if (body.currency !== undefined) updateData.currency = body.currency;
		if (body.property_type !== undefined) updateData.property_type = body.property_type;
		if (body.operation_type !== undefined) updateData.operation_type = body.operation_type;
		if (body.bedrooms !== undefined) updateData.bedrooms = body.bedrooms ? parseInt(body.bedrooms) : null;
		if (body.bathrooms !== undefined) updateData.bathrooms = body.bathrooms ? parseInt(body.bathrooms) : null;
		if (body.area_m2 !== undefined) updateData.area_m2 = parseFloat(body.area_m2);
		if (body.address !== undefined) updateData.address = body.address;
		if (body.neighborhood !== undefined) updateData.neighborhood = body.neighborhood;
		if (body.images !== undefined) updateData.images = body.images;
		if (body.features !== undefined) updateData.features = body.features;
		if (body.featured !== undefined) updateData.featured = body.featured;
		if (body.status !== undefined) updateData.status = body.status;

		const { data, error } = await supabaseAdmin.from("properties").update(updateData).eq("id", id).select().single();

		if (error) {
			console.error("Error updating property:", error);
			return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
		}

		return NextResponse.json({ property: data });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// DELETE /api/properties/[id] - Eliminar propiedad
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "ID de propiedad inválido" }, { status: 400 });
		}

		const { error } = await supabaseAdmin.from("properties").delete().eq("id", id);

		if (error) {
			console.error("Error deleting property:", error);
			return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
		}

		return NextResponse.json({ message: "Property deleted successfully" });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
