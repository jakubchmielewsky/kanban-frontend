import { ChevronsUpDown, Plus, Users } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Team } from "@/shared/types/team";
import { useActiveTeamStore } from "@/shared/stores/useActiveTeamStore";
import { useEffect } from "react";

export function TeamSwitcher({ teams }: { teams: Team[] }) {
  const { isMobile } = useSidebar();

  const { activeTeam, setActiveTeam } = useActiveTeamStore();

  useEffect(() => {
    if (teams.length > 0 && !activeTeam) {
      setActiveTeam(teams[1]);
    }
  }, [activeTeam, setActiveTeam, teams]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {/* <activeTeam.teamData.logo className="size-4" /> */}
                <Users />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeTeam?.teamData.name ?? "No team"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.teamData._id}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                {/* <div className="flex size-6 items-center justify-center rounded-md border">
                  <team.teamData.logo className="size-3.5 shrink-0" />
                </div> */}
                {team.teamData.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Create team
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
