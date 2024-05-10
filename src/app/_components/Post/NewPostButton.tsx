'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Pencil2Icon } from "@radix-ui/react-icons"
import useCreatePost from "@/app/hooks/useCreatePost"
import { useSession } from "next-auth/react"
import { Textarea } from "@/components/ui/textarea"
import useAccount from "@/app/hooks/useAccount"

export default function NewPostButton() {

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
    <>
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button className="flex md:hidden w-16 h-16 justify-center items-center rounded-full bg-emerald-400 fixed bottom-4 right-4">
            <Pencil2Icon width={30} height={30} />
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
    </>

  )
}
