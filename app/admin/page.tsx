import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/src/db/db";
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

export default async function AdminDashboard() {
    const salesData = await getSalesData()

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Sales" description={formatNumber(salesData.numberOfSales)} body={formatCurrency(salesData.amount)} />
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
                    <h1>{title}</h1>
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

