import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
import React from "react";
interface Props {
  totalPages: number;
  currentPage: number;
}
function PageInfo({ totalPages, currentPage }: Props) {
  return (
    <Pagination className="text-white transition-all duration-300">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem className="hover:bg-gray-900 rounded-md transition-all duration-300">
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNo) => (
            <PaginationItem
              className={
                pageNo === currentPage
                  ? "text-primary font-bold  rounded-md"
                  : ""
              }
              key={pageNo}
            >
              <PaginationLink
                isActive={pageNo === currentPage}
                className="bg-transparent hover:bg-gray-900 border-primary"
                href={`?page=${pageNo}`}
              >
                {pageNo}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        {currentPage < totalPages && (
          <PaginationItem className="hover:bg-gray-900 rounded-md">
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PageInfo;
