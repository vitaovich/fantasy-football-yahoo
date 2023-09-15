import Image from 'next/image'
import CustomLeague from './customLeague';
import LeagueType from './LeagueType';

const CustomLeagueTags: React.FC<{ customLeague: CustomLeague | undefined, onTagClick: () => void  }> = (props) => {
    const customLeague = props.customLeague;

    const leagueTag = GetLeagueTag(customLeague)

    function GetLeagueTag(customLeague: CustomLeague | undefined)
    {
        switch(customLeague?.leagueType) {
            case(LeagueType.Tattoo): {
                return <p className='bg-blue-400 px-4 rounded-full text-white'>{customLeague.LeagueTypeName}</p>
            }
            case(LeagueType.Regular): {
                return <button onClick={props.onTagClick} className="bg-green-400 px-2 rounded-full text-white">Create</button>
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