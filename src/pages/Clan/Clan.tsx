import ClanInfo from "@/components/clan/ClanInfo";
import PremiumModal from "@/components/user/modal/PremiumModal";
import instance from "@/config/axiosConfig";
import { CLAN_SERVICE_URL } from "@/constants/service_urls";
import { useDebounce } from "@/hooks/useDebounce";
import { RootState } from "@/redux/store/store";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Clan() {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [clanSearchKeyword, setClanSearchKeyword] = useState<string>("");
  const [searchResultData, setSearchResultData] = useState<null>();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const debouncedSearchKeyword = useDebounce(clanSearchKeyword, 300);
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await instance.get(
          `${CLAN_SERVICE_URL}/search?name=${clanSearchKeyword}`
        );
        console.log("User search response data : ", response.data);
        setSearchResultData(response.data);
      } catch (error: any) {
        toast.dismiss();
        console.error(error);
        if (!error.response || !error.response.data) {
          toast.error("Network error!");
          return;
        }
        if (error && error.response && error.response.data) {
          toast.error("Something went wrong while doing search");
        } else {
          toast.error(error.message);
        }
      }
    };
    if (clanSearchKeyword) {
      console.log("Searching for:", debouncedSearchKeyword);
      fetchSearchData();
    } else {
      setSearchResultData(null);
    }
  }, [debouncedSearchKeyword]);
  const searchInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClanSearchKeyword(event.target.value);
  };
  const createClanClickHandler = () => {
    if (!user?.premium) {
      setShowPremiumModal(true);
    } else {
      navigate("/clan/create");
    }
  };
  return (
    <div className="page-padding dark:text-white">
      {user && showPremiumModal && (
        <PremiumModal setModal={setShowPremiumModal} />
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaMagnifyingGlass className="text-gray-300" />
        </div>
        <input
          className="block w-full h-10 pl-10 pr-3 py-2 border focus:border-none bg-transparent rounded-md text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-primary focus:ring-primary placeholder:text-gray-400/60"
          placeholder="Search..."
          value={clanSearchKeyword}
          onChange={searchInputChangeHandler}
        />
      </div>
      {!user && (
        <div className="flex flex-col justify-center w-full h-[67vh] items-center">
          <p className="font-bold text-3xl">You are not Logged in!</p>
          <p className="font-bold text-3xl mt-5">Log in to join a clan</p>
        </div>
      )}
      {user && user.clanId ? (
        <div className="mt-20">
          <ClanInfo />
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full h-[67vh] items-center">
          <p className="font-bold text-3xl">You are not joined in any clan!</p>
          <p className="font-bold text-3xl mt-5">Join a clan</p>
          <button
            className="hover:bg-primary border mt-5 border-primary hover:text-black text-primary transition-colors rounded p-3 font-bold text-xl"
            onClick={createClanClickHandler}
          >
            Create a clan
          </button>
        </div>
      )}
    </div>
  );
}

export default Clan;
