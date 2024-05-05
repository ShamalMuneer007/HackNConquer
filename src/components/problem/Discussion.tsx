import instance from "@/config/axiosConfig";
import { DISCUSSION_SERVICE_URL } from "@/constants/service_urls";
import { IDiscussionData } from "@/interfaces/IDiscussionData";
import { IProblemData } from "@/pages/admin/AdminProblems";
import { useEffect, useState } from "react";
import StartDiscussionModal from "./StartDiscussionModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";
import profileIcon from "/profile-icon.png";
import {
  FaArrowRightLong,
  FaComment,
  FaComments,
  FaCross,
} from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { AxiosError } from "axios";
import { IDiscussionCommentData } from "@/interfaces/IDiscussionCommentData";
interface Props {
  problemData: IProblemData;
}
function Discussion({ problemData }: Props) {
  const [problemDiscussions, setProblemDiscussions] = useState<
    IDiscussionData[]
  >([]);
  const [addCommentLoader, setAddCommentLoader] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [showStartDiscussionModal, setShowStartDiscussionModal] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState<string[]>([]);
  const [showCommentsCount, setShowCommentsCount] = useState(4);

  useEffect(() => {
    const fetchProblemDiscussionData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `${DISCUSSION_SERVICE_URL}/get-problem-discussions/${problemData.problemId}`
        );
        console.log("Problem Discussion Data Fetch Response : ", response);
        if (response.status === 200 && response.data) {
          setProblemDiscussions(
            response.data.map((discussion: IDiscussionData) => ({
              ...discussion,
              showFullContent: false,
              showComments: false,
            }))
          );
        }
      } catch (error: any) {
        console.error(error);
        if (error.response) {
          if (error.response.status >= 400 && error.response.status < 500) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong on our side..");
          }
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProblemDiscussionData();
  }, [problemData, showStartDiscussionModal]);
  const startDiscussionClickHandler = () => {
    setShowStartDiscussionModal(true);
  };
  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) {
      return content;
    }
    return `${content.slice(0, maxLength)}...`;
  };
  const addComment = (index: number) => {
    const commentSubmissionData: IDiscussionCommentData = {
      comment: newComment[index],
      problemId: problemData.problemId,
      username: user?.username,
      discussionId: problemDiscussions[index].discussionId,
      userId: user?.userId,
    };
    setAddCommentLoader(true);
    instance
      .post(
        `${DISCUSSION_SERVICE_URL}/user/comment-discussion`,
        commentSubmissionData
      )
      .then((response) => {
        setNewComment((comment) => {
          const updatedComment = [...comment];
          updatedComment[index] = "";
          return updatedComment;
        });
        problemDiscussions[index].comments.push(commentSubmissionData);
        toast.success("comment has been added");
        setAddCommentLoader(false);
      })
      .catch((error: AxiosError<{ message: string }>) => {
        setAddCommentLoader(false);
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 401 || statusCode === 403) {
            toast.error("Token expired");
          } else if (statusCode >= 400 || statusCode < 500) {
            toast.error(error.response.data?.message);
          } else {
            toast.error("Something went wrong on our side");
          }
        } else {
          toast.error(error.message);
        }
      });
  };

  const toggleShowFullContent = (index: number) => {
    setProblemDiscussions((prevDiscussions) => {
      return prevDiscussions.map((discussion, i) => {
        if (i === index) {
          return {
            ...discussion,
            showFullContent: !discussion.showFullContent,
          };
        }
        return discussion;
      });
    });
  };
  const toggleShowComments = (index: number) => {
    setProblemDiscussions((prevDiscussions) => {
      return prevDiscussions.map((discussion, i) => {
        if (i === index) {
          if (discussion.showComments) {
            setShowCommentsCount(4);
          }
          return {
            ...discussion,
            showComments: !discussion.showComments,
          };
        } else {
          return {
            ...discussion,
            showComments: false,
          };
        }
      });
    });
  };

  const increaseShowCommentsCount = () => {
    setShowCommentsCount((prevCount) => prevCount + 4);
  };
  return (
    <div className="text-white">
      <>
        {showStartDiscussionModal && (
          <StartDiscussionModal
            problemId={problemData.problemId}
            setShowModal={setShowStartDiscussionModal}
          />
        )}
      </>
      <div className="mt-10 px-10">
        <h3 className="font-bold text-3xl">Discussions</h3>
      </div>
      {loading ? (
        <div className="w-full h-80 flex justify-center items-center overflow-hidden">
          <Rings
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="relative">
          <div className="w-full h-20 pt-10 justify-center">
            {problemDiscussions && problemDiscussions.length > 0 ? (
              problemDiscussions.map((discussion, index) => (
                <div className="p-10 pt-0" key={index}>
                  <div className="flex justify-between font-bold my-4">
                    <div className="flex items-center gap-2">
                      <img src={profileIcon} className="rounded-full w-9"></img>
                      {discussion.username}
                    </div>
                    <p>{discussion.startedAt}</p>
                  </div>
                  <div className="p-2 pb-0">
                    <div className="font-bold pb-1">{discussion.title}</div>
                    <div className="flex flex-wrap">
                      {discussion.showFullContent
                        ? discussion.discussionContent
                        : truncateContent(discussion.discussionContent, 100)}
                      {!discussion.showFullContent &&
                        discussion.discussionContent.length > 100 && (
                          <button
                            className="text-primary hover:underline"
                            onClick={() => toggleShowFullContent(index)}
                          >
                            Read More
                          </button>
                        )}
                      {discussion.showFullContent && (
                        <button
                          className="text-primary hover:underline"
                          onClick={() => toggleShowFullContent(index)}
                        >
                          Read Less
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end me-6 ">
                    <button
                      className="relative"
                      onClick={() => toggleShowComments(index)}
                    >
                      {!discussion.showComments ? (
                        <>
                          <FaComments />
                          <div className="rounded-full bg-dark-300 text-sm w-5 text-center text-primary absolute -top-4 -right-2">
                            {discussion.comments.length}
                          </div>{" "}
                        </>
                      ) : (
                        <>
                          <IoIosClose className="text-lg hover:text-red-700" />
                        </>
                      )}
                    </button>
                  </div>
                  {discussion.showComments && (
                    <div className="mt-4">
                      {discussion.comments
                        .slice(0, showCommentsCount)
                        .map((comment, commentIndex) => (
                          <div
                            key={commentIndex}
                            className="bg-blue-gray-900 m-5 rounded p-5"
                          >
                            <div className="flex items-center mb-2 ">
                              <img
                                src={profileIcon}
                                className="rounded-full w-6 mr-2"
                              />
                              <p className="font-bold">{comment.username}</p>
                            </div>
                            <div className="flex flex-wrap">
                              {comment.comment}
                            </div>
                          </div>
                        ))}
                      {discussion.comments.length > showCommentsCount && (
                        <button
                          className="text-primary pb-2 hover:underline"
                          onClick={() => increaseShowCommentsCount()}
                        >
                          Show More Comments
                        </button>
                      )}
                      <div className="flex items-center h-full">
                        <textarea
                          placeholder="Add a comment"
                          className="focus:border focus:outline-none focus:border-primary bg-dark-400 rounded-lg flex items-center p-2 w-[93%] h-full"
                          value={newComment[index]}
                          onChange={(e) =>
                            setNewComment((newComments) => {
                              const updatedComment = [...newComments];
                              updatedComment[index] = e.target.value;
                              return updatedComment;
                            })
                          }
                        />
                        <div className="h-full">
                          <button
                            className=" text-primary rounded-full h-full p-2"
                            onClick={() => addComment(index)}
                            disabled={addCommentLoader}
                          >
                            {addCommentLoader ? (
                              <>
                                <div className="flex justify-center">
                                  <p className="animate-spin text-center w-6 h-6 border-2 border-primary rounded-full border-t-transparent"></p>
                                </div>
                              </>
                            ) : (
                              <FaArrowRightLong />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="h-[55vh] text-center flex items-center justify-center">
                <p>No Discussions for this problem</p>
              </div>
            )}
            {
              <div className="sticky bottom-0 bg-dark-100 left-0 right-0 py-4 px-6">
                <button
                  onClick={startDiscussionClickHandler}
                  className="w-full bg-primary text-black  rounded-md py-2 px-4 focus:outline-none"
                >
                  Start a discussion
                </button>
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Discussion;
