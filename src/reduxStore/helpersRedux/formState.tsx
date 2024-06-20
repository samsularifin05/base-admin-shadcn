import { FormSpy } from "react-final-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { FormState, updateForm } from "../reducers";
// import { filterDTO } from "@/utils";

interface Props {
  form: keyof FormState; // Sesuaikan dengan tipe yang digunakan untuk form
}

const FormStateToRedux: React.FC<Props> = ({ form }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <FormSpy
      subscription={{ values: true }}
      onChange={(state) => {
        dispatch(updateForm({ form: form, values: state.values }));
      }}
    />
  );
};

export default FormStateToRedux;
