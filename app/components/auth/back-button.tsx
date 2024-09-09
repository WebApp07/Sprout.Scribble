"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const BackButton = ({
  label,
  href,
}: {
  href: string;
  label: string;
}) => {
  return (
    <Button className="font-medium w-full">
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
};
