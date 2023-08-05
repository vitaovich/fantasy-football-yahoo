
const Container: React.FC<{ title?: string, children?: React.ReactNode, className?: string }> = (props) => {
    return (
        <div className={`m-2 border border-2 border-gray-300 p-4 rounded-md ${props.className}`}>
            {props.title && (
                <h1 className='grow text-center text-xl border-b border-gray-400 py-2 mb-4'>{props.title}</h1>
            )}
            {props.children}
        </div>
    );
}

export default Container;