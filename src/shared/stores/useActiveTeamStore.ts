import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Team } from "../types/team";

interface ActiveTeamState {
  activeTeam: Team | null;
  setActiveTeam: (team: Team | null) => void;
}

export const useActiveTeamStore = create<ActiveTeamState>()(
  persist(
    (set) => ({
      activeTeam: null,
      setActiveTeam: (team) => set({ activeTeam: team }),
    }),
    {
      name: "active-team",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
