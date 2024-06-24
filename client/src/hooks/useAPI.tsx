// import {
//     MusicWithUserTypes,
//     UserStateTypes,
//   } from "@/interfaces/types/index.interfaces";
//   import { getMusic } from "@/services/music/music.service";
//   import { useEffect, useState } from "react";
//   import { useSelector } from "react-redux";

//   export default function useAPIHook<T>() {
//     const [artistLists, setArtistLists] =T: useState<T>();
//     const [musicLists, setMusicLists] = useState<MusicWithUserTypes[]>([]);

//     const { id } = useSelector((state: any) => state.user);

//     const getHomeMusicDetails = async () => {
//       try {
//         const res = await getMusic(id);
//         console.log(res);
//         let data = res.data.data;
//         setMusicLists(data.songs);
//         setArtistLists(data.users);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     useEffect(() => {
//       getHomeMusicDetails();
//     }, []);
//     return { artistLists, musicLists };
//   }
