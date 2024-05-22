import Loading from "@/components/Loading";
import instance from "@/config/axiosConfig";
import { CLAN_SERVICE_URL, USER_SERVICE_URL } from "@/constants/service_urls";
import { logout, setUser } from "@/redux/reducers/userSlice";
import { RootState } from "@/redux/store/store";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function JoinClan() {
  const [clanData, setClanData] = useState<IClanData | null>(null);
  const { clanId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const fetchClanData = async () => {
      try {
        setLoading(true);
        const response = await instance.get(
          `${CLAN_SERVICE_URL}/get-info/${clanId}`
        );
        setClanData(response.data);
      } catch (error: any) {
        if (error.status === 401 || error.status === 403) {
          dispatch(logout());
        } else if (error.status >= 400 && error.status < 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on our side..");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchClanData();
  }, [user]);
  const joinClanButtonClickHandler = async () => {
    try {
      setLoading(true);
      const response = await instance.patch(
        `${CLAN_SERVICE_URL}/user/join/${clanId}`
      );
      if (response.status === 200) {
        toast.success("You have joined the clan");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
        navigate("/clan");
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      } else if (error.status >= 400 && error.status < 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on our side..");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Loading loading={loading}></Loading>
      <div className="page-padding text-white h-[95vh] flex items-center">
        <div className="dark:text-white bg-dark-300 rounded-lg w-full h-full  p-5 px-10">
          <div className="flex items-center justify-center gap-5 flex-col">
            <div className="flex-col flex justify-center items-center gap-2">
              <img
                src={clanData?.clanBadgeImageUrl}
                className="w-20 h-20 rounded-lg"
              ></img>
              {/* <div className="flex w-full justify-center"> */}
              <h2 className="font-bold text-2xl text-center">
                {clanData?.clanName}
              </h2>
            </div>
            <div className="">
              <p className="text-xl">{clanData?.members.length} Members</p>
            </div>
            <div className="">
              <p className="text-gray-500">
                Created at : {clanData?.createdAt}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            {user?.clanId == clanId ? (
              <div className="flex flex-col gap-5">
                <h3 className="font-bold text-xl">
                  You are already a member in this clan
                </h3>
                <Link
                  to={"/"}
                  className="border border-primary font-bold hover:bg-primary rounded p-2 hover:text-white text-primary transition-colors text-center"
                >
                  Home
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-5 items-center justify-center">
                  <h3 className="font-bold text-xl">
                    You have been invited to join this clan..
                  </h3>
                  <div>
                    <button
                      onClick={joinClanButtonClickHandler}
                      className="border border-primary font-bold hover:bg-primary rounded p-2 hover:text-white text-primary transition-colors text-center"
                    >
                      Join Clan
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinClan;
