import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Select, { SelectInstance } from "react-select";
import { useNavigate } from "react-router-dom";
import { useLoggedInAuth } from "../../context/AuthContext";
import FullScreenCard from "../../components/FullScreenCard";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Link from "../../components/Link";

type Channel = {
  name: string;
  imageUrl?: string;
  memberIds: string[];
};

function NewChannel() {
  const { streamChat, user } = useLoggedInAuth();
  const navigate = useNavigate();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const imageUrlRef = React.useRef<HTMLInputElement>(null);
  const memberIdsRef =
    React.useRef<SelectInstance<{ label: string; value: string }>>(null);

  const users = useQuery({
    queryKey: ["stream", "users"],
    queryFn: () =>
      streamChat!.queryUsers(
        {
          id: { $ne: user.id },
        },
        {
          name: 1,
        }
      ),
    enabled: streamChat != null,
  });

  const createChannel = useMutation({
    mutationFn: ({ name, imageUrl, memberIds }: Channel) => {
      if (streamChat == null) throw new Error("Not connected");

      return streamChat
        .channel("messaging", crypto.randomUUID(), {
          name,
          image: imageUrl,
          members: [user.id, ...memberIds],
        })
        .create();
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const imageUrl = imageUrlRef.current?.value;
    const selectOptions = memberIdsRef.current?.getValue();

    if (
      name == null ||
      name === "" ||
      selectOptions == null ||
      selectOptions.length === 0
    )
      return;

    createChannel.mutate({
      name,
      imageUrl,
      memberIds: selectOptions.map((option) => option.value),
    });
  };

  return (
    <FullScreenCard>
      <FullScreenCard.Body>
        <h1 className="text-3xl text-center text-gray-800 font-bold mb-5">
          New Conversation
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-y-4 items-center"
        >
          <div>
            <label className="font-light text-gray-600" htmlFor="name">
              Name
            </label>
            <Input id="name" type="text" required ref={nameRef} />
          </div>
          <div>
            <label className="font-light text-gray-600" htmlFor="imageUrl">
              Image Url
            </label>
            <Input id="imageUrl" type="text" ref={imageUrlRef} />
          </div>
          <div>
            <label className="font-light text-gray-600" htmlFor="members">
              Members
            </label>
            <Select
              id="members"
              required
              isMulti
              classNames={{ container: () => "w-full" }}
              isLoading={users.isLoading}
              options={users.data?.users.map((user) => ({
                label: user.name || user.id,
                value: user.id,
              }))}
              ref={memberIdsRef}
            />
          </div>
          <Button
            type="submit"
            className="mt-4"
            disabled={createChannel.isLoading}
          >
            {createChannel.isLoading ? "Loading..." : "Create Channel"}
          </Button>
        </form>
      </FullScreenCard.Body>
      <FullScreenCard.BelowCard>
        <Link to="/">Back</Link>
      </FullScreenCard.BelowCard>
    </FullScreenCard>
  );
}

export default NewChannel;
