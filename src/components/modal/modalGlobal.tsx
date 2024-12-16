import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui';
import {
  AppDispatch,
  formActions,
  FormStateReduxFom,
  useAppSelector,
  utilityActions
} from '@/reduxStore';
import { DialogDescription, DialogOverlay } from '@radix-ui/react-dialog';
import { useDispatch } from 'react-redux';
import { cn } from '../lib/utils';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string; // Optional width prop
  isFullScreen?: boolean;
  formName?: keyof FormStateReduxFom;
}

const ModalGlobal = (props: Props) => {
  const {
    title,
    formName,
    children,
    className = 'max-w-lg',
    isFullScreen
  } = props;

  const utility = useAppSelector((state) => state.utility);
  const dispatch = useDispatch<AppDispatch>();
  const top = isFullScreen ? '3%' : '10%';
  const padding = isFullScreen ? '5%' : '0%';

  const [modalTop, setModalTop] = React.useState(top);

  React.useEffect(() => {
    const handleKeyboardShow = () => {
      // const keyboardHeight = 200; // Adjust this based on your design
      setModalTop(`9%`); // Add a small margin above the keyboard
    };
    const handleKeyboardHide = () => {
      setModalTop(top); // Reset to default position
    };

    // Add event listeners for keyboard show and hide
    window.addEventListener('resize', () => {
      if (window.innerHeight < 500) {
        handleKeyboardShow();
      } else {
        handleKeyboardHide();
      }
    });

    return () => {
      // Clean up listeners
      window.removeEventListener('resize', handleKeyboardShow);
      window.removeEventListener('resize', handleKeyboardHide);
    };
  }, [top]);

  return (
    <Dialog open={utility.getModal.isModalShow}>
      <DialogOverlay className="grid place-items-center">
        <DialogContent
          style={{ top: modalTop, paddingBottom: padding }}
          className={cn(
            `overflow-auto max-h-screen overflow-y-auto no-scrollbar`,
            className
          )}
          onClick={() => {
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
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="mt-1 outline outline-[0.5px]"></div>
          <div className="mt-5">{children}</div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default ModalGlobal;
