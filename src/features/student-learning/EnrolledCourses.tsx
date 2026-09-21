"use client";


import { useState } from "react";

import AppSearchBar from "@/components/AppSearchBar";
import AppTable, { type Column } from "@/components/AppTable";
import PageFlexCol from "@/components/PageFlexCol";
import PageHeader from "@/components/PageHeader";
import TableImage from "@/components/TableImage";
import AppButton from "@/components/AppButton";
import { coursesData as enrolledCoursesMockData } from "@/dummy-data/coursesData";
import { type CourseRecord } from "@/types/courseTypes";

const EnrolledCourses = () => {
  const [search, setSearch] = useState("");

  const filteredCourses = enrolledCoursesMockData.filter((course) => {
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
        pageHeading="Enrolled Courses"
        pageDescription="Browse and manage all courses you are currently enrolled in."
      />

      <AppTable
        upperHeader={
          <div className="max-w-sm">
            <AppSearchBar
              placeholder="Search enrolled courses..."
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
              key: "categoryName",
              label: "Category",
            },
            {
              key: "action",
              label: "Action",
              render: (_value, row) => (
                <AppButton
                  href={`/course-details/${(row as CourseRecord)._id}?role=student&source=enrolled`}
                >
                  View Details
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

export default EnrolledCourses;