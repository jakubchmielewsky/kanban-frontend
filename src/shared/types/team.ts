export interface Team {
  role: "owner" | "admin" | "member";
  teamData: {
    _id: string;
    name: string;
    logo?: string; // URL to the logo image
    description?: string;
  };
}
