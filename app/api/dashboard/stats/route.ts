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
