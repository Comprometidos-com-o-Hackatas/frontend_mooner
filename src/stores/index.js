import { useSignUpStore } from "./user/signup";
import { useLoginStore } from "./user/login";
import { useLunnaIAStore } from "./IA/luuna";
import { useHistoryStore } from "./history/history";
import { useNavigationStore } from "./navigation/navigation";
import { useSongStore } from "./mooner/song";
import { usePlaylistStore } from "./mooner/playlists";
import { useUserStore } from "./user/user";
import { useArtistStore } from "./user/artist";
import { useFollowingStore } from "./user/following";
import { useCommunityStore } from "./mooner/community";
import { useLikedSongStore } from "./mooner/likedSong";
import { useArtistProgress } from "./becomeartist/beartistprogress";
import { useDocumentStore } from "./file/document";
import { useGenreStore } from "./genre/genre";
import { useImgStore } from "./file/image";
import { usePaymentStore } from "./payments/payment";
import { useQueueStore } from "./mooner/queue";
import { useAlbumStore } from "./mooner/albuns";
import { usePlayerStore } from "./mooner/player";
import { useMoonStore } from "./mooner/moonWave";

export {
    useSignUpStore,
    useLoginStore,
    useLunnaIAStore,
    useHistoryStore,
    useNavigationStore,
    useSongStore,
    usePlaylistStore,
    useUserStore,
    useArtistStore,
    useFollowingStore,
    useCommunityStore,
    useLikedSongStore,
    useQueueStore,
    useAlbumStore,
    useArtistProgress,
    useDocumentStore,
    useImgStore,
    useGenreStore,
    usePaymentStore,
    usePlayerStore,
    useMoonStore,
}