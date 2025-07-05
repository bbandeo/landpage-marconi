import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { LeadInsert } from "@/lib/supabase";

// GET /api/leads - Obtener leads con filtros
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const status = searchParams.get("status");
		const source = searchParams.get("source");
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "10");

		let query = supabaseAdmin.from("leads").select(
			`
        *,
        properties (
          id,
          title,
          address,
          price,
          currency
        )
      `,
			{ count: "exact" }
		);

		if (status) query = query.eq("status", status);
		if (source) query = query.eq("lead_source", source);

		const from = (page - 1) * limit;
		const to = from + limit - 1;

		query = query.order("created_at", { ascending: false }).range(from, to);

		const { data, error, count } = await query;

		if (error) {
			console.error("Error fetching leads:", error);
			return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
		}

		return NextResponse.json({
			leads: data,
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

		// Aquí podrías agregar notificaciones (email, WhatsApp, etc.)
		// await sendNotification(data)

		return NextResponse.json({ lead: data }, { status: 201 });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
