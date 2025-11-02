"use client";

import { Calendar, ChevronDown, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const contractMenu = [
    {
        label: "管理メニュー",
        icon: FileText,
        initiallyOpened: true,
        links: [
            { label: "契約書一覧", link: "/contract-all" },
            { label: "契約書【A】", link: "/" },
            { label: "契約書【B】", link: "/" },
            { label: "WF", link: "/workflow-all" },
        ],
    },
    {
        label: "設定メニュー",
        icon: Calendar,
        initiallyOpened: true,
        links: [
            { label: "デフォルト", link: "/" },
            { label: "セクション", link: "/" },
            { label: "帳票", link: "/" },
            { label: "個人設定", link: "/user-settings" },
            { label: "会社設定", link: "/company-settings" },
        ],
    },
];

interface MenuGroupProps {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    initiallyOpened: boolean;
    links: { label: string; link: string }[];
}

const MenuGroup = ({
    label,
    icon: Icon,
    initiallyOpened,
    links,
}: MenuGroupProps) => {
    const [isOpen, setIsOpen] = useState(initiallyOpened);
    const pathname = usePathname();

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                </div>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1">
                <div className="flex flex-col gap-1 pl-6">
                    {links.map((item) => (
                        <Link
                            key={item.link}
                            href={item.link}
                            className={cn(
                                "px-4 py-2 text-sm rounded-md transition-colors",
                                pathname === item.link
                                    ? "bg-accent text-accent-foreground font-medium"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

const ContractSideMenu = () => {
    return (
        // <nav className="space-y-2">
        //     {contractMenu.map((item) => (
        //         <MenuGroup key={item.label} {...item} />
        //     ))}
        // </nav>
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {contractMenu.map((item) =>
                                    item.links.map((link) => (
                                        <SidebarMenuItem key={link.label}>
                                            <SidebarMenuButton asChild>
                                                <Link href={link.link}>
                                                    <item.icon />
                                                    <span>{link.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
};

export default ContractSideMenu;
