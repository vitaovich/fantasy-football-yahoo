
namespace FantasyFootbal.Models
{
    public class LeagueDocument
    {
        public string id { get; set; }
        public League League { get; set; }
    }
    public class League
    {
        public string id { get; set; }
        public string name { get; set; }
        public string message { get; set; }

        public List<Team> Teams { get; set; }
    }

    public class Team
    {
        public string TeamId { get; set; }

    }
}