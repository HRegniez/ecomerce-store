"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { toggleProductAvailability, deleteProduct } from "@/app/admin/_actions/products";

export function ActiveToggleDropdownItem({
    id, 
    isAvailable
}: {
    id: string, 
    isAvailable: boolean
}) {
    const [isPending, startTransition] = useTransition()
 return (
    <DropdownMenuItem 
        disabled={isPending}
        onClick={() => {
            startTransition(async () => {
                await toggleProductAvailability(id, !isAvailable)
    })}}>
            {isAvailable ? "Disable" : "Enable"}
    </DropdownMenuItem>
 )
}

export function DeleteDropdownItem({
    id, 
    disabled
}: {
    id: string, 
    disabled: boolean
}) {
    const [isPending, startTransition] = useTransition()
    return (
       <DropdownMenuItem 
           disabled={isPending || disabled}
           onClick={() => {
               startTransition(async () => {
                   await deleteProduct(id)
       })}}>
               Delete
       </DropdownMenuItem>
    )
}
