import { Flex } from "@chakra-ui/react"
import React from "react";
import InstagramPost from "./InstagramPost";


const IgPostsBanner = () => {
    const posts = ['https://www.instagram.com/p/CGASOtZDaI9/', 
        'https://www.instagram.com/p/CEcoau6DD5B/',
        'https://www.instagram.com/p/CB3vEeijirk/',
        'https://www.instagram.com/p/CIENvHTj3az/',
        'https://www.instagram.com/p/CAiZeKLDDmj/',   
    ];
    return (
        <>
            <Flex 

                flexDir="row"
                width="100%"
            >
                {posts.map( (post) => (
                    <InstagramPost url={post} />
                )  
                )}
            </Flex>
        </>
    );
}

export default IgPostsBanner;