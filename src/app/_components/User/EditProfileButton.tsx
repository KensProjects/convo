"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"
import usePersonalInfo from "@/app/hooks/usePersonalInfo"
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"

import { Pencil1Icon } from "@radix-ui/react-icons"
import { Switch } from "@/components/ui/switch"

export default function EditProfileButton({ currentBio, currentPrivacy }: { currentBio: string, currentPrivacy: boolean }) {

    const formSchema = z.object({
        bio: z.string().max(200, { message: 'Bio can be at most 200 characters.' }), isPrivate: z.boolean()
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bio: currentBio,
            isPrivate: currentPrivacy
        },
    })

    const { editPersonalValues } = usePersonalInfo()

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.bio.length > 200) return
        editPersonalValues(values.bio, values.isPrivate)
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="flex w-fit h-12 justify-center items-center rounded-lg" variant={'outline'}>
                        <div id="profile-edit-button-content" className="flex justify-center items-center gap-4">
                            <span>Edit Settings</span>
                            <Pencil1Icon width={20} height={20} />
                        </div>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="mb-4">Edit Settings</AlertDialogTitle>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start items-start w-full gap-4">
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem className="w-full h-full flex flex-col justify-start items-start gap-4">
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl >
                                                <Textarea placeholder="Bio" {...field} maxLength={200}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isPrivate"
                                    render={({ field }) => (
                                        <FormItem className="w-full h-full flex flex-col justify-start items-start gap-4">
                                            <FormLabel>Toggle Privacy</FormLabel>
                                            <FormControl >
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <AlertDialogFooter className="mt-4 flex justify-end items-center w-full gap-4">
                                    <AlertDialogAction type="submit">Save Settings</AlertDialogAction>
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
