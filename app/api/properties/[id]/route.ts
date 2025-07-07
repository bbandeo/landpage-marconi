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
		if (body.city !== undefined) updateData.city = body.city;
		if (body.province !== undefined) updateData.province = body.province;
		if (body.images !== undefined) updateData.images = body.images;
		if (body.features !== undefined) updateData.features = body.features;
		if (body.featured !== undefined) updateData.featured = body.featured;
		if (body.status !== undefined) updateData.status = body.status;

		// Agregar timestamp de actualización
		updateData.updated_at = new Date().toISOString();

		// Actualizar en Supabase
		const { data, error } = await supabaseAdmin
			.from("properties")
			.update(updateData)
			.eq("id", id)
			.select()
			.single();

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

		// Verificar que la propiedad existe antes de eliminar
		const { data: existingProperty, error: fetchError } = await supabaseAdmin
			.from("properties")
			.select("id, images")
			.eq("id", id)
			.single();

		if (fetchError || !existingProperty) {
			return NextResponse.json({ error: "Property not found" }, { status: 404 });
		}

		// TODO: Eliminar imágenes de Cloudinary
		// if (existingProperty.images && existingProperty.images.length > 0) {
		//     for (const imageUrl of existingProperty.images) {
		//         const publicId = extractPublicIdFromUrl(imageUrl);
		//         await deleteFromCloudinary(publicId);
		//     }
		// }

		// Eliminar propiedad de Supabase
		const { error: deleteError } = await supabaseAdmin
			.from("properties")
			.delete()
			.eq("id", id);

		if (deleteError) {
			console.error("Error deleting property:", deleteError);
			return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
		}

		return NextResponse.json({ message: "Property deleted successfully" });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}