import { v2 as cloudinary } from "cloudinary";

// Configuración del servidor
cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

export { cloudinary };

// Configuración para el cliente (upload sin firma)
export const cloudinaryConfig = {
	cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
};

// Función auxiliar para upload desde el servidor
export const uploadToCloudinary = async (
	file: string | Buffer,
	options: {
		folder?: string;
		transformation?: any[];
		public_id?: string;
	} = {}
) => {
	try {
		const uploadOptions = {
			folder: options.folder || "marconi/properties",
			transformation: options.transformation || [{ width: 1200, height: 800, crop: "fill", quality: "auto" }, { format: "auto" }],
			public_id: options.public_id,
			overwrite: true,
			resource_type: "auto"
		};

		// Usamos una promesa para manejar el stream de subida
		return new Promise((resolve, reject) => {
			if (Buffer.isBuffer(file)) {
				const stream = cloudinary.uploader.upload_stream(
					uploadOptions,
					(error, result) => {
						if (error) {
							console.error("Cloudinary upload stream error:", error);
							return reject(new Error("Failed to upload image via stream"));
						}
						if (result) {
							resolve({
								url: result.secure_url,
								public_id: result.public_id,
								width: result.width,
								height: result.height,
								format: result.format,
								bytes: result.bytes
							});
						}
					}
				);
				// Escribimos el buffer al stream y lo cerramos
				stream.end(file);
			} else {
				// Si es un string (ruta o URL), usamos el método de upload normal
				cloudinary.uploader.upload(file, uploadOptions)
					.then(result => {
						resolve({
							url: result.secure_url,
							public_id: result.public_id,
							width: result.width,
							height: result.height,
							format: result.format,
							bytes: result.bytes
						});
					})
					.catch(error => {
						console.error("Cloudinary upload error:", error);
						reject(new Error("Failed to upload image"));
					});
			}
		});
	} catch (error) {
		console.error("Error preparing upload to Cloudinary:", error);
		throw new Error("Failed to upload image");
	}
};

// Función para eliminar imagen de Cloudinary
export const deleteFromCloudinary = async (publicId: string) => {
	try {
		const result = await cloudinary.uploader.destroy(publicId);
		return result;
	} catch (error) {
		console.error("Error deleting from Cloudinary:", error);
		throw new Error("Failed to delete image");
	}
};

// Función para generar URLs optimizadas
export const getOptimizedImageUrl = (
	publicId: string,
	options: {
		width?: number;
		height?: number;
		quality?: string;
		format?: string;
		crop?: string;
	} = {}
) => {
	const { width = 800, height = 600, quality = "auto", format = "auto", crop = "fill" } = options;

	return cloudinary.url(publicId, {
		transformation: [{ width, height, crop, quality }, { format }]
	});
};

// Upload desde el cliente (frontend)
export const uploadImageFromClient = async (
	file: File
): Promise<{
	url: string;
	public_id: string;
}> => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", cloudinaryConfig.uploadPreset!);
	formData.append("folder", "marconi/properties");

	try {
		const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
			method: "POST",
			body: formData
		});

		if (!response.ok) {
			throw new Error("Upload failed");
		}

		const data = await response.json();
		return {
			url: data.secure_url,
			public_id: data.public_id
		};
	} catch (error) {
		console.error("Error uploading image:", error);
		throw new Error("Failed to upload image");
	}
};
