import { useAppSelector } from "@/reduxStore";
import { FormLoginDto, intitalFormLogin } from "../dto";
import { validLoginSchema } from "../validate";
import { RenderField, cn } from "@/components";
import { Button } from "@/components/custom";
import FormPanel from "@/components/form/panelForm";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const utility = useAppSelector((state) => state.utility);

  const navigate = useNavigate();

  function onSubmit(data: FormLoginDto) {
    if (data.email === "samsul026@gmail.com" && data.password === "123456") {
      navigate("/admin/dashboard");
    } else {
      alert("Email Dan Password Salah");
    }
  }

  return (
    <div className={cn("grid gap-6")}>
      <FormPanel
        formName={"LoginForm"}
        onSubmit={onSubmit}
        validate={validLoginSchema}
        intitalFormLogin={intitalFormLogin}
      >
        {({ form }) => (
          <>
            <div className="grid gap-2">
              <RenderField<FormLoginDto>
                control={form.control}
                label="Email"
                placeholder="Masukan Email"
                name="email"
              />
              <RenderField
                control={form.control}
                label="Password"
                placeholder="Masukan Password"
                name="password"
                hiddenText
              />
              <Button
                type="submit"
                className="mt-2"
                loading={utility.getLoading.button}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </FormPanel>
    </div>
  );
};

export default FormLogin;
