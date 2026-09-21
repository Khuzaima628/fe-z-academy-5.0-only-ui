"use client";

import { useState } from "react";

import AppButton from "@/components/AppButton";

import { Role } from "@/types/userTypes";

import PageFlexCol from "@/components/PageFlexCol";
import AppSearchBar from "@/components/AppSearchBar";
import TableImage from "@/components/TableImage";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import AppTable, { type Column } from "@/components/AppTable";

const data = [
  {
    _id: "6823f1a9c1d2e3f4a5b6c701",
    fullName: "Liam Anderson",
    email: "liam.anderson@example.com",
    highestEducation: "BS Computer Science",
    yearsOfExperience: 5,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    isVerified: false,
    role: Role.Instructor,
  },
  {
    _id: "6823f1a9c1d2e3f4a5b6c702",
    fullName: "Emma Johnson",
    email: "emma.johnson@example.com",
    highestEducation: "BS Software Engineering",
    yearsOfExperience: 3,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    isVerified: false,
    role: Role.Instructor,
  },
  {
    _id: "6823f1a9c1d2e3f4a5b6c703",
    fullName: "Noah Williams",
    email: "noah.williams@example.com",
    highestEducation: "MS Computer Science",
    yearsOfExperience: 7,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    isVerified: false,
    role: Role.Instructor,
  },
];

const AllInstructors = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredData = data.filter((user) => {
    return (
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <PageFlexCol>
      <PageHeader
        pageHeading="Pending Instructor Verifications"
        pageDescription="Review and manage instructor applications awaiting approval."
      />

      <AppTable
        upperHeader={
          <div className="max-w-sm">
            <AppSearchBar
              placeholder="Search instructors by name or email..."
              onChange={(value: string) => setSearch(value)}
            />
          </div>
        }
        data={filteredData}
        columns={
          [
            {
              key: "avatar",
              label: "Avatar",
              render: (value, row) => (
                <TableImage
                  src={value as string}
                  alt={(row as { fullName: string }).fullName}
                  shape="circle"
                />
              ),
            },
            {
              key: "fullName",
              label: "Full Name",
              render: (value) => (
                <span className="font-medium">{value as string}</span>
              ),
            },
            {
              key: "email",
              label: "Email",
            },
            {
              key: "highestEducation",
              label: "Highest Education",
            },
            {
              key: "yearsOfExperience",
              label: "Experience",
              render: (value) => `${value as number} Years`,
            },
            {
              key: "isVerified",
              label: "Verified",
              render: (value) => (
                <>
                  {!value && <Badge variant="destructive">Not verified</Badge>}
                  {value && <Badge>Verified</Badge>}
                </>
              ),
            },
            {
              key: "role",
              label: "Role",
              render: (value) => (
                <span className="capitalize">{value as string}</span>
              ),
            },
            {
              key: "action",
              label: "Action",
              render: (_value, _row) => (
                <div className="text-right">
                  <AppButton
                    onClick={() =>
                      router.push("/admin/instructors/instructor-details/1")
                    }
                  >
                    View
                  </AppButton>
                </div>
              ),
            },
          ] satisfies Column[]
        }
        pagination={true}
      />
    </PageFlexCol>
  );
};

export default AllInstructors;
