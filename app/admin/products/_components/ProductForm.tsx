"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { formatCurrency } from "@/lib/formatters"
import { createProduct } from "@/app/admin/_actions/products"
import { Product } from "@prisma/client"
import Image from "next/image"



export default function ProductForm({ product }: { product: Product | null }) {
    const [error, action] = useFormState(createProduct, {})
    const [priceInCents, setPriceInCents] = useState<number | undefined>(Number(product?.price || 0))

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Product Name" required defaultValue={product?.name || ""} />
                {error.name && <p className="text-destructive">{error.name}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="price">Price in cents</Label>
                <Input type="number" name="price" id="price" placeholder="Product Price" required value={priceInCents} onChange={e => setPriceInCents(Number(e.target.value) || undefined)}/>
                {error.price && <p className="text-destructive">{error.price}</p>}
            </div>
            <div className="text-muted-foreground text-sm ml-2">
                {formatCurrency((priceInCents || 0) / 100)}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" id="description" placeholder="Product Description"  required defaultValue={product?.description || ""} />
                {error.description && <p className="text-destructive">{error.description}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" name="file" id="file" required={!product} />
                {product && <p className="text-muted-foreground text-sm ml-2">{product.fileUrl}</p>}
                {error.file && <p className="text-destructive">{error.file}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" name="image" id="image" required={!product} />
                {product && <Image src={`/public/${product.imageUrl}`} alt={product.name} width={400} height={400} />}
                {error.image && <p className="text-destructive">{error.image}</p>}
            </div>
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>

}