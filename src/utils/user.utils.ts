type Gender = "male" | "female" | "non-binary";

export function generateRandomBio(firstName: string, gender: Gender): string {
  const pronouns = {
    male: { subject: "he", object: "him", possessive: "his" },
    female: { subject: "she", object: "her", possessive: "her" },
    "non-binary": { subject: "they", object: "them", possessive: "their" },
  };

  const activities = [
    "can't stop bragging about",
    "pathetically shows off",
    "won't shut up about",
    "keeps reminding everyone about",
    "is desperately seeking validation for",
    "is way too obsessed with",
    "constantly talks big about",
    "never stops flaunting",
    "is always trying to impress people with",
    "thinks they're hot stuff because of",
  ];

  const behaviors = [
    "their barely average looks",
    "knowing how to boil water",
    "that one time they left the house",
    "their painfully boring life",
    "getting two likes on a post",
    "their cringy dance moves",
    "owning a phone like everyone else",
    "their so-called “fashion sense”",
    "finishing a book once",
    "their ability to stay awake during meetings",
  ];

  const roasts = [
    "like anyone actually cares.",
    "but it's just embarrassing.",
    "and nobody's impressed.",
    "but it's honestly pathetic.",
    "but let's be real, it's sad.",
    "and thinks it's impressive—bless their heart.",
    "but it's not fooling anyone.",
    "like it's something to be proud of—yikes.",
    "but everyone's just cringing.",
    "but it's painfully obvious they're trying too hard.",
  ];

  const activity = activities[Math.floor(Math.random() * activities.length)];
  const behavior = behaviors[Math.floor(Math.random() * behaviors.length)];
  const roast = roasts[Math.floor(Math.random() * roasts.length)];
  const pronoun = pronouns[gender];

  return `${firstName} ${activity} ${behavior}, ${roast}`;
}
