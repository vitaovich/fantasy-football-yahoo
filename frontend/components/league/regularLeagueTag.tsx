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


    const settingIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2742 5.23078 16.5132 5.38736 16.7429 5.557L18.5809 4.972C19.0286 4.82967 19.515 5.01816 19.7499 5.425L21.5699 8.578C21.8023 8.98548 21.7223 9.49951 21.3769 9.817L19.9519 11.117C20.0167 11.7059 20.0167 12.3001 19.9519 12.889L21.3769 14.189C21.7223 14.5065 21.8023 15.0205 21.5699 15.428L19.7499 18.581C19.515 18.9878 19.0286 19.1763 18.5809 19.034L16.7429 18.449C16.5103 18.6203 16.2687 18.7789 16.0189 18.924C15.7567 19.0759 15.4863 19.2131 15.2089 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM11.9959 8C9.78678 8 7.99592 9.79086 7.99592 12C7.99592 14.2091 9.78678 16 11.9959 16C14.2051 16 15.9959 14.2091 15.9959 12C15.9959 9.79086 14.2051 8 11.9959 8Z" fill="black"/> </svg>
    
    return (
        <>
            <button onClick={openModal} className="bg-gray-300 p-2 rounded-full text-white">
                {settingIcon}
            </button>
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