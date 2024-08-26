import { NextRequest, NextResponse } from "next/server"
import db from "@/db/db"
import { notFound } from "next/navigation"
import fs from "fs/promises"

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    const product = await db.product.findUnique({
        where: {
            id: params.id,
        },
        select: {
            fileUrl: true,
            name: true
        }
    })

    if(product == null) {
        return notFound()
    }

    const { size } = await fs.stat(product.fileUrl)
    const file = await fs.readFile(product.fileUrl)
    const extension = product.fileUrl.split(".").pop()

    return new NextResponse(file, {
        headers: {
            "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
            "Content-Length": size.toString(),
        }
    })
}
