import TeamOutcome from "./teamOutcome";

class TeamInfo {
    id: string;
    key: string;
    name: string;
    url: string;
    logoUrl?: string;
    outcome: TeamOutcome

    constructor(id: string, key:string, name: string, url: string, outcome: TeamOutcome, logoUrl?: string) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.url = url;
        this.logoUrl = logoUrl;
        this.outcome = outcome
    }
}
 export default TeamInfo;