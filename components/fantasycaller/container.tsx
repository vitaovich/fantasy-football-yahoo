
const Container: React.FC<{ title?: string, children?: React.ReactNode }> = (props)=>
{
    return (
        <div className="border border-2 border-gray-300 p-4 rounded-md">
            {props.title ?? (
                <h2 className='uppercase font-semibold'>{props.title}</h2>
            )}
            {props.children}
        </div>
    );
}

export default Container;