'use client';
import { useState } from 'react';
import { useCategoryList } from '@/hooks/useCategory';
import { CategoryType } from '@/types/category';
import { TransactionListParams } from '@/types/transaction';

type Props = {
  params: TransactionListParams;
  onChange: (params: TransactionListParams) => void;
};

const TransactionFilter = ({ params, onChange }: Props) => {
  const [keyword, setKeyword] = useState(params.keyword ?? '');
  const [categoryId, setCategoryId] = useState(params.categoryId ?? '');
  const [type, setType] = useState<'' | CategoryType>(params.type ?? '');
  const [startDate, setStartDate] = useState(params.startDate ?? '');
  const [endDate, setEndDate] = useState(params.endDate ?? '');
  const { data: categoryData = [] } = useCategoryList();

  const handleSearch = () => {
    if (startDate && endDate && startDate > endDate) {
      alert('시작일은 종료일보다 이전이어야 합니다.');
      return;
    }

    onChange({
      ...params,
      keyword: keyword || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      categoryId: categoryId || undefined,
      type: type || undefined,
      page: 1,
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="검색어를 입력하세요."
        />
      </div>

      {/* 연월별 검색 */}
      <div>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>

      {/* 카테고리 타입 검색 */}
      <div>
        <select value={type} onChange={e => setType(e.target.value as '' | CategoryType)}>
          <option value="">전체</option>
          <option value="INCOME">수입</option>
          <option value="EXPENSE">지출</option>
        </select>
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          <option value="">전체</option>
          {categoryData.map(item => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};

export default TransactionFilter;
