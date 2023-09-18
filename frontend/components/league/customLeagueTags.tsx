import Image from 'next/image'
import CustomLeague from './customLeague';
import LeagueType from './LeagueType';
import RegularLeagueTag from './regularLeagueTag';

const CustomLeagueTags: React.FC<{ customLeague: CustomLeague | undefined, onUpdateLeague: (customLeague: CustomLeague) => void }> = (props) => {
    const customLeague = props.customLeague;

    const leagueTag = GetLeagueTag(customLeague)

    function GetLeagueTag(customLeague: CustomLeague | undefined) {
        switch (customLeague?.leagueType) {
            case (LeagueType.Tattoo): {
                return (
                    <button className="bg-blue-400 p-2 rounded-full text-white">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M9.024 2.783A1 1 0 0 1 10 2h4a1 1 0 0 1 .976.783l.44 1.981c.4.19.781.41 1.14.66l1.938-.61a1 1 0 0 1 1.166.454l2 3.464a1 1 0 0 1-.19 1.237l-1.497 1.373a8.1 8.1 0 0 1 0 1.316l1.497 1.373a1 1 0 0 1 .19 1.237l-2 3.464a1 1 0 0 1-1.166.454l-1.937-.61c-.36.25-.741.47-1.14.66l-.44 1.98A1 1 0 0 1 14 22h-4a1 1 0 0 1-.976-.783l-.44-1.981c-.4-.19-.781-.41-1.14-.66l-1.938.61a1 1 0 0 1-1.166-.454l-2-3.464a1 1 0 0 1 .19-1.237l1.497-1.373a8.097 8.097 0 0 1 0-1.316L2.53 9.97a1 1 0 0 1-.19-1.237l2-3.464a1 1 0 0 1 1.166-.454l1.937.61c.36-.25.741-.47 1.14-.66l.44-1.98zm6.683 7.924a1 1 0 0 0-1.414-1.414L11 12.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clip-rule="evenodd" /></svg>
                    </button>
                )
            }
            case (LeagueType.Regular): {
                return <RegularLeagueTag onUpdateLeague={props.onUpdateLeague}></RegularLeagueTag>
            }
            default:
                return <p>error</p>
        }
    }

    return (
        <>
            {customLeague && (
                <>
                    {leagueTag}
                </>
            )}
            {!customLeague && (
                <p>Loading...</p>
            )}
        </>
    );
}

export default CustomLeagueTags;