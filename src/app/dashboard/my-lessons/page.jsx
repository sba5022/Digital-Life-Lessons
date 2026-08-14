"use client";


import { useEffect, useState } from "react";

import Link from "next/link";
import {
  Button,
  Table,
  Modal,
  Input,
  Select,
} from "@heroui/react";

const initialLessons = [
  {
    id: "1",
    title: "Never Give Up",
    category: "Personal Growth",
    visibility: "Public",
    access: "Free",
    createdAt: "Aug 10, 2026",
    reactions: 24,
    saves: 12,
  },
  {
    id: "2",
    title: "Learning From Failure",
    category: "Mistakes Learned",
    visibility: "Private",
    access: "Free",
    createdAt: "Aug 8, 2026",
    reactions: 15,
    saves: 7,
  },
  {
    id: "3",
    title: "Building a Better Career",
    category: "Career",
    visibility: "Public",
    access: "Premium",
    createdAt: "Aug 5, 2026",
    reactions: 42,
    saves: 25,
  },
];

export default function MyLessonsPage() {
  const [lessons, setLessons] = useState(initialLessons);

  const [editingLesson, setEditingLesson] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
const [loading, setLoading] = useState(true);
  const [isPremium] = useState(true);

  const [editTitle, setEditTitle] = useState("");
  const [editVisibility, setEditVisibility] = useState("Public");
  const [editAccess, setEditAccess] = useState("Free");

 useEffect(() => {
    const getLessons = async () => {
      try {
        const res = await fetch("http://localhost:3001/lesson");

        if (!res.ok) {
          throw new Error("Failed to fetch lessons");
        }

        const data = await res.json();

        console.log("Fetched lessons:", data);

        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    getLessons();
  }, []);
  const handleDelete = () => {
    setLessons((prev) =>
      prev.filter((lesson) => lesson.id !== deleteId)
    );

    setDeleteId(null);
  };



  const handleEdit = (lesson) => {
    setEditingLesson(lesson);

    setEditTitle(lesson.title);
    setEditVisibility(lesson.visibility);
    setEditAccess(lesson.access);
  };



  const handleUpdate = (close) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === editingLesson.id
          ? {
              ...lesson,
              title: editTitle,
              visibility: editVisibility,
              access: isPremium
                ? editAccess
                : "Free",
            }
          : lesson
      )
    );

    close();
    setEditingLesson(null);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <p className="text-sm text-accent uppercase tracking-widest font-semibold">
            Dashboard
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            My Lessons
          </h1>

          <p className="text-default-500 mt-2">
            Manage your lessons, visibility, access and engagement.
          </p>
        </div>

        <Button
          as={Link}
          href="/dashboard/add-lesson"
          color="primary"
        >
          + Add New Lesson
        </Button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="rounded-2xl border border-default-200 bg-default-50 p-5">
          <p className="text-sm text-default-500">
            Total Lessons
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {lessons.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-default-200 bg-default-50 p-5">
          <p className="text-sm text-default-500">
            Reactions
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {lessons.reduce(
              (total, lesson) =>
                total + lesson.reactions,
              0
            )}
          </h2>
        </div>

        <div className="rounded-2xl border border-default-200 bg-default-50 p-5">
          <p className="text-sm text-default-500">
            Favorites
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {lessons.reduce(
              (total, lesson) =>
                total + lesson.saves,
              0
            )}
          </h2>
        </div>

        <div className="rounded-2xl border border-default-200 bg-default-50 p-5">
          <p className="text-sm text-default-500">
            Premium
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              lessons.filter(
                (lesson) =>
                  lesson.access === "Premium"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Table */}
      <div className="rounded-2xl border border-default-200 overflow-hidden">

        <Table variant="secondary">

          <Table.ScrollContainer>

            <Table.Content aria-label="My lessons">

              <Table.Header>

                <Table.Column id="title">
                  Lesson
                </Table.Column>

                <Table.Column id="category">
                  Category
                </Table.Column>

                <Table.Column id="visibility">
                  Visibility
                </Table.Column>

                <Table.Column id="access">
                  Access
                </Table.Column>

                <Table.Column id="created">
                  Created
                </Table.Column>

                <Table.Column id="stats">
                  Stats
                </Table.Column>

                <Table.Column id="actions">
                  Actions
                </Table.Column>

              </Table.Header>

              <Table.Body>

                {lessons.map((lesson) => (

                  <Table.Row key={lesson.id} id={lesson.id}>

                    {/* Lesson */}
                    <Table.Cell>

                      <div>
                        <p className="font-semibold">
                          {lesson.title}
                        </p>

                        <p className="text-xs text-default-500">
                          #{lesson.id}
                        </p>
                      </div>

                    </Table.Cell>

                    {/* Category */}
                    <Table.Cell>
                      <span className="text-sm">
                        {lesson.category}
                      </span>
                    </Table.Cell>

                    {/* Visibility */}
                    <Table.Cell>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lesson.visibility ===
                          "Public"
                            ? "bg-success-100 text-success-700"
                            : "bg-warning-100 text-warning-700"
                        }`}
                      >
                        {lesson.visibility}
                      </span>

                    </Table.Cell>

                    {/* Access */}
                    <Table.Cell>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lesson.access ===
                          "Premium"
                            ? "bg-secondary-100 text-secondary-700"
                            : "bg-default-100 text-default-700"
                        }`}
                      >
                        {lesson.access}
                      </span>

                    </Table.Cell>

                    {/* Created */}
                    <Table.Cell>
                      {lesson.createdAt}
                    </Table.Cell>

                    {/* Stats */}
                    <Table.Cell>

                      <div className="text-xs space-y-1">
                        <p>
                          ❤️ {lesson.reactions}
                          {" "} reactions
                        </p>

                        <p>
                          ⭐ {lesson.saves}
                          {" "} saves
                        </p>
                      </div>

                    </Table.Cell>

                    {/* Actions */}
                    <Table.Cell>

                      <div className="flex items-center gap-2">

                        {/* Details */}
                        <Button
                          as={Link}
                          href={`/dashboard/my-lessons/${lesson.id}`}
                          size="sm"
                          variant="secondary"
                        >
                          Details
                        </Button>

                        {/* Update */}
                        <Button
                          size="sm"
                          color="primary"
                          onPress={() =>
                            handleEdit(lesson)
                          }
                        >
                          Update
                        </Button>

                        {/* Delete */}
                        <Button
                          size="sm"
                          color="danger"
                          variant="secondary"
                          onPress={() =>
                            setDeleteId(
                              lesson.id
                            )
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </Table.Cell>

                  </Table.Row>

                ))}

              </Table.Body>

            </Table.Content>

          </Table.ScrollContainer>

        </Table>
 </div>
      {editingLesson && (
        <Modal>

          <Modal.Trigger className="hidden">
            Edit
          </Modal.Trigger>

          <Modal.Backdrop
            isOpen={true}
            isDismissable={false}
            className="bg-black/60 backdrop-blur-sm"
          >

            <Modal.Container
              size="lg"
              placement="center"
            >

              <Modal.Dialog className="bg-background rounded-2xl">

                {({ close }) => (

                  <>
<Modal.CloseTrigger />

                    <Modal.Header>

                      <Modal.Heading>
                        Update Lesson
                      </Modal.Heading>

                    </Modal.Header>

                    <Modal.Body>

                      <div className="space-y-5">

                        {/* Title */}
                        <Input
                          label="Lesson Title"
                          value={editTitle}
                          onChange={(e) =>
                            setEditTitle(
                              e.target.value
                            )
                          }
                        />

                        {/* Visibility */}
                        <Select
                          label="Visibility"
                          selectedKeys={[
                            editVisibility,
                          ]}
                          onSelectionChange={(
                            keys
                          ) => {
                            const value =
                              Array.from(
                                keys
                              )[0];

                            setEditVisibility(
                              value
                            );
                          }}
                        >

                          <Select.Trigger />

                          <Select.Popover>

                            <Select.ListBox>

                              <Select.Option
                                id="Public"
                              >
                                Public
                              </Select.Option>

                              <Select.Option
                                id="Private"
                              >
                                Private
                              </Select.Option>

                            </Select.ListBox>

                          </Select.Popover>

                        </Select>

                        {/* Access */}
                        <Select
                          label="Access Level"
                          isDisabled={
                            !isPremium
                          }
                          selectedKeys={[
                            editAccess,
                          ]}
                          onSelectionChange={(
                            keys
                          ) => {

                            const value =
                              Array.from(
                                keys
                              )[0];

                            setEditAccess(
                              value
                            );
                          }}
                        >

                          <Select.Trigger />

                          <Select.Popover>

                            <Select.ListBox>

                              <Select.Option
                                id="Free"
                              >
                                Free
                              </Select.Option>

                              <Select.Option
                                id="Premium"
                              >
                                Premium
                              </Select.Option>

                            </Select.ListBox>

                          </Select.Popover>

                        </Select>

                        {!isPremium && (
                          <p className="text-xs text-warning-600">
                            Upgrade to Premium to
                            change the access level
                            to Premium.
                          </p>
                        )}

                      </div>

                    </Modal.Body>

                    <Modal.Footer>

                      <Button
                        variant="secondary"
                        onPress={close}
                      >
                        Cancel
                      </Button>

                      <Button
                        color="primary"
                        onPress={() =>
                          handleUpdate(close)
                        }
                      >
                        Save Changes
                      </Button>

                    </Modal.Footer>

                  </>

                )}

              </Modal.Dialog>

            </Modal.Container>

          </Modal.Backdrop>

        </Modal>
      )}
      {deleteId && (
        <Modal>

          <Modal.Trigger className="hidden">
            Delete
          </Modal.Trigger>

          <Modal.Backdrop
            isOpen={true}
            isDismissable={false}
            className="bg-black/70 backdrop-blur-sm"
          >

            <Modal.Container
              size="sm"
              placement="center"
            >

              <Modal.Dialog className="bg-background rounded-2xl">

                {({ close }) => (

                  <>

                    <Modal.CloseTrigger />

                    <Modal.Header>

                      <Modal.Heading>
                        Delete Lesson?
                      </Modal.Heading>

                    </Modal.Header>

                    <Modal.Body>

                      <p className="text-default-500">
                        Are you sure you want to
                        permanently delete this
                        lesson?
                      </p>

                      <p className="text-danger-500 text-sm mt-3 font-medium">
                        This action cannot be undone.
                      </p>

                    </Modal.Body>

                    <Modal.Footer>

                      <Button
                        variant="secondary"
                        onPress={() => {
                          setDeleteId(null);
                          close();
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
                        color="danger"
                        onPress={() => {
                          handleDelete();
                          close();
                        }}
                      >
                        Delete Permanently
                      </Button>

                    </Modal.Footer>

                  </>

                )}

              </Modal.Dialog>

            </Modal.Container>

          </Modal.Backdrop>

        </Modal>
      )}

    </div>
  );
}