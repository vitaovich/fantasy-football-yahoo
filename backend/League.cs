
namespace FantasyFootball.Models
{
    public enum LeagueType 
    {
        Yahoo
    }

    public class LeagueDocument
    {
        public string id { get; set; }

        public League League { get; set; }
    }

    public class League
    {
        public LeagueType LeagueType {get;set;}
        public string Year { get; set; }
        public string name { get; set; }
        public string message { get; set; }
        public List<Team> Teams { get; set; }
        public DateTime CreatedOn { get; set; }

    }

    public class Team
    {
        public string TeamId { get; set; }
        public string Pic { get; set; }
    }
}