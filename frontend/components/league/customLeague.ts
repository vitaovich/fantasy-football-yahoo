import LeagueType from "./LeagueType";

class CustomLeague {
    leagueType: LeagueType;

    constructor(leagueType: LeagueType) {
        this.leagueType = leagueType;
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