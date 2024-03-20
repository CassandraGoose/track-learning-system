'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="join">
      {[...Array(totalPages)].map((num, i) => {
        return (
          <Link
            key={'page' + i + 1}
            className={`btn btn-outline join-item text-primary ${currentPage === i + 1 ? 'btn-active' : ''}`}
            href={createPageURL(i + 1)}
          >
            {i + 1}
          </Link>
        );
      })}
    </div>
  );
}
