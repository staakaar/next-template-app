"use client";

import {
    Building2,
    FileText,
    HelpCircle,
    LogOut,
    HelpCircle as QuestionMark,
    Settings,
    Sliders,
    User,
    UserCircle,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocaleSwitcher from "./LocaleSwitcher";

const Header = () => {
    return (
        <div className="py-4 px-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link
                        href="/contract-all"
                        className="text-lg font-medium text-gray-900 hover:text-gray-700"
                    >
                        サービス名
                    </Link>

                    {/* 管理メニュー */}
                    <div className="flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center space-x-2"
                                >
                                    <Settings className="h-4 w-4" />
                                    <span>管理メニュー</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/contract-all"
                                        className="flex items-center space-x-2"
                                    >
                                        <FileText className="h-4 w-4" />
                                        <span>契約書一覧</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href=""
                                        className="flex items-center space-x-2"
                                    >
                                        <FileText className="h-4 w-4" />
                                        <span>契約書【A】</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href=""
                                        className="flex items-center space-x-2"
                                    >
                                        <FileText className="h-4 w-4" />
                                        <span>契約書【B】</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href=""
                                        className="flex items-center space-x-2"
                                    >
                                        <Settings className="h-4 w-4" />
                                        <span>WF</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* 設定メニュー */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center space-x-2"
                                >
                                    <Settings className="h-4 w-4" />
                                    <span>設定メニュー</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/user-settings"
                                        className="flex items-center space-x-2"
                                    >
                                        <Sliders className="h-4 w-4" />
                                        <span>項目設定</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/user-settings"
                                        className="flex items-center space-x-2"
                                    >
                                        <Sliders className="h-4 w-4" />
                                        <span>セクション</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/user-settings"
                                        className="flex items-center space-x-2"
                                    >
                                        <UserCircle className="h-4 w-4" />
                                        <span>個人設定</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/company-settings"
                                        className="flex items-center space-x-2"
                                    >
                                        <Building2 className="h-4 w-4" />
                                        <span>会社設定</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* 右側: ヘルプ、会社名、ユーザーメニュー */}
                <div className="flex items-center space-x-4">
                    <LocaleSwitcher />
                    <Button variant="ghost" size="icon" aria-label="Help">
                        <QuestionMark className="h-5 w-5" />
                    </Button>

                    <span className="text-sm text-gray-700">会社名</span>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center space-x-2">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center space-x-2">
                                <HelpCircle className="h-4 w-4" />
                                <span>Support</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center space-x-2 text-red-600">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};
export default Header;
