"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { type Property, STATUS_MAP } from "@/lib/supabase"
import { Upload, X, Plus } from "lucide-react"

const propertySchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  price: z.number().min(0, "El precio debe ser mayor a 0"),
  currency: z.string().default("USD"),
  property_type: z.enum(["casa", "departamento", "terreno", "local"]),
  operation_type: z.enum(["venta", "alquiler"]),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  area_m2: z.number().optional(),
  address: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().default("Reconquista"),
  province: z.string().default("Santa Fe"),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.string().default("Disponible"),
})

type PropertyFormData = z.infer<typeof propertySchema>

interface PropertyFormProps {
  property?: Property
  onSuccess?: () => void
}

export default function PropertyForm({ property, onSuccess }: PropertyFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [newFeature, setNewFeature] = useState("")
  const [uploadingImages, setUploadingImages] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      currency: "USD",
      property_type: "casa",
      operation_type: "venta",
      bedrooms: 0,
      bathrooms: 0,
      area_m2: 0,
      address: "",
      neighborhood: "",
      city: "Reconquista",
      province: "Santa Fe",
      images: [],
      features: [],
      featured: false,
      status: "Disponible",
    },
  })

  const watchedImages = watch("images")
  const watchedFeatures = watch("features")

  useEffect(() => {
    if (property) {
      reset({
        title: property.title,
        description: property.description || "",
        price: property.price,
        currency: property.currency,
        property_type: property.property_type as "casa" | "departamento" | "terreno" | "local",
        operation_type: property.operation_type as "venta" | "alquiler",
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area_m2: property.area_m2 || 0,
        address: property.address || "",
        neighborhood: property.neighborhood || "",
        city: property.city,
        province: property.province,
        images: property.images || [],
        features: property.features || [],
        featured: property.featured,
        status: STATUS_MAP[property.status as keyof typeof STATUS_MAP] || "Disponible",
      })
    }
  }, [property, reset])

  const onSubmit = async (data: PropertyFormData) => {
    setLoading(true)
    try {
      const url = property ? `/api/properties/${property.id}` : "/api/properties"
      const method = property ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al guardar la propiedad")
      }

      toast({
        title: "Éxito",
        description: property ? "Propiedad actualizada correctamente" : "Propiedad creada correctamente",
      })

      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/admin/properties")
      }
    } catch (error) {
      console.error("Error saving property:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al guardar la propiedad",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadingImages(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach((file) => {
        formData.append("files", file)
      })

      const response = await fetch("/api/upload/multiple", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error al subir las imágenes")
      }

      const { urls } = await response.json()
      const currentImages = watchedImages || []
      setValue("images", [...currentImages, ...urls])

      toast({
        title: "Éxito",
        description: "Imágenes subidas correctamente",
      })
    } catch (error) {
      console.error("Error uploading images:", error)
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
    const currentImages = watchedImages || []
    const newImages = currentImages.filter((_, i) => i !== index)
    setValue("images", newImages)
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      const currentFeatures = watchedFeatures || []
      setValue("features", [...currentFeatures, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    const currentFeatures = watchedFeatures || []
    const newFeatures = currentFeatures.filter((_, i) => i !== index)
    setValue("features", newFeatures)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Datos principales de la propiedad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input id="title" {...register("title")} placeholder="Ej: Casa en venta en centro" />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Descripción detallada de la propiedad"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Precio *</Label>
                <Input id="price" type="number" {...register("price", { valueAsNumber: true })} placeholder="0" />
                {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
              </div>

              <div>
                <Label htmlFor="currency">Moneda</Label>
                <Select value={watch("currency")} onValueChange={(value) => setValue("currency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="ARS">ARS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="property_type">Tipo de Propiedad *</Label>
                <Select
                  value={watch("property_type")}
                  onValueChange={(value) => setValue("property_type", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="operation_type">Tipo de Operación *</Label>
                <Select
                  value={watch("operation_type")}
                  onValueChange={(value) => setValue("operation_type", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Estado</Label>
              <Select value={watch("status")} onValueChange={(value) => setValue("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Vendido">Vendido</SelectItem>
                  <SelectItem value="Alquilado">Alquilado</SelectItem>
                  <SelectItem value="Reservado">Reservado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={watch("featured")}
                onCheckedChange={(checked) => setValue("featured", checked)}
              />
              <Label htmlFor="featured">Propiedad destacada</Label>
            </div>
          </CardContent>
        </Card>

        {/* Detalles */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles</CardTitle>
            <CardDescription>Características específicas de la propiedad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
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

              <div>
                <Label htmlFor="area_m2">Área (m²)</Label>
                <Input id="area_m2" type="number" {...register("area_m2", { valueAsNumber: true })} placeholder="0" />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" {...register("address")} placeholder="Dirección completa" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="neighborhood">Barrio</Label>
                <Input id="neighborhood" {...register("neighborhood")} placeholder="Nombre del barrio" />
              </div>

              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" {...register("city")} placeholder="Ciudad" />
              </div>
            </div>

            <div>
              <Label htmlFor="province">Provincia</Label>
              <Input id="province" {...register("province")} placeholder="Provincia" />
            </div>
          </CardContent>
        </Card>
      </div>

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
              <div className="mt-2">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG o JPEG</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImages}
                  />
                </label>
              </div>
            </div>

            {watchedImages && watchedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {watchedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
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
                placeholder="Ej: Piscina, Garage, etc."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addFeature()
                  }
                }}
              />
              <Button type="button" onClick={addFeature} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {watchedFeatures && watchedFeatures.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {watchedFeatures.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <button type="button" onClick={() => removeFeature(index)} className="ml-1 hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/properties")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading || uploadingImages}>
          {loading ? "Guardando..." : property ? "Actualizar" : "Crear"} Propiedad
        </Button>
      </div>
    </form>
  )
}
