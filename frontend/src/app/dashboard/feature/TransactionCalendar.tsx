'use client';

import { useRouter } from 'next/navigation';
import React, { useId, useMemo, useState } from 'react';
import { DayButton, type DayButtonProps, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format, isValid, parse } from 'date-fns';
import { useTransactionCalendar } from '@/hooks/useTransaction';

type TransactionDayButtonProps = DayButtonProps & {
  transactionMap: Map<
    string,
    {
      incomeCount: number;
      expenseCount: number;
    }
  >;
};

const TransactionDayButton = ({ day, transactionMap, ...props }: TransactionDayButtonProps) => {
  const dateKey = formatDateKey(day.date);
  const transaction = transactionMap.get(dateKey);

  return (
    <DayButton {...props} day={day}>
      <span>{day.date.getDate()}</span>
      {transaction && (
        <div>
          {transaction.incomeCount > 0 && <span>수입 {transaction.incomeCount}</span>}
          {transaction.expenseCount > 0 && <span>지출 {transaction.expenseCount}</span>}
        </div>
      )}
    </DayButton>
  );
};

const TransactionCalendar = () => {
  const inputId = useId();
  const router = useRouter();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState('');
  const [month, setMonth] = useState(today);

  const year = month.getFullYear();
  const monthNumber = month.getMonth() + 1;
  const { data, isPending } = useTransactionCalendar(year, monthNumber);
  const transactionMap = useMemo(() => {
    return new Map(
      data?.map(item => [
        item.date,
        {
          incomeCount: item.incomeCount,
          expenseCount: item.expenseCount,
        },
      ]) ?? [],
    );
  }, [data]);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('');
      setSelectedDate(undefined);
      return;
    }

    setSelectedDate(date);
    setMonth(date);
    setInputValue(format(date, 'MM/dd/yyyy'));

    const dateKey = formatDateKey(date);
    router.push(`/transactions/${dateKey}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedDate = parse(value, 'MM/dd/yyyy', new Date());
    setInputValue(value);

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <div>
      <h2>
        {year}년 {monthNumber}월
      </h2>

      {isPending ? (
        <p>거래 내역을 불러오는 중...</p>
      ) : (
        <>
          <label htmlFor={inputId}>
            <strong>search Date:</strong>
          </label>
          <input
            style={{ fontSize: 'inherit', padding: '0.25em 0.5em' }}
            id={inputId}
            type="text"
            value={inputValue}
            placeholder="MM/dd/yyyy"
            onChange={handleInputChange}
            onKeyDown={e => {
              // Fixes https://github.com/gpbl/react-day-picker/issues/2724 causing search appearing when typing '/'
              e.stopPropagation();
            }}
          />
          <DayPicker
            animate
            month={month}
            onMonthChange={setMonth}
            mode="single"
            showOutsideDays
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            components={{
              DayButton: props => (
                <TransactionDayButton {...props} transactionMap={transactionMap} />
              ),
            }}
          />
        </>
      )}
    </div>
  );
};

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
export default TransactionCalendar;
