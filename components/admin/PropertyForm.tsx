"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
  Upload,
  X,
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Dumbbell,
  Shield,
  Waves,
  TreePine,
  Utensils,
  Zap,
  Wind,
  Sun,
  Camera,
} from "lucide-react"

interface Property {
  id?: number
  title: string
  description: string
  price: number
  type: "sale" | "rent"
  propertyType: "house" | "apartment" | "commercial" | "land"
  address: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  area: number
  lotSize?: number
  parking: number
  yearBuilt?: number
  features: string[]
  images: string[]
  status: "active" | "inactive" | "sold" | "rented"
  featured: boolean
}

interface PropertyFormProps {
  property?: Property
  onSubmit: (property: Partial<Property>) => Promise<void>
}

const FEATURES = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "gym", label: "Gimnasio", icon: Dumbbell },
  { id: "security", label: "Seguridad 24hs", icon: Shield },
  { id: "pool", label: "Piscina", icon: Waves },
  { id: "garden", label: "Jardín", icon: TreePine },
  { id: "kitchen", label: "Cocina equipada", icon: Utensils },
  { id: "elevator", label: "Ascensor", icon: Zap },
  { id: "aircon", label: "Aire acondicionado", icon: Wind },
  { id: "balcony", label: "Balcón", icon: Sun },
]

export default function PropertyForm({ property, onSubmit }: PropertyFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    description: "",
    price: 0,
    type: "sale",
    propertyType: "apartment",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    lotSize: 0,
    parking: 0,
    yearBuilt: new Date().getFullYear(),
    features: [],
    images: [],
    status: "active",
    featured: false,
    ...property,
  })

  const handleInputChange = (field: keyof Property, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...(prev.features || []), featureId],
    }))
  }

  const handleImageUpload = async (files: FileList) => {
    if (!files.length) return

    setUploadingImages(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to upload image")
        }

        const data = await response.json()
        return data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedUrls],
      }))

      toast({
        title: "Imágenes subidas",
        description: `Se subieron ${uploadedUrls.length} imágenes correctamente.`,
      })
    } catch (error) {
      console.error("Error uploading images:", error)
      toast({
        title: "Error",
        description: "No se pudieron subir las imágenes. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setUploadingImages(false)
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSubmit(formData)
      toast({
        title: property ? "Propiedad actualizada" : "Propiedad creada",
        description: property ? "La propiedad se actualizó correctamente." : "La propiedad se creó correctamente.",
      })
      router.push("/admin/properties")
    } catch (error) {
      console.error("Error saving property:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar la propiedad. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Información Básica
          </CardTitle>
          <CardDescription>Detalles principales de la propiedad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="title">Título de la propiedad *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ej: Hermoso departamento en Palermo"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Tipo de operación *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Venta</SelectItem>
                  <SelectItem value="rent">Alquiler</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="propertyType">Tipo de propiedad *</Label>
              <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Departamento</SelectItem>
                  <SelectItem value="house">Casa</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="land">Terreno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Precio *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", Number(e.target.value))}
                placeholder="0"
                required
              />
            </div>

            <div>
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="inactive">Inactiva</SelectItem>
                  <SelectItem value="sold">Vendida</SelectItem>
                  <SelectItem value="rented">Alquilada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe las características principales de la propiedad..."
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Ubicación
          </CardTitle>
          <CardDescription>Dirección y ubicación de la propiedad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Ej: Av. Santa Fe 1234"
                required
              />
            </div>

            <div>
              <Label htmlFor="neighborhood">Barrio</Label>
              <Input
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                placeholder="Ej: Palermo"
              />
            </div>

            <div>
              <Label htmlFor="city">Ciudad *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Ej: Buenos Aires"
                required
              />
            </div>

            <div>
              <Label htmlFor="state">Provincia</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                placeholder="Ej: Buenos Aires"
              />
            </div>

            <div>
              <Label htmlFor="zipCode">Código Postal</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                placeholder="Ej: 1425"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Square className="w-5 h-5 mr-2" />
            Detalles de la Propiedad
          </CardTitle>
          <CardDescription>Características físicas y técnicas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="bedrooms" className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                Dormitorios
              </Label>
              <Input
                id="bedrooms"
                type="number"
                min="0"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="bathrooms" className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                Baños
              </Label>
              <Input
                id="bathrooms"
                type="number"
                min="0"
                step="0.5"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="area">Área (m²) *</Label>
              <Input
                id="area"
                type="number"
                min="0"
                value={formData.area}
                onChange={(e) => handleInputChange("area", Number(e.target.value))}
                required
              />
            </div>

            <div>
              <Label htmlFor="parking" className="flex items-center">
                <Car className="w-4 h-4 mr-1" />
                Cocheras
              </Label>
              <Input
                id="parking"
                type="number"
                min="0"
                value={formData.parking}
                onChange={(e) => handleInputChange("parking", Number(e.target.value))}
              />
            </div>

            {formData.propertyType === "house" && (
              <div>
                <Label htmlFor="lotSize">Terreno (m²)</Label>
                <Input
                  id="lotSize"
                  type="number"
                  min="0"
                  value={formData.lotSize || ""}
                  onChange={(e) => handleInputChange("lotSize", Number(e.target.value))}
                />
              </div>
            )}

            <div>
              <Label htmlFor="yearBuilt">Año de construcción</Label>
              <Input
                id="yearBuilt"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.yearBuilt || ""}
                onChange={(e) => handleInputChange("yearBuilt", Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Características y Amenities</CardTitle>
          <CardDescription>Selecciona las características que tiene la propiedad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox
                  id={feature.id}
                  checked={formData.features?.includes(feature.id) || false}
                  onCheckedChange={() => handleFeatureToggle(feature.id)}
                />
                <Label htmlFor={feature.id} className="flex items-center cursor-pointer">
                  <feature.icon className="w-4 h-4 mr-2" />
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Imágenes
          </CardTitle>
          <CardDescription>Sube fotos de la propiedad (máximo 10 imágenes)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Label htmlFor="images" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Arrastra imágenes aquí o haz clic para seleccionar
                  </span>
                </Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  disabled={uploadingImages}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF hasta 10MB cada una</p>
            </div>
          </div>

          {formData.images && formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  {index === 0 && (
                    <Badge className="absolute bottom-2 left-2" variant="secondary">
                      Principal
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}

          {uploadingImages && (
            <div className="text-center">
              <p className="text-sm text-gray-500">Subiendo imágenes...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card>
        <CardHeader>
          <CardTitle>Opciones Adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured || false}
              onCheckedChange={(checked) => handleInputChange("featured", checked)}
            />
            <Label htmlFor="featured">Marcar como propiedad destacada</Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : property ? "Actualizar Propiedad" : "Crear Propiedad"}
        </Button>
      </div>
    </form>
  )
}
