import React from 'react';
import { Dialog, DialogContent, DialogHeader } from '../ui';
import {
  AppDispatch,
  formActions,
  FormStateReduxFom,
  useAppSelector,
  utilityActions
} from '@/reduxStore';
import { DialogDescription, DialogOverlay, DialogTitle } from '../ui';
import { useDispatch } from 'react-redux';
import { cn } from '../lib';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  formName?: keyof FormStateReduxFom;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  height?: string;
  maxHeight?: string;
}

const sizeMap = {
  sm: 'max-w-sm', // sekitar 24rem (384px)
  md: 'max-w-md', // sekitar 28rem (448px)
  lg: 'max-w-lg', // sekitar 32rem (512px)
  xl: 'max-w-xl' // sekitar 36rem (576px)
};

const ModalGlobal = ({
  title,
  children,
  formName,
  size = 'md',
  className
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const utility = useAppSelector((state) => state.utility);

  const handleClose = () => {
    if (formName) {
      dispatch(formActions.resetForm(formName));
    }
    dispatch(
      utilityActions.showModal({
        isModalShow: false,
        isEdit: false,
        data: [],
        namaForm: ''
      })
    );
  };

  return (
    <Dialog open={utility.getModal.isModalShow}>
      <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 grid place-items-center">
        <DialogContent
          onClose={handleClose}
          className={cn(
            'overflow-hidden w-full',
            sizeMap[size], // atur max-width sesuai size
            className
          )}
        >
          <DialogHeader>
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div
            className="overflow-auto no-scrollbar"
            style={{
              maxHeight: 'calc(90vh - 120px)',
              overflowX: 'auto'
            }}
          >
            {children}
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default ModalGlobal;
