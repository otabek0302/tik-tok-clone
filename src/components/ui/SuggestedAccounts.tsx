import { NextPage } from "next";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface IProfile {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

interface ISuggestedAccountsProps {
  profile: IProfile;
  fetchAllUsers: () => void;
}

const SuggestedAccounts: NextPage<ISuggestedAccountsProps> = ({ profile, fetchAllUsers }) => {
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <Link href={`/profile/${profile._id}`}>
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
    </Link>
  );
};

export default SuggestedAccounts;
