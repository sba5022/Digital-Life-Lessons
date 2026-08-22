"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Spinner,
  Button,
  Modal,
  useOverlayState,
} from "@heroui/react";
import {
  Heart,
  Bookmark,
  Flag,
  Share2,
  CalendarDays,
  Clock3,
  Eye,
  User,
  ArrowLeft,
  MessageCircle,
  Send,
  CheckCircle2,
  CircleCheck,
} from "lucide-react";

const API_URL = "http://localhost:3001";

const PublicLessonDetailsPage = () => {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;
const { data: session, isPending } =
  authClient.useSession();
  const [lesson, setLesson] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");

  const [commentLoading, setCommentLoading] = useState(false);

  const [likeLoading, setLikeLoading] = useState(false);

  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const [reportLoading, setReportLoading] = useState(false);

//   const [reportOpen, setReportOpen] = useState(false);
const reportState = useOverlayState();
  const [reportReason, setReportReason] = useState("");

  const [shareMessage, setShareMessage] = useState("");
  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/lesson/${id}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Lesson not found");
        }

        const data = await res.json();

        setLesson(data);
      } catch (error) {
        console.error("LESSON ERROR:", error);

        setError(
          error.message || "Unable to load lesson."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  // ------------------------------------------------
  // Fetch comments
  // ------------------------------------------------

  useEffect(() => {
    if (!id) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${API_URL}/lesson/${id}/comments`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await res.json();

        setComments(data);
      } catch (error) {
        console.error(
          "COMMENTS ERROR:",
          error
        );
      }
    };

    fetchComments();
  }, [id]);

  // ------------------------------------------------
  // Reading time
  // ------------------------------------------------

  const readingTime = useMemo(() => {
    if (!lesson) return 1;

    const text = `
      ${lesson.title || ""}
      ${lesson.description || ""}
    `;

    const words = text
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    return Math.max(
      1,
      Math.ceil(words / 200)
    );
  }, [lesson]);

  // ------------------------------------------------
  // User information
  // ------------------------------------------------

 const currentUser = session?.user;

const userId = currentUser?.id || null;

const userName =
  currentUser?.name ||
  currentUser?.email ||
  "Anonymous";

const userEmail =
  currentUser?.email || null;

  // ------------------------------------------------
  // Like state
  // ------------------------------------------------

  const isLiked =
    !!userId &&
    (lesson?.likes || []).includes(userId);

  // ------------------------------------------------
  // Favorite state
  // ------------------------------------------------

  const isFavorite =
    !!userId &&
    (lesson?.favorites || []).includes(userId);

  // ------------------------------------------------
  // Like
  // ------------------------------------------------

  const handleLike = async () => {
    if (!userId) {
      alert("Please log in to like this lesson.");

      router.push("/login");

      return;
    }

    if (!lesson) return;

    try {
      setLikeLoading(true);

      const res = await fetch(
        `${API_URL}/lesson/${lesson._id}/like`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to update like"
        );
      }

      setLesson((prev) => {
        if (!prev) return prev;

        let likes = [
          ...(prev.likes || []),
        ];

        if (data.liked) {
          if (!likes.includes(userId)) {
            likes.push(userId);
          }
        } else {
          likes = likes.filter(
            (id) => id !== userId
          );
        }

        return {
          ...prev,
          likes,
          likesCount: data.likesCount,
        };
      });
    } catch (error) {
      console.error(
        "LIKE ERROR:",
        error
      );

      alert(
        "Unable to update like."
      );
    } finally {
      setLikeLoading(false);
    }
  };

  // ------------------------------------------------
  // Favorite
  // ------------------------------------------------

  const handleFavorite = async () => {
    if (!userId) {
      alert(
        "Please log in to save this lesson."
      );

      router.push("/login");

      return;
    }

    if (!lesson) return;

    try {
      setFavoriteLoading(true);

      const res = await fetch(
        `${API_URL}/lesson/${lesson._id}/favorite`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to update favorite"
        );
      }

      setLesson((prev) => {
        if (!prev) return prev;

        let favorites = [
          ...(prev.favorites || []),
        ];

        if (data.saved) {
          if (!favorites.includes(userId)) {
            favorites.push(userId);
          }
        } else {
          favorites =
            favorites.filter(
              (id) => id !== userId
            );
        }

        return {
          ...prev,
          favorites,
          saves: data.saves,
        };
      });
    } catch (error) {
      console.error(
        "FAVORITE ERROR:",
        error
      );

      alert(
        "Unable to update favorite."
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  // ------------------------------------------------
  // Report
  // ------------------------------------------------

const handleReport = async () => {
  if (!userId) {
    alert("Please log in to report a lesson.");
    router.push("/login");
    return;
  }

  if (!reportReason) {
    alert("Please select a reason.");
    return;
  }

  try {
    setReportLoading(true);

    const res = await fetch(`${API_URL}/lesson-reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lessonId: lesson._id,
       reporterUserId: userId,
  reportedUserEmail: lesson.creatorEmail,
        reason: reportReason,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Failed to report lesson"
      );
    }

    reportState.close();
    setReportReason("");

    alert("Thank you. This lesson has been reported.");
  } catch (error) {
    console.error("REPORT ERROR:", error);
    alert("Unable to report this lesson.");
  } finally {
    setReportLoading(false);
  }
};

  // ------------------------------------------------
  // Comment
  // ------------------------------------------------

  const handleComment = async () => {
  if (!userId) {
    alert("Please log in to comment.");
    router.push("/login");
    return;
  }

  if (!commentText.trim()) {
    return;
  }

  try {
    setCommentLoading(true);

    const res = await fetch(
      `${API_URL}/lesson/${lesson._id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userName,
          userImage: currentUser?.image || "",
          text: commentText.trim(),
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Failed to post comment"
      );
    }

    setComments((prev) => [
      data.comment,
      ...prev,
    ]);

    setCommentText("");
  } catch (error) {
    console.error("COMMENT ERROR:", error);

    alert("Unable to post comment.");
  } finally {
    setCommentLoading(false);
  }
};

  // ------------------------------------------------
  // Share
  // ------------------------------------------------

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setShareMessage(
        "Link copied!"
      );

      setTimeout(() => {
        setShareMessage("");
      }, 2000);
    } catch (error) {
      console.error(
        "SHARE ERROR:",
        error
      );
    }
  };

  // ------------------------------------------------
  // Loading
  // ------------------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner
            size="lg"
            color="secondary"
          />

          <p className="text-white/50">
            Loading lesson...
          </p>
        </div>
      </main>
    );
  }

  // ------------------------------------------------
  // Error
  // ------------------------------------------------

  if (error || !lesson) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Lesson not found
          </h1>

          <p className="text-white/50 mt-3">
            {error ||
              "This lesson does not exist."}
          </p>

          <Button
            className="mt-6"
            onPress={() =>
              router.back()
            }
          >
            Go Back
          </Button>
        </div>
      </main>
    );
  }

  const likesCount =
    lesson.likesCount ??
    lesson.likes?.length ??
    0;

  const savesCount =
    lesson.saves ??
    lesson.favorites?.length ??
    0;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* =====================================
          HERO
      ====================================== */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black" />

        <div className="relative max-w-5xl mx-auto px-4 py-8 md:py-14">

          {/* Back */}

          <Button
            variant="ghost"
            onPress={() =>
              router.back()
            }
            className="mb-8 text-white/70"
            startContent={
              <ArrowLeft size={17} />
            }
          >
            Back
          </Button>

          {/* Category */}

          <div className="flex flex-wrap gap-2 mb-5">
            {lesson.category && (
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium">
                {lesson.category}
              </span>
            )}

            {lesson.emotionalTone && (
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                {lesson.emotionalTone}
              </span>
            )}

            {lesson.isFeatured && (
              <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium">
                Featured
              </span>
            )}
          </div>

          {/* Title */}

          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            {lesson.title}
          </h1>

          {/* Description */}

          <p className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl">
            {lesson.description}
          </p>

        </div>
      </section>

      {/* =====================================
          MAIN
      ====================================== */}

      <section className="max-w-5xl mx-auto px-4 pb-20">

        {/* Featured Image */}

        {lesson.image ||
        lesson.featuredImage ? (
          <div className="relative overflow-hidden rounded-3xl border border-white/10 mb-10">
            <img
              src={
                lesson.image ||
                lesson.featuredImage
              }
              alt={lesson.title}
              className="w-full max-h-[550px] object-cover"
            />
          </div>
        ) : null}

        {/* =====================================
            METADATA
        ====================================== */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <CalendarDays
              size={18}
              className="text-purple-400"
            />

            <p className="text-xs text-white/40 mt-3">
              Created
            </p>

            <p className="text-sm font-medium mt-1">
              {lesson.createdAt
                ? new Date(
                    lesson.createdAt
                  ).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )
                : "N/A"}
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <Clock3
              size={18}
              className="text-purple-400"
            />

            <p className="text-xs text-white/40 mt-3">
              Reading time
            </p>

            <p className="text-sm font-medium mt-1">
              {readingTime} min
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <CheckCircle2
              size={18}
              className="text-green-400"
            />

            <p className="text-xs text-white/40 mt-3">
              Visibility
            </p>

            <p className="text-sm font-medium mt-1">
              {lesson.isPublic
                ? "Public"
                : "Private"}
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <Eye
              size={18}
              className="text-purple-400"
            />

            <p className="text-xs text-white/40 mt-3">
              Views
            </p>

            <p className="text-sm font-medium mt-1">
              {lesson.views || 0}
            </p>
          </div>

        </div>

        {/* =====================================
            STORY
        ====================================== */}

        <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-10">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <MessageCircle
                size={20}
                className="text-purple-400"
              />
            </div>

            <div>
              <h2 className="font-semibold text-xl">
                The Lesson
              </h2>

              <p className="text-xs text-white/40">
                A story worth remembering
              </p>
            </div>
          </div>

          <div className="whitespace-pre-line text-white/70 leading-8 text-base md:text-lg">
            {lesson.story ||
              lesson.insight ||
              lesson.description ||
              "No description available."}
          </div>

        </article>

        {/* =====================================
            AUTHOR
        ====================================== */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            {/* Avatar */}

            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0">

              {lesson.authorImage ||
              lesson.userImage ? (
                <img
                  src={
                    lesson.authorImage ||
                    lesson.userImage
                  }
                  alt="Author"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User
                  size={28}
                  className="text-white/50"
                />
              )}

            </div>

            <div className="flex-1">

              <p className="text-xs uppercase tracking-wider text-white/40">
                Written by
              </p>

              <h3 className="text-lg font-semibold mt-1">
                {lesson.authorName ||
                  lesson.userName ||
                  "Anonymous"}
              </h3>

              <p className="text-sm text-white/40 mt-1">
                {lesson.authorLessonCount ||
                  0}{" "}
                lessons created
              </p>

            </div>

            <Button
              variant="secondary"
              onPress={() => {
                if (
                  lesson.authorId
                ) {
                  router.push(
                    `/profile/${lesson.authorId}`
                  );
                }
              }}
            >
              View all lessons
            </Button>

          </div>

        </div>

        {/* =====================================
            STATS
        ====================================== */}

        <div className="flex flex-wrap gap-3 mt-8">

          <div className="px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.025]">
            <div className="flex items-center gap-2">
              <Heart
                size={18}
                className="text-rose-400"
                fill="currentColor"
              />

              <span className="font-semibold">
                {likesCount}
              </span>
            </div>

            <p className="text-xs text-white/40 mt-1">
              Likes
            </p>
          </div>

          <div className="px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.025]">
            <div className="flex items-center gap-2">
              <Bookmark
                size={18}
                className="text-amber-400"
                fill="currentColor"
              />

              <span className="font-semibold">
                {savesCount}
              </span>
            </div>

            <p className="text-xs text-white/40 mt-1">
              Favorites
            </p>
          </div>

          <div className="px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.025]">
            <div className="flex items-center gap-2">
              <Eye
                size={18}
                className="text-blue-400"
              />

              <span className="font-semibold">
                {lesson.views || 0}
              </span>
            </div>

            <p className="text-xs text-white/40 mt-1">
              Views
            </p>
          </div>

        </div>

        {/* =====================================
            ACTIONS
        ====================================== */}

        <div className="mt-8 flex flex-wrap gap-3">

          {/* Like */}

          <Button
            color={
              isLiked
                ? "danger"
                : "default"
            }
            variant={
              isLiked
                ? "solid"
                : "secondary"
            }
            isLoading={likeLoading}
            onPress={handleLike}
            startContent={
              !likeLoading && (
                <Heart
                  size={18}
                  fill={
                    isLiked
                      ? "currentColor"
                      : "none"
                  }
                />
              )
            }
          >
            {isLiked
              ? "Liked"
              : "Like"}
          </Button>

          {/* Favorite */}

          <Button
            color={
              isFavorite
                ? "warning"
                : "default"
            }
            variant={
              isFavorite
                ? "solid"
                : "secondary"
            }
            isLoading={
              favoriteLoading
            }
            onPress={
              handleFavorite
            }
            startContent={
              !favoriteLoading && (
                <Bookmark
                  size={18}
                  fill={
                    isFavorite
                      ? "currentColor"
                      : "none"
                  }
                />
              )
            }
          >
            {isFavorite
              ? "Saved"
              : "Save to Favorites"}
          </Button>

          {/* Share */}

          <Button
            variant="secondary"
            onPress={handleShare}
            startContent={
              <Share2 size={18} />
            }
          >
            {shareMessage ||
              "Share"}
          </Button>

          {/* Report */}

        <Button
  variant="secondary"
  color="danger"
  onPress={reportState.open}
  startContent={<Flag size={18} />}
>
  Report
</Button>

        </div>

        {/* =====================================
            COMMENTS
        ====================================== */}

        <section className="mt-14">

          <div className="mb-7">

            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Community
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Comments
            </h2>

            <p className="text-white/40 mt-2">
              Share your thoughts about this
              lesson.
            </p>

          </div>

          {/* Add comment */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">

            <div className="flex gap-3">

              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                <User
                  size={18}
                  className="text-purple-400"
                />
              </div>

              <div className="flex-1">

      <textarea
  placeholder="What did this lesson make you think about?"
  value={commentText}
  onChange={(e) =>
    setCommentText(e.target.value)
  }
  rows={4}
  className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-purple-500"
/>

                <div className="flex justify-end mt-3">

                  <Button
                    color="primary"
                    isLoading={
                      commentLoading
                    }
                    onPress={
                      handleComment
                    }
                    startContent={
                      !commentLoading && (
                        <Send
                          size={17}
                        />
                      )
                    }
                  >
                    Post Comment
                  </Button>

                </div>

              </div>

            </div>

          </div>

          {/* Comments list */}

          <div className="mt-7 space-y-4">

            {comments.length === 0 ? (
              <div className="text-center py-12 rounded-3xl border border-dashed border-white/10">
                <MessageCircle
                  size={30}
                  className="mx-auto text-white/20"
                />

                <p className="mt-3 text-white/40">
                  No comments yet.
                </p>

                <p className="text-sm text-white/25 mt-1">
                  Be the first to share your
                  thoughts.
                </p>
              </div>
            ) : (
              comments.map(
                (comment) => (
                  <div
                    key={
                      comment._id
                    }
                    className="rounded-3xl border border-white/10 bg-white/[0.025] p-5"
                  >

                    <div className="flex gap-4">

                      <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0">

                        {comment.userImage ? (
                          <img
                            src={
                              comment.userImage
                            }
                            alt={
                              comment.userName
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User
                            size={18}
                            className="text-white/40"
                          />
                        )}

                      </div>

                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="font-semibold">
                            {
                              comment.userName
                            }
                          </h3>

                          <span className="text-xs text-white/30">
                            {comment.createdAt
                              ? new Date(
                                  comment.createdAt
                                ).toLocaleDateString()
                              : ""}
                          </span>

                        </div>

                        <p className="text-white/60 leading-7 mt-2">
                          {
                            comment.text
                          }
                        </p>

                      </div>

                    </div>

                  </div>
                )
              )
            )}

          </div>

        </section>

      </section>

      {/* =====================================
          REPORT MODAL
      ====================================== */}

      {reportState && (
   <Modal state={reportState}>
  <Modal.Backdrop
    isDismissable={!reportLoading}
    className="bg-black/70 backdrop-blur-md"
  >
    <Modal.Container
      size="md"
      placement="center"
    >
      <Modal.Dialog className="bg-zinc-950 border border-white/10 rounded-3xl">
        {({ close }) => (
          <>
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Report this lesson
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-sm text-white/50 mb-5">
                Help us understand why you think
                this lesson should be reviewed.
              </p>

              <div className="space-y-3">

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">
                    Why are you reporting this lesson?
                  </label>

                  {reportReason && (
                    <span className="text-xs text-purple-400">
                      Selected
                    </span>
                  )}
                </div>

                <div className="grid gap-3">

                  {[
                    {
                      id: "spam",
                      title: "Spam or misleading",
                      description:
                        "This lesson contains spam, false or misleading information.",
                    },
                    {
                      id: "harassment",
                      title: "Harassment or bullying",
                      description:
                        "This content targets or harasses another person.",
                    },
                    {
                      id: "inappropriate",
                      title: "Inappropriate content",
                      description:
                        "This lesson contains inappropriate or offensive material.",
                    },
                    {
                      id: "copyright",
                      title: "Copyright violation",
                      description:
                        "This lesson may contain content that belongs to someone else.",
                    },
                    {
                      id: "other",
                      title: "Other",
                      description:
                        "The reason for reporting is not listed above.",
                    },
                  ].map((reason) => {
                    const selected =
                      reportReason === reason.id;

                    return (
                      <button
                        key={reason.id}
                        type="button"
                        onClick={() =>
                          setReportReason(reason.id)
                        }
                        className={`
                          w-full text-left rounded-2xl border p-4
                          transition-all duration-200
                          ${
                            selected
                              ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10"
                              : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">

                          <div
                            className={`
                              mt-0.5 w-5 h-5 rounded-full
                              border flex items-center justify-center
                              shrink-0 transition-all
                              ${
                                selected
                                  ? "border-purple-400 bg-purple-500"
                                  : "border-white/30 bg-transparent"
                              }
                            `}
                          >
                            {selected && (
                              <CircleCheck
                                size={14}
                                className="text-white"
                              />
                            )}
                          </div>

                          <div className="flex-1">
                            <p
                              className={`
                                text-sm font-semibold
                                ${
                                  selected
                                    ? "text-white"
                                    : "text-white/80"
                                }
                              `}
                            >
                              {reason.title}
                            </p>

                            <p className="text-xs text-white/40 mt-1 leading-relaxed">
                              {reason.description}
                            </p>
                          </div>

                        </div>
                      </button>
                    );
                  })}

                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>

              <Button
                variant="secondary"
                onPress={() => {
                  setReportReason("");
                  close();
                }}
              >
                Cancel
              </Button>

              <Button
                color="danger"
                isLoading={reportLoading}
                onPress={handleReport}
                startContent={
                  !reportLoading && (
                    <Flag size={17} />
                  )
                }
              >
                Submit Report
              </Button>

            </Modal.Footer>

          </>
        )}
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>
      )}

    </main>
  );
};

export default PublicLessonDetailsPage;