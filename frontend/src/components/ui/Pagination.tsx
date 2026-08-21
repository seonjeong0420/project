'use client';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <nav>
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        이전
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        다음
      </button>
    </nav>
  );
};

export default Pagination;
