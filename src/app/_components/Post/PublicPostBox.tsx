'use client'

import useCreatePost from '@/app/hooks/useCreatePost'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

export default function PublicPostBox() {

  const [postBody, setPostBody] = useState("")

  const { createPublicPost } = useCreatePost()

  const FormSchema = z.object({
    post_body: z
      .string()
      .min(1, {
        message: "Bio must be at least 1 character.",
      })
      .max(200, {
        message: "Bio must not be longer than 200 characters.",
      }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      post_body: postBody
    }
  })
  function submitNewPost() {
    createPublicPost(postBody)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitNewPost)} className="w-2/3 space-y-6 rounded-lg flex flex-col justify-center items-center">
        <FormField
          control={form.control}
          name="post_body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create New Post</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hello!"
                  className="resize-none"
                  {...field}
                  value={postBody}
                  onChange={e => setPostBody(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Post</Button>
      </form>
    </Form>
  )
}
