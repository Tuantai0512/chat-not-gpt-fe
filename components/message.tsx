import message from "../styles/message.module.scss"

export default function Message (props:any) {
    return(
        <div className={`w-full flex ${ props.own ? 'justify-end' : 'justify-start'} py-2`}>
            <span className={`${ props.own ? 'bg-sky-500' : 'bg-gray-200'} block px-4 py-1 w-max ${message.messageText}`}>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</span>     
        </div>
    )
}