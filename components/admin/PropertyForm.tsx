"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { X, Plus } from "lucide-react"

const propertySchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  price: z.number().min(0, "El precio debe ser mayor a 0"),
  currency: z.enum(["USD", "ARS"]),
  property_type: z.enum(["casa", "departamento", "terreno", "local"]),
  operation_type: z.enum(["venta", "alquiler"]),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  area_m2: z.number().min(1, "El área es requerida"),
  address: z.string().min(1, "La dirección es requerida"),
  neighborhood: z.string().min(1, "El barrio es requerido"),
  city: z.string().default("Reconquista"),
  province: z.string().default("Santa Fe"),
  featured: z.boolean().default(false),
  status: z.enum(["available", "sold", "rented", "reserved"]).default("available"),
})

type PropertyFormData = z.infer<typeof propertySchema>

interface PropertyFormProps {
  property?: any
  onSubmit?: (data: PropertyFormData) => void
}

const PropertyForm = ({ property, onSubmit }: PropertyFormProps) => {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      price: property?.price || 0,
      currency: property?.currency || "USD",
      property_type: property?.property_type || "casa",
      operation_type: property?.operation_type || "venta",
      bedrooms: property?.bedrooms || undefined,
      bathrooms: property?.bathrooms || undefined,
      area_m2: property?.area_m2 || 0,
      address: property?.address || "",
      neighborhood: property?.neighborhood || "",
      city: property?.city || "Reconquista",
      province: property?.province || "Santa Fe",
      featured: property?.featured || false,
      status: property?.status || "available",
    },
  })

  const propertyType = watch("property_type")

  useEffect(() => {
    if (property) {
      setImages(property.images || [])
      setFeatures(property.features || [])
    }
  }, [property])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setUploadingImages(true)
    const formData = new FormData()

    Array.from(files).forEach((file) => {
      formData.append("files", file)
    })

    try {
      const response = await fetch("/api/upload/multiple", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const { urls } = await response.json()
        setImages((prev) => [...prev, ...urls])
        toast({
          title: "Éxito",
          description: "Imágenes subidas correctamente",
        })
      } else {
        throw new Error("Error al subir imágenes")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al subir las imágenes",
        variant: "destructive",
      })
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures((prev) => [...prev, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index))
  }

  const onFormSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true)

    try {
      const propertyData = {
        ...data,
        images,
        features,
      }

      if (onSubmit) {
        onSubmit(propertyData)
      } else {
        const url = property ? `/api/properties/${property.id}` : "/api/properties"
        const method = property ? "PUT" : "POST"

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(propertyData),
        })

        if (response.ok) {
          toast({
            title: "Éxito",
            description: property ? "Propiedad actualizada correctamente" : "Propiedad creada correctamente",
          })
          router.push("/admin/properties")
        } else {
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al guardar la propiedad")
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al guardar la propiedad",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Información básica */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
          <CardDescription>Datos principales de la propiedad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input id="title" {...register("title")} placeholder="Ej: Casa familiar en Barrio Parque" />
              {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="property_type">Tipo de Propiedad *</Label>
              <Select value={watch("property_type")} onValueChange={(value) => setValue("property_type", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
              {errors.property_type && <p className="text-sm text-red-600 mt-1">{errors.property_type.message}</p>}
            </div>

            <div>
              <Label htmlFor="operation_type">Tipo de Operación *</Label>
              <Select
                value={watch("operation_type")}
                onValueChange={(value) => setValue("operation_type", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar operación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venta">Venta</SelectItem>
                  <SelectItem value="alquiler">Alquiler</SelectItem>
                </SelectContent>
              </Select>
              {errors.operation_type && <p className="text-sm text-red-600 mt-1">{errors.operation_type.message}</p>}
            </div>

            <div>
              <Label htmlFor="status">Estado</Label>
              <Select value={watch("status")} onValueChange={(value) => setValue("status", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="sold">Vendido</SelectItem>
                  <SelectItem value="rented">Alquilado</SelectItem>
                  <SelectItem value="reserved">Reservado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descripción detallada de la propiedad..."
              rows={4}
            />
            {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Precio y características */}
      <Card>
        <CardHeader>
          <CardTitle>Precio y Características</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Precio *</Label>
              <Input id="price" type="number" {...register("price", { valueAsNumber: true })} placeholder="0" />
              {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <Label htmlFor="currency">Moneda</Label>
              <Select value={watch("currency")} onValueChange={(value) => setValue("currency", value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="ARS">ARS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="area_m2">Área (m²) *</Label>
              <Input id="area_m2" type="number" {...register("area_m2", { valueAsNumber: true })} placeholder="0" />
              {errors.area_m2 && <p className="text-sm text-red-600 mt-1">{errors.area_m2.message}</p>}
            </div>
          </div>

          {(propertyType === "casa" || propertyType === "departamento") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Dormitorios</Label>
                <Input id="bedrooms" type="number" {...register("bedrooms", { valueAsNumber: true })} placeholder="0" />
              </div>

              <div>
                <Label htmlFor="bathrooms">Baños</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  {...register("bathrooms", { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ubicación */}
      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Dirección *</Label>
            <Input id="address" {...register("address")} placeholder="Ej: Belgrano 1234" />
            {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="neighborhood">Barrio *</Label>
              <Input id="neighborhood" {...register("neighborhood")} placeholder="Ej: Centro" />
              {errors.neighborhood && <p className="text-sm text-red-600 mt-1">{errors.neighborhood.message}</p>}
            </div>

            <div>
              <Label htmlFor="city">Ciudad</Label>
              <Input id="city" {...register("city")} placeholder="Reconquista" />
            </div>

            <div>
              <Label htmlFor="province">Provincia</Label>
              <Input id="province" {...register("province")} placeholder="Santa Fe" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Imágenes */}
      <Card>
        <CardHeader>
          <CardTitle>Imágenes</CardTitle>
          <CardDescription>Sube imágenes de la propiedad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="images">Subir Imágenes</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImages}
              />
              {uploadingImages && <p className="text-sm text-gray-600 mt-1">Subiendo imágenes...</p>}
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Características */}
      <Card>
        <CardHeader>
          <CardTitle>Características</CardTitle>
          <CardDescription>Agrega características especiales de la propiedad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Ej: Pileta, Garage, Jardín"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Opciones adicionales */}
      <Card>
        <CardHeader>
          <CardTitle>Opciones Adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={watch("featured")}
              onCheckedChange={(checked) => setValue("featured", !!checked)}
            />
            <Label htmlFor="featured">Marcar como propiedad destacada</Label>
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/properties")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : property ? "Actualizar" : "Crear"} Propiedad
        </Button>
      </div>
    </form>
  )
}

export default PropertyForm
