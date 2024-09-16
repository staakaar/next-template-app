"use client";
import { AddIcon, ChevronLeftIcon, MinusIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    Box,
    IconButton,
} from "@chakra-ui/react";
import { useState } from "react";

export const SideBar = () => {
    const [isShrink, setIsShrink] = useState(false);

    return (
        <>
            <Accordion w="15%" mt="2%" ml="2%">
                <AccordionItem>
                    {(isShrink) => (
                        <>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                        テスト一覧
                                    </Box>
                                    {isShrink ? (
                                        <MinusIcon fontSize="12px" />
                                    ) : (
                                        <AddIcon fontSize="12px" />
                                    )}
                                </AccordionButton>
                            </h2>
                        </>
                    )}
                </AccordionItem>
                <AccordionItem>
                    {(isShrink) => (
                        <>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                        テスト受領一覧
                                    </Box>
                                    {isShrink ? (
                                        <MinusIcon fontSize="12px" />
                                    ) : (
                                        <AddIcon fontSize="12px" />
                                    )}
                                </AccordionButton>
                            </h2>
                        </>
                    )}
                </AccordionItem>
                <AccordionItem>
                    {(isShrink) => (
                        <>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                        テスト発行一覧
                                    </Box>
                                    {isShrink ? (
                                        <MinusIcon fontSize="12px" />
                                    ) : (
                                        <AddIcon fontSize="12px" />
                                    )}
                                </AccordionButton>
                            </h2>
                        </>
                    )}
                </AccordionItem>
            </Accordion>
        </>
    );
};
