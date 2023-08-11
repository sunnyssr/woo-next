import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type PaginationProps = {
  pageNumber: number
  commonPath: string
  hasNextPage: boolean
}

export const Pagination = (props: PaginationProps) => {
  return <div className="flex items-center justify-between w-full py-6">
    {props.pageNumber !== 1 ? (
      <Link href={`${props.commonPath}/page/${props.pageNumber - 1}`}>
        <button className="border shadow-sm flex py-1.5 pr-4 pl-3 rounded-md border-gray-300 items-center hover:bg-gray-50">
          <ChevronLeftIcon className="w-5 h-5" />
          Previous
        </button>
      </Link>
    ) : (
      <div></div>
    )}
    {props.hasNextPage ? (
      <Link href={`${props.commonPath}/page/${props.pageNumber + 1}`}>
        <button className="border shadow-sm flex py-1.5 pr-3 pl-4 rounded-md border-gray-300 items-center hover:bg-gray-50">
          Next <ChevronRightIcon className="w-5 h-5" />
        </button>
      </Link>
    ) : (
      <div></div>
    )}
  </div>
}

export default Pagination
