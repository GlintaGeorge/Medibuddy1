import { useEffect } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useAppSelector } from "../redux/store/Store";
import { ReactNode } from "react";

export const ZegoCloud = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.UserSlice);

  useEffect(() => {
    const userID = user.id;
    const userName = user.name;
    const appID = 776225947;
    const serverSecret = '2c92722a5b1c4470fd0709decb137d9b';
    //@ts-ignore
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    // Add any additional setup or event handling here
  }, [user]);

  return children;
}

export default ZegoCloud;
