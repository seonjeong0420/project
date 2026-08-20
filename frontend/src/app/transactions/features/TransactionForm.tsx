import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryList } from '@/hooks/useCategory';
import { useTransactionCreate, useTransactionUpdate } from '@/hooks/useTransaction';
import { TransactionFormValuesSchema, transactionSchema } from '@/schemas/transaction.schema';
import { Transaction } from '@/types/transaction';

type Props = {
  transaction: Transaction | null;
  onClose: () => void;
};

const TransactionForm = ({ transaction, onClose }: Props) => {
  const { data: categoryList = [] } = useCategoryList();
  const transactionCreate = useTransactionCreate();
  const transactionUpdate = useTransactionUpdate();
  const { register, handleSubmit, reset } = useForm<TransactionFormValuesSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: transaction?.title ?? '',
      amount: transaction?.amount ?? 0,
      memo: transaction?.memo ?? '',
      type: transaction?.type ?? 'EXPENSE',
      categoryId: transaction?.categoryId ?? '',
    },
  });

  const onSubmit = (data: TransactionFormValuesSchema) => {
    const payload = {
      ...data,
      date: new Date().toISOString(),
    };

    if (transaction) {
      // 수정
      transactionUpdate.mutate(
        {
          id: transaction.id,
          data: {
            ...data,
            date: transaction.date,
          },
        },
        {
          onSuccess() {
            onClose();
          },
        },
      );

      return;
    }

    // 추가
    transactionCreate.mutate(payload as Transaction, {
      onSuccess() {
        console.log('Transaction created successfully');
        onClose();
      },
      onError(error) {
        console.error('Error creating transaction:', error);
      },
    });
  };

  useEffect(() => {
    reset({
      title: transaction?.title ?? '',
      amount: transaction?.amount ?? 0,
      memo: transaction?.memo ?? '',
      type: transaction?.type ?? 'EXPENSE',
      categoryId: transaction?.categoryId ?? '',
    });
  }, [transaction, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>{transaction ? '거래 내역 수정' : '거래 내역 추가'}</legend>
        <ul>
          <li>
            <label htmlFor="title">제목</label>
            <input type="text" id="title" {...register('title')} />
          </li>
          <li>
            <label htmlFor="amount">금액</label>
            <input type="number" id="amount" {...register('amount', { valueAsNumber: true })} />
          </li>
          <li>
            <label htmlFor="type">타입</label>
            <select id="type" {...register('type')}>
              <option value="INCOME">수입</option>
              <option value="EXPENSE">지출</option>
            </select>
          </li>
          <li>
            <label htmlFor="categoryId">카테고리</label>
            <select id="categoryId" {...register('categoryId')}>
              <option value="">카테고리 선택</option>
              {categoryList.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="memo">메모</label>
            <input type="text" id="memo" {...register('memo')} />
          </li>
        </ul>
        <button type="submit">{transaction ? '수정하기' : '추가하기'}</button>
      </fieldset>
    </form>
  );
};

export default TransactionForm;
