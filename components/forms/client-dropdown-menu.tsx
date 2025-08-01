"use client";

type TProps = {
  clientkey: TClients | null;
  setClientkey: Dispatch<SetStateAction<TClients | null>>;
  setSection: Dispatch<SetStateAction<TSection | null>>;
  isOnPreview: boolean;
};

import {
  SatelliteDish,
  Antenna,
  Zap,
  Rss,
  RadioTower,
  TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CLIENTS } from "@/constant/constant";
import { Dispatch, SetStateAction } from "react";
import { findDropdownTiggerName } from "@/utils/find-dropdown-trigger-name";
import { cn } from "@/lib/utils";
import { useClientStore } from "@/store/use-client.store";

export default function ClientDropdownMenu({
  clientkey,
  setClientkey,
  setSection,
  isOnPreview,
}: TProps) {
  const { setClient } = useClientStore();

  const onSelect = (value: TClients, section: TSection) => {
    setClientkey(value);
    setSection(section);
    setClient(value);
  };

  const triggerBtnText = findDropdownTiggerName(CLIENTS, clientkey!);

  return (
    <DropdownMenu>
      <div className="flex items-center justify-start gap-4">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            disabled={isOnPreview}
            className={cn(
              triggerBtnText == "Choose client" ? "animate-pulse" : ""
            )}
          >
            {triggerBtnText.includes("BYTEL") && (
              <SatelliteDish className="mr-2 h-4 w-4" />
            )}
            {triggerBtnText.includes("ORANGE") && (
              <Antenna className="mr-2 h-4 w-4" />
            )}
            {triggerBtnText.includes("SFR") && <Rss className="mr-2 h-4 w-4" />}
            {triggerBtnText.includes("FREE") && (
              <RadioTower className="mr-2 h-4 w-4" />
            )}
            {triggerBtnText.includes("ENERGIE") && (
              <Zap className="mr-2 h-4 w-4" />
            )}
            {triggerBtnText}
          </Button>
        </DropdownMenuTrigger>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="border-b-2 border-orange-400">
              <TriangleAlert className="text-orange-400" />
            </TooltipTrigger>
            <TooltipContent>
              <u>Important:</u>
              <p>Select the client that provided the leads.</p>
              <i>(Sélectionnez le client qui a fourni les leads.)</i>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <DropdownMenuContent className="w-56 mt-[6.5rem]" side="right">
        <DropdownMenuLabel>OMNI Clients</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {CLIENTS.map((client) => (
            <DropdownMenuSub key={client.section}>
              <DropdownMenuSubTrigger disabled={client.section == "ENERGIE"}>
                {client.section == "BYTEL" && (
                  <SatelliteDish className="mr-2 h-4 w-4" />
                )}
                {client.section == "ORANGE" && (
                  <Antenna className="mr-2 h-4 w-4" />
                )}
                {client.section == "SFR" && <Rss className="mr-2 h-4 w-4" />}
                {client.section == "FREE" && (
                  <RadioTower className="mr-2 h-4 w-4" />
                )}
                {client.section == "ENERGIE" && (
                  <Zap className="mr-2 h-4 w-4" />
                )}
                <span>{client.section}</span>
              </DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    className="max-h-44 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
                    value={clientkey as TClients}
                    onValueChange={(value) =>
                      onSelect(value as TClients, client.section as TSection)
                    }
                  >
                    {client.campagne.map((item) => (
                      <DropdownMenuRadioItem key={item.key} value={item.key}>
                        <span>{item.name}</span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
