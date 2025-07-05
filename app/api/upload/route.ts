import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

// POST /api/upload - Subir imagen a Cloudinary
export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		// Validar tipo de archivo
		const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG and WebP are allowed." }, { status: 400 });
		}

		// Validar tamaño de archivo (máximo 10MB)
		const maxSize = 10 * 1024 * 1024; // 10MB
		if (file.size > maxSize) {
			return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 });
		}

		// Convertir archivo a buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Subir a Cloudinary
		const result = await uploadToCloudinary(buffer, {
			folder: "marconi/properties",
			transformation: [{ width: 1200, height: 800, crop: "fill", quality: "auto" }, { format: "auto" }]
		});

		return NextResponse.json({
			url: result.url,
			public_id: result.public_id,
			width: result.width,
			height: result.height,
			format: result.format,
			size: result.bytes
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
	}
}

// DELETE /api/upload - Eliminar imagen de Cloudinary
export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const publicId = searchParams.get("public_id");

		if (!publicId) {
			return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
		}

		const result = await deleteFromCloudinary(publicId);

		return NextResponse.json({
			message: "Image deleted successfully",
			result
		});
	} catch (error) {
		console.error("Delete error:", error);
		return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
	}
}

// app/api/upload/multiple/route.ts
