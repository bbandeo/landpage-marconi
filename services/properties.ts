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

	// Actualizar propiedad existente
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

	// Cambiar estado de propiedad
	static async updatePropertyStatus(id: number, status: string): Promise<Property> {
		return this.updateProperty(id, { status });
	}

	// Cambiar estado destacado
	static async toggleFeatured(id: number, featured: boolean): Promise<Property> {
		return this.updateProperty(id, { featured });
	}
}