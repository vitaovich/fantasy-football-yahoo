class TeamOutcome {
    wins: number;
    losses: number;
    ties: number;
    pointsFor: number;
    pointsAgainst: number;

    constructor(wins:number, losses:number, ties:number, pointsFor: number, pointsAgainst: number) {
        this.wins = wins;
        this.losses = losses;
        this.ties = ties;
        this.pointsFor = pointsFor;
        this.pointsAgainst = pointsAgainst;
    }

     getWinloss() {
        return `${this.wins}-${this.losses}-${this.ties}`;
    }
}
 export default TeamOutcome;