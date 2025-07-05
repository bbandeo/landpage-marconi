import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

// POST /api/upload/multiple - Subir múltiples imágenes
export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const files = formData.getAll("files") as File[];

		if (!files || files.length === 0) {
			return NextResponse.json({ error: "No files provided" }, { status: 400 });
		}

		// Validar número máximo de archivos
		if (files.length > 10) {
			return NextResponse.json({ error: "Maximum 10 files allowed" }, { status: 400 });
		}

		const uploadPromises = files.map(async (file, index) => {
			try {
				// Validar tipo de archivo
				const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
				if (!allowedTypes.includes(file.type)) {
					throw new Error(`Invalid file type for file ${index + 1}`);
				}

				// Validar tamaño de archivo
				const maxSize = 10 * 1024 * 1024; // 10MB
				if (file.size > maxSize) {
					throw new Error(`File ${index + 1} is too large`);
				}

				// Convertir a buffer
				const bytes = await file.arrayBuffer();
				const buffer = Buffer.from(bytes);

				// Subir a Cloudinary
				const result = await uploadToCloudinary(buffer, {
					folder: "marconi/properties",
					transformation: [{ width: 1200, height: 800, crop: "fill", quality: "auto" }, { format: "auto" }]
				});

				return {
					success: true,
					url: result.url,
					public_id: result.public_id,
					width: result.width,
					height: result.height,
					originalName: file.name
				};
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Upload failed",
					originalName: file.name
				};
			}
		});

		const results = await Promise.all(uploadPromises);

		const successful = results.filter(r => r.success);
		const failed = results.filter(r => !r.success);

		return NextResponse.json({
			uploaded: successful,
			failed: failed,
			total: files.length,
			successCount: successful.length,
			failureCount: failed.length
		});
	} catch (error) {
		console.error("Multiple upload error:", error);
		return NextResponse.json({ error: "Failed to upload images" }, { status: 500 });
	}
}
