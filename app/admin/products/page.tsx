import PageHeader from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Link from "next/link";
import db from "../../../src/db/db"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "../../../lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";

export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>
                
                <Button asChild>
                    <Link href="/admin/products/new">
                        Add Product
                    </Link>
                </Button>
            </div>
            <ProductTable />
        </>
    )
}

async function ProductTable() {
    const products = await db.product.findMany({ 
        select: {
            id: true,
            name: true,
            price: true,
            isAvailable: true,
            _count: { select: { orders: true }}
        },
        orderBy: { name: "asc" }
    })

    if (products.length === 0) {
        return <div className="text-center">No products found</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available for purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.isAvailable ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="sr-only">Available</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-4 h-4 stroke-destructive" />
                                    <span className="sr-only">Not Available</span>
                                </>
                            )}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(Number(product.price) /100)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical className="w-4 h-4" />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a href={`/admin/products/${product.id}/download`}>Download</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={product.id} isAvailable={product.isAvailable} />
                                    <DropdownMenuSeparator/>
                                    <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                                </DropdownMenuContent>                        
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

