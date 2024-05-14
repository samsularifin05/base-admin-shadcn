import { Avatar, AvatarFallback, Button } from "./components";

const App = () => {
  return (
    <div className="flex justify-center items-center bg-red-700 h-screen">
      <Button className="animate-in fade-in zoom-in">Click me</Button>
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default App;
