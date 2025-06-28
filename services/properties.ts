import { Property, PropertyInsert, PropertyUpdate } from "@/lib/supabase";

interface PaginationParams {
	page?: number;
	limit?: number;
}

interface PropertyFilters {
	type?: string;
	operation?: string;
	status?: string;
	featured?: boolean;
	neighborhood?: string;
	minPrice?: number;
	maxPrice?: number;
	search?: string;
}

interface PropertiesResponse {
	properties: Property[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

// Servicio para gestionar propiedades
export class PropertiesService {
	private static baseUrl = "/api/properties";

	// Obtener todas las propiedades con filtros
	static async getProperties(filters: PropertyFilters = {}, pagination: PaginationParams = {}): Promise<PropertiesResponse> {
		const params = new URLSearchParams();

		// Agregar filtros
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== "") {
				params.append(key, value.toString());
			}
		});

		// Agregar paginación
		if (pagination.page) params.append("page", pagination.page.toString());
		if (pagination.limit) params.append("limit", pagination.limit.toString());

		const response = await fetch(`${this.baseUrl}?${params.toString()}`);

		if (!response.ok) {
			throw new Error("Failed to fetch properties");
		}

		return response.json();
	}

	// Obtener propiedades para la landing page (públicas)
	static async getPublicProperties(filters: PropertyFilters = {}): Promise<Property[]> {
		const publicFilters = {
			...filters,
			status: "Disponible" // Solo propiedades disponibles
		};

		const result = await this.getProperties(publicFilters, { limit: 50 });
		return result.properties;
	}

	// Obtener propiedades destacadas
	static async getFeaturedProperties(): Promise<Property[]> {
		const result = await this.getProperties(
			{
				featured: true,
				status: "Disponible"
			},
			{ limit: 6 }
		);
		return result.properties;
	}

	// Obtener una propiedad específica
	static async getProperty(id: number): Promise<Property> {
		const response = await fetch(`${this.baseUrl}/${id}`);

		if (!response.ok) {
			throw new Error("Property not found");
		}

		const result = await response.json();
		return result.property;
	}

	// Crear nueva propiedad
	static async createProperty(data: Omit<PropertyInsert, "id">): Promise<Property> {
		const response = await fetch(this.baseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to create property");
		}

		const result = await response.json();
		return result.property;
	}

	// Actualizar propiedad
	static async updateProperty(id: number, data: PropertyUpdate): Promise<Property> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to update property");
		}

		const result = await response.json();
		return result.property;
	}

	// Eliminar propiedad
	static async deleteProperty(id: number): Promise<void> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "DELETE"
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to delete property");
		}
	}

	// Alternar estado destacado
	static async toggleFeatured(id: number, featured: boolean): Promise<Property> {
		return this.updateProperty(id, { featured });
	}
}

// services/upload.ts
export interface UploadResult {
	url: string;
	public_id: string;
	width?: number;
	height?: number;
	format?: string;
	size?: number;
}

export class UploadService {
	private static baseUrl = "/api/upload";

