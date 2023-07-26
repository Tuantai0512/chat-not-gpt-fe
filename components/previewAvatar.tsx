import Image from "next/image"
import GuestAvatar from '../public/l60Hf.png'
import avatarStyle from '../styles/avatar.module.scss'
import { useState } from "react"
import { useDispatch} from "react-redux";
import { saveData } from "../stores/actions/userActions";
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"

const UploadAvatar = async (formData: any) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}edit-avatar`, formData ,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res
    } catch (error) {
      console.log(error);
    }
}

export default function PrevAvatar(props: any) {
    const [avatar, setAvatar] = useState(props.userAvatar);

    const dispatch = useDispatch();

    const handlePrevAvatar = (e: any) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setAvatar(file);

        dispatch(saveData(avatar))

        const formData = new FormData();
        formData.append('image', file)
        formData.append('id', props.uid)

        UploadAvatar(formData)
        .then(res => {
          setAvatar(res?.data?.image?.filename)
          dispatch(saveData(res?.data?.image?.filename));
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='flex justify-center relative'>
            <label className={avatarStyle['input-avatar']}>
                <FontAwesomeIcon icon={faCamera} className="dark:text-gray-600"/>
                <input type="file" id="file-input" onChange={handlePrevAvatar} className="hidden" />
            </label>
            {
                avatar ?
                    <img src={`${process.env.NEXT_PUBLIC_URL_BACKEND}images/${avatar}`} alt="avatar user preview" className={avatarStyle.avatar} />
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