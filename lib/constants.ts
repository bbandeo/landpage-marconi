// Property-related constants
export const PROPERTY_TYPES = {
  house: "Casa",
  apartment: "Departamento", 
  commercial: "Comercial",
  land: "Terreno",
} as const

export const OPERATION_TYPES = {
  sale: "Venta",
  rent: "Alquiler", 
} as const

export const PROPERTY_STATUS = {
  available: "Disponible",
  sold: "Vendido",
  rented: "Alquilado", 
  reserved: "Reservado",
} as const

export const CONTACT_STATUS = {
  new: "Nuevo",
  contacted: "Contactado",
  qualified: "Calificado",
  converted: "Convertido",
} as const

export const CONTACT_PRIORITIES = {
  low: "Baja",
  medium: "Media", 
  high: "Alta",
} as const

// Currency formatting
export const formatPrice = (price: number, operation: string, currency = "USD") => {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  
  return formatter.format(price) + (operation === "rent" ? "/mes" : "")
}

// Image optimization constants
export const IMAGE_OPTIMIZATION = {
  HERO_SIZE: { width: 1920, height: 1080 },
  PROPERTY_CARD: { width: 400, height: 250 },
  PROPERTY_DETAIL: { width: 800, height: 600 },
  THUMBNAIL: { width: 150, height: 150 },
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGES_PER_PROPERTY: 10,
  QUALITY: "auto" as const,
  FORMAT: "auto" as const,
}

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[0-9\s\-\(\)]{8,}$/,
  POSTAL_CODE: /^\d{4,5}$/,
}

// Default values
export const DEFAULTS = {
  CITY: "Reconquista",
  PROVINCE: "Santa Fe",
  COUNTRY: "Argentina",
  CURRENCY: "USD",
}