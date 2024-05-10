"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { useRouter } from "next/navigation"

export function SearchBar() {

  const router = useRouter()

  const formSchema = z.object({
    q: z.string().min(1, {
      message: "Query must be at least 1 character.",
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`http://localhost:3000/search?q=${values.q}`)
  }

  return ( 
    <div className="flex flex-col justify-center items-center w-full">
      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex justify-center items-center w-full sm:w-10/12 h-auto">
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <FormControl>
                  <Input {...field} placeholder="Search here..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit"><MagnifyingGlassIcon /></Button>
        </form>
      </Form>
    </div>

  )
}
