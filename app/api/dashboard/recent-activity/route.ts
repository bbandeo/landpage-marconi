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
