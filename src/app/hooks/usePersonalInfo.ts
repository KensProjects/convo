import { api } from "@/trpc/react";

export default function usePersonalInfo() {

    const utils = api.useUtils()

    const { mutate: editAccount } = api.user.editUserInfo.useMutation({
        onSuccess: async () => await utils.user.invalidate()
    })

    function editPersonalValues(bio: string, isPrivateAccount: boolean) {
        editAccount({ bio: bio, isPrivateAccount: isPrivateAccount })
    }
    return { editPersonalValues }
}
