"use server"

import { z } from "zod"
import db from "../../../src/db/db"
import fs from "fs/promises"
import { redirect } from "next/navigation"


const fileSchema = z.instanceof(File, { message: "File is required" })
const imageSchema = fileSchema.refine((file) => file.size === 0 || file.type.startsWith("image/"), "Invalid image")

const addSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().int().min(1),
    description: z.string().min(1),
    file: fileSchema.refine((file) => file.size > 0, "Required" ),
    image: imageSchema.refine((file) => file.size > 0, "Required" ),
})

export async function createProduct(formData: FormData) {
    const result = addSchema.safeParse( Object.fromEntries(formData.entries()))
    if(result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("products", { recursive: true })
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/products", { recursive: true })
    const imagePath = `products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await db.product.create({
        data: {
            name: data.name,
            price: data.price,
            description: data.description,
            fileUrl: filePath,
            imageUrl: imagePath,
        }
    })

    redirect("/admin/products")
}