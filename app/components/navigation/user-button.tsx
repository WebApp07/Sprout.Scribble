"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { LogOut, Moon, Settings, Sun, TruckIcon } from "lucide-react";

export const UserButton = ({ user }: Session) => {
  if (user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            {user.image && (
              <Image
                src={user.image}
                alt={user.name!}
                width={32}
                height={32}
                fill={true}
              />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/10">
                <div className="font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className="mb-4 p-4 flex flex-col items-center gap-1 rounded-lg bg-primary/25">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name!}
                className="rounded-full"
                width={32}
                height={32}
              />
            )}
            <p className="font-bold text-xs ">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">
              {user.email}
            </span>
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="group py-2 font-medium cursor-pointer transation-all duration-500">
            <TruckIcon
              size={14}
              className="mr-3 group-hover:translate-x-1 transition-all  duration-300 ease-in-out"
            />
            My orders
          </DropdownMenuItem>
          <DropdownMenuItem className="group py-2 font-medium cursor-pointer transation-all duration-500">
            <Settings
              size={14}
              className="mr-3 group-hover:rotate-180 transition-all duration-300 ease-in-out"
            />{" "}
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transation-all duration-500">
            <div className="flex items-center">
              <Sun size={14} />
              <Moon size={14} />
              <p>
                theme <span>theme</span>{" "}
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="py-2 group focus:bg-destructive/30 font-medium cursor-pointer "
          >
            <LogOut
              size={14}
              className="mr-3  group-hover:scale-75 transition-all duration-300 ease-in-out"
            />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
