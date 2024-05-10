'use client'

import useAccount from '@/app/hooks/useAccount'
import useCreatePost from '@/app/hooks/useCreatePost'
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function BannerComposeButton() {

  const { data: session } = useSession()

  const { personalDataIsLoading } = useAccount({ id: session?.user.id })

  const { createPublicPost } = useCreatePost()

  const formSchema = z.object({
    postBody: z.string().min(1, {
      message: "Post must be at least 1 character.",
    }).max(200),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postBody: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createPublicPost(values.postBody)
  }

  if (!session || personalDataIsLoading) return null

  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <Button className="flex justify-center items-center rounded-lg bg-emerald-400 gap-2 w-full mx-2">
          <Pencil2Icon width={18} height={18} />
          <span>Compose</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Post</AlertDialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-start w-full">
              <FormField
                control={form.control}
                name="postBody"
                render={({ field }) => (
                  <FormItem className="w-full h-full">
                    <FormControl >
                      <Textarea placeholder="Hello!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter className="mt-4 flex justify-end items-center w-full gap-4">
                <AlertDialogAction type="submit">Create</AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
