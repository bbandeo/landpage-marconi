import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// PUT /api/leads/[id] - Actualizar estado del lead
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);
		const body = await request.json();

		if (isNaN(id)) {
			return NextResponse.json({ error: "ID de lead inválido" }, { status: 400 });
		}

		const { data, error } = await supabaseAdmin
			.from("leads")
			.update({
				status: body.status,
				...(body.notes && { notes: body.notes })
			})
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Error updating lead:", error);
			return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
		}

		return NextResponse.json({ lead: data });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
