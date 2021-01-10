import { Box, Image, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { InstagramMedia } from 'react-instagram-media'
import { instagramMediaParser } from 'react-instagram-media'

interface postProps {
    url: string
}

const InstagramPost: React.FC<postProps> = ({...props}) => {
    const [post, usePost] = useState(null);
    
    !post && instagramMediaParser({ uri: props.url })
    .then(post => {
        console.log(post.description);
        usePost(post);
    });

    useEffect(() =>  {
        console.log(post);
        console.log('useeffect')  
    }, [])
    


    return (
        <> 
            <Link
                width="20%"
                flexGrow={1}
                href={props.url} isExternal
            >
                <Box 
                    w="100%"
                    objectFit="contain"
                > 

                {post? 
                    (post.media[0].type=='image')?
                        <Image 
                            src={post.media[0].display_url}
                        /> :
                        <video poster={post.media[0].display_url} controls>
                            <source src={post.media[0].video_url} type="video/mp4" />
                        </video> 
                : <></>
                }
                    {/* <InstagramMedia
                        uri={props.url}
                        renderItem={
                            ({ display_url, video_url, type, caption }) => {
                            if (type === 'video') {
                                return (
                                <video poster={display_url} controls>
                                    <source src={video_url} type="video/mp4" />
                                </video>
                                )
                            }
                            return (
                                <img
                                src={display_url}
                                alt={caption}
                                />
                            )
                            }
                        }
                        renderMediaList={children => (
                            <div className="swiper">
                            {children}
                            </div>
                        )}
                        renderError={() => (
                            <div>I have failed to parse it</div>
                        )}
                        renderLoading={() => (
                            <div>Loading</div>
                        )}
                    /> */}
                </Box>
            </Link>
        </>
    );
}

export default InstagramPost;