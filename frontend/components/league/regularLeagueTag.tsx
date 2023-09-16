import { useState } from "react";
import Modal from "../utils/modal";
import LeagueType from "./LeagueType";
import useSelect from "@/hooks/use-select";
import CustomLeague from "./customLeague";


const RegularLeagueTag: React.FC<{ onUpdateLeague: (nextLeague: CustomLeague) => void }> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        value: enteredLeagueType,
        isValid: enteredLeagueTypeIsValid,
        hasError: leagueTypeInputHasError,
        valueChangeHandler: leagueTypeChangedHandler,
        inputBlurHandler: leagueTypeBlurHandler,
        reset: resetLeagueTypeInput
    }
        = useSelect(LeagueType.Regular, value => value.trim() !== '');

    let formIsValid = false;

    if (enteredLeagueTypeIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (!formIsValid) {
            // props.formValidHandler(false)
            return
        }
        setIsModalOpen(false);

        props.onUpdateLeague(new CustomLeague(enteredLeagueType as LeagueType))
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const leagueSelectId = "leagueType";
    const leagueTypeSelect = <select
        id={leagueSelectId}
        value={enteredLeagueType}
        onChange={leagueTypeChangedHandler}
    >
        {Object.keys(LeagueType).map((key) => (
            <option key={key} value={key as LeagueType}>
                {key}
            </option>
        ))

        }
    </select>

    return (
        <>
            <button onClick={openModal} className="bg-gray-400 px-2 rounded-full text-white">O</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-col space-y-4">
                    <h1 className="text-xl text-bold">Create a Custom League</h1>
                    <hr></hr>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="flex flex-row space-x-4">
                            <label htmlFor={leagueSelectId}>Choose a league type:</label>
                            {leagueTypeInputHasError && <p className="text-StrawberryRed">{"Please select a value"}</p>}
                            {leagueTypeSelect}
                        </div>
                        <div className="flex flex-row justify-between md:justify-end space-x-4">
                            {/* <button onClick={props.onTagClick} className="bg-green-400 px-2 rounded-full text-white">Create</button> */}
                            <button className="bg-red-400 px-2 rounded-full text-white" onClick={closeModal}>Cancel</button>
                            <button type="submit" className="bg-green-400 px-2 rounded-full text-white">Submit</button>
                        </div>
                    </form>
                </div>

            </Modal>
        </>
    );
}

export default RegularLeagueTag;