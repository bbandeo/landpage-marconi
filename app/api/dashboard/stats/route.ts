import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
	try {
		// Obtener estadísticas básicas
		const [propertiesCount, activePropertiesCount, recentPropertiesCount, leadsCount, recentLeadsCount, totalViews, recentViews] = await Promise.all([
			// Total de propiedades
			supabaseAdmin.from("properties").select("*", { count: "exact", head: true }),

			// Propiedades activas (disponibles)
			supabaseAdmin.from("properties").select("*", { count: "exact", head: true }).eq("status", "Disponible"),

			// Propiedades agregadas esta semana
			supabaseAdmin
				.from("properties")
				.select("*", { count: "exact", head: true })
				.gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),

			// Total de leads
			supabaseAdmin.from("leads").select("*", { count: "exact", head: true }),

			// Leads nuevos hoy
			supabaseAdmin.from("leads").select("*", { count: "exact", head: true }).gte("created_at", new Date().toISOString().split("T")[0]),

			// Total de vistas
			supabaseAdmin.from("properties").select("views"),

			// Vistas de esta semana (esto requeriría un campo updated_at en views, simplificamos)
			supabaseAdmin
				.from("properties")
				.select("views")
				.gte("updated_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
		]);

		// Calcular vistas totales
		const totalViewsSum = totalViews.data?.reduce((sum, prop) => sum + (prop.views || 0), 0) || 0;
		const recentViewsSum = recentViews.data?.reduce((sum, prop) => sum + (prop.views || 0), 0) || 0;

		// Calcular porcentajes de cambio (simulado para el ejemplo)
		const propertiesChange = recentPropertiesCount.count || 0;
		const leadsChange = recentLeadsCount.count || 0;
		const viewsChange = Math.round((recentViewsSum / Math.max(totalViewsSum - recentViewsSum, 1)) * 100);

		// Obtener ventas del mes (propiedades vendidas)
		const { data: soldProperties } = await supabaseAdmin
			.from("properties")
			.select("price, currency")
			.eq("status", "Vendido")
			.gte("updated_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

		// Calcular ventas totales del mes
		let monthlySales = 0;
		if (soldProperties) {
			monthlySales = soldProperties.reduce((total, prop) => {
				// Convertir todo a USD para simplicidad (en producción usar rates reales)
				const amount = prop.currency === "ARS" ? prop.price / 1000 : prop.price;
				return total + amount;
			}, 0);
		}

		const stats = {
			activeProperties: {
				value: activePropertiesCount.count || 0,
				change: `+${propertiesChange}`,
				changeLabel: "esta semana",
				isPositive: true
			},
			monthlySales: {
				value: `$${monthlySales.toLocaleString()}`,
				change: "+15%",
				changeLabel: "vs mes anterior",
				isPositive: true
			},
			newLeads: {
				value: leadsCount.count || 0,
				change: `+${leadsChange}`,
				changeLabel: "hoy",
				isPositive: true
			},
			totalViews: {
				value: totalViewsSum.toLocaleString(),
				change: `+${viewsChange}%`,
				changeLabel: "esta semana",
				isPositive: viewsChange > 0
			}
		};

		return NextResponse.json({ stats });
	} catch (error) {
		console.error("Error fetching dashboard stats:", error);
		return NextResponse.json({ error: "Failed to fetch dashboard statistics" }, { status: 500 });
	}
}

// app/api/dashboard/recent-activity/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const limit = parseInt(searchParams.get("limit") || "10");

		// Obtener actividad reciente combinando diferentes fuentes
		const [recentProperties, recentLeads, recentUpdates] = await Promise.all([
			// Propiedades creadas recientemente
			supabaseAdmin.from("properties").select("id, title, created_at").order("created_at", { ascending: false }).limit(5),

			// Leads recientes
			supabaseAdmin.from("leads").select("id, name, property_id, created_at, properties(title)").order("created_at", { ascending: false }).limit(5),

			// Propiedades actualizadas recientemente
			supabaseAdmin
				.from("properties")
				.select("id, title, status, updated_at")
				.neq("updated_at", supabaseAdmin.sql`created_at`)
				.order("updated_at", { ascending: false })
				.limit(5)
		]);

		// Combinar y formatear actividades
		const activities = [];

		// Agregar propiedades nuevas
		recentProperties.data?.forEach(property => {
			activities.push({
				id: `property_new_${property.id}`,
				type: "property_created",
				message: `Nueva propiedad agregada: ${property.title}`,
				timestamp: property.created_at,
				icon: "home"
			});
		});

		// Agregar leads nuevos
		recentLeads.data?.forEach(lead => {
			const propertyTitle = (lead as any).properties?.title || "Consulta general";
			activities.push({
				id: `lead_new_${lead.id}`,
				type: "lead_created",
				message: `Nuevo contacto de ${lead.name} para: ${propertyTitle}`,
				timestamp: lead.created_at,
				icon: "message"
			});
		});

		// Agregar actualizaciones de propiedades
		recentUpdates.data?.forEach(property => {
			activities.push({
				id: `property_updated_${property.id}`,
				type: "property_updated",
				message: `Propiedad actualizada: ${property.title} - Estado: ${property.status}`,
				timestamp: property.updated_at,
				icon: "edit"
			});
		});

		// Ordenar por fecha y limitar resultados
		const sortedActivities = activities
			.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
			.slice(0, limit)
			.map(activity => ({
				...activity,
				timeAgo: getTimeAgo(activity.timestamp)
			}));

		return NextResponse.json({ activities: sortedActivities });
	} catch (error) {
		console.error("Error fetching recent activity:", error);
		return NextResponse.json({ error: "Failed to fetch recent activity" }, { status: 500 });
	}
}

// Función auxiliar para calcular tiempo transcurrido
function getTimeAgo(timestamp: string): string {
	const now = new Date();
	const past = new Date(timestamp);
	const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

	if (diffInMinutes < 1) return "Ahora mismo";
	if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`;

	return past.toLocaleDateString("es-AR");
}

// app/api/leads/route.ts
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

// app/api/leads/[id]/route.ts
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
