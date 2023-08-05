
const Container: React.FC<{ title?: string, children?: React.ReactNode, className?: string }> = (props) => {
    return (
        <div className={`border border-2 border-gray-300 p-4 rounded-md ${props.className}`}>
            {props.title && (
                <h1 className='uppercase semi-bold'>{props.title}</h1>
            )}
            {props.children}
        </div>
    );
}

export default Container;