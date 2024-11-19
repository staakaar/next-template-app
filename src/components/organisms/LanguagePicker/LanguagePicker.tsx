"use client";
import { useState } from "react";
import {
    UnstyledButton,
    Menu,
    Image,
    Group,
    MenuItem,
    MenuTarget,
    MenuDropdown,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./LanguagePicker.module.css";

const data = [
    { label: "English" },
    { label: "German" },
    { label: "Italian" },
    { label: "French" },
    { label: "Polish" },
];

export function LanguagePicker() {
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState(data[0]);
    const items = data.map((item) => (
        <MenuItem onClick={() => setSelected(item)} key={item.label}>
            {item.label}
        </MenuItem>
    ));

    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            width="target"
            withinPortal
        >
            <MenuTarget>
                <UnstyledButton
                    className={classes.control}
                    data-expanded={opened || undefined}
                >
                    <Group gap="xs">
                        <span className={classes.label}>{selected.label}</span>
                    </Group>
                    <IconChevronDown
                        size="1rem"
                        className={classes.icon}
                        stroke={1.5}
                    />
                </UnstyledButton>
            </MenuTarget>
            <MenuDropdown>{items}</MenuDropdown>
        </Menu>
    );
}
