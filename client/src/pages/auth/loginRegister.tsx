import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RegisterTab from "@/components/auth/registerTab";
import LoginTab from "@/components/auth/loginTab";
import store from "@/redux/store/reduxStore";
import { IUserWithAccessToken } from "@/interfaces/user.interfaces";
import { setData } from "@/redux/slice/userSlice";

export default function LoginRegister() {
  const url = useLocation().pathname;
  console.log(url);

  const [searchParams] = useSearchParams();

  console.log(searchParams);

  const navigate = useNavigate();
  const data = searchParams.get("user");

  let userData: IUserWithAccessToken;

  useEffect(() => {
    if (data) {
      userData = JSON.parse(data);
      if (userData && searchParams.get("googleOauth") === "true") {
        console.log("pass");
        store.dispatch(setData(userData));
        navigate("/");
        console.log("pas");
      }
    }
  }, [navigate, searchParams, data]);

  // if (userData) {
  //   try {
  //     const parsedUserData = JSON.parse(userData);
  //     console.log(parsedUserData);
  //   }
  // }
  const [currentTab, setCurrentTab] = useState<string>(url);
  console.log(currentTab);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    navigate(tab);
  };

  return (
    <div className="w-full h-screen  flex flex-col justify-center items-center">
      <Tabs value={currentTab} className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="/login" onClick={() => handleTabChange("/login")}>
            Login
          </TabsTrigger>
          <TabsTrigger
            value="/register"
            onClick={() => handleTabChange("/register")}
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="/login" className="">
          <LoginTab />
        </TabsContent>
        <TabsContent value="/register" className="p-4">
          <RegisterTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
