import Image from "next/image"
import GuestAvatar from '../public/l60Hf.png'
import avatarStyle from '../styles/avatar.module.scss'
import { useEffect, useState } from "react"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"

const UploadAvatar = async (formData: any) => {
    try {
      const res = await axios.put(`http://localhost:8000/api/v1/edit-user`, formData ,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res
    } catch (error) {
      console.log(error);
    }
}

const getUserData = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/users?id=${id}`);
      return res
    } catch (error) {
      console.log(error);
    }
}

export default function PrevAvatar(props: any) {
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        getUserData(props.uid)
        .then(res => setAvatar(res?.data?.users?.Avatar))
        .catch(err => console.log(err))
    }, [avatar])

    console.log(avatar);

    const handlePrevAvatar = (e: any) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setAvatar(file);

        const formData = new FormData();
        formData.append('image', file)
        formData.append('id', props.uid)

        UploadAvatar(formData)
        .then(res => setAvatar(res?.data?.image?.filename))
        .catch(err => console.log(err))
    }

    const CheckImage = (path: string) =>  {
        axios
          .get(path)
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
    }

    

    return (
        <div className='flex justify-center relative'>
            <label className={avatarStyle['input-avatar']}>
                <FontAwesomeIcon icon={faCamera} className="dark:text-gray-600"/>
                <input type="file" id="file-input" onChange={handlePrevAvatar} className="hidden" />
            </label>
            {
                avatar ?
                    <img src={`http://localhost:8000/images/${avatar}`} alt="avatar user preview" className={avatarStyle.avatar} />
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