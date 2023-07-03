import Image from "next/image"
import GuestAvatar from '../public/l60Hf.png'
import avatarStyle from '../styles/avatar.module.scss'
import { useEffect, useState } from "react"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function PrevAvatar() {
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar?.preview)
        }
    }, [avatar])

    const handlePrevAvatar = (e: any) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setAvatar(file);
    }

    return (
        <div className='flex justify-center relative'>
            <label className={avatarStyle['input-avatar']}>
                <FontAwesomeIcon icon={faCamera} className="dark:text-gray-600"/>
                <input type="file" id="file-input" onChange={handlePrevAvatar} className="hidden" />
            </label>
            {
                avatar ?
                    <img src={avatar.preview} alt="avatar user preview" className={avatarStyle.avatar} />
                    :
                    <Image
                        src={GuestAvatar}
                        alt='user profile picture'
                        className={avatarStyle.avatar}
                    />

            }
        </div>
    )
}