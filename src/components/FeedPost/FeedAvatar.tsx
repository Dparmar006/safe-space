import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { IUser } from "@/types/user.types";

interface Props {
  user: IUser;
}

const FeedAvatar: React.FC<Props> = ({ user }) => {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Avatar>
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.firstName[0]}</AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@{user.username}</h4>
              <p className="text-sm">{user.bio}</p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined {format(new Date(user.createdAt), "MMMM yyyy")}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default FeedAvatar;
