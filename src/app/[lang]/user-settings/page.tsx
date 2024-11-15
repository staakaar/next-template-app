import Link from "next/link";
import { Button, TextInput, Checkbox, Card, Text, Title } from "@mantine/core";

const UserSettings = () => {
    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">User Settings</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <Link href="#" className="font-semibold text-primary">
                        General
                    </Link>
                    <Link href="#">Security</Link>
                    <Link href="#">Integrations</Link>
                    <Link href="#">Support</Link>
                    <Link href="#">Organizations</Link>
                    <Link href="#">Advanced</Link>
                </nav>
                <div className="grid gap-6">
                    <Card shadow="sm" padding="lg" className="bg-white">
                        <Title order={2} className="text-xl font-semibold">
                            Store Name
                        </Title>
                        <Text size="sm" className="text-gray-500 mt-1">
                            Used to identify your store in the marketplace.
                        </Text>
                        <form className="mt-4">
                            <TextInput placeholder="Store Name" />
                        </form>
                        <div className="border-t mt-4 pt-4">
                            <Button className="bg-blue-500 text-white hover:bg-blue-600">
                                Save
                            </Button>
                        </div>
                    </Card>

                    <Card shadow="sm" padding="lg" className="bg-white">
                        <Title order={2} className="text-xl font-semibold">
                            Plugins Directory
                        </Title>
                        <Text size="sm" className="text-gray-500 mt-1">
                            The directory within your project, in which your
                            plugins are located.
                        </Text>
                        <form className="flex flex-col gap-4 mt-4">
                            <TextInput
                                placeholder="Project Name"
                                defaultValue="/content/plugins"
                            />
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="include"
                                    defaultChecked
                                    className="cursor-pointer"
                                />
                                <label
                                    htmlFor="include"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Allow administrators to change the
                                    directory.
                                </label>
                            </div>
                        </form>
                        <div className="border-t mt-4 pt-4">
                            <Button className="bg-blue-500 text-white hover:bg-blue-600">
                                Save
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default UserSettings;
