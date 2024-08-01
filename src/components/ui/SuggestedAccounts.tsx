import { NextPage } from "next";
import React from "react";
import Image from "next/image";

interface IProfile {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

interface ISuggestedAccountsProps {
  profile: IProfile;
}

const SuggestedAccounts: NextPage<ISuggestedAccountsProps> = ({ profile }) => {
  return (
    <div>
      <div className="xl:border-b-[0.5px] border-border py-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full relative overflow-hidden">
          <Image
            src={profile.image}
            alt={profile.userName}
            fill
            className=" object-cover"
          />
        </div>
        <h2 className="text-copy-light text-base font-normal tracking-wide px-1 hidden xl:block">
          {profile.userName}
        </h2>
      </div>
    </div>
  );
};

export default SuggestedAccounts;
