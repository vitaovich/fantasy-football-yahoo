const Modal: React.FC<{ isOpen: boolean, onClose: () => void, children?: React.ReactNode }> = (props) => {
    return (
        <>
            {props.isOpen && (
                <div className="flex justify-center items-center bg-gray-500/50 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <div className="flex flex-col bg-white rounded-lg shadow p-2">
                            <div className="p-4">{props.children}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;