	// Subir una sola imagen
	static async uploadImage(file: File): Promise<UploadResult> {
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch(this.baseUrl, {
			method: "POST",
			body: formData
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to upload image");
		}

		return response.json();
	}

	// Subir múltiples imágenes
	static async uploadMultipleImages(files: File[]): Promise<{
		uploaded: UploadResult[];
		failed: Array<{ error: string; originalName: string }>;
		successCount: number;
		failureCount: number;
	}> {
		const formData = new FormData();
		files.forEach(file => formData.append("files", file));

		const response = await fetch(`${this.baseUrl}/multiple`, {
			method: "POST",
			body: formData
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to upload images");
		}

		return response.json();
	}

	// Eliminar imagen
	static async deleteImage(publicId: string): Promise<void> {
		const response = await fetch(`${this.baseUrl}?public_id=${encodeURIComponent(publicId)}`, {
			method: "DELETE"
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to delete image");
		}
	}
}

// services/dashboard.ts
export interface DashboardStats {
	activeProperties: {
		value: number;
		change: string;
		changeLabel: string;
		isPositive: boolean;
	};
	monthlySales: {
		value: string;
		change: string;
		changeLabel: string;
		isPositive: boolean;
	};
	newLeads: {
		value: number;
		change: string;
		changeLabel: string;
		isPositive: boolean;
	};
	totalViews: {
		value: string;
		change: string;
		changeLabel: string;
		isPositive: boolean;
	};
}

export interface ActivityItem {
	id: string;
	type: string;
	message: string;
	timestamp: string;
	timeAgo: string;
	icon: string;
}

export class DashboardService {
	private static baseUrl = "/api/dashboard";

	// Obtener estadísticas del dashboard
	static async getStats(): Promise<DashboardStats> {
		const response = await fetch(`${this.baseUrl}/stats`);

		if (!response.ok) {
			throw new Error("Failed to fetch dashboard stats");
		}

		const result = await response.json();
		return result.stats;
	}

	// Obtener actividad reciente
	static async getRecentActivity(limit: number = 10): Promise<ActivityItem[]> {
		const response = await fetch(`${this.baseUrl}/recent-activity?limit=${limit}`);

		if (!response.ok) {
			throw new Error("Failed to fetch recent activity");
		}

		const result = await response.json();
		return result.activities;
	}
}

// services/leads.ts
import { Lead, LeadInsert } from "@/lib/supabase";

export interface LeadsResponse {
	leads: (Lead & { properties?: Property })[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export class LeadsService {
	private static baseUrl = "/api/leads";

	// Obtener leads con filtros
	static async getLeads(
		filters: {
			status?: string;
			source?: string;
		} = {},
		pagination: PaginationParams = {}
	): Promise<LeadsResponse> {
		const params = new URLSearchParams();

		Object.entries(filters).forEach(([key, value]) => {
			if (value) params.append(key, value);
		});

		if (pagination.page) params.append("page", pagination.page.toString());
		if (pagination.limit) params.append("limit", pagination.limit.toString());

		const response = await fetch(`${this.baseUrl}?${params.toString()}`);

		if (!response.ok) {
			throw new Error("Failed to fetch leads");
		}

		return response.json();
	}

	// Crear nuevo lead (desde formulario de contacto)
	static async createLead(data: Omit<LeadInsert, "id">): Promise<Lead> {
		const response = await fetch(this.baseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to create lead");
		}

		const result = await response.json();
		return result.lead;
	}

	// Actualizar estado del lead
	static async updateLead(id: number, data: { status: string; notes?: string }): Promise<Lead> {
		const response = await fetch(`${this.baseUrl}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to update lead");
		}

		const result = await response.json();
		return result.lead;
	}
}

// hooks/useProperties.ts (React Hook para el frontend)
import { useState, useEffect } from "react";
import { PropertiesService } from "@/services/properties";
import type { Property } from "@/lib/supabase";

export function useProperties(filters = {}) {
	const [properties, setProperties] = useState<Property[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				setLoading(true);
				const result = await PropertiesService.getProperties(filters);
				setProperties(result.properties);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error fetching properties");
			} finally {
				setLoading(false);
			}
		};

		fetchProperties();
	}, [JSON.stringify(filters)]);

	return { properties, loading, error, refetch: () => setLoading(true) };
}

// hooks/useDashboard.ts
import { useState, useEffect } from "react";
import { DashboardService } from "@/services/dashboard";
import type { DashboardStats, ActivityItem } from "@/services/dashboard";

export function useDashboard() {
	const [stats, setStats] = useState<DashboardStats | null>(null);
	const [activities, setActivities] = useState<ActivityItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setLoading(true);
				const [statsData, activitiesData] = await Promise.all([DashboardService.getStats(), DashboardService.getRecentActivity(10)]);

				setStats(statsData);
				setActivities(activitiesData);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error fetching dashboard data");
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, []);

	return { stats, activities, loading, error };
}
