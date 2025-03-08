import { Button, Card, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { loginAction } from "../../Redux/Actions/User";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  useEffect(() => {
    if (userInfo) navigate("/dashboard");
  }, [userInfo, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 lg:gap-y-12">
      <Card className="w-full max-w-lg p-8">
        <div className="flex justify-center mb-6">

        <img
              alt="Logo"
              src=""
              className="w-24"
            />
        </div>
        <h1 className="mb-6 text-2xl font-bold text-center">Inicia sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Correo electrónico</Label>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Contraseña</Label>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </div>
          
          <div className="mb-6">
 
</div>

        
          <Button type="submit" className="w-full">Iniciar sesión</Button>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
