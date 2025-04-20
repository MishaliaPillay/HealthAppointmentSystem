 "use client";

 import { Layout, Button, Dropdown, Space, MenuProps } from "antd";
 import {
   UserOutlined,
   MenuFoldOutlined,
   MenuUnfoldOutlined,
 } from "@ant-design/icons";
 import Link from "next/link";
 import { useUserState } from "@/providers/users-provider";
 import { useRouter } from "next/navigation";
 import { getRole } from "@/utils/decoder";
 import { useEffect, useState } from "react";

 const { Header: AntHeader } = Layout;

 interface HeaderProps {
   collapsed: boolean;
   setCollapsed: (collapsed: boolean) => void;
 }

 const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
   const router = useRouter();
   const { currentUser } = useUserState();
   const [role, setRole] = useState<string | null>(null);

   useEffect(() => {
     const token = sessionStorage.getItem("jwt");
     if (!token) {
       router.push("/");
       return;
     }

     const userRole = getRole(token);
     setRole(userRole);
   }, []);

   const signOutUser = () => {
     sessionStorage.removeItem("jwt");
     router.push("/");
   };

   const items: MenuProps["items"] = [
     {
       key: "profile",
       label: <Link href={`/${role}-dashboard/profile`}>Profile</Link>,
     },
     {
       key: "logout",
       label: (
         <Button type="text" onClick={signOutUser} style={{ padding: 0 }}>
           Logout
         </Button>
       ),
     },
   ];

   return (
     <AntHeader
       style={{
         padding: "0 20px",
         display: "flex",
         alignItems: "center",
         justifyContent: "space-between",
       }}
     >
       <Button
         type="text"
         icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
         onClick={() => setCollapsed(!collapsed)}
         style={{ color: "white" }}
       />

       <Dropdown menu={{ items }} placement="bottomRight">
         <Space style={{ cursor: "pointer", color: "white" }}>
           <span className="hidden sm:inline">{currentUser?.name}</span>
           <UserOutlined />
         </Space>
       </Dropdown>
     </AntHeader>
   );
 };

 export default Header;
