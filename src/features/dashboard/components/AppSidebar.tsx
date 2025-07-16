import { NavMain } from "@/features/dashboard/components/NavMain";
import { NavUser } from "@/features/dashboard/components/NavUser";
import { TeamSwitcher } from "@/features/dashboard/components/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useGetUserTeams } from "../hooks/useGetUserTeams";
import { useGetTeamBoards } from "@/features/boards/hooks/useGetTeamBoards";
import { Table } from "lucide-react";
import { useActiveTeamStore } from "@/shared/stores/useActiveTeamStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const activeTeam = useActiveTeamStore((s) => s.activeTeam);
  const userQuery = useCurrentUser();
  const teamsQuery = useGetUserTeams();

  const boardsQuery = useGetTeamBoards(activeTeam?.teamData._id);

  const navData = activeTeam?.teamData._id
    ? [
        {
          title: "Boards",
          url: `boards`,
          icon: Table,
          isActive: location.pathname.includes("/boards"),
          items: boardsQuery.data?.data
            ? boardsQuery.data.data.map((board) => ({
                title: board.name,
                url: `boards/${board._id}`,
              }))
            : [],
        },
      ]
    : [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teamsQuery.data?.data ?? []} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData} />
      </SidebarContent>
      <SidebarFooter>
        {userQuery.data && <NavUser user={userQuery.data.data} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
