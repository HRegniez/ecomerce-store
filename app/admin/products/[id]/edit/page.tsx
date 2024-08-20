import PageHeader from "../../../_components/PageHeader";
import ProductForm from "../../_components/ProductForm";
import db from "@/db/db";

export default async function EditProductsNewPage({
    params: { id }
}: {
    params: { id: string }
}) {
    const product = await db.product.findUnique({
        where: { id }
    })
    return <div>
        <PageHeader>Edit Product</PageHeader>
        <ProductForm product={product} />
    </div>
}