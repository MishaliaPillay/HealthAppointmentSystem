"use client";

import React, {useEffect } from "react";
import { useRouter } from "next/navigation";

interface LayoutProps {
    children: React.ReactNode
}//prop type for layout pages 

const withAuth = (WrappedLayout: React.ComponentType<LayoutProps>) => {

    const WithAuthWrapper=(props:LayoutProps)=>{
        const router = useRouter();
        useEffect(()=>{
            const token=sessionStorage.getItem("jwt")
            if(!token){
            router.push("/login")
            return
            }
            //spillting token by .
            const [,payload]=token.split('.');
            //Decoding Base64 string
            const [decodedpayload]=atob(payload);
            //turn the payload into an object 
            const decodeObj=JSON.parse(decodedpayload);
            const {role}=decodeObj;
            
            if(decodeObj === 'provider'){
                router.push("/provider-dashboard")
            }else if (role === "paitient"){
                router.push("/paitientdashboard")
            }else{
                router.push("/login")
            }
        },[router])
      //return the wrappedcompoenent if there no need for redirection

      return <WrappedLayout {...props}/>
    }

    return WithAuthWrapper;
 
};

export default withAuth;