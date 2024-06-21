import { AppDispatch, themesActions, useAppSelector } from "@/reduxStore";
import { FormLoginDto, intitalFormLogin } from "../dto";
import { validLoginSchema } from "../validate";
import { RenderField, cn } from "@/components";
import { Button } from "@/components/custom";
import FormPanel from "@/components/form/panelForm";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const FormLogin = () => {
  const utility = useAppSelector((state) => state.utility);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function onSubmit(data: FormLoginDto) {
    if (data.email === "admin" && data.password === "admin") {
      navigate("/admin/dashboard");
      dispatch(themesActions.setIsLogin(true));
    } else {
      // alert("Email Dan Password Salah");
      toast({
        title: "Info",
        description: "Username password salah",
        position: "top-right",
        // duration: 3000
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      });
    }
  }

  if (theme.getIsLogin) {
    return <Navigate to={"/admin/dashboard"} />;
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
              <RenderField<FormLoginDto>
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
