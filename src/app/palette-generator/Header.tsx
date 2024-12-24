import React from "react";
import { GithubIcon, Palette, PanelRightOpen } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ColorSuggestions from "./ColorSuggestion";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full  bg-transparent backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2 mr-4">
          <Palette className="h-6 w-6" />
          <Link href="/" className="font-semibold">
            Lluxui Colors
          </Link>
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  asChild
                >
                  <Link href="https://github.com/LuEsc/lluxui-colors" target="_blank">
                    <GithubIcon className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
              <Sheet>
                    <SheetTrigger asChild>
                        <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-zinc-200"
                        >
                        <PanelRightOpen className="w-4 h-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[90vw] sm:w-[440px] lg:w-[540px] p-0">
                        <SheetHeader>
                            <SheetTitle></SheetTitle>
                                <SheetDescription>
                                </SheetDescription>
                        </SheetHeader>
                        <ColorSuggestions />
                    </SheetContent>
                    </Sheet>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle color panel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
