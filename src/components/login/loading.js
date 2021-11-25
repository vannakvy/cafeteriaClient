import { Image } from 'antd'
import React from 'react'
import LoadingGif from '../../asset/gif/loading.gif'
import Logo from '../../asset/img/logo.png'
import FadeIn from 'react-fade-in'

export default function Loading() {

    return (
        <FadeIn>
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    position: "relative",
                    backgroundImage: "linear-gradient(to top right, #0b82c3, #a7499a)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >

                    <Image
                        src={LoadingGif}
                        alt="loading"
                        width="300px"
                        preview={false}
                    />
                    <div
                        style={{
                            position: "absolute",
                            padding: "8px 8px 2px 8px",
                            backgroundColor: "white",
                            top: "13px",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            borderRadius: 100,
                            boxShadow: "1px 1px 5px #b2b2b2"
                        }}
                    >
                        <Image
                            src={Logo}
                            width="50px"
                            preview={false}
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
