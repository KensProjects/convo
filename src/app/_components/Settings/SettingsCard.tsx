import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function SettingsCard({ settingsSections }: { settingsSections: any[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
                {settingsSections.map(section => (
                    <div key={section}>{JSON.stringify(section)}</div>
                ))}
            </CardContent>
        </Card>
    )
}
