import React from "react";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { PostsList } from "@/components/posts-list";

interface Props {
  params: { username: string };
}
const Page: React.FC<Props> = async ({ params }) => {
  const { username } = params;
  await connectToDB();
  const user = await User.findOne({ username });
  if (!user) return <div>Not found</div>;

  return (
    <>
      <div className="flex space-x-4 bg-muted p-4 rounded-md mb-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.image} />
          <AvatarFallback className="text-4xl">
            {user.firstName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h4>
          <h4 className="text-xs text-muted-foreground font-semibold">
            @{user.username}
          </h4>
          <p className="text-sm">{user.bio}</p>
          <div className="flex items-center pt-2">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Joined {format(new Date(user.createdAt), "MMMM yyyy")}
            </span>
          </div>
        </div>
      </div>
      <PostsList username={user.username} />
    </>
  );
};

export default Page;
