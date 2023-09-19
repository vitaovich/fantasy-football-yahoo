import LeagueType from "./LeagueType";

class CustomLeague {
    leagueType: LeagueType;
    Teams: string[]

    constructor(leagueType: LeagueType, teams?: string[]) {
        this.leagueType = leagueType;
        this.Teams = teams ?? [];
    }

    get LeagueTypeName() {
        switch(this.leagueType)
        {
            case(LeagueType.Tattoo): {
                return "Tattoo";
            }
            case(LeagueType.Regular): {
                return "Regular";
            }
            default: {
                return "No league.";
            }
        }
    }
}
 export default CustomLeague;