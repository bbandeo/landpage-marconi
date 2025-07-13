import { supabase, supabaseAdmin } from "@/lib/supabase"
import type { Property, PropertyInsert, PropertyUpdate } from "@/lib/supabase"

export class PropertiesService {
  // Obtener propiedades destacadas para la landing page
  static async getFeaturedProperties(): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("featured", true)
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(6)

      if (error) {
        console.error("Error fetching featured properties:", error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error("Error in getFeaturedProperties:", error)
      throw error
    }
  }

  // Obtener todas las propiedades con filtros
  static async getProperties(
    filters: {
      type?: string
      operation?: string
      status?: string
      featured?: boolean
      neighborhood?: string
      minPrice?: number
      maxPrice?: number
      search?: string
      page?: number
      limit?: number
    } = {},
  ): Promise<{ properties: Property[]; total: number }> {
    try {
      let query = supabase.from("properties").select("*", { count: "exact" })

      // Aplicar filtros
      if (filters.type) query = query.eq("property_type", filters.type)
      if (filters.operation) query = query.eq("operation_type", filters.operation)
      if (filters.status) query = query.eq("status", filters.status)
      if (filters.featured !== undefined) query = query.eq("featured", filters.featured)
      if (filters.neighborhood) query = query.eq("neighborhood", filters.neighborhood)
      if (filters.minPrice) query = query.gte("price", filters.minPrice)
      if (filters.maxPrice) query = query.lte("price", filters.maxPrice)

      // Búsqueda de texto
      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,address.ilike.%${filters.search}%,neighborhood.ilike.%${filters.search}%`,
        )
      }

      // Paginación
      const page = filters.page || 1
      const limit = filters.limit || 10
      const from = (page - 1) * limit
      const to = from + limit - 1

      query = query.order("created_at", { ascending: false }).range(from, to)

      const { data, error, count } = await query

      if (error) {
        console.error("Error fetching properties:", error)
        throw error
      }

      return {
        properties: data || [],
        total: count || 0,
      }
    } catch (error) {
      console.error("Error in getProperties:", error)
      throw error
    }
  }

  // Crear nueva propiedad
  static async createProperty(propertyData: PropertyInsert): Promise<Property> {
    try {
      const { data, error } = await supabaseAdmin.from("properties").insert(propertyData).select().single()

      if (error) {
        console.error("Error creating property:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in createProperty:", error)
      throw error
    }
  }

  // Actualizar propiedad
  static async updateProperty(id: number, propertyData: PropertyUpdate): Promise<Property> {
    try {
      const { data, error } = await supabaseAdmin.from("properties").update(propertyData).eq("id", id).select().single()

      if (error) {
        console.error("Error updating property:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in updateProperty:", error)
      throw error
    }
  }

  // Obtener propiedad por ID
  static async getPropertyById(id: number): Promise<Property | null> {
    try {
      const { data, error } = await supabase.from("properties").select("*").eq("id", id).single()

      if (error) {
        if (error.code === "PGRST116") {
          return null // No encontrado
        }
        console.error("Error fetching property:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in getPropertyById:", error)
      throw error
    }
  }

  // Eliminar propiedad
  static async deleteProperty(id: number): Promise<void> {
    try {
      const { error } = await supabaseAdmin.from("properties").delete().eq("id", id)

      if (error) {
        console.error("Error deleting property:", error)
        throw error
      }
    } catch (error) {
      console.error("Error in deleteProperty:", error)
      throw error
    }
  }

  // Incrementar vistas de una propiedad
  static async incrementViews(id: number): Promise<void> {
    try {
      const { error } = await supabaseAdmin
        .from("properties")
        .update({ views: supabase.raw("views + 1") })
        .eq("id", id)

      if (error) {
        console.error("Error incrementing views:", error)
        throw error
      }
    } catch (error) {
      console.error("Error in incrementViews:", error)
      throw error
    }
  }
}
