import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { LeadInsert } from "@/lib/supabase";

// POST /api/leads - Crear nuevo lead (desde formulario de contacto)
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validar datos requeridos
		if (!body.name || !body.message) {
			return NextResponse.json({ error: "Nombre y mensaje son requeridos" }, { status: 400 });
		}

		const leadData: LeadInsert = {
			name: body.name,
			email: body.email || null,
			phone: body.phone || null,
			message: body.message,
			property_id: body.property_id || null,
			lead_source: body.lead_source || "website",
			status: "new"
		};

		const { data, error } = await supabaseAdmin.from("leads").insert(leadData).select().single();

		if (error) {
			console.error("Error creating lead:", error);
			return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
		}

		return NextResponse.json({ lead: data }, { status: 201 });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
