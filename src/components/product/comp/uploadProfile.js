import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../../api/config';
import { useMutation } from '@apollo/client';
import { GET_ALL_PRODUCT, UPDATE_PRODUCT } from '../../../graphql/product';
import { mutationCallBackFn } from '../../../functions/fn';

export default function UploadProfile({type, imageUrl, setImageUrl, pid, onCloseFn }) {
    const [updateProducts] = useMutation(UPDATE_PRODUCT, mutationCallBackFn(GET_ALL_PRODUCT, 'getProducts'))

    const [loading, setLoading] = useState(false)

    const handleChange = async info => {
        setLoading(true)

        const storageRef = ref(storage, `Product/${pid}`);
        const metadata = {
            contentType: 'image/jpeg',
        };

        const uploadTask = await uploadBytesResumable(storageRef, info.file, metadata);

        uploadTask.task.on('state_changed',
            () => {},
            (error) => {
                console.log(error)
            },
            () => {
                console.log(pid)
                getDownloadURL(uploadTask.ref).then((downloadURL) => {
                    updateProducts({
                        variables: {
                            input: {
                                id: pid,
                                image: downloadURL
                            }
                        },
                        update(_,result){
                            setImageUrl(downloadURL)
                            setLoading(false)
                            if(type === "add"){
                                onCloseFn()
                            }
                        }
                    })
                });
            }
        );
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>បញ្ចូលរូបភាព</div>
        </div>
    );
    return (
        <ImgCrop rotate>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={e => handleChange(e)}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </ImgCrop>
    );
}