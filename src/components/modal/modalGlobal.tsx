import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui";
import { AppDispatch, useAppSelector, utilityActions } from "@/reduxStore";
import { DialogDescription, DialogOverlay } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";

interface Props {
  title: string;
  children: React.ReactNode;
}
const ModalGlobal = (props: Props) => {
  const { title, children } = props;

  const utility = useAppSelector((state) => state.utility);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Dialog
      open={utility.getModal.isModalShow}
      onOpenChange={() =>
        dispatch(
          utilityActions.showModal({
            isModalShow: false,
            isEdit: false,
            data: [],
            namaForm: ""
          })
        )
      }
    >
      <DialogOverlay className="grid place-items-start">
        <DialogContent className="overflow-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default ModalGlobal;
