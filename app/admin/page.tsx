import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: {pricePaid: true},
        _count: true
    })

    return {
        amount: (data._sum.pricePaid || 0) / 100,
        numberOfSales: data._count
    }
}

async function getCustomersData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: {pricePaid: true},
        })
    ])
    
    return {
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaid || 0) / userCount / 100
    }
}

async function getProductsData() {
    const [activeProducts, inactiveProducts] = await Promise.all([
        db.product.count({ where: { isAvailable: true } }),
        db.product.count({ where: { isAvailable: false } })
    ])

    return {
        activeProducts,
        inactiveProducts
    }
}

export default async function AdminDashboard() {
    const [salesData, customersData, productsData] = await Promise.all([
        getSalesData(),
        getCustomersData(),
        getProductsData()
    ])

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard 
            title="Sales" 
            description={`${formatNumber(salesData.numberOfSales)} Orders`} 
            body={formatCurrency(salesData.amount)} 
        />
        <DashboardCard 
            title="Customers" 
            description={`${formatCurrency(customersData.averageValuePerUser)} Average Value`} 
            body={formatNumber(customersData.userCount)} 
        />
        <DashboardCard 
            title="Active Products" 
            description={`${formatNumber(productsData.inactiveProducts)} Inactive`} 
            body={formatNumber(productsData.activeProducts)} 
        />
    </div>
}

type DashboardCardProps = {
    title: string;
    description: string;
    body: string;
}

function DashboardCard({title, description, body}: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}

