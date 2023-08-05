class TeamOutcome {
    wins: number;
    losses: number;
    ties: number;

    constructor(wins:number, losses:number, ties:number) {
        this.wins = wins;
        this.losses = losses;
        this.ties = ties;
    }

     getWinloss() {
        return `${this.wins}-${this.losses}-${this.ties}`;
    }
}
 export default TeamOutcome;