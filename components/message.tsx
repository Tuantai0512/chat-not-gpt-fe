import message from "../styles/message.module.scss"

export default function Message (props:any) {
    return(
        <div className={`w-full flex ${ props.own === props.message.sender ? 'justify-end' : 'justify-start'} py-2`}>
            <span className={`${ props.own === props.message.sender ? 'bg-sky-500' : 'bg-gray-200 dark:text-black'} block px-4 py-1 w-max ${message.messageText}`}>{props.message.text}</span>     
        </div>
    )
}