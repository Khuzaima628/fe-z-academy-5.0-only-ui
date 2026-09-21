"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PageFlexCol from "@/components/PageFlexCol";
import PageHeader from "@/components/PageHeader";
import AppTable, { type Column } from "@/components/AppTable";
import AppSearchBar from "@/components/AppSearchBar";
import TableImage from "@/components/TableImage";
import { Badge } from "@/components/ui/badge";
import AppButton from "@/components/AppButton";
import { usersData } from "@/dummy-data/usersData";

const students = usersData.filter((u) => u.role === "student");

const AdminStudents = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredStudents = students.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PageFlexCol>
      <PageHeader
        pageHeading="Students"
        pageDescription="Browse and manage all registered students on the platform."
      />

      <AppTable
        upperHeader={
          <div className="max-w-sm">
            <AppSearchBar
              placeholder="Search students by name or email..."
              onChange={(value: string) => setSearch(value)}
            />
          </div>
        }
        data={filteredStudents}
        columns={
          [
            {
              key: "avatar",
              label: "Avatar",
              render: (value, row) => {
                const student = row as { fullName: string };
                return (
                  <TableImage
                    src={
                      (value as string | null) ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(student.fullName)}&background=random`
                    }
                    alt={student.fullName}
                    shape="circle"
                  />
                );
              },
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
              key: "isVerified",
              label: "Verified",
              render: (value) => (
                <>
                  {value ? (
                    <Badge>Verified</Badge>
                  ) : (
                    <Badge variant="destructive">Not Verified</Badge>
                  )}
                </>
              ),
            },
            {
              key: "action",
              label: "Action",
              render: (_value, row) => {
                const student = row as { _id: string };
                return (
                  <div className="text-right">
                    <AppButton
                      onClick={() => router.push(`/user-profile/${student._id}`)}
                    >
                      View Profile
                    </AppButton>
                  </div>
                );
              },
            },
          ] satisfies Column[]
        }
        pagination={true}
      />
    </PageFlexCol>
  );
};

export default AdminStudents;