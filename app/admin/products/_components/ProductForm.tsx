"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { formatCurrency } from "@/lib/formatters"
import { createProduct } from "@/app/admin/_actions/products"

export default function ProductForm() {
    const [priceInCents, setPriceInCents] = useState<number>()

    return (
        <form action={createProduct} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Product Name" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="price">Price in cents</Label>
                <Input type="number" name="price" id="price" placeholder="Product Price" required value={priceInCents} onChange={e => setPriceInCents(Number(e.target.value) || undefined)}/>
            </div>
            <div className="text-muted-foreground text-sm">
                {formatCurrency((priceInCents || 0) / 100)}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" id="description" placeholder="Product Description" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" name="file" id="file" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" name="image" id="image" required />
            </div>
            <Button type="submit">Submit</Button>
        </form>
    )
}