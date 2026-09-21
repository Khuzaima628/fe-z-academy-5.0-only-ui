"use client";

import Link from "next/link";
import { useState } from "react";

import AppSearchBar from "@/components/AppSearchBar";
import AppTable, { type Column } from "@/components/AppTable";
import PageFlexCol from "@/components/PageFlexCol";
import PageHeader from "@/components/PageHeader";
import TableImage from "@/components/TableImage";
import { Badge } from "@/components/ui/badge";
import AppButton from "@/components/AppButton";
import { coursesData as courseMockData } from "@/dummy-data/coursesData";
import { type CourseRecord } from "@/types/courseTypes";
import {
  formatCourseLevel,
  getCourseVerificationBadgeVariant,
  getCourseVerificationLabel,
  getCourseVerificationState,
} from "@/features/course-management/courseHelpers";

const VerifiedCourses = () => {
  const [search, setSearch] = useState("");

  const filteredCourses = courseMockData.filter((course) => {
    if (getCourseVerificationState(course) !== "verified") {
      return false;
    }

    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return true;
    }

    return (
      course.title.toLowerCase().includes(normalizedSearch) ||
      course.instructorName.toLowerCase().includes(normalizedSearch) ||
      course.categoryName.toLowerCase().includes(normalizedSearch)
    );
  });

  return (
    <PageFlexCol>
      <PageHeader
        pageHeading="Verified Courses"
        pageDescription="View all admin-approved courses that are currently live from the instructor review flow."
      />

      <AppTable
        upperHeader={
          <div className="max-w-sm">
            <AppSearchBar
              placeholder="Search verified courses..."
              onChange={(value: string) => setSearch(value)}
            />
          </div>
        }
        data={filteredCourses}
        columns={
          [
            {
              key: "thumbnail",
              label: "Thumbnail",
              render: (value, row) => (
                <TableImage
                  src={value as string}
                  alt={(row as CourseRecord).title}
                  shape="rectangle"
                />
              ),
            },
            {
              key: "title",
              label: "Title",
              render: (value) => (
                <span className="font-medium">{value as string}</span>
              ),
            },
            {
              key: "instructorName",
              label: "Instructor",
            },
            {
              key: "price",
              label: "Price",
              render: (value) => `$${value as number}`,
            },
            {
              key: "level",
              label: "Level",
              render: (value) => formatCourseLevel(value as string),
            },
            {
              key: "categoryName",
              label: "Category",
            },
            {
              key: "isVerified",
              label: "Verification",
              render: (_value, row) => {
                const course = row as CourseRecord;
                return (
                  <>
                    {course.isVerified === false && (
                      <Badge variant="destructive">Not verified</Badge>
                    )}
                    {course.isVerified && <Badge>Verified</Badge>}
                  </>
                );
              },
            },
            {
              key: "averageRating",
              label: "Average Rating",
              render: (value) => (value as number).toFixed(1),
            },
            {
              key: "totalReviews",
              label: "Total Reviews",
            },
            {
              key: "totalStudentsEnrolled",
              label: "Students Enrolled",
            },
            {
              key: "action",
              label: "Action",
              render: (_value, row) => (
                <AppButton asChild>
                  <Link href={`/course-details/${(row as CourseRecord)._id}?role=admin`}>
                    View Details
                  </Link>
                </AppButton>
              ),
            },
          ] satisfies Column[]
        }
        pagination={true}
      />
    </PageFlexCol>
  );
};

export default VerifiedCourses;

