import React from "react";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { PostsList } from "@/components/posts-list";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { username: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = params;
  await connectToDB();
  const user = await User.findOne({ username });
  const previousImages = (await parent).openGraph?.images || [];
  // Get previous images from parent metadata

  // Define default metadata values
  const defaultTitle = "Discover Your Safe Haven in the Digital World";
  const defaultDescription =
    "Join Safe Space to experience privacy, personalized content, and a supportive community.";
  const defaultImage = "https://safe-space-app.vercel.app/default-image.jpg"; // Replace with your default image URL
  const siteName = "Safe Space";
  const defaultLocale = "en_US";
  const defaultKeywords = [
    "Safe Space",
    "Privacy",
    "Community",
    "Digital Haven",
  ];
  const defaultViewport = "width=device-width, initial-scale=1";
  const defaultCharset = "UTF-8";

  // Generate metadata based on the user data
  const metadata: Metadata = {
    title: user
      ? `${user.firstName} ${user.lastName} | Safe Space`
      : defaultTitle,
    description: user ? user.bio : defaultDescription,
    openGraph: {
      title: user
        ? `${user.firstName} ${user.lastName} | Safe Space`
        : defaultTitle,
      description: user ? user.bio : defaultDescription,
      url: `https://safe-space-app.vercel.app/user/${username}`,
      type: "profile", // Assuming this is a user profile
      images: user?.image
        ? [user.image, ...previousImages]
        : [defaultImage, ...previousImages],
      siteName: siteName,
      locale: defaultLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: user
        ? `${user.firstName} ${user.lastName} | Safe Space`
        : defaultTitle,
      description: user ? user.bio : defaultDescription,
      images: user?.image ? [user.image] : [defaultImage],
    },
    // canonical: `https://safe-space-app.vercel.app/user/${username}`,
    robots: {
      index: true,
      follow: true,
    },
    keywords: user
      ? [`${user.firstName}`, `${user.lastName}`, "Safe Space"]
      : defaultKeywords,
    viewport: defaultViewport,
    // charset: defaultCharset,
  };

  return metadata;
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
