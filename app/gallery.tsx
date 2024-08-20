"use client";

import Avatar from "boring-avatars";
import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaRegCircleXmark,
} from "react-icons/fa6";

import Controls from "./controls";
import Modal from "./modal";

import { User } from "./types/user";

function cleanName(name: string) {
  return name.replace(/^(mr\.|ms\.|mrs\.)\s*/i, "").trim();
}

function sortUsers(
  users: User[],
  selectedField: "name" | "email" | "company",
  order: "ascending" | "descending" | null
) {
  return [...users].sort((a, b) => {
    let valueA: string;
    let valueB: string;

    switch (selectedField) {
      case "name":
        valueA = cleanName(a[selectedField].toString().toLowerCase());
        valueB = cleanName(b[selectedField].toString().toLowerCase());
        break;
      case "company":
        valueA = a.company.name.toLowerCase();
        valueB = b.company.name.toLowerCase();
        break;
      case "email":
        valueA = a[selectedField].toString().toLowerCase();
        valueB = b[selectedField].toString().toLowerCase();
        break;
      default:
        valueA = "";
        valueB = "";
        break;
    }

    return order === "ascending" || order === null
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });
}

export type GalleryProps = {
  users: User[];
};
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFieldOption, setFieldOption] = useState<
    "name" | "email" | "company" | null
  >(null);
  const [selectedDirectionOption, setDirectionOption] = useState<
    "ascending" | "descending" | null
  >(null);

  // need useEffect for rerender
  useEffect(() => {
    console.log("Effect triggered");
    console.log("Selected Field:", selectedFieldOption);
    console.log("Selected Direction:", selectedDirectionOption);
    console.log("Users before sort:", users);

    if (selectedFieldOption || selectedDirectionOption) {
      const sortedUsers = sortUsers(
        users,
        selectedFieldOption as "name" | "email" | "company",
        selectedDirectionOption as "ascending" | "descending"
      );

      console.log("Sorted Users:", sortedUsers);

      setUsersList(sortedUsers);
    }
  }, [selectedFieldOption, selectedDirectionOption, users]);

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <Controls
          selectField={setFieldOption}
          selectDirection={setDirectionOption}
        />
      </div>
      <div className="items">
        {usersList.map((user, index) => (
          <div
            className="item user-card"
            key={user.id}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
