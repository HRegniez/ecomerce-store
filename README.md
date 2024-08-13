This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## my process
1. create a new next.js app
2. create database
    - install prisma and init with sqLite
    - create models in schema.prisma
    - generate sqLite database
3. page: Admin dashboard
    - install shadcn/ui
    - create components
        1. Nav
        2. DashboardCard (shadcn/ui)
        3. Dashboard
            - get sales data
            - display sales data
            - get customers data
            - display customers data
            - get products data
            - display products data
        4. format sales data
            - formatCurrency
            - formatNumber
        5. loading page
2. page: Admin Products
    - create page
    - create components
        1. PageHeader (_components/PageHeader.tsx => next.js ignores this folder)
        2. Button (shadcn/ui)
        3. Products Table (shadcn/ui)
        4. DropdownMenu (shadcn/ui)
            - added DropdownMenuItemVariant to enhance the styling options for dropdown menu items
              - Created a new cva (class variance authority) for DropdownMenuItem
              - Added support for 'default' and 'destructive' variants
              - Implemented in dropdown-menu.tsx as follows:

              ```typescript
              const DropdownMenuItemVariant = cva(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                {
                  variants: {
                    variant: {
                      default: "focus:bg-accent focus:text-accent-foreground",
                      destructive:
                        "focus:bg-destructive focus:text-destructive-foreground text-destructive",
                    },
                  },
                  defaultVariants: {
                    variant: "default",
                  },
                }
              )
              ```

              - Updated DropdownMenuItem to use the new variant:

              ```typescript
              const DropdownMenuItem = React.forwardRef<
                React.ElementRef<typeof DropdownMenuPrimitive.Item>,
                React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
                  inset?: boolean,
                  variant?: "default" | "destructive"
                }
              >(({ className, inset, variant, ...props }, ref) => (
                <DropdownMenuPrimitive.Item
                  ref={ref}
                  className={cn(
                    DropdownMenuItemVariant({ variant, className }),
                    inset && "pl-8"
                  )}
                  {...props}
                />
              ))
              ```

              This allows for more flexible styling of dropdown menu items, particularly useful for actions like delete that require a destructive style.
    - get & add products data to table
3. page: Admin Products / new
    - create page
    - create components
        1. PageHeader
        2. ProductForm
            - Label (shadcn/ui)
            - Input (shadcn/ui)
            - Button (shadcn/ui)
        3. actions (_actions)
            - addProduct (add product to database)
                1. validate data (zod)
                2. create product (prisma)
                3. redirect to /admin/products (next/navigation)
            - toggleProductAvailability (toggle product availability)
                1. update product (prisma)

            - deleteProduct (delete product from database)
                1. delete product (prisma)

            

        